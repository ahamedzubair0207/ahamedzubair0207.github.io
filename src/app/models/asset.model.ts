import { Address } from './address.model';
import { Logo } from './logo.model';

export class Asset {
    assetId: string;
    organizationId: string;
    organizationName: string;
    locationName: string;
    locationId: string;
    parentLocationId: string;
    parentLocationName: string;
    parentAssetId: string;
    parentAssetName: string;
    assetNumber: string;
    assetName: string;
    assetType: string;
    logo: Logo; 
    active: true;
    description: string;
    documentationUrl: string;
    
    // "": {
    //   "image": "string",
    //   "imageType": "string",
    //   "imageName": "string"
    // },
   
}