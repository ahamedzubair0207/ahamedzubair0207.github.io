import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../../helpers/app.constants';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  NewCrumbs: BehaviorSubject<boolean>;
  newCrumbFlag: boolean;
  orgList : any;
  locList : any;
  assetList : any;
  displayList: any;

  constructor( private router: Router, private custHttp: CustomHttp ) {
    this.orgList = [];
    this.locList = [];
    this.assetList = [];
    this.displayList = [];
    this.newCrumbFlag = false;
    this.NewCrumbs =  new BehaviorSubject(false);
  }

  addCrumb(crumbObj: any){
    // console.log("in add crumb");
    let crumbType = crumbObj.entityType;
    // console.log(crumbObj);
    switch(crumbType){
      case "Organization":{
        this.orgList.push(crumbObj);
        // console.log("done add org crumb");
        // console.log(this.orgList);
        break;
      }
      case "Location":{
        this.locList.push(crumbObj);
        break;
      }
      case "Asset":{
        this.assetList.push(crumbObj);
        break;
      }
    }
    this.newCrumbFlag = !this.newCrumbFlag;
    this.NewCrumbs.next(this.newCrumbFlag);
  }

  navToObj(crumbObj: any){
    // console.log(crumbObj);
    let crumbType = crumbObj.entityType;
    switch(crumbType){
      case "Organization":{
        let orgIndex = this.orgList.findIndex(obj => obj.parentId == crumbObj.parentId);
        // let orgIndex = this.orgList.indexOf(crumbObj);
        this.orgList = this.orgList.slice(0, orgIndex + 1);
        this.locList = [];
        this.assetList = [];
        // console.log("nav to org");
        // console.log(orgIndex);
        this.router.navigate(['org/home/'+crumbObj.id+'/'+crumbObj.name, {}]).then(nav => {
          // console.log(nav); // true if navigation is successful
        }, err => {
          // console.log(err) // when there's an error
        });
        break;
      }
      case "Location":{
        let locIndex = this.locList.indexOf(crumbObj);  
        this.locList = this.locList.slice(0, locIndex + 1);
        this.assetList = [];
        this.router.navigate(['loc/home/'+crumbObj.id+'/'+crumbObj.name, {}]).then(nav => {
          // console.log(nav); // true if navigation is successful
        }, err => {
          // console.log(err) // when there's an error
        });
        break;
      }
      case "Asset":{
        let assetIndex = this.assetList.indexOf(crumbObj);
        this.assetList = this.assetList.slice(0, assetIndex + 1);
        this.router.navigate(['asset/home/'+crumbObj.id, {}]).then(nav => {
          // console.log(nav); // true if navigation is successful
        }, err => {
          // console.log(err) // when there's an error
        });
        break;
      }
    }
    
    this.newCrumbFlag = !this.newCrumbFlag;
    this.NewCrumbs.next(this.newCrumbFlag);
  }

  getDisplayList(){
    this.displayList = [];
    this.displayList = this.displayList.concat(this.orgList);
    this.displayList = this.displayList.concat(this.locList);
    this.displayList = this.displayList.concat(this.assetList);
    // console.log("getting display list");
    // console.log(this.displayList);
    return this.displayList;
  }

  getSiblings(crumbObj: any){
    let endpoint = AppConstants.GET_SIBLINGS + '/' + crumbObj.id + '/' + crumbObj.entityType;
    return this.custHttp.get(endpoint)
    ;
  }

  getCurrentLevel(){
    if(this.assetList.length > 0){
      return this.assetList.slice(-1)[0];
    }
    else if(this.locList.length > 0){
      return this.locList.slice(-1)[0];
    }
    else if(this.orgList.length > 0){
      return this.orgList.slice(-1)[0];
    }
  }

  getNewCrumbs(): Observable<boolean>{
    return this.NewCrumbs.asObservable();
  }

  setNewCrumbs(): void{
    
  }


}
