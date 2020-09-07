import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing.module';
import { HttpClientModule } from '@angular/common/http';

import { UserAuthorizationComponent } from './template/user-authorization.component';
import { AUTH_SERVICES } from './services';
import { CallbackComponent } from './containers';

@NgModule({
  declarations: [ UserAuthorizationComponent, CallbackComponent ],
  imports: [
    HttpClientModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers: AUTH_SERVICES
})

export class AuthModule {  }
