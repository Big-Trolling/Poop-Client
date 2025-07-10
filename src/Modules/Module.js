export default class Module {
    constructor (name) {
        this.name = name;
        this.isEnabled = false;
    }

    onEnable() {}
    onDisable() {}

    enable() {
        this.isEnabled = true;
        this.onEnable();
    }

    disable() {
        this.isEnabled = false;
        this.onDisable();
    }

    toggle() {
        if (this.isEnabled) {
            this.disable();
        } else {
            this.enable();
        }
    };
}