/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { MapLabel } from '../map-label';
import { Extender } from '../extender';
/**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
var /**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
GoogleMapLabel = /** @class */ (function (_super) {
    tslib_1.__extends(GoogleMapLabel, _super);
    ///
    /// Constructor
    ///
    /**
     * Creates a new MapLabel
     * @param options Optional properties to set.
     */
    function GoogleMapLabel(options) {
        var _this = this;
        options["fontSize"] = options["fontSize"] || 12;
        options["fontColor"] = options["fontColor"] || '#ffffff';
        options["strokeWeight"] = options["strokeWeight"] || 3;
        options["strokeColor"] = options["strokeColor"] || '#000000';
        _this = _super.call(this, options) || this;
        return _this;
    }
    Object.defineProperty(GoogleMapLabel.prototype, "DefaultLabelStyle", {
        get: /**
         * Returns the default label style for the platform
         *
         * \@readonly
         * @abstract
         * \@memberof GoogleMapLabel
         * @return {?}
         */
        function () {
            return {
                fontSize: 12,
                fontFamily: 'sans-serif',
                fontColor: '#ffffff',
                strokeWeight: 3,
                strokeColor: '#000000'
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the value of a setting.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @return {?} - The value of the setting.
     */
    GoogleMapLabel.prototype.Get = /**
     * Gets the value of a setting.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @return {?} - The value of the setting.
     */
    function (key) {
        return (/** @type {?} */ (this)).get(key);
    };
    /**
     * Gets the map associted with the label.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @return {?}
     */
    GoogleMapLabel.prototype.GetMap = /**
     * Gets the map associted with the label.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this)).getMap();
    };
    /**
     * Set the value for a setting.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @param {?} val - The value to set.
     * @return {?}
     */
    GoogleMapLabel.prototype.Set = /**
     * Set the value for a setting.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @param {?} val - The value to set.
     * @return {?}
     */
    function (key, val) {
        if (key === 'position' && val.hasOwnProperty('latitude') && val.hasOwnProperty('longitude')) {
            val = new google.maps.LatLng(val.latitude, val.longitude);
        }
        if (this.Get(key) !== val) {
            (/** @type {?} */ (this)).set(key, val);
        }
    };
    /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @param {?} map - Map to associated with the label.
     * @return {?}
     */
    GoogleMapLabel.prototype.SetMap = /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @param {?} map - Map to associated with the label.
     * @return {?}
     */
    function (map) {
        (/** @type {?} */ (this)).setMap(map);
    };
    /**
     * Applies settings to the object
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} options - An object containing the settings key value pairs.
     * @return {?}
     */
    GoogleMapLabel.prototype.SetValues = /**
     * Applies settings to the object
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} options - An object containing the settings key value pairs.
     * @return {?}
     */
    function (options) {
        for (var /** @type {?} */ key in options) {
            if (key !== '') {
                if (key === 'position' && options[key].hasOwnProperty('latitude') && options[key].hasOwnProperty('longitude')) {
                    options[key] = new google.maps.LatLng(options[key].latitude, options[key].longitude);
                }
                if (this.Get(key) === options[key]) {
                    delete options[key];
                }
            }
        }
        (/** @type {?} */ (this)).setValues(options);
    };
    ///
    /// Protected methods
    ///
    /**
     * Draws the label on the map.
     * @memberof GoogleMapLabel
     * @method
     * @protected
     */
    /**
     * Draws the label on the map.
     * \@memberof GoogleMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    GoogleMapLabel.prototype.Draw = /**
     * Draws the label on the map.
     * \@memberof GoogleMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    function () {
        var /** @type {?} */ projection = (/** @type {?} */ (this)).getProjection();
        var /** @type {?} */ visibility = this.GetVisible();
        if (!projection) {
            // The map projection is not ready yet so do nothing
            return;
        }
        if (!this._canvas) {
            // onAdd has not been called yet.
            return;
        }
        var /** @type {?} */ style = this._canvas.style;
        if (visibility !== '') {
            // label is not visible, don't calculate positions etc.
            style['visibility'] = visibility;
            return;
        }
        var /** @type {?} */ offset = this.Get('offset');
        var /** @type {?} */ latLng = this.Get('position');
        if (!latLng) {
            return;
        }
        if (!(latLng instanceof google.maps.LatLng)) {
            latLng = new google.maps.LatLng(latLng.lat, latLng.lng);
        }
        if (!offset) {
            offset = new google.maps.Point(0, 0);
        }
        var /** @type {?} */ pos = projection.fromLatLngToDivPixel(latLng);
        style['top'] = (pos.y + offset.y) + 'px';
        style['left'] = (pos.x + offset.x) + 'px';
        style['visibility'] = visibility;
    };
    /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * @memberof GoogleMapLabel
     * @method
     * @protected
     */
    /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    GoogleMapLabel.prototype.OnAdd = /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    function () {
        this._canvas = document.createElement('canvas');
        var /** @type {?} */ style = this._canvas.style;
        style.position = 'absolute';
        var /** @type {?} */ ctx = this._canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.textBaseline = 'top';
        this.DrawCanvas();
        var /** @type {?} */ panes = (/** @type {?} */ (this)).getPanes();
        if (panes) {
            panes.overlayLayer.appendChild(this._canvas);
            // 4: floatPane (infowindow)
            // 3: overlayMouseTarget (mouse events)
            // 2: markerLayer (marker images)
            // 1: overlayLayer (polygons, polylines, ground overlays, tile layer overlays)
            // 0: mapPane (lowest pane above the map tiles)
        }
    };
    return GoogleMapLabel;
}(MapLabel));
/**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
export { GoogleMapLabel };
/**
 * Helper function to extend the OverlayView into the MapLabel
 *
 * @export
 * \@method
 * @return {?}
 */
export function MixinMapLabelWithOverlayView() {
    new Extender(GoogleMapLabel)
        .Extend(new google.maps.OverlayView)
        .Map('changed', 'Changed')
        .Map('onAdd', 'OnAdd')
        .Map('draw', 'Draw')
        .Map('onRemove', 'OnRemove');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxhYmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7QUFVdkM7Ozs7O0FBQUE7SUFBb0MsMENBQVE7SUFtQnhDLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7T0FHRztJQUNILHdCQUFZLE9BQStCO1FBQTNDLGlCQU1DO1FBTEcsT0FBTyxlQUFZLE9BQU8sZ0JBQWEsRUFBRSxDQUFDO1FBQzFDLE9BQU8sZ0JBQWEsT0FBTyxpQkFBYyxTQUFTLENBQUM7UUFDbkQsT0FBTyxtQkFBZ0IsT0FBTyxvQkFBaUIsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sa0JBQWUsT0FBTyxtQkFBZ0IsU0FBUyxDQUFDO1FBQ3ZELFFBQUEsa0JBQU0sT0FBTyxDQUFDLFNBQUM7O0tBQ2xCOzBCQXhCVSw2Q0FBaUI7Ozs7Ozs7Ozs7WUFDeEIsTUFBTSxDQUFDO2dCQUNILFFBQVEsRUFBRSxFQUFFO2dCQUNaLFVBQVUsRUFBRSxZQUFZO2dCQUN4QixTQUFTLEVBQUUsU0FBUztnQkFDcEIsWUFBWSxFQUFFLENBQUM7Z0JBQ2YsV0FBVyxFQUFFLFNBQVM7YUFDekIsQ0FBQzs7Ozs7Ozs7Ozs7OztJQStCQyw0QkFBRzs7Ozs7Ozs7Y0FBQyxHQUFXO1FBQ2xCLE1BQU0sQ0FBQyxtQkFBTSxJQUFJLEVBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7OztJQVN6QiwrQkFBTTs7Ozs7Ozs7UUFDVCxNQUFNLENBQUMsbUJBQU0sSUFBSSxFQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7O0lBV3pCLDRCQUFHOzs7Ozs7Ozs7Y0FBQyxH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QUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUV6QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIscUJBQU0sS0FBSyxHQUFHLG1CQUFNLElBQUksRUFBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7OztTQU1oRDtLQUNKO3lCQTVMTDtFQWFvQyxRQUFRLEVBZ0wzQyxDQUFBOzs7Ozs7QUFoTEQsMEJBZ0xDOzs7Ozs7OztBQVVELE1BQU07SUFFRixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUM7U0FDdkIsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDbkMsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUM7U0FDekIsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7U0FDckIsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7U0FDbkIsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLXR5cGVzJztcclxuaW1wb3J0IHsgTWFwTGFiZWwgfSBmcm9tICcuLi9tYXAtbGFiZWwnO1xyXG5pbXBvcnQgeyBJTGFiZWxPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGFiZWwtb3B0aW9ucyc7XHJcbmltcG9ydCB7IEV4dGVuZGVyIH0gZnJvbSAnLi4vZXh0ZW5kZXInO1xyXG5cclxuXHJcbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudHMgbWFwIGEgbGFibGVkIHRvIGJlIHBsYWNlZCBvbiB0aGUgbWFwLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFwTGFiZWwgZXh0ZW5kcyBNYXBMYWJlbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGxhYmVsIHN0eWxlIGZvciB0aGUgcGxhdGZvcm1cclxuICAgICAqXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcExhYmVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgRGVmYXVsdExhYmVsU3R5bGUoKTogSUxhYmVsT3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgIGZvbnRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgICAgICBzdHJva2VXZWlnaHQ6IDMsXHJcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiAnIzAwMDAwMCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIENvbnN0cnVjdG9yXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgTWFwTGFiZWxcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbmFsIHByb3BlcnRpZXMgdG8gc2V0LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5mb250U2l6ZSA9IG9wdGlvbnMuZm9udFNpemUgfHwgMTI7XHJcbiAgICAgICAgb3B0aW9ucy5mb250Q29sb3IgPSBvcHRpb25zLmZvbnRDb2xvciB8fCAnI2ZmZmZmZic7XHJcbiAgICAgICAgb3B0aW9ucy5zdHJva2VXZWlnaHQgPSBvcHRpb25zLnN0cm9rZVdlaWdodCB8fCAzO1xyXG4gICAgICAgIG9wdGlvbnMuc3Ryb2tlQ29sb3IgPSBvcHRpb25zLnN0cm9rZUNvbG9yIHx8ICcjMDAwMDAwJztcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy9cclxuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSBvZiBhIHNldHRpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGtleSAtIEtleSBzcGVjaWZ5aW5nIHRoZSBzZXR0aW5nLlxyXG4gICAgICogQHJldHVybnMgLSBUaGUgdmFsdWUgb2YgdGhlIHNldHRpbmcuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldChrZXk6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuICg8YW55PnRoaXMpLmdldChrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbWFwIGFzc29jaXRlZCB3aXRoIHRoZSBsYWJlbC5cclxuICAgICAqXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE1hcCgpOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAge1xyXG4gICAgICAgIHJldHVybiAoPGFueT50aGlzKS5nZXRNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgdmFsdWUgZm9yIGEgc2V0dGluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ga2V5IC0gS2V5IHNwZWNpZnlpbmcgdGhlIHNldHRpbmcuXHJcbiAgICAgKiBAcGFyYW0gdmFsIC0gVGhlIHZhbHVlIHRvIHNldC5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0KGtleTogc3RyaW5nLCB2YWw6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChrZXkgPT09ICdwb3NpdGlvbicgJiYgdmFsLmhhc093blByb3BlcnR5KCdsYXRpdHVkZScpICYmIHZhbC5oYXNPd25Qcm9wZXJ0eSgnbG9uZ2l0dWRlJykpIHtcclxuICAgICAgICAgICAgdmFsID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh2YWwubGF0aXR1ZGUsIHZhbC5sb25naXR1ZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5HZXQoa2V5KSAhPT0gdmFsKSB7XHJcbiAgICAgICAgICAgICg8YW55PnRoaXMpLnNldChrZXksIHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbWFwIGZvciB0aGUgbGFiZWwuIFNldHRpbmdzIHRoaXMgdG8gbnVsbCByZW1vdmUgdGhlIGxhYmVsIGZyb20gaHRlIG1hcC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWFwIC0gTWFwIHRvIGFzc29jaWF0ZWQgd2l0aCB0aGUgbGFiZWwuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldE1hcChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCk6IHZvaWQge1xyXG4gICAgICAgICg8YW55PnRoaXMpLnNldE1hcChtYXApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwbGllcyBzZXR0aW5ncyB0byB0aGUgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgc2V0dGluZ3Mga2V5IHZhbHVlIHBhaXJzLlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXRWYWx1ZXMob3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKGtleSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdwb3NpdGlvbicgJiYgIG9wdGlvbnNba2V5XS5oYXNPd25Qcm9wZXJ0eSgnbGF0aXR1ZGUnKSAmJiAgb3B0aW9uc1trZXldLmhhc093blByb3BlcnR5KCdsb25naXR1ZGUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoIG9wdGlvbnNba2V5XS5sYXRpdHVkZSwgIG9wdGlvbnNba2V5XS5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuR2V0KGtleSkgPT09IG9wdGlvbnNba2V5XSkgeyBkZWxldGUgb3B0aW9uc1trZXldOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgKDxhbnk+dGhpcykuc2V0VmFsdWVzKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFByb3RlY3RlZCBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXdzIHRoZSBsYWJlbCBvbiB0aGUgbWFwLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBEcmF3KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3Rpb24gPSAoPGFueT50aGlzKS5nZXRQcm9qZWN0aW9uKCk7XHJcbiAgICAgICAgY29uc3QgdmlzaWJpbGl0eTogc3RyaW5nID0gdGhpcy5HZXRWaXNpYmxlKCk7XHJcbiAgICAgICAgaWYgKCFwcm9qZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZSBtYXAgcHJvamVjdGlvbiBpcyBub3QgcmVhZHkgeWV0IHNvIGRvIG5vdGhpbmdcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX2NhbnZhcykge1xyXG4gICAgICAgICAgICAvLyBvbkFkZCBoYXMgbm90IGJlZW4gY2FsbGVkIHlldC5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHRoaXMuX2NhbnZhcy5zdHlsZTtcclxuICAgICAgICBpZiAodmlzaWJpbGl0eSAhPT0gJycpIHtcclxuICAgICAgICAgICAgLy8gbGFiZWwgaXMgbm90IHZpc2libGUsIGRvbid0IGNhbGN1bGF0ZSBwb3NpdGlvbnMgZXRjLlxyXG4gICAgICAgICAgICBzdHlsZVsndmlzaWJpbGl0eSddID0gdmlzaWJpbGl0eTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG9mZnNldDogR29vZ2xlTWFwVHlwZXMuUG9pbnQgPSB0aGlzLkdldCgnb2Zmc2V0Jyk7XHJcbiAgICAgICAgbGV0IGxhdExuZzogR29vZ2xlTWFwVHlwZXMuTGF0TG5nfEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWwgPSB0aGlzLkdldCgncG9zaXRpb24nKTtcclxuICAgICAgICBpZiAoIWxhdExuZykgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAoIShsYXRMbmcgaW5zdGFuY2VvZiBnb29nbGUubWFwcy5MYXRMbmcpKSB7IGxhdExuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0TG5nLmxhdCwgbGF0TG5nLmxuZyk7IH1cclxuICAgICAgICBpZiAoIW9mZnNldCkgeyBvZmZzZXQgPSBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMCk7IH1cclxuXHJcbiAgICAgICAgY29uc3QgcG9zID0gcHJvamVjdGlvbi5mcm9tTGF0TG5nVG9EaXZQaXhlbChsYXRMbmcpO1xyXG4gICAgICAgIHN0eWxlWyd0b3AnXSA9IChwb3MueSArIG9mZnNldC55KSArICdweCc7XHJcbiAgICAgICAgc3R5bGVbJ2xlZnQnXSA9IChwb3MueCArIG9mZnNldC54KSArICdweCc7XHJcbiAgICAgICAgc3R5bGVbJ3Zpc2liaWxpdHknXSA9IHZpc2liaWxpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxlZ2F0ZSBjYWxsZWQgd2hlbiB0aGUgbGFiZWwgaXMgYWRkZWQgdG8gdGhlIG1hcC4gR2VuZXJhdGVzIGFuZCBjb25maWd1cmVzXHJcbiAgICAgKiB0aGUgY2FudmFzLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgT25BZGQoKSB7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSB0aGlzLl9jYW52YXMuc3R5bGU7XHJcbiAgICAgICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cclxuICAgICAgICBjb25zdCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGN0eC5saW5lSm9pbiA9ICdyb3VuZCc7XHJcbiAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICd0b3AnO1xyXG5cclxuICAgICAgICB0aGlzLkRyYXdDYW52YXMoKTtcclxuICAgICAgICBjb25zdCBwYW5lcyA9ICg8YW55PnRoaXMpLmdldFBhbmVzKCk7XHJcbiAgICAgICAgaWYgKHBhbmVzKSB7XHJcbiAgICAgICAgICAgIHBhbmVzLm92ZXJsYXlMYXllci5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xyXG4gICAgICAgICAgICAgICAgLy8gNDogZmxvYXRQYW5lIChpbmZvd2luZG93KVxyXG4gICAgICAgICAgICAgICAgLy8gMzogb3ZlcmxheU1vdXNlVGFyZ2V0IChtb3VzZSBldmVudHMpXHJcbiAgICAgICAgICAgICAgICAvLyAyOiBtYXJrZXJMYXllciAobWFya2VyIGltYWdlcylcclxuICAgICAgICAgICAgICAgIC8vIDE6IG92ZXJsYXlMYXllciAocG9seWdvbnMsIHBvbHlsaW5lcywgZ3JvdW5kIG92ZXJsYXlzLCB0aWxlIGxheWVyIG92ZXJsYXlzKVxyXG4gICAgICAgICAgICAgICAgLy8gMDogbWFwUGFuZSAobG93ZXN0IHBhbmUgYWJvdmUgdGhlIG1hcCB0aWxlcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZXh0ZW5kIHRoZSBPdmVybGF5VmlldyBpbnRvIHRoZSBNYXBMYWJlbFxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBtZXRob2RcclxuICovXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1peGluTWFwTGFiZWxXaXRoT3ZlcmxheVZpZXcoKSB7XHJcblxyXG4gICAgbmV3IEV4dGVuZGVyKEdvb2dsZU1hcExhYmVsKVxyXG4gICAgICAgIC5FeHRlbmQobmV3IGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KVxyXG4gICAgICAgIC5NYXAoJ2NoYW5nZWQnLCAnQ2hhbmdlZCcpXHJcbiAgICAgICAgLk1hcCgnb25BZGQnLCAnT25BZGQnKVxyXG4gICAgICAgIC5NYXAoJ2RyYXcnLCAnRHJhdycpXHJcbiAgICAgICAgLk1hcCgnb25SZW1vdmUnLCAnT25SZW1vdmUnKTtcclxufVxyXG4iXX0=