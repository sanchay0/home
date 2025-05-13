import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { Resend } from "resend";
import { admin } from "../../firebase/firebaseAdmin";
import { db } from "../../firebase/clientApp";
import emailTemplate from "./emailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailResult {
  email: string;
  data?: any;
  error?: any;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const idToken = authHeader.split("Bearer ")[1];
    if (!idToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { tags, title, content, id } = req.body;

    // fetch subscribers
    const snapshot = await getDocs(collection(db, "subscribers"));
    const subscribers = snapshot.docs.map((doc) => ({
      id: doc.id,
      email: doc.data().email,
    }));

    const tagsHtml =
      tags && tags.length
        ? `<span style="font-size:13px; color:#888; margin-right:8px;">Labels:</span>${tags
            .map(
              (tag) =>
                `<span style="display:inline-block; background:#eaeaea; color:#555; padding:2px 10px; margin-right:5px; border-radius:14px; font-size:13px;">${tag}</span>`,
            )
            .join("")}`
        : "";

    const emailBody = emailTemplate
      .replace(/{{title}}/g, title)
      .replace("{{content}}", content)
      .replace("{{link}}", `${process.env.NEXT_PUBLIC_URL}/blog/${id}`)
      .replace("{{tags}}", tagsHtml);

    // LIMITATION: Resend batch send supports a maximum of 100 emails per batch
    if (subscribers.length > 100) {
      return res
        .status(400)
        .json({ message: "Too many subscribers. Max 100 per batch." });
    }

    const batchPayload = subscribers.map((subscriber) => ({
      from: "Sanchay Javeria <hello@sanchayjaveria.com>",
      to: [subscriber.email],
      reply_to: "hello@sanchayjaveria.com",
      subject: title,
      html: emailBody.replace(
        "{{unsubscribe}}",
        `${process.env.NEXT_PUBLIC_URL}/unsubscribe/${subscriber.id}`
      ),
    }));

    // Only works for up to 100 emails in a single batch (Resend API limitation)
    // TODO: Use Resend's audience broadcast once we hit more than 100 subscribers.
    const { data, error } = await resend.batch.send(batchPayload);

    if (error) {
      return res.status(400).json({ message: "Some emails failed to send", error });
    }

    return res.status(200).json({ message: "All emails sent successfully", data });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error fetching subscribers or sending emails:", err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};
