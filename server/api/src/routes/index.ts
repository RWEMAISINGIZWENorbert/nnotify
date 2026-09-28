import { Router } from "express";

import applicationRoutes from "../modules/applications/application.routes.js";

const router = Router();

router.use("/applications", applicationRoutes);

export default router;