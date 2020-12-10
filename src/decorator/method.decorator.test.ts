import { assertEquals, assertNotEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";
import { ControllerMetadata, HTTPMethod } from "../types.ts";
import { ReflectUtils } from "../utils/reflect.utils.ts";
import { Controller } from "./controller.decorator.ts";
import { Get } from "./method.decorator.ts";

const testPackage = 'Method Decorator'

Deno.test(`[${testPackage}] #1 - Method with : Should be metadata routes and MethodOptions{path: myGetTest, method: GET}`, () => {
  @Controller()
  class MethodTest {
    @Get('myGetTest')
    getTest() {}
  }

  const metadata: ControllerMetadata | undefined = ReflectUtils.getOwnControllerMetadata(MethodTest);

  assertNotEquals(metadata, undefined);
  assertEquals(metadata?.prefix, '/');
  assertEquals(metadata?.routes.size, 1);

  for (let key of metadata!.routes.keys()) {
    assertEquals(key.path, 'myGetTest');
    assertEquals(key.method, HTTPMethod.GET);
  }
  
});

Deno.test(`[${testPackage}] #2 - Method with : Should be metadata routes and MethodOptions{path: '', method: GET}`, () => {
  @Controller()
  class MethodTest {
    @Get()
    getTest() {}
  }

  const metadata: ControllerMetadata | undefined = ReflectUtils.getOwnControllerMetadata(MethodTest);

  assertNotEquals(metadata, undefined);
  assertEquals(metadata?.prefix, '/');
  assertEquals(metadata?.routes.size, 1);

  for (let key of metadata!.routes.keys()) {
    assertEquals(key.path, '');
    assertEquals(key.method, HTTPMethod.GET);
  }
  
});