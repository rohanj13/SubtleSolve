# SubtleSolve Backend

A Spring Boot backend API for SubtleSolve, a puzzle game where players guess the daily word puzzle. This is the backend service; the frontend is maintained in a separate repository.

## Project Overview

SubtleSolve is deployed on Google Cloud Run and features:

- **REST API** for puzzle management, user gameplay, and statistics
- **Daily Puzzle Generation** via Google Cloud Scheduler (runs nightly to generate and upload puzzles to the database)
- **Auth0 Integration** for secure user authentication and authorization
- **Spring Security** with JWT token validation

## Technology Stack

- **Framework**: Spring Boot
- **Language**: Java
- **Build Tool**: Gradle
- **Authentication**: Auth0 with JWT tokens
- **Database**: PostgreSQL (configured via Cloud SQL)
- **Deployment**: Google Cloud Run
- **Scheduler**: Google Cloud Scheduler (daily puzzle generation)

## Local Development

### Prerequisites

- Java 17+
- Gradle
- Docker & Docker Compose (optional, for containerized development)
- Auth0 account with application configured

### Running Locally

1. **Set up environment variables** in `application.properties`:

   ```properties
   auth0.domain=YOUR_AUTH0_DOMAIN
   auth0.audience=YOUR_AUTH0_API_IDENTIFIER
   auth0.issuer=YOUR_AUTH0_ISSUER
   ```

2. **Start the application**:

   ```bash
   ./gradlew bootRun
   ```

   The API will be available at `http://localhost:8080`.

### Docker Development

To run with Docker Compose:

```bash
docker compose up --build
```

The application will start in a container with configured services.

## API Endpoints

- `POST /api/user/creategameplay` - Start a new puzzle game
- `POST /api/user/updategameplay` - Update game with a guess
- `POST /api/user/updatescore` - Submit final score
- `GET /api/user/history` - Get game history for a puzzle
- `GET /api/user/stats` - Get user statistics

All endpoints require valid Auth0 JWT authentication.

## Auth0 Configuration

The application uses Auth0 for user authentication. JWT tokens are validated via Spring Security.

**Required Auth0 Claims**:

- `nickname` (preferred)
- `email` (fallback)
- `sub` (user ID, final fallback)

## Cloud Deployment

### Google Cloud Run

The backend is deployed to Google Cloud Run:

```bash
# Build and push Docker image
docker build --platform=linux/amd64 -t gcr.io/PROJECT_ID/subtle-solve .
docker push gcr.io/PROJECT_ID/subtle-solve

# Deploy to Cloud Run
gcloud run deploy subtle-solve --image gcr.io/PROJECT_ID/subtle-solve
```

### Daily Puzzle Generation

A Google Cloud Scheduler job runs nightly to:

1. Generate a new puzzle
2. Upload it to the database

The scheduler invokes the puzzle service endpoint directly.

## Project Structure

```
backend/
├── src/main/java/com/SubtleSolve/
│   ├── controller/          # REST API endpoints
│   ├── model/              # Entity models
│   ├── repository/         # Database repositories
│   ├── service/            # Business logic
│   └── security/           # Auth0 & JWT configuration
├── src/main/resources/     # Application configuration
├── build.gradle            # Gradle build configuration
└── Dockerfile              # Container image definition
```

## Testing

Run tests with:

```bash
./gradlew test
```

## References

- [Auth0 Java SDK](https://auth0.com/docs/get-started/auth0-overview)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Google Cloud Run](https://cloud.google.com/run)
- [Google Cloud Scheduler](https://cloud.google.com/scheduler)
