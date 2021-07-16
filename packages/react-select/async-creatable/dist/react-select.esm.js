import _extends from '@babel/runtime/helpers/esm/extends';
import { S as Select } from '../../dist/Select-06b2fa54.esm.js';
import React from 'react';
import { u as useAsync } from '../../dist/useAsync-051d33ba.esm.js';
import { u as useStateManager } from '../../dist/useStateManager-3965ca69.esm.js';
import { u as useCreatable } from '../../dist/useCreatable-4e9f7699.esm.js';
import '../../dist/index-bf813086.esm.js';
import '@emotion/react';
import '@babel/runtime/helpers/taggedTemplateLiteral';
import '@babel/runtime/helpers/objectWithoutProperties';
import '@babel/runtime/helpers/typeof';
import '@babel/runtime/helpers/classCallCheck';
import '@babel/runtime/helpers/createClass';
import '@babel/runtime/helpers/inherits';
import '@babel/runtime/helpers/defineProperty';
import 'react-dom';
import '@babel/runtime/helpers/toConsumableArray';
import 'memoize-one';
import '@babel/runtime/helpers/slicedToArray';

var AsyncCreatableSelect = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var stateManagerProps = useAsync(props);
  var creatableProps = useStateManager(stateManagerProps);
  var selectProps = useCreatable(creatableProps);
  return /*#__PURE__*/React.createElement(Select, _extends({
    ref: ref
  }, selectProps));
});

export default AsyncCreatableSelect;
