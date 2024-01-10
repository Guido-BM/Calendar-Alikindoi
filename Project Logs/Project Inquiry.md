# Project Overview
## Programming Language

The project is developed using JavaScript (React), Python (Flask), and SQLite for the database.
## Project Goals

The primary objective is to create a sophisticated web calendar app addressing various user needs. Key features include Google Calendar integration, event tagging with moods and labels, graphical representations of time usage, an expenses manager tool connected to the Nordigen API, wallet management, and a piggybank tool for achieving user-defined goals.
## Challenges

No specific challenges were mentioned.
## Technology Stack

Technologies and frameworks used include React, Ant Design (ANTD), Todoist API, Nordigen API, JWT for authentication, Flask for the backend, and SQLite for the database. Additional technologies include appContext, file flux.js for managing global state, and normal routing with React Router.
## Scope

The scope encompasses the development of a feature-rich web calendar app that allows users to:
- Manage events with mood and label tagging.
- View graphical representations of time usage.
- Integrate seamlessly with Google Calendar.
- Utilize an expenses manager tool connected to the Nordigen API.
- Manage wallets and set up piggybank goals.
- Explore a weather widget, task previews, and forms for collecting and sending user information.
## Current State

The project is currently in the development phase. Implemented features include basic calendar functionality, event creation, tagging, and a preliminary expenses manager tool.
## Functionality

### Main Components
- **Calendar:** Core functionality for event management.
- **Tagging System:** Allows users to tag events with moods and labels.
- **Graphics:** Provides detailed graphical representations of time usage.
- **Expenses Manager:** Connects to the Nordigen API for importing bank account records and labeling expenses.
- **Wallet Management:** Enables users to manage their finances within the app.
- **Piggybank Tool:** Facilitates goal-setting and achievement.
- **Weather Widget:** Integrates a weather display for user convenience.
- **Task Previews:** Offers previews of upcoming tasks.
- **Forms:** Facilitates user information collection and communication with the backend.

## Usage

### Installation and Configuration
[Provide installation steps here if applicable.]
### Running the Project
[Outline steps for running the project.]
## Future Plans

Upcoming features and improvements include:
- Enhanced calendar functionality.
- Deeper integration with Google Calendar.
- Advanced graphical representations for detailed insights.
- Expanded capabilities in the expenses manager tool.
- Additional features based on user feedback and team discussions.

## Technical Overview
### Frontend (React.js)
#### Pages and Components
- Develop various pages, including Home, Login, Profile, etc.
- Create reusable React components for consistent UI.
#### User Authentication
- Implement user authentication functionalities (Login, Signup, Forgot Password) using JWT (JSON Web Tokens) for secure authentication.
#### State Management
- Use Flux architecture for state management.
- Utilize React Router for smooth navigation.
### Backend (Python - Flask, SQLite)
#### Custom API
- Develop a custom API using Flask to handle backend functionalities.
- Implement authentication for API endpoints.
#### Database Integration
- Utilize SQLite for data storage.
- Design and implement database schemas to support your application.
#### Third-Party API Integration
- Integrate Nordigen API for expenses management.
- Ensure that API integration is performed on the backend for security.
### Additional Features
#### Google Calendar Integration
- Implement integration with Google Calendar API for event management.
#### Graphical Representations
- Develop graphical representations of recorded time.
#### Expenses Manager
- Integrate Nordigen API for expenses tracking.
- Implement wallet management functionalities.
#### Piggybank Tool
- Implement a piggybank tool for user-defined goals.
## Methodology
### Project Team
- Assemble a project team with 2-3 members.
### Project Initiation
- Create wireframes and user stories.
- Add them to the repository issues and projects.
### User Stories
- Formulate comprehensive user stories with acceptance criteria.
### Project Management
- Use a Kanban board on GitHub Project Boards for effective project management and tracking.
## Technology Stack
- **Frontend:** React.js with Ant Design (ANTD).
- **Backend:** Flask with SQLite.
- **APIs:** Google Calendar API, Nordigen API.
- **State Management:** Flux architecture.
- **Authentication:** JWT.
- **Project Management:** GitHub Project Boards.
## Recommendations
- **Collaboration:** Utilize collaboration tools like Slack, Discord, or communication channels to facilitate team communication.
- **Version Control:** Use Git for version control, and make frequent commits to track changes.
- **Documentation:** Maintain thorough documentation for code, APIs, and project setup.
- **Testing:** Implement unit testing for both frontend and backend components.
- **Deployment:** Plan for deployment strategies, considering platforms like Heroku, AWS, or others.















## ARREGLOS
## 1. Scope and Functionality:

- [DB+] Are there any specific user roles and permissions to be implemented in the app (e.g., admin, regular user)?
  - We will have standard user and premium user, with the purpose of having some kind of symbolic distinction, maybe some of the routes will be private, such as the expenses manager.
- [DB+] How should the app handle recurring events in the calendar?
  - The references for the recurring events will be given by weekdays, so I as an user will be able to record for this month, or nex two months, and so, every Tacos Tuesday at 8pm, we don't have a more specifications about this, but we will use Todoist API, with the integrations provided by the API
- [DB+] What specific graphical representations of time usage are required (e.g., pie charts, bar graphs)?
  - We will use a custom graph from an external library like this one https://observablehq.com/@d3/bubble-chart/2?intent=fork
  - But we will use some more simple graphs like line graphs, or at least not as complex as the moods one.
- [DB+] How should the application handle different time zones for users?
  - We'll be using "DateTime.Now" and "DateTime.UtcNow", or that's the first idea, we are looking for more info about "Ant Design" integration with "dayjs"
## 3. Integration and APIs:
- [DB+] What specific features should be integrated with Google Calendar (e.g., sync events, import/export)?
  - It should be able to import and export events, and synchronize events from Google Calendar through the Google CalendarAPI or TodoistAPI.
- Are there any other third-party services or APIs (besides Nordigen) that the app should integrate with?
  - The weather widget goes with OpenWeatherMap.
  - Todoist API and/or Google Calendar API.

## 4. User Interface and Experience:
- Are there any specific UI/UX design guidelines or wireframes available for the application?
  - We have some previews without a lot of detail in Figma at "https://www.figma.com/team_invite/redeem/tIVUJaqD3Yc39qtG7STkKb"
- How should the event tagging feature interact with the user interface?
  - The event tagging feature, will be available at the creation of the event.
## 5. Data Management and Storage:
- [DB+] What specific data should be stored in the SQLite database, and are there any schema requirements?
- [DB+] How should the app handle data backup and restoration?
## 6. Security and Privacy:
- What security measures are required for user data, especially financial information?
  - Since we will be working with Nordigen, but we do not intend to storage any kind of sensitive information, the desired use of the Nordigen API will be only to render the expenses when called, the user selects which expenses wants to bring to the manager and tag as needed, but no sensitive data from there will be storaged by us.
- Are there any specific compliance standards (e.g., GDPR) that the app needs to adhere to?
  - We do not have any kind of GDPR guidance or requirements, because so far we don't have plans to make a comercial launch.
## 7. Performance and Scalability:
- Are there any specific performance requirements or expected loads the application should support?
  - Not any specific requirements.
- Should the architecture be scalable to accommodate future enhancements?
  - The architecture should be similar to the template, but not necessarily the same, for example the Context is used in the file flux.js and appContext.js but doesn't need to be used that way. Redux is another of the ways we could do it and would like to know your recomendation.
## 8. Testing and Deployment:
- What are the requirements for testing the application (e.g., unit tests, integration tests)?
  - Unit test using Jest will be used.
- Are there specific deployment strategies or environments in mind (e.g., cloud, on-premises)?
  - The app should be deployed in Render.com
## 9. Documentation and Support:
- Is comprehensive documentation required for the code and user manuals?
  - Is not required, but we would like to add some explanations for the users, some help modals, or some user manual made with Scribe.
- What level of post-deployment support and maintenance is expected?
  - Post-deployment support is not needed, anyway, if we don't achieve some of the goals we have set, we'll keep working after deployment to get them done, like the payment gateway, since we consider it something important that will give high value to to CV/Portfolio
## 10. Miscellaneous:
- Are there any specific libraries or frameworks (besides React, Flask, SQLite) that should or should not be used?
  - We have components from Ant Design, we'll like to continue with it. For styles we're currently using SCSS, since we found it recommended for styling Ant Design components. We are widely open to any suggestion in any of the matters we been discusing above, and beside some of the basic requirements from the template, we have no other requirements about frameworks or libraries.
