import http from "http";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./controller/usersController";
import "dotenv/config";

const server = http.createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    getUsers(req, res);
  } else if (
    req?.url?.match(/^\/api\/users\/[\w-]+$/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    getUser(req, res, id);
  } else if (req.url === "/api/users" && req.method === "POST") {
    createUser(req, res);
  } else if (
    req?.url?.match(/^\/api\/users\/[\w-]+$/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateUser(req, res, id);
  } else if (
    req?.url?.match(/^\/api\/users\/[\w-]+$/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteUser(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
