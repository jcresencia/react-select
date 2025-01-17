"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _extends = require("@babel/runtime/helpers/extends"), base_dist_reactSelect = require("../../dist/Select-fb65a0bd.cjs.prod.js"), React = require("react"), useAsync = require("../../dist/useAsync-7e1fe527.cjs.prod.js"), useStateManager = require("../../dist/useStateManager-bfbe3571.cjs.prod.js"), useCreatable = require("../../dist/useCreatable-57a2b7b0.cjs.prod.js");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

require("../../dist/index-1b148735.cjs.prod.js"), require("@emotion/react"), require("@babel/runtime/helpers/taggedTemplateLiteral"), 
require("@babel/runtime/helpers/objectWithoutProperties"), require("@babel/runtime/helpers/typeof"), 
require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), 
require("@babel/runtime/helpers/inherits"), require("@babel/runtime/helpers/defineProperty"), 
require("react-dom"), require("@babel/runtime/helpers/toConsumableArray"), require("memoize-one"), 
require("@babel/runtime/helpers/slicedToArray");

var _extends__default = _interopDefault(_extends), React__default = _interopDefault(React), AsyncCreatableSelect = React__default.default.forwardRef((function(props, ref) {
  var stateManagerProps = useAsync.useAsync(props), creatableProps = useStateManager.useStateManager(stateManagerProps), selectProps = useCreatable.useCreatable(creatableProps);
  return React__default.default.createElement(base_dist_reactSelect.Select, _extends__default.default({
    ref: ref
  }, selectProps));
}));

exports.default = AsyncCreatableSelect;
