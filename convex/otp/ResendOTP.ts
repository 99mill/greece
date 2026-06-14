import Resend from '@auth/core/providers/resend'
import { Resend as ResendAPI } from 'resend'
import { alphabet, generateRandomString } from 'oslo/crypto'

/*
  Email 6-digit one-time code via Resend.
  Requires: `pnpm add resend oslo` and `npx convex env set AUTH_RESEND_KEY ...`
*/
export const ResendOTP = Resend({
  id: 'resend-otp',
  apiKey: process.env.AUTH_RESEND_KEY,
  maxAge: 60 * 15, // 15 minutes
  async generateVerificationToken() {
    return generateRandomString(6, alphabet('0-9'))
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey)
    const { error } = await resend.emails.send({
      from: 'Greece Trip <onboarding@resend.dev>',
      to: [email],
      subject: 'Your sign-in code',
      text: `Your code is ${token}. It expires in 15 minutes.`,
    })
    if (error) throw new Error(JSON.stringify(error))
  },
})
