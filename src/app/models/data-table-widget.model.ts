export class DataTableWidget {
    
    signals: string[];
    title: string;
    displayOrg: boolean;
    displayLoc: boolean;
    displayAsset: boolean;
    displaySensor: boolean;
    displayStatus: boolean;

    
    accountCode: string;
    propertyName: string;
    propertyValue: string;
    measuredValue: string;
    environmentFqdn: string;
    bucketSize: string;
    fromDateTime: Date;
    toDateTime: Date;
}