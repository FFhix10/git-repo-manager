import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing.module';
import { HttpClientModule } from '@angular/common/http';

import { UserAuthorizationComponent } from './template/user-authorization.component';
import { AUTH_SERVICES } from './services';
import { CallbackComponent, VcsServiceButtonComponent } from './containers';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UserAuthorizationComponent,
    CallbackComponent,
    VcsServiceButtonComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers: AUTH_SERVICES
})

export class AuthModule {  }
