import cors from "cors";
import express from "express";
import helmet from "helmet";

import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { apiRouter } from "./routes/index.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`HEALIX API listening on port ${env.port}`);
});
