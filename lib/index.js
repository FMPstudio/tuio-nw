"use strict";

const Tuio = require("./tuio.js");
require("./tuio-time.js")(Tuio);
require("./tuio-point.js")(Tuio);
require("./tuio-container.js")(Tuio);
require("./tuio-cursor.js")(Tuio);
require("./tuio-object.js")(Tuio);
require("./tuio-client.js")(Tuio);

module.exports = Tuio;
