export default class Button {
    constructor(name, x, y, onToggle = () => {}) {
        this.name = name;
        this.onToggle = onToggle;
        this.isActive = false;
        this.isDragging = false;

        this.activeColor = "green";
        this.inactiveColor = "red";

        this.wrapper = document.createElement('div');
        this.shadow = this.wrapper.attachShadow({
            mode: 'closed'
        });

        this.circle = document.createElement('div');
        this.circle.textContent = name;
        Object.assign(this.circle.style, {
            position: 'fixed',
            top: `${y}px`,
            left: `${x}px`,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.5)',
            border: `3px solid ${this.inactiveColor}`,
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            cursor: 'grab',
            zIndex: '999999',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            fontSize: '11px',
            color: 'white',
            textAlign: 'center',
            userSelect: 'none',
        });

        this.shadow.appendChild(this.circle);
        document.body.appendChild(this.wrapper);

        this.attachEvents();
    }

    attachEvents() {
        this.circle.addEventListener('click', (e) => {
            this.toggle();
            e.stopPropagation();
        });

        this.circle.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            const rect = this.circle.getBoundingClientRect();
            this.offsetX = e.clientX - rect.left;
            this.offsetY = e.clientY - rect.top;
            this.circle.style.cursor = 'grabbing';
            e.preventDefault();

            const onMove = (e) => {
                if (!this.isDragging) return;
                this.circle.style.left = `${e.clientX - this.offsetX}px`;
                this.circle.style.top = `${e.clientY - this.offsetY}px`;
            };

            const onUp = () => {
                if (this.isDragging) {
                    this.isDragging = false;
                    this.circle.style.cursor = 'grab';
                }
                this.wrapper.removeEventListener('mousemove', onMove);
                this.wrapper.removeEventListener('mouseup', onUp);
            };

            this.wrapper.addEventListener('mousemove', onMove);
            this.wrapper.addEventListener('mouseup', onUp);
        });
    }

    toggle() {
        this.setActive(!this.isActive);
    }

    setActive(state) {
        this.isActive = state;
        this.circle.style.borderColor = state ? this.activeColor : this.inactiveColor;
        this.onToggle(state);
    }

    destroy() {
        this.wrapper.remove();
    }
}