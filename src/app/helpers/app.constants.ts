export class AppConstants {
    public static GET_ORG_TREE = '/OrganizationTree';
    public static GET_ORG_LIST = '/Organization';
    public static GET_ORG = '/Organization';
    public static EDIT_ORG = '/Organization';
    public static CREATE_ORG = '/Organization';
    public static DEL_ORG = '/Organization';

    public static GET_LOC_TREE = '/LocationTree/type/location';
    public static GET_LOC = '/Location';
    public static EDIT_LOC = '/Location';
    public static CREATE_LOC = '/Location';
    public static DEL_LOC = '/Location';

    public static GET_OPTIONSLISTDATA = '/Location/optionsListData';

    public static GET_ASSET_TREE = '/AssetTree/type/asset';
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

    public static GET_AVAILABLE_SIGNALS = 'Signals/SignalsTree';
    public static GET_ASSET_SIGNAL_ASSOCIATION = 'SignalsTree';
    public static GET_LOCATION_SIGNAL_ASSOCIATION = 'SignalsTree/{0}/Association';
    public static CREATE_SIGNAL_ASSOCIATION = 'Signals/Association';

    public static GET_ALERT = '/Alert';
    public static GET_ALERT_BYORGID = '/AlertRules';

    public static NAVIGATION_URL = '/BreadcrumbNavigation';

    public static APP_INFO = 'ConfigSettings/Application';

    public static GET_SIBLINGS = '/BreadcrumbNavigation';

    // Need to change to configurable strings once DB is in good shape
    public static ORG_LBL = 'ConfigSettings/fd027a29-f9b7-474d-a4f4-0462d027c535/ScreenLabel/95200C8D-9910-42F2-B26D-56E4BAC697B1';
    public static LOC_LBL = 'ConfigSettings/fd027a29-f9b7-474d-a4f4-0462d027c535/ScreenLabel/a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92';

    public static GetLblUrl(orgId: string, scrId: string) {
        return '';
    }

}
