import { Component, Input, OnInit } from '@angular/core';

import { DependencyForMainPage, RepositoriesForMainPage } from '../../../core/models';

@Component({
  selector: 'branches',
  templateUrl: './branches-row.component.html',
  styleUrls: ['./branches-row.component.scss']
})
export class BranchesRowComponent implements OnInit {
  branches: string;

  @Input() baseBranchData: RepositoriesForMainPage[];
  @Input() compareBranchData: RepositoriesForMainPage[];

  ngOnInit(): void {
    if (!this.baseBranchData) {
      const baseBranch: DependencyForMainPage = Object.assign({}, ...this.baseBranchData);
      this.branches = baseBranch.branchName;

      return;
    }

    if (!this.compareBranchData) {
      const compareBranch: DependencyForMainPage = Object.assign({}, ...this.compareBranchData);
      this.branches = compareBranch.branchName;

      return;
    }

    const baseBranch: DependencyForMainPage = Object.assign({}, ...this.baseBranchData);
    const compareBranch: DependencyForMainPage = Object.assign({}, ...this.compareBranchData);

    this.branches = `${baseBranch.branchName} --> ${compareBranch.branchName}`;
    return;
  }
}
