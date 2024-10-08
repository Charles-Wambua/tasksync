# TaskSync

TaskSync is a web application that allows users to manage tasks in real-time with CRUD functionality. It is built using React.js for the frontend, Node.js and Express for the backend, and PostgreSQL for the database. Real-time updates are enabled via WebSockets, and the entire application is containerized using Docker.

## Features

- **User Authentication**: Sign up, login, and JWT-based authentication.
- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Real-time Updates**: WebSockets allow real-time updates across all connected clients.
- **Dockerized**: Application runs in Docker containers for easy setup and deployment.

## Technologies Used

- **Frontend**: React.js, Ant Design, Axios
- **Backend**: Node.js, Express, WebSockets, JWT, bcryptjs
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20.17.0 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started
### 3.Environment Variables
DB_USER=postgres
DB_HOST=db
DB_NAME=tasksync
DB_PASSWORD=Charlie98
DB_PORT=5432
JWT_SECRET=f7281c8a3dc2b5b6719d7e79b1f8d1a3d123f1c2f5b6a8a79b6d9c5f731b8a79

### 2.
docker-compose down
docker-compose up --build

### 1. Clone the repository

```bash
git clone https://github.com/Charles-Wambua/TaskSync.git
cd TaskSync





Built with ❤️ by Charles Wambua.


