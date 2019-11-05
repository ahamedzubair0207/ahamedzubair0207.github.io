import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { filter } from 'rxjs/operators';
import { truncateWithEllipsis } from '@amcharts/amcharts4/.internal/core/utils/Utils';
import { VotmCommon } from '../votm-common';

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
  orgMinimizedBreadcrumbs: any = {};
  locMinimizedBreadcrumbs: any = {};
  assetMinimizedBreadcrumbs: any = {};
  locId: string;
  isDotLoaded: boolean = false;
  assetId: string; // Asset Bread Crumbs
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
    } else if (this.currentUrl.startsWith(`/loc/edit`) || this.currentUrl.startsWith(`/loc/view`)) {
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
    } else if (this.currentUrl.startsWith(`/asset/view`) || this.currentUrl.startsWith(`/asset/edit`)) {
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
    } else if (this.currentUrl.startsWith(`/loc/home`)) {
      let parts = this.currentUrl.split('/');
      this.orgId = parts[3];
      this.pageType = 'Location Home';
      this.breadcrumbs = [];
      this.loadOrganizations(this.orgId);
    } else if (this.currentUrl.startsWith(`/asset/home`)) {
      let parts = this.currentUrl.split('/');
      this.orgId = parts[3];
      this.locId = parts[5];
      this.pageType = 'Asset Home';
      this.breadcrumbs = [];
      this.loadOrganizations(this.orgId);
    } else if (this.currentUrl.startsWith(`/org/create`)) {
      let parts = this.currentUrl.split('/');
      this.orgId = parts[3];
      this.pageType = 'Organization Create';
      this.breadcrumbs = [];
      this.loadOrganizations(this.orgId);
    } else if (this.currentUrl.startsWith(`/loc/create`)) {
      let parts = this.currentUrl.split('/');

      if (parts.length > 5) {
        this.locId = parts[3];
        this.orgId = parts[5];
        this.pageType = 'Create Sub Location';
      } else {
        this.orgId = parts[3];
        this.pageType = 'Create Parent Location';
      }

      this.breadcrumbs = [];
      this.loadOrganizations(this.orgId);
    } else if (this.currentUrl.startsWith(`/asset/create`)) {
      let parts = this.currentUrl.split('/');

      if (parts.length > 5) {
        this.locId = parts[5];
        this.orgId = parts[3];
        this.assetId = parts[7];
        this.pageType = 'Create Sub Asset';
      } else {
        this.orgId = parts[3];
        this.pageType = 'Create Parent Asset';
      }

      this.breadcrumbs = [];
      this.loadOrganizations(this.orgId);
    } else {
      this.pageType = '';
      this.breadcrumbs = [];
      this.loadOrganizations(this.mainOrganizationId);
      // this.breadcrumbs.push({ name: this.mainOrganizationName, nodes: [] });
    }
  }

  loadOrganizations(orgId: string) {
    this.navigationService.getAllSibling('Organization', orgId)
      .subscribe(response => {
        if (response && response.length > 0) {
          response = VotmCommon.getUniqueValues(response);
          let childFound: boolean = false;
          for (let i = 0; i < response.length; i++) {
            if (response[i].id.toLowerCase() === orgId.toLowerCase()) {
              this.breadcrumbs.push({ name:response[i].name, shortName: this.getShortName(response[i].name), showDots: false, type: 'Organization', id: response[i].id, nodes: response, isVisible: true });
              if (response[i].parentId) {
                this.loadOrganizations(response[i].parentId);
              } else {
                // this.breadcrumbs.push({ name: this.orgName, nodes: response });
                this.breadcrumbs.reverse();

                // this.checkForVisibility();
                if (this.pageType === 'Location' || this.pageType === 'Asset' || this.pageType === 'Asset Home' || this.pageType === 'Create Sub Location'
                  || this.pageType === 'Create Parent Asset' || this.pageType === 'Create Sub Asset') {
                  this.locBreadcrumbs = [];
                  if (this.locId) {
                    this.loadLocations(this.locId);
                  }
                } else {
                  this.checkForVisibility();
                  if (this.finalBreadcrumbs && this.finalBreadcrumbs.length > 0) {
                    // this.navigationService.lastOrganization = this.finalBreadcrumbs[this.finalBreadcrumbs.length - 1].name
                    this.navigationService.lastOrganization.next(this.finalBreadcrumbs[this.finalBreadcrumbs.length - 1].name);
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
        if (response && response.length > 0) {
          response = VotmCommon.getUniqueValues(response);
          for (let i = 0; i < response.length; i++) {
            if (response[i].id.toLowerCase() === locId.toLowerCase()) {
              this.locBreadcrumbs.push({ name:response[i].name, shortName: this.getShortName(response[i].name), showDots: false, type: 'Location', id: response[i].id, nodes: response, isVisible: true });
              if (response[i].parentId) {
                this.loadLocations(response[i].parentId);
              } else {
                this.locBreadcrumbs.reverse();
                this.breadcrumbs = this.breadcrumbs.concat(this.locBreadcrumbs);
                if (this.pageType === 'Asset' || this.pageType === 'Create Sub Asset') {
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
          response = VotmCommon.getUniqueValues(response);
          for (let i = 0; i < response.length; i++) {
            if (response[i].id.toLowerCase() === assetId.toLowerCase()) {
              this.assetBreadcrumbs.push({name:response[i].name, shortName: this.getShortName(response[i].name), showDots: false, type: 'Asset', id: response[i].id, nodes: response, isVisible: true });
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
    this.orgMinimizedBreadcrumbs = { name: '...', nodes: [] };
    this.locMinimizedBreadcrumbs = { name: '...', nodes: [] };
    this.assetMinimizedBreadcrumbs = { name: '...', nodes: [] };
    let count = this.breadcrumbs.length;
    let organizationCount = 0;
    let locationCount = 0;
    let assetCount = 0;

    if (count > 6) {
      this.breadcrumbs.forEach((breadcrumb, index) => {
        if (breadcrumb.type === 'Organization') {
          organizationCount = organizationCount + 1;
        } else if (breadcrumb.type === 'Location') {
          locationCount = locationCount + 1;
        }
        else if (breadcrumb.type === 'Asset') {
          assetCount = assetCount + 1;
        }
      });

      let orgIndex = 0;
      if (organizationCount > 2) {
        this.breadcrumbs.forEach((breadcrumb, index) => {
          if (breadcrumb.type === 'Organization') {
            orgIndex = orgIndex + 1;
            if (orgIndex === 1) {
              breadcrumb.isVisible = true;
            } else if (orgIndex === organizationCount) {
              breadcrumb.isVisible = true;
            } else {
              if (orgIndex === 2) {
                breadcrumb.showDots = true;
              }
              breadcrumb.isVisible = false;
              breadcrumb.nodes.forEach(node => {
                if (node.id === breadcrumb.id) {
                  this.orgMinimizedBreadcrumbs.nodes.push(node);
                }
              });
            }
          }
        });
      }

      let locIndex = 0;
      if (locationCount > 2) {
        this.breadcrumbs.forEach((breadcrumb, index) => {
          if (breadcrumb.type === 'Location') {
            locIndex = locIndex + 1;
            if (locIndex === 1) {
              breadcrumb.isVisible = true;
            } else if (locIndex === locationCount) {
              breadcrumb.isVisible = true;
            } else {
              if (locIndex === 2) {
                breadcrumb.showDots = true;
              }
              breadcrumb.isVisible = false;
              breadcrumb.nodes.forEach(node => {
                if (node.id === breadcrumb.id) {
                  this.locMinimizedBreadcrumbs.nodes.push(node);
                }
              });
            }
          }
        });
      }

      let assetIndex = 0;
      if (assetCount > 2) {
        this.breadcrumbs.forEach((breadcrumb, index) => {
          if (breadcrumb.type === 'Asset') {
            assetIndex = assetIndex + 1;
            if (assetIndex === 1) {
              breadcrumb.isVisible = true;
            } else if (assetIndex === assetCount) {
              breadcrumb.isVisible = true;
            } else {
              if (assetIndex === 2) {
                breadcrumb.showDots = true;
              }
              breadcrumb.isVisible = false;
              breadcrumb.nodes.forEach(node => {
                if (node.id === breadcrumb.id) {
                  this.assetMinimizedBreadcrumbs.nodes.push(node);
                }
              });
            }
          }
        });
      }
    }




    // if (count > 3) {
    //   this.breadcrumbs.forEach((breadcrumb, index) => {
    //     if (index === 0) {
    //       breadcrumb.isVisible = true;
    //     } else if (index >= count - 2) {
    //       breadcrumb.isVisible = true;
    //     } else {
    //       breadcrumb.isVisible = false;
    //       breadcrumb.nodes.forEach(node => {
    //         if (node.id === breadcrumb.id) {
    //           this.minimizedBreadcrumbs.nodes.push(node);
    //         }
    //       });
    //     }
    //   });
    // }
    this.finalBreadcrumbs = [];
    this.finalBreadcrumbs = [...this.breadcrumbs];
    // le.log('BREADCRUMBS ', this.finalBreadcrumbs);

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
    if (item.entityType === 'Organization') {
      this.renderOrganization(item);
    } else if (item.entityType === 'Location') {
      this.renderLocation(item);
    } else if (item.entityType === 'Asset') {
      this.renderAsset(item);
    }

    // if (this.pageType === 'Organization') {
    //   this.router.navigate(['org/view', this.parentOrgId, this.orgName, item.id]);
    // } else if (this.pageType === 'Location') {
    //   if (item.entityType === 'Organization') {
    //     if (item.parentId) {
    //       this.router.navigate(['org/view', item.parentId, item.parentName, item.id]);
    //     } else {
    //       this.router.navigate(['org/view', item.id, item.name, item.id]);
    //     }
    //   } else if (item.entityType === 'Location') {
    //     if (item.parentId) {
    //       this.router.navigate([`loc/view/${item.parentId}/${item.parentName}/${item.parentOrgId}/${item.parentOrgName}/${item.id}`]);
    //     } else {
    //       this.router.navigate([`loc/view/${item.parentOrgId}/${item.parentOrgName}/${item.id}`]);
    //     }
    //     // this.router.navigate(['loc/home', item.parentOrgId, item.parentOrgName, item.id, item.name]);
    //   }
    // } else if (this.pageType === 'Asset') {
    //   if (item.entityType === 'Organization') {
    //     this.renderOrganization(item);
    //   } else if (item.entityType === 'Location') {
    //     this.renderLocation(item);
    //   } else if (item.entityType === 'Asset') {
    //     this.renderAsset(item);
    //   }
    // } else {
    //   this.router.navigate(['org/view', this.mainOrganizationId, this.mainOrganizationName, this.mainOrganizationId]);
    // }
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

  getShortName(name: string) {
    let splittedNames: string[] = name.split(' ');
    if (splittedNames.length > 1) {
      name = splittedNames.map((splitedName) => splitedName[0]).join('')
    }
    return name;
  }
}

