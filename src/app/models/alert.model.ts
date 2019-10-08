export class Alert {
    alertRuleId: string;
    alertRuleName: string; //Alert Rule Name
    //Ahamed Code
    // UomTypeId: string;
    alertTypeId: string; // Drop Down for Metric Type
    alertRuleTypeId: string; // Rule Type
    organizationScopeId: string; // Access Scope 
    closureRequired: boolean;
    sustainTime: number; // Minimum Sustain
    escalateTime: number; //Escalate Time
    organizationId: string;
    locationId: string;
    active: boolean;
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;
    alertRuleConfigurationMapping: Array<AlertRuleConfigurationMapping>;
    alertRuleSignalMapping: Array<AlertRuleSignalMapping>;
    alertRuleUserGroup: Array<AlertRuleUserGroup>;
}

export class AlertRuleUserGroup {
    alertUserGroupId?: string;
    alertRuleId?: string;
    userId?: string;
    userGroupId?: string;
    alertUserGroupRoleId?: string; // GET: /v1/UserManagement/UserGroups 
    active?: boolean;
    createdBy?: string;
    createdOn?: string;
    modifiedBy?: string;
    modifiedOn?: string;

    name?: string;
    userEmail?: string;
}

export class AlertRuleConfigurationMapping {
    alertRuleMapingId?: string;
    alertRuleTypeId?: string;
    alertRuleId?: string;
    alertConfigurationId?: string; // Thresholds ID in Array []
    alertConfigurationValue?: string; // Thereshold Value in Array []
    // Pass Active as true false for enable/disable
    active?: boolean;
    createdBy?: string;
    createdOn?: string;
    modifiedBy?: string;
    modifiedOn?: string;
}

export class AlertRuleSignalMapping {
    alertSignalMappingId?: string;
    signalId: string; // signalMappingId
    alertRuleId?: string;
    // locationId: string;
    // assetId: string;
    active?: boolean;
    createdBy?: string;
    createdOn?: string;
    modifiedBy?: string;
    modifiedOn?: string;
}

// Signal Association URL /v1/AlertRuleSignalAssociatedwithAsset/{organizationId}
// Add User Group URL /v1/UserManagement/UserGroups
// Add User URL /v1/UserManagement/Users/{userId}
// Rule Type :
// 3D97A28E-7D8E-4C7D-98CE-251909FED1A9    Absolute
// B45A2094-C4D6-4D36-B26C-3A9F195C6D6F    Relative

// AlertUserGroupRoleId    RoleName
// C1E4485B-1B3E-4E40-859C-0691781A6584    Info Only
// 2C0F1BBC-86EB-446F-9CD2-389CC82CCF22    Primary
// 23F49A54-F32A-4ACA-875E-64973DB33D35    Secondary



// Access Scope URL /v1/BreadcrumbNavigation/GetChildOrganization/{OrganizationId}
// User Responsibility URL /v1/AlertRules/UserGroupRoles
// Metric Type URL /v1/AlertRules/MetricType

