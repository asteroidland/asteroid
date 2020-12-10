import { ServerRequest } from "https://deno.land/std@0.80.0/http/server.ts";
import { assertEquals, assertExists, assertThrows } from 'https://deno.land/std@0.80.0/testing/asserts.ts';
import { AsteroidApplication } from "../src/asteroid.ts";
import { Controller } from "../src/decorator/controller.decorator.ts";
import { Get } from "../src/decorator/method.decorator.ts";
import { HTTPMethod, MethodOptions } from "../src/types.ts";
import { ServerMock } from "./mock/server.mock.ts";

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

Deno.test(`[${testPackage}] #3 - AsteroidApplication.addController: Should be success`, () => {
  const app = new AsteroidApplication();
  assertExists(app);
  assertEquals(app instanceof AsteroidApplication, true)

  @Controller('test')
  class ControllerTest {
    constructor() {}

    @Get('get')
    GetTest() {}
  }

  app.addController(new ControllerTest())

  //@ts-ignore
  const routes = app.routes

  const options: MethodOptions = {
    path: '/test/get',
    method: HTTPMethod.GET
  }

  assertEquals(routes.has(JSON.stringify(options)), true)
});

Deno.test(`[${testPackage}] #4 - AsteroidApplication.listen: Should return status 200`, async () => {
  const app = new AsteroidApplication();
  assertExists(app);
  assertEquals(app instanceof AsteroidApplication, true)

  @Controller('test')
  class ControllerTest {
    constructor() {}

    @Get()
    GetTest() {
      return '';
    }
  }

  const server: ServerMock = new ServerMock()
  server.request.url = '/test'
  server.request.method = 'GET'

  //@ts-ignore
  // Mock app.newServer
  app.newServer = (): AsyncIterable<ServerRequest> => {
    return server
  }

  app.addController(new ControllerTest());

  await app.listen()

  assertEquals(server.responseResult?.status, 200)
});