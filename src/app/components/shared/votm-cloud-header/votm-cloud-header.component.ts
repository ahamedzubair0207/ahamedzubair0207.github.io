import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-votm-cloud-header',
  templateUrl: './votm-cloud-header.component.html',
  styleUrls: ['./votm-cloud-header.component.scss']
})
export class VotmCloudHeaderComponent implements OnInit {


  isAuthenticated: boolean;
  userName: string;
  token:any;
  menuOpen: boolean;

  logout() 
  {
    this.oktaAuth.logout('/login');
  }

  constructor( private sharedService: SharedService, public router: Router,public oktaAuth: OktaAuthService) 
  { 
    this.sharedService.getMenuOpen().subscribe(newVal => this.menuOpen = newVal);
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated)
 
   }
    
  async ngOnInit() 
  {

    this.token = sessionStorage.getItem('token');
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) 
    {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name;
    }
  }

  toggleMenu() {
    this.sharedService.setMenuOpen(!this.menuOpen);
  }
}
