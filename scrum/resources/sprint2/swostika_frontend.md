# Self-Assessment

- **Member name:** Swostika Lama
- **Contribution area:** Frontend Development (Home/Landing Page UI Implementation and Responsive Design)

---

### 1. Functionality

- **Does the code meet the requirements?**
  - [x] Does it implement all specified features you were responsible for? (The layout matches the "Revolutionise" and "Hero" requirements).
  - [ ] Are edge cases handled? (N/A for static UI, though content duplication is present).
  - [ ] Are there any bugs or unexpected behaviors? (The "Why Choose Us" section repeats "Budget Tracking" three times with identical text; this appears to be placeholder data).
- **Integration**
  - [x] Does your code work correctly with other parts of the application? (It exports correctly as a default component).
  - [ ] Are inputs and outputs managed appropriately? (The "Get Started" button currently has no `onClick` handler or link to the Register page).

---

### 2. Code Quality

- **Readability**
  - [x] Is your code easy to understand for other developers? (Excellent usage of semantic HTML tags like `<section>`, `<h1>`, and `<ul>`).
  - [x] Are variable and function names descriptive and meaningful?
- **Reusability**
  - [x] Can your code or parts of it be reused elsewhere in the application? (I successfully used `.map()` to render lists, which is a good reusable pattern).
  - [x] Is logic modular and separated from unrelated concerns?
- **Comments and Documentation**
  - [x] Are there comments explaining complex logic? (Good use of section headers like `{/* Hero Section */}`).
  - [ ] Is there documentation for how to use your code unit?

---

### 3. Performance

- **Efficiency**
  - [x] Are there any unnecessary operations or performance bottlenecks? (Code is very lightweight and efficient).
  - [x] Is the code optimized for larger datasets or high traffic? (Using `.map` is efficient for rendering lists).

---

### 4. Overall Assessment

- **Strengths**
  - **Responsive Design:** Excellent use of Tailwind CSS breakpoints (e.g., `md:flex-row`, `md:text-5xl`) ensures the page looks good on mobile and desktop.
  - **Code Structure:** The code is clean, indented well, and uses semantic HTML, making it accessible and easy to read.
  - **DRY Principle:** Instead of hardcoding every list item,  used arrays and `.map()` functions to generate the "Why Choose Us" and "Revolutionise" lists.
- **Areas for Improvement**
  - **Content Duplication:** In the "Why Choose Us" section, the array `["Budget Tracking", "Budget Tracking", "Budget Tracking"]` renders three identical cards.
  - **Hardcoded Data:** The data arrays are defined inside the `return` statement. If the component re-renders, these arrays are redefined every time.
  - **Interactivity:** The "Get Started" button is currently visual only; it needs to link to the Registration/Login route.
- **Action Plan**
  - **Fix Data:** Update the "Why Choose Us" array to have unique titles and descriptions (e.g., "Budget Tracking", "Expense Analytics", "Secure Storage").
  - **Refactor Data:** Move the static arrays (the lists of strings) outside of the component function or into a separate `constants.js` file to keep the component logic clean.
  - **Add Navigation:** Wrap the "Get Started" button in a `Link` component (from `react-router-dom`) or add an `onClick` handler to navigate to the Signup page.

---

### 5. Additional Notes

- While my primary focus in the table was the Authentication pages and Backend integration, I also established the `Home` landing page structure.
- This page serves as the entry point to the application, explaining the value proposition ("Smart Budget") to the user before they sign up.
