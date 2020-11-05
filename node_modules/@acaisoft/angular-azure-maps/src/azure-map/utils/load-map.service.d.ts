import { BehaviorSubject, Observable, Subject } from 'rxjs';
export declare class LoadMapService {
    isLoaded: boolean;
    isComponentLoaded: boolean;
    loadedSubject: Subject<boolean>;
    loadedComponenet: BehaviorSubject<boolean>;
    constructor();
    load(): Observable<boolean>;
    observableComponent(): Observable<boolean>;
}
