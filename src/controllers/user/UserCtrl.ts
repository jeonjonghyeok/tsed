import {BodyParams, Controller, Delete, Get, PathParams, Post, Put} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {Description, Required, Returns, Status, Summary} from "@tsed/schema";
import {User} from "../../models/User";
import {UserService} from "../../services/UserService";

/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 *
 * In this case, EventsCtrl is a dependency of UserCtrl.
 * All routes of EventsCtrl will be mounted on the `/User` path.
 */
@Controller({
  path: "/",
})
export class UserCtrl {
  constructor(private UserService: UserService) {}

  @Get("/auth")
  @Summary("Return a User from his ID")
  @(Status(200, User).Description("Success"))
  async get(@PathParams("id") id: string): Promise<User> {
    const user = await this.UserService.find(id);

    if (user) {
      return user;
    }

    throw new NotFound("User not found");
  }

  @Post("/register")
  @Summary("Create a new User")
  @(Returns(201, User).Description("Created"))
  save(
    @Description("User model")
    @BodyParams()
    @Required()
    user: User
  ) {
    return this.UserService.save(user);
  }



}
