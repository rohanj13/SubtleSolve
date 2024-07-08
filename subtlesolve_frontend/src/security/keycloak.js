import Keycloak from 'keycloak-js'
const keycloakConfig = {
  url: 'https://www.subtlesolve.org/auth', 
  realm: 'SubtleSolveAuth', 
  clientId: 'subtle-solve-auth'
}
const keycloak = new Keycloak(keycloakConfig);
export default keycloak