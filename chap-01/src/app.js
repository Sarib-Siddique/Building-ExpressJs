import methods from "methods";

export const app = {
  init() {
    this.cache = {};
    this.engines = {};
    this.settings = {};
    this._router = undefined;
  },
};

var slice = Array.prototype.slice;

methods.forEach(function (method) {
  app[method] = function (path) {
    this.lazyrouter(); // Step 1: Initialize router or something else

    var route = this._router.route(path); // Step 2: Get the route for the given path
    route[method].apply(route, slice.call(arguments, 1)); // Step 3: Call the dynamic method (e.g., get or post) on the route

    return this; // Step 4: Allow chaining
  };
});

app.lazyrouter = function lazyrouter() {
  if (!this._router) {
    this._router = new Router({});
  }
};
