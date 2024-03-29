# README.md

## Project Title: User-Friendly Collaborative Grading Tool

### Description
This project develops a web-based tool designed for educators and graders, facilitating collaborative grading tasks. It enables multiple graders to assign grades and feedback simultaneously, catering to both group and individual assessment types. Emphasizing user-friendliness, it features an intuitive interface for ease of use.

### Getting Started

#### Setting Up the Server

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
          "criteriaType": "individual"
        },
        {
          "criteriaName": "Project Presentation",
          "points": 30,
          "criteriaType": "group"
        },
        {
          "criteriaName": "Final Report",
          "points": 60,
          "criteriaType": "group"
        }
      ]
    }
    ```
