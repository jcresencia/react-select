'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var base_dist_reactSelect = require('../../dist/Select-69f01b8c.cjs.dev.js');
var React = require('react');
var useAsync = require('../../dist/useAsync-850cc2f7.cjs.dev.js');
var useStateManager = require('../../dist/useStateManager-9a696a0b.cjs.dev.js');
var useCreatable = require('../../dist/useCreatable-024f3822.cjs.dev.js');
require('../../dist/index-97f24564.cjs.dev.js');
require('@emotion/react');
require('@babel/runtime/helpers/taggedTemplateLiteral');
require('@babel/runtime/helpers/objectWithoutProperties');
require('@babel/runtime/helpers/typeof');
require('@babel/runtime/helpers/classCallCheck');
require('@babel/runtime/helpers/createClass');
require('@babel/runtime/helpers/inherits');
require('@babel/runtime/helpers/defineProperty');
require('react-dom');
require('@babel/runtime/helpers/toConsumableArray');
require('memoize-one');
require('@babel/runtime/helpers/slicedToArray');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefault(_extends);
var React__default = /*#__PURE__*/_interopDefault(React);

var AsyncCreatableSelect = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
  var stateManagerProps = useAsync.useAsync(props);
  var creatableProps = useStateManager.useStateManager(stateManagerProps);
  var selectProps = useCreatable.useCreatable(creatableProps);
  return /*#__PURE__*/React__default['default'].createElement(base_dist_reactSelect.Select, _extends__default['default']({
    ref: ref
  }, selectProps));
});

exports.default = AsyncCreatableSelect;
