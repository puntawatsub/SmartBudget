# Self-Assessment

- **Member name:** Jiya Jameela
- **Contribution area:** UI Design (Transaction/Landing pages) & Frontend Implementation (Login Page logic and UI).

---

### 1. Functionality

- **Does the code meet the requirements?**
  - [x] **Yes.** The code successfully captures user input, sends a POST request to the backend, handles tokens, and navigates users to the dashboard.
  - [x] **Edge Cases:** Basic edge cases are handled (e.g., checking for 404 "User does not exist" vs. generic errors).
  - [x] **Bugs/Behaviors:** One minor UX behavior to note: The `alert()` popup for non-existent users stops the UI flow, and the form clears even if the login fails (forcing the user to retype everything).
- **Integration**
  - [x] **Yes.** The component successfully communicates with the backend API (`/api/login`) and integrates with the React Router (`useNavigate`).
  - [x] **Inputs/Outputs:** Inputs are managed via React state (`formData`) and outputs (auth token) are stored in `localStorage`.

---

### 2. Code Quality

- **Readability**
  - [x] **Yes.** The code structure is standard and clean. `handleChange` and `handleSubmit` are easy to follow.
  - [x] **Naming:** Variable names like `formData`, `loading`, and `error` are standard and intuitive.
- **Reusability**
  - [x] **Yes.** I utilized a reusable `Input` component (`../../components/Input`) rather than hardcoding input fields, which keeps the code DRY (Don't Repeat Yourself).
  - [x] **Modularity:** The styling is heavy (Tailwind classes), but the logic is contained within the component effectively.
- **Comments and Documentation**
  - [x] **Partial.** The code is mostly self-documenting, but I added comments to explain the token storage and navigation logic (`// save token`, `// redirect`).

---

### 3. Performance

- **Efficiency**
  - [x] **Yes.** State updates are minimized. I used the `loading` state to track the API call status.
  - [x] **Optimization:** The code uses `react-router-dom` for client-side routing, which prevents full page reloads, keeping the app fast.

---

### 4. Overall Assessment

- **Strengths**
  - **Responsive UI Implementation:** Successfully translated the complex "Smart Budget" gradient and blur design into Tailwind CSS, ensuring it looks good on both large screens and hides gracefully on smaller screens.
  - **API Integration:** Successfully connected the frontend form to the backend endpoint, handling the `POST` request and JSON parsing correctly.
  - **State Management:** Clean use of `useState` to handle form data and UI states (loading/error) simultaneously.
- **Areas for Improvement**
  - **Hardcoded URLs:** The API URL (`http://localhost:3000`) is hardcoded. This will break if we deploy the app online.
  - **Error Handling UX:** Currently using `alert()` for user-not-found errors. This is intrusive; it would be better to display this as text (like the other `error` state).
  - **Form UX:** The `finally` block clears the password and email even if the login fails. It is better to keep the email so the user doesn't have to retype it if they just made a password typo.
- **Action Plan**
  1. **Environment Variables:** Replace `localhost:3000` with `process.env.REACT_APP_API_URL` to make the app deployable.
  2. **Refactor Alert:** Remove `alert("User does not exist...")` and set the `error` state message instead so it renders in the UI.
  3. **Fix Form Clearing:** Move `setFormData` out of the `finally` block or only clear the password field on error.

---

### 5. Additional Notes

- During the retrospective, we noted a lack of time for thorough testing. While the "Happy Path" (successful login) works well, I need to spend more time testing invalid inputs to ensure the UI doesn't break.
- I am proud that I was able to match the complex gradient design requested by the design prototypes.
