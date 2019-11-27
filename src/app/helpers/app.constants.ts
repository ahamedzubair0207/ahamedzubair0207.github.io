export class AppConstants {
    public static GET_ORG_TREE = '/OrganizationTree';
    public static GET_ORG_LIST = '/Organization';
    public static GET_ORG = '/Organization';
    public static GET_ORG_SEARCH = '/Organization/Search';
    public static EDIT_ORG = '/Organization';
    public static CREATE_ORG = '/Organization';
    public static DEL_ORG = '/Organization';

    public static GET_LOC_TREE = '/LocationTree/type/location';
    public static GET_LOCTREE = '/LocationTree';
    public static GET_LOC_TREE_BY_ORGID = '/type/Organization';
    public static GET_ALL_LOCATIONS_BY_ORGID = '/LocationTreeByOrganizationId';
    public static GET_LOC = '/Location';
    public static EDIT_LOC = '/Location';
    public static CREATE_LOC = '/Location';
    public static DEL_LOC = '/Location';
    public static GATEWAYS_LOC = 'Location/Gateways';
    public static GET_LOC_SEARCH = '/Location/Search';
    public static ASSOCIATE_LOCATION_ASSET = 'Asset/Association';
    public static GET_ASSOCIATE_LOCATION_ASSET = 'Asset';

    public static CREATE_DASHBOARD = '/Dashboard';
    public static EDIT_DASHBOARD = '/Dashboard';
    public static GET_ALL_DASHBOARD = '/Dashboard';
    public static DEL_DASHBOARD = '/Dashboard';

    public static CREATE_DASHBOARD_WIDGET = '/DashboardWidget';

    public static GET_FAVORITES = '/UserManagement/UserFavorites';
    public static POST_FAVORITES = '/UserManagement/UserFavorites';
    public static PATCH_FAVORITES = '/UserManagement/UserFavorites';

    public static GET_USER_UOM = 'UserManagement/UnitofMeasurement';
    public static ADD_USER_UOM = 'UserManagement/UnitofMeasurement';
    public static DELETE_USER_UOM = 'UserManagement/DeleteUnitofMeasurement';


    public static GET_USER_GROUPS = '/UserManagement/UserGroups';
    public static GET_ALERTRULE_USERGROUP_SUBSCRIBER = '/ALertRuleUserGroupSubscriber';
    public static GET_USER_ROLES = '/UserManagement/Roles';
    public static GET_ALL_USERS = '/UserManagement/Users';
    public static CREATE_USER = '/UserManagement/User';
    public static DELETE_USER = '/UserManagement/User';
    public static EDIT_USER = '/UserManagement/User';
    public static USER_SEARCH = 'UserManagement/User/Search';

    public static ADD_USER_GUEST_ORG = '/UserManagement/UserGuestOrganization';

    public static GET_USER_DETAIL = '/UserManagement/UserDetail';
    public static EDIT_USER_NOTIFICATION = '/UserManagement/UserNotification';

    public static DELETE_USER_FAVORITE = '/UserManagement/UserFavorites';
    public static GET_OPTIONSLISTDATA = '/Location/optionsListData';

    public static GET_ASSET_TREE = '/AssetTree/type/asset';
    public static GET_ASSETTREE = '/AssetTree';
    public static GET_ASSETTREE_BYID = '/type/location';
    public static GET_ASSETTREE_BYORGID = '/type/organization';
    public static GET_ALLASSETS = '/Asset';
    public static GET_TEMPLATES = '/Asset/Template';
    public static GET_TEMPLATESNAMELIST = '/Asset/TemplateNameList';
    public static GET_ASSET = '/Asset';
    public static GET_TEMPLATEBYID = '/Asset/Template';
    public static EDIT_ASSET = '/Asset';
    public static EDIT_TEMPLATE = '/Asset/Template';
    public static CREATE_ASSET = '/Asset';
    public static CREATE_ASSET_TEMPLATE = '/Asset/Template';
    public static DEL_ASSET = '/Asset';
    public static PARENT_CHILD_ASSET_ASSOCIATION = 'ParentChildAsset';

    public static GET_AVAILABLE_SIGNALS = 'Signals/SignalsTree';
    public static GET_SIGNAL_ASSOCIATION = 'Signals';
    public static CREATE_SIGNAL_ASSOCIATION = 'Signals/Association';
    public static DETACH_SIGNAL_ASSOCIATION = 'Signals';


    public static GET_SENSOR_TREE = '/SensorTree';
    public static GET_SENSOR_DETAIL_BY_ID = '/Sensor';
    public static GET_SENSOR_LIST = '/Sensor';
    public static GET_SENSOR_DETAIL_BY_TYPE_AND_ID = '/SensorTree/type';
    public static UPDATE_SENSOR_BY_ID = '/Sensor';
    public static UPDATE_SENSOR_LINK_STATUS = '/SensorLinkStatus';

    public static GET_ALERT = '/Alert';
    public static GET_ALERT_BYALERTID = '/AlertRule';
    public static CREATE_ALERT = '/AlertRule';
    public static UPDATE_ALERT = '/AlertRule';
    public static GET_ALERT_BYORGID = '/AlertRules';
    public static GET_ALERT_BYUSERID = '/AlertRulesByUserId';
    public static GET_ALERT_RULESIGNALS_ASSOCIATION_ASSETS = '/AlertRuleSignalAssociatedwithAsset'; // AlertRuleSignalAssociatedwithAsset/{organizationId}/{alertRuleId}
    public static GET_ALERT_METRICS = '/AlertRules/MetricType';
    public static GET_ALERT_UOMNAMEFORMETRICTYPE = '/AlertRules/UserUnitofMeasurement';
    public static GET_ALERT_USERGROUPROLE = '/AlertRules/UserGroupRoles';
    public static EDIT_ALERT = '/AlertRule';
    public static DEL_ALERT = '/AlertRule';
    public static GET_ALERT_ACCESSSCOPE = '/BreadcrumbNavigation/GetChildOrganization';

    public static GET_TIMESERIES_SIGNAL = '/SignalAssociatedwithAssetLocationByOrganization';
    public static POST_GETTIMESERIESAGGREGATEMULTIPLEDEVICES = '/TimeSeries/GetTimeSeriesAggregateMultipleDevices';
    public static GET_UPDATEDTIMESERIES_SIGNAL = '/TimeSeries/GetTimeSeriesMultipleSignals';

    public static NAVIGATION_URL = '/BreadcrumbNavigation';

    public static APP_INFO = 'ConfigSettings/Application';

    public static GET_SIBLINGS = '/BreadcrumbNavigation';

    public static GET_GATEWAY_DETAIL_BY_TYPE_AND_ID = '/GatewayByOrganizationId';
    public static GET_GATEWAY_BY_ORG_ID = '/GatewayByOrganizationId';

    // Need to change to configurable strings once DB is in good shape
    // public static ORG_LBL = 'ConfigSettings/fd027a29-f9b7-474d-a4f4-0462d027c535/ScreenLabel/95200C8D-9910-42F2-B26D-56E4BAC697B1';
    public static ORG_LBL = 'ConfigSettings/fd027a29-f9b7-474d-a4f4-0462d027c535/ScreenLabel/95200C8D-9910-42F2-B26D-56E4BAC697B1?userId=03C7FB47-58EE-4C41-A9D6-2AD0BD43392A';
    public static LOC_LBL = 'ConfigSettings/fd027a29-f9b7-474d-a4f4-0462d027c535/ScreenLabel/a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92?userId=03C7FB47-58EE-4C41-A9D6-2AD0BD43392A';
    public static TRENDCHART_LBL = 'ConfigSettings/fd027a29-f9b7-474d-a4f4-0462d027c535/ScreenLabel/C0319A43-FF57-4511-A79F-C3E2C1B148E2?userId=03C7FB47-58EE-4C41-A9D6-2AD0BD43392A';

    public static GetLblUrl(orgId: string, scrId: string) {
        return '';
    }

}
