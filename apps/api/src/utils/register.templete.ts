import { baseTemplate } from "./baseTempletye"

export const registerTemplate = ({ name, password }: { name: string, password: string }) => {

    const content = `
    <h2>welcom To Skillhub</h2>
    <p>Hi , ${name}</p>
    <p>Thank You For ChoosingSKILLHUB.</p>
    <p>Your Temporary Password is${password}.</p>
    `
    return baseTemplate({
        title: "Welcome to Skillhub",
        content
    })
}