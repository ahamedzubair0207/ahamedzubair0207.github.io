import { ApplicationConfiguration } from './applicationconfig.model';

export class UserProfile {
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
    description: string;
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;
    userConfigSettings: UserConfigSettings[];
    userGuestOrganization: UserGuestOrganization[];
}

class UserConfigSettings {
    localeId: string;
    timeZoneId: string;
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
}
