const user = require("./user-routes");
const student = require("./student-routes");
const notice = require("./notice-routes");

// connect routes for initial endpoints
module.exports = (app) => {
  app.use("/admin", user);
  app.use("/student", student);
  app.use("/notice", notice);
};
