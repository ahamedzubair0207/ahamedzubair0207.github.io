import { Type } from '@angular/core';

export class DashBoard{
    
        dashboardId: string;
        templateName: string;
        organizationId: string;
        locationId: string;
        assetId: string;
        dashboardName: string;
        shortName: string;
        published: true;
        active: true;
        description: string;
        createdon: string;
        createdBy: string;
        modifiedOn: string;
        modifiedBy: string;
        component?: Type<any>;
        widgetConf?: any;
}