import { assertEquals, assertNotEquals, assertThrows } from "../../deps-test.ts"
import { Controller } from "./decorator.ts";

const testPackage = 'Controller Decorator';

Deno.test(`[${testPackage}] - Should pass`, () => {
  let isThrowing = false;
  try {
    @Controller()
    class ControllerClass {
      constructor() {}
    }
  } catch (e) {
    isThrowing = true;
  }

  assertEquals(isThrowing, false);
})