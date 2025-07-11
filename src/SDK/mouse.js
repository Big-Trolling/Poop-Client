export default {
    grab () {

    },

    release () {

    },

    fakeMouseEvent () {
        let spoofedEvent = {
			button: 0,
			buttons: 1,
			clientX: Math.floor(Math.random() * 999 + 1),
			clientY: Math.floor(Math.random() * 999 + 1),
			screenX: Math.floor(Math.random() * 999 + 1),
			screenY: Math.floor(Math.random() * 999 + 1),
			target: document.querySelector('#noa-container'),
			type: "mousedown",
			isTrusted: true,
			view: window,
			bubbles: true,
			cancelable: true,
            timeStamp: Date.now(),
	    };

        spoofedEvent.prototype = MouseEvent.prototype;
        
        return spoofedEvent;
    },
}