import winston from "winston"
import { createTransport } from "nodemailer"
import settings from "./settings"
import EmailSettingsService from "../services/settings/email"

const { host, port, secure, user, pass } = settings.smtpServer
const transportFromConfig = createTransport({
  host,
  port,
  secure, // true for 465, false for other ports
  auth: {
    user,
    pass,
  },
  tls: { rejectUnauthorized: false },
})

const getSmtpFromEmailSettings = emailSettings => ({
  host: emailSettings.host,
  port: emailSettings.port,
  secure: emailSettings.port === 465,
  auth: {
    user: emailSettings.user,
    pass: emailSettings.pass,
  },
  tls: { rejectUnauthorized: false },
})

const getTransport = emailSettings => {
  const useSmtpServerFromConfigFile = emailSettings.host === ""
  const emailSettingsSMTP = getSmtpFromEmailSettings(emailSettings)

  const smtp = useSmtpServerFromConfigFile
    ? createTransport(transportFromConfig)
    : createTransport(emailSettingsSMTP)

  return smtp
}

const sendMail = (transport, message) =>
  new Promise((resolve, reject) => {
    if (!message.to.includes("@")) {
      reject(new Error("Invalid email address"))
      return
    }

    transport.sendMail(message, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve(info)
      }
    })
  })

const getFrom = emailSettings => {
  const useSmtpServerFromConfigFile = emailSettings.host === ""
  return useSmtpServerFromConfigFile
    ? `"${settings.smtpServer.fromName}" <${settings.smtpServer.fromAddress}>`
    : `"${emailSettings.from_name}" <${emailSettings.from_address}>`
}

export const send = async message => {
  const emailSettings = await EmailSettingsService.getEmailSettings()
  const transport = getTransport(emailSettings)

  const messageToSend = { ...message, from: getFrom(emailSettings) }

  try {
    const result = await sendMail(transport, messageToSend)
    winston.info("Email sent", result)
    return true
  } catch (error) {
    winston.error("Email send failed", error)
    return false
  }
}
