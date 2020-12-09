import { AsteroidApplication } from "../src/asteroid.ts";
import { GetSample } from "./get-example.ts";

const app = new AsteroidApplication();

app.addController(new GetSample());

await app.listen({port: 8080});