import request from "supertest";
import testHelpers from "@utils/testHelpers";
import app from "@infra/http/app";

describe("Test the routes at /users", () => {
  testHelpers.routeTestInit(app);

  describe("the endpoint /users", () => {
    describe("for GET requests", () => {
      it("should respond with status code 200 and an object containing user info", async () => {
        const emailAddress = "hello@example.com";
        const username = "example";

        const response: request.Response = await request(app)
          .get("/users")
          .send({ emailAddress, username });

        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
          user: {
            emailAddress,
            username,
          },
        });
      });

      it("should respond with status code 400 and an error message if request body is empty", async () => {
        const response: request.Response = await request(app).get("/users");

        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({
          message: expect.any(String),
        });
      });
    });
  });
});
