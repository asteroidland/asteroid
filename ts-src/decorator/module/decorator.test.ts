import { Module } from "./decorator.ts";
import { assertEquals, assertNotEquals, assertThrows } from "../../deps-test.ts"
import { ModuleMetadata } from "./metadata.ts";
import { AsteroidReflect } from "../reclect.ts";
import { Injectable } from "../injectable/decorator.ts";

const testPackage = 'Module Decorator';

Deno.test(`[${testPackage}] - Module empty : should throw exception`, () => {
  assertThrows(() => {
    @Module({})
    class ModuleTest {}
  }, undefined, 'Module ModuleTest is empty');
});

Deno.test(`[${testPackage}] - Module with empty values : should throw exception`, () => {
  assertThrows(() => {
    @Module({
      controllers: [],
      providers: [],
      imports: [],
      exports: [],
    })
    class ModuleTest {}
  }, undefined, 'Module ModuleTest is empty');
});

/** 
 * TODO: We need to guarantee: 
 * controllers are just Controllers Decorators;
 * exports just can use providers in your own module;
 * */
Deno.test(`[${testPackage}] - Module with values : should be created metadata`, () => {

  class ControllerTest {}

  @Injectable()
  class ProviderTest {}

  @Module({
    controllers: [ControllerTest]
  })
  class ExportModuleTest {}

  @Module({
    controllers: [ControllerTest],
    providers: [ProviderTest],
    imports: [ExportModuleTest],
    exports: [ProviderTest],
  })
  class ModuleTest {}

  const metadata: ModuleMetadata | undefined = AsteroidReflect.getOwnModuleMetadata(ModuleTest);

  assertNotEquals(metadata, undefined);
  assertNotEquals(metadata, null);
  assertEquals(metadata?.controllers, [ControllerTest]);
  assertEquals(metadata?.providers, [ProviderTest]);
  assertEquals(metadata?.imports, [ExportModuleTest]);
  assertEquals(metadata?.exports, [ProviderTest]);
});

Deno.test(`[${testPackage}] - Module with values : should throw module import error when the first import is invalid`, () => {
  assertThrows(() => {
    class ImportModuleTest1 {}

    class ImportModuleTest2 {}

    class ImportModuleTest3 {}

    @Module({
      imports: [ImportModuleTest1, ImportModuleTest2, ImportModuleTest3],
    })
    class ModuleTest {}
  }, undefined, 'Module ModuleTest is importing wrong Module: ImportModuleTest1')
});

Deno.test(`[${testPackage}] - Module with values : should throw module import error when the second import is invalid`, () => {
  assertThrows(() => {

    class ControllerTest {}

    @Module({
      controllers: [ControllerTest]
    })
    class ImportModuleTest1 {}

    class ImportModuleTest2 {}

    class ImportModuleTest3 {}

    @Module({
      imports: [ImportModuleTest1, ImportModuleTest2, ImportModuleTest3],
    })
    class ModuleTest {}
  }, undefined, 'Module ModuleTest is importing wrong Module: ImportModuleTest2')
});

Deno.test(`[${testPackage}] - Module with values : should throw module import error when the third import is invalid`, () => {
  assertThrows(() => {

    class ControllerTest {}

    @Module({
      controllers: [ControllerTest]
    })
    class ImportModuleTest1 {}

    @Module({
      controllers: [ControllerTest]
    })
    class ImportModuleTest2 {}

    class ImportModuleTest3 {}

    @Module({
      imports: [ImportModuleTest1, ImportModuleTest2, ImportModuleTest3],
    })
    class ModuleTest {}
  }, undefined, 'Module ModuleTest is importing wrong Module: ImportModuleTest3')
});

Deno.test(`[${testPackage}] - Module with values : should update all providers with one value from import module.providers values`, () => {
  @Injectable()
  class ProviderTest {}

  @Module({
    exports: [ProviderTest]
  })
  class ImportModuleTest1 {}

  @Module({
    imports: [ImportModuleTest1],
  })
  class ModuleTest {}

  const metadata: ModuleMetadata | undefined = AsteroidReflect.getOwnModuleMetadata(ModuleTest);

  assertNotEquals(metadata, undefined);
  assertNotEquals(metadata, null);
  assertEquals(metadata?.controllers, undefined);
  assertEquals(metadata?.providers, [ProviderTest]);
  assertEquals(metadata?.imports, [ImportModuleTest1]);
  assertEquals(metadata?.exports, undefined);
});

Deno.test(`[${testPackage}] - Module with values : should update all providers with more than one values from import module.providers values`, () => {
  @Injectable()
  class ProviderTest {}
  
  @Injectable()
  class ProviderTest2 {}

  @Module({
    exports: [ProviderTest, ProviderTest2]
  })
  class ImportModuleTest1 {}

  @Module({
    imports: [ImportModuleTest1],
  })
  class ModuleTest {}

  const metadata: ModuleMetadata | undefined = AsteroidReflect.getOwnModuleMetadata(ModuleTest);

  assertNotEquals(metadata, undefined);
  assertNotEquals(metadata, null);
  assertEquals(metadata?.controllers, undefined);
  assertEquals(metadata?.providers, [ProviderTest, ProviderTest2]);
  assertEquals(metadata?.imports, [ImportModuleTest1]);
  assertEquals(metadata?.exports, undefined);
});


// * providers are just Injectable Decorators;
// * Throw if does not have Injectable Decorator
// * Throw if does not have Injectable Decorator after the imports module

Deno.test(`[${testPackage}] - Module with values : should throw error when providers does not have Injectable decorator`, () => {
  assertThrows(() => {
    @Injectable()
    class ProviderTest {}
    
    class ProviderTest2 {}
  
    @Module({
      providers: [ProviderTest, ProviderTest2]
    })
    class ImportModuleTest1 {}

    class ModuleTest {}
  }, undefined, "ProviderTest2 has not Injectable decorator")
})

Deno.test(`[${testPackage}] - Module with values : should throw error when providers does not have Injectable decorator after inserts from imports`, () => {
  assertThrows(() => {
    @Injectable()
    class ProviderTest {}
    
    class ProviderTest2 {}
  
    @Module({
      exports: [ProviderTest, ProviderTest2]
    })
    class ImportModuleTest1 {}
  
    @Module({
      imports: [ImportModuleTest1],
    })
    class ModuleTest {}
  }, undefined, "ProviderTest2 has not Injectable decorator")
})