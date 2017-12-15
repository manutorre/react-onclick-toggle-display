'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OnClickToggleDisplay = function (_React$Component) {
  _inherits(OnClickToggleDisplay, _React$Component);

  /*This components is useful for showing some content whenever you want.
   If only the required props are passed, the content will close if you click outside of It.
    props ->
      openerNode: is the node that onClick opens up the node passed by the content prop. It is required
      preventFromCloseElements: It's an array of strings. each string represents an Id or a ClassName. If you click on an element with one of these strings
        as id or class, the popover will not close (event if It is outside the popover)
      preventInsideOfElements: works like preventFromCloseElements. The important difference is that if you click on an element that is INSIDE an element with
        any of the strings passed as id or class, then It will not close (even if It is not outside the popover)
      closeFromInsideElements: It's an array of strings. As It's name suggests, if you click on an element with class or id that is the same as one of the
        strings passed, then the popover will hide
      onOpening: expects a function that will be fired when content is shown
  */

  function OnClickToggleDisplay(props) {
    _classCallCheck(this, OnClickToggleDisplay);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      show: false
      //this binding is for keeping the component context and calling refs, props, state...
    };_this.checkClickLocation = _this.checkClickLocation.bind(_this);
    return _this;
  }

  OnClickToggleDisplay.prototype.toggleClickListener = function toggleClickListener() {
    if (!this.state.show) {
      document.addEventListener('click', this.checkClickLocation, false);
    } else {
      document.removeEventListener('click', this.checkClickLocation, false);
    }
  };

  OnClickToggleDisplay.prototype.toggleAeroPopover = function toggleAeroPopover() {
    if (this.props.onOpening && !this.state.show) {
      this.props.onOpening();
    }
    this.toggleClickListener();
    this.setState({
      show: !this.state.show
    });
  };

  OnClickToggleDisplay.prototype.checkClickLocation = function checkClickLocation(e) {
    //fires on every click when popover is open.
    if (!this.checkCloseFromInsideElement(e.target) && ( //if user did not click in any closeFromInsideElements passed as prop
    this.refs.popover && this.refs.popover.contains(e.target) || //checks if is clicking inside of content
    this.checkPreventCloseNodes(e.target) || this.checkPreventInsideOfNodes(e.target))) {
      return;
    }
    this.toggleAeroPopover();
  };

  OnClickToggleDisplay.prototype.checkPreventInsideOfNodes = function checkPreventInsideOfNodes(target) {
    //you can pass as prop all the ids you want to check if you clicked inside
    if (!this.props.preventInsideOfElements) {
      return false;
    }
    return this.props.preventInsideOfElements.some(function (idOrClass) {
      var elementToCheck = document.getElementById(idOrClass) ? document.getElementById(idOrClass) : document.getElementsByClassName(idOrClass)[0];
      return elementToCheck && elementToCheck.contains(target);
    });
  };

  OnClickToggleDisplay.prototype.checkPreventCloseNodes = function checkPreventCloseNodes(target) {
    //you can pass as prop all the ids you want the popover prevent from closing
    if (!target.id && !target.className || !this.props.preventFromCloseElements) {
      return false;
    } else {
      var targetElement = target.id ? target.id : target.className;
      return this.props.preventFromCloseElements.some(function (idOrClass) {
        return targetElement == idOrClass;
      });
    }
  };

  OnClickToggleDisplay.prototype.checkCloseFromInsideElement = function checkCloseFromInsideElement(target) {
    if (!target.id && !target.className || !this.props.closeFromInsideElements) {
      return false;
    } else {
      var targetElement = target.id ? target.id : target.className;
      return this.props.closeFromInsideElements.some(function (idOrClass) {
        return targetElement == idOrClass;
      });
    }
  };

  OnClickToggleDisplay.prototype.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('click', this.checkClickLocation, false);
  };

  OnClickToggleDisplay.prototype.render = function render() {
    var _this2 = this;

    var openerClass = this.state.show ? "open-content" : "";
    return _react2.default.createElement(
      'div',
      { className: this.props.containerClass || "" },
      _react2.default.createElement(
        'div',
        { ref: 'popover' },
        this.state.show && this.props.children
      ),
      _react2.default.createElement(
        'div',
        { ref: 'openerNode', onClick: function onClick() {
            return _this2.toggleAeroPopover();
          }, className: openerClass },
        this.props.openerNode
      )
    );
  };

  return OnClickToggleDisplay;
}(_react2.default.Component);

exports.default = OnClickToggleDisplay;


OnClickToggleDisplay.propTypes = process.env.NODE_ENV !== "production" ? {
  openerNode: _propTypes2.default.node.isRequired,
  preventFromCloseElements: _propTypes2.default.arrayOf(_propTypes2.default.string),
  preventInsideOfElements: _propTypes2.default.arrayOf(_propTypes2.default.string),
  closeFromInsideElements: _propTypes2.default.arrayOf(_propTypes2.default.string)
} : {};
module.exports = exports['default'];