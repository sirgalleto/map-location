const request = require("supertest");
const server = require("../server");

describe("Locations entity", () => {
  // As Id is defined as an Int, if we send an string the service should never return a location
  const imposibleId = "abc";

  describe("GET /location", () => {
    test("Should return an empty array", async () => {
      const response = await request(server).get("/location");
      expect(response.body).toEqual([]);
    });
  });

  describe("GET /location:id", () => {
    test("Should return a not found error", async () => {
      const response = await request(server).get(`/location/${imposibleId}`);
      expect(response.status).toEqual(404);
    });
  });

  describe("POST /location", () => {
    test("Should return a bad request error", async () => {
      const response = await request(server).post("/location");
      expect(response.status).toEqual(400);
    });
  });

  describe("PUT /location/:id", () => {
    test("Should return a not found error", async () => {
      const response = await request(server).put(`/location/${imposibleId}`);
      expect(response.status).toEqual(404);
    });
  });

  describe("DELETE /location/:id", () => {
    test("Should return a not found error", async () => {
      const response = await request(server).delete(`/location/${imposibleId}`);
      expect(response.status).toEqual(404);
    });
  });
});
