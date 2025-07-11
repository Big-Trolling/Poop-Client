import moduleManager from "./Module/moduleManager";
import hooks from "./Utils/hooks";

hooks.init();
window.dih = hooks;

moduleManager.getModByName("UI").enable();

function render () {
    moduleManager.modules.forEach(module => {
        if (module.isEnabled && module.onRender) {
            module.onRender();
        }
    })
    requestAnimationFrame(render);
}

render();