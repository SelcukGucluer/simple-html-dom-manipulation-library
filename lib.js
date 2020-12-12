(function(window, undefined) {


    function S(selector) {

        if (!(this instanceof S)) {
            return new S(selector);
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
	
	function getParents(el) {

    var parents = [];
    var p = el.parentNode;
    
    while (p !== document) {
        var o = p;
        parents.push(o);
        p = o.parentNode;
    }
	parents.push(document)
    
    return parents;
	}
		


    // Methods
    S.fn = S.prototype;

    S.fn.each = function(callback) {
        for (var i = 0; i < this.nodes.length; i++) {
            callback.call(this.nodes[i], this, i);
        }
        return this;
    };
	
	S.fn.parents = function(selector = '*') {
		
		var parentNodes  = new Set()
		
        for (var i = 0; i < this.nodes.length; i++) {
			var nodes = getParents(this.nodes[i])			
			for (var z = 0; z < nodes.length; z++) {	
				parentNodes.add(nodes[z])		
			}
        }

		this.nodes = [].slice.call(document.querySelectorAll(selector)).filter(value => [...parentNodes].includes(value));
		
		
        return this;
    };
		

    S.fn.addClass = function(classes) {
        return this.each(function() {
            this.className += ' ' + classes;
        });
    };

    S.fn.removeClass = function(className) {
        return this.each(function() {
            this.className = this.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
        });
    };


    S.fn.text = function(str) {
        if (str) {
            return this.each(function() {
                this.innerText = str;
            });
        }
    };
	
	S.fn.css = function(str) {
        if (str) {
            return this.each(function() {
                this.style.cssText += str;
            });
        }
    };
	

    S.fn.on = function(name, handler) {
        return this.each(function() {
            this.addEventListener(name, handler, false);
        });
    };

    window.S = S;

})(window);