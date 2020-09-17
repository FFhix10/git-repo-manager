import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../shared/settings/states/settings.service';

@Component({
  selector: 'app-root',
  template: `
    <loading-spinner></loading-spinner>
    <notifications></notifications>
    <router-outlet></router-outlet>
  `
})

export class RootComponent implements OnInit {

  constructor(private readonly settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings();
  }
}
