# BookNotes

A simple web application to track the books you've read along with personal notes and ratings.

## Overview

BookNotes lets you create a personal library of books you've read, including information like:
- Title
- ISBN (used to fetch cover images)
- Date read
- Personal rating
- Description/summary
- Your own notes and thoughts

## Features

- Add, edit, and delete books from your collection
- Add, edit, and delete notes for each book
- View book covers automatically using Open Library Covers API 
- Dark mode UI for comfortable reading
- Responsive design that works on both desktop and mobile

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, EJS templates
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL

## Setup

### Requirements

- Node.js (v18 or higher)
- PostgreSQL database

### Database Setup

1. Create a PostgreSQL database named "booknotes"
2. Create the required tables using the following SQL:

```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    isbn BIGINT,
    date_read DATE,
    rating_out_of_ten INTEGER,
    description TEXT
);

CREATE TABLE notes (
    id INTEGER REFERENCES books(id),
    note TEXT,
    note_id SERIAL PRIMARY KEY
);
```

### Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Update the database connection settings in `index.js` to match your PostgreSQL configuration:
   ```javascript
   const db = new pg.Client({
     user: "YOUR_USERNAME",
     host: "localhost",
     database: "booknotes",
     password: "YOUR_PASSWORD",
     port: 5432,
   });
   ```
4. Start the server:
   ```
   node index.js
   ```
5. Open your browser and navigate to `http://localhost:3000`

## Usage

### Adding a Book
1. Click the "+ Add Book" button in the header
2. Fill in the details (title, ISBN, date read, rating, description)
3. Click "Add"

### Viewing Book Notes
1. Click on any book title to view its notes page

### Adding Notes
1. On a book's page, click the "+ Add Note" button
2. Enter your note
3. Click "Add"

### Editing/Deleting
- Each book and note has edit and delete options

## Credits

- Book covers provided by [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers)
