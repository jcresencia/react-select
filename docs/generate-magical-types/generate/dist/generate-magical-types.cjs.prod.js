"use strict";

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray"), path = require("path"), fs = require("fs-extra"), flatted = require("flatted"), tsMorph = require("ts-morph"), convertType = require("@magical-types/convert-type");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  return e && Object.keys(e).forEach((function(k) {
    if ("default" !== k) {
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: !0,
        get: function() {
          return e[k];
        }
      });
    }
  })), n.default = e, Object.freeze(n);
}

var _slicedToArray__default = _interopDefault(_slicedToArray), path__default = _interopDefault(path), fs__default = _interopDefault(fs), flatted__namespace = _interopNamespace(flatted);

function _arrayLikeToArray(arr, len) {
  (null == len || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (o) {
    if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    return "Object" === n && o.constructor && (n = o.constructor.name), "Map" === n || "Set" === n ? Array.from(o) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _arrayLikeToArray(o, minLen) : void 0;
  }
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = "undefined" != typeof Symbol && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && "number" == typeof o.length) {
      it && (o = it);
      var i = 0, F = function() {};
      return {
        s: F,
        n: function() {
          return i >= o.length ? {
            done: !0
          } : {
            done: !1,
            value: o[i++]
          };
        },
        e: function(e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var err, normalCompletion = !0, didErr = !1;
  return {
    s: function() {
      it = it.call(o);
    },
    n: function() {
      var step = it.next();
      return normalCompletion = step.done, step;
    },
    e: function(e) {
      didErr = !0, err = e;
    },
    f: function() {
      try {
        normalCompletion || null == it.return || it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var OTHERFILES = [ "stateManager", "Async", "Creatable" ], getOtherProps = function(obj) {
  OTHERFILES.forEach((function(name) {
    var pkgExports = {};
    obj["".concat(name)] = pkgExports;
    var sourceFile = project.getSourceFile(path__default.default.join(__dirname, "../../PropTypes", "".concat(name, ".ts")));
    if (sourceFile || (sourceFile = project.getSourceFile(path__default.default.join(__dirname, "../../PropTypes", "".concat(name, ".tsx")))), 
    !sourceFile) throw new Error("source file not found for ".concat(name));
    resolveTypes({
      sourceFile: sourceFile,
      item: name,
      pkgExports: pkgExports
    });
  }));
}, resolveTypes = function(_ref) {
  var _step, sourceFile = _ref.sourceFile, item = _ref.item, pkgExports = _ref.pkgExports, _iterator = _createForOfIteratorHelper(sourceFile.getExportedDeclarations());
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _step$value = _slicedToArray__default.default(_step.value, 2), exportName = _step$value[0], declaration = _step$value[1];
      if (declaration.length) {
        var type = declaration[0].getType().compilerType, typeKind = "other";
        if (console.log("about to convert ".concat(exportName, " from ").concat(item)), 
        exportName[0].toUpperCase() === exportName[0]) try {
          type = convertType.getPropTypesType(type), typeKind = "component";
        } catch (err) {}
        pkgExports[exportName] = {
          node: convertType.convertType(type, []),
          type: typeKind
        }, console.log("converted");
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}, project = new tsMorph.Project({
  addFilesFromTsConfig: !0,
  tsConfigFilePath: path__default.default.resolve(__dirname, "../../../tsconfig.json")
});

console.log("done");

var _step2, pkgDir = path__default.default.resolve(__dirname, "../../../packages"), pkgs = fs__default.default.readdirSync(pkgDir, {
  withFileTypes: !0
}).filter((function(x) {
  return x.isDirectory() && fs__default.default.existsSync(path__default.default.join(pkgDir, path__default.default.join(x.name), "package.json"));
})).map((function(x) {
  return x.name;
})), obj = {}, _iterator2 = _createForOfIteratorHelper(pkgs);

try {
  for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
    var item = _step2.value, pkgExports = {};
    obj["".concat(item)] = pkgExports;
    var sourceFile = project.getSourceFile(path__default.default.join(pkgDir, item, "src", "index.tsx"));
    if (sourceFile || (sourceFile = project.getSourceFile(path__default.default.join(pkgDir, item, "src", "index.ts"))), 
    !sourceFile) throw new Error("source file not found for ".concat(item));
    resolveTypes({
      sourceFile: sourceFile,
      item: item,
      pkgExports: pkgExports
    });
  }
} catch (err) {
  _iterator2.e(err);
} finally {
  _iterator2.f();
}

getOtherProps(obj), fs__default.default.outputFileSync(path__default.default.join(__dirname, "..", "dist", "magical-types.json"), flatted__namespace.stringify(obj));
