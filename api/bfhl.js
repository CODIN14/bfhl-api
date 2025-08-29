// --- Fill these with YOUR details ---
const FULL_NAME = "colin_paul";       // lowercase with underscores
const DOB_DDMMYYYY = "17091999";      // ddmmyyyy
const EMAIL = "colin@example.com";
const ROLL_NUMBER = "ABCD123";
// -----------------------------------

const isNumericString = (s) => /^[-+]?\d+$/.test(s);
const isAlphaString   = (s) => /^[A-Za-z]+$/.test(s);

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      is_success: false,
      message: "Only POST /bfhl is allowed"
    });
  }

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    if (!payload || !Array.isArray(payload.data)) {
      return res.status(400).json({
        is_success: false,
        message: 'Body must be JSON with "data": [ ... ]'
      });
    }

    // Normalize everything to strings (in case someone sends numbers)
    const input = payload.data.map((x) => String(x));

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;
    let letterConcat = ""; // concatenate ALL alphabetic characters across tokens

    for (const item of input) {
      if (isNumericString(item)) {
        const n = parseInt(item, 10);
        (n % 2 === 0 ? even_numbers : odd_numbers).push(item); // keep as string
        sum += n;
      } else if (isAlphaString(item)) {
        alphabets.push(item.toUpperCase());
        letterConcat += item; // keep original case for later alternating caps
      } else {
        special_characters.push(item);
      }
    }

    // Reverse all letters and apply alternating caps starting with UPPER
    const reversedLetters = letterConcat.split("").reverse();
    const concat_string = reversedLetters
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    const response = {
      is_success: true,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),           // sum as a STRING (required)
      concat_string               // alternating caps of reversed letters
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({
      is_success: false,
      message: "Bad Request",
      error: String(err?.message || err)
    });
  }
}
