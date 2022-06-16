import http from "http";
import { getUsers } from "./controller/usersController";

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/api/users" && req.method === "GET") {
    getUsers(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
