import {
  ColliderDesc,
  RigidBody,
  RigidBodyDesc,
  World,
} from "@dimforge/rapier3d";
import App from "../App.js";
import { Matrix4, Mesh, Quaternion, Scene, Vector3 } from "three";
import { appStateSTore } from "../Utils/Store.js";

export default class Physics {
  app: App;
  scene: Scene;
  world: World;
  isRapierLoaded = false;
  meshMap: Map<Mesh, RigidBody> = new Map();

  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    import("@dimforge/rapier3d").then((RAPIER) => {
      const gravity = { x: 0, y: -9.85, z: 0 };
      this.world = new RAPIER.World(gravity);

      this.isRapierLoaded = true;
      appStateSTore.setState({ isPhysicisReady: true });
    });
  }

  add(
    mesh: Mesh,
    type: "fixed" | "dynamic",
    collider: "cuboid" | "ball" | "trimesh"
  ) {
    let rigidBodyType: RigidBodyDesc;

    if (type === "dynamic") {
      rigidBodyType = RigidBodyDesc.dynamic();
    } else {
      rigidBodyType = RigidBodyDesc.fixed();
    }

    const rigidBody = this.world.createRigidBody(rigidBodyType);
    const worldPosition = mesh.getWorldPosition(new Vector3());
    const worldRotation = mesh.getWorldQuaternion(new Quaternion());
    rigidBody.setTranslation(worldPosition, true);
    rigidBody.setRotation(worldRotation, true);

    mesh.geometry.computeBoundingBox();
    const size =
      mesh.geometry.boundingBox?.getSize(new Vector3()) || new Vector3(0, 0, 0);
    const worldScale = mesh.getWorldScale(new Vector3());
    size.multiply(worldScale);

    let colliderType;

    switch (collider) {
      case "cuboid":
        const dimensions = this.computeCuboidDimensions(mesh);
        colliderType = ColliderDesc.cuboid(
          dimensions.x / 2,
          dimensions.y / 2,
          dimensions.z / 2
        );
        break;
      case "ball":
        const radius = this.computeBallDimensions(mesh);
        colliderType = ColliderDesc.ball(radius);
        break;
      case "trimesh":
        const { scaledVertices, indices } = this.computeTrimeshDimensions(mesh);
        colliderType = ColliderDesc.trimesh(scaledVertices, indices);
        break;
    }

    if (colliderType) {
      this.world.createCollider(colliderType, rigidBody);
      this.meshMap.set(mesh, rigidBody);
    } else {
      throw new Error("Invalid collider type");
    }
  }

  computeCuboidDimensions(mesh: Mesh) {
    mesh.geometry.computeBoundingBox();
    const boundingBox = mesh.geometry.boundingBox;
    if (!boundingBox) {
      throw new Error("BoundingBox not computed");
    }
    const size = boundingBox.getSize(new Vector3());
    const worldScale = mesh.getWorldScale(new Vector3());
    size.multiply(worldScale);
    return size;
  }

  computeBallDimensions(mesh: Mesh) {
    mesh.geometry.computeBoundingSphere();
    const boundingSphere = mesh.geometry.boundingSphere;
    if (!boundingSphere) {
      throw new Error("BoundingSphere not computed");
    }
    const radius = boundingSphere.radius;
    const worldScale = mesh.getWorldScale(new Vector3());
    const maxScale = Math.max(worldScale.x, worldScale.y, worldScale.z);
    return radius * maxScale;
  }

  computeTrimeshDimensions(mesh: Mesh) {
    const vertices = mesh.geometry.attributes.position.array as Float32Array;
    let indices: Uint32Array;

    if (mesh.geometry.index?.array instanceof Uint32Array) {
      indices = mesh.geometry.index.array;
    } else if (mesh.geometry.index?.array instanceof Uint16Array) {
      indices = new Uint32Array(mesh.geometry.index.array);
    } else {
      throw new Error("Unsupported index type or index not found");
    }

    const worldScale = mesh.getWorldScale(new Vector3());
    const scaledVertices = new Float32Array(vertices.length);

    for (let i = 0; i < vertices.length; i += 3) {
      scaledVertices[i] = vertices[i] * worldScale.x;
      scaledVertices[i + 1] = vertices[i + 1] * worldScale.y;
      scaledVertices[i + 2] = vertices[i + 2] * worldScale.z;
    }

    return { scaledVertices, indices };
  }

  loop() {
    if (!this.isRapierLoaded) return;

    this.world.step();
    this.meshMap.forEach((rigidBody, mesh) => {
      const position = new Vector3().copy(rigidBody.translation());
      const rotation = new Quaternion().copy(rigidBody.rotation());

      position.applyMatrix4(
        new Matrix4().copy(mesh.parent?.matrixWorld || new Matrix4()).invert()
      );

      const inverseParentMatrix = new Matrix4()
        .extractRotation(mesh.parent?.matrixWorld || new Matrix4())
        .invert();
      const inverseParentRotation = new Quaternion().setFromRotationMatrix(
        inverseParentMatrix
      );
      rotation.premultiply(inverseParentRotation);

      mesh.position.copy(position);
      mesh.quaternion.copy(rotation);
    });
  }
}
