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
    signalId: string;
    alertRuleId?: string;
    active?: boolean;
    createdBy?: string;
    createdOn?: string;
    modifiedBy?: string;
    modifiedOn?: string;
}

// Signal Association URL /v1/AlertRuleSignalAssociatedwithAsset/{organizationId}
// Add User Group URL /v1/UserManagement/UserGroups