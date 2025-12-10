# Self-Assessment

**Member name:** Swostika Lama 
**Contribution area:** Frontend Settings Page (React/Next.js), `useSetting` hook, integration with backend settings API (personal and app settings), component(sidebar), backend for goal page.

---

## 1. Functionality

**Does the code meet the requirements?**  
- Implemented all required features:  
  - Personal Information tab (Name, Email)  
  - App Settings tab (Theme, Language, Currency, Region)  
  - Save and Discard functionality  
- Edge cases handled partially:  
  - Backend validates email format  
  - Dropdowns enforce limited valid options  
  - Defaults applied if no settings exist  
- No significant bugs or unexpected behavior observed; theme switching works globally  

**Integration**  
- Frontend integrates correctly with backend using `useSetting` hook and fetch requests  
- Local storage caching ensures settings persist across reloads  
- Inputs and outputs are synchronized with local state and backend

---

## 2. Code Quality

**Readability**  
- Code is structured clearly with separate components for inputs, labels, and tabs  
- Function and variable names are descriptive (e.g., `handleSave`, `applySettings`)  

**Reusability**  
- `useSetting` hook is modular and reusable in other components  
- Tabs and input components are generic and reusable elsewhere  

**Comments and Documentation**  
- Important logic like theme application and local storage caching is documented  
- Some sections could benefit from more detailed comments (e.g., backend integration and error handling)  

---

## 3. Performance

**Efficiency**  
- No unnecessary operations  
- Fetching settings and applying them is efficient, avoiding redundant API calls  
- Theme switching directly manipulates `document.documentElement` for performance  

---

## 4. Overall Assessment

**Strengths**  
- Fully functional settings page with working tabs, inputs, and dropdowns  
- Good integration with backend APIs  
- Clean, readable, and maintainable code with reusable hooks and components  
- Theme persistence implemented effectively  

**Areas for Improvement**  
- Expand frontend validation for name and email fields before sending requests  
- Improve error handling (replace `alert` with toast notifications or inline messages)  
- Refactor localStorage caching logic to reduce redundancy  
- Add more descriptive comments explaining edge case handling and fetch logic  

**Action Plan**  
- Implement frontend validation for all input fields  
- Replace `alert` with user-friendly notifications  
- Refactor `useSetting` caching logic for efficiency  
- Add more detailed comments in `useSetting` and SettingsPage components  

---

## 5. Additional Notes
- Integration between frontend and backend is smooth and reliable  
- Component supports dark/light theme toggling  
- Settings Page is modular and maintainable, making it easier to extend with new settings
