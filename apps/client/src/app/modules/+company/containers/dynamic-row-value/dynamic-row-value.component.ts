import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DependencyForMainPage } from '../../../core/models';
import { compareVersions } from '../../../core/functions';
import { LocalStorageService } from '../../../../../shared/services/local-storage.service';

@Component({
  selector: 'dynamic-row-value',
  templateUrl: './dynamic-row-value.component.html',
  styleUrls: ['./dynamic-row-value.component.scss']
})
export class DynamicRowValueComponent implements OnInit {
  result: string;
  vcsService: string;

  @Input() baseBranchData: DependencyForMainPage[];
  @Input() compareBranchData: DependencyForMainPage[];
  @Input() dependency: string;
  @Input() isRequired: boolean;
  @Input() minVersion: string;

  constructor(private readonly lsService: LocalStorageService) {
    try {
      this.vcsService = this.lsService.getItem('vcs_service');
    } catch (e) {
      this.vcsService = '';
    }
  }

  ngOnInit(): void {
    let notAvailableClass = this.isRequired ? `text-${this.vcsService}-danger` : '';
    let compareVersionClass = '';
    if (!this.baseBranchData || !this.baseBranchData.length) {
      const compareBranchDependency = this.compareBranchData.find(item => item.name === this.dependency);

      if (!compareBranchDependency || !compareBranchDependency.value.length) {
        this.result = `<span class="${notAvailableClass}">N/A</span>`;

        return;
      }

      if (this.minVersion) {
        compareVersionClass = compareVersions(compareBranchDependency.value, this.minVersion)
          ? `text-${this.vcsService}-danger`
          : '';
      }

      this.result = `<span class="${notAvailableClass}">N/A</span> &#8594; <span class="${compareVersionClass}">${compareBranchDependency.value}</span>`;

      return;
    }

    if (!this.compareBranchData || !this.compareBranchData.length) {
      const baseBranchDependency = this.baseBranchData.find(item => item.name === this.dependency);

      if (!baseBranchDependency || !baseBranchDependency.value.length) {
        this.result = `<span class="${notAvailableClass}">N/A</span>`;

        return;
      }

      if (this.minVersion) {
        compareVersionClass = compareVersions(baseBranchDependency.value, this.minVersion)
          ? `text-${this.vcsService}-danger`
          : '';
      }

      this.result = `<span class="${compareVersionClass}">${baseBranchDependency.value}</span> &#8594; <span class="${notAvailableClass}">N/A</span>`;

      return;
    }

    const baseBranchDependency = this.baseBranchData.find(item => item.name === this.dependency);
    const compareBranchDependency = this.compareBranchData.find(item => item.name === this.dependency);

    if (
      (!baseBranchDependency || !baseBranchDependency.value.length)
      && (!compareBranchDependency || !compareBranchDependency.value.length)
    ) {
      this.result = `<span class="${notAvailableClass}">N/A</span>`;

      return;
    }

    if (!baseBranchDependency || !baseBranchDependency.value.length) {
      if (this.minVersion) {
        compareVersionClass = compareVersions(compareBranchDependency.value, this.minVersion)
          ? `text-${this.vcsService}-danger`
          : '';
      }

      this.result = `<span class="${notAvailableClass}">N/A</span> &#8594; <span class="${compareVersionClass}">${compareBranchDependency.value}</span>`;

      return;
    }

    if (!compareBranchDependency || !compareBranchDependency.value.length) {
      if (this.minVersion) {
        compareVersionClass = compareVersions(baseBranchDependency.value, this.minVersion)
          ? `text-${this.vcsService}-danger`
          : '';
      }

      this.result = `<span class="${compareVersionClass}">${baseBranchDependency.value}</span> &#8594; <span class="${notAvailableClass}">N/A</span>`;

      return;
    }

    if (baseBranchDependency.value === compareBranchDependency.value) {
      this.result = `<span>${baseBranchDependency.value}</span>`;

      return;
    }

    let compareVersionBase = '';
    let compareVersionCompare = '';

    if (this.minVersion) {
      compareVersionBase = compareVersions(baseBranchDependency.value, this.minVersion)
        ? `text-${this.vcsService}-danger`
        : '';

      compareVersionCompare = compareVersions(compareBranchDependency.value, this.minVersion)
        ? `text-${this.vcsService}-danger`
        : '';
    }

    this.result = `<span class="${compareVersionBase}">${baseBranchDependency.value}</span> &#8594; <span class="${compareVersionCompare}">${compareBranchDependency.value}</span>`;

    return;
  }

  isTooltipDisabled(length: number): boolean {
    return length < 16;
  }
}
