# ---- Build stage ----
FROM gradle:8.8.0-jdk17 AS build
WORKDIR /home/gradle/src
COPY --chown=gradle:gradle . .
RUN gradle clean build -x test --no-daemon

# ---- Runtime stage ----
FROM eclipse-temurin:17-jre

WORKDIR /app
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar

# Cloud Run sets PORT automatically; default locally is 8080
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]