var proto = require("./app");

export function createApplication() {
  let app = function (req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, proto, false);

  app.init();
  return app;
}
