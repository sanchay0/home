import admin from "firebase-admin";
import { base64ToObject } from "../utils/helpers";

const credentials = base64ToObject(
  process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CONFIG,
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: credentials.project_id,
      clientEmail: credentials.client_email,
      privateKey: credentials.private_key?.replace(/\\n/g, "\n"),
    }),
  });
}

export { admin };
