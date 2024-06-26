# README.md

## Project Title: User-Friendly Collaborative Grading Tool

### Description
This project develops a web-based tool designed for educators and graders, facilitating collaborative grading tasks. It enables multiple graders to assign grades and feedback simultaneously, catering to both group and individual assessment types. Emphasizing user-friendliness, it features an intuitive interface for ease of use.

Features to be implemented:

- Create grading sheets and sections.
- Provide separate grading criteria visible only to graders.
- Specify criteria for groups, individuals, or both.
- Include detailed descriptions for graders.
- Assign point values and adjust manually.
- Flag non-contributing students.
- Support True/False grading options.
- Import/export Excel or CSV files.
- Additional features as needed.
- Standalone or web-based tool (not hosted on a server).

## Getting Started
### Deploying the Web App

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Deploy the app
   ```bash
   npm start
   ```
4. Check the local port on which the web app is running in your browser and login using ASU Email ID

5. Two options are available (Creating a new grading sheet and opening an existing one)

6. In the /utils folder of the source code, example files for Criteria upload ```Criteria.csv``` in the first step of creating a new sheet and an example file for uploading Student details ```Students.csv``` has been provided. 
 
7. After grading is done, choice is available to save the grading criteria and also to export the grading sheet as a CSV file.

### Setting Up the MongoDB(Using HomeBrew)
1. Tap the MongoDB formulae
  ```bash
   brew tap mongodb/brew
   ```
2. Install MongoDB
  ```bash
   brew install mongodb/brew/mongodb-community
   ```
3. Start the Server
  ```bash
   brew services start mongodb/brew/mongodb-community
   ```
4. Stop the Server
  ```bash
   brew services stop mongodb/brew/mongodb-community
   ```

### Setting Up the Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```

#### Testing with Postman

- **Create a Grading Sheet:**

  - **POST Request URL:** `http://localhost:5001/api/grading-sheets/create`
  - **Body JSON Example:**
    ```json
    {
      "title": "Midterm Grading",
      "ASUriteId": "123",
      "StudentName": "XYZ"
    }
    ```
  - **Note:** Capture the `id` from the response body for further requests.

- **Update Grading Criteria:**

  - **POST Request URL:** `http://localhost:5001/api/grading-sheets/update-criteria`
  - **Body JSON Example:**
    ```json
    {
      "id": "<REPLACE_WITH_FETCHED_ID>",
      "gradingCriteria": [
        {
          "criteriaName": "Participation",
          "points": 10,
          "type": "individual"
        },
        {
          "criteriaName": "Project Presentation",
          "points": 30,
          "type": "group"
        },
        {
          "criteriaName": "Final Report",
          "points": 60,
          "type": "group"
        }
      ]
    }
    ```
