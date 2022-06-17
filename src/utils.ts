import { validate as uuidValidate } from "uuid";
import { version as uuidVersion } from "uuid";
import { IncomingMessage } from "http";

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
