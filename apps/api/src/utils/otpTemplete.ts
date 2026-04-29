import { baseTemplate } from "./baseTempletye"

export const otpTemplate = ({ name, otp, min, sec }: { name: String, otp: string, min: string, sec: string }) => {

    const content = `
    <h2>OTP</h2>
    <p>Hi , ${name}</p>
    <p>Please Use Following OTP</p>
    <h1>${otp}</h1>
    <p>This OTP Will Expire In ${min} Min (${sec} seconds)</p>
    <p>If You Did Not Request This, Please Igonre This Email</p>
    `
    return baseTemplate({ title: "Welcome to Skillhub", content })
}