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

  getAssetSignalAssociation(assetId: string) {
    return this.http.get(AppConstants.GET_SIGNAL_ASSOCIATION + '/' + assetId + '/AssetAssociation');
  }

}
