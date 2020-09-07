import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAuthorizationComponent } from './template/user-authorization.component';
import { CallbackComponent } from './containers';

export const userAuthorizationRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: UserAuthorizationComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(userAuthorizationRoutes) ],
  exports: [ RouterModule ]
})

export class AuthRoutingModule {  }
