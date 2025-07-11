import objUtils from "../Utils/objUtils";

export default class Button {
    constructor(name, x, y, onToggle = () => {}, active = false) {
        this.name = name;
        this.onToggle = onToggle;
        this.isActive = active;
        this.isDragging = false;
        this.dragThreshold = 10;

        this.activeColor = "green";
        this.inactiveColor = "red";

        this.wrapper = document.createElement('div');
        this.shadow = this.wrapper.attachShadow({ mode: 'closed' });

        this.circle = document.createElement('div');
        this.circle.textContent = name;

        objUtils.assign(this.circle.style, {
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

        this.circle.style.borderColor = active ? this.activeColor : this.inactiveColor;

        this.shadow.appendChild(this.circle);
        document.body.appendChild(this.wrapper);

        this.attachEvents();
    }

    attachEvents() {
        let startX, startY, moved = false;

        // prevent toggling on drag
        this.circle.addEventListener('click', (e) => {
            if (!moved) {
                this.toggle();
            }
            moved = false;
            e.stopPropagation();
        });

        this.circle.addEventListener('mousedown', (e) => {
            moved = false;
            this.startDrag(e.clientX, e.clientY);
            startX = e.clientX;
            startY = e.clientY;

            const onMove = (e) => {
                if (!this.isDragging) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                if (Math.hypot(dx, dy) > this.dragThreshold) moved = true;
                this.drag(e.clientX, e.clientY);
            };

            const onUp = () => {
                this.endDrag(onMove, onUp, 'mouse');
            };

            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
        });

        this.circle.addEventListener('touchstart', (e) => {
            const t = e.touches[0];
            moved = false;
            startX = t.clientX;
            startY = t.clientY;
            this.startDrag(startX, startY);

            const onMove = (e) => {
                const t = e.touches[0];
                const dx = t.clientX - startX;
                const dy = t.clientY - startY;
                if (Math.hypot(dx, dy) > this.dragThreshold) moved = true;
                this.drag(t.clientX, t.clientY);
            };

            const onEnd = () => {
                this.endDrag(onMove, onEnd, 'touch');
            };

            window.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('touchend', onEnd);
        }, { passive: false });
    }

    startDrag(x, y) {
        this.isDragging = true;
        const rect = this.circle.getBoundingClientRect();
        this.offsetX = x - rect.left;
        this.offsetY = y - rect.top;
        this.circle.style.cursor = 'grabbing';
    }

    drag(x, y) {
        if (!this.isDragging) return;
        this.circle.style.left = `${x - this.offsetX}px`;
        this.circle.style.top = `${y - this.offsetY}px`;
    }

    endDrag(onMove, onEnd, type) {
        this.isDragging = false;
        this.circle.style.cursor = 'grab';
        if (type === 'mouse') {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onEnd);
        } else {
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onEnd);
        }
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
