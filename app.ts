/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as dotenv from "dotenv";
const cors = require("cors");
const nocache = require("nocache");
const helmet = require("helmet");
const express = require("express");
const app = express();
dotenv.config();
import setAuthRoutes from "./routes/AuthRoutes";
import setApiRoutes from "./routes/ApiRoutes";

if (!process.env.PORT) {
  process.exit(0);
}

const corsOption = {
  origin: ["http://localhost:4200", "https://example.in"],
};
app.use(cors(corsOption));

app.use(nocache());
app.use(helmet());

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

setAuthRoutes(app);
setApiRoutes(app);

app.listen(process.env.PORT || 5000, async () => {
  console.log(`Server started running on port ${process.env.PORT}`);
});

app.get("/", function (req: any, res: any) {
  res.status(200).json({ "Wow!": "Your server is running" });
});

/**
 * 404 route
 */
app.get("*", function (req: any, res: any) {
  res.status(400).json({ "Oops!": "Requested page is not available" });
});

export { app };
