import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <loading-spinner></loading-spinner>
    <notifications></notifications>
    <router-outlet></router-outlet>
  `
})

export class RootComponent {}
