import { Injectable } from '@angular/core';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { Asset } from '../../models/asset.model';
import { AppConstants } from '../../helpers/app.constants';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  parentOrganization: { orgId: string, orgName: string };

  apiURL: string = '';

  constructor(private http: CustomHttp) { }

  getAssetTree(orgId: string): Observable<any> {
    
    let params = new HttpParams().set("assetId", orgId);
    return this.http.get(AppConstants.GET_ASSET_TREE + '/' + orgId, params)
      .pipe(
        map(response => response)
      );
  }

  getAllAssets(): Observable<any> {
    return this.http.get(AppConstants.GET_ASSET_TREE)
      .pipe(
        map(response => response)
      );
  }


  getAssetById(orgId: string): Observable<any> {
    return this.http.get(AppConstants.GET_ASSET + '/' + orgId)
      .pipe(
        map(response => response)
      );
  }

  // createAsset(body: Asset) {
  //   return this.http.post(AppConstants.CREATE_ASSET, body)
  //     .pipe(
  //       map(response => response)
  //     );
  // }

  // updateAsset(body: Asset) {

  //   return this.http.patch(AppConstants.EDIT_ASSET + '/' + body.assetId, body)
  //     .pipe(
  //       map(response => response)
  //     );
  // }

  deleteAsset(orgId: string) {
    return this.http.delete(AppConstants.DEL_ASSET + '/' + orgId, orgId)
      .pipe(
        map(response => response)
      );
  }
}