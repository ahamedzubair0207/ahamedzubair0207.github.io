export const MENU_ITEMS: Array<{ id: string, enabled: boolean, url: string, icon: string, name: string}> = [
    {  id: "favorites", enabled: true, url: "/fav", icon: "menu-icon fa fa-star", name: 'Favorites' },
    {  id: "views", enabled: true, url: "view/home", icon: "menu-icon fa fa-desktop", name: 'Views' },
    {  id: "organizations", enabled: true, url: "org/home/7A59BDD8-6E1D-48F9-A961-AA60B2918DDE/Parker1", icon: "menu-icon fa fa-sitemap", name: 'Organizations' },
    {  id: "locations", enabled: true, url: "loc/home/19d7e5e5-fda7-4778-b943-62e36078087a/Mineapolis", icon: "menu-icon fa fa-location-arrow", name: 'Locations' },
    {  id: "assets", enabled: true, url: "asset/home/1b16d48b-275d-4109-ab82-4494638639a9", icon: "menu-icon fa fa-industry", name: 'Assets' },
    {  id: "sensors", enabled: true, url: "sensor/home", icon: "menu-icon fa fa-thermometer-half", name: 'Sensors' },
    {  id: "gateways", enabled: true, url: "gateway/home", icon: "menu-icon fa fa-signal", name: 'Gateways' },
    {  id: "alerts", enabled: true, url: "alerts/home", icon: "menu-icon fa fa-exclamation-triangle", name: 'Alerts' },
    {  id: "admin", enabled: true, url: "admin", icon: "menu-icon fa fa-user", name: 'Admin Panel' },
    {  id: "super", enabled: true, url: "super", icon: "menu-icon fa fa-lock", name: 'Super Admin' }
];