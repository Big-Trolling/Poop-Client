import SDK from "../../SDK/SDK";
import hooks from "../../Utils/hooks";
import objUtils from "../../Utils/objUtils";
import Module from "../Module";

export default class HighJump extends Module {
    constructor () {
        super("HighJump");
    }

    onEnable () {
        SDK.noa.setVelocity(null, 40, null);

        setTimeout(() => this.button.setActive(false), 100);
    }
}