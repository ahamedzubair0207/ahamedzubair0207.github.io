export class Alert {
    alertRuleId: string;
    alertRuleName: string; //Alert Rule Name
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
    alertUserGroupId: string;
    alertRuleId: string;
    userId: string;
    userGroupId: string;
    alertUserGroupRoleId: string; // GET: /v1/UserManagement/UserGroups 
    active: boolean;
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;
}

export class AlertRuleConfigurationMapping {
    alertRuleMapingId: string;
    alertRuleTypeId: string;
    alertRuleId: string;
    alertConfigurationId: string; // Thresholds ID in Array []

    // Rule Type: Absolute Threshholds 
    // 4E045A60-4BEE-44B4-9AF9-151725534706    High Critical
    // 277B236A-C642-461A-A615-175EA69F2FAD    TargetValue
    // 4FA3DDCA-56FA-47FA-9251-5D1D7C04C322    High Warning
    // 3A54142B-3453-4232-85C2-EEF4C62E4C77    Low Critical
    // C89DBBDF-E927-4044-9A76-F40EF1CE6611    Low Warning

    alertConfigurationValue: string; // Thereshold Value in Array []
    // Pass Active as true false for enable/disable
    active: boolean; 
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;
}

export class AlertRuleSignalMapping {
    alertSignalMappingId: string;
    signalId: string;
    alertRuleId: string;
    active: boolean;
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;
}

// Signal Association URL /v1/AlertRuleSignalAssociatedwithAsset/{organizationId}
// Add User Group URL /v1/UserManagement/UserGroups