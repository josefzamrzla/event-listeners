(function (window) {

    var eventsCache = [];

    // backup old handlers
    var _addEventListener = Element.prototype.addEventListener;
    var _removeEventListener = Element.prototype.removeEventListener;

    // new handler for adding listeners
    function _addListener (type, handler, useCapture) {

        if (_eventExists(this, type, handler, useCapture) === false) {
            eventsCache.push({
                target: this,
                type: type,
                handler: handler,
                useCapture: useCapture
            });
        }

        _addEventListener.call(this, type, handler, useCapture);
    }

    // check if event is in cache
    function _eventExists (target, type, handler, useCapture) {
        var e, len = eventsCache.length, i;
        for (i = 0; i < len; i++) {
            e = eventsCache[i];

            if (e.target === target && e.type === type && e.handler === handler && e.useCapture === useCapture) {
                return i;
            }
        }

        return false;
    }

    // new handler for removing listeners
    function _removeListener (type, handler, useCapture) {

        var pos = _eventExists(this, type, handler, useCapture);
        if (pos !== false && pos < eventsCache.length) {
            eventsCache.splice(pos, 1);
        }

        _removeEventListener.call(this, type, handler, useCapture);
    }


    // switch to new handlers
    Element.prototype.addEventListener = _addListener;
    Element.prototype.removeEventListener = _removeListener;

    // get current element listeners
    Element.prototype.getEventListeners = function () {
        var listeners = [], len = eventsCache.length, i;
        for (i = 0; i < len; i++) {
            if (eventsCache[i].target === this) {
                listeners.push(eventsCache[i]);
            }
        }

        return listeners;
    };

    // get all registered listeners
    window.getAllEventListeners = function () {
        return eventsCache;
    };

})(this);