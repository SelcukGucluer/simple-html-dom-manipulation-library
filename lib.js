(function(window, undefined) {


    function sck(selector) {

        if (!(this instanceof sck)) {
            return new sck(selector);
        }

        this.length = 0;

        this.nodes = [];

        // HTMLElements and NodeLists are wrapped in nodes array
        if (selector instanceof HTMLElement || selector instanceof NodeList || selector === document ) {
            this.nodes = selector.length > 1 ? [].slice.call(selector) : [selector];
        }
        else if (typeof selector === 'string') {
            if (selector[0] === '<' && selector[selector.length - 1] === ">") {
                // Create DOM elements
                this.nodes = [createNode(selector)];
            }
            else {
                // Query DOM
                this.nodes = [].slice.call(document.querySelectorAll(selector));
            }
        }
    }

    function createNode(html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.firstChild;
    }


    // Methods
    sck.fn = sck.prototype;

    sck.fn.each = function(callback) {
        for (var i = 0; i < this.nodes.length; i++) {
            callback.call(this.nodes[i], this, i);
        }
        return this;
    };

    sck.fn.addClass = function(classes) {
        return this.each(function() {
            this.className += ' ' + classes;
        });
    };

    sck.fn.removeClass = function(className) {
        return this.each(function() {
            this.className = this.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
        });
    };


    sck.fn.text = function(str) {
        if (str) {
            return this.each(function() {
                this.innerText = str;
            });
        }
    };
	
	sck.fn.css = function(str) {
        if (str) {
            return this.each(function() {
                this.style.cssText += str;
            });
        }
    };

    sck.fn.on = function(name, handler) {
        return this.each(function() {
            this.addEventListener(name, handler, false);
        });
    };

    window.sck = sck;

})(window);