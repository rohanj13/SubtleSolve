import Keycloak from 'keycloak-js'
const keycloakConfig = {
  url: 'https://www.subtlesolve.org', 
  realm: 'SubtleSolveAuth', 
  clientId: 'subtle-solve-auth'
}
const keycloak = new Keycloak(keycloakConfig);
export default keycloak
