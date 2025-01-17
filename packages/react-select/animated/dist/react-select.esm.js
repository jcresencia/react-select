import { a as _objectSpread2, _ as _createSuper, F as defaultComponents } from '../../dist/index-bf813086.esm.js';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import memoizeOne from 'memoize-one';
import React, { Component } from 'react';
import _extends from '@babel/runtime/helpers/esm/extends';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import { Transition, TransitionGroup } from 'react-transition-group';
import '@emotion/react';
import '@babel/runtime/helpers/taggedTemplateLiteral';
import '@babel/runtime/helpers/typeof';
import '@babel/runtime/helpers/defineProperty';
import 'react-dom';

var _excluded$3 = ["in", "onExited", "appear", "enter", "exit"];

// strip transition props off before spreading onto select component
var AnimatedInput = function AnimatedInput(WrappedComponent) {
  return function (_ref) {
    _ref.in;
        _ref.onExited;
        _ref.appear;
        _ref.enter;
        _ref.exit;
        var props = _objectWithoutProperties(_ref, _excluded$3);

    return /*#__PURE__*/React.createElement(WrappedComponent, props);
  };
};

var _excluded$2 = ["component", "duration", "in", "onExited"];
var Fade = function Fade(_ref) {
  var Tag = _ref.component,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 1 : _ref$duration,
      inProp = _ref.in;
      _ref.onExited;
      var props = _objectWithoutProperties(_ref, _excluded$2);

  var transition = {
    entering: {
      opacity: 0
    },
    entered: {
      opacity: 1,
      transition: "opacity ".concat(duration, "ms")
    },
    exiting: {
      opacity: 0
    },
    exited: {
      opacity: 0
    }
  };
  return /*#__PURE__*/React.createElement(Transition, {
    mountOnEnter: true,
    unmountOnExit: true,
    in: inProp,
    timeout: duration
  }, function (state) {
    var innerProps = {
      style: _objectSpread2({}, transition[state])
    };
    return /*#__PURE__*/React.createElement(Tag, _extends({
      innerProps: innerProps
    }, props));
  });
}; // ==============================
// Collapse Transition
// ==============================

var collapseDuration = 260;
// wrap each MultiValue with a collapse transition; decreases width until
// finally removing from DOM
var Collapse = /*#__PURE__*/function (_Component) {
  _inherits(Collapse, _Component);

  var _super = _createSuper(Collapse);

  function Collapse() {
    var _this;

    _classCallCheck(this, Collapse);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.duration = collapseDuration;
    _this.rafID = void 0;
    _this.state = {
      width: 'auto'
    };
    _this.transition = {
      exiting: {
        width: 0,
        transition: "width ".concat(_this.duration, "ms ease-out")
      },
      exited: {
        width: 0
      }
    };

    _this.getWidth = function (ref) {
      if (ref && isNaN(_this.state.width)) {
        /*
          Here we're invoking requestAnimationFrame with a callback invoking our
          call to getBoundingClientRect and setState in order to resolve an edge case
          around portalling. Certain portalling solutions briefly remove children from the DOM
          before appending them to the target node. This is to avoid us trying to call getBoundingClientrect
          while the Select component is in this state.
        */
        // cannot use `offsetWidth` because it is rounded
        _this.rafID = window.requestAnimationFrame(function () {
          var _ref$getBoundingClien = ref.getBoundingClientRect(),
              width = _ref$getBoundingClien.width;

          _this.setState({
            width: width
          });
        });
      }
    };

    _this.getStyle = function (width) {
      return {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: width
      };
    };

    _this.getTransition = function (state) {
      return _this.transition[state];
    };

    return _this;
  }

  _createClass(Collapse, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.rafID) {
        window.cancelAnimationFrame(this.rafID);
      }
    } // width must be calculated; cannot transition from `undefined` to `number`

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          inProp = _this$props.in;
      var width = this.state.width;
      return /*#__PURE__*/React.createElement(Transition, {
        enter: false,
        mountOnEnter: true,
        unmountOnExit: true,
        in: inProp,
        timeout: this.duration
      }, function (state) {
        var style = _objectSpread2(_objectSpread2({}, _this2.getStyle(width)), _this2.getTransition(state));

        return /*#__PURE__*/React.createElement("div", {
          ref: _this2.getWidth,
          style: style
        }, children);
      });
    }
  }]);

  return Collapse;
}(Component);

var _excluded$1 = ["in", "onExited"];

// strip transition props off before spreading onto actual component
var AnimatedMultiValue = function AnimatedMultiValue(WrappedComponent) {
  return function (_ref) {
    var inProp = _ref.in,
        onExited = _ref.onExited,
        props = _objectWithoutProperties(_ref, _excluded$1);

    return /*#__PURE__*/React.createElement(Collapse, {
      in: inProp,
      onExited: onExited
    }, /*#__PURE__*/React.createElement(WrappedComponent, _extends({
      cropWithEllipsis: inProp
    }, props)));
  };
};

// fade in when last multi-value removed, otherwise instant
var AnimatedPlaceholder = function AnimatedPlaceholder(WrappedComponent) {
  return function (props) {
    return /*#__PURE__*/React.createElement(Fade, _extends({
      component: WrappedComponent,
      duration: props.isMulti ? collapseDuration : 1
    }, props));
  };
};

// instant fade; all transition-group children must be transitions
var AnimatedSingleValue = function AnimatedSingleValue(WrappedComponent) {
  return function (props) {
    return /*#__PURE__*/React.createElement(Fade, _extends({
      component: WrappedComponent
    }, props));
  };
};

// make ValueContainer a transition group
var AnimatedValueContainer = function AnimatedValueContainer(WrappedComponent) {
  return function (props) {
    return /*#__PURE__*/React.createElement(TransitionGroup, _extends({
      component: WrappedComponent
    }, props));
  };
};

var _excluded = ["Input", "MultiValue", "Placeholder", "SingleValue", "ValueContainer"];

var makeAnimated = function makeAnimated() {
  var externalComponents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var components = defaultComponents({
    components: externalComponents
  });

  var Input = components.Input,
      MultiValue = components.MultiValue,
      Placeholder = components.Placeholder,
      SingleValue = components.SingleValue,
      ValueContainer = components.ValueContainer,
      rest = _objectWithoutProperties(components, _excluded);

  return _objectSpread2({
    Input: AnimatedInput(Input),
    MultiValue: AnimatedMultiValue(MultiValue),
    Placeholder: AnimatedPlaceholder(Placeholder),
    SingleValue: AnimatedSingleValue(SingleValue),
    ValueContainer: AnimatedValueContainer(ValueContainer)
  }, rest);
};

var AnimatedComponents = makeAnimated();
var Input = AnimatedComponents.Input;
var MultiValue = AnimatedComponents.MultiValue;
var Placeholder = AnimatedComponents.Placeholder;
var SingleValue = AnimatedComponents.SingleValue;
var ValueContainer = AnimatedComponents.ValueContainer;
var index = memoizeOne(makeAnimated);

export default index;
export { Input, MultiValue, Placeholder, SingleValue, ValueContainer };
