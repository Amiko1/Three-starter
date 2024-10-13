import {
  ColliderDesc,
  RigidBody,
  RigidBodyDesc,
  World,
} from "@dimforge/rapier3d";
import App from "../App.js";
import { BoxGeometry, Mesh, MeshStandardMaterial, Scene, Vector3 } from "three";
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

      const groundGeometry = new BoxGeometry(10, 1, 10);
      const groundMaterial = new MeshStandardMaterial({ color: "yellow" });
      const groundMesh = new Mesh(groundGeometry, groundMaterial);

      const groundRigidBodyType = RigidBodyDesc.fixed();
      const groundRigidBody = this.world.createRigidBody(groundRigidBodyType);
      const groundColliderType = ColliderDesc.cuboid(5, 0.5, 5);
      this.world.createCollider(groundColliderType, groundRigidBody);

      this.scene.add(groundMesh);
      this.isRapierLoaded = true;
      appStateSTore.setState({ isPhysicisReady: true });
    });
  }

  add(mesh: Mesh) {
    const rigidBodyType = RigidBodyDesc.dynamic();
    const rigidBody = this.world.createRigidBody(rigidBodyType);
    rigidBody.setTranslation(mesh.position, true);
    rigidBody.setRotation(mesh.quaternion, true);

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
    console.log(this.meshMap);
    this.meshMap.forEach((rigidBody, mesh) => {
      const position = rigidBody.translation();
      const rotation = rigidBody.rotation();

      mesh.position.copy(position);
      mesh.quaternion.copy(rotation);
    });
  }
}
