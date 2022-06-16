const users = require("../data.json");
import { v4 as uuidv4 } from "uuid";

interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

interface ICreateUser {
  username: string;
  age: number;
  hobbies: string[];
}

export const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findById = (id: string) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user: IUser) => user.id === id);
    resolve(user);
  });
};

export const create = (user: ICreateUser) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    resolve(newUser);
  });
};
