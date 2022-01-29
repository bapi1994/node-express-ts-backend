/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const validator = require("express-joi-validation").createValidator({});
import AuthValidation from "../validation/AuthValidation";
import AuthController from "../controllers/AuthController";

export default function setAuthRoutes(app: any) {
  const router = express.Router();

  const authController = new AuthController();

  function authMiddleWare(req: any, res: any, next: () => void) {
    next();
  }

  /**
   * For all /cms/auth/* routes
   */
  app.all(
    ["/api/v1", "/api/v1/*"],
    authMiddleWare,
    function (req: any, res: any, next: () => void) {
      next();
    }
  );

  /**
   * For auth
   */
  router.post(
    "/login",
    validator.body(AuthValidation.login_validation),
    authController.login
  );
  router.post(
    "/register",
    validator.body(AuthValidation.register_validation),
    authController.register
  );

  app.use("/api/v1", router);

  app.use(
    (
      err: { error: { isJoi: any; toString: () => any }; type: any },
      req: any,
      res: {
        status: (arg0: number) => {
          (): any;
          new (): any;
          json: {
            (arg0: {
              success: boolean;
              status: string;
              type: any; // will be "query" here, but could be "headers", "body", or "params"
              message: any;
            }): void;
            new (): any;
          };
        };
      },
      next: (arg0: any) => void
    ) => {
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
    }
  );
}
