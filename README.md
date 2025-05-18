#  NestJS To-Do App with ELK Logging (Dockerized)

This is a basic "To-Do list application" built using "NestJS" and "MongoDB". It includes full "CRUD functionality" (Create, Read, Update, Delete) and uses the "ELK Stack" (Elasticsearch, Logstash, Kibana) to log all important actions in the app — like when a task is created, updated, or deleted. All services are containerized using "Docker" for easy setup and portability.


##  What This App Does

- Lets you create, view, edit, and delete to-do tasks.
- Logs every operation in "JSON format" 
- Sends logs to "Elasticsearch" using "Logstash".
- Lets you view and search logs in "Kibana dashboard".


## Technologies Used

- NestJS – Backend framework
- MongoDB – NoSQL database
- Docker & Docker Compose – For containerizing and running all services
- ELK Stack – Logging and visualization
- React - Frontend



##  Why I Used Docker for Each Service

  NestJS App    | Keeps the app consistent across systems. Easy to run on any machine with Docker. 
  MongoDB       | Avoids installing Mongo locally. Helps manage data easily. 
  Elasticsearch | Heavy service with many dependencies. Docker makes setup simple and clean. 
  Logstash      | Easy to configure and run inside a container. 
  Kibana        | Gives a visual dashboard inside a container — no need to install anything on the host. 
  React         |  To ensure consistent environment setup, simplify deployment, and seamlessly integrate with backend service and Axios used for API calls.

Using Docker makes everything portable, easy to test, and avoids system-level issues.


##  How to Run the App
 - first install docker desktop in your system
-  use "docker-compose up" command  -->this will run your containers

 ##  API Endpoints & URLs

  ## Frontend
   - Localhost URL: http://localhost

  ## Backend (NestJS)
   - Base API URL: http://localhost:3000/api/todo

  ## ELK Stack (Logging & Monitoring)

    - Elasticsearch: http://localhost:9200  

    - Kibana: http://localhost:5601 
 
    - Logstash: Configured internally to collect logs (no direct UI access)

## Kibana Dashboard Screenshot and description
 
 screenshot:
- todoapp/kibana_dashboard.png

description:
The Kibana dashboard provides a visual overview of the application logs collected from the NestJS to-do app. 

It shows:

- Number of CRUD operations over time: Track how many tasks were created, updated, deleted, or retrieved each hour or day.

- Log levels visualization: See how many info, warning, and error logs have been generated.

- Error details: Quickly identify any errors occurring in the application with detailed messages and timestamps.

- Filters: Easily filter logs by operation type, log level, or time range to analyze specific events.


