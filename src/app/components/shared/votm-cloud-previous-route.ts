import { Router, NavigationEnd } from '@angular/router';

export class previousRoute {
    previousUrl: any;
    previousURLToNavigate: any;
    constructor(private route: Router) {
        route.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.previousUrl) {
                    this.previousURLToNavigate = JSON.parse(JSON.stringify(this.previousUrl));
                }
                this.previousUrl = event.url;
            }
        });
    }
}