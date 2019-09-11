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
  orgName: string;
  parentOrgId: string;
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
      //console.log('parts ', parts)
      this.orgId = parts[3];
      this.pageType = 'Organization';
      this.breadcrumbs = [];
      this.breadcrumbs.push({ name: parts[4], nodes: [] });
      // this.loadOrganizations(this.orgId);
    } else if (this.currentUrl.startsWith(`/org/edit`) || this.currentUrl.startsWith(`/org/view`)) {
      let parts = this.currentUrl.split('/');
      //console.log('parts ', parts)
      this.orgId = parts[5];
      this.orgName = parts[4];
      //console.log('Inside ', this.orgId)
      this.pageType = 'Organization';
      this.parentOrgId = parts[3];
      this.breadcrumbs = [];
      if (this.orgId.toLowerCase() === this.parentOrgId.toLowerCase()) {
        this.breadcrumbs.push({ name: parts[4], nodes: [] });
      } else {
        this.loadOrganizations(this.orgId);
      }
    } else if (this.currentUrl.startsWith(`/loc/home`)) {
      let parts = this.currentUrl.split('/');
      this.orgId = parts[3];
      this.locId = parts[5];
      this.pageType = 'Location';
      this.breadcrumbs = [];
      // this.loadOrganizations(this.orgId);
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
    //console.log('orgid ', orgId)
    this.navigationService.getAllSibling('Organization', orgId)
      .subscribe(response => {
        if (response && response.length > 0) {
          response = this.getUniqueValues(response);
          let childFound: boolean = false;
          for (let i = 0; i < response.length; i++) {

            if (response[i].id.toLowerCase() === orgId.toLowerCase()) {
              // childFound = true;
              this.breadcrumbs.push({ name: response[i].name, nodes: response });
              if (response[i].parentId && response[i].parentId.toLowerCase() === this.parentOrgId.toLowerCase()) {
                this.breadcrumbs.push({ name: this.orgName, nodes: [] });
                this.breadcrumbs.reverse();
                break;
              } else {
                this.loadOrganizations(response[i].parentId);
              }
            }



            // if (response[i].id.toLowerCase() === orgId.toLowerCase()) {
            //   this.breadcrumbs.push({ name: response[i].name, nodes: response });
            //   if (response[i].parentId) {
            //     //console.log('Came to check Parent Id', orgId, (response[i].parentId))
            //     this.loadOrganizations(response[i].parentId);
            //   } else {
            //     this.breadcrumbs.push({ name: this.orgName, nodes: [] });
            //     this.breadcrumbs.reverse();
            //     if (this.pageType === 'Location') {
            //       this.locBreadcrumbs = [];
            //       if (this.locId) {
            //         this.loadLocations(this.locId);
            //       }
            //     }
            //   }
            // }
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
              }
            }
          }
        }
      });
  }

  onItemSelection(item: any) {
    if (this.pageType === 'Organization') {
      console.log('item ', item)
      this.router.navigate(['org/edit',this.parentOrgId, this.orgName, item.id]);
    } else if (this.pageType === 'Location') {
      if (item.entityType === 'Organization') {
        this.router.navigate(['loc/home', item.id, item.name]);
      } else if (item.entityType === 'Location') {
        //console.log('this.currentUrl ', this.currentUrl);
        this.router.navigate(['loc/home', item.parentOrgId, item.parentOrgName, item.id, item.name]);
      }
      //console.log('item selected ', item)
    }
  }
}

