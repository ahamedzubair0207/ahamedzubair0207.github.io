import { Injectable } from '@angular/core';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../helpers/app.constants';
import { HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {

    public lastOrganization: Subject<string> = new Subject<string>();
    constructor(private http: CustomHttp) { }

    getAllSibling(type: string, id: string) {
        // let params = new HttpParams().set("organizationId", orgId);
        return this.http.get(`${AppConstants.NAVIGATION_URL}/${id}/${type}`)
            .pipe(
                map(response => response)
            );
    }
}
