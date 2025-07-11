import SDK from "../../SDK/SDK";
import hooks from "../../Utils/hooks";
import objUtils from "../../Utils/objUtils";
import Module from "../Module";

export default class Jesus extends Module {
    constructor () {
        super("Jesus");
    }

    onEnable () {
        let blocks = objUtils.values(objUtils.values(hooks.findModule("Gun:class")).find(prop => typeof prop == "object"));
        let _solidityLookupKey = objUtils.keys(SDK.noa.registry)[12];
        SDK.noa.registry[_solidityLookupKey][blocks.find(block => block.name == "Water").id] = true;
        SDK.noa.registry[_solidityLookupKey][blocks.find(block => block.name == "Lava").id] = true;
    }

    onDisable () {
        let blocks = objUtils.values(objUtils.values(hooks.findModule("Gun:class")).find(prop => typeof prop == "object"));
        let _solidityLookupKey = objUtils.keys(SDK.noa.registry)[12];
        SDK.noa.registry[_solidityLookupKey][blocks.find(block => block.name == "Water").id] = false;
        SDK.noa.registry[_solidityLookupKey][blocks.find(block => block.name == "Lava").id] = false;
    }
};