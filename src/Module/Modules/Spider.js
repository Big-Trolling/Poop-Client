import SDK from "../../SDK/SDK";
import hooks from "../../Utils/hooks";
import Module from "../Module";

export default class Spider extends Module {
    constructor () {
        super("Spider");
    }

    onRender () {
        if (hooks.noa.inputs.state.jump && SDK.noa.touchingWall()) {
            SDK.noa.setVelocity(null, 5, null);
        }
    }
}