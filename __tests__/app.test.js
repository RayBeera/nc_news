const app = require("../app/app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const data = require("../db/data/test-data");
const endpointsFile = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  db.end();
});

describe("GET /api/topics", () => {
  it("return an array of objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        const topics = res.body.topics;
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });
  it("invalid endpoint", () => {
    return request(app).get("/api/invalidEndpoint").expect(404);
  });
});

describe("GET /api/", () => {
  it("get all valid endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        const endpointsResponse = res.body.endpoints;
        expect(endpointsResponse).toMatchObject(endpointsFile);
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  it("GET an article object with specific id", () => {
    const articleId = 2;
    return request(app)
      .get(`/api/articles/${articleId}`)
      .expect(200)
      .then((res) => {
        const { article } = res.body;
        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: articleId,
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        });
      });
  });
});
