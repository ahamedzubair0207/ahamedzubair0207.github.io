import { Logo, File } from './logo.model';

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
    // active: true;
    description: string;
    documentationUrl: string;
    documentation?: File;
    // template?: string;
    templateId: string;
    templateName: string;
}