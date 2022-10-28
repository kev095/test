import { MongoDbServiceInterface } from "./MongoDbServiceInterface";
import { Mongoose, connect } from 'mongoose'
import { MongoDbConfig } from "../../culqui-token/config/db";

export class MongoDbService implements MongoDbServiceInterface {
  constructor(private readonly config: MongoDbConfig) {
    config.load();
  }

  async connect(): Promise<Mongoose> {
    return await connect(this.config.mongoUrl);
  }
}
