import express from "express";

import * as db from "./db.mjs";

const leaderRouter = express.Router();

leaderRouter.get("/", async (request, response) => {
  const leaders = await db.getLeaders();
  response.json(leaders);
});

leaderRouter.use(express.json());

leaderRouter.post("/", async (request, response) => {
  const params = {
    username: request.body.username,
    numberOfMoves: request.body.numberOfMoves,
  }
  const newScore = await db.addScore(params);
  response.status(201).json(newScore);
});

leaderRouter.put("/:username", async (request, response) => {
  const params = {
    username: request.body.username,
    numberOfMoves: request.body.numberOfMoves
  }
  const newScore = await db.editScore(params);
  response.status(201).json(newScore);
})

export default leaderRouter;