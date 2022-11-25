import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {KeycloakService} from "./keycloak/keycloak.service";
import {KeycloakInterceptor} from "./keycloak/keycloak.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

export const init = (keycloakService: KeycloakService): any => () => keycloakService.initialize();

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: init, deps: [KeycloakService], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: KeycloakInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
