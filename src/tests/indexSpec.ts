import supertest from "supertest";
import app from "../index";

const request = supertest(app);
describe("Test endpoint responses", () => {
  it("gets the api endpoint", (done) => {
    request.get("/api").then((response: supertest.Response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

  it("gets the image endpoint", (done) => {
    request.get("/api/images?filename=fjord&width=200&height=200").then((response: supertest.Response) => {
      expect(response.status).toBe(200);
      done();
    });
  });
});
