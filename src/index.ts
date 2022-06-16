import http from "http";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
} from "./controller/usersController";

const server = http.createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    getUsers(req, res);
  } else if (
    req?.url?.match(/\/api\/users\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    getUser(req, res, id);
  } else if (req.url === "/api/users" && req.method === "POST") {
    createUser(req, res);
  } else if (
    req?.url?.match(/\/api\/users\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateUser(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
