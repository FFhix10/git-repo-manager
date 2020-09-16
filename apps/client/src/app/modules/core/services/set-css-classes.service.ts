import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SetCssClassesService {

  setBackgroundDanger(className: string, idName: string, index: number): void {
    const element = document.getElementById(idName + index);
    /*  element.classList.add(className);*/
  }
}
