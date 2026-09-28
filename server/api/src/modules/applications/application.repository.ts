import { eq, desc } from "drizzle-orm";

import { db } from "../../database/client.js";
import { applications } from "../../database/schema/applications.js";

export async function createApplication(data: {
  name: string;
  secretHash: string;
  secretVersion: string;
}) {
  const [application] = await db
    .insert(applications)
    .values({
      name: data.name,
      secretHash: data.secretHash,
      secretVersion: data.secretVersion,
    })
    .returning({
      id: applications.id,
      name: applications.name,
      isActive: applications.isActive,
      secretVersion: applications.secretVersion,
      createdAt: applications.createdAt,
      updatedAt: applications.updatedAt,
    });

  return application;
}

export async function findApplicationById(id: string) {
  const [application] = await db
    .select()
    .from(applications)
    .where(eq(applications.id, id))
    .limit(1);

  return application ?? null;
}

export async function findApplicationByName(name: string) {
  const [application] = await db
    .select()
    .from(applications)
    .where(eq(applications.name, name))
    .limit(1);

  return application ?? null;
}

export async function listApplications() {
  return db
    .select({
      id: applications.id,
      name: applications.name,
      isActive: applications.isActive,
      secretVersion: applications.secretVersion,
      createdAt: applications.createdAt,
      updatedAt: applications.updatedAt,
    })
    .from(applications)
    .orderBy(desc(applications.createdAt));
}

export async function updateApplication(
  id: string,
  data: {
    name?: string;
  },
) {
  const [application] = await db
    .update(applications)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(applications.id, id))
    .returning({
      id: applications.id,
      name: applications.name,
      isActive: applications.isActive,
      secretVersion: applications.secretVersion,
      createdAt: applications.createdAt,
      updatedAt: applications.updatedAt,
    });

  return application ?? null;
}

export async function rotateApplicationSecret(
  id: string,
  secretHash: string,
  secretVersion: string,
) {
  const [application] = await db
    .update(applications)
    .set({
      secretHash,
      secretVersion,
      updatedAt: new Date(),
    })
    .where(eq(applications.id, id))
    .returning({
      id: applications.id,
      name: applications.name,
      isActive: applications.isActive,
      secretVersion: applications.secretVersion,
      createdAt: applications.createdAt,
      updatedAt: applications.updatedAt,
    });

  return application ?? null;
}

export async function setApplicationActive(
  id: string,
  isActive: boolean,
) {
  const [application] = await db
    .update(applications)
    .set({
      isActive,
      updatedAt: new Date(),
    })
    .where(eq(applications.id, id))
    .returning({
      id: applications.id,
      name: applications.name,
      isActive: applications.isActive,
      secretVersion: applications.secretVersion,
      createdAt: applications.createdAt,
      updatedAt: applications.updatedAt,
    });

  return application ?? null;
}