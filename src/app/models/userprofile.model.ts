import { ApplicationConfiguration } from './applicationconfig.model';
import { Logo } from './logo.model';
export class UserProfile {
    name?: string
    timeZone?: string;
    locale?: string;
    uoM?: Array<string>;
    timeZoneId?: string;
    localeId?: string;
    uoMId?: Array<string>;
    userId: string;
    roleId: string;
    roleName: string;
    organizationId: string;
    organizationName: string;
    locationId: string;
    firstName: string;
    lastName: string;
    emailId: string;
    phoneNumber: string;
    active: boolean;
    logo: Logo;
    description: string;
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;
    userConfigSettings: UserConfigSettings[];
    userGuestOrganization: UserGuestOrganization[];
    userFavorites: any[];
    userNotification: UserNotification[];
    userUnitofMeasurement?: any[]
}

class UserConfigSettings {
    userConfigId: string;
    organizationId: string;
    organizationName: string;
    locationId: string;
    userId: string;
    languageId: string;
    localeId: string;
    timeZoneId: string;
    timeZoneDescription: string;
    timeZoneName: string;
    localeName: string;
    active: boolean;
    description: string;
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;
    measurementType?: string;
}

export class UserGuestOrganization {
    userGuestId: string;
    userId: string;
    roleId: string;
    roleName: string;
    organizationId: string;
    organizationName: string;
    locationId: string;
    active: boolean;
    description: string;
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;
}

export class UserNotification {
    userNotificationId: string;
    userId: string;
    criticalAlarm: string;
    warningAlarm: string;
    infoMessage: string;
    active: boolean;
    createdOn: string;
    createdBy: string;
    modifiedOn: string;
    modifiedBy: string;
}
