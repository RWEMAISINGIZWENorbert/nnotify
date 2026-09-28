import type { Request, Response } from "express";

import { applicationService } from "./application.service.js";

import {
  applicationIdSchema,
  createApplicationSchema,
  updateApplicationSchema,
} from "./application.validation.js";

export async function createApplication(
  req: Request,
  res: Response,
) {
  const input = createApplicationSchema.parse(req.body);

  const result = await applicationService.create(input);

  return res.status(201).json({
    success: true,
    data: result,
  });
}

export async function getApplication(
  req: Request,
  res: Response,
) {
  const { id } = applicationIdSchema.parse(req.params);

  const application = await applicationService.getById(id);

  return res.status(200).json({
    success: true,
    data: application,
  });
}

export async function getApplications(
  _req: Request,
  res: Response,
) {
  const applications = await applicationService.list();

  return res.status(200).json({
    success: true,
    data: applications,
  });
}

export async function updateApplication(
  req: Request,
  res: Response,
) {
  const { id } = applicationIdSchema.parse(req.params);

  const input = updateApplicationSchema.parse(req.body);

  const application = await applicationService.update(
    id,
    input,
  );

  return res.status(200).json({
    success: true,
    data: application,
  });
}

export async function rotateApplicationSecret(
  req: Request,
  res: Response,
) {
  const { id } = applicationIdSchema.parse(req.params);

  const result = await applicationService.rotateSecret(id);

  return res.status(200).json({
    success: true,
    data: result,
  });
}

export async function deactivateApplication(
  req: Request,
  res: Response,
) {
  const { id } = applicationIdSchema.parse(req.params);

  const application = await applicationService.deactivate(id);

  return res.status(200).json({
    success: true,
    data: application,
  });
}

export async function activateApplication(
  req: Request,
  res: Response,
) {
  const { id } = applicationIdSchema.parse(req.params);

  const application = await applicationService.activate(id);

  return res.status(200).json({
    success: true,
    data: application,
  });
}