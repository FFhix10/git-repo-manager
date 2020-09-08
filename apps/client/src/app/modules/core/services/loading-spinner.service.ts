import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingSpinnerService {
  state = false;

  show(): void {
    this.state = true;
  }

  hide(): void {
    this.state = false;
  }
}
