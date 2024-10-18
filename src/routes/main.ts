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

mainRouter.post("/user/create", verifyJWT, userController.createUser);
mainRouter.put("/user/update/:id", verifyJWT, userController.updateUser);
mainRouter.get("/user/all", verifyJWT, userController.getAllUsers);
mainRouter.get("/user/:id", verifyJWT, userController.getUserById);
mainRouter.get(
  "/user/office/:officeIdentity/all",
  verifyJWT,
  userController.getUsersByOffice
);
mainRouter.delete("/user/delete/:id", verifyJWT, userController.deleteUser);

mainRouter.post("/office/create", officeController.createOffice);
//mainRouter.put("/office/update/:id");
//mainRouter.get("/office/all");
//mainRouter.get("/office/:id");
//mainRouter.delete("/office/delete/:id");

//mainRouter.post("/patients/create")
//mainRouter.pust("/patients/update/:id")
//mainRouter.get("/patients/office/:officeIdentity/all")
//mainRouter.get("/patients/office/:officeIdentity/patient/:id")
