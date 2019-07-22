import { Injectable } from '@angular/core';
import {ORG_LIST} from '../mock/mock-organizations-list';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor() { }

  getAllOrganization(){
    return ORG_LIST;
  }
}
