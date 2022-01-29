const express = require("express");
const jwt = require("jsonwebtoken");
const validator = require("express-joi-validation").createValidator({});
const multer = require("multer");

export default function setApiRoutes(app: any) {
  const router = express.Router();

  // const apiController = new ApiController();

  const upload = multer({
    dest: "uploads/documents/",
  });

  function requireApiToken(req: any, res: any, next: any) {
    let token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      token = req.query.token;
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      next();
    } catch (err: any) {
      return res.status(401).json({
        success: false,
        status: "error",
        message: err.message,
      });
    }
  }

  /**
   * For all api/* routes require valid jwt token
   */
  app.all(
    ["/api/v1", "/api/v1/*"],
    requireApiToken,
    function (req: any, res: any, next: any) {
      next();
    }
  );
  app.use("/api/v1", router);

  //router.post("/reset-admin-password", validator.body(AdminValidation.resetPassword), apiController.resetAdminPassword);

  app.use((err: any, req: any, res: any, next: any) => {
    if (err && err.error && err.error.isJoi) {
      // we had a joi error, let's return a custom 400 json response
      res.status(400).json({
        success: false,
        status: "error",
        type: err.type, // will be "query" here, but could be "headers", "body", or "params"
        message: err.error.toString(),
      });
    } else {
      // pass on to another error handler
      next(err);
    }
  });
}
