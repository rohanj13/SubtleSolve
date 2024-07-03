import Keycloak from 'keycloak-js'
const keycloakConfig = {
  url: 'https://localhost:8443', 
  realm: 'SubtleSolveAuth', 
  clientId: 'subtle-solve-auth'
}
const keycloak = new Keycloak(keycloakConfig);
export default keycloak