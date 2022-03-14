import supertest from "supertest";
import server from "../../src/server";

describe("groups.controller", () => {
  describe("create group", () => {
    it("should be able to create a group from a given username", async () => {
      const data = {
        name: "breadit",
        description: "hmmmm",
        username: "spider-man",
      };
      const { statusCode, body } = await supertest(server)
        .post("/api/groups")
        .send(data);

      expect(statusCode).toBe(201);
      expect(body.status).toBe(201);
      expect(body.message).toBe("Successfully created a new group.");
      expect(body.data).toEqual(
        expect.objectContaining({
          name: data.name,
          description: data.description,
          unique_code: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          creator: expect.objectContaining({
            username: data.username,
            unique_code: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String),
          }),
        })
      );
    });

    it("should return a 404 response if the given user does not exist", async () => {
      const data = {
        name: "breadit",
        description: "hmmmm",
        username: "doesnotexist",
      };
      const { statusCode, body } = await supertest(server)
        .post("/api/groups")
        .send(data);

      expect(statusCode).toBe(404);
      expect(body.status).toBe(404);
      expect(body.message).toBe("Failed to create group. User does not exist.");
      expect(body.data).toBeUndefined();
    });
  });

  describe("get by group name", () => {
    it("should return a group from a given group name", async () => {
      const groupName = "atp";
      const { statusCode, body } = await supertest(server).get(
        `/api/groups/${groupName}`
      );

      expect(statusCode).toBe(200);
      expect(body.status).toBe(200);
      expect(body.message).toBe("Successfully retrieved group.");
      expect(body.data).toEqual(
        expect.objectContaining({
          name: groupName,
          description: expect.any(String),
          unique_code: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          total_users: expect.any(Number),
        })
      );
    });

    it("should return a 404 response if the group does not exist", async () => {
      const { statusCode, body } = await supertest(server).get(
        "/api/groups/doesnotexist"
      );

      expect(statusCode).toBe(404);
      expect(body.status).toBe(404);
      expect(body.message).toBe(
        "Could not retrieve group. Group does not exists."
      );
      expect(body.data).toBeUndefined();
    });
  });

  describe("subscribe/unsubscribe to a group", () => {
    it("should be able to subscribe the current user to a group", async () => {
      const groupName = "atp";

      const getGroup = await supertest(server).get(`/api/groups/${groupName}`);

      const { statusCode, body } = await supertest(server)
        .put(`/api/groups/${groupName}/subscription`)
        .query({ subscribe: 1 })
        .set("authorization", `Bearer ${process.env.JWT_TOKEN}`);

      expect(statusCode).toBe(200);
      expect(body.status).toBe(200);
      expect(body.message).toBe("Successfully subscribed to group.");
      expect(body.data).toEqual(
        expect.objectContaining({
          name: groupName,
          description: expect.any(String),
          unique_code: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          total_users: getGroup.body.data.total_users + 1,
        })
      );
    });

    it("should return a 404 response when the given group or user name does not exist when subscribing.", async () => {
      const { statusCode, body } = await supertest(server)
        .put("/api/groups/doesnotexist/subscription")
        .query({ subscribe: 1 })
        .set("authorization", `Bearer ${process.env.JWT_TOKEN}`);

      expect(statusCode).toBe(404);
      expect(body.status).toBe(404);
      expect(body.message).toBe(
        "Could not subscribe to group. User or group does not exist."
      );
      expect(body.data).toBeUndefined();
    });

    it("should be able to unsubscribe the current user to a group", async () => {
      const groupName = "atp";

      const getGroup = await supertest(server).get(`/api/groups/${groupName}`);

      const { statusCode, body } = await supertest(server)
        .put(`/api/groups/${groupName}/subscription`)
        .query({ subscribe: 0 })
        .set("authorization", `Bearer ${process.env.JWT_TOKEN}`);

      expect(statusCode).toBe(200);
      expect(body.status).toBe(200);
      expect(body.message).toBe("Successfully unsubscribed to group.");
      expect(body.data).toEqual(
        expect.objectContaining({
          name: groupName,
          description: expect.any(String),
          unique_code: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          total_users: getGroup.body.data.total_users - 1,
        })
      );
    });

    it("should return a 404 response when the given group or user name does not exist when unsubscribing.", async () => {
      const { statusCode, body } = await supertest(server)
        .put("/api/groups/doesnotexist/subscription")
        .query({ subscribe: 0 })
        .set("authorization", `Bearer ${process.env.JWT_TOKEN}`);

      expect(statusCode).toBe(404);
      expect(body.status).toBe(404);
      expect(body.message).toBe(
        "Could not unsubscribe to group. User or group does not exist."
      );
      expect(body.data).toBeUndefined();
    });

    it("should return a 400 response when the subscribe query parameter is malformed", async () => {
      const { statusCode, body } = await supertest(server)
        .put("/api/groups/doesnotexist/subscription")
        .query({ subscribe: "notvalid" })
        .set("authorization", `Bearer ${process.env.JWT_TOKEN}`);

      expect(statusCode).toBe(400);
      expect(body.status).toBe(400);
      expect(body.message).toBe("Missing/invalid subscribe query value.");
      expect(body.data).toBeUndefined();
    });
  });
});
