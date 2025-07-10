import Killaura from "./Modules/Killaura";
import Spider from "./Modules/Spider";
import Button from "./UI/Button";
import hooks from "./Utils/hooks";

hooks.init();

let modules = [ new Spider, new Killaura ];

function render () {
    modules.forEach(module => {
        if (module.isEnabled) {
            module.onRender();
        }
    })
    requestAnimationFrame(render);
}

render();

let UIOffset = 100;
modules.forEach(module => {
    new Button(module.name, UIOffset, UIOffset, module.toggle.bind(module));
    UIOffset += 100;
})