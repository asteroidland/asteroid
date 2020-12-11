import { Type } from "../types.ts";

export function Injectable(): (target: Type<any>) => void  {
  return (target: Type<any>) => {}
}