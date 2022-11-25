import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {KeycloakService} from "./keycloak/keycloak.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'Keycloak POC';
  public authUrl: string | undefined;
  public realm: string | undefined;

  public response: any;

  public openIdConfig: any;

  public accessToken: string | undefined;
  public accessTokenParsed: any;

  public idToken: string | undefined;
  public idTokenParsed: any;

  public refreshToken: string | undefined;
  public refreshTokenParsed: any;

  constructor(private httpClient: HttpClient, private keycloakService: KeycloakService) {
    this.realm = this.keycloakService.getKeycloak().realm;
    this.authUrl = this.keycloakService.getKeycloak().authServerUrl;
  }

  public logout(): void {
    this.keycloakService.logout();
  }

  public printOpenIdConfig(): void {
    this.getKeycloakOpenIdConfig().subscribe(config => {
      this.openIdConfig = config;
    });
  }

  public clearOpenIdConfig(): void {
    this.openIdConfig = null;
  }

  public printTokens(): void {
    console.log('print tokens');

    this.keycloakService.getToken().then(token => {
      this.accessToken = token;
      this.accessTokenParsed = this.keycloakService.getKeycloak().tokenParsed;

      this.idToken = this.keycloakService.getKeycloak().idToken;
      this.idTokenParsed = this.keycloakService.getKeycloak().idTokenParsed;

      this.refreshToken = this.keycloakService.getKeycloak().refreshToken;
      this.refreshTokenParsed = this.keycloakService.getKeycloak().refreshTokenParsed;
    });
  }

  public clearTokens(): void {
    this.accessToken = undefined;
    this.accessTokenParsed = null;
    this.idToken = undefined;
    this.idTokenParsed = null;
    this.refreshToken = undefined;
    this.refreshTokenParsed = null;
  }

  public test(): void {
    console.log('test request');
    this.getTestRequest().subscribe(response => {
      console.log('test request response:', response);
      this.response = response;
    });
  }

  private getTestRequest(): Observable<any> {
    return this.httpClient.get(`${environment.serverUrl}/api/test`)
  }

  private getKeycloakOpenIdConfig(): Observable<any> {
    return this.httpClient.get(`${this.authUrl}/realms/${this.realm}/.well-known/openid-configuration`)
  }

}
