import { Injectable } from "../decorator/injectable.decorator.ts";
import { Type } from "../types.ts";
import { Injector } from "./injector.ts";

@Injectable()
export class DIContainer {

	private injector: Injector = new Injector();

	constructor() {}

	getInstance(target: Type<any>): any {
		return this.injector.resolve(target);
	}

	closeInstance() {
		this.injector.release();
	}
}