# Healthcare Management System

A simple microservices-based Healthcare Management System built with React, Node.js, Express, PostgreSQL, Docker, and Docker Compose.

## Overview

This project demonstrates a healthcare platform consisting of:

* Frontend UI (React + Vite)
* Patient Service (Node.js + Express)
* Appointment Service (Node.js + Express)
* PostgreSQL Database
* Dockerized deployment

The application allows users to:

* View patients
* Create patients
* View appointments
* Schedule appointments
* Store data persistently in PostgreSQL

---

# Architecture

```text
                           +------------------+
                           |    React UI      |
                           |   Port: 5173     |
                           +--------+---------+
                                    |
                     +--------------+--------------+
                     |                             |
                     v                             v
          +----------+---------+      +-----------+----------+
          | Patient Service    |      | Appointment Service |
          | Port: 3000         |      | Port: 3001          |
          +----------+---------+      +-----------+---------+
                     |                             |
                     +-------------+---------------+
                                   |
                                   v
                        +----------+----------+
                        | PostgreSQL Database |
                        | Port: 5432          |
                        +---------------------+
```

---

# Technology Stack

| Component        | Technology     |
| ---------------- | -------------- |
| Frontend         | React + Vite   |
| Backend          | Node.js        |
| API Framework    | Express        |
| Database         | PostgreSQL     |
| Containerization | Docker         |
| Orchestration    | Docker Compose |
| HTTP Client      | Axios          |

---

# Services

## Frontend

Provides a web interface for:

* Dashboard
* Patients
* Appointments

Default URL:

```text
http://localhost:5173
```

---

## Appointment Service

Responsible for:

* Creating appointments
* Retrieving appointments
* Searching appointments by patient

Default URL:

```text
http://localhost:3001
```

# Docker Deployment

## PostgreSQL

```bash
docker run -d \
  --name postgres \
  -e POSTGRES_USER=appuser \
  -e POSTGRES_PASSWORD=apppassword \
  -e POSTGRES_DB=hospitaldb \
  -p 5432:5432 \
  -v postgres-data:/var/lib/postgresql/data \
  postgres:16
```

---

# Local Development

## Patient Service

```bash
cd patient-service

npm install

node patient-service.js
```

---

## Appointment Service

```bash
cd appointment-service

npm install

node appointment-service.js
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# Project Structure

```text
healthcare-management-system/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── patient-service/
│   ├── patient-service.js
│   ├── db.js
│   └── package.json
│
├── appointment-service/
│   ├── appointment-service.js
│   ├── db.js
│   └── package.json
│
├── docker-compose.yml
│
└── README.md
```
