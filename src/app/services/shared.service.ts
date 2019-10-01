import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  menuOpen: BehaviorSubject<boolean>;
  activeMenu: string;

  constructor() {
    this.menuOpen = new BehaviorSubject(false);
    this.activeMenu = 'views';
  }

  getMenuOpen(): Observable<boolean> {
    return this.menuOpen.asObservable();
  }

  setMenuOpen(isOpen: boolean): void {
    this.menuOpen.next(isOpen);
  }

  getActiveMenu(): string {
    return this.activeMenu;
  }

  setActiveMenu(activeItem: string): void {
    this.activeMenu = activeItem;
  }
}
