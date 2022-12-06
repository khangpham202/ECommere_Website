const viewRouter = require("./view");
const apiRouter = require("./api");
function route(app) {
  app.use("/api", apiRouter);
  // app.use("/checkout", apiRouter);
  app.use("/", viewRouter);
}
module.exports = route;
