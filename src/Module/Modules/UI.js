import Module from "../Module";
import moduleManager from "../moduleManager";
import Button from "../../UI/Button";

export default class UI extends Module {
    constructor () {
        super("UI");
        this.buttons = [];
        this.initialized = false;
    }

    onEnable () {
        if (!this.initialized) {
            let UIOffset = 100;
            moduleManager.modules.forEach(mod => {
                let button = new Button(mod.name, UIOffset, UIOffset, mod.toggle.bind(mod), mod.isEnabled);
                this.buttons.push(button);
                UIOffset += 50;
            })

            this.initialized = true;

        } else {
            this.buttons.forEach(button => {
                if (button.circle.textContent !== "UI") {
                    button.circle.style.display = "flex";
                }
            });
        }
        
    }

    onDisable () {
        this.buttons.forEach(button => {
            if (button.circle.textContent !== "UI") {
                button.circle.style.display = "none";
            }
        });
    }
};