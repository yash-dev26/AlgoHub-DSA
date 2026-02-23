# 🚀 AlgoHub : Code Submission & Evaluation Platform

**AlgoHub** is a scalable, distributed code submission and evaluation platform where users can solve DSA and programming problems, submit solutions, and receive real-time evaluation results.

This system is designed using a **microservices architecture** with queue-based communication and isolated Docker-based code execution for safety and scalability.

> Relevant terminal outputs and log screenshots have been added below for reference. These provide clear visibility into the execution flow and results.

---

# 🧠 Overview

The platform allows:

-  Admins to post DSA / programming problems  
-  Users to submit code solutions  
-  Backend services to process submissions asynchronously  
-  Secure execution of user code inside Docker containers  
-  Automatic test case validation  
-  Real-time status updates to users via webSockets

---

# Project Structure

```
AlgoHub/
│
├── AlgoHubFrontend/
│   └── User interface for browsing problems, submitting code, and viewing results.
│
└── AlgoHubBackend/
    │
    ├── AlgoHub-Enqueuer-service/
    │   └── Receives submissions, stores metadata, and enqueues evaluation jobs.
    │
    ├── AlgoHub-Evaluation-service/
    │   └── Executes code against test cases and publishes evaluation results.
    │
    ├── AlgoHub-Problem-Service/
    │   └── Manages problem statements, test cases, and related problem data APIs.
    │
    └── AlgoHub-WebSocket-Service/
        └── Pushes real-time submission and evaluation updates to connected clients.
```

---

# 🏗️ Architecture Diagram
<img width="1648" height="1110" alt="png l" src="https://github.com/user-attachments/assets/f270033d-7d5d-4dd7-8fb6-a66d7bbc7067" />

---

# 🔄 Submission Flow

***1. The client sends a submission request to the Submission Service.***

<br>

  <img width="1870" height="913" alt="image" src="https://github.com/user-attachments/assets/51477b81-fed3-4c1a-9e35-dcfe4c85030a" />
    
<br><br>

***2. The Submission Service makes a synchronous call to the Problem Admin Service to retrieve problem details.***  

<br>

  <img width="1493" height="951" alt="image" src="https://github.com/user-attachments/assets/a4f6c36c-cbd0-402d-933b-6bfd83a90bda" />
  
<br><br>

***3. The Problem Admin Service queries MongoDB to fetch the required problem data.***  

<br>

<img width="1909" height="894" alt="image" src="https://github.com/user-attachments/assets/abbab9ac-b550-4f45-9a74-8a49dee97664" />

<br><br>

***4. The Problem Admin Service returns the problem details to the Submission Service.***  

<br>
  <img width="1032" height="268" alt="image" src="https://github.com/user-attachments/assets/e3261712-4dc1-4983-9831-d4e907ee6020" />
  
  <br><br>
  

***5. The Submission Service creates a new submission record in the database.***  

<br>
<img width="1916" height="914" alt="image" src="https://github.com/user-attachments/assets/0a307102-62a3-430c-8c94-dfbb169eff1f" />

<br><br>

***6. The Submission Service pushes the submission payload (with updated stub) into the Redis submission queue.***  

<br>

<img width="1136" height="720" alt="image" src="https://github.com/user-attachments/assets/3a1fdf77-f2a8-45ea-a906-d0f9cadfd873" />

<br><br>


***7. The Submission Service responds to the client confirming that the submission was successfully created.***  


***8. The Evaluator Service consumes the submission message from the queue and executes the code.***  

<br>

<img width="1166" height="737" alt="image" src="https://github.com/user-attachments/assets/e8130bf2-0834-4deb-87ec-bd23f5ec077e" />

<br>
<br>

<img width="1546" height="691" alt="image" src="https://github.com/user-attachments/assets/b1145c28-d116-4bbb-9f7a-13a3d7fb4579" />

<br><br>

***9. After evaluation and test case verification, the Evaluator Service publishes the result status to the evaluation queue.***  

<br>
<img width="1559" height="688" alt="image" src="https://github.com/user-attachments/assets/57f5acc0-ba69-43e0-9e85-48a40a493d20" />
<br><br>

***10. The Submission Service consumes the evaluation result from the evaluation queue.***  


***11. The Submission Service updates the submission record in the database with the evaluation result.***  


***12. The Submission Service notifies the WebSocket Service about the updated submission status.***  

<br>
<img width="1494" height="510" alt="image" src="https://github.com/user-attachments/assets/3edab114-6804-4ad7-8088-5d46f908410c" />
<br><br>

***13. The WebSocket Service pushes the execution result/status update to the client via the active socket connection.***  

<br>
<img width="1508" height="480" alt="image" src="https://github.com/user-attachments/assets/f75d1a55-707e-47a7-8053-0b5d54cbc5b0" />


---
## 🧠 Project Focus

AlgoHub emphasizes:

- **Microservice-based** backend architecture
- **Queue-driven asynchronous job processing**
- **Secure Docker-based execution** of untrusted code
- **Real-time updates** using WebSockets (Socket.IO)
- Clean service separation and **scalability**

The frontend exists mainly to:
- Trigger submissions
- Display code stubs
- Show real-time evaluation updates

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

## Future Enhancements
- Add CI/CD pipelines to automate build, test, and deployment for all services.


> Built for scalable, secure, and real-time code evaluation.
