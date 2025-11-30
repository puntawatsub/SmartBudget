# Self-Assessment

- **Member name:** Chandina Nilukshi
- **Contribution area:** Front-end development for "Forgot Password" and "Reset Password" pages; UI styling and responsive layout implementation.

---

### 1. Functionality

- **Does the code meet the requirements?**
  - [x] Does it implement all specified features you were responsible for? (Created both UI pages and client-side logic).
  - [x] Are edge cases handled (e.g., invalid data, duplicates)? (Added validation to check if "New Password" and "Confirm Password" match).
  - [ ] Are there any bugs or unexpected behaviors? (Currently functions correctly as a UI prototype, but the backend connection is simulated via `console.log` rather than a real API call).
- **Integration**
  - [x] Does your code work correctly with other parts of the application? (Successfully integrates `react-router-dom` for navigation and utilizes the shared `Input` component in the Forgot Password page).
  - [x] Are inputs and outputs managed appropriately? (State is managed via `useState` for all form fields).

---

### 2. Code Quality

- **Readability**
  - [x] Is your code easy to understand for other developers? (Code structure is clean and standard React functional component style).
  - [x] Are variable and function names descriptive and meaningful? (Variables like `email`, `confirmPassword`, `handleSubmit` are clear).
- **Reusability**
  - [x] Can your code or parts of it be reused elsewhere in the application? (The `ForgotPassword` page correctly reuses the custom `Input` component).
  - [ ] Is logic modular and separated from unrelated concerns? (In `ResetPassword.jsx`, standard HTML `<input>` tags were used instead of the reusable `Input` component used in the other file, reducing modularity slightly).
- **Comments and Documentation**
  - [ ] Are there comments explaining complex logic? (The logic is currently simple enough to not require heavy comments, though the mock API sections could be commented).
  - [ ] Is there documentation for how to use your code unit? (N/A for individual page components).

---

### 3. Performance

- **Efficiency**
  - [x] Are there any unnecessary operations or performance bottlenecks? (State updates are efficient. The large CSS blurs `blur-[150px]` in the background are visually heavy but handled well by modern browsers).
  - [x] Is the code optimized for larger datasets or high traffic (if applicable)? (Not applicable for these specific forms).

---

### 4. Overall Assessment

- **Strengths**
  - **Responsive UI Design:** The `ForgotPassword` page features complex responsive styling (using Tailwind classes like `xl:hidden` and specific pixel positioning) that matches the "Smart Budget" high-fidelity design.
  - **User Feedback:** Implemented immediate feedback using `alert()` for successful reset requests and password mismatch errors.
  - **State Management:** Clean use of React hooks (`useState`, `useNavigate`) to manage form data and routing.
- **Areas for Improvement**
  - **Component Consistency:** I used the custom `Input` component in `ForgotPassword.jsx` but reverted to standard HTML `<input>` tags in `ResetPassword.jsx`. I should use the custom component everywhere for UI consistency.
  - **Backend Integration:** Currently, the forms only log to the console. The actual API connection (axios/fetch) needs to replace the `console.log` and `alert` placeholders.
  - **Hardcoded Styling:** Some CSS values (e.g., `left-[-149px]`, `w-[794px]`) are very specific/rigid. Moving these to relative percentages might make the layout more robust across different screen sizes.
- **Action Plan**
  - Refactor `ResetPassword.jsx` to use the shared `Input` component.
  - Collaborate with the backend developer (Swostika) to replace the `console.log` statements with the actual API endpoints for password recovery.
  - Add password strength validation (e.g., minimum 8 characters) before allowing the form to submit.

---

### 5. Additional Notes

- During the sprint, I focused heavily on the visual alignment with the prototype (the "Smart Budget" branding).
- As noted in the "Lacked" section of our retrospective, we had limited time for thorough testing. Moving forward, I will add unit tests to ensure the password matching logic is robust.
