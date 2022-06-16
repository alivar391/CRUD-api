const data = require("../data.json");

export const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};
