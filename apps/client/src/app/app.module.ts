import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RootComponent } from './root.component';
import { AppRoutingModule } from './app-routing.module';
import { NotificationModule } from '../shared/notifications/notification.module';
import { AuthService } from './modules/auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

import { AuthReducer } from '../shared/store/reducers/auth.reducer';
import { WarningsReducer } from '../shared/store/reducers/warnings.reducer';
import { StoreModule } from '@ngrx/store';
import { DataService } from '../shared/services/data.service';
import { RepositoriesDataService } from '../shared/services/repositories-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NotificationModule,
    HttpClientModule,
    StoreModule.forRoot({
      'auth': AuthReducer,
      'warnings': WarningsReducer
    }),
  ],
  providers: [ AuthService, DataService, RepositoriesDataService ],
  bootstrap: [ RootComponent ]
})
export class AppModule { }
