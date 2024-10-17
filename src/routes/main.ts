import { Router } from "express";
import * as pingController from "../controllers/ping";
import * as authController from "../controllers/auth";
import * as userController from "../controllers/user";
import * as officeController from "../controllers/office";
import { verifyJWT } from "../utils/jwt";

export const mainRouter = Router();

mainRouter.get("/ping", pingController.ping);
mainRouter.get("/ping/private", verifyJWT, pingController.privatePing);

mainRouter.post("/auth/signin", authController.signin);
//mainRouter.post("/auth/signup");

mainRouter.post("/user/create", userController.createUser);
//mainRouter.put("/user/update/:id");
//mainRouter.get("/user/all");
//mainRouter.get("/user/:id");
//mainRouter.delete("/user/delete/:id");

mainRouter.post("/office/create", officeController.createOffice);
//mainRouter.put("/office/update/:id");
//mainRouter.get("/office/all");
//mainRouter.get("/office/:id");
//mainRouter.delete("/office/delete/:id");
