import { Injectable } from '@angular/core';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConstants } from '../../helpers/app.constants';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  apiURL: string = '';

  constructor(private http: CustomHttp, private httpClient: HttpClient) { }


  
  getSensorTree(){
    return this.http.get(AppConstants.GET_SENSOR_TREE)
      .pipe(
        map(response => response)
      );
  }
}
