import mathUtils from "../Utils/mathUtils";
import noaUtils from "../Utils/noaUtils";
import Module from "./Module";

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

    tryKill () {
        let playerPos = noaUtils.getPosition(1);
        noaUtils.playerList.forEach(function (player) {
            let targetPosition = noaUtils.getPosition(player);
            if (!targetPosition) return;

            if (parseFloat(mathUtils.distanceBetweenSqrt(playerPos, targetPosition)) <= 7) {
                let lookPos = mathUtils.normalizeVector([targetPosition[0] - playerPos[0], targetPosition[1] - playerPos[1], targetPosition[2] - playerPos[2]]);
                noaUtils.doAttack(lookPos, player.toString(), "BodyMesh");

                if (noaUtils.getHeldItem(1).trySwingBlock) {
                    noaUtils.getHeldItem(1).trySwingBlock();
                }
            }
        })
    }
}