import AntiSpike from "./Modules/AntiSpike";
import Spider from "./Modules/Spider";
import Killaura from "./Modules/Killaura";
import Jesus from "./Modules/Jesus";
import Unban from "./Modules/Unban";
import UI from "./Modules/UI";

export default {
    modules: [ new UI, new Spider, new Killaura, new Jesus, new AntiSpike, new Unban ],

    getModByName(name) {
        return this.modules.find(mod => mod.name === name);
    },

}