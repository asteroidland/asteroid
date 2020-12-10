import { assertEquals, assertNotEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";
import { ControllerMetadata, MethodOptions } from "../types.ts";
import { ReflectUtils } from './reflect.utils.ts';

const testPackage = 'ReflectUtils'

Deno.test(`[${testPackage}] #1 - ReflectUtils.getOwnControllerMetadata: Should be success`, () => {
  const testFunction: Function = () => {};

  const metadataBefore: ControllerMetadata = {
    prefix: '/test',
    routes: new Map<MethodOptions, Function>()
  }

  ReflectUtils.setOwnControllerMetadata(metadataBefore, testFunction);

  const metadataAfter: ControllerMetadata | undefined = ReflectUtils.getOwnControllerMetadata(testFunction) ?? undefined;

  assertNotEquals(metadataAfter, undefined);
  assertEquals(metadataAfter?.prefix, '/test');
  assertEquals(metadataAfter?.routes.size, 0);
});

Deno.test(`[${testPackage}] #2 - ReflectUtils.getControllerMetadata: Should be success`, () => {
  const testObject: Object = {};

  const metadataBefore: ControllerMetadata = {
    prefix: '/test',
    routes: new Map<MethodOptions, Function>()
  }

  ReflectUtils.setControllerMetadata(metadataBefore, testObject);

  const metadataAfter: ControllerMetadata | undefined = ReflectUtils.getControllerMetadata(testObject) ?? undefined;

  assertNotEquals(metadataAfter, undefined);
  assertEquals(metadataAfter?.prefix, '/test');
  assertEquals(metadataAfter?.routes.size, 0);
});

Deno.test(`[${testPackage}] #3 - ReflectUtils.getDefaultControllerMetadata: Should be success`, () => {
  const metadataAfter: ControllerMetadata = ReflectUtils.getDefaultControllerMetadata();

  assertNotEquals(metadataAfter, undefined);
  assertEquals(metadataAfter?.prefix, '/');
  assertEquals(metadataAfter?.routes.size, 0);
});