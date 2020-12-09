import { Controller } from "../src/decorator/controller.decorator.ts";
import { Get } from "../src/decorator/method.decorator.ts";

@Controller('test')
export class GetSample {
  constructor() {}

  @Get()
  myRoute() {
    console.log('Hello World!')
    return 'Hello World!';
  }
}