import { Module } from './module.decorator.ts';
import { Controller } from './controller.decorator.ts';
import { ModuleMetadata } from "../types.ts";
import { ReflectUtils } from "../utils/reflect.utils.ts";
import { assertThrows, assertNotEquals, assertEquals } from 'https://deno.land/std@0.80.0/testing/asserts.ts';

const testPackage = 'Module Decorator';

Deno.test(`[${testPackage}] #1 - Module empty : should throw exception`, () => {
  assertThrows(() => {
    @Module({})
    class ModuleTest {}
  }, undefined, 'Module ModuleTest is empty');
});

Deno.test(`[${testPackage}] #2 - Module with empty controllers : should throw exception`, () => {
  assertThrows(() => {
    @Module({
      controllers: []
    })
    class ModuleTest {}
  }, undefined, 'Module ModuleTest is empty');
});

Deno.test(`[${testPackage}] #3 - Module with controllers : should be created metadata`, () => {
  @Controller()
  class ControllerTest {}
  
  @Module({
    controllers: [ControllerTest]
  })
  class ModuleTest {}

  const metadata: ModuleMetadata | undefined = ReflectUtils.getOwnModuleMetadata(ModuleTest);

  assertNotEquals(metadata, undefined);
  assertEquals(metadata?.controllers, [ControllerTest]);
});