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
export class VotmCloudSideMenuComponent implements OnInit, AfterViewInit {

  menuOpen: boolean;
  menuItems: Array<{ id: string, enabled: boolean, url: string, icon: string, name: string, childs?: any[] }>;
  activeItem: string;
  selectedTab = 'organizations';
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
      if (url.includes('/org/')) {
        this.selectedTab = 'organizations';
      } else if (url.includes('/loc/')) {
        this.selectedTab = 'locations';
      } else if (url.includes('/asset/')) {
        this.selectedTab = 'assets';
      } else if (url.includes('admin')) {
        this.selectedTab = 'admin';
      } else {
        this.selectedTab = undefined;
      }
    });

  }

  ngAfterViewInit() {

  }


  setActiveClass(item) {
    console.log('hereeeeeeeeeeeeee')

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
