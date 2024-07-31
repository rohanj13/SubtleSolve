# Use the Keycloak base image
FROM quay.io/keycloak/keycloak:24.0.4

# Set environment variables
ENV KC_HTTP_ENABLED=true
ENV KC_DB=postgres
ENV KC_DB_URL=jdbc:postgresql://postgres:5432/keycloak_db?ssl=allow
ENV KC_DB_USERNAME=keycloak_db_user
ENV KC_DB_PASSWORD=password
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=password
ENV KC_HOSTNAME_ADMIN_URL=https://auth.subtlesolve.org
ENV KC_HOSTNAME_URL=https://auth.subtlesolve.org
ENV KC_PROXY=edge

# Install "Remember Me" authenticator
ADD --chown=keycloak:keycloak https://github.com/Herdo/keycloak-remember-me-authenticator/releases/download/v1.0.0/keycloak-remember-me-authenticator-1.0.0.jar /opt/keycloak/providers/keycloak-remember-me-authenticator-1.0.0.jar

# Build Keycloak with custom provider
RUN /opt/keycloak/bin/kc.sh build

# Command to run the Keycloak server in development mode
CMD ["start-dev"]

# Expose ports
EXPOSE 8080
EXPOSE 8443
