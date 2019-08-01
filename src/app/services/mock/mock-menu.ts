export const MENU_ITEMS: Array<{ id: string, enabled: boolean, url: string, icon: string, name: string}> = [
    {  id: "favorites", enabled: true, url: "", icon: "menu-icon fa fa-star", name: 'Favorites' },
    {  id: "views", enabled: true, url: "view/home", icon: "menu-icon fa fa-desktop", name: 'Views' },
    {  id: "organizations", enabled: true, url: "org/home", icon: "menu-icon fa fa-sitemap", name: 'Organizations' },
    {  id: "locations", enabled: true, url: "loc/home", icon: "menu-icon fa fa-location-arrow", name: 'Locations' },
    {  id: "assets", enabled: true, url: "asset/home", icon: "menu-icon fa fa-industry", name: 'Assets' },
    {  id: "sensors", enabled: true, url: "sensor/home", icon: "menu-icon fa fa-thermometer-half", name: 'Sensors' },
    {  id: "gateways", enabled: true, url: "gateway/home", icon: "menu-icon fa fa-signal", name: 'Gateways' },
    {  id: "alerts", enabled: true, url: "alerts/home", icon: "menu-icon fa fa-exclamation-triangle", name: 'Alerts' },
    {  id: "admin", enabled: true, url: "admin", icon: "menu-icon fa fa-user", name: 'Admin Panel' },
    {  id: "super", enabled: true, url: "super", icon: "menu-icon fa fa-lock", name: 'Super Admin' }
];