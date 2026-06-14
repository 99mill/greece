/*
  Medical resources for the trip — STATIC, bundled, and precached so this
  screen works with zero signal.

  Accuracy policy: only facts that are stable and verifiable are hard-coded
  (EU/Greek emergency numbers). Anything that can change or that we could not
  verify (specific clinic phone numbers, your booked dialysis slot) is marked
  `verifyBeforeTravel` and should be confirmed and filled in before departure.
  In an emergency, a wrong phone number is worse than none.
*/

export type EmergencyContact = {
  label: string
  number: string
  note: string
  /** true = dial-anywhere, verified stable number */
  verified: boolean
}

export const emergencyNumbers: EmergencyContact[] = [
  {
    label: 'Europe-wide emergency (all services)',
    number: '112',
    note: 'Works from any phone, any EU country, even with no SIM/credit. Operators speak English. Use this first if unsure.',
    verified: true,
  },
  {
    label: 'Ambulance — EKAB',
    number: '166',
    note: 'Greek national emergency medical service. Toll-free. EKAB operates a station in Larissa.',
    verified: true,
  },
  {
    label: 'Police',
    number: '100',
    note: 'Greek national police.',
    verified: true,
  },
  {
    label: 'Tourist Police',
    number: '1571',
    note: 'English-speaking assistance for tourists.',
    verified: true,
  },
  {
    label: 'Fire service',
    number: '199',
    note: 'Fire brigade / rural fires.',
    verified: true,
  },
]

export type Facility = {
  name: string
  kind: 'hospital' | 'dialysis' | 'pharmacy'
  area: string
  details: string
  /** Must be confirmed before the trip — do not rely on in an emergency until checked. */
  verifyBeforeTravel: boolean
  phone?: string
  address?: string
  mapsQuery: string
}

export const facilities: Facility[] = [
  {
    name: 'General University Hospital of Larissa',
    kind: 'hospital',
    area: 'Larissa (Mezourlo)',
    details:
      'Major tertiary public hospital with a full emergency department. Confirm exact ER entrance and current phone before travel.',
    verifyBeforeTravel: true,
    mapsQuery: 'General University Hospital of Larissa Greece',
  },
  {
    name: 'General Hospital of Larissa "Koutlimbaneio & Triantafylleio"',
    kind: 'hospital',
    area: 'Larissa (city)',
    details:
      'Public general hospital serving Larissa city. Confirm ER availability before travel.',
    verifyBeforeTravel: true,
    mapsQuery: 'Koutlimbaneio Triantafylleio General Hospital Larissa',
  },
  {
    name: 'Holiday dialysis center (TO BE BOOKED)',
    kind: 'dialysis',
    area: 'Larissa / Thessaly',
    details:
      'CRITICAL: hemodialysis as a visitor must be arranged in advance — typically weeks to months ahead. Book a confirmed slot, then replace this entry with the center name, address, phone, your appointment days/times, and the dialysis prescription they confirmed.',
    verifyBeforeTravel: true,
    mapsQuery: 'dialysis center Larissa Greece',
  },
]

export type PrepItem = { text: string; done: boolean }

/** Pre-travel checklist specific to traveling with stage 5 CKD. */
export const dialysisTravelChecklist: PrepItem[] = [
  { text: 'Book confirmed holiday-dialysis slots at a Larissa/Thessaly center for every scheduled session of the trip', done: false },
  { text: 'Send the center his latest dialysis prescription, recent bloodwork, serology (Hep B/C, HIV), and dry weight', done: false },
  { text: 'Carry EHIC/GHIC (EU citizens) AND comprehensive travel insurance that explicitly covers dialysis & pre-existing renal disease', done: false },
  { text: 'Pack medications in carry-on with a doctor’s letter listing them (generic names) and the renal diagnosis', done: false },
  { text: 'Bring nephrologist contact details and a one-page medical summary (diagnosis, meds, allergies, access type)', done: false },
  { text: 'Note his vascular access type (fistula/graft/catheter) and any arm-use precautions', done: false },
  { text: 'Confirm fluid + potassium limits with his renal team for the travel period (heat raises both risks)', done: false },
  { text: 'Locate the nearest hospital ER to the accommodation and save directions offline', done: false },
]

export const medicalDisclaimer =
  'This screen is a travel reference, not medical advice. Emergency numbers are verified; facility and dialysis details must be confirmed with the providers and his nephrology team before relying on them.'
