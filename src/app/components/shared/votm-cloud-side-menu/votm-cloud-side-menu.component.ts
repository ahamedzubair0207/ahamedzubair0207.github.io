import { Component, OnInit, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { MenuService } from '../../../services/menu/menu.service';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-votm-cloud-side-menu',
  templateUrl: './votm-cloud-side-menu.component.html',
  styleUrls: ['./votm-cloud-side-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VotmCloudSideMenuComponent implements OnInit {

  menuOpen: boolean;
  menuItems: Array<{ id: string, enabled: boolean, url: string, icon: string, name: string, childs?: any[] }>;
  activeItem: string;
  orgFlag = false;
  locFlag = false;
  assetFlag = false;
  adminFlag = false;
  constructor(
    private menuService: MenuService,
    private sharedService: SharedService,
    private elemRef: ElementRef,
    private router: Router
  ) {
    this.sharedService.getMenuOpen().subscribe(newVal => this.menuOpen = newVal);
  }

  ngOnInit() {
    this.getMenu();
    this.activeItem = this.sharedService.getActiveMenu();
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(
      () => {
      const url = this.router.url;
      console.log(url.includes('/org/'));
      this.orgFlag = false;
      this.locFlag = false;
      this.assetFlag = false;
      this.adminFlag = false;
      if (url.includes('/org/')) {
        this.orgFlag = true;
      } else if (url.includes('/loc/')) {
        this.locFlag = true;
      } else if (url.includes('/asset/')) {
        this.assetFlag = true;
      } else if (url.includes('admin')) {
        this.adminFlag = true;
      }
    });
  }


  setActiveClass(item) {
    if (this.orgFlag && item.id === 'organizations') {
      return 'active';
    } else if (this.locFlag && item.id === 'locations') {
      return 'active';
    } else if (this.assetFlag && item.id === 'assets') {
      return 'active';
    } else if (item.id === 'admin') {
      return 'active';
    }
    return '';
  }

  getMenu(): void {
    this.menuItems = this.menuService.getMenu();

    this.sharedService.favorites.subscribe(childs => {
      this.menuItems.forEach(item => {
        if (item.name === 'Favorites') {
          item.childs = [];
          childs.forEach(child => {
            let url: string = child.url;
            let fragment;
            if (url.indexOf('#') >= 0) {
              fragment = url.split('#')[1];
              url = url.split('#')[0];
            }
            // pass fragment separately

            item.childs.push({ enabled: true, url: url, fragment: fragment, name: child.favoriteName, icon: 'menu-icon icon-star' });
          })
          // item.childs = childs;
          console.log('item ', item)
        }
      });
    });
  }

  toggleMenu() {
    this.sharedService.setMenuOpen(!this.menuOpen);
  }

  setActiveItem(actItem: string) {
    // console.log(elem);
    if (actItem !== 'admin' && actItem !== 'favorites') {
      this.sharedService.setActiveMenu(actItem);
      this.activeItem = this.sharedService.getActiveMenu();
      if (this.activeItem !== 'network' && this.activeItem !== 'user') {
        const elem = this.elemRef.nativeElement.querySelectorAll('.dropdown-container')[0];
        elem.classList.remove('display-block');
        elem.classList.add('display-none');
      }
    } else {
      let elements: any[] = this.elemRef.nativeElement.querySelectorAll('.dropdown-container');
      let elem;
      elements.forEach((element, i) => {
        if (element.id === actItem) {
          elem = element;
        }
      });
      if (elem) {
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
}
