import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Location as RouterLocation } from '@angular/common';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-votm-cloud-header',
  templateUrl: './votm-cloud-header.component.html',
  styleUrls: ['./votm-cloud-header.component.scss']
})
export class VotmCloudHeaderComponent implements OnInit {


  isAuthenticated: boolean;
  userName: string;
  token: any;
  menuOpen: boolean;
  favoriteName: string;
  favoriteCount: number;
  toaster: Toaster = new Toaster(this.toastr);
  modal: any;
  favorites: any[] = [];
  currentFavorite: any = {};
  previousFavoriteName: string = '';

  logout() {
    this.oktaAuth.logout('/login');
  }

  constructor(private sharedService: SharedService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private routerLocation: RouterLocation,
    public router: Router,
    public oktaAuth: OktaAuthService) {
    this.sharedService.getMenuOpen().subscribe(newVal => this.menuOpen = newVal);
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated)

  }

  async ngOnInit() {

    this.token = sessionStorage.getItem('token');
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name;
    }
  }

  toggleMenu() {
    this.sharedService.setMenuOpen(!this.menuOpen);
  }

  onFavoriteSubmit() {
    console.log('this.favoriteName, ', this.favoriteName);
    console.log('this.router ', this.router.url);

    // let body = {
    //   'userId': '03c7fb47-58ee-4c41-a9d6-2ad0bd43392a',
    //   'url': this.router.url,
    //   'favoriteName': this.currentFavorite.favoriteName
    //   // 'favoriteOrder':12
    // }

    if (this.currentFavorite && this.currentFavorite.userFavoriteId) {
      this.sharedService.patchFavorites(this.currentFavorite)
        .subscribe(response => {
          console.log('post result ', response);
          this.toaster.onSuccess('Favorite name updated successfully.', 'Updated');
          this.sharedService.getFavorites();
          this.currentFavorite = {};
          // this.routerLocation.back();
        });
    } else {
      this.sharedService.postFavorites(this.currentFavorite)
        .subscribe(response => {
          console.log('post result ', response);
          this.toaster.onSuccess('Successfully Added to the Favorites', 'Added');
          this.sharedService.getFavorites();
          this.currentFavorite = {};
          this.previousFavoriteName = '';
          // this.routerLocation.back();
        });
    }
  }

  openmodal() {

    this.sharedService.favorites.subscribe(favs => {
      this.favorites = favs;
      this.currentFavorite = { 'userId': '03c7fb47-58ee-4c41-a9d6-2ad0bd43392a', 'url': this.router.url, 'favoriteName': '' };
      if (favs && favs.length > 0) {
        favs.forEach(favorite => {
          if (this.router.url === favorite.url) {
            this.currentFavorite = favorite;
          }
        });
      }
      this.previousFavoriteName = this.currentFavorite.favoriteName;
    });

    // Get the modal
    var modal = document.getElementById('favModal');
    modal.style.display = 'block';
    this.modal = document.getElementById('favModal');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        // modal.style.display = 'none';
      }
    };

  }

  closemodal(event: string) {
    this.modal.style.display = 'none';
    if (event === 'save') {
      this.onFavoriteSubmit();
    }
  }
}
