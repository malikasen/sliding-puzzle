import express from "express";

import * as db from "./db.mjs";

const leaderRouter = express.Router();

leaderRouter.get("/", async (request, response) => {
  const leaders = await db.getLeaders();
  console.log(leaders);
  response.json(leaders);
});

leaderRouter.use(express.json());
leaderRouter.post("/", async (request, response) => {
  console.log("request.body", request.body);
  const params = {
    username: request.body.username.username,
    numberOfMoves: request.body.username.numberOfMoves,
  }
  console.log("params", params)
  const newScore = await db.addScore(params);
  response.status(201).json(newScore);
});

export default leaderRouter;