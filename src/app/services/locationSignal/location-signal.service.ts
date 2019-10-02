import { Injectable } from '@angular/core';
import { CustomHttp } from '../custom_http/custom_http.service';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/helpers/app.constants';
import { map } from 'rxjs/operators';
import { Organization } from '../../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class LocationSignalService {

  apiURL = '';

  constructor(
    private http: CustomHttp,
    private httpClient: HttpClient
    ) { }


  getSignalsByLocation(locationId, OrganizationId) {
    return this.http.get(AppConstants.GET_AVAILABLE_SIGNALS + '?organization=' + OrganizationId + '&location=' + locationId);
  }

  getSignalAssociation(locationId) {
    return this.http.get(AppConstants.GET_SIGNAL_ASSOCIATION + '/' + locationId + '/LocationAssociation');
  }

  createSignalAssociation(data) {
    return this.http.post(AppConstants.CREATE_SIGNAL_ASSOCIATION, data);
  }

  detachSignalAssociation(signalMappingId) {
    const obj = {};
    return this.http.delete(AppConstants.DETACH_SIGNAL_ASSOCIATION + '/' + signalMappingId + '/Association', obj);
  }
}
