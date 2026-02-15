# 🚀 AlgoHub : Code Submission & Evaluation Platform

A scalable, distributed code execution platform where users can solve **DSA and programming problems**, submit solutions, and receive real-time evaluation results.

This system is designed using a **microservices architecture** with queue-based communication and isolated Docker-based code execution for safety and scalability.

---
## 🧠 Project Focus

AlgoHub emphasizes:

- Microservice-based backend architecture
- Queue-driven asynchronous job processing
- Secure Docker-based execution of untrusted code
- Real-time updates using WebSockets (Socket.IO)
- Clean service separation and scalability

The frontend exists mainly to:
- Trigger submissions
- Display code stubs
- Show real-time evaluation updates

---

## 🧠 Overview

The platform allows:

-  Admins to post DSA / programming problems  
-  Users to submit code solutions  
-  Backend services to process submissions asynchronously  
-  Secure execution of user code inside Docker containers  
-  Automatic test case validation  
-  Real-time status updates to users via webSockets

---


# 🏗️ Architecture Diagram
<img width="1648" height="1110" alt="png l" src="https://github.com/user-attachments/assets/f270033d-7d5d-4dd7-8fb6-a66d7bbc7067" />

---

# 🔄 Submission Flow
1. The client sends a submission request to the Submission Service.  
2. The Submission Service makes a synchronous call to the Problem Admin Service to retrieve problem details.  
3. The Problem Admin Service queries MongoDB to fetch the required problem data.  
4. The Problem Admin Service returns the problem details to the Submission Service.  
5. The Submission Service creates a new submission record in the database.  
6. The Submission Service pushes the submission payload (with updated stub) into the Redis submission queue.  
7. The Submission Service responds to the client confirming that the submission was successfully created.  
8. The Evaluator Service consumes the submission message from the queue and executes the code.  
9. After evaluation and test case verification, the Evaluator Service publishes the result status to the evaluation queue.  
10. The Submission Service consumes the evaluation result from the evaluation queue.  
11. The Submission Service updates the submission record in the database with the evaluation result.  
12. The Submission Service notifies the WebSocket Service about the updated submission status.  
13. The WebSocket Service pushes the execution result/status update to the client via the active socket connection.  

---

## 🖥️ Frontend (Minimal but Functional)

Although backend-focused, a React frontend has been built to demonstrate integration:

- Only **one exposed submission route**
- One **hardcoded problem**
- Problem fetched via proxy admin service call to DB
- Code stub logic implemented
- Real-time submission status updates via Socket.IO
- Clean UI for testing backend functionality

The frontend exists purely to:
- Simulate real user submissions
- Demonstrate WebSocket-based live updates
- Showcase the full execution lifecycle

---

## ⚙️ Tech Stack

### Backend
- **Node.js**
- **Express**
- **Fastify**
- **TypeScript**
- **Socket.IO**
- **MongoDB**
- **Redis (Queue Layer)**
- **Docker**

### Frontend
- **React**
- **TypeScript**
- **Socket.IO Client**
- **Tailwind CSS**

---

## 📈 Scalability Design

- Stateless backend services
- Redis-based queue decoupling
- Multiple evaluator instances supported
- Socket connection mapping with in-memory + Redis cache
- Horizontally scalable architecture

---

## 🛡️ Security Model

- Docker-based isolated execution
- Resource-constrained containers
- Timeout enforcement
- No direct DB access from execution container
- Controlled runtime environments

---

## 🎯 What This Project Demonstrates

- Real-world backend system design
- Asynchronous distributed processing
- Secure sandboxed execution
- Microservice communication
- Queue-based scaling strategy
- Event-driven architecture using WebSockets

---

## 🚀 Future Enhancements

- Frontend enhancements
- Contest mode
- Plagiarism detection


> Built for scalable, secure, and real-time code evaluation.
