import { UserProfile, UserGuestOrganization } from './../../models/userprofile.model';
import { Injectable } from '@angular/core';
import { CustomHttp } from '../custom_http/custom_http.service';
import { Observable } from 'rxjs';
import { UserGroup } from 'src/app/models/user-groups';
import { map } from 'rxjs/operators';
import { AppConstants } from 'src/app/helpers/app.constants';
import { UserRole } from 'src/app/models/user-role';
import { HttpParams, HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: CustomHttp,
      private httpClient: HttpClient) { }

    getUserGroups(): Observable<Array<UserGroup>> {
        return this.http.get(AppConstants.GET_USER_GROUPS)
            .pipe(
                map(response => response)
            );
    }

    searchUsers(searchText: string): Observable<any> {
      const params = new HttpParams().set('userName', searchText);
      return this.http.get(AppConstants.USER_SEARCH, params);
    }

    getAllUsers() {
        return this.http.get(`${AppConstants.GET_ALL_USERS}/All`)
            .pipe(
                map(response => response)
            );
    }

    getUserRoles(): Observable<Array<UserRole>> {
        return this.http.get(AppConstants.GET_USER_ROLES)
            .pipe(
                map(response => response)
            );
    }

    getUserDetail(userId: string) {
        return this.http.get(AppConstants.GET_USER_DETAIL + '/' + userId)
            .pipe(
                map(response => response)
            );
    }

    getUserAllRoles() {
        return this.http.get(AppConstants.GET_USER_ROLES)
            .pipe(
                map(response => response)
            );
    }

    createUser(userObj: UserProfile) {
        return this.http.post(AppConstants.CREATE_USER, userObj);
    }

    updateUser(userObj: UserProfile) {
        return this.http.patch(AppConstants.EDIT_USER + '/' + userObj.userId, userObj);
    }

    deleteUser(userId: string, type: string) {
        return this.http.delete(AppConstants.DELETE_USER + '?userId=' + userId + '&type=' + type, {});
    }

    addUserGuestOrganization(userGuestOrgObj) {
        return this.http.post(AppConstants.ADD_USER_GUEST_ORG, userGuestOrgObj);
    }

    updateUserNotification(userObj: UserProfile) {
        return this.http.patch(AppConstants.EDIT_USER_NOTIFICATION, userObj);
    }

    deleteUserFavorite(userFavoriteId: string) {
        return this.http.delete(AppConstants.DELETE_USER_FAVORITE + '?userFavoriteId=' + userFavoriteId, {});
    }

    getUserUOMDetail(userId) {
      return this.http.get(AppConstants.GET_USER_UOM + '/' + userId);
    }

    addUserUOMDetail(uomObj) {
      return this.http.post(AppConstants.ADD_USER_UOM, uomObj);
    }

    deleteUserUOMDetail(uomObj) {
      // console.log(uomObj);
      return this.http.post(AppConstants.DELETE_USER_UOM, uomObj);
    }
}
