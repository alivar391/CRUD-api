import { findAll, findById, create, update, IUser } from "../models/usersModel";
import { ServerResponse, IncomingMessage } from "http";
import { getPostData } from "../utils";

// get All users
// GET api/users
export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

// get one user
// GET api/users/:id
export const getUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  try {
    const user = await findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
};

// create new user
// POST api/users
export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await getPostData(req);

    const { username, age, hobbies } = JSON.parse(body);
    const user = {
      username,
      age,
      hobbies,
    };

    const newUser = await create(user);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};

// update user
// PUT api/users/id
export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  try {
    const userToUpdate = await findById(id);

    if (!userToUpdate) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      const body = await getPostData(req);

      const { username, age, hobbies } = JSON.parse(body) as IUser;
      const userData = {
        username: username || userToUpdate.username,
        age: age || userToUpdate.age,
        hobbies: hobbies || userToUpdate.hobbies,
      };

      const updatedUser = await update(id, userData);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedUser));
    }
  } catch (error) {
    console.log(error);
  }
};
