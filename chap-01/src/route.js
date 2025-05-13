import methods from "methods";
import Layer from "./layer.js";

export function Route(path) {
  this.path = path;
  this.stack = [];

  this.methods = {};
}

methods.forEach(function (method) {
  Route.prototype[method] = function (...args) {
    const handles = flatten(args);

    for (let i = 0; i < handles.length; i++) {
      const handle = handles[i];

      if (typeof handle !== "function") {
        const type = Object.prototype.toString.call(handle);
        const msg = `Route.${method}() requires a callback function but got a ${type}`;
        throw new Error(msg);
      }

      const layer = new Layer("/", {}, handle); // changed to `new Layer(...)`
      layer.method = method;

      this.methods[method] = true;
      this.stack.push(layer);
    }

    return this;
  };
});
