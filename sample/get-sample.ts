import { Handler } from "../src/http/handler.ts";
import { Get } from "../src/http/route.ts";

@Handler('test')
export class GetSample {
  constructor() {}

  @Get()
  myRoute() {
    return 'Hello World!';
  }
}