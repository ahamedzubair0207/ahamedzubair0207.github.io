import { Injectable } from '@angular/core';
import { MENU_ITEMS } from '../mock/mock-menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenu(): Array<{ id: string, enabled: boolean, url: string, icon: string, name: string}> {
    return MENU_ITEMS;
  }
}
