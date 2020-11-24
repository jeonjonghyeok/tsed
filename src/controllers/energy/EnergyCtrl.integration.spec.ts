import {PlatformTest} from "@tsed/common";
import * as SuperTest from "supertest";
import {Server} from "../../Server";

describe("EnergyCtrl", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  // bootstrap your expressApplication in first
  beforeAll(PlatformTest.bootstrap(Server));
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());
  });
  afterAll(PlatformTest.reset);

  // then run your test
  describe("GET /", () => {
    it("should Energy page", async () => {
      const response = await request.get("/").expect(200);

      expect(response.headers['content-type']).toEqual("text/html; charset=utf-8");
      expect(response.text).toEqual("");
    });
  });
});
