import { assertEquals } from 'https://deno.land/std@0.80.0/testing/asserts.ts';
import { CONTROLLER_METADATA } from '../src/constants.ts'

const testPackage = 'Constants'

Deno.test(`[${testPackage}] #1 - CONTROLLER_METADATA: Should return controller:metadata`, () => {
    assertEquals(CONTROLLER_METADATA, 'controller:metadata')
});