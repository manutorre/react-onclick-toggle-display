# react-onclick-toggle-display

[![Build Status](https://travis-ci.org/manutorre/react-onclick-toggle-display.svg?branch=master)](https://travis-ci.org/manutorre/react-onclick-toggle-display)
[![npm package][npm-badge]][npm]
[![Coverage Status](https://coveralls.io/repos/github/manutorre/react-onclick-toggle-display/badge.svg?branch=master)](https://coveralls.io/github/manutorre/react-onclick-toggle-display?branch=master)

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo


Wrap content with this component and toggle It depending on click's location

## Getting Started

OnClickToggleDisplay is a component for toggling any react component's display.
The default functionality is simple:
The children components of <OnClickToggleDisplay> will not be shown unless you press the "openerNode"
The openerNode prop is the button (It can be any kind of react component actually) that will make the children component display. This button will be shown by default.
Once the children component is shown, OnClickToggleDisplay will detect the user's click and if the click is outside the children components, then the content will be hidden. If the user clicks inside the children component, then It will keep being displayed.

### Prerequisites

For installing this component:

```
npm install react-onclick-toggle-display
```

| Prop | how It works | kind |
| :---         |     :---:      |    :---:      |  
| openerNode (required)   | Node that will work as a button. If you click this node, the content will be shown     | Node |
| preventFromCloseElements     | You should pass an array of strings. When the user clicks on a node with one of these, then the content will not hide (even if It is outside the children component)        | Array |
| preventInsideOfElements   | Just like preventFromCloseElements. However, also contained nodes of those with a certain id or class won't hide the content     | Array |
| closeFromInsideElements | You should pass an array of strings. When the user clicks on a node with one of these, then the content will hide (even if It is inside the children component)        | Array |
| onOpening | function to be fired when the content is shown | Array |
