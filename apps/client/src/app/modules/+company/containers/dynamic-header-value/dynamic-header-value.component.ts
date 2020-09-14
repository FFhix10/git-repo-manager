import { Component, Input } from '@angular/core';

@Component({
  selector: 'dynamic-header-value',
  templateUrl: './dynamic-header-value.component.html',
  styleUrls: ['./dynamic-header-value.component.scss']
})
export class DynamicHeaderValueComponent {
  header: string;

  @Input() name: string;
  @Input() isRequired: boolean;
  @Input() set minVersion(minVersion: string) {
    if (!minVersion) {
      this.header = this.name;
      return;
    }

    if (this.isRequired) {
      this.header = `${this.name}*: ${minVersion}`;
      return;
    }

    this.header = `${this.name}: ${minVersion}`;
    return;
  }
}
