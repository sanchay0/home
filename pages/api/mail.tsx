import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { Resend } from "resend";
import { admin } from "../../firebase/firebaseAdmin";
import { db } from "../../firebase/clientApp";
import emailTemplate from "./emailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const body = JSON.parse(req.body);

    // fetch subscribers
    const snapshot = await getDocs(
      collection(db, process.env.NEXT_PUBLIC_SUBSCRIBERS_DB),
    );
    const subscribers = snapshot.docs.map((doc) => ({
      id: doc.id,
      email: doc.data().email,
    }));

    const emailBody = emailTemplate
      .replace("{{title}}", body.title)
      .replace("{{content}}", body.content)
      .replace("{{link}}", `${process.env.NEXT_PUBLIC_URL}/blog/${body.id}`);

    const emailPromises = subscribers.map(async (subscriber) => {
      try {
        const { data, error } = await resend.emails.send({
          to: [subscriber.email],
          from: "Sanchay Javeria <hello@sanchayjaveria.com>",
          reply_to: "hello@sanchayjaveria.com",
          subject: body.title,
          html: emailBody.replace(
            "{{unsubscribe}}",
            `${process.env.NEXT_PUBLIC_URL}/unsubscribe/${subscriber.id}`,
          ),
        });

        if (error) {
          // eslint-disable-next-line no-console
          console.error(`Error sending email to ${subscriber.email}:`, error);
          return { email: subscriber.email, error };
        }

        // eslint-disable-next-line no-console
        console.log(`Email sent to ${subscriber.email}:`, data);
        return { email: subscriber.email, data };
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(
          `Unexpected error sending email to ${subscriber.email}:`,
          err,
        );
        return { email: subscriber.email, error: err };
      }
    });

    const results = await Promise.all(emailPromises);

    const errors = results.filter((result) => result.error);
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ message: "Some emails failed to send", errors });
    }

    return res
      .status(200)
      .json({ message: "All emails sent successfully", results });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error fetching subscribers or sending emails:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};
