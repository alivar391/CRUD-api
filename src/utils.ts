import { validate as uuidValidate } from "uuid";
import { version as uuidVersion } from "uuid";
import { IncomingMessage } from "http";
import { ICreateUser } from "./models/usersModel";

export const getPostData = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const uuidValidateV4 = (uuid: string): boolean => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

export const validateNewUserInfo = (newUser: ICreateUser) => {
  if (
    newUser.hasOwnProperty("username") &&
    newUser.hasOwnProperty("age") &&
    newUser.hasOwnProperty("hobbies")
  ) {
    if (
      typeof newUser.username === "string" &&
      typeof newUser.age === "number" &&
      Array.isArray(newUser.hobbies)
    ) {
      return true;
    } else return false;
  } else return false;
};
