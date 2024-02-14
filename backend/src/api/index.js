import { Router } from "express";
import auth from "./auth";
import users from "./users";
import configs from "./configs";

const router = new Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/configs", configs);

export default router;
