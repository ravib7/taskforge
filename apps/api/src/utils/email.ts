import { env } from "../config/env"

const nodemailer = require("nodemailer")

export const sendEmail = ({ email, subject, message }: { email: string, subject: string, message: string }) => new Promise((resolve, reject) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: env.email,
                pass: env.email_pass
            }
        })

        transport.sendMail({
            to: email,
            subject,
            html: message
        })

        console.log("email send success")
        resolve("email send success")

    } catch (error) {
        console.log(error)
        reject("unable to send email")
    }
})