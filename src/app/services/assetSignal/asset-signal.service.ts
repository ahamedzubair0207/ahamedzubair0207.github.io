import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttp } from '../custom_http/custom_http.service';
import { AppConstants } from 'src/app/helpers/app.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssetSignalService {

  parentOrganization: { orgId: string, orgName: string };

  apiURL = '';

  constructor(
    private http: CustomHttp
  ) { }

  getAvailableSignals(): Observable<any> {
    return this.http.get(AppConstants.GET_AVAILABLE_SIGNALS)
      .pipe(
        map(response => response)
      );
  }

  getAvailableSignalsForLocation(type, id): Observable<any> {
    return this.http.get(AppConstants.GET_SENSOR_TREE + '/type/' + type + '/Id/' + id)
      .pipe(
        map(response => response)
      );
  }

  getAssetSignalAssociation(assetId: string) {
    return this.http.get(AppConstants.GET_SIGNAL_ASSOCIATION + '/' + assetId + '/AssetAssociation');
  }

  createSignalAssociation(data) {
    return this.http.post(AppConstants.CREATE_SIGNAL_ASSOCIATION, data);
  }

  detachSignalAssociation(signalMappingId) {
    const obj = {};
    return this.http.delete(AppConstants.DETACH_SIGNAL_ASSOCIATION + '/' + signalMappingId + '/Association', obj);
  }

  updateAlertSignalMapping(dataObj, signalMappingId) {
    return this.http.patch(AppConstants.UPDATE_ALERT_SIGNAL_MAPPING + '?SignalMappingId=' + signalMappingId, dataObj);
  }

}
