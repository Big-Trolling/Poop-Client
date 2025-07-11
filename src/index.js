import AntiSpike from "./Modules/AntiSpike";
import Jesus from "./Modules/Jesus";
import Killaura from "./Modules/Killaura";
import Spider from "./Modules/Spider";
import Unban from "./Modules/Unban";
import Button from "./UI/Button";
import hooks from "./Utils/hooks";

hooks.init();
window.dih = hooks;

let modules = [ new Spider, new Killaura, new Jesus, new AntiSpike, new Unban ];

function render () {
    modules.forEach(module => {
        if (module.isEnabled && module.onRender) {
            module.onRender();
        }
    })
    requestAnimationFrame(render);
}

render();

let UIOffset = 100;
modules.forEach(mod => {
    new Button(mod.name, UIOffset, UIOffset, mod.toggle.bind(mod));
    UIOffset += 50;
})