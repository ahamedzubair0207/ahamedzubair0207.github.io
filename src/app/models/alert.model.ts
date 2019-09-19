export class Alert {
    alertRuleId: string;
    alertRuleName: string;
    alertTypeId: string;
    alertRuleTypeId: string;
    organizationScopeId: string;
    closureRequired: boolean;
    sustainTime: number;
    escalateTime: number;
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
    alertUserGroupRoleId: string;
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
    alertConfigurationId: string;
    alertConfigurationValue: string;
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