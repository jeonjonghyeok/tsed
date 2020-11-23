import {PlatformApplication} from "@tsed/common";
import {Configuration, Inject} from "@tsed/di";
import "@tsed/mongoose";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/swagger";
import "@tsed/passport";
import * as cors from "cors";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import mongooseConfig from "./config/mongoose";
import {IndexCtrl} from "./controllers/pages/IndexCtrl";
import {CalendarsCtrl} from "./controllers/rest/calendars/CalendarsCtrl";
import {UserCtrl} from "./controllers/user/UserCtrl";
import {User} from "./models/User";
import {PassportCtrl} from "./controllers/passport/PassportCtrl";
export const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 3000,
  httpsPort: false, // CHANGE
  mongoose: mongooseConfig,
  mount: {
    "/rest": [
      CalendarsCtrl,
      PassportCtrl],
    "/": [IndexCtrl],
    "/user": [UserCtrl]
  },
  componentsScan: [
    `${rootDir}/services/**/*.ts`,
    `${rootDir}/protocols/**/*.ts`              
],
  swagger: [
    {
      path: "/v2/docs",
      specVersion: "2.0"
    },
    {
      path: "/v3/docs",
      specVersion: "3.0.1"
    }
  ],
  views: {
    root: `${rootDir}/../views`,
    viewEngine: "ejs"
  },
  exclude: ["**/*.spec.ts"],
  passport: {
    userInfoModel: User
  }

})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      )
      .use(session({
        secret: "mysecretkey",
        resave: true,
        saveUninitialized: true,
        //maxAge: 36000,
        cookie: {
          path: "/",
          httpOnly: true,
          secure: false
        }
      }));
  }
}
