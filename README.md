**FilmFlare** is a RESTful API designed to manage a movie catalog, offering advanced search features and complete catalog management. The API was developed using Node.js, with support for DynamoDB as a database, Elasticsearch for advanced search, Redis for caching, and containerization and orchestration technologies such as Docker and Kubernetes. The architecture follows the Hexagonal pattern, promoting separation of concerns and facilitating maintainability and scalability.

**Project Objectives:**
- **Complete Movie Management**: The API allows adding, updating, removing, and listing movies from the catalog.
- **Advanced Movie Search**: Integration with Elasticsearch for fast and efficient catalog searches based on various filters (title, genre, release year).
- **Scalability and Resilience**: Use of a container-oriented architecture (Docker and Kubernetes), with support for caching and distributed databases, ensuring high availability and scalability according to demand.
- **Optimized Performance**: Use of Redis as a caching layer to improve performance and reduce latency in frequent searches.
- **Separation of Concerns**: Hexagonal architecture to ensure business logic is completely decoupled from external implementations, facilitating maintenance and evolution of the application.

**Technologies Used:**
- **Node.js**: The main platform for implementing the API.
- **Express**: A framework for route and middleware management in the application.
- **DynamoDB**: A highly available NoSQL distributed database used to store movie data.
- **Elasticsearch**: A search engine that enables full-text search and complex queries on the movie catalog.
- **Redis**: An in-memory cache system to accelerate responses to common requests and reduce resource usage on DynamoDB and Elasticsearch.
- **Docker**: Used to containerize the application, allowing easy distribution and scalability.
- **Kubernetes**: A container orchestration platform to automatically scale the application and ensure high availability.
- **AWS SDK**: A library to interact with DynamoDB and other AWS services.
- **JWT**: Can be used for user authentication and authorization, ensuring that only authenticated users can add, remove, or modify movies.

**Hexagonal Architecture:**
The hexagonal architecture was chosen to ensure a clear separation between the core parts of the application (business logic) and its external interfaces (database, caching services, search engine). This provides flexibility to replace or modify external technologies without impacting business logic.

**Main Components of Hexagonal Architecture:**
- **Domain Layer (Core)**: Contains all business logic and domain entities.
  - Example: The `Movie` entity representing movies in the system and services operating on that data.
- **Ports and Adapters (External Interfaces)**:
  - **Ports**: The API exposes REST endpoints that allow users to interact with the system.
    - Example: `GET /movies`, `POST /movies`, etc.
  - **Adapters**: Responsible for interacting with external services like DynamoDB, Elasticsearch, and Redis.
    - Example: An adapter for Elasticsearch searches or interactions with Redis.
- **Application Layer (Use Cases)**: Contains use cases that coordinate the execution of operations.
  - Example: `AddMovie`, `GetMovies`, `UpdateMovie` are use cases that perform specific operations, like adding a new movie or fetching movies.
- **Infrastructure Layer**: Includes the implementation details of interfaces with databases and search engines.
  - Example: Connection to DynamoDB and Elasticsearch, cache handling with Redis, etc.

**Operation Flow:**

1. **Add a Movie**:
   - Step 1: The client sends a `POST /movies` request with the movie data.
   - Step 2: The request is received by `MovieController`, which triggers the `AddMovie` use case.
   - Step 3: The movie is saved in DynamoDB.
   - Step 4: After saving, the movie is indexed in Elasticsearch to allow quick searches.
   - Step 5: Redis invalidates the movie cache, ensuring updated data is served in subsequent requests.

2. **Search Movies**:
   - Step 1: The client sends a `GET /movies` request with search filters (title, genre, release year).
   - Step 2: `MovieController` calls the `GetMovies` use case, which checks if the search result is already cached in Redis.
   - Step 3: If the result is cached, it is returned directly. Otherwise, Elasticsearch is queried.
   - Step 4: The search result is cached in Redis to improve future search performance.

3. **Update a Movie**:
   - Step 1: The client sends a `PUT /movies/:id` request to update a movie.
   - Step 2: `MovieController` triggers the `UpdateMovie` use case, which updates the movie in DynamoDB and Elasticsearch.
   - Step 3: The relevant cache in Redis is invalidated to ensure that future searches return updated data.

4. **Remove a Movie**:
   - Step 1: The client sends a `DELETE /movies/:id` request to remove a movie.
   - Step 2: `MovieController` triggers the `DeleteMovie` use case, which removes the movie from DynamoDB and Elasticsearch.
   - Step 3: The relevant cache in Redis is invalidated.

**Configuration and Orchestration:**

- **Docker**: The application is containerized using Docker, allowing the API and auxiliary services (Redis, Elasticsearch) to be easily distributed and managed. Docker Compose is used during local development to orchestrate the application and its auxiliary services.

- **Kubernetes**: Kubernetes is used to manage the application in production. It allows automatic scaling of the number of API replicas as demand increases, while ensuring high availability. Kubernetes manifest files were created for:
  - **Deployment**: Defines the number of replicas and how the application is distributed in the cluster.
  - **Service**: Creates a stable entry point to access the API containers.
  - **Ingress**: Controls external access to the API and maps requests to the appropriate services in the cluster.

**Proposed Features**:
- **Movie CRUD**: Basic operations for adding, listing, updating, and removing movies.
- **Advanced Search**: Search movies based on multiple criteria (title, genre, release year) using Elasticsearch.
- **Cache**: Intelligent caching with Redis to accelerate responses in frequent operations.
- **Authentication**: Possibility to implement JWT to protect sensitive endpoints.
- **Scalability**: Full support for horizontal scalability with Kubernetes.

**Next Steps and Future Expansions**:
- **Authentication and Authorization**: Add user support with JWT to restrict access to movie addition, updating, and removal operations.
- **Movie Recommendations**: Implement a personalized recommendation system based on user history.
- **Monitoring and Logs**: Implement monitoring solutions (Prometheus/Grafana) and centralized logs (ELK Stack) to improve management of the application in production.

FilmFlare is designed to be a robust, scalable, and high-performance solution, ready to grow as demand increases while maintaining the flexibility to be easily adapted to new technologies and features. The project focuses on keeping clear separation of concerns and optimizing performance with technologies like Redis and Elasticsearch, ensuring the API remains fast and efficient at any scale.
