import AntiSpike from "./Modules/AntiSpike";
import Spider from "./Modules/Spider";
import Killaura from "./Modules/Killaura";
import Jesus from "./Modules/Jesus";
import Unban from "./Modules/Unban";
import HighJump from "./Modules/HighJump";
import UI from "./Modules/UI";

export default {
    modules: [ new UI, new Spider, new Killaura, new Jesus, new AntiSpike, new Unban, new HighJump ],

    getModByName(name) {
        return this.modules.find(mod => mod.name === name);
    },

    handleKeyPress (key) {
        this.modules.forEach(mod => {
            if (mod?.keybind?.toLowerCase?.() == key.toLowerCase()) {
                mod.button.setActive(mod.isEnabled);
            }
        })
    }
}