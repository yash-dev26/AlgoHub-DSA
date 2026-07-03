# ⚙️ AlgoHubBackend

This directory contains all backend microservices powering **AlgoHub**. Each service is independently deployable, containerized, and communicates with the others via Redis-backed queues and REST calls.

---

<img width="1648" height="1110" alt="png l" src="https://github.com/user-attachments/assets/f270033d-7d5d-4dd7-8fb6-a66d7bbc7067" />

## 🧩 Services

| Service | Description | Tech Stack |
|---|---|---|
| **AlgoHub-Enqueuer-service** | Accepts submissions, persists submission records, and pushes jobs onto the Redis queue for evaluation. Consumes evaluation results and notifies the WebSocket service. | Fastify, TypeScript, MongoDB, Redis |
| **AlgoHub-Evaluation-service** | Consumes submission jobs, spins up isolated Docker containers per language, runs test cases, and publishes results. | Node.js, TypeScript, BullMQ, Docker |
| **AlgoHub-Problem-Service** | Manages problem statements, test cases, and metadata via REST APIs. | Express, MongoDB |
| **AlgoHub-WebSocket-Service** | Maintains client socket connections and pushes real-time submission status updates. | Node.js, Socket.IO |

---

## 📋 Prerequisites

- **Node.js** v18+
- **Docker Desktop** (must be running before starting any service — required for both `docker-compose up` and for the Evaluation Service's container execution)
- **MongoDB** instance (local or Atlas) — not included in `docker-compose.yml`, must be provisioned separately

---

## 🔐 Environment Variables

Each service includes an `.env.example` file — copy it to `.env` inside that service's directory and fill in the values before running.

```bash
cp AlgoHub-Enqueuer-service/.env.example AlgoHub-Enqueuer-service/.env
cp AlgoHub-Evaluation-service/.env.example AlgoHub-Evaluation-service/.env
cp AlgoHub-Problem-Service/.env.example AlgoHub-Problem-Service/.env
cp AlgoHub-WebSocket-Service/.env.example AlgoHub-WebSocket-Service/.env
```

Refer to each service's `.env.example` for the exact variables required (DB connection strings, Redis host/port, service ports, and inter-service URLs).

---

## 🚀 Running with Docker Compose (Recommended)

The easiest way to spin up the entire backend — all four services plus their dependencies — is via the provided `docker-compose.yml`.

```bash
cd AlgoHubBackend
docker-compose up --build
```

> ⚠️ Requires Docker to be running locally, since AlgoHub-Evaluation-service spawns containers to execute submitted code.

> 🌱 Automatic Database Seeding – On first startup, the Problem Service automatically populates an empty MongoDB database with sample coding problems, enabling contributors to start using AlgoHub without manual setup.
This will:
- Build and start all four microservices
- Wire up the shared Docker network for inter-service communication
- Mount required volumes for the evaluation service's container execution

To stop all services:

```bash
docker-compose down
```

---

## 🛠️ Running Services Individually (Local Dev)

If you prefer running a specific service outside Docker for development:

### AlgoHub-Enqueuer-service
```bash
cd AlgoHub-Enqueuer-service
npm install
npm run dev
```

### AlgoHub-Evaluation-service
```bash
cd AlgoHub-Evaluation-service
npm install
npm run dev
```
> ⚠️ Requires Docker to be running locally, since this service spawns containers to execute submitted code.

### AlgoHub-Problem-Service
```bash
cd AlgoHub-Problem-Service
npm install
npm run dev
```

### AlgoHub-WebSocket-Service
```bash
cd AlgoHub-WebSocket-Service
npm install
npm run dev
```

---

## 🔄 Service Communication Overview

- **Enqueuer → Problem Service**: synchronous REST call to fetch problem details on submission.
- **Enqueuer → Redis (submission queue)**: pushes the submission payload for evaluation.
- **Evaluation Service → Redis (submission queue)**: consumes jobs, executes code in isolated Docker containers.
- **Evaluation Service → Redis (evaluation queue)**: publishes results back.
- **Enqueuer → Redis (evaluation queue)**: consumes results, updates the submission record, and notifies the WebSocket service.
- **WebSocket Service → Client**: pushes real-time status updates over an active socket connection.

---

## 🐳 Docker Notes

- The **Evaluation Service** requires access to the Docker daemon (mounted via `/var/run/docker.sock` in `docker-compose.yml`) to spin up isolated per-language execution containers.
- Language-specific execution images (Python, Java, C++) are pulled/managed automatically by the evaluation service on first run.
- Containers are resource-constrained and timeout-enforced — see the root README's **Security Model** section for details.

---

## 📁 Directory Reference

```
AlgoHubBackend/
├── docker-compose.yml
├── AlgoHub-Enqueuer-service/
├── AlgoHub-Evaluation-service/
├── AlgoHub-Problem-Service/
└── AlgoHub-WebSocket-Service/
```