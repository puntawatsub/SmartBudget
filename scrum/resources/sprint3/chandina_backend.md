**Self-Assessment - backend**

Member name: Chandina Nilukshi  
Contribution area: Backend development — implemented REST API routes for the Goals feature using Node.js, Express, and MongoDB with user-based data handling.

**1. Functionality**

Does the code meet the requirements?

[✓] Implemented all required CRUD operations (create, read, update, delete) for goals.

[✓] Goals are correctly linked to authenticated users using userId.

[ ] Advanced validation (e.g., negative values, duplicate goals) is not fully implemented.

Integration

[✓] Backend routes work correctly with frontend API calls (POST, GET, PUT, DELETE).

[✓] Data is stored and retrieved correctly from MongoDB.

[✓] JSON responses are returned consistently to the frontend.

**2. Code Quality**

Readability

[✓] Routes are clearly structured and easy to understand.

[✓] Meaningful route naming and proper use of HTTP methods.

Reusability

[✓] Logic is cleanly separated between routes and models.

[ ] Middleware and validation logic could be extracted for reuse.

Comments and Documentation

[ ] Minimal comments are included.

[ ] No separate API documentation file is provided.

**3. Performance**

Efficiency

[✓] Database queries are efficient for current data size.

[ ] No pagination or indexing is implemented for large datasets.

**4. Overall Assessment**

Strengths

- Secure user-based access control using userId.

- Clean and functional REST API design.

- Correct use of async/await and MongoDB queries.

- Easy to extend for future features.

Areas for Improvement

- Add backend validation using Mongoose schema rules.

- Improve error handling with clearer status codes and messages.

- Add unit tests for API routes.

Action Plan

- Implement input validation and schema constraints.

- Add centralized error handling middleware.

- Write basic backend tests.

**5. Additional Notes**

- Backend integrates smoothly with the frontend Goals page.

- The current structure supports scalability and future enhancements.

- This work improved understanding of REST APIs, MongoDB operations, and secure user data handling.
