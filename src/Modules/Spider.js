import hooks from "../Utils/hooks";
import noaUtils from "../Utils/noaUtils";
import objUtils from "../Utils/objUtils";
import Module from "./Module";

export default class Spider extends Module {
    constructor () {
        super("Spider");
    }

    onRender () {
        if (noaUtils.touchingWall() && hooks.noa.inputs.state.jump) {
            let compStorage = objUtils.values(hooks.noa.entities)[2];
            let velocity = objUtils.values(compStorage.physics.list[0].body)[16]
            velocity[1] = 5;
        }
    }
}