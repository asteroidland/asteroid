import { AsteroidReflect } from "../reclect.ts";
import { ModuleMetadata } from "./metadata.ts";

  /**
   * Module is a class decorator with @Module() annotation. This decorator provides ModuleMetadata that allow the Asteroid organize the application structure.
   * 
   * @param controllers - Controllers list defined in this module that have to be instantiated.
   * @param providers - Providers list defined in this module which can be shared with others modules and have to be instantiated.
   * @param exports - A set of **providers** which are provided by this module and should be available in other modules that import this module.
   * @param imports - A set of **modules** that export the providers which are required in this module.
   * 
   * @public
   */
export function Module(metadata: ModuleMetadata): ClassDecorator {
  return (target: Function): void => {
    if (!isModuleMetadataValid(metadata)) {
      throw new Error(`Module ${target.name} is empty`);
    }

    const moduleMetadata: ModuleMetadata = AsteroidReflect.getOwnModuleMetadata(target) ?? AsteroidReflect.getDefaultModuleMetadata();
    moduleMetadata.controllers = metadata.controllers;
    moduleMetadata.providers = metadata.providers;
    moduleMetadata.exports = metadata.exports;
    moduleMetadata.imports = metadata.imports;

    if (isImportsValid(metadata)) {
      // TODO: put all imports.modules.exports in my own provider
    }

    AsteroidReflect.setOwnModuleMetadata(moduleMetadata, target);
  }
}

function isModuleMetadataValid(metadata: ModuleMetadata): Boolean {
  const isControllersValid = metadata.controllers !== undefined && metadata.controllers !== null && metadata.controllers?.length > 0;
  const isProvidersValid = metadata.providers !== undefined && metadata.providers !== null && metadata.providers?.length > 0;
  const isExportsValid = metadata.exports !== undefined && metadata.exports !== null && metadata.exports?.length > 0;
  const isImportsValid = metadata.imports !== undefined && metadata.imports !== null && metadata.imports?.length > 0;

  return isControllersValid && isProvidersValid && isExportsValid && isImportsValid;
}

function isImportsValid(metadata: ModuleMetadata): Boolean {
  return true
}