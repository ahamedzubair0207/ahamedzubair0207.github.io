import { Injectable } from '@angular/core';
import { MENU_ITEMS } from '../mock/mock-menu';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private sharedService: SharedService) { }

  getMenu(): Array<{ id: string, enabled: boolean, url: string, icon: string, name: string }> {
    // let menuItems = MENU_ITEMS;
    // menuItems.forEach(item => {
    //   if (item.name === 'Favorites') {
    //     this.sharedService.favorites.subscribe(childs => {
    //       item.childs = childs;
    //     });
    //   }
    // });

    return MENU_ITEMS;
  }
}
