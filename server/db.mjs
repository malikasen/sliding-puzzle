import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getTasks = () => db.any("SELECT * FROM tasks");
export const getLeaders = () => db.any("SELECT * FROM leaderboard ORDER BY lowestNumberOfMoves ASC");

export const addTask = (name) =>
  db.one("INSERT INTO tasks(name) VALUES(${name}) RETURNING *", { name });
export const addScore = ({ username, numberOfMoves }) => {
  console.log("username, and moves", username, numberOfMoves)
  return db.one("INSERT INTO leaderboard(username, lowestnumberofmoves) VALUES(${username}, ${numberOfMoves}) RETURNING *", { username, numberOfMoves});
}

export const editScore = ({ username, numberOfMoves }) => {
  db.one("UPDATE leaderboard SET lowestnumberofmoves=${numberOfMoves} WHERE username=${username} RETURNING *", { username, numberOfMoves });
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
