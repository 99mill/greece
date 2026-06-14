import { Phone } from '@convex-dev/auth/providers/Phone'
import { alphabet, generateRandomString } from 'oslo/crypto'

/*
  Phone 6-digit one-time code via Twilio Verify / SMS.
  Requires: `pnpm add twilio oslo` and these convex env vars:
    AUTH_TWILIO_ACCOUNT_SID, AUTH_TWILIO_AUTH_TOKEN, AUTH_TWILIO_FROM
*/
export const TwilioOTP = Phone({
  id: 'twilio-otp',
  maxAge: 60 * 15,
  async generateVerificationToken() {
    return generateRandomString(6, alphabet('0-9'))
  },
  async sendVerificationRequest({ identifier: phone, token }) {
    const sid = process.env.AUTH_TWILIO_ACCOUNT_SID!
    const authToken = process.env.AUTH_TWILIO_AUTH_TOKEN!
    const from = process.env.AUTH_TWILIO_FROM!
    const body = new URLSearchParams({
      To: phone,
      From: from,
      Body: `Your Greece Trip sign-in code is ${token}`,
    })
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${sid}:${authToken}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      },
    )
    if (!res.ok) throw new Error(`Twilio error: ${await res.text()}`)
  },
})
