import SDK from "../../SDK/SDK";
import hooks from "../../Utils/hooks";
import objUtils from "../../Utils/objUtils";
import Module from "../Module";

export default class HighJump extends Module {
    constructor () {
        super("HighJump");
    }

    onEnable () {
        let compStorage = objUtils.values(hooks.noa.entities)[2];
        let velocity = objUtils.values(compStorage.physics.list[0].body)[16]
        velocity[1] = 40;

        setTimeout(() => this.button.setActive(false), 100);
    }
}