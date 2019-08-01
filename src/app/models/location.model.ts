import { Address } from './address.model';
import { Logo } from './logo.model';

export class Location {
    organizationId: string;
    locationName: string;
    parentLocationId: string;
    locationType: string;
    address: Array<Address>;
    primaryContact: string;
    primaryDistributor: string;
    gatewayId: string;
    geoFenceType: string;
    geoFenceValue: string;
    imageStoreId: Logo;
    latitude: string;
    longitude: string;
    active: true;
    description: string;
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;

}