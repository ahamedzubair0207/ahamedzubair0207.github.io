import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from './../../../services/breadcrumbs/breadcrumbs.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  locations: any;
  organizations: any;
  assets: any;
  displayListWithSiblings: any;
  displayList: any;

  constructor(private breadcrumbs : BreadcrumbsService) { 
    this.organizations = [
      {
        id : '7a59bdd8-6e1d-48f9-a961-aa60b2918dde',
        name: 'Parker 2',
        parentId: "",
        entityType: 'Organization' 
      }
    ];

    this.breadcrumbs.getNewCrumbs().subscribe(newVal => {this.getBreadcrumbs()});
    this.breadcrumbs.addCrumb(this.organizations[0]);
    // this.breadcrumbs.addCrumb(this.locations[0]);
    // this.breadcrumbs.addCrumb(this.assets[0]);
    // console.log("display list");
    // console.log(this.breadcrumbs.getDisplayList());
    this.locations = [ {
      id: '0d2b9eb9-1a16-4f12-ae57-04c47850d089',
      name: '',
      parentId: '',
      entityType: 'Location'
    }];
    this.assets = [ {
      id: '',
      name: '',
      parentId: '',
      entityType: 'Asset'
    }];
    this.displayListWithSiblings = [];
    this.displayList = [];
  }

  ngOnInit() {
    //console.log(this.getBreadcrumbs());
  }

  refresh(){
    this.organizations = [];
    this.locations = [];
    this.assets = [];
  }

  getSiblingNodes(crumbObj){

    return this.breadcrumbs.getSiblings(crumbObj).toPromise().then(
      response =>{return response;}
    );
  }

  getBreadcrumbs(){
    // console.log("getting breadcrumbs");
    this.displayList = this.breadcrumbs.getDisplayList();
    // console.log(this.displayList);
    this.displayListWithSiblings = [];
    this.displayList.map(
      (elem, ind) => {
        this.breadcrumbs.getSiblings(elem).toPromise().then(
           resp => {
           
            // console.log("got it");
            let tempResp = resp.map((x) => (
              
              {
                ...x,
                active: x.id == elem.id? true: false
              }
            ));
            
            this.displayListWithSiblings.splice(ind, 0, tempResp);
          }
        ); 
      }
    );
  }

  navigateTo(navLocId, navArray){
    let targetObj = navArray.filter( x => x.id == navLocId)[0];
    // console.log(targetObj);
    this.breadcrumbs.navToObj(targetObj);
  }

}
