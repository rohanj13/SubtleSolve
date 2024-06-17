import Keycloak from 'keycloak-js'
const keycloakConfig = {
  url: 'http://140.238.195.136:8080', 
  realm: 'SubtleSolveAuth', 
  clientId: 'subtle-solve-auth'
}
const keycloak = new Keycloak(keycloakConfig);
export default keycloak