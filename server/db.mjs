import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getTasks = () => db.any("SELECT * FROM tasks");
export const getLeaders = () => db.any("SELECT * FROM leaderboard ORDER BY lowestNumberOfMoves DESC LIMIT 5");

export const addTask = (name) =>
  db.one("INSERT INTO tasks(name) VALUES(${name}) RETURNING *", { name });
export const addScore = (username, numberOfMoves) => {
  console.log("username, and moves", username, numberOfMoves)
  return db.one("INSERT INTO leaderboard(username, lowestnumberofmoves) VALUES(${username}, ${numberOfMoves}) RETURNING *", { username, numberOfMoves});
}

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
