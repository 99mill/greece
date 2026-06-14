import { convexAuth } from '@convex-dev/auth/server'
import Resend from '@auth/core/providers/resend'
import { ResendOTP } from './otp/ResendOTP'
import { TwilioOTP } from './otp/TwilioOTP'

/*
  Auth: sign in with EMAIL or PHONE, as requested.

  - Email magic link (Resend)   — needs AUTH_RESEND_KEY
  - Email one-time code (Resend) — needs AUTH_RESEND_KEY
  - Phone one-time code (Twilio) — needs AUTH_TWILIO_* (see otp/TwilioOTP.ts)

  Set these with `npx convex env set AUTH_RESEND_KEY ...` after provisioning.
  Until then this file is reference code (imports ./_generated indirectly via
  convexAuth at runtime only).
*/

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Resend({ from: 'Greece Trip <onboarding@resend.dev>' }), // magic link
    ResendOTP, // email 6-digit code
    TwilioOTP, // phone 6-digit code
  ],
})
