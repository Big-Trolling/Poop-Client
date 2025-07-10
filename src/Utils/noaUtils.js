import hooks from "./hooks";
import objUtils from "./objUtils";

export default { 
    touchingWall() {
        const playerPos = objUtils.values(hooks.noa.entities)[28](1);
        const offset = 0.35;

        const offsets = [
            [0, 0, 0],
            [offset, 0, 0],
            [-offset, 0, 0],
            [0, 0, offset],
            [0, 0, -offset],
            [offset, 0, offset],
            [offset, 0, -offset],
            [-offset, 0, offset],
            [-offset, 0, -offset],
        ];

        const yLayers = [0, 1, 2];

        const registry = objUtils.values(hooks.noa)[17];
        const getBlockSolidity = objUtils.values(registry)[5];
        const getBlockID = hooks.noa.bloxd[Object.getOwnPropertyNames(hooks.noa.bloxd.constructor.prototype)[3]].bind(hooks.noa.bloxd);

        for (const [dx, dy, dz] of offsets) {
            for (const yOffset of yLayers) {
                const x = Math.floor(playerPos[0] + dx);
                const y = Math.floor(playerPos[1] + dy + yOffset);
                const z = Math.floor(playerPos[2] + dz);

                const blockID = getBlockID(x, y, z);
                if (getBlockSolidity(blockID)) return true;
            }
        }

        return false;
    }
}