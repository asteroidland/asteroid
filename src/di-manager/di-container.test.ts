import { assertEquals, assertNotEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";
import { Injectable } from "../decorator/injectable.decorator.ts";
import { DIContainer } from "./di-container.ts";

const testPackage = 'DIContainer'

Deno.test(`[${testPackage}] #1 - Create new instances`, () => {
	@Injectable()
	class InjectableClass {
			constructor() {}
	}

	@Injectable()
	class InjectableClass2 {
			constructor(private ic: InjectableClass) {}
	}

	let diContainer: DIContainer = new DIContainer()
	let entryClass: InjectableClass2 = diContainer.getInstance(InjectableClass2);

	assertNotEquals(entryClass, null);
	assertNotEquals(diContainer, null);
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

	let diContainer: DIContainer = new DIContainer()
	let entryClass: InjectableClass2 = diContainer.getInstance(InjectableClass2);

	assertNotEquals(entryClass, null);
	assertNotEquals(diContainer, null);
	//@ts-ignore
	assertEquals(diContainer.injector.size, 2);

	diContainer.closeInstance()

	//@ts-ignore
	assertEquals(diContainer.injector.size, 0);
});