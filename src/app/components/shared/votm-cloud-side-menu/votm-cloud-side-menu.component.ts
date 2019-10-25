import { Component, OnInit, ElementRef } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { MenuService } from '../../../services/menu/menu.service';

@Component({
  selector: 'app-votm-cloud-side-menu',
  templateUrl: './votm-cloud-side-menu.component.html',
  styleUrls: ['./votm-cloud-side-menu.component.scss']
})
export class VotmCloudSideMenuComponent implements OnInit {

  menuOpen: boolean;
  menuItems: Array<{ id: string, enabled: boolean, url: string, icon: string, name: string, childs?: any[] }>;
  activeItem: string;

  constructor(
    private menuService: MenuService,
    private sharedService: SharedService,
    private elemRef: ElementRef
  ) {
    this.sharedService.getMenuOpen().subscribe(newVal => this.menuOpen = newVal);
  }

  ngOnInit() {
    this.getMenu();
    this.activeItem = this.sharedService.getActiveMenu();
  }

  getMenu(): void {
    this.menuItems = this.menuService.getMenu();

    this.sharedService.favorites.subscribe(childs => {
      console.log('favorites ', childs);
      this.menuItems.forEach(item => {
        if (item.name === 'Favorites') {
          item.childs = [];
          childs.forEach(child=>{
            item.childs.push({enabled: true, url: child.url, name: child.favoriteName})
          })
          // item.childs = childs;
          
          console.log('MenuItem ', item);
        }
      });
    });
  }

  toggleMenu() {
    this.sharedService.setMenuOpen(!this.menuOpen);
  }

  setActiveItem(actItem: string) {
    const elem = this.elemRef.nativeElement.querySelectorAll('.dropdown-container')[0];
    console.log(elem);
    if (actItem !== 'admin' && actItem !== 'favorites') {
      this.sharedService.setActiveMenu(actItem);
      this.activeItem = this.sharedService.getActiveMenu();
      if (this.activeItem !== 'network' && this.activeItem !== 'user') {
        elem.classList.remove('display-block');
        elem.classList.add('display-none');
      }
    } else {
      if (!elem.classList.contains('display-block')) {
        elem.classList.add('display-block');
        elem.classList.remove('display-none');
      } else {
        elem.classList.remove('display-block');
        elem.classList.add('display-none');
      }
    }
  }
}
