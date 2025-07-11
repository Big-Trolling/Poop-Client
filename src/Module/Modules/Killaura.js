import SDK from "../../SDK/SDK";
import hooks from "../../Utils/hooks";
import Module from "../Module";

export default class Killaura extends Module {
    constructor () {
        super("Killaura");
        this.lastExecutionTime = null;
        this.delay = 500;
    }

    onRender () {
        const currentTime = Date.now();
        if (currentTime - this.lastExecutionTime >= this.delay) {
            this.lastExecutionTime = currentTime;
            this.tryKill();
        }
    }

    getRandomBodyPart () {
        const bodyParts = ["HeadMesh", "BodyMesh", "ArmLeftMesh", "ArmRightMesh", "LegLeftMesh", "LegRightMesh"];
        return bodyParts[Math.floor(Math.random() * bodyParts.length)];
    }

    tryKill () {
        const reach = 7;
        const reachSq = reach * reach;

        const playerPos = SDK.noa.getPosition(1);

        let closestPlayer = null;
        let closestDistSq = reachSq;

        SDK.noa.playerList.forEach((playerID) => {
            const targetPos = SDK.noa.getPosition(playerID);
            if (!targetPos) return;

            const dx = targetPos[0] - playerPos[0];
            const dy = targetPos[1] - playerPos[1];
            const dz = targetPos[2] - playerPos[2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < closestDistSq) {
                closestDistSq = distSq;
                closestPlayer = { id: playerID, pos: targetPos };
            }
        });

        if (closestPlayer) {
            hooks.noa.inputs.down._events['primary-fire'](SDK.mouse.fakeMouseEvent());

            SDK.noa.getHeldItem(1)?.trySwingBlock?.();
            SDK.noa.getMoveState(1)?.setArmsAreSwinging?.();

            SDK.noa.doAttack(objUtils.values(hooks.noa.camera)[0], closestPlayer.id.toString(), this.getRandomBodyPart());
        }
    }
}