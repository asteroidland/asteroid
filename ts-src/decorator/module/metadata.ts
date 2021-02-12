export interface ModuleMetadata {
	controllers?: Function[]
  providers?: Function[]
  imports?: Function[]
  exports?: Function[]
}

/**
 * 
 * instanceOfModuleMetadata Check if a Function or an Object is an instance of ModuleMetadata
 * 
 * @param object - An Function or Object that will be checked if is instance of ModuleMetadata
 * 
 * @internal
 */
export function instanceOfModuleMetadata(object: any ): object is ModuleMetadata {
  if (object !== undefined) {
    let hasControllers = 'controllers' in object;
    let hasProviders = 'providers' in object;
    let hasImports = 'imports' in object;
    let hasExports = 'exports' in object;
    return hasImports || hasProviders || hasControllers || hasExports;
  }
  return false;
}