import { MeteorApplication } from "../src/meteor.ts";
import { GetSample } from "./get-sample.ts";

const app = new MeteorApplication();

app.addHandler(new GetSample());

await app.listen({port: 8080});