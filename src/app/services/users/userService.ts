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
}
