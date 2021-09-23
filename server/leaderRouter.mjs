import express from "express";

import * as db from "./db.mjs";

const leaderRouter = express.Router();

leaderRouter.get("/", async (request, response) => {
  const leaders = await db.getleaders();
  response.json(leaders);
});

leaderRouter.use(express.json());
// leaderRouter.post("/", async (request, response) => {
//   const leader = await db.addScore(request.body.name);
//   response.status(201).json(leader);
// });

export default leaderRouter;