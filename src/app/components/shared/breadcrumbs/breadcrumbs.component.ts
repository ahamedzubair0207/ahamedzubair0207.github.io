import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent {
  pageType: any;
  orgId: string;
  currentUrl: string;
  breadcrumbs: any[];
  locBreadcrumbs: any[];
  assetBreadcrumbs: any[];
  locId: string;
  assetId: string; //Asset Bread Crumbs
  orgName: string;
  parentOrgId: string;
  mainOrganizationId: string;
  mainOrganizationName: string;
  constructor(private router: Router, private activeroute: ActivatedRoute, private navigationService: NavigationService) {
    router.events.pipe(
      filter(e => e instanceof RouterEvent)
    ).subscribe((e: any) => {
      if (this.currentUrl !== e.url) {
        this.currentUrl = e.url;
        this.getData();
      }
    });
  }

  getData() {
    this.mainOrganizationId = '7a59bdd8-6e1d-48f9-a961-aa60b2918dde';
    this.mainOrganizationName = 'VOTM';
    // if (this.currentUrl.startsWith(`/org/home`)) {
    //   let parts = this.currentUrl.split('/');
    //   //console.log('parts ', parts)
    //   this.orgId = parts[3];
    //   this.pageType = 'Organization';
    //   this.breadcrumbs = [];
    //   this.breadcrumbs.push({ name: parts[4], nodes: [] });
    //   // this.loadOrganizations(this.orgId);
    // } else 
    if (this.currentUrl.startsWith(`/org/edit`) || this.currentUrl.startsWith(`/org/view`)) {
      let parts = this.currentUrl.split('/');
      //console.log('parts ', parts)
      this.orgId = parts[5];
      this.orgName = parts[4];
      //console.log('Inside ', this.orgId)
      this.pageType = 'Organization';
      this.parentOrgId = parts[3];
      this.breadcrumbs = [];
      // if (this.orgId.toLowerCase() === this.parentOrgId.toLowerCase()) {
      //   this.breadcrumbs.push({ name: parts[4], nodes: [] });
      // } else {
      this.loadOrganizations(this.orgId);
      // }
    }
    else if (this.currentUrl.startsWith(`/loc/edit`) || this.currentUrl.startsWith(`/loc/view`)) {
      let parts = this.currentUrl.split('/');
      if (parts.length >= 7) {
        this.orgId = parts[5];
        this.locId = parts[7];
      } else {
        this.orgId = parts[3];
        this.locId = parts[5];
      }
      this.pageType = 'Location';
      this.breadcrumbs = [];
      this.loadOrganizations(this.orgId);
    }
    else if (this.currentUrl.startsWith(`/asset/view`) || this.currentUrl.startsWith(`/asset/edit`)) {
      let parts = this.currentUrl.split('/');
      this.orgId = parts[3];
      this.locId = parts[5];
      this.pageType = 'Asset';
      this.breadcrumbs = [];
      // this.loadOrganizations(this.orgId);
    } else {
      this.pageType = '';
      this.breadcrumbs = [];
      this.loadOrganizations(this.mainOrganizationId);
      // this.breadcrumbs.push({ name: this.mainOrganizationName, nodes: [] });
    }
  }

  getUniqueValues(values: any[]) {
    return values.filter((value, index) => {
      return index === values.findIndex(obj => {
        return JSON.stringify(obj) === JSON.stringify(value);
      });
    });
  }

  loadOrganizations(orgId: string) {
    console.log('orgid ', orgId)
    this.navigationService.getAllSibling('Organization', orgId)
      .subscribe(response => {
        if (response && response.length > 0) {
          response = this.getUniqueValues(response);
          let childFound: boolean = false;
          for (let i = 0; i < response.length; i++) {

            if (response[i].id.toLowerCase() === orgId.toLowerCase()) {
              console.log('AHAMED ', response[i].name)
              this.breadcrumbs.push({ name: response[i].name, nodes: response });
              if (response[i].parentId) {
                console.log('Came to check Parent Id', orgId, (response[i].parentId))
                this.loadOrganizations(response[i].parentId);
              } else {
                // this.breadcrumbs.push({ name: this.orgName, nodes: response });
                this.breadcrumbs.reverse();
                if (this.pageType === 'Location' || this.pageType === 'Asset') {
                  this.locBreadcrumbs = [];
                  if (this.locId) {
                    this.loadLocations(this.locId);
                  }
                }
              }
            }
          }
        }
      });
  }

  loadLocations(locId: string) {
    this.navigationService.getAllSibling('Location', locId)
      .subscribe(response => {
        //console.log('response ', response)
        if (response && response.length > 0) {
          response = this.getUniqueValues(response);
          for (let i = 0; i < response.length; i++) {
            if (response[i].id.toLowerCase() === locId.toLowerCase()) {
              this.locBreadcrumbs.push({ name: response[i].name, nodes: response });
              if (response[i].parentId) {
                this.loadLocations(response[i].parentId);
              } else {
                this.locBreadcrumbs.reverse();
                //console.log('this.locationbreadcrum ', this.locBreadcrumbs)
                this.breadcrumbs = this.breadcrumbs.concat(this.locBreadcrumbs);
                if (this.pageType === 'Asset') {
                  this.assetBreadcrumbs = [];
                  if (this.assetId) {
                    this.loadAssets(this.locId);
                  }
                }
              }
            }
          }
        }
      });
  }


  // Asset breadCrumbs
  loadAssets(assetId: string) {
    this.navigationService.getAllSibling('Location', assetId)
      .subscribe(response => {
        //console.log('response ', response)
        if (response && response.length > 0) {
          response = this.getUniqueValues(response);
          for (let i = 0; i < response.length; i++) {
            if (response[i].id.toLowerCase() === assetId.toLowerCase()) {
              this.assetBreadcrumbs.push({ name: response[i].name, nodes: response });
              if (response[i].parentId) {
                this.loadAssets(response[i].parentId);
              } else {
                this.assetBreadcrumbs.reverse();
                //console.log('this.locationbreadcrum ', this.locBreadcrumbs)
                this.breadcrumbs = this.breadcrumbs.concat(this.assetBreadcrumbs);
              }
            }
          }
        }
      });
  }

  onItemSelection(item: any) {
    if (this.pageType === 'Organization') {
      console.log('item ', item)
      this.router.navigate(['org/view', this.parentOrgId, this.orgName, item.id]);
    } else if (this.pageType === 'Location') {
      if (item.entityType === 'Organization') {
        console.log('ITEM     ', item)
        if (item.parentId) {
          this.router.navigate(['org/view', item.parentId, item.parentName, item.id]);
        } else{
          this.router.navigate(['org/view', item.id, item.name, item.id]);
        }
      } else if (item.entityType === 'Location') {
        console.log('ITEM     ', item);
        if (item.parentId) {
          this.router.navigate([`loc/view/${item.parentId}/${item.parentName}/${item.parentOrgId}/${item.parentOrgName}/${item.id}`]);
        } else {
          this.router.navigate([`loc/view/${item.parentOrgId}/${item.parentOrgName}/${item.id}`]);
        }
        // this.router.navigate(['loc/home', item.parentOrgId, item.parentOrgName, item.id, item.name]);
      }
      //console.log('item selected ', item)
    } else {
      this.router.navigate(['org/view', this.mainOrganizationId, this.mainOrganizationName, this.mainOrganizationId]);
    }
  }
}

