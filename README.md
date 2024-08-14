Blood Donation Server

Overview

This repository provides the backend API for a blood donation application. It leverages Node.js, Express, TypeScript for type safety, PostgreSQL as the database, and Prisma for efficient data modeling and interaction.

Features

User authentication: Registration, login, and profile management (donors and recipients).
Donor management: CRUD operations for donor data (create, read, update, delete).
Recipient management: CRUD operations for recipient data.
Blood request management: Create, view, manage blood requests (including matching donors and recipients).
Data access control: Implement proper authorization mechanisms to restrict access to sensitive data.
(Add more features as applicable)
Prerequisites

Node.js and npm (or yarn) installed on your system (download from https://nodejs.org/).
A PostgreSQL database server installed and running.
Basic understanding of Node.js, Express, TypeScript, PostgreSQL, and Prisma.
Installation

Clone the repository:

Bash
git clone https://github.com/sakibmohammad79/blood-donation-server.git
Use code with caution.
content_copy
Navigate to the project directory:

Bash
cd blood-donation-server
Use code with caution.
content_copy
Install dependencies:

Bash
npm install
Use code with caution.
content_copy
(or)

Bash
yarn install
Use code with caution.
content_copy
Configuration

Create a .env file in the project root directory to store sensitive environment variables like database connection details.
Refer to the Prisma documentation (https://www.prisma.io/docs) for instructions on configuring your PostgreSQL connection string.
Database Setup

Run Prisma migrations to create the database schema:

Bash
npx prisma migrate dev  # For development environment
Use code with caution.
content_copy
(or)

Bash
npx prisma migrate prod  # For production environment
Use code with caution.
content_copy
Note: Replace dev or prod with your specific environment name if using a different naming convention.

Running the Server

Start the development server (hot reloading):

Bash
npm run dev
Use code with caution.
content_copy
(or)

Bash
yarn dev
Use code with caution.
content_copy
This will start the server on the default port (typically 3000).

Building for Production

Compile TypeScript code into JavaScript:

Bash
npm run build
Use code with caution.
content_copy
(or)

Bash
yarn build
Use code with caution.
content_copy
This will create a dist folder containing the production-ready server files.

Start the production server:

Bash
node ./dist/server.js
Use code with caution.
content_copy
Important: This assumes the compiled server file is located in ./dist/server.js. Adjust the path if your build output differs.

Deployment

Choose a suitable hosting platform that supports Node.js applications (e.g., vercel, Heroku, AWS EC2).
Refer to the platform's documentation for deployment instructions.
