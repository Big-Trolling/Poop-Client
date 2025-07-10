import hooks from "./hooks";
import objUtils from "./objUtils";

export default { 
    get playerPos () {
        return objUtils.values(hooks.noa.entities)[28](1);
    },

    get registry () {
        return objUtils.values(hooks.noa)[17];  
    },

    get getBlockSolidity() {
        return objUtils.values(this.registry)[5];
    },

    get getBlockID() {
        return hooks.noa.bloxd[Object.getOwnPropertyNames(hooks.noa.bloxd.constructor.prototype)[3]].bind(hooks.noa.bloxd);
    },

    touchingWall() {
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

        for (const [dx, dy, dz] of offsets) {
            for (const yOffset of yLayers) {
                const x = Math.floor(this.playerPos[0] + dx);
                const y = Math.floor(this.playerPos[1] + dy + yOffset);
                const z = Math.floor(this.playerPos[2] + dz);

                const blockID = this.getBlockID(x, y, z);
                if (this.getBlockSolidity(blockID)) return true;
            }
        }

        return false;
    }
}