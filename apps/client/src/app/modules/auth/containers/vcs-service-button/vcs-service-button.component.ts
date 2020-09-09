import { Component, EventEmitter, Input, Output } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { VcsServicesNames } from '../../../core/models';

@Component({
  selector: 'vcs-service',
  templateUrl: './vcs-service-button.component.html',
  styleUrls: ['./vcs-service-button.component.scss']
})

export class VcsServiceButtonComponent {
  private name: string;
  private alias: string;

  @Output() readonly authenticateVia = new EventEmitter<string>();
  @Input() set vcsServiceName(name: string) {
    this.alias = name;

    switch (name) {
      case VcsServicesNames.GITHUB:
        this.name = 'GitHub';
        break;

      case VcsServicesNames.GITLAB:
        this.name = 'GitLab';
        break;

      default:
        this.name = undefined;
        break;
    }
  }

  selectVscServiceToAuth(vcsService: string): void {
    let url: string;

    switch (vcsService) {
      case VcsServicesNames.GITHUB:
        url = `${environment.url}/api/${vcsService}/login`;
        break;

      default:
        return undefined;
    }

    this.authenticateVia.emit(url);
  }
}
