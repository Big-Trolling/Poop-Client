import SDK from "../../SDK/SDK";
import Module from "../Module";
import mathUtils from "../../Utils/mathUtils"

export default class Killaura extends Module {
    constructor () {
        super("Killaura");
        this.lastExecutionTime = null;
        this.delay = 100;
    }

    onRender () {
        const currentTime = Date.now();
        if (currentTime - this.lastExecutionTime >= this.delay) {
            this.lastExecutionTime = currentTime;
            this.tryKill();
        }
    }

    tryKill () {
        let playerPos = SDK.noa.getPosition(1);
        SDK.noa.playerList.forEach(function (player) {
            let targetPosition = SDK.noa.getPosition(player);
            if (!targetPosition) return;

            if (parseFloat(mathUtils.distanceBetweenSqrt(playerPos, targetPosition)) <= 7) {
                let lookPos = mathUtils.normalizeVector([targetPosition[0] - playerPos[0], targetPosition[1] - playerPos[1], targetPosition[2] - playerPos[2]]);
                SDK.noa.doAttack(lookPos, player.toString(), "BodyMesh");

                SDK.noa.getHeldItem(1)?.trySwingBlock?.();
                SDK.noa.getMoveState(1)?.setArmsAreSwinging?.();
            }
        })
    }
}