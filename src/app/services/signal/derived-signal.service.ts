import { AppConstants } from 'src/app/helpers/app.constants';
import { Injectable } from '@angular/core';
import { CustomHttp } from '../custom_http/custom_http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DerivedSignalService {

  constructor(private http: CustomHttp, private httpClient: HttpClient) { }


  getControlsByFunction(functionId) {
    return this.http.get(AppConstants.GET_CONTROLS_OF_FUNCTION + '/' + functionId + '/controls');
  }

}
