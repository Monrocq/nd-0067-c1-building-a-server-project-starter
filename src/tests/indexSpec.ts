import supertest from "supertest";
import app from "../index";

const request = supertest(app);
describe("Test endpoint responses", () => {
  it("gets the api endpoint", (done) => {
    request.get("/api").then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });
});
