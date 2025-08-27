import moduleManager from "./Module/moduleManager";
import SDK from "./SDK/SDK";
import hooks from "./Utils/hooks";

window.poop = {SDK, hooks};
hooks.init();
moduleManager.getModByName("UI").enable();

function render () {
    moduleManager.modules.forEach(module => {
        if (module.isEnabled && module.onRender) {
            module.onRender();
        }
    })
    requestAnimationFrame(render);
}

document.addEventListener("keydown", (event) => {
    moduleManager.handleKeyPress(event.key);
});

render();