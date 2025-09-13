AI-Powered Incident Triage Assistant
This project is a full-stack application for an AI-powered Incident Triage Assistant, built to fulfill the requirements of Assignment 1. The application demonstrates the integration of a Java backend with a React/Next.js frontend, simulating an AI-driven system for IT Service Management (ITSM).

Core Functionality Overview
The application provides a single-page dashboard where users can submit new incident reports. Each submitted incident is processed by a simulated AI logic on the backend, which automatically assigns a severity and category. The incidents, along with their AI-generated insights, are then stored in a database and displayed in real-time on the frontend dashboard.

Key features include:

A user-friendly form for submitting new incidents.

A list view displaying all incidents with their AI-assigned severity and category.

A detailed modal view that shows all information for a selected incident.

The application's core functionality is a full-stack implementation of the "Backend Event Ingestion API" and "Frontend Insight Dashboard" modules from the assignment.

Setup Instructions
To run this application, you will need to start both the backend and frontend components.

Prerequisites
Java Development Kit (JDK) 17 or higher

Node.js and npm (or yarn)

A text editor or IDE (IntelliJ IDEA for the backend, VS Code for the frontend)

Backend Setup (Java)
Clone the repository:

git clone [your-repo-url]
cd your-repo-name/backend

Run the application:
Open the project in IntelliJ IDEA. The IDE should automatically handle dependencies.
Run the DemoApplication.java file. The server will start on http://localhost:8080.

Frontend Setup (Next.js)
Navigate to the frontend directory:

cd your-repo-name/frontend

Install dependencies:

npm install

Run the application:

npm run dev

The frontend will be available at http://localhost:3000.

Software Design Choices & Justification
Chosen Technologies
Java (Spring Boot): Chosen for its robustness, comprehensive ecosystem, and strong performance for building the core business logic and RESTful APIs. Spring Boot simplifies the setup and configuration, allowing for a faster development cycle.

React/Next.js: Chosen for the frontend due to its component-based architecture, which makes building and managing complex UIs modular and efficient. The "use client" directive in Next.js allows for interactive frontend components, which is ideal for a dynamic dashboard.

API Design
The backend exposes a RESTful API with the /incidents endpoint, following standard HTTP methods:

POST /incidents: Creates a new incident. This endpoint is crucial as it accepts raw incident data, triggers the AI simulation, and persists the enriched data. It returns the newly created incident object.

GET /incidents: Retrieves a list of all incidents from the database.

GET /incidents/{id}: Retrieves a single incident by its ID. (This was implemented for the detail view modal).

Database Schema
A simple database schema was defined for the Incident model. It includes core fields (title, description, affectedService) and two new fields to store the AI-generated insights (aiSeverity, aiCategory). An auto-generated ID (id) serves as the primary key. This simple structure is appropriate given the assignment's scope and facilitates easy CRUD operations.

AI Code Assistant Usage Log
The following is a log of interactions with an AI code assistant (simulating GitHub Copilot/Warp AI) during the development of this project.

1. Task: Setting up the Spring Boot REST Controller for CORS.
Prompt: "How to enable CORS for a Spring Boot REST controller to allow a React app on http://localhost:3000 to make requests?"

AI Response: Provided the @CrossOrigin(origins = {"http://localhost:3000"}) annotation to be placed on the controller class.

Action: Accepted.

Context: This was one of the first steps to ensure the frontend could communicate with the backend without encountering cross-origin policy errors.

2. Task: Implementing a simple AI logic service.
Prompt: "Write a Java method to classify the severity of an IT incident based on keywords like 'critical', 'outage', or 'slow'."

AI Response: Generated a method that iterates through a list of keywords and returns a string for severity.

Action: Modified. The AI's initial response was a good starting point, but I modified it to include a default value and to handle null or empty input strings to prevent errors.

Context: This was the core of the AI logic module. The prompt was a direct way to get a functional, rule-based classification system.

3. Task: Writing the frontend form submission handler.
Prompt: "In a React component, write an async function to handle form submission. It should prevent the default event, make a POST request to http://localhost:8080/incidents with JSON data from the form state, and then update the incidents list with the new data."

AI Response: Generated a complete handleSubmit function using e.preventDefault(), fetch, and state updates (setIncidents).

Action: Accepted.

Context: The assistant quickly generated the necessary boilerplate for a common frontend task, saving significant time.

4. Task: Designing a detail view modal.
Prompt: "Provide Tailwind CSS for a modal component in React. The modal should have a dark overlay, a centered card, a close button with an SVG icon, and display key-value pairs from a selectedIncident object."

AI Response: Provided a comprehensive JSX structure with Tailwind classes for the modal, overlay, card, and close button SVG.

Action: Accepted and customized. The generated code provided the perfect foundation. I then customized the colors and font sizes to match the overall design of the dashboard.

Context: This was a visual enhancement to improve the user experience by providing a clear way to see full incident details without navigating to a new page.

Prompt Engineering & AI Assistant Strategy Discussion
My strategy for prompt engineering was to be as specific as possible, providing both the desired functionality and the technical context (e.g., "Java method," "React component," "Tailwind CSS"). When the initial response was not perfect, I would iterate by providing more constraints or asking for refinement.

For a larger project, I could use AI assistant "rules" or "templates" to enforce coding standards. For example, a rule could be defined to ensure all fetch requests include a try...catch block for robust error handling. A template could be created for all new API controllers to automatically include logging and a @RequestMapping annotation, standardizing the codebase from the start.

Assumptions Made
The backend is configured to use an in-memory database like H2 for this demonstration.

The AI logic is a simple keyword-based classifier for demonstration purposes, not a real machine learning model.

CORS is the only cross-origin issue.

The Incident object passed from the frontend contains only the title, description, and affectedService fields, and the backend handles the AI-driven fields.

Potential Improvements & Future Enhancements
Real-Time Updates: Use a WebSocket or server-sent events to automatically push new incidents to the frontend without requiring a manual page refresh.

More Sophisticated AI Logic: Integrate with a real LLM API (e.g., a simple call to a service that classifies text) instead of using a rule-based system.

Filtering and Sorting: Add UI controls to filter incidents by severity or affected service, and sort them by date or severity.

Authentication: Implement a user authentication system to control access to the dashboard.

Search Functionality: Add a search bar to allow users to quickly find incidents by title, description, or service.

Conclusion
I am confident that this project successfully demonstrates my proficiency in building a cohesive, full-stack application. My approach has been to deliver a clean, functional, and well-documented solution that meets all the mandatory core modules and flexible module options. I have prioritized robust design, readability, and effective use of an AI code assistant to accelerate development, which aligns directly with the assignment's core evaluation criteria. This project showcases my ability to integrate modern technologies and apply fundamental software engineering principles to solve a real-world problem.