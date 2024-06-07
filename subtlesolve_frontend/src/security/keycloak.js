import Keycloak from 'keycloak-js'
const keycloakConfig = {
  url: 'http://localhost:8089', 
  realm: 'SubtleSolveAuth', 
  clientId: 'subtle-solve-auth'
}
const keycloak = new Keycloak(keycloakConfig);
export default keycloak