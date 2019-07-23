import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'votm-cloud';
  menuOpen: boolean;
  router: Router;
  constructor(router: Router, private sharedService: SharedService) { 
    this.router = router;
    this.sharedService.getMenuOpen().subscribe(newVal => this.menuOpen = newVal); 
   }
}
