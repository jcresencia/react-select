"use strict";

var _toConsumableArray = require("@babel/runtime/helpers/toConsumableArray"), _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator"), _regeneratorRuntime = require("@babel/runtime/regenerator"), path = require("path"), fs = require("fs-extra"), flatted = require("flatted"), serialize = require("@magical-types/serialization/serialize");

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

var _toConsumableArray__default = _interopDefault(_toConsumableArray), _asyncToGenerator__default = _interopDefault(_asyncToGenerator), _regeneratorRuntime__default = _interopDefault(_regeneratorRuntime), path__default = _interopDefault(path), fs__default = _interopDefault(fs), flatted__namespace = _interopNamespace(flatted), allTypes = flatted__namespace.parse(fs__default.default.readFileSync(path__default.default.join(__dirname, "..", "dist", "magical-types.json"), "utf8")), magicalTypesDir = path__default.default.resolve(__dirname, "..", "..", "magical-types");

fs__default.default.removeSync(magicalTypesDir), fs__default.default.ensureDirSync(magicalTypesDir);

var rootNodes = [];

for (var pkgName in allTypes) for (var exportName in allTypes[pkgName]) rootNodes.push(allTypes[pkgName][exportName].node);

console.log("serializing nodes");

var serializationResult = serialize.serializeNodes(rootNodes);

console.log("done"), console.log("chunking nodes");

var chunkedNodes = serialize.chunkNodes(serializationResult);

console.log("done");

var outputPaths = chunkedNodes.map((function(x, index) {
  return path__default.default.join(magicalTypesDir, "magical-types-".concat(index, "-").concat(Math.random().toString(36), ".json"));
})), outputUrlSegments = outputPaths.map((function(filepath) {
  return "/magical-types/".concat(path__default.default.basename(filepath));
})), manifestOutputPath = path__default.default.resolve(magicalTypesDir, "magical-types-manifest.json"), metadataWithIndexes = {};

for (var _pkgName in allTypes) for (var _exportName in metadataWithIndexes[_pkgName] = {}, 
allTypes[_pkgName]) serializationResult.nodesMeta.has(allTypes[_pkgName][_exportName].node) && (metadataWithIndexes[_pkgName][_exportName] = {
  type: allTypes[_pkgName][_exportName].type,
  index: serializationResult.nodesMeta.get(allTypes[_pkgName][_exportName].node).index
});

_asyncToGenerator__default.default(_regeneratorRuntime__default.default.mark((function _callee() {
  return _regeneratorRuntime__default.default.wrap((function(_context) {
    for (;;) switch (_context.prev = _context.next) {
     case 0:
      return console.log("writing output"), _context.next = 3, Promise.all([ fs__default.default.writeFile(manifestOutputPath, JSON.stringify({
        paths: outputUrlSegments,
        types: metadataWithIndexes
      })) ].concat(_toConsumableArray__default.default(outputPaths.map((function(filepath, index) {
        return fs__default.default.writeFile(filepath, JSON.stringify(chunkedNodes[index]));
      })))));

     case 3:
      console.log("done");

     case 4:
     case "end":
      return _context.stop();
    }
  }), _callee);
})))().catch((function(err) {
  console.error(err), process.exit(1);
}));
