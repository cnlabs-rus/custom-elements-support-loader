if (typeof customElements !== "undefined") {
    modules.exports = {
        define(name, constructor, options) {
            if (!customElements.get(name)) {
                customElements.define(name, constructor, options);
            }
        }
    };
}
else {
    if(typeof window.customElementsQueue === 'undefined') {
        window.customElementsQueue = [];
    }
    const v = document.createElement('script');
    v.src = 'https://unpkg.com/@webcomponents/webcomponentsjs@2.4.3/webcomponents-bundle.js';
    document.head.appendChild(v);
    const checkLoaded = () => {
        if (typeof customElements === "undefined") {
            setTimeout(checkLoaded, 100);
        } else {
            window.customElementsQueue.splice(0, window.customElementsQueue.length).forEach(v => {
                if (!customElements.get(v.name)) {
                    customElements.define(v.name, v.constructor, v.options);
                }
            });
        }
    };
    setTimeout(checkLoaded, 100);
    modules.exports = {
        define(name, constructor, options) {
            if (typeof customElements === "undefined") {
                window.customElementsQueue.push({name, constructor, options});
            }
            else {
                if (!customElements.get(name)) {
                    customElements.define(name, constructor, options);
                }
            }
        }
    };
}
