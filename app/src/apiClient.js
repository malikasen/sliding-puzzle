import { getMatrixPosition } from "./helpers";

export const getTasks = () => _get("/api/tasks");
export const getLeaders = () => {
  return _get("/api/leaders");
};
export const addTask = (name) => _post("/api/tasks", { name });
export const addScore = (newScore) => {
  return _post("/api/leaders", newScore);
}
export const editScore = (newScore) => {
  return _put("api/leaders/${newScore.username}", newScore)
}

const _get = async (url) => (await fetch(url)).json();

const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};

const _put = async (url, body) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}
  return result;
}