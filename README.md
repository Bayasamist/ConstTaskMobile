# Assessment 3 Mobile Application

## Project Overview

This project is a React Native and Expo mobile application developed for IFN666 Assessment 3.

The app is a mobile client for my Assessment 2 construction management web application and REST API. It allows users to manage construction-related data from a mobile device, including tasks, employees, worksites, and employee profile images.

The mobile app connects to the same backend API and MongoDB database used in my Assessment 2 web application.

## Technologies Used

* React Native
* Expo
* JavaScript
* npm
* VS Code
* React Navigation
* Expo Image Picker
* Date picker
* REST API
* MongoDB backend from Assessment 2

## Main Features

* User login using the Assessment 2 API
* Bottom tab navigation
* Task management

  * View tasks
  * Create tasks
  * Edit tasks
  * Delete tasks
  * Assign tasks to employees
  * Assign tasks to worksites
  * Select task priority
  * Select task due date
* Employee management

  * View employees
  * Create employees
  * Edit employees
  * Delete employees
  * Select employee position
  * Update employee profile image
  * Take employee photo using the device camera
* Worksite management

  * View worksites
  * Create worksites
  * Edit worksites
  * Delete worksites
* Settings screen

  * Logged-in user display
  * Large text accessibility option
  * Logout
* Error handling for failed API requests
* Delete confirmation alerts

## Additional Tasks Attempted

### Camera

The app uses the device camera to take employee profile photos. The image can be uploaded through the backend API and displayed in the mobile app.

Relevant files:

* `screens/EditEmployeeScreen.js`
* `components/Employee.js`
* `services/api.js`

### Gestures

The app uses tap gestures on task, employee, and worksite cards. Tapping a card opens the related edit screen.

Relevant files:

* `components/Task.js`
* `components/Employee.js`
* `components/Worksite.js`
* `screens/TasksScreen.js`
* `screens/EmployeesScreen.js`
* `screens/WorksitesScreen.js`

## Project Structure

```txt
assessment3/
- App.js
- index.js
- app.json
- package.json
- README.md
- components/
  - Layout.js
  - Task.js
  - Employee.js
  - Worksite.js
- screens/
  - TasksScreen.js
  - CreateTaskScreen.js
  - EditTaskScreen.js
  - EmployeesScreen.js
  - CreateEmployeeScreen.js
  - EditEmployeeScreen.js
  - WorksitesScreen.js
  - CreateWorksiteScreen.js
  - EditWorksiteScreen.js
  - SettingsScreen.js
- services/
  - api.js
- styles/
  - global.js
```

## API Integration

All API request logic is stored in:

```txt
services/api.js
```

This file contains functions for:

* Login
* Fetching tasks, employees, and worksites
* Creating new records
* Updating records
* Deleting records
* Uploading employee images
* Handling API errors
* Handling authentication headers

The React Native screens call these service functions instead of writing `fetch` requests directly inside UI components. This keeps the application cleaner and separates presentation logic from API logic.

The mobile app connects to my Assessment 2 backend API using the deployed server address.

## Backend API

The app connects to the Assessment 2 API:

```txt
https://banksia04.ifn666.com/assessment02/api
```

The backend provides REST API endpoints for:

* Authentication
* Tasks
* Employees
* Worksites
* Image upload

## Installation

Install dependencies:

```bash
npm install
```

If required, install Expo packages:

```bash
npx expo install expo-image-picker
npx expo install @react-native-community/datetimepicker
npx expo install @react-native-picker/picker
```

## Running the Application

Start the Expo development server:

```bash
npx expo start
```

Then run the app using:

* Expo Go on a physical device, or
* an iOS/Android emulator

## Development Workflow

The app was developed using VS Code, npm, React Native, and Expo.

The main workflow was:

```txt
1. Edit source code in VS Code
2. Install dependencies using npm or npx expo install
3. Start the app using npx expo start
4. Test on Expo Go or emulator
5. Debug using terminal logs and Expo developer tools
```

## User Interface Design

The app is designed for a small portrait mobile screen.

It includes:

* Bottom tab navigation
* Safe area layout
* Card-based lists
* Create and edit forms
* Dropdown inputs
* Date picker
* Camera and image preview
* Clear error and success messages
* Delete confirmation alerts

The app uses a global layout component to keep the layout consistent across screens.

## Error Handling

The app handles failed API requests using try/catch and displays error messages instead of crashing.

The API service layer includes:

* Response status checking
* Timeout handling
* Error messages from the backend
* Console logs for debugging

## Notes

This mobile app complements my Assessment 2 web app. The web app is designed for desktop use, while this mobile app is designed for field use on a mobile device.

Both apps use the same backend API and MongoDB database, but they target different computing platforms.

## Assessment 3 Criteria Covered

* React Native and Expo development workflow
* Core mobile app functionality
* Mobile user interface design
* REST API integration through a services layer
* Camera additional task
* Gesture additional task
