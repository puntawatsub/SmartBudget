# Self-Assessment

- **Member name:** _Puntawat Subhamani_
- **Contribution area:** Backend API Development (Transaction Controllers, Dashboard Analytics, Authentication/Token Management, and Gemini AI Integration).

---

### 1. Functionality

- **Does the code meet the requirements?**
  - [x] Does it implement all specified features you were responsible for?
    > **Explanation:** The code successfully implements CRUD operations for transactions, aggregates data for the dashboard, handles JWT authentication with refresh token rotation, and integrates Google Gemini for spending analysis.
  - [x] Are edge cases handled (e.g., invalid data, duplicates)?
    > **Explanation:** The `transactionController` handles negative amounts (expenses) vs positive (income) logic. `refreshController` checks for cookie existence and validity before proceeding. `gemini.js` includes a check for Rate Limiting (429 status).
  - [x] Are there any bugs or unexpected behaviors?
    > **Explanation:**
    >
    > 1. **Hardcoded Value:** In `aiSpendingAnalysis.js`, `const totalExpenses = 10000` is hardcoded, which will skew percentage calculations for users with different spending totals.
    > 2. **Token Logic:** In `refreshController.js`, inside the success block, you generate a `token` using `generateRefreshToken(user)`. It is likely you intended to generate an **access** token there to send back to the client, not another refresh token.
    > 3. **Static Data:** `dashboardController.js` returns hardcoded static data for `goals` and `upcomingBills`.
- **Integration**
  - [x] Does your code work correctly with other parts of the application?
    > **Explanation:** The controllers seamlessly interact with MongoDB models (`Transaction`, `Analytics`, `Category`, `User`) and external APIs (Google Gemini).
  - [x] Are inputs and outputs managed appropriately?
    > **Explanation:** Input validation exists (e.g., checking for `req.body` fields). Output is consistently formatted as JSON. The AI response parsing (`rawResponse.match`) in `createOne` is a bit fragile but attempts to handle Markdown formatting from the LLM.

---

### 2. Code Quality

- **Readability**
  - [x] Is your code easy to understand for other developers?
    > **Explanation:** Variable names are clear (`totalIncome`, `wastefulCategoryQuery`). The folder structure (controllers, models, lib) is standard for Express apps.
  - [x] Are variable and function names descriptive and meaningful?
    > **Explanation:** Yes. Helper functions like `getMonthYear` and `flattenObject` are self-explanatory.
- **Reusability**
  - [x] Can your code or parts of it be reused elsewhere in the application?
    > **Explanation:** `gemini.js` is a modular wrapper that can be used for any prompt. `tokens.js` extracts auth logic well.
  - [ ] Is logic modular and separated from unrelated concerns?
    > **Explanation:** Generally yes, but `transactionController.js` -> `createOne` and `updateById` contain heavy business logic regarding Analytics and Category updates. This couples the "Transaction" concept tightly with "Analytics" updates, making it harder to maintain.
- **Comments and Documentation**
  - [ ] Are there comments explaining complex logic?
    > **Explanation:** Some comments exist (e.g., `// extract JSON from markdown fences`), but the complex manual recalculation of totals in `updateById` lacks comments explaining the math logic.
  - [ ] Is there documentation for how to use your code unit?
    > **Explanation:** API endpoints and expected payloads are not documented in the code (e.g., via Swagger or JSDoc).

---

### 3. Performance

- **Efficiency**
  - [ ] Are there any unnecessary operations or performance bottlenecks?
    > **Explanation:**
    >
    > 1. **N+1 Query Issue:** In `dashboardController.js`, inside the loop `for (const name of categoriesNames)`, there is an `await Category.findOne(...)`. This executes a database query for _every single category_ sequentially. This will be very slow as data grows. It should be replaced with a single MongoDB Aggregation or `Promise.all`.
    > 2. **Heavy Context Loading:** In `transactionController.js` (`createOne`), `await Transactions.find({ userId })` loads **all** user transactions into memory to send to the AI. As the user adds more data (e.g., 1000+ transactions), this will consume excessive memory and exceed the AI token limit.
  - [ ] Is the code optimized for larger datasets or high traffic (if applicable)?
    > **Explanation:** `aiSpendingAnalysis.js` uses MongoDB Aggregation (`$group`, `$project`), which is highly optimized for analytics. However, the issues mentioned above in the controllers prevent high-traffic scalability.

---

### 4. Overall Assessment

- **Strengths**
  - **Security:** Implemented robust Authentication using HTTP-Only cookies, Refresh Token Rotation, and token hashing in the database.
  - **Innovation:** Successfully integrated a Large Language Model (Gemini) to categorize transactions and provide insights dynamically.
  - **Data Aggregation:** The `aiSpendingAnalysis.js` file demonstrates good use of MongoDB aggregation pipelines for calculating statistics.
- **Areas for Improvement**
  - **Database Integrity:** The `createOne` and `updateById` functions update multiple collections (Transaction, Category, Analytics) sequentially. If one fails, the data becomes out of sync. These should be wrapped in a **MongoDB Transaction** (Session).
  - **Performance:** Refactor the loop in `dashboardController` to remove the `await` inside the loop.
  - **Maintainability:** Remove hardcoded values (like `10000` expense limit) and move them to the `Settings` model or constants.
- **Action Plan**
  - **Fix Auth:** Change `generateRefreshToken` to `generateAccessToken` in the JSON response of `refreshController.js`.
  - **Optimize Dashboard:** Rewrite the `expenditureOverview` logic using `Category.aggregate([...])` to fetch current and previous month data in one go.
  - **Refactor Updates:** Use `mongoose.startSession()` in `transactionController` to ensure atomic updates across collections.

---

### 5. Additional Notes

- The usage of `crypto` to hash refresh tokens before saving them to the database (`tokens.js`) is an excellent security practice that prevents token reuse if the database is compromised.
