/*
  Diet plan — STATIC, bundled, precached. This is the #1 thing that must work
  offline (food choices made at a taverna with no signal).

  IMPORTANT — read me:
  This is GENERAL renal-diet reference applied to common Greek dishes, NOT a
  prescription. In stage 5 CKD the targets for potassium, phosphorus, sodium,
  fluid, and protein are individual and depend on labs and dialysis adequacy.
  Notably, protein needs are often HIGHER on dialysis but must be balanced
  against phosphorus. His nephrologist / renal dietitian's plan overrides
  everything here. Flags are directional guidance for ordering decisions.
*/

export type Nutrient = 'potassium' | 'phosphorus' | 'sodium' | 'fluid' | 'protein'
export type Level = 'good' | 'caution' | 'limit'

export type Flag = { nutrient: Nutrient; level: Level; note: string }

export type FoodItem = {
  name: string
  greek?: string
  ingredients: string[]
  /** overall directional rating for a dialysis patient */
  rating: Level
  flags: Flag[]
  tip?: string
}

export type FoodCategory = { id: string; title: string; items: FoodItem[] }

export const nutrientLabels: Record<Nutrient, string> = {
  potassium: 'Potassium',
  phosphorus: 'Phosphorus',
  sodium: 'Sodium',
  fluid: 'Fluid',
  protein: 'Protein',
}

export const levelLabels: Record<Level, string> = {
  good: 'Good choice',
  caution: 'In moderation',
  limit: 'Limit / ask',
}

export const dietCategories: FoodCategory[] = [
  {
    id: 'mezedes',
    title: 'Salads & Mezedes',
    items: [
      {
        name: 'Greek Salad',
        greek: 'Horiatiki',
        ingredients: ['Tomato', 'Cucumber', 'Feta', 'Red onion', 'Green pepper', 'Kalamata olives', 'Olive oil', 'Oregano'],
        rating: 'caution',
        flags: [
          { nutrient: 'potassium', level: 'caution', note: 'Tomato is high in potassium.' },
          { nutrient: 'sodium', level: 'limit', note: 'Feta + olives are very salty.' },
          { nutrient: 'phosphorus', level: 'caution', note: 'Feta adds phosphorus.' },
        ],
        tip: 'Ask for little/no feta and olives, fewer tomatoes; load up on cucumber and pepper. Dress with plain olive oil.',
      },
      {
        name: 'Tzatziki',
        ingredients: ['Greek yogurt', 'Cucumber', 'Garlic', 'Olive oil', 'Dill'],
        rating: 'caution',
        flags: [{ nutrient: 'phosphorus', level: 'caution', note: 'Yogurt is a dairy phosphorus source.' }],
        tip: 'A small portion is usually fine; cucumber is low-potassium.',
      },
      {
        name: 'Hummus',
        ingredients: ['Chickpeas', 'Tahini', 'Garlic', 'Lemon', 'Olive oil'],
        rating: 'caution',
        flags: [
          { nutrient: 'potassium', level: 'caution', note: 'Chickpeas + tahini carry potassium.' },
          { nutrient: 'phosphorus', level: 'caution', note: 'Legumes & tahini are phosphorus-rich.' },
        ],
        tip: 'Small amounts; not an everyday dip for a renal diet.',
      },
      {
        name: 'Melitzanosalata (eggplant dip)',
        ingredients: ['Roasted eggplant', 'Garlic', 'Olive oil', 'Lemon'],
        rating: 'good',
        flags: [],
        tip: 'Eggplant is a lower-potassium vegetable — a good mezze pick.',
      },
      {
        name: 'Dolmades (stuffed grape leaves)',
        ingredients: ['Grape leaves', 'Rice', 'Herbs (mint, dill)', 'Olive oil'],
        rating: 'good',
        flags: [{ nutrient: 'sodium', level: 'caution', note: 'Brined grape leaves add some salt.' }],
        tip: 'Rice-based and relatively kidney-friendly.',
      },
      {
        name: 'Saganaki (fried cheese)',
        ingredients: ['Cheese (kefalograviera/graviera)', 'Flour', 'Olive oil', 'Lemon'],
        rating: 'limit',
        flags: [
          { nutrient: 'phosphorus', level: 'limit', note: 'Hard cheese is very high in phosphorus.' },
          { nutrient: 'sodium', level: 'limit', note: 'Salty cheese.' },
        ],
        tip: 'A shared bite at most.',
      },
      {
        name: 'Gigantes (baked giant beans)',
        ingredients: ['Butter beans', 'Tomato', 'Onion', 'Olive oil'],
        rating: 'limit',
        flags: [
          { nutrient: 'potassium', level: 'limit', note: 'Beans + tomato are both high potassium.' },
          { nutrient: 'phosphorus', level: 'limit', note: 'Legumes are phosphorus-rich.' },
        ],
      },
    ],
  },
  {
    id: 'street',
    title: 'Street Food',
    items: [
      {
        name: 'Gyros',
        ingredients: ['Chicken / pork / lamb', 'Pita bread', 'Tomato', 'Onion', 'Tzatziki', 'Fries (often inside)'],
        rating: 'caution',
        flags: [
          { nutrient: 'sodium', level: 'limit', note: 'Seasoned/processed meat is high sodium.' },
          { nutrient: 'protein', level: 'good', note: 'Good protein — useful on dialysis days.' },
          { nutrient: 'potassium', level: 'caution', note: 'Fries (potato) + tomato add potassium.' },
        ],
        tip: 'Chicken gyro, hold the fries inside, light tomato. Good protein hit if sodium is kept down.',
      },
      {
        name: 'Souvlaki (skewers)',
        ingredients: ['Pork / chicken', 'Optional pita, tomato, onion'],
        rating: 'good',
        flags: [
          { nutrient: 'protein', level: 'good', note: 'Lean grilled protein.' },
          { nutrient: 'sodium', level: 'caution', note: 'Depends on marinade/salt.' },
        ],
        tip: 'One of the better choices — grilled, simple, good protein. Ask for light salt.',
      },
      {
        name: 'Bougatsa',
        ingredients: ['Phyllo pastry', 'Semolina custard / cheese / minced meat'],
        rating: 'caution',
        flags: [{ nutrient: 'phosphorus', level: 'caution', note: 'Custard/cheese versions add dairy phosphorus.' }],
        tip: 'The custard version in a small size is the gentler choice.',
      },
      {
        name: 'Tiropita / Spanakopita',
        ingredients: ['Phyllo pastry', 'Feta', 'Spinach (spanakopita)'],
        rating: 'limit',
        flags: [
          { nutrient: 'sodium', level: 'limit', note: 'Feta is very salty.' },
          { nutrient: 'potassium', level: 'caution', note: 'Spinach is high potassium.' },
          { nutrient: 'phosphorus', level: 'caution', note: 'Feta phosphorus.' },
        ],
      },
    ],
  },
  {
    id: 'mains',
    title: 'Main Dishes',
    items: [
      {
        name: 'Moussaka',
        ingredients: ['Eggplant', 'Potato', 'Ground beef/lamb', 'Béchamel', 'Tomato'],
        rating: 'limit',
        flags: [
          { nutrient: 'potassium', level: 'limit', note: 'Potato + tomato.' },
          { nutrient: 'phosphorus', level: 'limit', note: 'Béchamel (milk) phosphorus.' },
        ],
        tip: 'Heavy on potassium and phosphorus — small portion, occasional.',
      },
      {
        name: 'Pastitsio',
        ingredients: ['Pasta', 'Ground meat', 'Béchamel', 'Tomato'],
        rating: 'caution',
        flags: [
          { nutrient: 'phosphorus', level: 'limit', note: 'Béchamel dairy.' },
          { nutrient: 'protein', level: 'good', note: 'Meat provides protein.' },
        ],
        tip: 'Pasta base is lower-potassium than potato; the béchamel is the catch.',
      },
      {
        name: 'Souvla / Roast Meats',
        ingredients: ['Lamb / pork / goat', 'Olive oil', 'Lemon', 'Oregano'],
        rating: 'good',
        flags: [
          { nutrient: 'protein', level: 'good', note: 'High-quality protein.' },
          { nutrient: 'sodium', level: 'caution', note: 'Ask for light salt.' },
        ],
        tip: 'Thessaly does meat extremely well — a strong, simple protein choice.',
      },
      {
        name: 'Gemista (stuffed vegetables)',
        ingredients: ['Tomatoes / peppers', 'Rice', 'Herbs', 'Olive oil'],
        rating: 'caution',
        flags: [{ nutrient: 'potassium', level: 'caution', note: 'Tomato shells are high potassium.' }],
        tip: 'Choose the pepper-stuffed ones over tomato to cut potassium.',
      },
      {
        name: 'Kotopoulo Lemonato (lemon chicken)',
        ingredients: ['Chicken', 'Lemon', 'Potatoes', 'Olive oil'],
        rating: 'good',
        flags: [
          { nutrient: 'protein', level: 'good', note: 'Lean chicken protein.' },
          { nutrient: 'potassium', level: 'caution', note: 'Skip/limit the potatoes.' },
        ],
        tip: 'Great pick — eat the chicken, go easy on the potatoes.',
      },
      {
        name: 'Fasolada (bean soup)',
        ingredients: ['White beans', 'Tomato', 'Carrot', 'Celery', 'Olive oil'],
        rating: 'limit',
        flags: [
          { nutrient: 'potassium', level: 'limit', note: 'Beans + tomato + veg = high potassium.' },
          { nutrient: 'fluid', level: 'caution', note: 'Soup broth counts toward fluid limits.' },
        ],
      },
      {
        name: 'Grilled Fish / Seafood',
        greek: 'sea bream, sardines',
        ingredients: ['Fish', 'Olive oil', 'Lemon'],
        rating: 'good',
        flags: [
          { nutrient: 'protein', level: 'good', note: 'Excellent lean protein.' },
          { nutrient: 'phosphorus', level: 'caution', note: 'Fish has some phosphorus — portion-aware.' },
        ],
        tip: 'Fresh grilled fish with lemon is one of the best dialysis-day choices.',
      },
    ],
  },
  {
    id: 'dairy',
    title: 'Dairy & Cheese',
    items: [
      {
        name: 'Feta',
        ingredients: ['Sheep/goat milk'],
        rating: 'limit',
        flags: [
          { nutrient: 'sodium', level: 'limit', note: 'Brined — very high sodium.' },
          { nutrient: 'phosphorus', level: 'limit', note: 'Dairy phosphorus.' },
        ],
      },
      {
        name: 'Greek Yogurt',
        ingredients: ['Yogurt', 'Honey', 'Walnuts (often)'],
        rating: 'caution',
        flags: [
          { nutrient: 'phosphorus', level: 'caution', note: 'Dairy phosphorus.' },
          { nutrient: 'potassium', level: 'caution', note: 'Walnuts add potassium/phosphorus.' },
        ],
        tip: 'Small plain portion; skip the walnuts.',
      },
      {
        name: 'Local hard cheeses',
        greek: 'Kefalograviera, Graviera, Manouri',
        ingredients: ['Aged cheese'],
        rating: 'limit',
        flags: [
          { nutrient: 'phosphorus', level: 'limit', note: 'Aged cheese is very high phosphorus.' },
          { nutrient: 'sodium', level: 'limit', note: 'Salty.' },
        ],
      },
    ],
  },
  {
    id: 'sweets',
    title: 'Sweets',
    items: [
      {
        name: 'Galaktoboureko',
        ingredients: ['Phyllo', 'Semolina custard', 'Syrup'],
        rating: 'caution',
        flags: [{ nutrient: 'phosphorus', level: 'caution', note: 'Custard (milk) phosphorus.' }],
        tip: 'Lower-potassium dessert than nut-based ones; mind the sugar.',
      },
      {
        name: 'Baklava',
        ingredients: ['Phyllo', 'Walnuts/pistachios', 'Honey syrup'],
        rating: 'limit',
        flags: [
          { nutrient: 'potassium', level: 'limit', note: 'Nuts are high potassium.' },
          { nutrient: 'phosphorus', level: 'limit', note: 'Nuts are high phosphorus.' },
        ],
        tip: 'Nut-heavy — a single small bite, not a portion.',
      },
      {
        name: 'Loukoumades',
        ingredients: ['Fried dough', 'Honey', 'Cinnamon'],
        rating: 'good',
        flags: [],
        tip: 'No dairy or nuts — the most kidney-friendly sweet here (still sugary).',
      },
    ],
  },
]

export const dietDisclaimer =
  'General renal-diet guidance applied to Greek dishes — not a prescription. Stage 5 CKD targets (potassium, phosphorus, sodium, fluid, protein) are individual and depend on labs and dialysis. His nephrologist / renal dietitian’s plan always overrides this.'

export const dietPrinciples = [
  'Limit high-potassium foods: tomato, potato, beans/legumes, spinach, oranges, bananas, nuts.',
  'Limit high-phosphorus foods: cheese, milk/béchamel, yogurt, nuts, whole grains, cola.',
  'Keep sodium down: feta, olives, cured foods, and restaurant salting are the big sources — ask for “ligo aláti” (little salt).',
  'Favor good protein on dialysis days: grilled fish, chicken, souvlaki, plain roast meats.',
  'Watch fluids: soups and broths count; heat increases thirst — follow his fluid limit.',
]
