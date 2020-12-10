import { ControllerMetadata } from "../types.ts";
import { assertEquals, assertNotEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";
import { ReflectUtils } from "../utils/reflect.utils.ts";
import { Controller } from './controller.decorator.ts';

const testPackage = 'Controller Decorator'

Deno.test(`[${testPackage}] #1 - Controller with : Should be metadata with prefix /test`, () => {
  @Controller('test')
  class ControllerTest {}

  const metadata: ControllerMetadata | undefined = ReflectUtils.getOwnControllerMetadata(ControllerTest);

  assertNotEquals(metadata, undefined);
  assertEquals(metadata?.prefix, '/test');
  assertEquals(metadata?.routes.size, 0);

});

Deno.test(`[${testPackage}] #2 - Controller with : Should be metadata with prefix /`, () => {
  @Controller()
  class ControllerTest {}

  const metadata: ControllerMetadata | undefined = ReflectUtils.getOwnControllerMetadata(ControllerTest);

  assertNotEquals(metadata, undefined);
  assertEquals(metadata?.prefix, '/');
  assertEquals(metadata?.routes.size, 0);
});