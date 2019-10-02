import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { filter } from 'rxjs/operators';
import { truncateWithEllipsis } from '@amcharts/amcharts4/.internal/core/utils/Utils';

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
  finalBreadcrumbs: any[] = [];
  minimizedBreadcrumbs: any = {};
  locId: string;
  isDotLoaded: boolean = false;
  assetId: string; //Asset Bread Crumbs
  orgName: string;
  parentOrgId: string;
  mainOrganizationId: string;
  mainOrganizationName: string;
  count: number = 0;
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
    //   this.orgId = parts[3];
    //   this.pageType = 'Organization';
    //   this.breadcrumbs = [];
    //   this.breadcrumbs.push({ name: parts[4], nodes: [] });
    //   // this.loadOrganizations(this.orgId);
    // } else 
    if (this.currentUrl.startsWith(`/org/edit`) || this.currentUrl.startsWith(`/org/view`)) {
      let parts = this.currentUrl.split('/');
      this.orgId = parts[5];
      this.orgName = parts[4];
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
      if (parts.length >= 9) {
        this.orgId = parts[3];
        this.locId = parts[5];
        this.assetId = parts[9];
      } else {
        this.orgId = parts[3];
        this.locId = parts[5];
        this.assetId = parts[7];
      }

      this.pageType = 'Asset';
      this.breadcrumbs = [];
      this.loadOrganizations(this.orgId);
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
    this.navigationService.getAllSibling('Organization', orgId)
      .subscribe(response => {
        if (response && response.length > 0) {
          response = this.getUniqueValues(response);
          let childFound: boolean = false;
          for (let i = 0; i < response.length; i++) {

            if (response[i].id.toLowerCase() === orgId.toLowerCase()) {
              this.breadcrumbs.push({ name: response[i].name, id: response[i].id, nodes: response, isVisible: true });
              if (response[i].parentId) {
                this.loadOrganizations(response[i].parentId);
              } else {
                // this.breadcrumbs.push({ name: this.orgName, nodes: response });
                this.breadcrumbs.reverse();
                // this.checkForVisibility();
                if (this.pageType === 'Location' || this.pageType === 'Asset') {
                  this.locBreadcrumbs = [];
                  if (this.locId) {
                    this.loadLocations(this.locId);
                  }
                } else {
                  this.checkForVisibility();
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
        if (response && response.length > 0) {
          response = this.getUniqueValues(response);
          for (let i = 0; i < response.length; i++) {
            if (response[i].id.toLowerCase() === locId.toLowerCase()) {
              this.locBreadcrumbs.push({ name: response[i].name, id: response[i].id, nodes: response, isVisible: true });
              if (response[i].parentId) {
                this.loadLocations(response[i].parentId);
              } else {
                this.locBreadcrumbs.reverse();
                this.breadcrumbs = this.breadcrumbs.concat(this.locBreadcrumbs);
                if (this.pageType === 'Asset') {
                  this.assetBreadcrumbs = [];
                  if (this.assetId) {
                    this.loadAssets(this.assetId);
                  }
                } else {
                  this.checkForVisibility();
                }
              }
            }
          }
        }
      });
  }


  // Asset breadCrumbs
  loadAssets(assetId: string) {
    this.navigationService.getAllSibling('Asset', assetId)
      .subscribe(response => {
        if (response && response.length > 0) {
          response = this.getUniqueValues(response);
          for (let i = 0; i < response.length; i++) {
            if (response[i].id.toLowerCase() === assetId.toLowerCase()) {
              this.assetBreadcrumbs.push({ name: response[i].name, id: response[i].id, nodes: response, isVisible: true });
              if (response[i].parentId) {
                this.loadAssets(response[i].parentId);
              } else {
                this.assetBreadcrumbs.reverse();
                this.breadcrumbs = this.breadcrumbs.concat(this.assetBreadcrumbs);
                this.checkForVisibility();
              }
            }
          }
        }
      });
  }

  checkForVisibility() {
    this.isDotLoaded = false;
    this.minimizedBreadcrumbs = { name: '...', nodes: [] };
    let count = this.breadcrumbs.length;
    if (count > 3) {
      this.breadcrumbs.forEach((breadcrumb, index) => {
        if (index === 0) {
          breadcrumb.isVisible = true;
        } else if (index >= count - 2) {
          breadcrumb.isVisible = true;
        } else {
          breadcrumb.isVisible = false;
          breadcrumb.nodes.forEach(node => {
            if (node.id === breadcrumb.id) {
              this.minimizedBreadcrumbs.nodes.push(node);
            }
          });
        }
      });
    }
    this.finalBreadcrumbs = [];
    this.finalBreadcrumbs = [...this.breadcrumbs];
  }

  checkDotLoaded() {
    if (this.count === 0) {
      this.count = 1;
      return true;
    } else {
      return false;
    }
  }

  onItemSelection(item: any) {
    if (this.pageType === 'Organization') {
      this.router.navigate(['org/view', this.parentOrgId, this.orgName, item.id]);
    } else if (this.pageType === 'Location') {
      if (item.entityType === 'Organization') {
        if (item.parentId) {
          this.router.navigate(['org/view', item.parentId, item.parentName, item.id]);
        } else {
          this.router.navigate(['org/view', item.id, item.name, item.id]);
        }
      } else if (item.entityType === 'Location') {
        if (item.parentId) {
          this.router.navigate([`loc/view/${item.parentId}/${item.parentName}/${item.parentOrgId}/${item.parentOrgName}/${item.id}`]);
        } else {
          this.router.navigate([`loc/view/${item.parentOrgId}/${item.parentOrgName}/${item.id}`]);
        }
        // this.router.navigate(['loc/home', item.parentOrgId, item.parentOrgName, item.id, item.name]);
      }
    } else if (this.pageType === 'Asset') {
      if (item.entityType === 'Organization') {
        this.renderOrganization(item);
      } else if (item.entityType === 'Location') {
        this.renderLocation(item);
      } else if (item.entityType === 'Asset') {
        this.renderAsset(item);
      }
    } else {
      this.router.navigate(['org/view', this.mainOrganizationId, this.mainOrganizationName, this.mainOrganizationId]);
    }
  }

  renderAsset(item) {
    if (item.parentId) {
      this.router.navigate([`asset/view/${item.parentOrgId}/${item.parentOrgName}/${item.parentLocationId}/${item.parentLocationName}/${item.parentId}/${item.parentName}/${item.id}`]);
    } else {
      this.router.navigate([`asset/view/${item.parentOrgId}/${item.parentOrgName}/${item.parentLocationId}/${item.parentLocationName}/${item.id}`]);
    }
  }

  renderLocation(item) {
    if (item.parentId) {
      this.router.navigate([`loc/view/${item.parentId}/${item.parentName}/${item.parentOrgId}/${item.parentOrgName}/${item.id}`]);
    } else {
      this.router.navigate([`loc/view/${item.parentOrgId}/${item.parentOrgName}/${item.id}`]);
    }
  }

  renderOrganization(item) {
    if (item.parentId) {
      this.router.navigate(['org/view', item.parentId, item.parentName, item.id]);
    } else {
      this.router.navigate(['org/view', item.id, item.name, item.id]);
    }
  }
}

