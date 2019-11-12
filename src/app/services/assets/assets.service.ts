import { Injectable } from '@angular/core';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Asset } from '../../models/asset.model';
import { AppConstants } from '../../helpers/app.constants';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  parentOrganization: { orgId: string, orgName: string };

  apiURL: string = '';

  constructor(private http: CustomHttp) { }

  getAssetTreeByLocId(locId: string): Observable<any> {

    let params = new HttpParams().set("Id", locId).set('type', 'location');
    return this.http.get(AppConstants.GET_ASSETTREE, params)
      .pipe(
        map(response => response)
      );
  }

  getAssetTree(): Observable<any> {
    return this.http.get(AppConstants.GET_ASSET_TREE)
      .pipe(
        map(response => response)
      );
  }

  getAssetTreeByOrgId(orgId: string): Observable<any> {
    let params = new HttpParams().set('type', 'organization').set('Id', orgId);
    return this.http.get(AppConstants.GET_ASSETTREE, params)
      .pipe(
        map(response => response)
      );
  }

  getAssetTreeByAssetId(assetId: string): Observable<any> {
    const params = new HttpParams().set('type', 'asset').set('Id', assetId);
    return this.http.get(AppConstants.GET_ASSETTREE, params);
  }
  getAllAssetsTree(): Observable<any> {
    return this.http.get(AppConstants.GET_ASSET_TREE)
      .pipe(
        map(response => response)
      );
  }

  getAllAssets(): Observable<any> {
    return this.http.get(AppConstants.GET_ALLASSETS)
      .pipe(
        map(response => response)
      );
  }

  getAllTemplates(): Observable<any> {
    return this.http.get(AppConstants.GET_TEMPLATES)
      .pipe(
        map(response => response)
      );
  }

  getAllTemplatesIdAndName(): Observable<any> {
    return this.http.get(AppConstants.GET_TEMPLATESNAMELIST)
      .pipe(
        map(response => response)
      );
  }


  getAssetById(assetId: string): Observable<any> {
    return this.http.get(AppConstants.GET_ASSET + '/' + assetId)
      .pipe(
        map(response => response)
      );
  }

  getTemplateById(templateId: string): Observable<any> {
    return this.http.get(AppConstants.GET_TEMPLATEBYID + '/' + templateId)
      .pipe(
        map(response => response)
      );
  }

  createAsset(body: Asset) {
    return this.http.post(AppConstants.CREATE_ASSET, body)
      .pipe(
        map(response => response)
      );
  }

  createAssetTemplate(body: Asset) {
    return this.http.post(AppConstants.CREATE_ASSET_TEMPLATE, body)
      .pipe(
        map(response => response)
      );
  }

  updateTemplate(body: any) {

    return this.http.patch(AppConstants.EDIT_TEMPLATE, body)
      .pipe(
        map(response => response)
      );
  }

  updateAsset(body: Asset) {

    return this.http.patch(AppConstants.EDIT_ASSET + '/' + body.assetId, body)
      .pipe(
        map(response => response)
      );
  }

  deleteAsset(assetId: string) {
    return this.http.delete(AppConstants.DEL_ASSET + '/' + assetId, assetId)
      .pipe(
        map(response => response)
      );
  }

  addParentChildAssetAssociation(assetId: string, body: any) {
    return this.http.post(AppConstants.PARENT_CHILD_ASSET_ASSOCIATION + '/' + assetId + '/Association', body);
  }

  getParentChildAssetAssociation(assetId: string) {
    return this.http.get(AppConstants.PARENT_CHILD_ASSET_ASSOCIATION + '/' + assetId + '/Association');
  }
}
