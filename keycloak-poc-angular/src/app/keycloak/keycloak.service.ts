import {Injectable} from '@angular/core';
import Keycloak, {KeycloakConfig, KeycloakInitOptions, KeycloakInstance} from "keycloak-js";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private readonly keycloak: KeycloakInstance;

  constructor() {
    const config: KeycloakConfig = {
      url: environment.keycloakUrl,
      realm: environment.keycloakRealm,
      clientId: environment.keycloakClientId,
    };
    this.keycloak = Keycloak(config);
  }

  public initialize(): Promise<boolean> {
    const options: KeycloakInitOptions = {
      onLoad: 'login-required',
      checkLoginIframe: false
    };
    return this.keycloak.init(options);
  }

  public getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.keycloak.token) {
        this.keycloak
          .updateToken(90)
          .then(() => this.keycloak.token ? resolve(this.keycloak.token) : reject('No token available'))
          .catch((error: any) => reject(error));
      } else {
        reject('Not logged in');
      }
    });
  }

  public logout(): void {
    this.keycloak.logout();
  }

  public getKeycloak(): KeycloakInstance {
    return this.keycloak;
  }

}
