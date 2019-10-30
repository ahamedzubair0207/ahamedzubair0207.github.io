import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './services/shared.service';
import { OktaAuthService } from '@okta/okta-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'votm-cloud';
  menuOpen: boolean;
  router: Router;
  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService, router: Router, private sharedService: SharedService) {
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated)
    this.router = router;
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
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    this.sharedService.getFavorites();

    this.sharedService.favorites.subscribe(response=>{
      console.log('response favorites ', response);
    })
  }
  logout() {
    this.oktaAuth.logout('/');
  }
}
