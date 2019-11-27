export class Alert {
    alertRuleId: string;
    alertRuleName: string; //Alert Rule Name
    // UomTypeId: string;
    uomTypeId: string;
    signalTypeId: string;
    uomId: string;
    uomName: string;
    // alertTypeId: string; // Drop Down for Metric Type
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
    alertRuleTypeId?: string;
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
    signalMappingId?: string;
    active?: boolean;
    createdBy?: string;
    createdOn?: string;
    modifiedBy?: string;
    modifiedOn?: string;
}

let abc = {
    "alertRuleUserGroup": [
      {
        "userId": "EA8A69D9-50A1-4773-A7EF-324CD33B3296",
        "userGroupId": "",
        "alertUserGroupRoleId": "C1E4485B-1B3E-4E40-859C-0691781A6584",
        "active": true,
        "createdBy": "",
        "createdOn": "",
        "modifiedBy": "",
        "modifiedOn": ""
      }
    ]
  }
