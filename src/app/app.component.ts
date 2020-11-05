import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedService } from './services/shared.service';
import { OktaAuthService } from '@okta/okta-angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'votm-cloud';
  menuOpen: boolean;
  isAuthenticated: boolean;
  // loggedInUserData = {
  //   userId: '03c7fb47-58ee-4c41-a9d6-2ad0bd43392a',
  //   organizationId : '7a59bdd8-6e1d-48f9-a961-aa60b2918dde',
  //   userName: 'Sean Haley',
  //   userConfigSettings: [
  //     {
  //       localeId: '3c10d7d2-c95a-4c16-bb51-44a80ec63fba',
  //       localeName: 'de-de',
  //       timeZoneDescription: 'America/New_York'
  //     }
  //   ]
  // };
  userFavourites: any[] = [];
  constructor(public oktaAuth: OktaAuthService, public router: Router, private sharedService: SharedService) {
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated)
    this.sharedService.getMenuOpen().subscribe(newVal => this.menuOpen = newVal);
    if (FileReader.prototype.readAsBinaryString === undefined) {
      FileReader.prototype.readAsBinaryString = function (fileData) {
        let binary = '';
        let pt = this;
        let reader = new FileReader();
        reader.onload = function (e) {
          let bytes = new Uint8Array(<ArrayBuffer>reader.result);
          let length = bytes.byteLength;
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          // pt.result  - readonly so assign content to another property
          pt.content = binary;
          pt.onload(); // thanks to @Denis comment
        };
        reader.readAsArrayBuffer(fileData);
      };
    }
  }

  async ngOnInit() {
    // if (!this.sharedService.getItemFromLocalStorgae('loggedInUser')) {
    //   this.sharedService.setItemInLocalStorage('loggedInUser', this.loggedInUserData);
    // }
    // this.router.events.pipe(
    //   filter(e => e instanceof NavigationEnd)
    // ).subscribe( () => {
    //   if (this.router.url !== '/login') {
    //     this.sharedService.getFavorites();
    //   }
    // });
    // console.log('user', this.sharedService.getItemFromLocalStorgae('loggedInUser'));
    // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }
  logout() {
    this.oktaAuth.logout('/');
  }
}
