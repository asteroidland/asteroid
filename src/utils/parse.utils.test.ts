import { assert, assertEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";
import { HTTPMethod } from "../types.ts";
import { ParseUtils } from './parse.utils.ts';

const testPackage = 'ParseUtils'

Deno.test(`[${testPackage}] #1 - ParseUtils.toHttpMethod('get'): Should return GET`, () => {
  assertEquals(ParseUtils.toHttpMethod('get'), HTTPMethod.GET)
});

Deno.test(`[${testPackage}] #2 - ParseUtils.toHttpMethod('post'): Should return POST`, () => {
  assertEquals(ParseUtils.toHttpMethod('post'), HTTPMethod.POST)
});

Deno.test(`[${testPackage}] #3 - ParseUtils.toHttpMethod('put'): Should return PUT`, () => {
  assertEquals(ParseUtils.toHttpMethod('put'), HTTPMethod.PUT)
});

Deno.test(`[${testPackage}] #4 - ParseUtils.toHttpMethod('delete'): Should return DELETE`, () => {
  assertEquals(ParseUtils.toHttpMethod('delete'), HTTPMethod.DELETE)
});

Deno.test(`[${testPackage}] #5 - ParseUtils.toHttpMethod('patch'): Should return PATCH`, () => {
  assertEquals(ParseUtils.toHttpMethod('patch'), HTTPMethod.PATCH)
});