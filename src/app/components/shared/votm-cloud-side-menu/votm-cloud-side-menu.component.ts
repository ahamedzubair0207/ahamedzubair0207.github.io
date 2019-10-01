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
  menuItems: Array<{ id: string, enabled: boolean, url: string, icon: string, name: string}>;
  activeItem: string;

  constructor(private menuService: MenuService, private sharedService: SharedService, 
    private elemRef: ElementRef) { 
    this.sharedService.getMenuOpen().subscribe(newVal => this.menuOpen = newVal); 
  }

  ngOnInit() {
    this.getMenu();    
    this.activeItem = this.sharedService.getActiveMenu();
  }

  getMenu(): void {
    this.menuItems = this.menuService.getMenu();
  }

  toggleMenu(){
    this.sharedService.setMenuOpen(!this.menuOpen);
  }

  setActiveItem(actItem: string){
    const elem = this.elemRef.nativeElement.querySelectorAll('.dropdown-container')[0];
    console.log(elem);
    if (actItem !== 'admin') {
    this.sharedService.setActiveMenu(actItem);
    this.activeItem = this.sharedService.getActiveMenu();
    elem.classList.remove('display-block');
    elem.classList.add('display-none');
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
