import { Injectable } from '@angular/core';
import { CustomHttp } from '../custom_http/custom_http.service';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/helpers/app.constants';

@Injectable({
  providedIn: 'root'
})
export class EventLogsService {

  constructor(
    private http: CustomHttp
  ) { }

  getEventLogs(organizationId, locationId, assetId): Observable<any> {
    let url = AppConstants.GET_ALERT_EVENT_LOG;
    if (organizationId) {
      url += '?organizationId=' + organizationId;
    }
    if (locationId) {
      url += '&locationId=' + locationId;
    }
    if (assetId) {
      url += '&assetId=' + assetId;
    }
    console.log(url);
    return this.http.get(url);
  }

  updateEventLog(obj) {
    return this.http.patch(AppConstants.UPDATE_ALERT_EVENT_LOG, obj);
  }
}

