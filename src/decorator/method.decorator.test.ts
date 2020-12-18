import { assertEquals, assertNotEquals, assertThrows } from "https://deno.land/std@0.80.0/testing/asserts.ts";
import { ControllerMetadata, HTTPMethod } from "../types.ts";
import { ReflectUtils } from "../utils/reflect.utils.ts";
import { Controller } from "./controller.decorator.ts";
import { Delete, Get, Patch, Post, Put } from "./method.decorator.ts";

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

Deno.test(`[${testPackage}] #3 - Method with : Should be metadata routes and MethodOptions{path: myPostTest, method: POST}`, () => {
  @Controller()
  class MethodTest {
    @Post('myPostTest')
    getTest() {}
  }

  const metadata: ControllerMetadata | undefined = ReflectUtils.getOwnControllerMetadata(MethodTest);

  assertNotEquals(metadata, undefined);
  assertEquals(metadata?.prefix, '/');
  assertEquals(metadata?.routes.size, 1);

  for (let key of metadata!.routes.keys()) {
    assertEquals(key.path, 'myPostTest');
    assertEquals(key.method, HTTPMethod.POST);
  }
  
});

Deno.test(`[${testPackage}] #4 - Method with : Should be metadata routes and MethodOptions{path: '', method: POST}`, () => {
  @Controller()
  class MethodTest {
    @Post()
    getTest() {}
  }

  const metadata: ControllerMetadata | undefined = ReflectUtils.getOwnControllerMetadata(MethodTest);

  assertNotEquals(metadata, undefined);
  assertEquals(metadata?.prefix, '/');
  assertEquals(metadata?.routes.size, 1);

  for (let key of metadata!.routes.keys()) {
    assertEquals(key.path, '');
    assertEquals(key.method, HTTPMethod.POST);
  }
  
});

Deno.test(`[${testPackage}] #5 - Method with : Should be metadata routes and MethodOptions{path: myPutTest, method: PUT}`, () => {
  @Controller()
  class MethodTest {
    @Put('myPutTest')
    getTest() {}
  }

  const metadata: ControllerMetadata | undefined = ReflectUtils.getOwnControllerMetadata(MethodTest);

  assertNotEquals(metadata, undefined);
  assertEquals(metadata?.prefix, '/');
  assertEquals(metadata?.routes.size, 1);

  for (let key of metadata!.routes.keys()) {
    assertEquals(key.path, 'myPutTest');
    assertEquals(key.method, HTTPMethod.PUT);
  }
  
});

Deno.test(`[${testPackage}] #6 - Method with : Should be metadata routes and MethodOptions{path: '', method: PUT}`, () => {
  @Controller()
  class MethodTest {
    @Put()
    getTest() {}
  }

  const metadata: ControllerMetadata | undefined = ReflectUtils.getOwnControllerMetadata(MethodTest);

  assertNotEquals(metadata, undefined);
  assertEquals(metadata?.prefix, '/');
  assertEquals(metadata?.routes.size, 1);

  for (let key of metadata!.routes.keys()) {
    assertEquals(key.path, '');
    assertEquals(key.method, HTTPMethod.PUT);
  }
  
});

Deno.test(`[${testPackage}] #7 - Method with : Should be metadata routes and MethodOptions{path: myDeleteTest, method: DELETE}`, () => {
  @Controller()
  class MethodTest {
    @Delete('myDeleteTest')
    getTest() {}
  }

  const metadata: ControllerMetadata | undefined = ReflectUtils.getOwnControllerMetadata(MethodTest);

  assertNotEquals(metadata, undefined);
  assertEquals(metadata?.prefix, '/');
  assertEquals(metadata?.routes.size, 1);

  for (let key of metadata!.routes.keys()) {
    assertEquals(key.path, 'myDeleteTest');
    assertEquals(key.method, HTTPMethod.DELETE);
  }
  
});

Deno.test(`[${testPackage}] #8 - Method with : Should be metadata routes and MethodOptions{path: '', method: DELETE}`, () => {
  @Controller()
  class MethodTest {
    @Delete()
    getTest() {}
  }

  const metadata: ControllerMetadata | undefined = ReflectUtils.getOwnControllerMetadata(MethodTest);

  assertNotEquals(metadata, undefined);
  assertEquals(metadata?.prefix, '/');
  assertEquals(metadata?.routes.size, 1);

  for (let key of metadata!.routes.keys()) {
    assertEquals(key.path, '');
    assertEquals(key.method, HTTPMethod.DELETE);
  }
  
});

Deno.test(`[${testPackage}] #9 - Method with : Should be metadata routes and MethodOptions{path: myPatchTest, method: PATCH}`, () => {
  @Controller()
  class MethodTest {
    @Patch('myPatchTest')
    getTest() {}
  }

  const metadata: ControllerMetadata | undefined = ReflectUtils.getOwnControllerMetadata(MethodTest);

  assertNotEquals(metadata, undefined);
  assertEquals(metadata?.prefix, '/');
  assertEquals(metadata?.routes.size, 1);

  for (let key of metadata!.routes.keys()) {
    assertEquals(key.path, 'myPatchTest');
    assertEquals(key.method, HTTPMethod.PATCH);
  }
  
});

Deno.test(`[${testPackage}] #10 - Method with : Should be metadata routes and MethodOptions{path: '', method: DELETE}`, () => {
  @Controller()
  class MethodTest {
    @Patch()
    getTest() {}
  }

  const metadata: ControllerMetadata | undefined = ReflectUtils.getOwnControllerMetadata(MethodTest);

  assertNotEquals(metadata, undefined);
  assertEquals(metadata?.prefix, '/');
  assertEquals(metadata?.routes.size, 1);

  for (let key of metadata!.routes.keys()) {
    assertEquals(key.path, '');
    assertEquals(key.method, HTTPMethod.PATCH);
  }
  
});