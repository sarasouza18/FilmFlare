# FilmFlare

**FilmFlare** is a RESTful API designed for managing a movie catalog, offering advanced search features and complete catalog management. The API supports adding, updating, removing, and searching for movies, and is designed for high performance and scalability. Built with **Node.js** and using **DynamoDB** for data storage, **Elasticsearch** for advanced search, and **Redis** for caching, FilmFlare ensures a fast and reliable user experience. The application is containerized with **Docker** and orchestrated using **Kubernetes** to handle high demand with ease.

## 🚀 Project Objectives

- **Complete Movie Management**: Enables adding, updating, removing, and listing movies from the catalog.
- **Advanced Search**: Provides fast and efficient catalog searches using **Elasticsearch**, with support for filters like title, genre, and release year.
- **Scalability and Resilience**: Built using **Docker** and **Kubernetes**, the system supports caching and distributed databases, ensuring high availability and scalability as demand increases.
- **Optimized Performance**: Utilizes **Redis** as a caching layer to reduce latency and improve performance for frequent searches.
- **Separation of Concerns**: Follows the **Hexagonal Architecture** pattern to ensure that the core business logic is decoupled from external services, promoting maintainability and scalability.

---

## 🛠️ Technologies Used

### 1. **Node.js**
- The primary platform used for implementing the API.

### 2. **Express**
- A framework used for routing and middleware management, simplifying the creation of RESTful endpoints.

### 3. **DynamoDB**
- A highly available NoSQL distributed database used for storing movie data.

### 4. **Elasticsearch**
- A search engine that enables full-text search and complex queries on the movie catalog, providing fast and advanced search capabilities.

### 5. **Redis**
- An in-memory caching system used to improve response times for frequent operations and reduce the load on DynamoDB and Elasticsearch.

### 6. **Docker**
- Used to containerize the application and its services, ensuring consistency across different environments.

### 7. **Kubernetes**
- A container orchestration platform that handles scaling and ensures high availability by automatically managing container replicas.

### 8. **AWS SDK**
- A library for interacting with AWS services such as **DynamoDB** and other AWS resources.

### 9. **JWT**
- Can be used for user authentication and authorization, ensuring that only authenticated users can perform certain actions like adding, updating, or removing movies.

---

## 📊 Architecture Overview

FilmFlare follows the **Hexagonal Architecture** pattern, separating the business logic from external services like databases, caches, and search engines. This ensures that the core logic is adaptable and easily maintainable.

### Main Components of the Hexagonal Architecture

1. **Domain Layer (Core)**: Contains business logic and domain entities.
   - Example: The **Movie entity** representing a movie in the system and the services operating on it.

2. **Ports and Adapters (External Interfaces)**:
   - **Ports**: REST endpoints allowing users to interact with the system (e.g., GET /movies, POST /movies).
   - **Adapters**: Interfaces to external services such as **DynamoDB**, **Elasticsearch**, and **Redis**.

3. **Application Layer (Use Cases)**: Coordinates the execution of operations.
   - Example: Use cases like `AddMovie`, `GetMovies`, `UpdateMovie` define the operations that interact with the domain.

4. **Infrastructure Layer**: Implements external interfaces like databases and search engines.
   - Example: Connects to **DynamoDB** for persistence, **Elasticsearch** for search, and **Redis** for caching.

---

## 🔄 Operation Flow

### 1. **Add a Movie**

1. The client sends a `POST /movies` request with movie data.
2. The request is received by the `MovieController`, triggering the `AddMovie` use case.
3. The movie is stored in **DynamoDB**.
4. After saving, the movie is indexed in **Elasticsearch** for fast searches.
5. **Redis** invalidates the movie cache to ensure fresh data is served in future requests.

### 2. **Search Movies**

1. The client sends a `GET /movies` request with filters (title, genre, release year).
2. The `MovieController` calls the `GetMovies` use case, which checks if the result is cached in **Redis**.
3. If cached, the result is returned; otherwise, **Elasticsearch** is queried.
4. The search result is then cached in **Redis** to improve performance for future searches.

### 3. **Update a Movie**

1. The client sends a `PUT /movies/:id` request with updated movie data.
2. The `MovieController` triggers the `UpdateMovie` use case, which updates the movie in both **DynamoDB** and **Elasticsearch**.
3. The relevant cache in **Redis** is invalidated to ensure fresh data is returned in future searches.

### 4. **Remove a Movie**

1. The client sends a `DELETE /movies/:id` request to remove a movie.
2. The `MovieController` triggers the `DeleteMovie` use case, removing the movie from both **DynamoDB** and **Elasticsearch**.
3. The relevant cache in **Redis** is invalidated to reflect the removal.

---

## ⚙️ Configuration and Orchestration

### 1. **Docker**

FilmFlare is containerized using **Docker**, allowing the API and its auxiliary services (Redis, Elasticsearch) to be easily distributed and managed. **Docker Compose** is used during local development to orchestrate the application and its dependencies.

### 2. **Kubernetes**

In production, **Kubernetes** is used to manage the FilmFlare API. It automatically scales the number of API replicas based on demand, ensuring high availability. Kubernetes manifest files handle:

- **Deployment**: Defines the number of API replicas and how they are distributed across the cluster.
- **Service**: Provides a stable interface to access the API containers.
- **Ingress**: Manages external access to the API, routing requests to the appropriate services.

---

## 📝 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/filmflare.git
cd filmflare
```

### 2. Set up Environment Variables

Create a `.env` file based on the provided **`env.example`** file:

```bash
cp .env.example .env
```

Edit the `.env` file and add your own configurations for **Redis**, **Elasticsearch**, **DynamoDB**, and other services:

```bash
# Example .env configuration
REDIS_ADDRESS=your_localhost
DYNAMODB_REGION=us-east-1
ELASTICSEARCH_URL=your_localhost
```

### 3. Build and Run the Application

Install dependencies:

```bash
npm install
```

Start the services (Redis, Elasticsearch, etc.) using Docker Compose:

```bash
docker-compose up --build
```

Run the application:

```bash
npm start
```
