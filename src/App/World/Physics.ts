import {
  ColliderDesc,
  RigidBody,
  RigidBodyDesc,
  World,
} from "@dimforge/rapier3d";
import App from "../App.js";
import {
  BoxGeometry,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  Scene,
  Vector3,
} from "three";
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

  add(mesh: Mesh, type: "fixed" | "dynamic") {
    let rigidBodyType: RigidBodyDesc;

    if (type === "dynamic") {
      rigidBodyType = RigidBodyDesc.dynamic();
    } else {
      rigidBodyType = RigidBodyDesc.fixed();
    }

    const rigidBody = this.world.createRigidBody(rigidBodyType);
    const worldPosition = mesh.getWorldPosition(new Vector3());
    const worldRotoation = mesh.getWorldQuaternion(new Quaternion());
    rigidBody.setTranslation(worldPosition, true);
    rigidBody.setRotation(worldRotoation, true);

    mesh.geometry.computeBoundingBox();
    const size =
      mesh.geometry.boundingBox?.getSize(new Vector3()) || new Vector3(0, 0, 0);
    const worldScale = mesh.getWorldScale(new Vector3());
    size.multiply(worldScale);
    const colliderType = ColliderDesc.cuboid(
      size.x / 2,
      size.y / 2,
      size.z / 2
    );

    this.world.createCollider(colliderType, rigidBody);
    this.meshMap.set(mesh, rigidBody);
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
