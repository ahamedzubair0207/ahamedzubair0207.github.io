import { Injectable } from '@angular/core';
import { ORG_LIST } from '../mock/mock-organizations-list';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Organization } from 'src/app/models/organization.model';
import { AppConstants } from '../../helpers/app.constants';


@Injectable({
  providedIn: 'root',
})
export class OrganizationService {

  // use AppConstants.GET_ORG, CREATE_ORG etc as inputs for the CustomHttp service
  controllerName = 'Organization';

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
