# Note-Taking Application API

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Scheduled Tasks](#scheduled-tasks)
   - [Automatic Deletion of Old Trashed Notes](#automatic-deletion-of-old-trashed-notes)
4. [API Endpoints](#api-endpoints)
   - [Authentication Routes](#authentication-routes)
     - [Register User](#register-user)
     - [Login User](#login-user)
   - [Notes Routes](#notes-routes)
     - [Submit a Note](#submit-a-note)
     - [Get All Notes](#get-all-notes)
     - [Toggle Archive Status](#toggle-archive-status)
     - [Toggle Trash Status](#toggle-trash-status)
     - [Delete a Note](#delete-a-note)
     - [Search Notes](#search-notes)
     - [Get All Labels](#get-all-labels)
     - [Toggle Color](#toggle-color)
     - [Delete Label](#delete-label)
     - [Get Due Date Reminder Notes](#get-due-date-reminder-notes)


## Overview

This API provides endpoints for managing notes within a note-taking application. It allows users to create, retrieve, update, and delete notes, manage note attributes such as color and labels, and perform actions like archiving, trashing, and setting reminders.

## Getting Started

Follow these instructions to set up and run the API on your local machine.

### Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager)
- MongoDB instance with a `MONGODB_URI` set in a `.env` file

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ashishpatil3101/note-keeper-backend
    cd note-keeper-backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file:**

    Create a `.env` file in the root directory with the following content:
    ```
    MONGODB_URI=<your_mongodb_connection_string>
    PORT=<optional_port_number>
    ```

4. **Start the server:**

    ```bash
    npm start
    ```

   The server will start on `http://localhost:5000`. 


## Scheduled Tasks

### Automatic Deletion of Old Trashed Notes

## API Endpoints

### Authentication Routes

#### Register User

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
      "email": "example",
      "password": "password"
    }
    ```
- **Description**: Registers a new user with a email and password.

#### Login User

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
      "email": "example",
      "password": "password"
    }
    ```
- **Description**: Logs in a user with a email and password, returning an authentication token.


### Notes Routes

### all Note Apis require Bearer token in header

#### Submit a Note

- **URL**: `/api/notes`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
      "title": "Sample Note",
      "text": "This is a sample note content.",
      "color": "#ffffff",
      "tags": ["tag1", "tag2"],
      "labels": ["label1", "label2"],
      "reminderDate": "2024-06-29T12:00:00Z"
    }
    ```
- **Description**: Creates a new note with `title`, `text`, `color`, `tags`, `labels`, and `reminderDate`. Validates inputs and stores the note in the database.

#### Get All Notes

- **URL**: `/api/notes/:trashed/:archive/:label?`
- **Method**: `GET`
- **usage**: send true/false in place of trashed ,archive and add value in place of label
- **Description**: Retrieves all notes based on filters for `trashed=`, `archive`, and optional `label`.

#### Toggle Archive Status

- **URL**: `/api/notes/archive/:id`
- **Method**: `PUT`
- **Description**: Toggles the archive status of a note identified by `id`.

#### Toggle Trash Status

- **URL**: `/api/notes/toggle-trash/:id`
- **Method**: `POST`
- **Description**: Toggles the trash status of a note identified by `id`.

#### Delete a Note

- **URL**: `/api/notes/delete/:id`
- **Method**: `DELETE`
- **Description**: Deletes a note identified by `id`.

#### Search Notes

- **URL**: `/api/notes/search?query=<search_query>`
- **Method**: `GET`
- **Description**: Searches notes based on `title`, `text`, `tags`, and `labels` matching the `query` parameter.

#### Get All Labels

- **URL**: `/api/notes/labels`
- **Method**: `GET`
- **Description**: Retrieves all unique labels associated with the user's notes.

#### Toggle Color

- **URL**: `/api/notes/color/:id`
- **Method**: `PUT`
- **Request Body**:
    ```json
    {
      "color": "#ff0000"
    }
    ```
- **Description**: Toggles the background color of a note identified by `id`.

#### Delete Label

- **URL**: `/api/notes/labels/:labelId`
- **Method**: `DELETE`
- **Description**: Deletes a label identified by `labelId` from all notes associated with the user.

#### Get Due Date Reminder Notes

- **URL**: `/api/notes/reminders`
- **Method**: `GET`
- **Description**: Retrieves notes with reminders set, ordered by reminder date.


---

This API allows users to manage their notes efficiently with various functionalities tailored for organizing and maintaining notes effectively.
