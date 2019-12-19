import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CustomHttp } from './custom_http/custom_http.service';
import { AppConstants } from '../helpers/app.constants';
import { map } from 'rxjs/operators';
import * as moment from 'moment-timezone';
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
    return this.http.get(AppConstants.GET_FAVORITES + '/' + userId + '/' + type)
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

  setItemInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItemFromLocalStorgae(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  getLoggedInUser() {
    return this.getItemFromLocalStorgae('loggedInUser');
  }

  setSignalDataForAlert(signal) {
    this.selectedSignalForAlert = signal;
  }

  getSignalDataForAlert() {
    return this.selectedSignalForAlert;
  }

  getUOMConversionData(body) {
    return this.http.post(AppConstants.UOM_CONVERSION, body);
  }

  getDateTimeInUserLocale(datetime) {
    const loggedInUser = this.getLoggedInUser();
    return moment(datetime).tz(loggedInUser.userConfigSettings[0].timeZoneDescription)
    .format(moment.localeData(loggedInUser.userConfigSettings[0].localeName)
      .longDateFormat('L')) + ' '
    + moment(datetime).tz(loggedInUser.userConfigSettings[0].timeZoneDescription)
      .format(moment.localeData(loggedInUser.userConfigSettings[0].localeName)
        .longDateFormat('LTS'));
  }


}
