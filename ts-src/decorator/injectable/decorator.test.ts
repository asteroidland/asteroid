import { assertEquals, assertNotEquals, assertThrows } from "../../deps-test.ts"
import { Injectable } from "./decorator.ts";

const testPackage = 'Injectable Decorator';

Deno.test(`[${testPackage}] - Should pass`, () => {
  let isThrowing = false;
  try {
    @Injectable()
    class InjectableClass {
      constructor() {}
    }
  } catch (e) {
    isThrowing = true;
  }

  assertEquals(isThrowing, false);
})