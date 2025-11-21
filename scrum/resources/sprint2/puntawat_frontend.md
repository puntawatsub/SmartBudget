# Self-Assessment

- **Member name:** Puntawat Subhamani
- **Contribution area:** Frontend Development (Sign Up Component UI & Logic), Backend API Integration.

---

### 1. Functionality

- **Does the code meet the requirements?**
  - [x] Does it implement all specified features you were responsible for? (User registration, UI implementation, API connection).
  - [x] Are edge cases handled? (Password mismatch validation is present; error handling for server failures is included).
  - [ ] Are there any bugs or unexpected behaviors? (Generally functional, though `alert()` is a crude way to handle errors for a final product).
- **Integration**
  - [x] Does your code work correctly with other parts of the application? (Navigates to `/login` on success, imports reusable `Input` component).
  - [x] Are inputs and outputs managed appropriately? (Controlled components using `useState` work correctly).

---

### 2. Code Quality

- **Readability**
  - [x] Is your code easy to understand for other developers?
  - [x] Are variable and function names descriptive and meaningful? (`formData`, `handleChange`, `handleSubmit` are standard and clear).
- **Reusability**
  - [x] Can your code or parts of it be reused elsewhere in the application? (You effectively used the `Input` component).
  - [x] Is logic modular and separated from unrelated concerns? (The array mapping strategy `{["username", "email"...].map(...) }` to generate fields is a **great** example of DRY - Don't Repeat Yourself - code).
- **Comments and Documentation**
  - [x] Are there comments explaining complex logic? (Code is self-explanatory, so heavy comments aren't needed).
  - [ ] Is there documentation for how to use your code unit?
  - **Note:** There is a large block of **commented-out (dead) code** (the previous `handleSubmit` function). This should be removed before merging to the main branch to keep the codebase clean.

---

### 3. Performance

- **Efficiency**
  - [x] Are there any unnecessary operations or performance bottlenecks?
  - [x] Is the code optimized for larger datasets or high traffic? (Standard React state management is efficient here).

---

### 4. Overall Assessment

- **Strengths**
  - **Smart UI Structure:** Using `.map()` to render the input fields based on an array is excellent. It reduces code bloat and makes adding future fields much easier.
  - **Responsive Design:** The Tailwind classes handle different screen sizes (`xl:hidden`, `max-sm:hidden`) effectively, aligning with your role as UI Designer.
  - **Integration Success:** You successfully converted the form to use `async/await` and connected it to the backend, fulfilling the sprint goal of "Integration between front-end and back-end."
- **Areas for Improvement**
  - **Hardcoded API URL:** You are using `http://localhost:3000/api/signups`. If you deploy this or if a teammate runs the backend on a different port, this will break.
  - **Dead Code:** The commented-out version of `handleSubmit` (lines 18-32) clutters the file and should be deleted.
  - **User Experience (UX):** Using `window.alert("Passwords do not match")` interrupts the user flow. It is better to display a text error message below the input field or use a "Toast" notification.
- **Action Plan**
  - **Refactor URL:** Replace the hardcoded URL with an environment variable (e.g., `process.env.REACT_APP_API_URL` or `import.meta.env.VITE_API_URL`).
  - **Clean Up:** Delete the commented-out code block.
  - **Enhance Validation:** Add a quick check for email format or password strength before sending the request to the server to save bandwidth.

---

### 5. Additional Notes

- The visual implementation matches the "Smart Budget" branding described in the sprint context well.
- The use of `autoComplete="new-password"` is a good security practice included in your code.
