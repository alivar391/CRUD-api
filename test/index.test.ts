import { server } from "../src/index";
import request from "supertest";

const user = {
  username: "Alivar391",
  age: 32,
  hobbies: ["traveling", "bike"],
};

const newUser = {
  username: "Alivar391_frontender",
  age: 35,
  hobbies: ["drinking", "smoking"],
};

const notValidUser = {
  username: "Alivar391_frontender",
  age: 35,
};

const badData = "some string";
afterEach(() => server.close());
describe("Test scenario 1", () => {
  afterAll(() => server.close());

  let id: string;

  it("Get all records with a GET api/users request (an empty array is expected)", async () => {
    const res = await request(server).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it("A new object is created by a POST api/users request (a response containing newly created record is expected)", async () => {
    const res = await request(server).post("/api/users").send(user);
    id = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe("Alivar391");
    expect(res.body.age).toBe(32);
    expect(res.body.hobbies).toEqual(["traveling", "bike"]);
  });

  it("With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)", async () => {
    const res = await request(server).get(`/api/users/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe("Alivar391");
    expect(res.body.age).toBe(32);
    expect(res.body.hobbies).toEqual(["traveling", "bike"]);
  });

  it("We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)", async () => {
    const res = await request(server).put(`/api/users/${id}`).send(newUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe("Alivar391_frontender");
    expect(res.body.age).toBe(35);
    expect(res.body.hobbies).toEqual(["drinking", "smoking"]);
  });

  it("With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const res = await request(server).delete(`/api/users/${id}`);
    expect(res.statusCode).toBe(204);
    expect(res.body).toBe("");
  });

  it("With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)", async () => {
    const res = await request(server).get(`/api/users/${id}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User Not Found");
  });
});

//Test scenario 2

describe("Test scenario 2. Test errors", () => {
  afterAll(() => server.close());

  let id1: string;
  let id2: string;
  const notValidId = "9dd34b32-c276-4e04-b496-ff0cf039e71";

  it("Try request to wrong route (expect 404 status code with message)", async () => {
    const res = await request(server).get("/api/user");
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Route not found");
  });

  it("Try to create new user with invalid data (expect 400 status code with message)", async () => {
    const res = await request(server).post("/api/users").send(notValidUser);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "Necessary field unavailable or have wrong types",
    );
  });

  it("A two new objects are created by a POST api/users request (a response containing newly created record is expected)", async () => {
    const res = await request(server).post("/api/users").send(user);
    id1 = res.body.id;
    expect(res.statusCode).toBe(201);
    const res2 = await request(server).post("/api/users").send(newUser);
    id2 = res2.body.id;
    expect(res2.statusCode).toBe(201);
  });

  it("Try to request with not valid id (expect 400 status code with message)", async () => {
    const res = await request(server).get(`/api/users/${notValidId}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("UserId Not uuidv4");
  });

  it("Try to update the created record with a PUT api/users/{userId} request with text data(expected 400 status code with message)", async () => {
    const res = await request(server).put(`/api/users/${id1}`).send(badData);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "Bad request: content-type is not application/json",
    );
  });

  it("Try to update the created record with a PUT api/users/{userId} request with bad JSON data(expected 500 status code with message)", async () => {
    const res = await request(server)
      .put(`/api/users/${id1}`)
      .set("Content-type", "application/json")
      .send(badData);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Internal server error");
  });

  it("DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const res1 = await request(server).delete(`/api/users/${id1}`);
    expect(res1.statusCode).toBe(204);
    expect(res1.body).toBe("");
    const res2 = await request(server).delete(`/api/users/${id2}`);
    expect(res2.statusCode).toBe(204);
    expect(res2.body).toBe("");
  });
});

//Test scenario 3

describe("Test scenario 3", () => {
  afterAll(() => server.close());

  const user1 = {
    username: "Alivar391",
    age: 31,
    hobbies: ["traveling", "bike"],
  };

  const user2 = {
    username: "Alivar392",
    age: 32,
    hobbies: ["bike"],
  };

  const user3 = {
    username: "Alivar393",
    age: 33,
    hobbies: ["traveling"],
  };

  let id1: string;
  let id2: string;
  let id3: string;

  it("Get all records with a GET api/users request (an empty array is expected)", async () => {
    const res = await request(server).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it("Three new objects are created by a POST api/users request (a response containing newly created record is expected)", async () => {
    const res1 = await request(server).post("/api/users").send(user1);
    id1 = res1.body.id;
    expect(res1.statusCode).toBe(201);
    const res2 = await request(server).post("/api/users").send(user2);
    id2 = res2.body.id;
    expect(res2.statusCode).toBe(201);
    const res3 = await request(server).post("/api/users").send(user3);
    id3 = res3.body.id;
    expect(res3.statusCode).toBe(201);
  });

  it("Get all records with a GET api/users request (array with length 3 is expected)", async () => {
    const res = await request(server).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(3);
    expect(res.body[0].username).toBe("Alivar391");
    expect(res.body[1].username).toBe("Alivar392");
    expect(res.body[2].username).toBe("Alivar393");
  });

  it("DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const res = await request(server).delete(`/api/users/${id1}`);
    expect(res.statusCode).toBe(204);
    expect(res.body).toBe("");
  });

  it("Get all records with a GET api/users request (array with length 2 is expected)", async () => {
    const res = await request(server).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(2);
    expect(res.body[0].username).toBe("Alivar392");
    expect(res.body[1].username).toBe("Alivar393");
  });

  it("Try to update deleted user with a PUT api/users/{userId} request with text data(expected 404 status code with message)", async () => {
    const res = await request(server).put(`/api/users/${id1}`).send(user1);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User Not Found");
  });

  it("DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const res1 = await request(server).delete(`/api/users/${id2}`);
    expect(res1.statusCode).toBe(204);
    expect(res1.body).toBe("");
    const res2 = await request(server).delete(`/api/users/${id3}`);
    expect(res2.statusCode).toBe(204);
    expect(res2.body).toBe("");
  });

  it("Get all records with a GET api/users request (an empty array is expected)", async () => {
    const res = await request(server).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});