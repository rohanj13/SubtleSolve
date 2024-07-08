import Keycloak from 'keycloak-js'
const keycloakConfig = {
  url: 'http://keycloak_container:8080', 
  realm: 'SubtleSolveAuth', 
  clientId: 'subtle-solve-auth'
}
const keycloak = new Keycloak(keycloakConfig);
export default keycloak