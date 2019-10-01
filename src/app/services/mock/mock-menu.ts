export const MENU_ITEMS: Array<{ id: string, enabled: boolean, url: string, icon: string, name: string, childs: any[]}> = [
    {  id: "favorites", enabled: true, url: "/fav", icon: "menu-icon fa fa-star", name: 'Favorites', childs: [] },
    // {  id: "views", enabled: true, url: "view/home", icon: "menu-icon fa fa-desktop", name: 'Views' },
    // {  id: "organizations", enabled: true, url: "org/home/7a59bdd8-6e1d-48f9-a961-aa60b2918dde/VOTM", icon: "menu-icon fa fa-sitemap", name: 'Organizations' },
    {  id: "organizations", enabled: true, url: "org/home/7a59bdd8-6e1d-48f9-a961-aa60b2918dde/VOTM", icon: "menu-icon icon-org-company", name: 'Organizations', childs: [] },
    // {  id: "locations", enabled: true, url: "loc/home/19d7e5e5-fda7-4778-b943-62e36078087a/Mineapolis", icon: "menu-icon fa fa-location-arrow", name: 'Locations' },
    // {  id: "locations", enabled: true, url: "loc/home/7a59bdd8-6e1d-48f9-a961-aa60b2918dde/VOTM", icon: "menu-icon fa fa-location-arrow", name: 'Locations' },
    {  id: "locations", enabled: true, url: "loc/home/7a59bdd8-6e1d-48f9-a961-aa60b2918dde/VOTM", icon: "menu-icon icon-location", name: 'Locations', childs: [] },
    {  id: "assets", enabled: true, url: "asset/home/7a59bdd8-6e1d-48f9-a961-aa60b2918dde/VOTM", icon: "menu-icon icon-asset-robot", name: 'Assets', childs: [] },
    // {  id: "sensors", enabled: true, url: "sensor/home", icon: "menu-icon fa fa-thermometer-half", name: 'Sensors' },
    // {  id: "gateways", enabled: true, url: "gateway/home", icon: "menu-icon fa fa-signal", name: 'Gateways' },
    // {  id: "alerts", enabled: true, url: "alerts/home", icon: "menu-icon fa fa-exclamation-triangle", name: 'Alerts' },
    {  id: "admin", enabled: true, url: "admin", icon: "menu-icon fa fa-cogs", name: 'Admin Panel', childs: [
        {  id: "network", enabled: true, url: "admin/networkmanagement", icon: "menu-icon fa fa-globe", name: 'Network Managment' },
    {  id: "user", enabled: true, url: "admin/usermanagement", icon: "menu-icon fa fa-user", name: 'User Managment' },
    ] },
    
    // {  id: "super", enabled: true, url: "super", icon: "menu-icon fa fa-lock", name: 'Super Admin' }
];
