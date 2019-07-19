import { Injectable } from '@angular/core';
import {ORG_TABLE} from '../mock/mock-org';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor() { }

  getAllOrganization(): Array<{Id:number,orgName:string,orgType:string,custNo:string,contractStartDate:Date, contractEndDate:Date, svcLabel:string}>{
    return ORG_TABLE;
  }
}
