import hooks from "./hooks";
import objUtils from "./objUtils";

export default { 

    getPosition (id) {
        return objUtils.values(hooks.noa.entities)[28](id);
    },

    getMoveState (id) {
        return objUtils.values(hooks.noa.entities)[36](id);
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

    get getHeldItem () {
        return objUtils.values(hooks.noa.entities)[39];
    },

    safeGetHeldItem(id) {
        let heldItem;
        try {
            heldItem = this.getHeldItem(id);
        } catch (error) {}
        return heldItem;
    },

    get playerList() {
        return Object.values(hooks.noa.bloxd.getPlayerIds()).filter(player => player !== 1 && this.safeGetHeldItem(player)).map(id => parseInt(id));
    },

    get doAttack () {
        let heldItem = this.safeGetHeldItem(1);
        let doAttack = heldItem?.doAttack || heldItem.breakingItem.doAttack;
        return doAttack.bind(heldItem);
    },

    touchingWall() {
        let playerPos = this.getPosition(1);

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
                const x = Math.floor(playerPos[0] + dx);
                const y = Math.floor(playerPos[1] + dy + yOffset);
                const z = Math.floor(playerPos[2] + dz);

                const blockID = this.getBlockID(x, y, z);
                if (this.getBlockSolidity(blockID)) return true;
            }
        }

        return false;
    }
}