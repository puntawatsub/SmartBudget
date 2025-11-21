# Self-Assessment

- **Member name:** Puntawat Subhamani
- **Contribution area:** Scrum Master duties, UI Design (Sign Up), and **Backend AI Integration** (AI Service, Controller, Routes, and Prompt Engineering).

---

### 1. Functionality

- **Does the code meet the requirements?**
  - [x] Does it implement all specified features you were responsible for? _Yes, the AI endpoint successfully accepts a transaction title and returns a categorized JSON response._
  - [x] Are edge cases handled (e.g., invalid data, duplicates)? _Yes, the controller specifically handles cases where the AI returns Markdown code blocks (```json) using Regex, and handles missing input titles._
  - [ ] Are there any bugs or unexpected behaviors? _The Gemini SDK implementation is currently commented out in favor of a raw `fetch` call, which works but indicates a workaround was needed._
- **Integration**
  - [x] Does your code work correctly with other parts of the application?
  - [x] Are inputs and outputs managed appropriately? _The API inputs (Transaction Title) and outputs (Normalized JSON) are strictly defined._

---

### 2. Code Quality

- **Readability**
  - [x] Is your code easy to understand for other developers?
  - [x] Are variable and function names descriptive and meaningful? _Names like `wastefulCategoryQuery` and `normalizeCategory` clearly describe their intent._
- **Reusability**
  - [x] Can your code or parts of it be reused elsewhere in the application? _The `model` wrapper in the config file is generic and can be used for other AI prompts, not just categories._
  - [x] Is logic modular and separated from unrelated concerns? _Excellent separation of concerns: The logic is split into **Config, Controllers, Services, Routes, and Utils** rather than being in one large file._
- **Comments and Documentation**
  - [x] Are there comments explaining complex logic? _Included comments explaining the `normalizeCategory` parsing logic and the Regex used to strip Markdown from the AI response._
  - [ ] Is there documentation for how to use your code unit?

---

### 3. Performance

- **Efficiency**
  - [x] Are there any unnecessary operations or performance bottlenecks?
  - [ ] Is the code optimized for larger datasets or high traffic (if applicable)? _The current implementation waits for the AI response (synchronous relative to the request). For high traffic, this might require a queue system later._

---

### 4. Overall Assessment

- **Strengths**
  - **Modular Architecture:** Successfully implemented an MVC (Model-View-Controller) pattern, separating the AI service logic, the data normalization utilities, and the API route handling.
  - **Robust Error Handling:** The code anticipates LLM inconsistencies (like returning Markdown fences) and includes a fallback parsing mechanism to ensure the frontend always receives valid JSON.
  - **Prompt Engineering:** Designed a strict prompt schema that enforces specific categories ("Luxury", "Fixed", etc.) to maintain database consistency.
- **Areas for Improvement**
  - **Code Cleanup:** The `config/gemini.js` file contains commented-out code (the official SDK method) mixed with the active `fetch` implementation. Dead code should be removed to avoid confusion.
  - **Dependency Management:** Currently manually using `fetch` rather than the `GoogleGenAI` instance initialized at the top of the file.
  - **Type Safety:** While `normalizeCategory` helps, using a validation library (like Zod or Joi) would be safer than manual `typeof` checks.
- **Action Plan**
  - Remove the commented-out SDK code in the config file to clean up the codebase.
  - Create a Unit Test for the `normalizeCategory` function to ensure it handles malformed JSON strings correctly without crashing.
  - Refine the AI System Instruction prompt to ensure it never returns conversational text, reducing the need for complex Regex parsing on the backend.

---

### 5. Additional Notes

- As **Scrum Master**, I balanced coding duties with managing the team's backlog and Trello board. This limited the time available for writing extensive automated tests for the backend.
- The switch from the Google Gemini SDK to a raw `fetch` call was a necessary pivot due to version compatibility issues encountered during development, but the functionality remains stable.
