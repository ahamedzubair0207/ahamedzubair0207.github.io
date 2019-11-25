import { Address } from './address.model';
import { Logo } from './logo.model';

export class Location {
    organizationId: string;
    locationName: string;
    locationId: string;
    parentLocationId: string;
    parentLocationName: string;
    locationType: string;
    address: Array<Address>;
    primaryContact: string;
    primaryDistributor: string;
    gateways?: Array<string>;
    // gatewayId:string;
    geoFenceType: string;
    geoFenceValue?: string;
    geoWidth: string;
    geoHeight: string;
    geoRadius: string;
    logo: Logo;
    timeZone?: string;
    locale?: string;
    uoM?: Array<string>;
    latitude: string;
    longitude: string;
    active: true;
    description: string;
    createdBy?: string;
    createdOn?: string;
    modifiedBy?: string;
    modifiedOn?: string;
    uoMId?: Array<string>;
    localeId?: string;
    timeZoneId?: string;
    measurementType?: string;
}
