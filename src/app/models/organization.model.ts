import { Address } from './address.model';
import { Logo } from './logo.model';

export class Organization {
  organizationId: string;
  name: string;
  customerNumber: string;
  parentOrganizationId: string;
  organizationType: string;
  primaryContactEmailAddress: string;
  primaryDistributorName: string;
  primaryDistributorEmailAddress: string;
  contractStartDate: string;
  contractEndDate: string;
  svclevels: string;
  contactPhone?: string;
  shortName?: string;
  cellularBlocks?: string;
  sensorBlocks?: string;
  active: boolean;
  address: Array<Address>;
  description: string;
  logo: Logo;
  timeZone?: string;
  locale?: string;
  uoM?: Array<string>;
  createdBy?: string;
  createdOn?: string;
  modifiedBy?: string;
  modifiedOn?: string;
  timeZoneId?: string;
  localeId?: string;
  uoMId?: Array<string>;
}