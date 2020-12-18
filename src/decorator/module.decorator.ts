import { ModuleMetadata } from '../types.ts';
import { ReflectUtils } from "../utils/reflect.utils.ts";

export function Module(metadata: ModuleMetadata): ClassDecorator {
	return (target: Function): void => {
		if (!isModuleMetadataValid(metadata)) {
			throw new Error(`Module ${target.name} is empty`)
		}

		const moduleMetadata: ModuleMetadata = ReflectUtils.getOwnModuleMetadata(target) ?? ReflectUtils.getDefaultModuleMetadata();
		moduleMetadata.controllers = metadata.controllers

		ReflectUtils.setOwnModuleMetadata(moduleMetadata, target);
	}
}

function isModuleMetadataValid(metadata: ModuleMetadata): Boolean {
	const isControllersValid = metadata.controllers !== undefined && metadata.controllers !== null && metadata.controllers?.length > 0
	return isControllersValid
}