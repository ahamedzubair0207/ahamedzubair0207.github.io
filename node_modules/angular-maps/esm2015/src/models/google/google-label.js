/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { MapLabel } from '../map-label';
import { Extender } from '../extender';
/**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
export class GoogleMapLabel extends MapLabel {
    /**
     * Returns the default label style for the platform
     *
     * \@readonly
     * @abstract
     * \@memberof GoogleMapLabel
     * @return {?}
     */
    get DefaultLabelStyle() {
        return {
            fontSize: 12,
            fontFamily: 'sans-serif',
            fontColor: '#ffffff',
            strokeWeight: 3,
            strokeColor: '#000000'
        };
    }
    /**
     * Creates a new MapLabel
     * @param {?} options Optional properties to set.
     */
    constructor(options) {
        options["fontSize"] = options["fontSize"] || 12;
        options["fontColor"] = options["fontColor"] || '#ffffff';
        options["strokeWeight"] = options["strokeWeight"] || 3;
        options["strokeColor"] = options["strokeColor"] || '#000000';
        super(options);
    }
    /**
     * Gets the value of a setting.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @return {?} - The value of the setting.
     */
    Get(key) {
        return (/** @type {?} */ (this)).get(key);
    }
    /**
     * Gets the map associted with the label.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @return {?}
     */
    GetMap() {
        return (/** @type {?} */ (this)).getMap();
    }
    /**
     * Set the value for a setting.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @param {?} val - The value to set.
     * @return {?}
     */
    Set(key, val) {
        if (key === 'position' && val.hasOwnProperty('latitude') && val.hasOwnProperty('longitude')) {
            val = new google.maps.LatLng(val.latitude, val.longitude);
        }
        if (this.Get(key) !== val) {
            (/** @type {?} */ (this)).set(key, val);
        }
    }
    /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @param {?} map - Map to associated with the label.
     * @return {?}
     */
    SetMap(map) {
        (/** @type {?} */ (this)).setMap(map);
    }
    /**
     * Applies settings to the object
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} options - An object containing the settings key value pairs.
     * @return {?}
     */
    SetValues(options) {
        for (const /** @type {?} */ key in options) {
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
    }
    /**
     * Draws the label on the map.
     * \@memberof GoogleMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    Draw() {
        const /** @type {?} */ projection = (/** @type {?} */ (this)).getProjection();
        const /** @type {?} */ visibility = this.GetVisible();
        if (!projection) {
            // The map projection is not ready yet so do nothing
            return;
        }
        if (!this._canvas) {
            // onAdd has not been called yet.
            return;
        }
        const /** @type {?} */ style = this._canvas.style;
        if (visibility !== '') {
            // label is not visible, don't calculate positions etc.
            style['visibility'] = visibility;
            return;
        }
        let /** @type {?} */ offset = this.Get('offset');
        let /** @type {?} */ latLng = this.Get('position');
        if (!latLng) {
            return;
        }
        if (!(latLng instanceof google.maps.LatLng)) {
            latLng = new google.maps.LatLng(latLng.lat, latLng.lng);
        }
        if (!offset) {
            offset = new google.maps.Point(0, 0);
        }
        const /** @type {?} */ pos = projection.fromLatLngToDivPixel(latLng);
        style['top'] = (pos.y + offset.y) + 'px';
        style['left'] = (pos.x + offset.x) + 'px';
        style['visibility'] = visibility;
    }
    /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    OnAdd() {
        this._canvas = document.createElement('canvas');
        const /** @type {?} */ style = this._canvas.style;
        style.position = 'absolute';
        const /** @type {?} */ ctx = this._canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.textBaseline = 'top';
        this.DrawCanvas();
        const /** @type {?} */ panes = (/** @type {?} */ (this)).getPanes();
        if (panes) {
            panes.overlayLayer.appendChild(this._canvas);
            // 4: floatPane (infowindow)
            // 3: overlayMouseTarget (mouse events)
            // 2: markerLayer (marker images)
            // 1: overlayLayer (polygons, polylines, ground overlays, tile layer overlays)
            // 0: mapPane (lowest pane above the map tiles)
        }
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxhYmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXhDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7OztBQVV2QyxNQUFNLHFCQUFzQixTQUFRLFFBQVE7Ozs7Ozs7OztRQVM3QixpQkFBaUI7UUFDeEIsTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLEVBQUU7WUFDWixVQUFVLEVBQUUsWUFBWTtZQUN4QixTQUFTLEVBQUUsU0FBUztZQUNwQixZQUFZLEVBQUUsQ0FBQztZQUNmLFdBQVcsRUFBRSxTQUFTO1NBQ3pCLENBQUM7Ozs7OztJQVdOLFlBQVksT0FBK0I7UUFDdkMsT0FBTyxlQUFZLE9BQU8sZ0JBQWEsRUFBRSxDQUFDO1FBQzFDLE9BQU8sZ0JBQWEsT0FBTyxpQkFBYyxTQUFTLENBQUM7UUFDbkQsT0FBTyxtQkFBZ0IsT0FBTyxvQkFBaUIsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sa0JBQWUsT0FBTyxtQkFBZ0IsU0FBUyxDQUFDO1FBQ3ZELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNsQjs7Ozs7Ozs7O0lBY00sR0FBRyxDQUFDLEdBQVc7UUFDbEIsTUFBTSxDQUFDLG1CQUFNLElBQUksRUFBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBU3pCLE1BQU07UUFDVCxNQUFNLENBQUMsbUJBQU0sSUFBSSxFQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7O0lBV3pCLEdBQUcsQ0FBQyxHQUFXLEVBQUUsR0FBUTtRQUM1QixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssVUFBVSxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUks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QUMsT0FBTyxDQUFDLENBQUM7Ozs7OztTQU1oRDtLQUNKO0NBQ0o7Ozs7Ozs7O0FBVUQsTUFBTTtJQUVGLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQztTQUN2QixNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNuQyxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztTQUN6QixHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztTQUNyQixHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztTQUNuQixHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtdHlwZXMnO1xyXG5pbXBvcnQgeyBNYXBMYWJlbCB9IGZyb20gJy4uL21hcC1sYWJlbCc7XHJcbmltcG9ydCB7IElMYWJlbE9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYWJlbC1vcHRpb25zJztcclxuaW1wb3J0IHsgRXh0ZW5kZXIgfSBmcm9tICcuLi9leHRlbmRlcic7XHJcblxyXG5cclxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50cyBtYXAgYSBsYWJsZWQgdG8gYmUgcGxhY2VkIG9uIHRoZSBtYXAuXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVNYXBMYWJlbCBleHRlbmRzIE1hcExhYmVsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgbGFiZWwgc3R5bGUgZm9yIHRoZSBwbGF0Zm9ybVxyXG4gICAgICpcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwTGFiZWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBEZWZhdWx0TGFiZWxTdHlsZSgpOiBJTGFiZWxPcHRpb25zIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmb250U2l6ZTogMTIsXHJcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJyxcclxuICAgICAgICAgICAgZm9udENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgICAgICAgIHN0cm9rZVdlaWdodDogMyxcclxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6ICcjMDAwMDAwJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBNYXBMYWJlbFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9uYWwgcHJvcGVydGllcyB0byBzZXQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcclxuICAgICAgICBvcHRpb25zLmZvbnRTaXplID0gb3B0aW9ucy5mb250U2l6ZSB8fCAxMjtcclxuICAgICAgICBvcHRpb25zLmZvbnRDb2xvciA9IG9wdGlvbnMuZm9udENvbG9yIHx8ICcjZmZmZmZmJztcclxuICAgICAgICBvcHRpb25zLnN0cm9rZVdlaWdodCA9IG9wdGlvbnMuc3Ryb2tlV2VpZ2h0IHx8IDM7XHJcbiAgICAgICAgb3B0aW9ucy5zdHJva2VDb2xvciA9IG9wdGlvbnMuc3Ryb2tlQ29sb3IgfHwgJyMwMDAwMDAnO1xyXG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHZhbHVlIG9mIGEgc2V0dGluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ga2V5IC0gS2V5IHNwZWNpZnlpbmcgdGhlIHNldHRpbmcuXHJcbiAgICAgKiBAcmV0dXJucyAtIFRoZSB2YWx1ZSBvZiB0aGUgc2V0dGluZy5cclxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0KGtleTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICByZXR1cm4gKDxhbnk+dGhpcykuZ2V0KGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXAgYXNzb2NpdGVkIHdpdGggdGhlIGxhYmVsLlxyXG4gICAgICpcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0TWFwKCk6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCB7XHJcbiAgICAgICAgcmV0dXJuICg8YW55PnRoaXMpLmdldE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSB2YWx1ZSBmb3IgYSBzZXR0aW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBrZXkgLSBLZXkgc3BlY2lmeWluZyB0aGUgc2V0dGluZy5cclxuICAgICAqIEBwYXJhbSB2YWwgLSBUaGUgdmFsdWUgdG8gc2V0LlxyXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXQoa2V5OiBzdHJpbmcsIHZhbDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gJ3Bvc2l0aW9uJyAmJiB2YWwuaGFzT3duUHJvcGVydHkoJ2xhdGl0dWRlJykgJiYgdmFsLmhhc093blByb3BlcnR5KCdsb25naXR1ZGUnKSkge1xyXG4gICAgICAgICAgICB2YWwgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHZhbC5sYXRpdHVkZSwgdmFsLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLkdldChrZXkpICE9PSB2YWwpIHtcclxuICAgICAgICAgICAgKDxhbnk+dGhpcykuc2V0KGtleSwgdmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtYXAgZm9yIHRoZSBsYWJlbC4gU2V0dGluZ3MgdGhpcyB0byBudWxsIHJlbW92ZSB0aGUgbGFiZWwgZnJvbSBodGUgbWFwLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtYXAgLSBNYXAgdG8gYXNzb2NpYXRlZCB3aXRoIHRoZSBsYWJlbC5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBMYWJlbFxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0TWFwKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKTogdm9pZCB7XHJcbiAgICAgICAgKDxhbnk+dGhpcykuc2V0TWFwKG1hcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBsaWVzIHNldHRpbmdzIHRvIHRoZSBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBzZXR0aW5ncyBrZXkgdmFsdWUgcGFpcnMuXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFZhbHVlcyhvcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAoa2V5ICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ3Bvc2l0aW9uJyAmJiAgb3B0aW9uc1trZXldLmhhc093blByb3BlcnR5KCdsYXRpdHVkZScpICYmICBvcHRpb25zW2tleV0uaGFzT3duUHJvcGVydHkoJ2xvbmdpdHVkZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyggb3B0aW9uc1trZXldLmxhdGl0dWRlLCAgb3B0aW9uc1trZXldLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5HZXQoa2V5KSA9PT0gb3B0aW9uc1trZXldKSB7IGRlbGV0ZSBvcHRpb25zW2tleV07IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAoPGFueT50aGlzKS5zZXRWYWx1ZXMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvdGVjdGVkIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhd3MgdGhlIGxhYmVsIG9uIHRoZSBtYXAuXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwTGFiZWxcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIERyYXcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdGlvbiA9ICg8YW55PnRoaXMpLmdldFByb2plY3Rpb24oKTtcclxuICAgICAgICBjb25zdCB2aXNpYmlsaXR5OiBzdHJpbmcgPSB0aGlzLkdldFZpc2libGUoKTtcclxuICAgICAgICBpZiAoIXByb2plY3Rpb24pIHtcclxuICAgICAgICAgICAgLy8gVGhlIG1hcCBwcm9qZWN0aW9uIGlzIG5vdCByZWFkeSB5ZXQgc28gZG8gbm90aGluZ1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fY2FudmFzKSB7XHJcbiAgICAgICAgICAgIC8vIG9uQWRkIGhhcyBub3QgYmVlbiBjYWxsZWQgeWV0LlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gdGhpcy5fY2FudmFzLnN0eWxlO1xyXG4gICAgICAgIGlmICh2aXNpYmlsaXR5ICE9PSAnJykge1xyXG4gICAgICAgICAgICAvLyBsYWJlbCBpcyBub3QgdmlzaWJsZSwgZG9uJ3QgY2FsY3VsYXRlIHBvc2l0aW9ucyBldGMuXHJcbiAgICAgICAgICAgIHN0eWxlWyd2aXNpYmlsaXR5J10gPSB2aXNpYmlsaXR5O1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb2Zmc2V0OiBHb29nbGVNYXBUeXBlcy5Qb2ludCA9IHRoaXMuR2V0KCdvZmZzZXQnKTtcclxuICAgICAgICBsZXQgbGF0TG5nOiBHb29nbGVNYXBUeXBlcy5MYXRMbmd8R29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCA9IHRoaXMuR2V0KCdwb3NpdGlvbicpO1xyXG4gICAgICAgIGlmICghbGF0TG5nKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmICghKGxhdExuZyBpbnN0YW5jZW9mIGdvb2dsZS5tYXBzLkxhdExuZykpIHsgbGF0TG5nID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXRMbmcubGF0LCBsYXRMbmcubG5nKTsgfVxyXG4gICAgICAgIGlmICghb2Zmc2V0KSB7IG9mZnNldCA9IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKTsgfVxyXG5cclxuICAgICAgICBjb25zdCBwb3MgPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKGxhdExuZyk7XHJcbiAgICAgICAgc3R5bGVbJ3RvcCddID0gKHBvcy55ICsgb2Zmc2V0LnkpICsgJ3B4JztcclxuICAgICAgICBzdHlsZVsnbGVmdCddID0gKHBvcy54ICsgb2Zmc2V0LngpICsgJ3B4JztcclxuICAgICAgICBzdHlsZVsndmlzaWJpbGl0eSddID0gdmlzaWJpbGl0eTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGVnYXRlIGNhbGxlZCB3aGVuIHRoZSBsYWJlbCBpcyBhZGRlZCB0byB0aGUgbWFwLiBHZW5lcmF0ZXMgYW5kIGNvbmZpZ3VyZXNcclxuICAgICAqIHRoZSBjYW52YXMuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcExhYmVsXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBPbkFkZCgpIHtcclxuICAgICAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHRoaXMuX2NhbnZhcy5zdHlsZTtcclxuICAgICAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblxyXG4gICAgICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgY3R4LmxpbmVKb2luID0gJ3JvdW5kJztcclxuICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XHJcblxyXG4gICAgICAgIHRoaXMuRHJhd0NhbnZhcygpO1xyXG4gICAgICAgIGNvbnN0IHBhbmVzID0gKDxhbnk+dGhpcykuZ2V0UGFuZXMoKTtcclxuICAgICAgICBpZiAocGFuZXMpIHtcclxuICAgICAgICAgICAgcGFuZXMub3ZlcmxheUxheWVyLmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XHJcbiAgICAgICAgICAgICAgICAvLyA0OiBmbG9hdFBhbmUgKGluZm93aW5kb3cpXHJcbiAgICAgICAgICAgICAgICAvLyAzOiBvdmVybGF5TW91c2VUYXJnZXQgKG1vdXNlIGV2ZW50cylcclxuICAgICAgICAgICAgICAgIC8vIDI6IG1hcmtlckxheWVyIChtYXJrZXIgaW1hZ2VzKVxyXG4gICAgICAgICAgICAgICAgLy8gMTogb3ZlcmxheUxheWVyIChwb2x5Z29ucywgcG9seWxpbmVzLCBncm91bmQgb3ZlcmxheXMsIHRpbGUgbGF5ZXIgb3ZlcmxheXMpXHJcbiAgICAgICAgICAgICAgICAvLyAwOiBtYXBQYW5lIChsb3dlc3QgcGFuZSBhYm92ZSB0aGUgbWFwIHRpbGVzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBleHRlbmQgdGhlIE92ZXJsYXlWaWV3IGludG8gdGhlIE1hcExhYmVsXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQG1ldGhvZFxyXG4gKi9cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTWl4aW5NYXBMYWJlbFdpdGhPdmVybGF5VmlldygpIHtcclxuXHJcbiAgICBuZXcgRXh0ZW5kZXIoR29vZ2xlTWFwTGFiZWwpXHJcbiAgICAgICAgLkV4dGVuZChuZXcgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpXHJcbiAgICAgICAgLk1hcCgnY2hhbmdlZCcsICdDaGFuZ2VkJylcclxuICAgICAgICAuTWFwKCdvbkFkZCcsICdPbkFkZCcpXHJcbiAgICAgICAgLk1hcCgnZHJhdycsICdEcmF3JylcclxuICAgICAgICAuTWFwKCdvblJlbW92ZScsICdPblJlbW92ZScpO1xyXG59XHJcbiJdfQ==