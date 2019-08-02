export class AppConstants {
    public static GET_ORG_TREE = '/OrganizationTree';
    public static GET_ORG = '/Organization';
    public static EDIT_ORG = '/Organization';
    public static CREATE_ORG = '/Organization';
    public static DEL_ORG = '/Organization';

    public static GET_LOC_TREE = '/LocationTree';
    public static GET_LOC = '/Location';
    public static EDIT_LOC = '/Location';
    public static CREATE_LOC = '/Location';
    public static DEL_LOC = '/Location';

    // Need to change to configurable strings once DB is in good shape
    public static ORG_LBL = 'ConfigSettings/fd027a29-f9b7-474d-a4f4-0462d027c535/ScreenLabel/95200C8D-9910-42F2-B26D-56E4BAC697B1';
    public static LOC_LBL = 'ConfigSettings/fd027a29-f9b7-474d-a4f4-0462d027c535/ScreenLabel/a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92';

    public static CONFIGCONTROLLERNAME = 'ConfigSettings';
    public static ORGANIZATIONCONTROLLER = 'Organization';

    public static GetLblUrl(orgId: string, scrId: string) {
        return '';
    }

}