const express = require("express");
const app = express();
app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input" });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        // Numeric string
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // Alphabetical string
        alphabets.push(item.toUpperCase());
      } else {
        // Special characters
        special_characters.push(item);
      }
    });

    // Alternating caps string (reverse order)
    let concat_string = "";
    const allChars = alphabets.join("").split("").reverse();
    allChars.forEach((ch, i) => {
      concat_string += i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
    });

    const response = {
      is_success: true,
      user_id: "colin_paul_14122003", // 👈 change to your full name + DOB
      email: "colinchettiam@gmail.com", // 👈 replace
      roll_number: "22BCE2216", // 👈 replace
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ is_success: false, error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
