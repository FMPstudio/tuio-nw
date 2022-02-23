var Tuio = require("@fmpstudio/tuio-nw");
var tuioClient = new Tuio.Client({
  host: "127.0.0.1",
  port: 3333,
});

var onAddTuioCursor = function (addCursor) {
    console.log(addCursor);
  },
  onUpdateTuioCursor = function (updateCursor) {
    console.log(updateCursor);
  },
  onRemoveTuioCursor = function (removeCursor) {
    console.log(removeCursor);
  },
  onAddTuioObject = function (addObject) {
    console.log(addObject);
  },
  onUpdateTuioObject = function (updateObject) {
    console.log(updateObject);
  },
  onRemoveTuioObject = function (removeObject) {
    console.log(removeObject);
  },
  onRefresh = function (time) {
    console.log(time);
  };

tuioClient.on("addTuioCursor", onAddTuioCursor);
tuioClient.on("updateTuioCursor", onUpdateTuioCursor);
tuioClient.on("removeTuioCursor", onRemoveTuioCursor);
tuioClient.on("addTuioObject", onAddTuioObject);
tuioClient.on("updateTuioObject", onUpdateTuioObject);
tuioClient.on("removeTuioObject", onRemoveTuioObject);
tuioClient.on("refresh", onRefresh);

tuioClient.listen();
