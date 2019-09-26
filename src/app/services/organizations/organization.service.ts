import { Injectable } from '@angular/core';
import { ORG_LIST } from '../mock/mock-organizations-list';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Organization } from 'src/app/models/organization.model';
import { AppConstants } from '../../helpers/app.constants';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {

  parentOrganization: { orgId: string, orgName: string };

  apiURL: string = '';

  constructor(private http: CustomHttp, private httpClient: HttpClient) { }

  getAllOrganization() {
    return ORG_LIST;
  }  

  getOptionsListData(listName: string): Observable<any> {
    let params = new HttpParams().set("listName", listName);
    return this.http.get(AppConstants.GET_OPTIONSLISTDATA, params)
      .pipe(
        map(response => response)
      );
  }

  getOrganizationTree(orgId: string): Observable<any> {
    let params = new HttpParams().set("organizationId", orgId);
    return this.http.get(AppConstants.GET_ORG_TREE + '/' + orgId, params)
      .pipe(
        map(response => response)
      );
  }

  getAllOrganizations(): Observable<any> {
    return this.http.get(AppConstants.GET_ORG_TREE)
      .pipe(
        map(response => response)
      );
  }

  getAllOrganizationsList(): Observable<any> {
    return this.http.get(AppConstants.GET_ORG_LIST)
      .pipe(
        map(response => response)
      );
  }


  getOrganizationById(orgId: string): Observable<any> {
    return this.http.get(AppConstants.GET_ORG + '/' + orgId)
      .pipe(
        map(response => response)
      );
  }

  createOrganization(body: Organization) {
    return this.http.post(AppConstants.CREATE_ORG, body)
      .pipe(
        map(response => response)
      );
  }

  updateOrganization(body: Organization) {

    return this.http.patch(AppConstants.EDIT_ORG + '/' + body.organizationId, body)
      .pipe(
        map(response => response)
      );
  }

  deleteOrganization(orgId: string) {
    return this.http.delete(AppConstants.DEL_ORG + '/' + orgId, orgId)
      .pipe(
        map(response => response)
      );
  }

  getOrganizations(): Observable<any> {
    return this.http.get(AppConstants.GET_ORG)
      .pipe(
        map(response => response)
      );
  }

  getCountries(){
    return this.httpClient.get("../../../assets/countryList/countryWithStates.json").pipe(
                    map((res:any) => res));
  }

  getDashboardHTML(formName) {
    

    //.toPromise().then(res => res.json())

    let promise = new Promise((resolve, reject) => {
      this.httpClient.get(`../../../assets/dashboards/${formName}.html`, {responseType: 'text'})
        .toPromise()
        .then(
          res => {
            resolve();
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;
  }

}
