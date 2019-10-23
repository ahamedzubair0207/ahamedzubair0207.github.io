import { UserProfile, UserGuestOrganization } from './../../models/userprofile.model';
import { Injectable } from '@angular/core';
import { CustomHttp } from '../custom_http/custom_http.service';
import { Observable } from 'rxjs';
import { UserGroup } from 'src/app/models/user-groups';
import { map } from 'rxjs/operators';
import { AppConstants } from 'src/app/helpers/app.constants';
import { UserRole } from 'src/app/models/user-role';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: CustomHttp) { }

    getUserGroups(): Observable<Array<UserGroup>> {
        return this.http.get(AppConstants.GET_USER_GROUPS)
            .pipe(
                map(response => response)
            );
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

    deleteUser(userId: string) {
        return this.http.delete(AppConstants.DELETE_USER + '/' + userId, {});
    }

    addUserGuestOrganization(userGuestOrgObj) {
        return this.http.post(AppConstants.ADD_USER_GUEST_ORG, userGuestOrgObj);
    }

    updateUserNotification(userObj: UserProfile) {
        return this.http.patch(AppConstants.EDIT_USER_NOTIFICATION + '/' + userObj.userId, userObj);
    }
}
