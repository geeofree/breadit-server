import supertest from "supertest";
import server from "../../src/server";

describe("users.controller", () => {
  describe("sign-up", () => {
    it("should be able to sign-up a new user", async () => {
      const data = { username: "batman", password: "batman" };
      const { statusCode, body } = await supertest(server)
        .post("/api/users/sign-up")
        .send(data);
      expect(statusCode).toBe(201);
      expect(body.status).toBe(201);
      expect(body.message).toBe("Successfully signed-up new user.");
      expect(body.data).toEqual(
        expect.objectContaining({
          username: data.username,
          unique_code: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        })
      );
    });
  });
});
