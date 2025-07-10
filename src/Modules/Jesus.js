import hooks from "../Utils/hooks";
import noaUtils from "../Utils/noaUtils";
import objUtils from "../Utils/objUtils";
import Module from "./Module";

export default class Jesus extends Module {
    constructor () {
        super("Jesus");
    }

    onEnable () {
        let blocks = objUtils.values(objUtils.values(hooks.findModule("Gun:class")).find(prop => typeof prop == "object"));
        let _solidityLookupKey = objUtils.keys(noaUtils.registry)[12];
        noaUtils.registry[_solidityLookupKey][blocks.find(block => block.name == "Water").id] = true;
        noaUtils.registry[_solidityLookupKey][blocks.find(block => block.name == "Lava").id] = true;
    }

    onDisable () {
        let blocks = objUtils.values(objUtils.values(hooks.findModule("Gun:class")).find(prop => typeof prop == "object"));
        let _solidityLookupKey = objUtils.keys(noaUtils.registry)[12];
        noaUtils.registry[_solidityLookupKey][blocks.find(block => block.name == "Water").id] = false;
        noaUtils.registry[_solidityLookupKey][blocks.find(block => block.name == "Lava").id] = false;
    }
};