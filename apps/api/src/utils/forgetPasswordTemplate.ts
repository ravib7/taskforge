import { baseTemplate } from "./baseTempletye"

export const forgetPasswordTemplate = ({ name, resetLink }: { name: string, resetLink: string }) => {

    const content = `
    <h2>Request Password Reset</h2>
    <p>Hi , ${name}</p>
    <p>You have Requiesed to reset password</p>
    <a href='${resetLink}'>Reset Password</a>

    <p>This Link Will Expire In 15 Min</p>
    <p>If You Have Not Request To Reset Password , Please Igonre This Email</p>
    `
    return baseTemplate({ title: "Welcome to Skillhub", content })
}