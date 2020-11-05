/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as GoogleMapTypes from './google-map-types';
import { MapTypeId } from '../../models/map-type-id';
/**
 * This class contains helperfunctions to map various interfaces used to represent options and structures into the
 * corresponding Google Maps specific implementations.
 *
 * @export
 */
var GoogleConversions = /** @class */ (function () {
    function GoogleConversions() {
    }
    /**
     * Maps an IBox object to a GoogleMapTypes.LatLngBoundsLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} bounds - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateBounds = /**
     * Maps an IBox object to a GoogleMapTypes.LatLngBoundsLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} bounds - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (bounds) {
        var /** @type {?} */ b = {
            east: bounds.maxLongitude,
            north: bounds.maxLatitude,
            south: bounds.minLatitude,
            west: bounds.minLongitude,
        };
        return b;
    };
    /**
     * Maps an IInfoWindowOptions object to a GoogleMapTypes.InfoWindowOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateInfoWindowOptions = /**
     * Maps an IInfoWindowOptions object to a GoogleMapTypes.InfoWindowOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (options) {
        var /** @type {?} */ o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._infoWindowOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            if (k === 'htmlContent') {
                o.content = (/** @type {?} */ (options))[k];
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        if (o.content == null || o.content === '') {
            if (options.title !== '' && options.description !== '') {
                o.content = options.title + ": " + options.description;
            }
            else if (options.description !== '') {
                o.content = options.description;
            }
            else {
                o.content = options.title;
            }
        }
        return o;
    };
    /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLngLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLocation = /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLngLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlong) {
        var /** @type {?} */ l = { lat: latlong.latitude, lng: latlong.longitude };
        return l;
    };
    /**
     * Maps an GoogleMapTypes.LatLngLiteral object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLatLng = /**
     * Maps an GoogleMapTypes.LatLngLiteral object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlng) {
        var /** @type {?} */ l = { latitude: latlng.lat, longitude: latlng.lng };
        return l;
    };
    /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLocationObject = /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlong) {
        var /** @type {?} */ l = new google.maps.LatLng(latlong.latitude, latlong.longitude);
        return l;
    };
    /**
     * Maps an GoogleMapTypes.LatLng object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLatLngObject = /**
     * Maps an GoogleMapTypes.LatLng object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlng) {
        var /** @type {?} */ l = { latitude: latlng.lat(), longitude: latlng.lng() };
        return l;
    };
    /**
     * Maps an ILatLong array to a array of GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlongArray - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLocationObjectArray = /**
     * Maps an ILatLong array to a array of GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlongArray - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlongArray) {
        // use for loop for performance in case we deal with large numbers of points and paths...
        var /** @type {?} */ p = new Array();
        for (var /** @type {?} */ i = 0; i < latlongArray.length; i++) {
            p.push(GoogleConversions.TranslateLocationObject(latlongArray[i]));
        }
        return p;
    };
    /**
     * Maps a MapTypeId object to a Google maptype string.
     *
     * \@memberof GoogleConversions
     * @param {?} mapTypeId - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateMapTypeId = /**
     * Maps a MapTypeId object to a Google maptype string.
     *
     * \@memberof GoogleConversions
     * @param {?} mapTypeId - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (mapTypeId) {
        switch (mapTypeId) {
            case MapTypeId.road: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.roadmap];
            case MapTypeId.grayscale: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.terrain];
            case MapTypeId.hybrid: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.hybrid];
            case MapTypeId.ordnanceSurvey: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.terrain];
            default: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.satellite];
        }
    };
    /**
     * Maps an IMarkerOptions object to a GoogleMapTypes.MarkerOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Promise that when resolved contains the mapped object.
     *
     */
    GoogleConversions.TranslateMarkerOptions = /**
     * Maps an IMarkerOptions object to a GoogleMapTypes.MarkerOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Promise that when resolved contains the mapped object.
     *
     */
    function (options) {
        var /** @type {?} */ o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._markerOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            if (k === 'position') {
                var /** @type {?} */ latlng = GoogleConversions.TranslateLocationObject(options[k]);
                o.position = latlng;
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    };
    /**
     * Maps an IMapOptions object to a GoogleMapTypes.MapOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateOptions = /**
     * Maps an IMapOptions object to a GoogleMapTypes.MapOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (options) {
        var /** @type {?} */ o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._mapOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            if (k === 'center') {
                o.center = GoogleConversions.TranslateLocation(options.center);
            }
            else if (k === 'mapTypeId') {
                o.mapTypeId = GoogleConversions.TranslateMapTypeId(options.mapTypeId);
            }
            else if (k === 'disableZooming') {
                o.gestureHandling = 'none';
                o.zoomControl = false;
            }
            else if (k === 'showMapTypeSelector') {
                o.mapTypeControl = false;
            }
            else if (k === 'customMapStyleGoogle') {
                o.styles = /** @type {?} */ (/** @type {?} */ (options.customMapStyleGoogle));
            }
            else {
                (/** @type {?} */ (o))[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    };
    /**
     * Translates an array of locations or an array or arrays of location to and array of arrays of Bing Map Locations
     *
     * \@memberof GoogleConversions
     * @param {?} paths - ILatLong based locations to convert.
     * @return {?} - converted locations.
     *
     */
    GoogleConversions.TranslatePaths = /**
     * Translates an array of locations or an array or arrays of location to and array of arrays of Bing Map Locations
     *
     * \@memberof GoogleConversions
     * @param {?} paths - ILatLong based locations to convert.
     * @return {?} - converted locations.
     *
     */
    function (paths) {
        var /** @type {?} */ p = new Array();
        if (paths == null || !Array.isArray(paths) || paths.length === 0) {
            p.push(new Array());
        }
        else if (Array.isArray(paths[0])) {
            // parameter is an array or arrays
            // use for loop for performance in case we deal with large numbers of points and paths...
            var /** @type {?} */ p1 = /** @type {?} */ (paths);
            for (var /** @type {?} */ i = 0; i < p1.length; i++) {
                p.push(GoogleConversions.TranslateLocationObjectArray(p1[i]));
            }
        }
        else {
            // parameter is a simple array....
            p.push(GoogleConversions.TranslateLocationObjectArray(/** @type {?} */ (paths)));
        }
        return p;
    };
    /**
     *  Maps an IPolygonOptions object to a GoogleMapTypes.PolygonOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslatePolygonOptions = /**
     *  Maps an IPolygonOptions object to a GoogleMapTypes.PolygonOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (options) {
        var /** @type {?} */ o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._polygonOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            if (k === 'paths') {
                if (!Array.isArray(options.paths)) {
                    return;
                }
                if (options.paths.length === 0) {
                    o.paths = new Array();
                }
                else if (Array.isArray(options.paths[0])) {
                    o.paths = new Array();
                    // use for loop for performance in case we deal with large numbers of points and paths..
                    var /** @type {?} */ p1 = /** @type {?} */ (options.paths);
                    for (var /** @type {?} */ i = 0; i < p1.length; i++) {
                        o.paths[i] = new Array();
                        for (var /** @type {?} */ j = 0; j < p1[i].length; j++) {
                            o.paths[i][j] = { lat: p1[i][j].latitude, lng: p1[i][j].longitude };
                        }
                    }
                }
                else {
                    o.paths = new Array();
                    // use for loop for performance in case we deal with large numbers of points and paths..
                    var /** @type {?} */ p1 = /** @type {?} */ (options.paths);
                    for (var /** @type {?} */ i = 0; i < p1.length; i++) {
                        o.paths[i] = { lat: p1[i].latitude, lng: p1[i].longitude };
                    }
                }
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    };
    /**
     *  Maps an IPolylineOptions object to a GoogleMapTypes.PolylineOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslatePolylineOptions = /**
     *  Maps an IPolylineOptions object to a GoogleMapTypes.PolylineOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (options) {
        var /** @type {?} */ o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._polylineOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            o[k] = (/** @type {?} */ (options))[k];
        });
        return o;
    };
    /**
     * Map option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._mapOptionsAttributes = [
        'backgroundColor',
        'center',
        'clickableIcons',
        'customMapStyleGoogle',
        'disableDefaultUI',
        'disableDoubleClickZoom',
        'draggable',
        'draggableCursor',
        'draggingCursor',
        'disableZooming',
        'fullscreenControl',
        'fullscreenControlOptions',
        'gestureHandling',
        'heading',
        'keyboardShortcuts',
        'mapTypeControl',
        'mapTypeControlOptions',
        'mapTypeId',
        'maxZoom',
        'minZoom',
        'noClear',
        'panControl',
        'panControlOptions',
        'rotateControl',
        'rotateControlOptions',
        'scaleControl',
        'scaleControlOptions',
        'scrollwheel',
        'showMapTypeSelector',
        'streetView',
        'streetViewControl',
        'streetViewControlOptions',
        'styles',
        'tilt',
        'zoom',
        'zoomControl',
        'zoomControlOptions'
    ];
    /**
     * InfoWindow option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._infoWindowOptionsAttributes = [
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
     * Marker option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._markerOptionsAttributes = [
        'anchor',
        'position',
        'title',
        'text',
        'label',
        'draggable',
        'icon',
        'width',
        'height',
        'iconInfo',
        'metadata',
        'visible'
    ];
    /**
     * Cluster option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._clusterOptionsAttributes = [
        'callback',
        'clusteredPinCallback',
        'clusteringEnabled',
        'gridSize',
        'layerOffset',
        'placementMode',
        'visible',
        'zIndex'
    ];
    /**
     * Polygon option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._polygonOptionsAttributes = [
        'clickable',
        'draggable',
        'editable',
        'fillColor',
        'fillOpacity',
        'geodesic',
        'paths',
        'strokeColor',
        'strokeOpacity',
        'strokeWeight',
        'visible',
        'zIndex'
    ];
    /**
     * Polyline option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._polylineOptionsAttributes = [
        'clickable',
        'draggable',
        'editable',
        'geodesic',
        'strokeColor',
        'strokeOpacity',
        'strokeWeight',
        'visible',
        'zIndex'
    ];
    return GoogleConversions;
}());
export { GoogleConversions };
function GoogleConversions_tsickle_Closure_declarations() {
    /**
     * Map option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._mapOptionsAttributes;
    /**
     * InfoWindow option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._infoWindowOptionsAttributes;
    /**
     * Marker option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._markerOptionsAttributes;
    /**
     * Cluster option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._clusterOptionsAttributes;
    /**
     * Polygon option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._polygonOptionsAttributes;
    /**
     * Polyline option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._polylineOptionsAttributes;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWNvbnZlcnNpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtY29udmVyc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU9BLE9BQU8sS0FBSyxjQUFjLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzS25DLGlDQUFlOzs7Ozs7OztjQUFDLE1BQVk7UUFDdEMscUJBQU0sQ0FBQyxHQUF1QztZQUMxQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVk7WUFDekIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQ3pCLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVztZQUN6QixJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVk7U0FDNUIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXQyw0Q0FBMEI7Ozs7Ozs7O2NBQUMsT0FBMkI7UUFDaEUscUJBQU0sQ0FBQyxHQUEyQyxFQUFFLENBQUM7UUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDZixNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxpQkFBaUIsQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQWhFLENBQWdFLENBQUM7YUFDN0UsT0FBTyxDQUFDLFVBQUMsQ0FBQztZQUNQLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUMsT0FBTyxHQUFHLG1CQUFNLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLG1CQUFNLE9BQU8sRUFB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QixVQUFVO1FBQ1YsYUFBYTtRQUNiLGVBQWU7UUFDZixTQUFTO1FBQ1QsUUFBUTtLQUNYOzs7Ozs7a0RBT29EO1FBQ2pELFdBQVc7UUFDWCxXQUFXO1FBQ1gsVUFBVTtRQUNWLFdBQVc7UUFDWCxhQUFhO1FBQ2IsVUFBVTtRQUNWLE9BQU87UUFDUCxhQUFhO1FBQ2IsZUFBZTtRQUNmLGNBQWM7UUFDZCxTQUFTO1FBQ1QsUUFBUTtLQUNYOzs7Ozs7bURBT3FEO1FBQ2xELFdBQVc7UUFDWCxXQUFXO1FBQ1gsVUFBVTtRQUNWLFVBQVU7UUFDVixhQUFhO1FBQ2IsZUFBZTtRQUNmLGNBQWM7UUFDZCxTQUFTO1FBQ1QsUUFBUTtLQUNYOzRCQXBLTDs7U0FtQmEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XHJcbmltcG9ydCB7IElCb3ggfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lib3gnO1xyXG5pbXBvcnQgeyBJTWFwT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcC1vcHRpb25zJztcclxuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XHJcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcclxuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi9nb29nbGUtbWFwLXR5cGVzJztcclxuaW1wb3J0IHsgTWFwVHlwZUlkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcC10eXBlLWlkJztcclxuXHJcbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGNvbnRhaW5zIGhlbHBlcmZ1bmN0aW9ucyB0byBtYXAgdmFyaW91cyBpbnRlcmZhY2VzIHVzZWQgdG8gcmVwcmVzZW50IG9wdGlvbnMgYW5kIHN0cnVjdHVyZXMgaW50byB0aGVcclxuICogY29ycmVzcG9uZGluZyBHb29nbGUgTWFwcyBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbnMuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVDb252ZXJzaW9ucyB7XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcCBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gR29vZ2xlIE1hcCBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9tYXBPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgJ2JhY2tncm91bmRDb2xvcicsXHJcbiAgICAgICAgJ2NlbnRlcicsXHJcbiAgICAgICAgJ2NsaWNrYWJsZUljb25zJyxcclxuICAgICAgICAnY3VzdG9tTWFwU3R5bGVHb29nbGUnLFxyXG4gICAgICAgICdkaXNhYmxlRGVmYXVsdFVJJyxcclxuICAgICAgICAnZGlzYWJsZURvdWJsZUNsaWNrWm9vbScsXHJcbiAgICAgICAgJ2RyYWdnYWJsZScsXHJcbiAgICAgICAgJ2RyYWdnYWJsZUN1cnNvcicsXHJcbiAgICAgICAgJ2RyYWdnaW5nQ3Vyc29yJyxcclxuICAgICAgICAnZGlzYWJsZVpvb21pbmcnLFxyXG4gICAgICAgICdmdWxsc2NyZWVuQ29udHJvbCcsXHJcbiAgICAgICAgJ2Z1bGxzY3JlZW5Db250cm9sT3B0aW9ucycsXHJcbiAgICAgICAgJ2dlc3R1cmVIYW5kbGluZycsXHJcbiAgICAgICAgJ2hlYWRpbmcnLFxyXG4gICAgICAgICdrZXlib2FyZFNob3J0Y3V0cycsXHJcbiAgICAgICAgJ21hcFR5cGVDb250cm9sJyxcclxuICAgICAgICAnbWFwVHlwZUNvbnRyb2xPcHRpb25zJyxcclxuICAgICAgICAnbWFwVHlwZUlkJyxcclxuICAgICAgICAnbWF4Wm9vbScsXHJcbiAgICAgICAgJ21pblpvb20nLFxyXG4gICAgICAgICdub0NsZWFyJyxcclxuICAgICAgICAncGFuQ29udHJvbCcsXHJcbiAgICAgICAgJ3BhbkNvbnRyb2xPcHRpb25zJyxcclxuICAgICAgICAncm90YXRlQ29udHJvbCcsXHJcbiAgICAgICAgJ3JvdGF0ZUNvbnRyb2xPcHRpb25zJyxcclxuICAgICAgICAnc2NhbGVDb250cm9sJyxcclxuICAgICAgICAnc2NhbGVDb250cm9sT3B0aW9ucycsXHJcbiAgICAgICAgJ3Njcm9sbHdoZWVsJyxcclxuICAgICAgICAnc2hvd01hcFR5cGVTZWxlY3RvcicsXHJcbiAgICAgICAgJ3N0cmVldFZpZXcnLFxyXG4gICAgICAgICdzdHJlZXRWaWV3Q29udHJvbCcsXHJcbiAgICAgICAgJ3N0cmVldFZpZXdDb250cm9sT3B0aW9ucycsXHJcbiAgICAgICAgJ3N0eWxlcycsXHJcbiAgICAgICAgJ3RpbHQnLFxyXG4gICAgICAgICd6b29tJyxcclxuICAgICAgICAnem9vbUNvbnRyb2wnLFxyXG4gICAgICAgICd6b29tQ29udHJvbE9wdGlvbnMnXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5mb1dpbmRvdyBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gR29vZ2xlIE1hcCBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbmZvV2luZG93T3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICdhY3Rpb25zJyxcclxuICAgICAgICAnZGVzY3JpcHRpb24nLFxyXG4gICAgICAgICdodG1sQ29udGVudCcsXHJcbiAgICAgICAgJ2lkJyxcclxuICAgICAgICAncG9zaXRpb24nLFxyXG4gICAgICAgICdwaXhlbE9mZnNldCcsXHJcbiAgICAgICAgJ3Nob3dDbG9zZUJ1dHRvbicsXHJcbiAgICAgICAgJ3Nob3dQb2ludGVyJyxcclxuICAgICAgICAncHVzaHBpbicsXHJcbiAgICAgICAgJ3RpdGxlJyxcclxuICAgICAgICAndGl0bGVDbGlja0hhbmRsZXInLFxyXG4gICAgICAgICd0eXBlTmFtZScsXHJcbiAgICAgICAgJ3Zpc2libGUnLFxyXG4gICAgICAgICd3aWR0aCcsXHJcbiAgICAgICAgJ2hlaWdodCdcclxuICAgIF07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJrZXIgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEdvb2dsZSBNYXAgcHJvcGVydGllc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfbWFya2VyT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICdhbmNob3InLFxyXG4gICAgICAgICdwb3NpdGlvbicsXHJcbiAgICAgICAgJ3RpdGxlJyxcclxuICAgICAgICAndGV4dCcsXHJcbiAgICAgICAgJ2xhYmVsJyxcclxuICAgICAgICAnZHJhZ2dhYmxlJyxcclxuICAgICAgICAnaWNvbicsXHJcbiAgICAgICAgJ3dpZHRoJyxcclxuICAgICAgICAnaGVpZ2h0JyxcclxuICAgICAgICAnaWNvbkluZm8nLFxyXG4gICAgICAgICdtZXRhZGF0YScsXHJcbiAgICAgICAgJ3Zpc2libGUnXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2x1c3RlciBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gR29vZ2xlIE1hcCBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9jbHVzdGVyT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICdjYWxsYmFjaycsXHJcbiAgICAgICAgJ2NsdXN0ZXJlZFBpbkNhbGxiYWNrJyxcclxuICAgICAgICAnY2x1c3RlcmluZ0VuYWJsZWQnLFxyXG4gICAgICAgICdncmlkU2l6ZScsXHJcbiAgICAgICAgJ2xheWVyT2Zmc2V0JyxcclxuICAgICAgICAncGxhY2VtZW50TW9kZScsXHJcbiAgICAgICAgJ3Zpc2libGUnLFxyXG4gICAgICAgICd6SW5kZXgnXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9seWdvbiBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gR29vZ2xlIE1hcCBwcm9wZXJ0aWVzXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9wb2x5Z29uT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICdjbGlja2FibGUnLFxyXG4gICAgICAgICdkcmFnZ2FibGUnLFxyXG4gICAgICAgICdlZGl0YWJsZScsXHJcbiAgICAgICAgJ2ZpbGxDb2xvcicsXHJcbiAgICAgICAgJ2ZpbGxPcGFjaXR5JyxcclxuICAgICAgICAnZ2VvZGVzaWMnLFxyXG4gICAgICAgICdwYXRocycsXHJcbiAgICAgICAgJ3N0cm9rZUNvbG9yJyxcclxuICAgICAgICAnc3Ryb2tlT3BhY2l0eScsXHJcbiAgICAgICAgJ3N0cm9rZVdlaWdodCcsXHJcbiAgICAgICAgJ3Zpc2libGUnLFxyXG4gICAgICAgICd6SW5kZXgnXHJcbiAgICBdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9seWxpbmUgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEdvb2dsZSBNYXAgcHJvcGVydGllc1xyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfcG9seWxpbmVPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgJ2NsaWNrYWJsZScsXHJcbiAgICAgICAgJ2RyYWdnYWJsZScsXHJcbiAgICAgICAgJ2VkaXRhYmxlJyxcclxuICAgICAgICAnZ2VvZGVzaWMnLFxyXG4gICAgICAgICdzdHJva2VDb2xvcicsXHJcbiAgICAgICAgJ3N0cm9rZU9wYWNpdHknLFxyXG4gICAgICAgICdzdHJva2VXZWlnaHQnLFxyXG4gICAgICAgICd2aXNpYmxlJyxcclxuICAgICAgICAnekluZGV4J1xyXG4gICAgXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSUJveCBvYmplY3QgdG8gYSBHb29nbGVNYXBUeXBlcy5MYXRMbmdCb3VuZHNMaXRlcmFsIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gYm91bmRzIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVCb3VuZHMoYm91bmRzOiBJQm94KTogR29vZ2xlTWFwVHlwZXMuTGF0TG5nQm91bmRzTGl0ZXJhbCB7XHJcbiAgICAgICAgY29uc3QgYjogR29vZ2xlTWFwVHlwZXMuTGF0TG5nQm91bmRzTGl0ZXJhbCA9IHtcclxuICAgICAgICAgICAgZWFzdDogYm91bmRzLm1heExvbmdpdHVkZSxcclxuICAgICAgICAgICAgbm9ydGg6IGJvdW5kcy5tYXhMYXRpdHVkZSxcclxuICAgICAgICAgICAgc291dGg6IGJvdW5kcy5taW5MYXRpdHVkZSxcclxuICAgICAgICAgICAgd2VzdDogYm91bmRzLm1pbkxvbmdpdHVkZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhbiBJSW5mb1dpbmRvd09wdGlvbnMgb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvd09wdGlvbnMgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVJbmZvV2luZG93T3B0aW9ucyhvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMpOiBHb29nbGVNYXBUeXBlcy5JbmZvV2luZG93T3B0aW9ucyB7XHJcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvd09wdGlvbnMgfCBhbnkgPSB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gR29vZ2xlQ29udmVyc2lvbnMuX2luZm9XaW5kb3dPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcclxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrID09PSAnaHRtbENvbnRlbnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5jb250ZW50ID0gKDxhbnk+b3B0aW9ucylba107XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ba10gPSAoPGFueT5vcHRpb25zKVtrXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG8uY29udGVudCA9PSBudWxsIHx8IG8uY29udGVudCA9PT0gJycpIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgIT09ICcnICYmIG9wdGlvbnMuZGVzY3JpcHRpb24gIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBvLmNvbnRlbnQgPSBgJHtvcHRpb25zLnRpdGxlfTogJHtvcHRpb25zLmRlc2NyaXB0aW9ufWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5kZXNjcmlwdGlvbiAhPT0gJycpIHsgby5jb250ZW50ID0gb3B0aW9ucy5kZXNjcmlwdGlvbjsgfVxyXG4gICAgICAgICAgICBlbHNlIHsgby5jb250ZW50ID0gb3B0aW9ucy50aXRsZTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSUxhdExvbmcgb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGxhdGxvbmcgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUxvY2F0aW9uKGxhdGxvbmc6IElMYXRMb25nKTogR29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCB7XHJcbiAgICAgICAgY29uc3QgbDogR29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCA9IHsgbGF0OiBsYXRsb25nLmxhdGl0dWRlLCBsbmc6IGxhdGxvbmcubG9uZ2l0dWRlIH07XHJcbiAgICAgICAgcmV0dXJuIGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWwgb2JqZWN0IHRvIGEgSUxhdExvbmcgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXRsbmcgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUxhdExuZyhsYXRsbmc6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWwpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgY29uc3QgbDogSUxhdExvbmcgPSB7IGxhdGl0dWRlOiBsYXRsbmcubGF0LCBsb25naXR1ZGU6IGxhdGxuZy5sbmcgfTtcclxuICAgICAgICByZXR1cm4gbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSUxhdExvbmcgb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuTGF0TG5nIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbGF0bG9uZyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXHJcbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTG9jYXRpb25PYmplY3QobGF0bG9uZzogSUxhdExvbmcpOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcge1xyXG4gICAgICAgIGNvbnN0IGw6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0bG9uZy5sYXRpdHVkZSwgbGF0bG9uZy5sb25naXR1ZGUpO1xyXG4gICAgICAgIHJldHVybiBsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcyBhbiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgb2JqZWN0IHRvIGEgSUxhdExvbmcgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXRsbmcgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUxhdExuZ09iamVjdChsYXRsbmc6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyk6IElMYXRMb25nIHtcclxuICAgICAgICBjb25zdCBsOiBJTGF0TG9uZyA9IHsgbGF0aXR1ZGU6IGxhdGxuZy5sYXQoKSwgbG9uZ2l0dWRlOiBsYXRsbmcubG5nKCkgfTtcclxuICAgICAgICByZXR1cm4gbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSUxhdExvbmcgYXJyYXkgdG8gYSBhcnJheSBvZiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXRsb25nQXJyYXkgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0QXJyYXkobGF0bG9uZ0FycmF5OiBBcnJheTxJTGF0TG9uZz4pOiBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+IHtcclxuICAgICAgICAvLyB1c2UgZm9yIGxvb3AgZm9yIHBlcmZvcm1hbmNlIGluIGNhc2Ugd2UgZGVhbCB3aXRoIGxhcmdlIG51bWJlcnMgb2YgcG9pbnRzIGFuZCBwYXRocy4uLlxyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF0bG9uZ0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHAucHVzaChHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdChsYXRsb25nQXJyYXlbaV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGEgTWFwVHlwZUlkIG9iamVjdCB0byBhIEdvb2dsZSBtYXB0eXBlIHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwVHlwZUlkIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVNYXBUeXBlSWQobWFwVHlwZUlkOiBNYXBUeXBlSWQpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAobWFwVHlwZUlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTWFwVHlwZUlkLnJvYWQ6IHJldHVybiBHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWRbR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkLnJvYWRtYXBdO1xyXG4gICAgICAgICAgICBjYXNlIE1hcFR5cGVJZC5ncmF5c2NhbGU6IHJldHVybiBHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWRbR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkLnRlcnJhaW5dO1xyXG4gICAgICAgICAgICBjYXNlIE1hcFR5cGVJZC5oeWJyaWQ6IHJldHVybiBHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWRbR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkLmh5YnJpZF07XHJcbiAgICAgICAgICAgIGNhc2UgTWFwVHlwZUlkLm9yZG5hbmNlU3VydmV5OiByZXR1cm4gR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkW0dvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZC50ZXJyYWluXTtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIEdvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZFtHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWQuc2F0ZWxsaXRlXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXBzIGFuIElNYXJrZXJPcHRpb25zIG9iamVjdCB0byBhIEdvb2dsZU1hcFR5cGVzLk1hcmtlck9wdGlvbnMgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSB0aGF0IHdoZW4gcmVzb2x2ZWQgY29udGFpbnMgdGhlIG1hcHBlZCBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTWFya2VyT3B0aW9ucyhvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IEdvb2dsZU1hcFR5cGVzLk1hcmtlck9wdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLk1hcmtlck9wdGlvbnMgfCBhbnkgPSB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gR29vZ2xlQ29udmVyc2lvbnMuX21hcmtlck9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdwb3NpdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXRsbmcgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdChvcHRpb25zW2tdKTtcclxuICAgICAgICAgICAgICAgICAgICBvLnBvc2l0aW9uID0gbGF0bG5nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHMgYW4gSU1hcE9wdGlvbnMgb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuTWFwT3B0aW9ucyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxyXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZU9wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpOiBHb29nbGVNYXBUeXBlcy5NYXBPcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5NYXBPcHRpb25zID0ge307XHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgICAgICAgICAgLmZpbHRlcihrID0+IEdvb2dsZUNvbnZlcnNpb25zLl9tYXBPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcclxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrID09PSAnY2VudGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8uY2VudGVyID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24ob3B0aW9ucy5jZW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PT0gJ21hcFR5cGVJZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLm1hcFR5cGVJZCA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcFR5cGVJZChvcHRpb25zLm1hcFR5cGVJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnZGlzYWJsZVpvb21pbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5nZXN0dXJlSGFuZGxpbmcgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgby56b29tQ29udHJvbCA9ICBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdzaG93TWFwVHlwZVNlbGVjdG9yJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG8ubWFwVHlwZUNvbnRyb2wgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdjdXN0b21NYXBTdHlsZUdvb2dsZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBvLnN0eWxlcyA9IDxHb29nbGVNYXBUeXBlcy5NYXBUeXBlU3R5bGVbXT48YW55PiBvcHRpb25zLmN1c3RvbU1hcFN0eWxlR29vZ2xlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAoPGFueT5vKVtrXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZXMgYW4gYXJyYXkgb2YgbG9jYXRpb25zIG9yIGFuIGFycmF5IG9yIGFycmF5cyBvZiBsb2NhdGlvbiB0byBhbmQgYXJyYXkgb2YgYXJyYXlzIG9mIEJpbmcgTWFwIExvY2F0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXRocyAtIElMYXRMb25nIGJhc2VkIGxvY2F0aW9ucyB0byBjb252ZXJ0LlxyXG4gICAgICogQHJldHVybnMgLSBjb252ZXJ0ZWQgbG9jYXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZVBhdGhzKHBhdGhzOiBBcnJheTxJTGF0TG9uZz4gfCBBcnJheTxBcnJheTxJTGF0TG9uZz4+KTogQXJyYXk8QXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPj4ge1xyXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4+ID0gbmV3IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4+KCk7XHJcbiAgICAgICAgaWYgKHBhdGhzID09IG51bGwgfHwgIUFycmF5LmlzQXJyYXkocGF0aHMpIHx8IHBhdGhzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBwLnB1c2gobmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocGF0aHNbMF0pKSB7XHJcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvciBhcnJheXNcclxuICAgICAgICAgICAgLy8gdXNlIGZvciBsb29wIGZvciBwZXJmb3JtYW5jZSBpbiBjYXNlIHdlIGRlYWwgd2l0aCBsYXJnZSBudW1iZXJzIG9mIHBvaW50cyBhbmQgcGF0aHMuLi5cclxuICAgICAgICAgICAgY29uc3QgcDEgPSA8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5wYXRocztcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcC5wdXNoKEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0QXJyYXkocDFbaV0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcGFyYW1ldGVyIGlzIGEgc2ltcGxlIGFycmF5Li4uLlxyXG4gICAgICAgICAgICBwLnB1c2goR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb25PYmplY3RBcnJheSg8QXJyYXk8SUxhdExvbmc+PnBhdGhzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIE1hcHMgYW4gSVBvbHlnb25PcHRpb25zIG9iamVjdCB0byBhIEdvb2dsZU1hcFR5cGVzLlBvbHlnb25PcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVQb2x5Z29uT3B0aW9ucyhvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBHb29nbGVNYXBUeXBlcy5Qb2x5Z29uT3B0aW9ucyB7XHJcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuUG9seWdvbk9wdGlvbnMgfCBhbnkgPSB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gR29vZ2xlQ29udmVyc2lvbnMuX3BvbHlnb25PcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcclxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrID09PSAncGF0aHMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9wdGlvbnMucGF0aHMpKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnBhdGhzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLnBhdGhzID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLnBhdGhzWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLnBhdGhzID0gbmV3IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWw+PigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2UgZm9yIGxvb3AgZm9yIHBlcmZvcm1hbmNlIGluIGNhc2Ugd2UgZGVhbCB3aXRoIGxhcmdlIG51bWJlcnMgb2YgcG9pbnRzIGFuZCBwYXRocy4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAxID0gPEFycmF5PEFycmF5PElMYXRMb25nPj4+b3B0aW9ucy5wYXRocztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgby5wYXRoc1tpXSA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsPigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwMVtpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ucGF0aHNbaV1bal0gPSB7bGF0OiBwMVtpXVtqXS5sYXRpdHVkZSwgbG5nOiBwMVtpXVtqXS5sb25naXR1ZGV9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvLnBhdGhzID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWw+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSBmb3IgbG9vcCBmb3IgcGVyZm9ybWFuY2UgaW4gY2FzZSB3ZSBkZWFsIHdpdGggbGFyZ2UgbnVtYmVycyBvZiBwb2ludHMgYW5kIHBhdGhzLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcDEgPSA8QXJyYXk8SUxhdExvbmc+Pm9wdGlvbnMucGF0aHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ucGF0aHNbaV0gPSB7bGF0OiBwMVtpXS5sYXRpdHVkZSwgbG5nOiBwMVtpXS5sb25naXR1ZGV9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBNYXBzIGFuIElQb2x5bGluZU9wdGlvbnMgb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuUG9seWxpbmVPcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cclxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVQb2x5bGluZU9wdGlvbnMob3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IEdvb2dsZU1hcFR5cGVzLlBvbHlsaW5lT3B0aW9ucyB7XHJcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuUG9seWxpbmVPcHRpb25zIHwgYW55ID0ge307XHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcclxuICAgICAgICAgICAgLmZpbHRlcihrID0+IEdvb2dsZUNvbnZlcnNpb25zLl9wb2x5bGluZU9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxufVxyXG4iXX0=