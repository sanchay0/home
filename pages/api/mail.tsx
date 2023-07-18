import mail from "@sendgrid/mail"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/clientApp"

mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    if (req.body) {
        const body = JSON.parse(req.body)

        // fetch subscribers
        const snapshot = await getDocs(collection(db, "subscribers"))
        const emails = snapshot.docs.map((doc) => doc.data().email)
        
        // TODO: Format HTML and make it pretty
        const message = `
            title: ${body.title}\r\n
            content: ${body.content}\r\n
        `

        // eslint-disable-next-line no-restricted-syntax
        for (const subscriber of emails) {
            const data = {
                to: subscriber,
                from: {
                    name: "Sanchay Javeria",
                    email: "hello@sanchayjaveria.com",
                },
                subject: body.title,
                html: message.replace(/\r\n/g, "<br>")
            }
    
            mail.send(data)
        }
    }
    res.status(200).json({ status: "Ok" })
}