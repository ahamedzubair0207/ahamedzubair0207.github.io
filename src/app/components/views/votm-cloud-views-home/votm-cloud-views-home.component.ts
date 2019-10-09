import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-votm-cloud-views-home',
  templateUrl: './votm-cloud-views-home.component.html',
  styleUrls: ['./votm-cloud-views-home.component.scss']
})
export class VotmCloudViewsHomeComponent implements OnInit {

  isAuthenticated: boolean;

  userName: string;

  constructor(public oktaAuth: OktaAuthService) 
  {
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated)
 

   }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name;
    }
  }

  logout() {
    this.oktaAuth.logout('/');
  }

}
