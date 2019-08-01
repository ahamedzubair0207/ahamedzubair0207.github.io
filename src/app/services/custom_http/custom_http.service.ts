import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})

export class CustomHttp {
    constructor(private http: HttpClient) { }

    get(endpointName: string, params: any = new HttpParams()): Observable<any> {
        let url = this.getUrl(endpointName);
        let headers = this.setHeaders();
        return this.http.get(url, { headers, params: params, responseType: 'json' });
    }

    post(endpointName: string, body: any): Observable<any> {
        let url = this.getUrl(endpointName);
        let headers = this.setHeaders();
        return this.http.post(url, body, { headers, responseType: 'json' });
    }

    patch(endpointName: string, body: any): Observable<any> {
        let url = this.getUrl(endpointName);
        let headers = this.setHeaders();
        return this.http.patch(url, body, { headers, responseType: 'json' });
    }

    delete(endpointName: string, body: any): Observable<any> {
        let url = this.getUrl(endpointName);
        let headers = this.setHeaders();
        return this.http.delete(url, { headers, params: body, responseType: 'json' });
    }

    private getUrl(endpointName: string): string {
        return  `${environment.protocol}://${environment.server}/${environment.virtualName}/${endpointName}`;
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