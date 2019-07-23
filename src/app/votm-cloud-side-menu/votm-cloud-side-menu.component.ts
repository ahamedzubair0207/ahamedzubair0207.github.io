import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { MenuService } from '../services/menu/menu.service';

@Component({
  selector: 'app-votm-cloud-side-menu',
  templateUrl: './votm-cloud-side-menu.component.html',
  styleUrls: ['./votm-cloud-side-menu.component.scss']
})
export class VotmCloudSideMenuComponent implements OnInit {

  menuOpen: boolean;
  menuItems: Array<{ id: string, enabled: boolean, url: string, icon: string, name: string}>;
  activeItem: string;

  constructor(private menuService: MenuService, private sharedService: SharedService) { 
    this.sharedService.getMenuOpen().subscribe(newVal => this.menuOpen = newVal); 
  }

  ngOnInit() {
    this.getMenu();
    this.activeItem = 'views';    
  }

  getMenu(): void {
    this.menuItems = this.menuService.getMenu();
  }

  toggleMenu(){
    this.sharedService.setMenuOpen(!this.menuOpen);
  }

}
