import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()

export class previousRouteUrl {
    currentUrl: string;
    previousUrl: Subject<string> = new Subject<string>();
    constructor(router: Router) {
        // router.events
        //     .filter(event => event instanceof NavigationEnd)
        //     .subscribe(e => {
        //         // console.log('prev:', this.previousUrl);
        //         this.previousUrl = e.url;
        //     });

        router.events.subscribe(event => {
           
            if (event instanceof NavigationEnd) {
                this.previousUrl.next(event.url);
                this.currentUrl = event.url;
                // console.log('prev:', this.previousUrl);
                // this.previousUrl = this.currentUrl;
                // this.currentUrl = event.url;
                // // console.log('prev:', this.previousUrl);
            }
        });
    }
}