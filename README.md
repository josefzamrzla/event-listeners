## Installation

Install dependencies and run Grunt

```bash

npm install
grunt
```

## Usage

Link as a first script to HEAD

```html

<script type="text/javascript" src="dist/events.min.js"></script>
```

Attach some event listeners

```javascript

var hander = function() {
    console.log('body clicked');
};

document.body.addEventListener('click', handler, false);
```

Get list of listeners attached to document.body

```javascript

var listeners = document.body.getEventListeners();
```

Or get list of all listeners attached to any element

```javascript

var listeners = window.getAllEventListeners();
```