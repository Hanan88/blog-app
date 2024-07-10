# Blog App

This is a Next.js application for managing blogs. The application supports creating, updating, deleting, and viewing blog posts. It also includes pagination for browsing through multiple pages of blog posts.

## Features

- View list of blog posts
- Create a new blog post
- Edit an existing blog post
- Delete a blog post
- View details of a specific blog post

## Technologies Used

- Next.js
- React
- TypeScript
- TailwindCSS
- React Query
- JSON Server

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js (v14 or higher)
- npm (v6 or higher)

NOTE: if you want to upload image, it should be link from 'https://www.pexels.com/'

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hanan88/blog-app
   cd blog-app
   ```
2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Configure the JSON Server:**

   The JSON Server is used to simulate a backend API. The data is stored in public/db.json.
   To start the JSON Server, run the following command:

   ```bash
   npx json-server --watch public/db.json --port 3001
   ```

4. **Run the Next.js development server:**

   ```bash
    npm run dev
   ```

5. **Open your browser and navigate to:**

   ```bash
    http://localhost:3000
   ```
