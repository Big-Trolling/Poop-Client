import hooks from "../Utils/hooks";
import mathUtils from "../Utils/mathUtils";
import noaUtils from "../Utils/noaUtils";
import objUtils from "../Utils/objUtils";
import Module from "./Module";

export default class Killaura extends Module {
    constructor () {
        super("Killaura");
    }

    onRender () {
        let playerPos = noaUtils.getPosition(1);
        noaUtils.playerList.forEach(function (player) {
            let targetPosition = noaUtils.getPosition(player);
            if (!targetPosition) return;

            if (parseFloat(mathUtils.distanceBetweenSqrt(playerPos, targetPosition)) <= 7) {
                let lookPos = mathUtils.normalizeVector([targetPosition[0] - playerPos[0], targetPosition[1] - playerPos[1], targetPosition[2] - playerPos[2]]);
                noaUtils.doAttack(lookPos, player.toString(), "BodyMesh");
            }
        })
    }
}