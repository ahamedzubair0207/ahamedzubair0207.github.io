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
  locId: string;
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
    if (this.currentUrl.startsWith(`/org/home`)) {
      let parts = this.currentUrl.split('/');
      this.orgId = parts[3];
      this.pageType = 'Organization';
      this.breadcrumbs = [];
      this.loadOrganizations(this.orgId);
    } else if (this.currentUrl.startsWith(`/loc/home`)) {
      let parts = this.currentUrl.split('/');
      this.orgId = parts[3];
      this.locId = parts[5];
      this.pageType = 'Location';
      this.breadcrumbs = [];
      this.loadOrganizations(this.orgId);
    }
  }

  loadOrganizations(orgId: string) {
    this.navigationService.getAllSibling('Organization', orgId)
      .subscribe(response => {
        for (let i = 0; i < response.length; i++) {
          if (response[i].id.toLowerCase() === orgId.toLowerCase()) {
            this.breadcrumbs.push({ name: response[i].name, nodes: response });
            if (response[i].parentId) {
              this.loadOrganizations(response[i].parentId);
            } else {
              this.breadcrumbs.reverse();
              if (this.pageType === 'Location') {
                this.locBreadcrumbs = [];
                if (this.locId) {
                  this.loadLocations(this.locId);
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
        console.log('response ', response)
        for (let i = 0; i < response.length; i++) {
          if (response[i].id.toLowerCase() === locId.toLowerCase()) {
            this.locBreadcrumbs.push({ name: response[i].name, nodes: response });
            if (response[i].parentId) {
              this.loadLocations(response[i].parentId);
            } else {
              this.locBreadcrumbs.reverse();
              console.log('this.locationbreadcrum ', this.locBreadcrumbs)
              this.breadcrumbs = this.breadcrumbs.concat(this.locBreadcrumbs);
            }
          }
        }
      });
  }

  onItemSelection(item: any) {
    if (this.pageType === 'Organization') {
      this.router.navigate(['org/home', item.id, item.name]);
    } else if (this.pageType === 'Location') {
      if(item.entityType==='Organization'){
        this.router.navigate(['loc/home', item.id, item.name]);
      } else if(item.entityType === 'Location'){
        console.log('this.currentUrl ', this.currentUrl);
        this.router.navigate(['loc/home', item.parentOrgId, item.parentOrgName, item.id, item.name]);
      }
      console.log('item selected ', item)
    }
  }
}

