import { assertEquals, assertExists, assertThrows } from 'https://deno.land/std@0.80.0/testing/asserts.ts'
import { AsteroidApplication } from "../src/asteroid.ts";
import { Controller } from "../src/decorator/controller.decorator.ts";
import { Get } from "../src/decorator/method.decorator.ts";

const testPackage = 'Asteroid'

Deno.test(`[${testPackage}] #1 - New AsteroidApplication: Should create an instance of AsteroidApplication`, () => {
  const app = new AsteroidApplication();
  assertExists(app);
  assertEquals(app instanceof AsteroidApplication, true)
});

Deno.test(`[${testPackage}] #2 - AsteroidApplication.addController: Should return throw Controller without routes`, () => {
  const app = new AsteroidApplication();
  assertExists(app);
  assertEquals(app instanceof AsteroidApplication, true)

  @Controller()
  class ControllerTest {
    constructor() {}
  }

  assertThrows(() => app.addController(new ControllerTest()), undefined, 'Controller without routes');
});