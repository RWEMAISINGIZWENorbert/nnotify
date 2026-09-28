import {
  createApplication,
  findApplicationById,
  findApplicationByName,
  listApplications,
  rotateApplicationSecret,
  setApplicationActive,
  updateApplication,
} from "./application.repository.js";

import {
  generateApplicationSecret,
  generateSecretVersion,
  hashApplicationSecret,
} from "../../shared/security/application-secret.js";

import type {
  CreateApplicationInput,
  UpdateApplicationInput,
} from "./application.validation.js";

export class ApplicationService {
  async create(input: CreateApplicationInput) {
    const existing = await findApplicationByName(input.name);

    if (existing) {
      throw new Error("An application with this name already exists");
    }

    const secret = generateApplicationSecret();

    const application = await createApplication({
      name: input.name,
      secretHash: hashApplicationSecret(secret),
      secretVersion: generateSecretVersion(),
    });

    return {
      application,
      secret,
    };
  }

  async getById(id: string) {
    const application = await findApplicationById(id);

    if (!application) {
      throw new Error("Application not found");
    }

    return application;
  }

  async list() {
    return listApplications();
  }

  async update(id: string, input: UpdateApplicationInput) {
    const application = await findApplicationById(id);

    if (!application) {
      throw new Error("Application not found");
    }

    if (input.name && input.name !== application.name) {
      const existing = await findApplicationByName(input.name);

      if (existing) {
        throw new Error(
          "An application with this name already exists",
        );
      }
    }

    return updateApplication(id, input);
  }

  async rotateSecret(id: string) {
    const application = await findApplicationById(id);

    if (!application) {
      throw new Error("Application not found");
    }

    const secret = generateApplicationSecret();

    const updatedApplication = await rotateApplicationSecret(
      id,
      hashApplicationSecret(secret),
      generateSecretVersion(),
    );

    return {
      application: updatedApplication,
      secret,
    };
  }

  async deactivate(id: string) {
    const application = await findApplicationById(id);

    if (!application) {
      throw new Error("Application not found");
    }

    return setApplicationActive(id, false);
  }

  async activate(id: string) {
    const application = await findApplicationById(id);

    if (!application) {
      throw new Error("Application not found");
    }

    return setApplicationActive(id, true);
  }
}

export const applicationService = new ApplicationService();