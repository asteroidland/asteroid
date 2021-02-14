import { Module } from "./decorator.ts";
import { assertEquals, assertNotEquals, assertThrows } from "../../deps-test.ts"
import { ModuleMetadata } from "./metadata.ts";
import { AsteroidReflect } from "../reclect.ts";
import { Injectable } from "../injectable/decorator.ts";
import { Controller } from "../controller/decorator.ts";

const testPackage = 'Module Decorator';

Deno.test(`[${testPackage}] - Should throw exception when does not have any field filled out`, () => {
  assertThrows(() => {
    @Module({})
    class ModuleTest {}
  }, undefined, 'Module ModuleTest is empty');
});

Deno.test(`[${testPackage}] - Should throw exception when all fields are empty`, () => {
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
 * */
Deno.test(`[${testPackage}] - Should be created metadata`, () => {

  @Controller()
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

Deno.test(`[${testPackage}] - Should throw module import error when the first import is invalid`, () => {
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

Deno.test(`[${testPackage}] - Should throw module import error when the second import is invalid`, () => {
  assertThrows(() => {

    @Controller()
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

Deno.test(`[${testPackage}] - Should throw module import error when the third import is invalid`, () => {
  assertThrows(() => {

    @Controller()
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

Deno.test(`[${testPackage}] - Should update all providers with one value from import module.providers values`, () => {
  @Injectable()
  class ProviderTest {}

  @Module({
    providers: [ProviderTest],
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

Deno.test(`[${testPackage}] - Should update all providers with more than one values from import module.providers values`, () => {
  @Injectable()
  class ProviderTest {}
  
  @Injectable()
  class ProviderTest2 {}

  @Module({
    providers: [ProviderTest, ProviderTest2],
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

Deno.test(`[${testPackage}] - Should throw error when providers does not have Injectable decorator`, () => {
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

Deno.test(`[${testPackage}] - Should throw error when providers does not have Injectable decorator after inserts from imports`, () => {
  assertThrows(() => {
    @Injectable()
    class ProviderTest {}
    
    class ProviderTest2 {}
  
    @Module({
      providers: [ProviderTest, ProviderTest2],
      exports: [ProviderTest, ProviderTest2]
    })
    class ImportModuleTest1 {}
  
    @Module({
      imports: [ImportModuleTest1],
    })
    class ModuleTest {}
  }, undefined, "ProviderTest2 has not Injectable decorator")
})

Deno.test(`[${testPackage}] - Should throw error when is exporting a value where it is not in providers`, () => {
  assertThrows(() => {
    @Injectable()
    class ProviderTest {}
    
    @Injectable()
    class ProviderTest2 {}
  
    @Module({
      providers: [ProviderTest],
      exports: [ProviderTest, ProviderTest2]
    })
    class ImportModuleTest1 {}
  }, undefined, "ProviderTest2 can't be exported due is not in providers")
})

Deno.test(`[${testPackage}] - Should throw error when is exporting a value where providers is empty`, () => {
  assertThrows(() => {
    @Injectable()
    class ProviderTest {}
    
    @Injectable()
    class ProviderTest2 {}
  
    @Module({
      exports: [ProviderTest, ProviderTest2]
    })
    class ImportModuleTest1 {}
  }, undefined, "[ ProviderTest ProviderTest2 ] can't be exported due is not in providers")
})

Deno.test(`[${testPackage}] - Should throw error when controllers does not have Controller decorator`, () => {
  assertThrows(() => {
    class ControllerTest {}
  
    @Module({
      controllers: [ControllerTest]
    })
    class ImportModuleTest1 {}
  }, undefined, "ControllerTest has not Controller decorator")
})