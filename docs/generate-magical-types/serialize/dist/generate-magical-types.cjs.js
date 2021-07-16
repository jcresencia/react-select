'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./generate-magical-types.cjs.prod.js");
} else {
  module.exports = require("./generate-magical-types.cjs.dev.js");
}
