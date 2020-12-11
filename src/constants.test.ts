import { assertEquals } from 'https://deno.land/std@0.80.0/testing/asserts.ts';
import { 
    CONTROLLER_METADATA, 
    DESIGN_PARAMTYPES 
} from './constants.ts'

const testPackage = 'Constants'

Deno.test(`[${testPackage}] #1 - CONTROLLER_METADATA: Should return controller:metadata`, () => {
    assertEquals(CONTROLLER_METADATA, 'controller:metadata')
});

Deno.test(`[${testPackage}] #2 - DESIGN_PARAMTYPES: Should return design:paramtypes`, () => {
    assertEquals(DESIGN_PARAMTYPES, 'design:paramtypes')
});