import { Component, OnInit } from '@angular/core';
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

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.getMenu();
    this.activeItem = 'views';    
  }

  getMenu(): void {
    this.menuItems = this.menuService.getMenu();
  }

}
