import SDK from "../SDK/SDK";
import hooks from "../Utils/hooks";
import objUtils from "../Utils/objUtils";
import Module from "./Module";

export default class AntiSpike extends Module {
    constructor () {
        super("AntiSpike");
    }

    onEnable () {
        let blocks = objUtils.values(objUtils.values(hooks.findModule("Gun:class")).find(prop => typeof prop == "object"));
        let _solidityLookupKey = objUtils.keys(SDK.noa.registry)[12];
        blocks.filter(block => block.name.includes("Spikes")).forEach(function (block) {
            SDK.noa.registry[_solidityLookupKey][block.id] = true;
        });
    }

    onDisable () {
        let blocks = objUtils.values(objUtils.values(hooks.findModule("Gun:class")).find(prop => typeof prop == "object"));
        let _solidityLookupKey = objUtils.keys(SDK.noa.registry)[12];
        blocks.filter(block => block.name.includes("Spikes")).forEach(function (block) {
            SDK.noa.registry[_solidityLookupKey][block.id] = false;
        });
    }
};