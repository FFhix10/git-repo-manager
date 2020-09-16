import { Component, Input, OnInit } from '@angular/core';

import { DependencyForMainPage, RepositoriesForMainPage } from '../../../core/models';
import { LocalStorageService } from '../../../../../shared/services/local-storage.service';

@Component({
  selector: 'branches',
  templateUrl: './branches-row.component.html',
  styleUrls: ['./branches-row.component.scss']
})
export class BranchesRowComponent implements OnInit {
  branches: string;
  vcsService: string;
  dynamicClassName: string;

  @Input() baseBranchData: RepositoriesForMainPage[];
  @Input() compareBranchData: RepositoriesForMainPage[];

  constructor(private readonly lsService: LocalStorageService) {
    try {
      this.vcsService = this.lsService.getItem('vcs_service');
    } catch (e) {
      this.vcsService = '';
    }
  }


  ngOnInit(): void {
    if (!this.baseBranchData.length) {
      const compareBranch: DependencyForMainPage = Object.assign({}, ...this.compareBranchData);
      this.dynamicClassName = `text-${this.vcsService}-danger`;
      this.branches = compareBranch.branchName;

      return;
    }

    if (!this.compareBranchData.length) {
      const baseBranch: DependencyForMainPage = Object.assign({}, ...this.baseBranchData);
      this.dynamicClassName = `text-${this.vcsService}-danger`;
      this.branches = baseBranch.branchName;

      return;
    }

    const baseBranch: DependencyForMainPage = Object.assign({}, ...this.baseBranchData);
    const compareBranch: DependencyForMainPage = Object.assign({}, ...this.compareBranchData);

    this.branches = `<span>${baseBranch.branchName} &#8594; ${compareBranch.branchName}</span>`;
    return;
  }
}
