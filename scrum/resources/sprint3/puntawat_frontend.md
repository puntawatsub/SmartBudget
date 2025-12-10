# Self-Assessment

- **Member name:** _Puntawat Subhamani_
- **Contribution area:** Frontend Development (Transaction Management Dashboard, Data Visualization, Custom Hooks, and API Integration).

---

### 1. Functionality

- **Does the code meet the requirements?**
  - [x] Does it implement all specified features you were responsible for?
    > **Explanation:** The `Transaction.jsx` page successfully aggregates transaction data, displays it in a table with pagination, and visualizes it using `PieChart`. It also integrates AI suggestions and allows for adding/deleting transactions and exporting CSVs.
  - [x] Are edge cases handled (e.g., invalid data, duplicates)?
    > **Explanation:** The `AddCategoryPopover` prevents the user from adding restricted names like "Income". `NewTransactionDialog` uses regex to ensure only valid currency formats are entered.
  - [x] Are there any bugs or unexpected behaviors?
    > **Explanation:**
    > In `Transaction.jsx`, `window.location.reload()` is used to refresh data after adding or deleting transactions. This is not ideal for a Single Page Application (SPA) as it resets the application state.
- **Integration**
  - [x] Does your code work correctly with other parts of the application?
    > **Explanation:** The components successfully retrieve authentication tokens from `sessionStorage` and communicate with the backend API endpoints (`/api/transactions`, `/api/llm/...`).
  - [x] Are inputs and outputs managed appropriately?
    > **Explanation:** Controlled inputs are used effectively in `NewTransactionDialog`. Data fetching states (loading, error) are generally handled, though specific error messages in `useAISuggestion` could be more robust.

---

### 2. Code Quality

- **Readability**
  - [x] Is your code easy to understand for other developers?
    > **Explanation:** The code follows a logical structure. Sub-components like `NewTransactionDialog` and `AddCategoryPopover` are extracted to keep the main file cleaner. Variable names (`transactions`, `newTransactionName`) are descriptive.
  - [x] Are variable and function names descriptive and meaningful?
    > **Explanation:** Yes, naming conventions are consistent. `handleDeleteTransaction` and `fetchData` clearly describe their purpose.
- **Reusability**
  - [x] Can your code or parts of it be reused elsewhere in the application?
    > **Explanation:** `AddCategoryPopover` and `useAISuggestion` are designed to be reusable. `useStepper` is designed to be generic, though it needs bug fixes before it can be used effectively.
  - [x] Is logic modular and separated from unrelated concerns?
    > **Explanation:** UI components (Dialogs, Popovers) are separated from the main page logic. API logic for specific features (like AI suggestions) is extracted into custom hooks.
- **Comments and Documentation**
  - [ ] Are there comments explaining complex logic?
    > **Explanation:** The code is largely self-documenting, but there are very few comments. Complex sections, such as the `useEffect` dependencies or the specific regex used for amount validation (`/^\d*\.?\d{0,2}$/`), would benefit from comments.
  - [ ] Is there documentation for how to use your code unit?
    > **Explanation:** No external documentation or PropType definitions were included in this review.

---

### 3. Performance

- **Efficiency**
  - [ ] Are there any unnecessary operations or performance bottlenecks?
    > **Explanation:**
    >
    > 1. In `Transaction.jsx`, `transactions.sort(...)` is called directly inside the render return. This forces the array to resort on every single re-render. This should be memoized using `useMemo`.
    > 2. `window.location.reload()` forces a full browser refresh, which is inefficient compared to updating the React state locally.
  - [ ] Is the code optimized for larger datasets or high traffic (if applicable)?
    > **Explanation:** Pagination (`ReactPaginate`) is implemented, which is good for UI performance. However, since the frontend receives _all_ transactions and sorts/slices them client-side, this will become slow if the user has thousands of transactions. Server-side pagination would be better for high traffic.

---

### 4. Overall Assessment

- **Strengths**
  - **Component Composition:** Successfully utilized `shadcn/ui` and `lucide-react` to create a polished UI.
  - **Feature Completeness:** Handles complex flows like CSV export, Charting, and AI integration within a single dashboard.
  - **Separation of Concerns:** Good extraction of the "Add Transaction" and "Add Category" logic into their own files.
- **Areas for Improvement**
  - **State Management:** Avoid using `window.location.reload()`. Instead, update the local state array (`setTransactions`) upon successful API responses to maintain a smooth SPA experience.
  - **Optimization:** Memoize the sorted transaction list to prevent unnecessary calculations on every render.
  - **Code Cleanup:** The `useStepper.jsx` hook is currently unused and logically flawed; it should be fixed or removed.
- **Action Plan**
  1. **Refactor Updates:** Update `addTransaction` and `handleDeleteTransaction` to modify the `transactions` state directly (using `prev` state) instead of reloading the page.
  2. **Optimize Render:** Wrap the sorting logic in `Transaction.jsx` with `useMemo`.
  3. **Fix Hook:** Debug `useStepper.jsx` to use `useState` for the step value, or delete it if `ReactPaginate` is the preferred solution.
  4. **Refactor AI Hook:** In `useAISuggestion.js`, remove the redundant function definition inside the `useEffect` vs the one declared outside it.

---

### 5. Additional Notes

- The chart colors in `Transaction.jsx` are currently hardcoded or randomized within the component. Moving these to a constant configuration object would ensure consistency across the application.
