import mail from "@sendgrid/mail"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/clientApp"
import emailTemplate from './emailTemplate'

mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    if (req.body) {
        const body = JSON.parse(req.body)
        console.log("Sending emails...")

        // fetch subscribers
        const snapshot = await getDocs(collection(db, "subscribers"))
        const subscribers = snapshot.docs.map((doc) => ({ id: doc.id, email: doc.data().email }))

        const emailBody = emailTemplate
            .replace("{{title}}", body.title)
            .replace("{{content}}", body.content)
            .replace("{{link}}", `${process.env.NEXT_PUBLIC_URL}/blog/${body.id}`)

        // eslint-disable-next-line no-restricted-syntax
        for (const subscriber of subscribers) {
            console.log(`Sending email to: ${subscriber.email} with API key ${process.env.SENDGRID_API_KEY}`)
            const data = {
                to: "sanchayjaveria@gmail.com",
                from: {
                    name: "Sanchay Javeria",
                    email: "hello@sanchayjaveria.com",
                },
                subject: body.title,
                text: 'and easy to do anywhere, even with Node.js',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>'
            }

            mail
              .send(data)
              .then(() => {
                console.log('Email sent!')
              })
              .catch((error) => {
                console.error(error)
              })
        }
    }
    res.status(200).json({ status: "Ok" })
}
