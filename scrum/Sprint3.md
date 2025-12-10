# Smart Budget

**Project Title:** SmartBudget – AI-Powered Financial Tracker  
**Sprint Duration:** Sprint 3 (Deadline: 2025-12-10)  
**Team Members:**

- Chandina Nilukshi
- Jiya Jameela
- Puntawat Subhamani
- Swostika Lama

### Presentation slide

<!-- Slide here -->

## Contents

1.  [Front-end code](#1-front-end-code)
2.  [Back-end code](#2-back-end-code)
3.  [Sprint Ceremony Insights](#3-sprint-ceremonies-insights)
4.  [Tools and Technologies Used](#4-tools-technologies--collaboration)
5.  [Team Contributions](#5-team-contributions)
6.  [Presentation](#6-presentation)
7.  [Back-end code self assessment](#7-back-end-code-self-assessment)
8.  [Front-end code self assessment](#8-front-end-code-self-assessment)

---

# 1. Front-end code

- **[(Github Link to frontend Code)](https://github.com/puntawatsub/SmartBudget/tree/main/front-end)**
- Implemented **Dashboard Layout** with sidebar navigation and overview cards.
- Built **Transactions Page** with form input and transaction list.
- Built **Goals Page** with goal creation and progress tracking.
- Enhanced **Reset Password Page** and improved UI consistency.
- Applied **responsive design** and accessibility features (labels, alt text, ARIA).
- Integrated **JWT authentication** into front-end flows.

---

# 2. Back-end code

- **[(Github Link to backend code)](https://github.com/puntawatsub/SmartBudget/tree/main/back-end)**
- Expanded **MongoDB Atlas schema** to include transactions, categories, and savings goals.
- Created **CRUD endpoints** for transactions and goals.
- Improved **authentication middleware** with JWT and bcrypt.
- Added **error handling and validation** for secure API calls.
- Conducted **integration testing** using Postman and Jest/Supertest.
- Deployed backend to **Render** for cloud hosting.
<!-- - (Bonus) Drafted API documentation for endpoints. -->

---

# 3. Sprint Ceremonies Insights

## Daily Scrum (Stand-Up Meetings)

- Our team met on Zoom every two days and on campus every Friday.
- Updates included dashboard progress, transactions and goals integration, and backlog tracking in Trello.
- Blockers (JWT setup, CORS issues) were resolved quickly through pair programming and scrums.

## Sprint Planning

**Purpose:**  
To define what features and deliverables we’ll complete during Sprint 3 and how we’ll divide responsibilities.

**Scope:**

- Create the **Dashboard with Transactions and Goals**
- Create the Goals page and transactions pages.
- Create Reset pages using resend and nomemailer integration.
- Create AI integration for the user experince(suggestions)
- Expand the **API Endpoints for transactions and goals**
- Connect **front-end forms to backend APIs**
- Update the **Product Backlog** in Trello
- Write the **Scrum Ceremony Insights**

**Approach:**  
We reviewed user stories, estimated effort (story points), and prioritized them using the DEEP and INVEST principles.  
Tasks were distributed as per member expertise using Trello.

## Sprint Retrospective

**Purpose:**  
To reflect on what went well, what didn’t, and what can be improved for the next sprint.

**Outcome:**

- **Liked:**

  - Dashboard implementation connected successfully to backend.
  - Improved collaboration and communication compared to Sprint 2.
  - Testing coverage increased with Jest.

- **Learned:**

  - JWT integration across front-end and backend.
  - Secure password hashing with bcrypt.
  - Protected routes across the endpoints (authorization is required except authentication-related endpoints)
  <!-- Accessibility practices in React components. -->

- **Lacked:**
  <!-- Role-based access control not yet implemented.   -->
  <!-- Some delays in deployment testing. -->

  - Limited time for advanced analytics features.
  - Proper time management.

- **Longed For:**
  - More time for UI polish and error handling.
  - Additional feature that could take pictures and update to transactions without need of typing manually (OCR).
  - Additional mid-sprint reviews for faster feedback.

---

# 4. Tools, Technologies, & Collaboration

| Tools Used             | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| **Visual Studio Code** | IDE for both front-end and back-end development |
| **Trello**             | Product backlog, sprint task tracking           |
| **Figma**              | Prototype updates and UI design                 |
| **Mermaid**            | System architecture diagrams                    |
| **Zoom & WhatsApp**    | Daily scrums and communication                  |
| **GitHub**             | Central repository for code and documentation   |
| **Postman**            | API testing and endpoint validation             |

---

# 5. Team Contributions (Sprint 3)

| Member                 | Role                                 | Key Contributions                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Swostika Lama**      | Product Owner / Full-Stack Developer | Designed and implemented the **Settings page**, expanded backend schema for transactions and goals, developed secure JWT authentication flows, and conducted integration testing to ensure smooth connection between front-end and back-end. Developed **Setting page**, created sidebar component, wrote test for **Category** and **Reset password** endpoints, and wrote the sprint 3 summary. |
| **Puntawat Subhamani** | Scrum Master / Full-Stack Developer  | Developed the **Transactions page** and **AI Spending Analysis** frontend and backend. Fixed a bug in Settings page for settings persistence, integrate Resend with Nodemailer, and wrote testings for **Upcoming bills** endpoints.                                                                                                                                                              |
| **Chandina Nilukshi**  | UI Designer / Full-Stack Developer   | Designed and implemented the **Goals page**, wrote tests for **Dashboard** and **Transactions** endpoints, and prepared documentation and presentation slides for Sprint 3.                                                                                                                                                                                                                       |
| **Jiya Jameela**       | UI Designer / Full-Stack Developer   | Built the **Dashboard page** styled components for responsiveness and accessibility, and developed the **Reset Password** page frontend and backend using Nodemailer for sending reset password emails, and wrote testings for **User Authentication** endpoints and **Goals** endpoints.                                                                                                         |

---

# 6. Presentation

**[sprint3_presentation.pdf](./resources/sprint3_presentation.pdf)**

---

# 7. Back-end code self-assessment

[Swostika](./resources/sprint3/swostika_selfassessment.md)
[Puntawat](./resources/sprint3/puntawat_backend.md)
[Jiya](./resources/sprint3/jiya_backend.md)
[Chandina](./resources/sprint3/chandina_backend.md)

---

# 8. Front-end code self-assessment

[Chandina](./resources/sprint3/chandina_frontend.md)
[Jiya](./resources/sprint3/jiya_frontend.md)
[Puntawat](./resources/sprint3/puntawat_frontend.md)
[Swostika](./resources/sprint3/swostika_selfassessment.md)
