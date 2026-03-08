# ⏳ ChronoLife: Life Path Tracker

**ChronoLife** is a sleek, high-performance web application that provides users with real-time statistics about their life journey based on their birth date. Built with a focus on **User Experience (UX)**
## ✨ Key Features

* **Live Counter:** Displays total seconds lived, updating in real-time.
* **Life Milestones:** Calculates the total number of days since birth.
* **Next Birthday Countdown:** Tracks exactly how many days remain until the next birthday and shows the upcoming age.
* **Zodiac Detection:** Automatically determines the user's Zodiac sign.
* **Celebration Logic:** Triggers a **Confetti** animation if the user's birthday is within the next 30 days.
* **Smart Validation:** Highlights input fields in neon red if an invalid date (e.g., Feb 31st) is entered.

## 📱 Advanced UX (User Experience)

This project goes beyond simple calculations by implementing professional-grade input handling:
* **Auto-Tabbing:** Automatically shifts focus to the next field once a limit is reached (e.g., DD -> MM).
* **Backspace Navigation:** Returns focus to the previous field if the user hits backspace on an empty input.
* **Mobile Optimized:** Forces a numeric keypad on mobile devices using `inputmode="numeric"`.
* **Instant Feedback:** Updates the UI immediately as the user finishes typing the 4th digit of the year.

## 🛠 Tech Stack

* **HTML5:** Semantic structure and mobile-friendly meta tags.
* **CSS3:** Glassmorphism, Neon UI effects, and Flexbox layouts.
* **JavaScript (ES6+):** Real-time DOM manipulation, Date objects, and Regex-based input sanitization.
* **Canvas Confetti:** Integrated via CDN for lightweight celebratory animations.

---
*Created with focus on clean code and seamless user interaction.*
