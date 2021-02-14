import { instanceOfInjectableMetadata } from "../injectable/metadata.ts";
import { AsteroidReflect } from "../reclect.ts";
import { ModuleMetadata, instanceOfModuleMetadata } from "./metadata.ts";

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

    if (isModuleImportsValid(target.name, moduleMetadata)) {
      // INFO: We are using ! due the isModuleImportsValid function guarantee this imports are valid.
      const providersFromImports: Function[] = moduleMetadata.imports!
        .map((module) => {

          const importModuleMetadata = AsteroidReflect.getOwnModuleMetadata(module);
          let providers: Function[] = []

          if (hasModuleMetadataExportValues(importModuleMetadata)) {
            // INFO: We are using ! due the hasModuleMetadataImportValues function guarantee this imports are valid.
            providers = [...importModuleMetadata!.exports!]
          }
          
          return providers
        })
        .reduce((previusProviders, currentProviders) => {
          if (currentProviders.length > 0) {
            currentProviders.forEach(provider => {
              previusProviders.push(provider);
            });
          }
          return previusProviders;
        });

        providersFromImports.forEach((provider) => {
          if (moduleMetadata.providers === undefined) {
            moduleMetadata.providers = []
          }
          moduleMetadata.providers.push(provider)
        });
    }

    isProvidersValid(moduleMetadata)

    isExportsValid(moduleMetadata)

    AsteroidReflect.setOwnModuleMetadata(moduleMetadata, target);
  }
}

function hasModuleMetadataImportValues(metadata: ModuleMetadata | undefined): Boolean {
  if (metadata === undefined) {
    return false;
  }
  return metadata.imports !== undefined && metadata.imports !== null && metadata.imports?.length > 0;
}

function hasModuleMetadataExportValues(metadata: ModuleMetadata | undefined): Boolean {
  if (metadata === undefined) {
    return false;
  }
  return metadata.exports !== undefined && metadata.exports !== null && metadata.exports?.length > 0;
}

function hasModuleMetadataProvidersValues(metadata: ModuleMetadata | undefined): Boolean {
  if (metadata === undefined) {
    return false;
  }
  return metadata.providers !== undefined && metadata.providers !== null && metadata.providers?.length > 0;
}

function isModuleMetadataValid(metadata: ModuleMetadata): Boolean {
  const isControllersValid = metadata.controllers !== undefined && metadata.controllers !== null && metadata.controllers?.length > 0;
  const isProvidersValid = hasModuleMetadataProvidersValues(metadata);
  const isExportsValid = hasModuleMetadataExportValues(metadata);
  const isImportsValid = hasModuleMetadataImportValues(metadata);

  return isControllersValid || isProvidersValid || isExportsValid || isImportsValid;
}

function isModuleImportsValid(moduleName: string, metadata: ModuleMetadata): Boolean {
  const throwModuleError = (importModuleName: string) => {
    throw new Error(`Module ${moduleName} is importing wrong Module: ${importModuleName}`);
  }

  if (hasModuleMetadataImportValues(metadata)) {
    const isImportsValid: Boolean = metadata.imports!
      .map((module) => {
        const currentMetadata = AsteroidReflect.getOwnModuleMetadata(module)
        if (!instanceOfModuleMetadata(currentMetadata)) {
          throwModuleError(module.name);
        }
        return true;
      })
      .reduce((previusValue, currentValue) => previusValue && currentValue);
    return isImportsValid;
  }

  return false;
}

function isProvidersValid(metadata: ModuleMetadata) {
  if (hasModuleMetadataProvidersValues(metadata)) {
    metadata.providers!.forEach(provider => {
      if (!instanceOfInjectableMetadata(provider)) {
        throw new Error(`${provider.name} has not Injectable decorator`)
      }
    })
  }
}

function isExportsValid(metadata: ModuleMetadata) {
  if (hasModuleMetadataExportValues(metadata)) {
    if (hasModuleMetadataProvidersValues(metadata)) {
      metadata.exports!.forEach(exportValue => {
        if (!(metadata.providers!.includes(exportValue))) {
          throw new Error (`${exportValue.name} can't be exported due is not in providers`)
        }
      })
    } else {
      let throwMessage = '[';

      metadata.exports!.forEach((exportValue) => {
        throwMessage = throwMessage + ' ' + exportValue.name;
      });

      throwMessage = throwMessage + ' ]';

      throw new Error (`${throwMessage} can't be exported due is not in providers`)
    }
  }
}