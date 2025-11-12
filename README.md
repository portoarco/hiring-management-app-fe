# Hiring Management Web App

This project is a high-fidelity, full-stack Hiring Management Web App built as a submission for a **Front End Engineer Case Study**.

The application serves two distinct user roles: Admin (Recruiter) and Applicant (Job Seeker), both managed via Role-Based Access Control (RBAC).

**Key Objectives**
- Recruiter and Applicant Dashboard: a secure portal for Recruiters to create and manage job vacancies; and Applicant browse the active job vacancies
- Enterprise-Grade UX: building pixel-perfect UI that meets enterprise standards 
- Responsive User Interface for all devices

## Features

- Role-Based Access Control/RBAC
- Routing and Page Structure
- Data Integration with Supabase
- Responsive Design
- Job Management Dashboard (Recruiter)
- Job List Vacancies Portal (Applicant)
- Feedback State/status handler


## Run Locally

Clone the Front End project

```bash
  git clone https://github.com/portoarco/hiring-management-app-fe.git
```

Clone the Back End project

```bash
  git clone https://github.com/portoarco/hiring-management-app-be.git
```

Go to the Back End directory

```bash
 cd hiring-management-app-be
```

Install dependencies

```bash
  npm install
```

Create a .env file in the root of the Back-End project and fill in the required environment variables.


Go to the Front End directory

```bash
 cd hiring-management-app-be
```

Install dependencies

```bash
  npm install
```
Create a .env file in the root of the Front-End project and fill in the required environment variables.

Start both client and server

```bash
  npm run dev
```




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**FRONT END PROJECT**

`NEXT_PUBLIC_API_URL="http://localhost:XXXX"`


**BACK END PROJECT**

`PORT=XXXXX`

`FRONTEND_URL="http://localhost:XXXX"`

`DATABASE_URL`

`DIRECT_URL`

`MAILSENDER` from Google Account API

`MAILPASS` from Google Account API

`TOKEN_KEY=abcdef`
## Tech Stack

**Client:** Next JS,Tailwind CSS, Zustand (Global State), Zod (Form Validator),

**Server:** Node, Express, PostgreqSQL, Supabase (BaaS), Prisma ORM, 

