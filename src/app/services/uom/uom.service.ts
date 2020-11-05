import { Injectable } from '@angular/core';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppConstants } from '../../helpers/app.constants';
import { HttpParams } from '@angular/common/http';
import { Organization } from 'src/app/models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class UomService {

  constructor(private http: CustomHttp) { }


  // getUomByOrgAndLocationId(body: string, orgId: any, locId: any){
  //   return this.http.post(`${AppConstants.GET_UOM}?organizationId=${orgId}&userId=03C7FB47-58EE-4C41-A9D6-2AD0BD43392A&locationId=${locId}&precision=2`, body)
  //   .pipe(
  //     map(response => response)
  //   );
  // }

}
