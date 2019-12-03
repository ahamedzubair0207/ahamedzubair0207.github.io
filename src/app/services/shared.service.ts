import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CustomHttp } from './custom_http/custom_http.service';
import { AppConstants } from '../helpers/app.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  menuOpen: BehaviorSubject<boolean>;
  activeMenu: string;
  public favorites: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  selectedSignalForAlert: any;

  constructor(private http: CustomHttp) {
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

  getFavorites() {
    const userId = '03c7fb47-58ee-4c41-a9d6-2ad0bd43392a';
    const type = 'user';
    this.http.get(AppConstants.GET_FAVORITES + '/' + userId + '/' + type)
      .pipe(
        map(response => response)
      ).subscribe(response => {
        this.favorites.next(response);
      });
  }

  postFavorites(body: any) {
    return this.http.post(AppConstants.POST_FAVORITES, body)
      .pipe(
        map(response => response)
      );
  }

  patchFavorites(body: any) {
    return this.http.patch(AppConstants.PATCH_FAVORITES, body)
      .pipe(
        map(response => response)
      );
  }

  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  toSortListAlphabetically(list, key) {
    return (list.sort((a, b) => {
      if (a[key].toLowerCase() < b[key].toLowerCase()) { return -1; }
      if (a[key].toLowerCase() > b[key].toLowerCase()) { return 1; }
      return 0;
    }));
  }

  getLoggedInUser() {

    const loggedInUserData = {
      userId: '03c7fb47-58ee-4c41-a9d6-2ad0bd43392a',
      organizationId : '7a59bdd8-6e1d-48f9-a961-aa60b2918dde',
      userName: 'Sean Haley'
    };
    return loggedInUserData;
  }

  setSignalDataForAlert(signal) {
    this.selectedSignalForAlert = signal;
  }

  getSignalDataForAlert() {
    return this.selectedSignalForAlert;
  }


}
