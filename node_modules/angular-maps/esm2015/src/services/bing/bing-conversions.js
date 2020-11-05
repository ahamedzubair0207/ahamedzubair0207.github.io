/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { MapTypeId } from '../../models/map-type-id';
import { ClusterPlacementMode } from '../../models/cluster-placement-mode';
/**
 * This class contains helperfunctions to map various interfaces used to represent options and structures into the
 * corresponding Bing Maps V8 specific implementations.
 *
 * @export
 */
export class BingConversions {
    /**
     * Maps an IInfoWindowAction to a Microsoft.Maps.IInfoboxActions
     *
     * \@memberof BingConversions
     * @param {?} action - Object to be mapped.
     * @return {?} - Navtive mapped object.
     *
     */
    static TranslateAction(action) {
        const /** @type {?} */ a = {
            eventHandler: action.eventHandler,
            label: action.label
        };
        return a;
    }
    /**
     * Maps an Array of IInfoWindowAction to an Array of Microsoft.Maps.IInfoboxActions
     *
     * \@memberof BingConversions
     * @param {?} actions - Array of objects to be mapped.
     * @return {?} - Array of mapped objects.
     *
     */
    static TranslateActions(actions) {
        const /** @type {?} */ a = new Array();
        actions.forEach(x => a.push(BingConversions.TranslateAction(x)));
        return a;
    }
    /**
     * Maps an IBox object to a Microsoft.Maps.LocationRect object.
     *
     * \@memberof BingConversions
     * @param {?} box - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateBounds(box) {
        const /** @type {?} */ r = Microsoft.Maps.LocationRect.fromEdges(box.maxLatitude, box.minLongitude, box.minLatitude, box.maxLongitude);
        return r;
    }
    /**
     * Maps an IClusterOptions object to a Microsoft.Maps.IClusterLayerOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateClusterOptions(options) {
        const /** @type {?} */ o = {};
        Object.keys(options)
            .filter(k => BingConversions._clusterOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'layerOffset') {
                o.layerOffset = BingConversions.TranslatePoint(options.layerOffset);
            }
            if (k === 'placementMode') {
                if (options.placementMode === ClusterPlacementMode.FirstPin) {
                    o.placementMode = Microsoft.Maps.ClusterPlacementType.FirstLocation;
                }
                else {
                    o.placementMode = Microsoft.Maps.ClusterPlacementType.MeanAverage;
                }
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IInfoWindowOptions object to a Microsoft.Maps.IInfoboxOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateInfoBoxOptions(options) {
        const /** @type {?} */ o = {};
        Object.keys(options)
            .filter(k => BingConversions._infoWindowOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'pixelOffset') {
                o.offset = BingConversions.TranslatePoint(options.pixelOffset);
            }
            else if (k === 'position') {
                o.location = BingConversions.TranslateLocation(options.position);
            }
            else if (k === 'actions') {
                o.actions = BingConversions.TranslateActions(options.actions);
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IMapOptions object to a Microsoft.Maps.IMapLoadOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLoadOptions(options) {
        const /** @type {?} */ o = {};
        Object.keys(options)
            .filter(k => {
            return BingConversions._mapOptionsAttributes.indexOf(k) !== -1 || BingConversions._viewOptionsAttributes.indexOf(k) !== -1;
        })
            .forEach((k) => {
            if (k === 'center') {
                o.center = BingConversions.TranslateLocation(options.center);
            }
            else if (k === 'mapTypeId') {
                if (options.mapTypeId === MapTypeId.hybrid) {
                    o.mapTypeId = Microsoft.Maps.MapTypeId.aerial;
                    o.labelOverlay = Microsoft.Maps.LabelOverlay.visible;
                }
                else if (options.mapTypeId === MapTypeId.aerial) {
                    o.mapTypeId = Microsoft.Maps.MapTypeId.aerial;
                    o.labelOverlay = Microsoft.Maps.LabelOverlay.hidden;
                }
                else {
                    o.mapTypeId = Microsoft.Maps.MapTypeId[(/** @type {?} */ (MapTypeId))[options.mapTypeId]];
                }
            }
            else if (k === 'bounds') {
                o.bounds = BingConversions.TranslateBounds(options.bounds);
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an ILatLong object to a Microsoft.Maps.Location object.
     *
     * \@memberof BingConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLocation(latlong) {
        const /** @type {?} */ l = new Microsoft.Maps.Location(latlong.latitude, latlong.longitude);
        return l;
    }
    /**
     * Maps an IMarkerOptions object to a Microsoft.Maps.IPushpinOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - The mapped object.
     *
     */
    static TranslateMarkerOptions(options) {
        const /** @type {?} */ o = {};
        Object.keys(options)
            .filter(k => BingConversions._markerOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'anchor') {
                o.anchor = BingConversions.TranslatePoint(options.anchor);
            }
            else {
                (/** @type {?} */ (o))[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IMapOptions object to a Microsoft.Maps.IMapOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateOptions(options) {
        const /** @type {?} */ o = {};
        Object.keys(options)
            .filter(k => BingConversions._mapOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'center') {
                o.center = BingConversions.TranslateLocation(options.center);
            }
            else if (k === 'mapTypeId') {
                o.mapTypeId = Microsoft.Maps.MapTypeId[(/** @type {?} */ (MapTypeId))[options.mapTypeId]];
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Translates an array of locations or an array or arrays of location to and array of arrays of Bing Map Locations
     *
     * \@memberof BingConversions
     * @param {?} paths - ILatLong based locations to convert.
     * @return {?} - converted locations.
     *
     */
    static TranslatePaths(paths) {
        const /** @type {?} */ p = new Array();
        if (paths == null || !Array.isArray(paths) || paths.length === 0) {
            p.push(new Array());
        }
        else if (Array.isArray(paths[0])) {
            // parameter is an array or arrays
            // us for loop for performance
            const /** @type {?} */ p1 = /** @type {?} */ (paths);
            for (let /** @type {?} */ i = 0; i < p1.length; i++) {
                const /** @type {?} */ _p = new Array();
                for (let /** @type {?} */ j = 0; j < p1[i].length; j++) {
                    _p.push(new Microsoft.Maps.Location(p1[i][j].latitude, p1[i][j].longitude));
                }
                p.push(_p);
            }
        }
        else {
            // parameter is a simple array....
            const /** @type {?} */ y = new Array();
            const /** @type {?} */ p1 = /** @type {?} */ (paths);
            for (let /** @type {?} */ i = 0; i < p1.length; i++) {
                y.push(new Microsoft.Maps.Location(p1[i].latitude, p1[i].longitude));
            }
            p.push(y);
        }
        return p;
    }
    /**
     *  Maps an IPoint object to a Microsoft.Maps.Point object.
     *
     * \@memberof BingConversions
     * @param {?} point - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslatePoint(point) {
        const /** @type {?} */ p = new Microsoft.Maps.Point(point.x, point.y);
        return p;
    }
    /**
     *  Maps an IPolygonOptions object to a Microsoft.Maps.IPolygonOptions.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslatePolygonOptions(options) {
        const /** @type {?} */ o = {};
        const /** @type {?} */ f = (s, a) => {
            const /** @type {?} */ m = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(s);
            if (m && m.length > 3) {
                a = a > 1 ? (a / 100) : a;
                return 'rgba(' + [m[1], m[2], m[3], a].join(',') + ')';
            }
            else if (s[0] === '#') {
                const /** @type {?} */ x = a > 1 ? a : Math.floor(a * 255);
                const /** @type {?} */ z = s.substr(1);
                const /** @type {?} */ r = parseInt(z.substr(0, 2), 16);
                const /** @type {?} */ g = parseInt(z.substr(2, 2), 16);
                const /** @type {?} */ b = parseInt(z.substr(4, 2), 16);
                return 'rgba(' + [r, g, b, a].join(',') + ')';
            }
            else {
                return s;
            }
        };
        Object.keys(options)
            .filter(k => BingConversions._polygonOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'strokeWeight') {
                o.strokeThickness = options.strokeWeight;
            }
            else if (k === 'strokeColor') {
                if (options.strokeOpacity) {
                    o.strokeColor = f(options.strokeColor, options.strokeOpacity);
                }
                else {
                    o.strokeColor = options.strokeColor;
                }
            }
            else if (k === 'strokeOpacity') { }
            else if (k === 'fillColor') {
                if (options.fillOpacity) {
                    o.fillColor = f(options.fillColor, options.fillOpacity);
                }
                else {
                    o.fillColor = options.fillColor;
                }
            }
            else if (k === 'fillOpacity') { }
            else {
                (/** @type {?} */ (o))[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     *  Maps an IPolylineOptions object to a Microsoft.Maps.IPolylineOptions.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslatePolylineOptions(options) {
        const /** @type {?} */ o = {};
        const /** @type {?} */ f = (s, a) => {
            const /** @type {?} */ m = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(s);
            if (m && m.length > 3) {
                a = a > 1 ? (a / 100) : a;
                return 'rgba(' + [m[1], m[2], m[3], a].join(',') + ')';
            }
            else if (s[0] === '#') {
                const /** @type {?} */ x = a > 1 ? a : Math.floor(a * 255);
                const /** @type {?} */ z = s.substr(1);
                const /** @type {?} */ r = parseInt(z.substr(0, 2), 16);
                const /** @type {?} */ g = parseInt(z.substr(2, 2), 16);
                const /** @type {?} */ b = parseInt(z.substr(4, 2), 16);
                return 'rgba(' + [r, g, b, a].join(',') + ')';
            }
            else {
                return s;
            }
        };
        Object.keys(options)
            .filter(k => BingConversions._polylineOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'strokeWeight') {
                o.strokeThickness = options.strokeWeight;
            }
            else if (k === 'strokeColor') {
                if (options.strokeOpacity) {
                    o.strokeColor = f(options.strokeColor, options.strokeOpacity);
                }
                else {
                    o.strokeColor = options.strokeColor;
                }
            }
            else if (k === 'strokeOpacity') {
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IMapOptions object to a Microsoft.Maps.IViewOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateViewOptions(options) {
        const /** @type {?} */ o = {};
        Object.keys(options)
            .filter(k => BingConversions._viewOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'center') {
                o.center = BingConversions.TranslateLocation(options.center);
            }
            else if (k === 'bounds') {
                o.bounds = BingConversions.TranslateBounds(options.bounds);
            }
            else if (k === 'centerOffset') {
                o.centerOffset = BingConversions.TranslatePoint(options.centerOffset);
            }
            else if (k === 'mapTypeId') {
                o.mapTypeId = Microsoft.Maps.MapTypeId[(/** @type {?} */ (MapTypeId))[options.mapTypeId]];
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
}
/**
 * Map option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._mapOptionsAttributes = [
    'backgroundColor',
    'credentials',
    'customizeOverlays',
    'customMapStyle',
    'disableBirdseye',
    'disableKeyboardInput',
    'disableMouseInput',
    'disablePanning',
    'disableTouchInput',
    'disableUserInput',
    'disableZooming',
    'disableStreetside',
    'enableClickableLogo',
    'enableSearchLogo',
    'fixedMapPosition',
    'height',
    'inertiaIntensity',
    'navigationBarMode',
    'showBreadcrumb',
    'showCopyright',
    'showDashboard',
    'showMapTypeSelector',
    'showScalebar',
    'theme',
    'tileBuffer',
    'useInertia',
    'width',
    'center',
    'zoom',
    'mapTypeId',
    'liteMode'
];
/**
 * View option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._viewOptionsAttributes = [
    'animate',
    'bounds',
    'center',
    'centerOffset',
    'heading',
    'labelOverlay',
    'mapTypeId',
    'padding',
    'zoom'
];
/**
 * InfoWindow option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._infoWindowOptionsAttributes = [
    'actions',
    'description',
    'htmlContent',
    'id',
    'position',
    'pixelOffset',
    'showCloseButton',
    'showPointer',
    'pushpin',
    'title',
    'titleClickHandler',
    'typeName',
    'visible',
    'width',
    'height'
];
/**
 * Marker option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._markerOptionsAttributes = [
    'anchor',
    'draggable',
    'height',
    'htmlContent',
    'icon',
    'infobox',
    'state',
    'title',
    'textOffset',
    'typeName',
    'visible',
    'width',
    'zIndex'
];
/**
 * Polygon option attributes that are supported for conversion to Bing Map Polygon properties
 *
 * \@memberof BingConversions
 */
BingConversions._polygonOptionsAttributes = [
    'cursor',
    'fillColor',
    'fillOpacity',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'visible'
];
/**
 * Polyline option attributes that are supported for conversion to Bing Map Polyline properties
 *
 * \@memberof BingConversions
 */
BingConversions._polylineOptionsAttributes = [
    'cursor',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'visible'
];
/**
 * Cluster option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._clusterOptionsAttributes = [
    'callback',
    'clusteredPinCallback',
    'clusteringEnabled',
    'gridSize',
    'layerOffset',
    'placementMode',
    'visible',
    'zIndex'
];
function BingConversions_tsickle_Closure_declarations() {
    /**
     * Map option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._mapOptionsAttributes;
    /**
     * View option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._viewOptionsAttributes;
    /**
     * InfoWindow option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._infoWindowOptionsAttributes;
    /**
     * Marker option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._markerOptionsAttributes;
    /**
     * Polygon option attributes that are supported for conversion to Bing Map Polygon properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._polygonOptionsAttributes;
    /**
     * Polyline option attributes that are supported for conversion to Bing Map Polyline properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._polylineOptionsAttributes;
    /**
     * Cluster option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._clusterOptionsAttributes;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1jb252ZXJzaW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9iaW5nL2JpbmctY29udmVyc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVdBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7OztBQVMzRSxNQUFNOzs7Ozs7Ozs7SUFrS0ssTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUF5QjtRQUNuRCx1QkFBTSxDQUFDLEdBQW1DO1lBQ3RDLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWTtZQUNqQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7U0FDdEIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXTixNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBaUM7UUFDNUQsdUJBQU0sQ0FBQyxHQUEwQyxJQUFJLEtBQUssRUFBa0MsQ0FBQztRQUM3RixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV04sTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFTO1FBQ25DLHVCQUFNLENBQUMsR0FDSCxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hILE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXTixNQUFNLENBQUMsdUJBQXVCLENBQUMsT0FBd0I7UUFD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SUFDUixXQUFXO0lBQ1gsUUFBUTtJQUNSLGFBQWE7SUFDYixNQUFNO0lBQ04sU0FBUztJQUNULE9BQU87SUFDUCxPQUFPO0lBQ1AsWUFBWTtJQUNaLFVBQVU7SUFDVixTQUFTO0lBQ1QsT0FBTztJQUNQLFFBQVE7Q0FDWDs7Ozs7OzRDQU9vRDtJQUNqRCxRQUFRO0lBQ1IsV0FBVztJQUNYLGFBQWE7SUFDYixhQUFhO0lBQ2IsZUFBZTtJQUNmLGNBQWM7SUFDZCxTQUFTO0NBQ1o7Ozs7Ozs2Q0FPcUQ7SUFDbEQsUUFBUTtJQUNSLGFBQWE7SUFDYixlQUFlO0lBQ2YsY0FBYztJQUNkLFNBQVM7Q0FDWjs7Ozs7OzRDQU9vRDtJQUNqRCxVQUFVO0lBQ1Ysc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsYUFBYTtJQUNiLGVBQWU7SUFDZixTQUFTO0lBQ1QsUUFBUTtDQUNYIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU1hcE9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXAtb3B0aW9ucyc7XHJcbmltcG9ydCB7IElCb3ggfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lib3gnO1xyXG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xyXG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XHJcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBJSW5mb1dpbmRvd0FjdGlvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LWFjdGlvbic7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcclxuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xyXG5pbXBvcnQgeyBNYXBUeXBlSWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFwLXR5cGUtaWQnO1xyXG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcclxuaW1wb3J0IHsgQ2x1c3RlclBsYWNlbWVudE1vZGUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2x1c3Rlci1wbGFjZW1lbnQtbW9kZSc7XHJcbmltcG9ydCB7IEJpbmdNYXBTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLW1hcC5zZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGNvbnRhaW5zIGhlbHBlcmZ1bmN0aW9ucyB0byBtYXAgdmFyaW91cyBpbnRlcmZhY2VzIHVzZWQgdG8gcmVwcmVzZW50IG9wdGlvbnMgYW5kIHN0cnVjdHVyZXMgaW50byB0aGVcclxuICogY29ycmVzcG9uZGluZyBCaW5nIE1hcHMgVjggc3BlY2lmaWMgaW1wbGVtZW50YXRpb25zLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmluZ0NvbnZlcnNpb25zIHtcclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBCaW5nIE1hcCBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfbWFwT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICdiYWNrZ3JvdW5kQ29sb3InLFxyXG4gICAgICAgICdjcmVkZW50aWFscycsXHJcbiAgICAgICAgJ2N1c3RvbWl6ZU92ZXJsYXlzJyxcclxuICAgICAgICAnY3VzdG9tTWFwU3R5bGUnLFxyXG4gICAgICAgICdkaXNhYmxlQmlyZHNleWUnLFxyXG4gICAgICAgICdkaXNhYmxlS2V5Ym9hcmRJbnB1dCcsXHJcbiAgICAgICAgJ2Rpc2FibGVNb3VzZUlucHV0JyxcclxuICAgICAgICAnZGlzYWJsZVBhbm5pbmcnLFxyXG4gICAgICAgICdkaXNhYmxlVG91Y2hJbnB1dCcsXHJcbiAgICAgICAgJ2Rpc2FibGVVc2VySW5wdXQnLFxyXG4gICAgICAgICdkaXNhYmxlWm9vbWluZycsXHJcbiAgICAgICAgJ2Rpc2FibGVTdHJlZXRzaWRlJyxcclxuICAgICAgICAnZW5hYmxlQ2xpY2thYmxlTG9nbycsXHJcbiAgICAgICAgJ2VuYWJsZVNlYXJjaExvZ28nLFxyXG4gICAgICAgICdmaXhlZE1hcFBvc2l0aW9uJyxcclxuICAgICAgICAnaGVpZ2h0JyxcclxuICAgICAgICAnaW5lcnRpYUludGVuc2l0eScsXHJcbiAgICAgICAgJ25hdmlnYXRpb25CYXJNb2RlJyxcclxuICAgICAgICAnc2hvd0JyZWFkY3J1bWInLFxyXG4gICAgICAgICdzaG93Q29weXJpZ2h0JyxcclxuICAgICAgICAnc2hvd0Rhc2hib2FyZCcsXHJcbiAgICAgICAgJ3Nob3dNYXBUeXBlU2VsZWN0b3InLFxyXG4gICAgICAgICdzaG93U2NhbGViYXInLFxyXG4gICAgICAgICd0aGVtZScsXHJcbiAgICAgICAgJ3RpbGVCdWZmZXInLFxyXG4gICAgICAgICd1c2VJbmVydGlhJyxcclxuICAgICAgICAnd2lkdGgnLFxyXG4gICAgICAgICdjZW50ZXInLFxyXG4gICAgICAgICd6b29tJyxcclxuICAgICAgICAnbWFwVHlwZUlkJyxcclxuICAgICAgICAnbGl0ZU1vZGUnXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmlldyBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gQmluZyBNYXAgcHJvcGVydGllc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3ZpZXdPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgJ2FuaW1hdGUnLFxyXG4gICAgICAgICdib3VuZHMnLFxyXG4gICAgICAgICdjZW50ZXInLFxyXG4gICAgICAgICdjZW50ZXJPZmZzZXQnLFxyXG4gICAgICAgICdoZWFkaW5nJyxcclxuICAgICAgICAnbGFiZWxPdmVybGF5JyxcclxuICAgICAgICAnbWFwVHlwZUlkJyxcclxuICAgICAgICAncGFkZGluZycsXHJcbiAgICAgICAgJ3pvb20nXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5mb1dpbmRvdyBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gQmluZyBNYXAgcHJvcGVydGllc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luZm9XaW5kb3dPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgJ2FjdGlvbnMnLFxyXG4gICAgICAgICdkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgJ2h0bWxDb250ZW50JyxcclxuICAgICAgICAnaWQnLFxyXG4gICAgICAgICdwb3NpdGlvbicsXHJcbiAgICAgICAgJ3BpeGVsT2Zmc2V0JyxcclxuICAgICAgICAnc2hvd0Nsb3NlQnV0dG9uJyxcclxuICAgICAgICAnc2hvd1BvaW50ZXInLFxyXG4gICAgICAgICdwdXNocGluJyxcclxuICAgICAgICAndGl0bGUnLFxyXG4gICAgICAgICd0aXRsZUNsaWNrSGFuZGxlcicsXHJcbiAgICAgICAgJ3R5cGVOYW1lJyxcclxuICAgICAgICAndmlzaWJsZScsXHJcbiAgICAgICAgJ3dpZHRoJyxcclxuICAgICAgICAnaGVpZ2h0J1xyXG4gICAgXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmtlciBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gQmluZyBNYXAgcHJvcGVydGllc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX21hcmtlck9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnYW5jaG9yJyxcclxuICAgICAgICAnZHJhZ2dhYmxlJyxcclxuICAgICAgICAnaGVpZ2h0JyxcclxuICAgICAgICAnaHRtbENvbnRlbnQnLFxyXG4gICAgICAgICdpY29uJyxcclxuICAgICAgICAnaW5mb2JveCcsXHJcbiAgICAgICAgJ3N0YXRlJyxcclxuICAgICAgICAndGl0bGUnLFxyXG4gICAgICAgICd0ZXh0T2Zmc2V0JyxcclxuICAgICAgICAndHlwZU5hbWUnLFxyXG4gICAgICAgICd2aXNpYmxlJyxcclxuICAgICAgICAnd2lkdGgnLFxyXG4gICAgICAgICd6SW5kZXgnXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9seWdvbiBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gQmluZyBNYXAgUG9seWdvbiBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfcG9seWdvbk9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnY3Vyc29yJyxcclxuICAgICAgICAnZmlsbENvbG9yJyxcclxuICAgICAgICAnZmlsbE9wYWNpdHknLFxyXG4gICAgICAgICdzdHJva2VDb2xvcicsXHJcbiAgICAgICAgJ3N0cm9rZU9wYWNpdHknLFxyXG4gICAgICAgICdzdHJva2VXZWlnaHQnLFxyXG4gICAgICAgICd2aXNpYmxlJ1xyXG4gICAgXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvbHlsaW5lIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBCaW5nIE1hcCBQb2x5bGluZSBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfcG9seWxpbmVPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgJ2N1cnNvcicsXHJcbiAgICAgICAgJ3N0cm9rZUNvbG9yJyxcclxuICAgICAgICAnc3Ryb2tlT3BhY2l0eScsXHJcbiAgICAgICAgJ3N0cm9rZVdlaWdodCcsXHJcbiAgICAgICAgJ3Zpc2libGUnXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2x1c3RlciBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gQmluZyBNYXAgcHJvcGVydGllc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2NsdXN0ZXJPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgJ2NhbGxiYWNrJyxcclxuICAgICAgICAnY2x1c3RlcmVkUGluQ2FsbGJhY2snLFxyXG4gICAgICAgICdjbHVzdGVyaW5nRW5hYmxlZCcsXHJcbiAgICAgICAgJ2dyaWRTaXplJyxcclxuICAgICAgICAnbGF5ZXJPZmZzZXQnLFxyXG4gICAgICAgICdwbGFjZW1lbnRNb2RlJyxcclxuICAgICAgICAndmlzaWJsZScsXHJcbiAgICAgICAgJ3pJbmRleCdcclxuICAgIF07XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHVibGljIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhbiBJSW5mb1dpbmRvd0FjdGlvbiB0byBhIE1pY3Jvc29mdC5NYXBzLklJbmZvYm94QWN0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBhY3Rpb24gLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBOYXZ0aXZlIG1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUFjdGlvbihhY3Rpb246IElJbmZvV2luZG93QWN0aW9uKTogTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hBY3Rpb25zIHtcclxuICAgICAgICBjb25zdCBhOiBNaWNyb3NvZnQuTWFwcy5JSW5mb2JveEFjdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlcjogYWN0aW9uLmV2ZW50SGFuZGxlcixcclxuICAgICAgICAgICAgbGFiZWw6IGFjdGlvbi5sYWJlbFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIEFycmF5IG9mIElJbmZvV2luZG93QWN0aW9uIHRvIGFuIEFycmF5IG9mIE1pY3Jvc29mdC5NYXBzLklJbmZvYm94QWN0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBhY3Rpb25zIC0gQXJyYXkgb2Ygb2JqZWN0cyB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIEFycmF5IG9mIG1hcHBlZCBvYmplY3RzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVBY3Rpb25zKGFjdGlvbnM6IEFycmF5PElJbmZvV2luZG93QWN0aW9uPik6IEFycmF5PE1pY3Jvc29mdC5NYXBzLklJbmZvYm94QWN0aW9ucz4ge1xyXG4gICAgICAgIGNvbnN0IGE6IEFycmF5PE1pY3Jvc29mdC5NYXBzLklJbmZvYm94QWN0aW9ucz4gPSBuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hBY3Rpb25zPigpO1xyXG4gICAgICAgIGFjdGlvbnMuZm9yRWFjaCh4ID0+IGEucHVzaChCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlQWN0aW9uKHgpKSk7XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElCb3ggb2JqZWN0IHRvIGEgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb25SZWN0IG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gYm94IC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlQm91bmRzKGJveDogSUJveCk6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uUmVjdCB7XHJcbiAgICAgICAgY29uc3QgcjogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb25SZWN0ID1cclxuICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb25SZWN0LmZyb21FZGdlcyhib3gubWF4TGF0aXR1ZGUsIGJveC5taW5Mb25naXR1ZGUsIGJveC5taW5MYXRpdHVkZSwgYm94Lm1heExvbmdpdHVkZSk7XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElDbHVzdGVyT3B0aW9ucyBvYmplY3QgdG8gYSBNaWNyb3NvZnQuTWFwcy5JQ2x1c3RlckxheWVyT3B0aW9ucyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVDbHVzdGVyT3B0aW9ucyhvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMpOiBNaWNyb3NvZnQuTWFwcy5JQ2x1c3RlckxheWVyT3B0aW9ucyB7XHJcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSUNsdXN0ZXJMYXllck9wdGlvbnMgfCBhbnkgPSB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gQmluZ0NvbnZlcnNpb25zLl9jbHVzdGVyT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ2xheWVyT2Zmc2V0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8ubGF5ZXJPZmZzZXQgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9pbnQob3B0aW9ucy5sYXllck9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ3BsYWNlbWVudE1vZGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucGxhY2VtZW50TW9kZSA9PT0gQ2x1c3RlclBsYWNlbWVudE1vZGUuRmlyc3RQaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5wbGFjZW1lbnRNb2RlID0gTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclBsYWNlbWVudFR5cGUuRmlyc3RMb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ucGxhY2VtZW50TW9kZSA9IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQbGFjZW1lbnRUeXBlLk1lYW5BdmVyYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ba10gPSAoPGFueT5vcHRpb25zKVtrXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElJbmZvV2luZG93T3B0aW9ucyBvYmplY3QgdG8gYSBNaWNyb3NvZnQuTWFwcy5JSW5mb2JveE9wdGlvbnMgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlSW5mb0JveE9wdGlvbnMob3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zKTogTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hPcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JSW5mb2JveE9wdGlvbnMgfCBhbnkgPSB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gQmluZ0NvbnZlcnNpb25zLl9pbmZvV2luZG93T3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ3BpeGVsT2Zmc2V0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8ub2Zmc2V0ID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBvaW50KG9wdGlvbnMucGl4ZWxPZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PT0gJ3Bvc2l0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8ubG9jYXRpb24gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24ob3B0aW9ucy5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnYWN0aW9ucycpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLmFjdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlQWN0aW9ucyhvcHRpb25zLmFjdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSU1hcE9wdGlvbnMgb2JqZWN0IHRvIGEgTWljcm9zb2Z0Lk1hcHMuSU1hcExvYWRPcHRpb25zIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUxvYWRPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKTogTWljcm9zb2Z0Lk1hcHMuSU1hcExvYWRPcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JTWFwTG9hZE9wdGlvbnMgfCBhbnkgPSB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJpbmdDb252ZXJzaW9ucy5fbWFwT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEgfHwgQmluZ0NvbnZlcnNpb25zLl92aWV3T3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTE7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ2NlbnRlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLmNlbnRlciA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihvcHRpb25zLmNlbnRlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnbWFwVHlwZUlkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1hcFR5cGVJZCA9PT0gTWFwVHlwZUlkLmh5YnJpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLm1hcFR5cGVJZCA9IE1pY3Jvc29mdC5NYXBzLk1hcFR5cGVJZC5hZXJpYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ubGFiZWxPdmVybGF5ID0gTWljcm9zb2Z0Lk1hcHMuTGFiZWxPdmVybGF5LnZpc2libGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMubWFwVHlwZUlkID09PSBNYXBUeXBlSWQuYWVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ubWFwVHlwZUlkID0gTWljcm9zb2Z0Lk1hcHMuTWFwVHlwZUlkLmFlcmlhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5sYWJlbE92ZXJsYXkgPSBNaWNyb3NvZnQuTWFwcy5MYWJlbE92ZXJsYXkuaGlkZGVuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5tYXBUeXBlSWQgPSBNaWNyb3NvZnQuTWFwcy5NYXBUeXBlSWRbKDxhbnk+TWFwVHlwZUlkKVtvcHRpb25zLm1hcFR5cGVJZF1dO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdib3VuZHMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5ib3VuZHMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlQm91bmRzKG9wdGlvbnMuYm91bmRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ba10gPSAoPGFueT5vcHRpb25zKVtrXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElMYXRMb25nIG9iamVjdCB0byBhIE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF0bG9uZyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUxvY2F0aW9uKGxhdGxvbmc6IElMYXRMb25nKTogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24ge1xyXG4gICAgICAgIGNvbnN0IGw6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gbmV3IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uKGxhdGxvbmcubGF0aXR1ZGUsIGxhdGxvbmcubG9uZ2l0dWRlKTtcclxuICAgICAgICByZXR1cm4gbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSU1hcmtlck9wdGlvbnMgb2JqZWN0IHRvIGEgTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSBtYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVNYXJrZXJPcHRpb25zKG9wdGlvbnM6IElNYXJrZXJPcHRpb25zKTogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gQmluZ0NvbnZlcnNpb25zLl9tYXJrZXJPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcclxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrID09PSAnYW5jaG9yJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8uYW5jaG9yID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBvaW50KG9wdGlvbnMuYW5jaG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICg8YW55Pm8pW2tdID0gKDxhbnk+b3B0aW9ucylba107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhbiBJTWFwT3B0aW9ucyBvYmplY3QgdG8gYSBNaWNyb3NvZnQuTWFwcy5JTWFwT3B0aW9ucyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKTogTWljcm9zb2Z0Lk1hcHMuSU1hcE9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklNYXBPcHRpb25zIHwgYW55ID0ge307XHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgICAgICAgICAgLmZpbHRlcihrID0+IEJpbmdDb252ZXJzaW9ucy5fbWFwT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ2NlbnRlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLmNlbnRlciA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihvcHRpb25zLmNlbnRlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnbWFwVHlwZUlkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8ubWFwVHlwZUlkID0gTWljcm9zb2Z0Lk1hcHMuTWFwVHlwZUlkWyg8YW55Pk1hcFR5cGVJZClbb3B0aW9ucy5tYXBUeXBlSWRdXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ba10gPSAoPGFueT5vcHRpb25zKVtrXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGVzIGFuIGFycmF5IG9mIGxvY2F0aW9ucyBvciBhbiBhcnJheSBvciBhcnJheXMgb2YgbG9jYXRpb24gdG8gYW5kIGFycmF5IG9mIGFycmF5cyBvZiBCaW5nIE1hcCBMb2NhdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aHMgLSBJTGF0TG9uZyBiYXNlZCBsb2NhdGlvbnMgdG8gY29udmVydC5cclxuICAgICAqIEByZXR1cm5zIC0gY29udmVydGVkIGxvY2F0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlUGF0aHMocGF0aHM6IEFycmF5PElMYXRMb25nPiB8IEFycmF5PEFycmF5PElMYXRMb25nPj4pOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+IHtcclxuICAgICAgICBjb25zdCBwOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+ID0gbmV3IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4oKTtcclxuICAgICAgICBpZiAocGF0aHMgPT0gbnVsbCB8fCAhQXJyYXkuaXNBcnJheShwYXRocykgfHwgcGF0aHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHAucHVzaChuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHBhdGhzWzBdKSkge1xyXG4gICAgICAgICAgICAvLyBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb3IgYXJyYXlzXHJcbiAgICAgICAgICAgIC8vIHVzIGZvciBsb29wIGZvciBwZXJmb3JtYW5jZVxyXG4gICAgICAgICAgICBjb25zdCBwMSA9IDxBcnJheTxBcnJheTxJTGF0TG9uZz4+PnBhdGhzO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBfcDogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+ID0gbmV3IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPigpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwMVtpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9wLnB1c2gobmV3IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uKHAxW2ldW2pdLmxhdGl0dWRlLCBwMVtpXVtqXS5sb25naXR1ZGUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHAucHVzaChfcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhIHNpbXBsZSBhcnJheS4uLi5cclxuICAgICAgICAgICAgY29uc3QgeTogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+ID0gbmV3IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPigpO1xyXG4gICAgICAgICAgICBjb25zdCBwMSA9IDxBcnJheTxJTGF0TG9uZz4+cGF0aHM7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHkucHVzaChuZXcgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24ocDFbaV0ubGF0aXR1ZGUsIHAxW2ldLmxvbmdpdHVkZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHAucHVzaCh5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgTWFwcyBhbiBJUG9pbnQgb2JqZWN0IHRvIGEgTWljcm9zb2Z0Lk1hcHMuUG9pbnQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwb2ludCAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZVBvaW50KHBvaW50OiBJUG9pbnQpOiBNaWNyb3NvZnQuTWFwcy5Qb2ludCB7XHJcbiAgICAgICAgY29uc3QgcDogTWljcm9zb2Z0Lk1hcHMuUG9pbnQgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9pbnQocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgTWFwcyBhbiBJUG9seWdvbk9wdGlvbnMgb2JqZWN0IHRvIGEgTWljcm9zb2Z0Lk1hcHMuSVBvbHlnb25PcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlUG9seWdvbk9wdGlvbnMob3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogTWljcm9zb2Z0Lk1hcHMuSVBvbHlnb25PcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUG9seWdvbk9wdGlvbnMgPSB7fTtcclxuICAgICAgICBjb25zdCBmOiAoczogc3RyaW5nLCBhOiBudW1iZXIpID0+IHN0cmluZyA9IChzLCBhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG0gPSAvcmdiYT9cXCgoXFxkKylcXHMqLFxccyooXFxkKylcXHMqLFxccyooXFxkKylcXHMqKCxcXHMqXFxkK1tcXC5cXGQrXSopKlxcKS9nLmV4ZWMocyk7XHJcbiAgICAgICAgICAgIGlmIChtICYmIG0ubGVuZ3RoID4gMykge1xyXG4gICAgICAgICAgICAgICAgYSA9IGEgPiAxID8gKGEgLyAxMDApIDogYTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAncmdiYSgnICsgW21bMV0sIG1bMl0sIG1bM10sIGFdLmpvaW4oJywnKSArICcpJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzWzBdID09PSAnIycpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHg6IG51bWJlciA9IGEgPiAxID8gYSA6IE1hdGguZmxvb3IoYSAqIDI1NSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB6OiBzdHJpbmcgPSBzLnN1YnN0cigxKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHI6IG51bWJlciA9IHBhcnNlSW50KHouc3Vic3RyKDAsIDIpLCAxNik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBnOiBudW1iZXIgPSBwYXJzZUludCh6LnN1YnN0cigyLCAyKSwgMTYpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYjogbnVtYmVyID0gcGFyc2VJbnQoei5zdWJzdHIoNCwgMiksIDE2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAncmdiYSgnICsgW3IgLCBnLCBiLCBhXS5qb2luKCcsJykgKyAnKSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBCaW5nQ29udmVyc2lvbnMuX3BvbHlnb25PcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcclxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrID09PSAnc3Ryb2tlV2VpZ2h0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8uc3Ryb2tlVGhpY2tuZXNzID0gb3B0aW9ucy5zdHJva2VXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnc3Ryb2tlQ29sb3InKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc3Ryb2tlT3BhY2l0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLnN0cm9rZUNvbG9yID0gZihvcHRpb25zLnN0cm9rZUNvbG9yLCBvcHRpb25zLnN0cm9rZU9wYWNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5zdHJva2VDb2xvciA9IG9wdGlvbnMuc3Ryb2tlQ29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PT0gJ3N0cm9rZU9wYWNpdHknKSB7fVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PT0gJ2ZpbGxDb2xvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5maWxsT3BhY2l0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLmZpbGxDb2xvciA9IGYob3B0aW9ucy5maWxsQ29sb3IsIG9wdGlvbnMuZmlsbE9wYWNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgby5maWxsQ29sb3IgPSBvcHRpb25zLmZpbGxDb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnZmlsbE9wYWNpdHknKSB7fVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+bylba10gPSAoPGFueT5vcHRpb25zKVtrXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgTWFwcyBhbiBJUG9seWxpbmVPcHRpb25zIG9iamVjdCB0byBhIE1pY3Jvc29mdC5NYXBzLklQb2x5bGluZU9wdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVQb2x5bGluZU9wdGlvbnMob3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IE1pY3Jvc29mdC5NYXBzLklQb2x5bGluZU9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQb2x5bGluZU9wdGlvbnMgfCBhbnkgPSB7fTtcclxuICAgICAgICBjb25zdCBmOiAoczogc3RyaW5nLCBhOiBudW1iZXIpID0+IHN0cmluZyA9IChzLCBhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG0gPSAvcmdiYT9cXCgoXFxkKylcXHMqLFxccyooXFxkKylcXHMqLFxccyooXFxkKylcXHMqKCxcXHMqXFxkK1tcXC5cXGQrXSopKlxcKS9nLmV4ZWMocyk7XHJcbiAgICAgICAgICAgIGlmIChtICYmIG0ubGVuZ3RoID4gMykge1xyXG4gICAgICAgICAgICAgICAgYSA9IGEgPiAxID8gKGEgLyAxMDApIDogYTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAncmdiYSgnICsgW21bMV0sIG1bMl0sIG1bM10sIGFdLmpvaW4oJywnKSArICcpJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzWzBdID09PSAnIycpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHg6IG51bWJlciA9IGEgPiAxID8gYSA6IE1hdGguZmxvb3IoYSAqIDI1NSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB6OiBzdHJpbmcgPSBzLnN1YnN0cigxKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHI6IG51bWJlciA9IHBhcnNlSW50KHouc3Vic3RyKDAsIDIpLCAxNik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBnOiBudW1iZXIgPSBwYXJzZUludCh6LnN1YnN0cigyLCAyKSwgMTYpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYjogbnVtYmVyID0gcGFyc2VJbnQoei5zdWJzdHIoNCwgMiksIDE2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAncmdiYSgnICsgW3IgLCBnLCBiLCBhXS5qb2luKCcsJykgKyAnKSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgICAgICAgICAgLmZpbHRlcihrID0+IEJpbmdDb252ZXJzaW9ucy5fcG9seWxpbmVPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcclxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrID09PSAnc3Ryb2tlV2VpZ2h0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8uc3Ryb2tlVGhpY2tuZXNzID0gb3B0aW9ucy5zdHJva2VXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGsgPT09ICdzdHJva2VDb2xvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zdHJva2VPcGFjaXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uc3Ryb2tlQ29sb3IgPSBmKG9wdGlvbnMuc3Ryb2tlQ29sb3IsIG9wdGlvbnMuc3Ryb2tlT3BhY2l0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLnN0cm9rZUNvbG9yID0gb3B0aW9ucy5zdHJva2VDb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnc3Ryb2tlT3BhY2l0eScpIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ba10gPSAoPGFueT5vcHRpb25zKVtrXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElNYXBPcHRpb25zIG9iamVjdCB0byBhIE1pY3Jvc29mdC5NYXBzLklWaWV3T3B0aW9ucyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVWaWV3T3B0aW9ucyhvcHRpb25zOiBJTWFwT3B0aW9ucyk6IE1pY3Jvc29mdC5NYXBzLklWaWV3T3B0aW9ucyB7XHJcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVZpZXdPcHRpb25zIHwgYW55ID0ge307XHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgICAgICAgICAgLmZpbHRlcihrID0+IEJpbmdDb252ZXJzaW9ucy5fdmlld09wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdjZW50ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5jZW50ZXIgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24ob3B0aW9ucy5jZW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChrID09PSAnYm91bmRzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8uYm91bmRzID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUJvdW5kcyhvcHRpb25zLmJvdW5kcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGsgPT09ICdjZW50ZXJPZmZzZXQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5jZW50ZXJPZmZzZXQgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9pbnQob3B0aW9ucy5jZW50ZXJPZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChrID09PSAnbWFwVHlwZUlkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8ubWFwVHlwZUlkID0gTWljcm9zb2Z0Lk1hcHMuTWFwVHlwZUlkWyg8YW55Pk1hcFR5cGVJZClbb3B0aW9ucy5tYXBUeXBlSWRdXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbn1cclxuIl19