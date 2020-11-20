import {Property, Required} from "@tsed/common";
import {Model, ObjectID} from "@tsed/mongoose";

@Model()
export class User {
  @ObjectID("id")
  _id: string;

  @Required()
  email: string

  @Required()
  email_verified: Boolean
  
  @Required()
  key_for_verify: Boolean

  @Required()
  name: string;

  @Property()
  password: string;
}
