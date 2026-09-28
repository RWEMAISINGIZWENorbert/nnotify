import { Router } from "express";

import {
  activateApplication,
  createApplication,
  deactivateApplication,
  getApplication,
  getApplications,
  rotateApplicationSecret,
  updateApplication,
} from "./application.controller.js";

const router = Router();

router.post("/", createApplication);

router.get("/", getApplications);

router.get("/:id", getApplication);

router.patch("/:id", updateApplication);

router.post("/:id/rotate-secret", rotateApplicationSecret);

router.post("/:id/deactivate", deactivateApplication);

router.post("/:id/activate", activateApplication);

export default router;