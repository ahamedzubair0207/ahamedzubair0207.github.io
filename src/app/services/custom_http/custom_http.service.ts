import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})

export class CustomHttp {
    constructor(private http: HttpClient) { }

    get(controller: string, actionName: string): Observable<any> {
        let url = this.getUrl(controller, actionName);
        let headers = this.setHeaders();
        return this.http.get(url, { headers, responseType: 'json' });
    }

    post(controller: string, actionName: string, body: any): Observable<any> {
        let url = this.getUrl(controller, actionName);
        let headers = this.setHeaders();
        return this.http.post(url, body, { headers, responseType: 'json' });
    }

    private getUrl(controller: string, actionName: string): string {
        return actionName ? `${environment.protocol}://${environment.server}/${environment.virtualName}/${controller}/${actionName}`
            : `${environment.protocol}://${environment.server}/${environment.virtualName}/${controller}`;
    }

    private setHeaders() {
        let headers = new HttpHeaders();
        headers.set('Cache-control', 'no-cache');
        headers.set('Cache-control', 'no-store');
        headers.set('Expires', '0');
        headers.set('Pragma', 'no-cache');
        headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.set('accept', 'application/json');
        return headers;
    }
}