import { Component, Input } from '@angular/core';

import { DependencyForMainPage } from '../../../core/models';

@Component({
  selector: 'dynamic-row-value',
  templateUrl: './dynamic-row-value.component.html',
  styleUrls: ['./dynamic-row-value.component.scss']
})
export class DynamicRowValueComponent {
  result: string;

  @Input() baseBranchData: DependencyForMainPage[];
  @Input() compareBranchData: DependencyForMainPage[];
  @Input() dependency: string;
  @Input() isRequired: boolean;
  @Input() set minVersion(minVersion: string) {
    if (!this.baseBranchData) {
      const compareBranchDependency = this.compareBranchData.find(item => item.name === this.dependency);

      if (!compareBranchDependency || !compareBranchDependency.value.length) {
        this.result = 'N/A';

        return;
      }

      this.result = `N/A --> ${compareBranchDependency.value}`;

      return;
    }

    if (!this.compareBranchData) {
      const baseBranchDependency = this.baseBranchData.find(item => item.name === this.dependency);

      if (!baseBranchDependency || !baseBranchDependency.value.length) {
        this.result = 'N/A';

        return;
      }

      this.result = `${baseBranchDependency.value} --> N/A`;

      return;
    }

    const baseBranchDependency = this.baseBranchData.find(item => item.name === this.dependency);
    const compareBranchDependency = this.compareBranchData.find(item => item.name === this.dependency);

    if (
      (!baseBranchDependency || !baseBranchDependency.value.length)
      && (!compareBranchDependency || !compareBranchDependency.value.length)
    ) {
      this.result = 'N/A';

      return;
    }

    if (!baseBranchDependency || !baseBranchDependency.value.length) {
      this.result = `N/A --> ${compareBranchDependency.value}`;

      return;
    }

    if (!compareBranchDependency || !compareBranchDependency.value.length) {
      this.result = `${baseBranchDependency.value} --> N/A`;

      return;
    }

    this.result = `${baseBranchDependency.value} --> ${compareBranchDependency.value}`;
    return;
  }
}
