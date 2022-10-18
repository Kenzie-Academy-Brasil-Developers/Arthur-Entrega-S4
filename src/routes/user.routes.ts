import { Router } from "express";

import createUserController from "../controllers/createUser.controller";
import getUsersController from "../controllers/getUsers.controller";
import softDeleteController from "../controllers/softDelete.controller";
import tokenGenerateController from "../controllers/tokenGenerate.controller";
import updateUserController from "../controllers/updateUser.controller";

import { authTokenMiddleware } from "../middlewares/authToken.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import updateAdminPermissionsMiddleWare from "../middlewares/updateAdminPermissions.middleware";



const route = Router()

route.post("/users", createUserController)
route.post("/login", tokenGenerateController)
route.get("/users", authTokenMiddleware, isAdmMiddleware, getUsersController)
route.patch("/users/:id", authTokenMiddleware, updateAdminPermissionsMiddleWare, updateUserController)
route.delete("/users/:id", authTokenMiddleware, isAdmMiddleware, softDeleteController)

export default route