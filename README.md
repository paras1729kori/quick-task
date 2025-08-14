<p align="center">
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="white" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
  <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
  <span style="font-size: 50px;font-weight: 500;">Quick Task Master</span>
</svg>

<p style="max-width: 800px; margin: auto;" align="center">Quick Task Master is a full-stack web application designed to help users efficiently manage their daily tasks. With an intuitive interface and robust backend, it allows users to create, update, and delete tasks seamlessly.</p>

---

## 🚀 Features

- **User Authentication**: Secure login and registration system.
- **Task Management**: Create, read, update, and delete tasks.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Real-time Updates**: Instant task updates without page reloads.
- **Filters**: Filters to help your organise your tasks based on status and priority.
- **API Documentation**: Interactive API docs via Swagger (WIP 😊)

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **API Docs**: Swagger
- **Containerization**: Docker & Docker Compose

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- Docker & Docker Compose

### Clone the Repository

```bash
git clone https://github.com/paras1729kori/quick-task.git
cd quick-task
```

### Add Environment Variables

> Inside root folder

```bash
cd client
touch .env

# .env content
VITE_API_URL=http://localhost:5555
```

```bash
cd server
touch .env

# .env content
POSTGRES_USER=<your_db_user>
POSTGRES_PASSWORD=<your_db_password>
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=<your_db_name>
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
JWT_SECRET=
JWT_EXPIRATION=1d
JWT_RESET_SECRET=
```

### Dockerized PostgreSQL Setup

Start PostgreSQL using Docker Compose:

```bash
docker-compose up -d
```

By default, the database will be available at:

```
Host: localhost
Port: 5432
User: <your_db_user>
Password: <your_db_password>
Database: <your_db_name>
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install / yarn install
```

3. Run Prisma migrations:

```bash
npx prisma migrate dev
```

4. Generate Prisma Client

```bash
npx prisma generate
```

5. Start the backend server:

```bash
npm run start:dev
```

> The backend server will be running on `http://localhost:5555`. <br />
> The API docs will be running on `http://localhost:5555/api`.

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install or yarn install
```

3. Start the frontend server:

```bash
npm run dev
```

> The frontend will be running on `http://localhost:5173`.

## 📱 Usage

1. Open your browser and go to `http://localhost:5173`.
2. Register a new account or log in with existing credentials.
3. Start adding, editing, or deleting tasks as needed.

## 🧪 Running Tests

> WIP 😊

## 🚀 Deployment

For deployment, consider using platforms like:

- **Frontend**: Vercel
- **Backend**: Railway
- **Database**: Managed PostgreSQL on Railway

Ensure to set the appropriate environment variables in your deployment platform.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Create a new Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

For any questions or feedback, please open an issue on the [GitHub repository](https://github.com/paras1729kori/quick-task/issues).

## 🤞 Stay in touch

- Portfolio - [Paras Kori](https://paraskori.vercel.app/)
- Mail - [paras1799kori@gmail.com](mailto:paras1799kori@gmail.com)
