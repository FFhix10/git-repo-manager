import { Controller, Get } from '@nestjs/common';

import { SettingsService } from '../services';
import { Settings } from '../models';

@Controller('api/settings')
export class SettingsController {

  constructor(private readonly settingsService: SettingsService) {}

  @Get('')
  getSettings(): Promise<Settings[]> {
    return this.settingsService.getSettings();
  }
}
