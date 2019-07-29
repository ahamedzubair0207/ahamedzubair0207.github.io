import { Injectable } from '@angular/core';
import { ORG_LIST } from '../mock/mock-organizations-list';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Organization } from 'src/app/models/organization.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {

  controllerName = 'Organization'

  apiURL: string = '';

  constructor(private http: CustomHttp) { }

  getAllOrganization() {
    
    return ORG_LIST;
  }

  getAllOrganizations(): Observable<any> {
    return this.http.get(this.controllerName,'')
      .pipe(
        map(response => response)
      );
  }

  createOrganization(body: Organization){
    return this.http.post(this.controllerName,'', body)
    .pipe(
      map(response => response)
    );
  }
}
