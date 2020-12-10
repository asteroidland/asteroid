import { assert, assertEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";
import { HTTPMethod } from '../src/types.ts'

const testPackage = 'Types'


Deno.test(`[${testPackage}] #1 - HTTPMethod.GET: Should return GET`, () => {
    assertEquals(HTTPMethod.GET, 'GET')
});

Deno.test(`[${testPackage}] #2 - HTTPMethod.POST: Should return POST`, () => {
    assertEquals(HTTPMethod.POST, 'POST')
});

Deno.test(`[${testPackage}] #3 - HTTPMethod.DELETE: Should return DELETE`, () => {
    assertEquals(HTTPMethod.DELETE, 'DELETE')
});

Deno.test(`[${testPackage}] #4 - HTTPMethod.PUT: Should return PUT`, () => {
    assertEquals(HTTPMethod.PUT, 'PUT')
});

Deno.test(`[${testPackage}] #5 - HTTPMethod.PATCH: Should return PATCH`, () => {
    assertEquals(HTTPMethod.PATCH, 'PATCH')
});