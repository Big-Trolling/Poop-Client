export default {
    instance: null,

    get wrapper () {
        if (!this.instance) {
            let container = document.createElement('div');
            this.instance = container.attachShadow({ mode: 'closed' });
            document.body.appendChild(container);
        }

        return this.instance;
    }
}