const app = require("../app.js");
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
    return request(app)
      .get(`/api/articles/3`)
      .expect(200)
      .then((res) => {
        const { article } = res.body;
        expect(article).toMatchObject({
          author: "icellusedkars",
          title: "Eight pug gifs that remind me of mitch",
          article_id: 3,
          body: "some gifs",
          topic: "mitch",
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  it("GET 404 status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("article not found");
      });
  });
  it("GET 400 status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
});

describe("GET /api/articles", () => {
  it("return an array of object with all articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const { articles } = res.body;
        expect(articles.length).toBe(13);
        articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test("GET 200 and an  array is sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
  // test.only("should take a topic query that returns only articles of the given topic", () => {
  //   return request(app)
  //     .get("/api/articles?topic=cats")
  //     .expect(200)
  //     .then((res) => {
  //       const { articles } = res.body;
  //       expect(articles).toHaveLength(1);
  //       articles.forEach((snack) => {
  //         expect(snack.topic).toBe("cats");
  //       });
  //     });
  // });
});

describe("GET /api/articles/:article_id/comments", () => {
  it("get all comments for an article", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then((res) => {
        const { comments } = res.body;
        expect(comments).toHaveLength(2);
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: 9,
          });
        });
      });
  });
  it("GET 404 status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("article not found");
      });
  });
  it("GET 400 status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/banana/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
  test("GET 200 array with the most recent comment first", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        const { comments } = response.body;
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("GET 200 when article has no comment", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((res) => {
        const { comments } = res.body;
        expect(comments).toHaveLength(0);
        expect(comments).toEqual([]);
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  it("it should add a new comment and sends it back", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Huskies are good-natured and people-loving",
    };
    return request(app)
      .post("/api/articles/3/comments")
      .send(newComment)
      .expect(201)
      .then((res) => {
        const { comment } = res.body;
        expect(comment).toMatchObject({
          body: "Huskies are good-natured and people-loving",
          votes: expect.any(Number),
          author: "butter_bridge",
          article_id: 3,
          created_at: expect.any(String),
          comment_id: expect.any(Number),
        });
      });
  });
  it("GET 400 status and error message when given an invalid id", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Huskies are good-natured and people-loving",
    };
    return request(app)
      .post("/api/articles/banana/comments")
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
  it("GET 404 send error mesaage when user doesn't exist", () => {
    const newComment = {
      username: "butter_house",
      body: "Huskies are good-natured and people-loving",
    };
    return request(app)
      .post("/api/articles/999/comments")
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe(`Bad request`);
      });
  });
  it("GET 400 send error mesaage when body is empty", () => {
    const newComment = {
      username: "butter_house",
      body: "",
    };
    return request(app)
      .post("/api/articles/999/comments")
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe(`Bad request`);
      });
  });
  it("GET 400 send error mesaage when request object is missing keys", () => {
    const newComment = {
      username: "butter_house",
    };
    return request(app)
      .post("/api/articles/999/comments")
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe(`Bad request`);
      });
  });
});

describe("PATCH api/articles/:article_id", () => {
  it("update an article", () => {
    const vote = { inc_votes: 1 };
    return request(app)
      .patch("/api/articles/1")
      .send(vote)
      .expect(200)
      .then((res) => {
        const { article } = res.body;
        expect(article).toMatchObject({
          article_id: 1,
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: 101,
          article_img_url: expect.any(String),
        });
      });
  });
  it(" decrement the current article's votes when inc_votes = -10 ", () => {
    const vote = { inc_votes: -10 };
    return request(app)
      .patch("/api/articles/1")
      .send(vote)
      .expect(200)
      .then((res) => {
        const { article } = res.body;
        expect(article).toMatchObject({
          article_id: 1,
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: 90,
          article_img_url: expect.any(String),
        });
      });
  });
  it("return the original article when inc_votes = 0 ", () => {
    const vote = { inc_votes: 0 };
    return request(app)
      .patch("/api/articles/1")
      .send(vote)
      .expect(200)
      .then((res) => {
        const { article } = res.body;
        expect(article).toMatchObject({
          article_id: 1,
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: 100,
          article_img_url: expect.any(String),
        });
      });
  });
  it("GET 400 status and error message when given an invalid id", () => {
    const vote = { inc_votes: 0 };
    return request(app)
      .patch("/api/articles/banana")
      .send(vote)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
  it(" 404 status and error message when given a valid but non-existent id", () => {
    const vote = { inc_votes: 0 };
    return request(app)
      .patch("/api/articles/999")
      .send(vote)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("article not found");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  it("204: delete the gicen comment by comment_id and return no content ", () => {
    return request(app).delete("/api/comments/4").expect(204);
  });
  test("404 status and error message when given a valid but non-existent id", () => {
    return request(app)
      .delete("/api/comments/999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("comment not found");
      });
  });
  test("DELETE:400 sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .delete("/api/comments/banana")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
});
describe("GET /api/users", () => {
  it("return an array of users objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const { users } = res.body;
        expect(users.length).toBe(4);
        users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
});
