import { ServiceInterface } from "../ServiceInterface";
import { Mongoose } from 'mongoose'

export interface MongoDbServiceInterface extends ServiceInterface {
  connect(): Promise<Mongoose>;
}
