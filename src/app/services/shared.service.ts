import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  menuOpen: BehaviorSubject<boolean>;

  constructor() { 
    this.menuOpen = new BehaviorSubject(false);;
  }

  getMenuOpen(): Observable<boolean>{
    return this.menuOpen.asObservable();
  }

  setMenuOpen(isOpen : boolean): void{
    this.menuOpen.next(isOpen);
  }
}
