import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/helpers/app.constants';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GatewaysService {

  constructor(
    private http: CustomHttp
  ) { }

  getGatewayDetailsByTypeAndId(type, typeId) {
    // type = organization, gateway && Id= Organization Id, gateway ID
    return this.http.get(AppConstants.GET_GATEWAY_DETAIL_BY_TYPE_AND_ID + '/' + type + '/Id/' + typeId)
      .pipe(
        map(response => response)
      );
  }

  getGatewayDetailsByOrganizationId(typeId) {
    // type = organization, gateway && Id= Organization Id, gateway ID
    return this.http.get(AppConstants.GET_GATEWAY_DETAIL_BY_TYPE_AND_ID + '/' + typeId)
      .pipe(
        map(response => response)
      );
  }
}
