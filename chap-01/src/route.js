import methods from "methods";

function Route(path) {
  this.path = path;
  this.stack = [];

  this.methods = {};
}
