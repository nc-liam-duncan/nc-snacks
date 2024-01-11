const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection");
const seed = require("../db/seed.js");
const data = require("../db/data/test-data");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/snacks", () => {
  it("responds with status 200 and an array containing data for all snacks", () => {
    return request(app)
      .get("/api/snacks")
      .expect(200)
      .then(({ body }) => {
        expect(body.snacks).toHaveLength(6);
        body.snacks.forEach((snack) => {
          expect(typeof snack.snack_id).toBe("number");
          expect(typeof snack.snack_name).toBe("string");
          expect(typeof snack.snack_description).toBe("string");
          expect(typeof snack["price_in_pence"]).toBe("number");
          expect(typeof snack.category_id).toBe("number");
        });
      });
  });
});

describe("GET /api/snacks/:snack_id", () => {
  it("responds with status 200 and an object containing the correct snack data", () => {
    return request(app)
      .get("/api/snacks/5")
      .expect(200)
      .then(({ body: { snack } }) => {
        expect(snack.snack_id).toBe(5);
        expect(snack.snack_name).toBe("Snack C");
        expect(snack.snack_description).toBe("Snack description C");
        expect(snack.price_in_pence).toBe(150);
        expect(snack.category_id).toBe(1);
      });
  });
  it("responds with status 400 and an error message if passed an invalid snack id", () => {
    return request(app)
      .get("/api/snacks/not-an-id")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid id type");
      });
  });
  it("responds with status 404 and an error message if passed a valid snack_id that does not exist in the database", () => {
    return request(app)
      .get("/api/snacks/1000")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Id not found");
      });
  });
});

describe("POST /api/snacks", () => {
  it("responds with status 201 and the created snack", () => {
    const testSnack = {
      snack_name: ""
    };
    return request(app)
      .post("/api/snacks")
      .send({
        snack_name: "DairyLea Dunkers",
        snack_description: "Finally a savoury alternative to yoghurt",
        price_in_pence: 122,
        category_id: 4
      })
      .expect(201)
      .then(({ body: { newSnack } }) => {
        expect(newSnack.snack_name).toBe("DairyLea Dunkers");
        expect(newSnack.snack_description).toBe(
          "Finally a savoury alternative to yoghurt"
        );
        expect(newSnack.price_in_pence).toBe(122);
        expect(newSnack.category_id).toBe(4);
      });
  });
});

describe("GET /api/venders", () => {
  it("responds with status 200 and an array containing data for all vending machines", () => {
    return request(app)
      .get("/api/venders")
      .expect(200)
      .then(({ body }) => {
        expect(body.vendingMachines.length).toBe(4);
        body.vendingMachines.forEach((vendingMachine) => {
          expect(typeof vendingMachine.id).toBe("number");
          expect(typeof vendingMachine.location).toBe("string");
          expect(typeof vendingMachine.rating).toBe("number");
        });
      });
  });
});

describe("GET /api/venders/:venderId", () => {
  it("responds with status 200 and an object containing the correct vending machine data", () => {
    return request(app)
      .get("/api/venders/3")
      .expect(200)
      .then(({ body }) => {
        expect(body.vendingMachine.id).toBe(3);
        expect(body.vendingMachine.location).toBe("Location C");
        expect(body.vendingMachine.rating).toBe(4);
      });
  });
});
