/** @notice library imports */
import { testClient } from "hono/testing";
/// Local imports
import { helloRouter } from "./helloRouter";

/// Inferred router
const helloApp = testClient(helloRouter);

describe("Hello routes", () => {
  it(`Should validate "/:name" route when name is "MacBook".`, async () => {
    const response = await helloApp[":name"].$get({
      param: {
        name: "MacBook",
      },
    });

    expect(await response.text()).toBe("Hello, MacBook!");
  });
});
