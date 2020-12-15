import { assertEquals, assertNotEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";
import { Injectable } from "../decorator/injectable.decorator.ts";
import { Injector } from "./injector.ts";

const testPackage = 'Injector'

Deno.test(`[${testPackage}] #1 - Create new instances`, () => {
	@Injectable()
	class InjectableClass {
			constructor() {}
	}

	@Injectable()
	class InjectableClass2 {
			constructor(private ic: InjectableClass) {}
	}

	let injector: Injector = new Injector()
	let entryClass: InjectableClass2 = injector.resolve<InjectableClass2>(InjectableClass2)

	assertNotEquals(entryClass, null);
	assertNotEquals(injector, null);
	assertEquals(injector.size, 2);
});

Deno.test(`[${testPackage}] #2 - Release new instances`, () => {
	@Injectable()
	class InjectableClass {
			constructor() {}
	}

	@Injectable()
	class InjectableClass2 {
			constructor(private ic: InjectableClass) {}
	}

	let injector: Injector = new Injector()
	let entryClass: InjectableClass2 = injector.resolve<InjectableClass2>(InjectableClass2)

	assertNotEquals(entryClass, null);
	assertNotEquals(injector, null);
	assertEquals(injector.size, 2);

	injector.release();

	assertEquals(injector.size, 0);
});