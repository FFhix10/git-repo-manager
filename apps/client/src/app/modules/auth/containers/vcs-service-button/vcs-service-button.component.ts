import { Component, Input } from '@angular/core';

import { VcsServicesNames } from '../../../../../../../server/src/modules/shared/models';

@Component({
  selector: 'vcs-service',
  templateUrl: './vcs-service-button.component.html',
  styleUrls: ['./vcs-service-button.component.scss']
})

export class VcsServiceButtonComponent {
  private name: string;
  private alias: string;

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
}
