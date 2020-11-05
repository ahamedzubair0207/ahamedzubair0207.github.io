/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { CanvasOverlay } from '../canvas-overlay';
import { GoogleMapLabel } from './google-label';
import { Extender } from '../extender';
/**
 * Concrete implementing a canvas overlay to be placed on the map for Google Maps.
 *
 * @export
 */
var /**
 * Concrete implementing a canvas overlay to be placed on the map for Google Maps.
 *
 * @export
 */
GoogleCanvasOverlay = /** @class */ (function (_super) {
    tslib_1.__extends(GoogleCanvasOverlay, _super);
    /**
     * Creates a new instance of the GoogleCanvasOverlay class.
     * @param drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @memberof GoogleCanvasOverlay
     */
    function GoogleCanvasOverlay(drawCallback) {
        return _super.call(this, drawCallback) || this;
    }
    /**
     * Obtains geo coordinates for the click location
     *
     * \@memberof GoogleCanvasOverlay
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     */
    GoogleCanvasOverlay.prototype.GetCoordinatesFromClick = /**
     * Obtains geo coordinates for the click location
     *
     * \@memberof GoogleCanvasOverlay
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     */
    function (e) {
        if (!e) {
            return null;
        }
        if (!e.latLng) {
            return null;
        }
        if (!e.latLng.lat || !e.latLng.lng) {
            return null;
        }
        return { latitude: e.latLng.lat(), longitude: e.latLng.lng() };
    };
    /**
     * Gets the map associted with the label.
     *
     * \@memberof GoogleCanvasOverlay
     * \@method
     * @return {?}
     */
    GoogleCanvasOverlay.prototype.GetMap = /**
     * Gets the map associted with the label.
     *
     * \@memberof GoogleCanvasOverlay
     * \@method
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this)).getMap();
    };
    /**
     * Returns a MapLabel instance for the current platform that can be used as a tooltip.
     * This method only generates the map label. Content and placement is the responsibility
     * of the caller.
     *
     * \@memberof GoogleCanvasOverlay
     * \@method
     * @return {?} - The label to be used for the tooltip.
     */
    GoogleCanvasOverlay.prototype.GetToolTipOverlay = /**
     * Returns a MapLabel instance for the current platform that can be used as a tooltip.
     * This method only generates the map label. Content and placement is the responsibility
     * of the caller.
     *
     * \@memberof GoogleCanvasOverlay
     * \@method
     * @return {?} - The label to be used for the tooltip.
     */
    function () {
        var /** @type {?} */ o = {
            align: 'left',
            offset: new google.maps.Point(0, 25),
            backgroundColor: 'bisque',
            hidden: true,
            fontSize: 12,
            fontColor: '#000000',
            strokeWeight: 0
        };
        o["zIndex"] = 100000;
        var /** @type {?} */ label = new GoogleMapLabel(o);
        label.SetMap(this.GetMap());
        return label;
    };
    /**
     * Called when the custom overlay is added to the map. Triggers Onload....
     * \@memberof GoogleCanvasOverlay
     * @return {?}
     */
    GoogleCanvasOverlay.prototype.OnAdd = /**
     * Called when the custom overlay is added to the map. Triggers Onload....
     * \@memberof GoogleCanvasOverlay
     * @return {?}
     */
    function () {
        _super.prototype.OnAdd.call(this);
        this.OnLoad();
        this._canvas.style.zIndex = '100';
        // move the canvas above primitives such as polygons.
        // set the overlay to ready state
        this._readyResolver(true);
    };
    /**
     * Called whenever the canvas needs to be redrawn. This method does not do the actual
     * update, it simply scales the canvas. The actual redraw happens once the map is idle.
     * \@memberof GoogleCanvasOverly
     * \@method
     * @return {?}
     */
    GoogleCanvasOverlay.prototype.OnDraw = /**
     * Called whenever the canvas needs to be redrawn. This method does not do the actual
     * update, it simply scales the canvas. The actual redraw happens once the map is idle.
     * \@memberof GoogleCanvasOverly
     * \@method
     * @return {?}
     */
    function () {
        var /** @type {?} */ isStreetView = false;
        var /** @type {?} */ map = this.GetMap();
        if (isStreetView) {
            // Don't show the canvas if the map is in Streetside mode.
            this._canvas.style.display = 'none';
        }
        else {
            // Re-drawing the canvas as it moves would be too slow. Instead, scale and translate canvas element.
            // Upon idle or drag end, we can then redraw the canvas....
            var /** @type {?} */ zoomCurrent = map.getZoom();
            var /** @type {?} */ centerCurrent = map.getCenter();
            // Calculate map scale based on zoom level difference.
            var /** @type {?} */ scale = Math.pow(2, zoomCurrent - this._zoomStart);
            // Calculate the scaled dimensions of the canvas.
            var /** @type {?} */ el = map.getDiv();
            var /** @type {?} */ w = el.offsetWidth;
            var /** @type {?} */ h = el.offsetHeight;
            var /** @type {?} */ newWidth = w * scale;
            var /** @type {?} */ newHeight = h * scale;
            // Calculate offset of canvas based on zoom and center offsets.
            var /** @type {?} */ projection = (/** @type {?} */ (this)).getProjection();
            var /** @type {?} */ cc = projection.fromLatLngToDivPixel(centerCurrent);
            // Update the canvas CSS position and dimensions.
            this.UpdatePosition(cc.x - newWidth / 2, cc.y - newHeight / 2, newWidth, newHeight);
        }
    };
    /**
     * CanvasOverlay loaded, attach map events for updating canvas.
     * \@method
     * \@memberof GoogleCanvasOverlay
     * @return {?}
     */
    GoogleCanvasOverlay.prototype.OnLoad = /**
     * CanvasOverlay loaded, attach map events for updating canvas.
     * \@method
     * \@memberof GoogleCanvasOverlay
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ isStreetView = false;
        var /** @type {?} */ map = (/** @type {?} */ (this)).getMap();
        // Get the current map view information.
        this._zoomStart = map.getZoom();
        var /** @type {?} */ c = map.getCenter();
        this._centerStart = {
            latitude: c.lat(),
            longitude: c.lng()
        };
        // When the map stops moving, render new data on the canvas.
        this._viewChangeEndEvent = google.maps.event.addListener(map, 'idle', function (e) {
            _this.UpdateCanvas();
        });
        // Update the position of the overlay when the map is resized.
        this._mapResizeEvent = google.maps.event.addListener(map, 'resize', function (e) {
            _this.UpdateCanvas();
        });
    };
    /**
     * Associates the cnavas overlay with a map.
     * \@method
     * \@memberof GoogleCanvasOverlay
     * @param {?} map
     * @return {?}
     */
    GoogleCanvasOverlay.prototype.SetMap = /**
     * Associates the cnavas overlay with a map.
     * \@method
     * \@memberof GoogleCanvasOverlay
     * @param {?} map
     * @return {?}
     */
    function (map) {
        (/** @type {?} */ (this)).setMap(map);
    };
    ///
    /// Protected methods
    ///
    /**
     * Attaches the canvas to the map.
     * @memberof CanvasOverlay
     * @method
     */
    /**
     * Attaches the canvas to the map.
     * \@memberof CanvasOverlay
     * \@method
     * @param {?} el
     * @return {?}
     */
    GoogleCanvasOverlay.prototype.SetCanvasElement = /**
     * Attaches the canvas to the map.
     * \@memberof CanvasOverlay
     * \@method
     * @param {?} el
     * @return {?}
     */
    function (el) {
        var /** @type {?} */ panes = (/** @type {?} */ (this)).getPanes();
        if (panes) {
            if (el != null) {
                panes.overlayLayer.appendChild(el);
                // 4: floatPane (infowindow)
                // 3: overlayMouseTarget (mouse events)
                // 2: markerLayer (marker images)
                // 1: overlayLayer (polygons, polylines, ground overlays, tile layer overlays)
                // 0: mapPane (lowest pane above the map tiles)
            }
            else {
                panes.overlayLayer.removeChild(this._canvas);
            }
        }
    };
    /**
     * Remove the map event handlers.
     * @memberof CanvasOverlay
     * @method
     * @protected
     */
    /**
     * Remove the map event handlers.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @return {?}
     */
    GoogleCanvasOverlay.prototype.RemoveEventHandlers = /**
     * Remove the map event handlers.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @return {?}
     */
    function () {
        // Remove all event handlers from the map.
        if (this._viewChangeEndEvent) {
            google.maps.event.removeListener(this._viewChangeEndEvent);
        }
        if (this._mapResizeEvent) {
            google.maps.event.removeListener(this._mapResizeEvent);
        }
    };
    /**
     * Updates the Canvas size based on the map size.
     * @memberof CanvasOverlay
     * @method
     * @protected
     */
    /**
     * Updates the Canvas size based on the map size.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @return {?}
     */
    GoogleCanvasOverlay.prototype.Resize = /**
     * Updates the Canvas size based on the map size.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @return {?}
     */
    function () {
        var /** @type {?} */ map = (/** @type {?} */ (this)).getMap();
        // Clear canvas by updating dimensions. This also ensures canvas stays the same size as the map.
        var /** @type {?} */ el = map.getDiv();
        this._canvas.width = el.offsetWidth;
        this._canvas.height = el.offsetHeight;
    };
    /**
     * Updates the Canvas.
     * @memberof CanvasOverlay
     * @method
     * @protected
     */
    /**
     * Updates the Canvas.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @return {?}
     */
    GoogleCanvasOverlay.prototype.UpdateCanvas = /**
     * Updates the Canvas.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @return {?}
     */
    function () {
        var /** @type {?} */ map = (/** @type {?} */ (this)).getMap();
        // Only render the canvas if it isn't in streetside mode.
        if (true) {
            this._canvas.style.display = '';
            // Reset CSS position and dimensions of canvas.
            var /** @type {?} */ el = map.getDiv();
            var /** @type {?} */ w = el.offsetWidth;
            var /** @type {?} */ h = el.offsetHeight;
            var /** @type {?} */ centerPoint = (/** @type {?} */ (this)).getProjection().fromLatLngToDivPixel(map.getCenter());
            this.UpdatePosition((centerPoint.x - w / 2), (centerPoint.y - h / 2), w, h);
            // Redraw the canvas.
            this.Redraw(true);
            // Get the current map view information.
            this._zoomStart = map.getZoom();
            var /** @type {?} */ c = map.getCenter();
            this._centerStart = {
                latitude: c.lat(),
                longitude: c.lng()
            };
        }
    };
    return GoogleCanvasOverlay;
}(CanvasOverlay));
/**
 * Concrete implementing a canvas overlay to be placed on the map for Google Maps.
 *
 * @export
 */
export { GoogleCanvasOverlay };
function GoogleCanvasOverlay_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleCanvasOverlay.prototype._viewChangeEndEvent;
    /** @type {?} */
    GoogleCanvasOverlay.prototype._mapResizeEvent;
}
/**
 * Helper function to extend the OverlayView into the CanvasOverlay
 *
 * @export
 * \@method
 * @return {?}
 */
export function MixinCanvasOverlay() {
    new Extender(GoogleCanvasOverlay)
        .Extend(new google.maps.OverlayView)
        .Map('onAdd', 'OnAdd')
        .Map('draw', 'OnDraw')
        .Map('onRemove', 'OnRemove');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWNhbnZhcy1vdmVybGF5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWNhbnZhcy1vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWxELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7QUFRdkM7Ozs7O0FBQUE7SUFBeUMsK0NBQWE7SUFRbEQ7Ozs7O09BS0c7SUFDSCw2QkFBWSxZQUFpRDtlQUN6RCxrQkFBTSxZQUFZLENBQUM7S0FDdEI7Ozs7Ozs7O0lBYU0scURBQXVCOzs7Ozs7O2NBQUMsQ0FBNEI7UUFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FBRTtRQUNwRCxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDOzs7Ozs7Ozs7SUFTNUQsb0NBQU07Ozs7Ozs7O1FBQ1QsTUFBTSxDQUFDLG1CQUFNLElBQUksRUFBQyxDQUFDLE1BQU0sRUFB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LElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFHNUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7WUFHbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEMscUJBQU0sQ0FBQyxHQUEwQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLFlBQVksR0FBRztnQkFDaEIsUUFBUSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pCLFNBQVMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFO2FBQ3JCLENBQUM7U0FDTDtLQUNKOzhCQW5RTDtFQWN5QyxhQUFhLEVBc1ByRCxDQUFBOzs7Ozs7QUF0UEQsK0JBc1BDOzs7Ozs7Ozs7Ozs7OztBQVFELE1BQU07SUFFRixJQUFJLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztTQUM1QixNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNuQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztTQUNyQixHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztTQUNyQixHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcclxuaW1wb3J0IHsgR29vZ2xlQ29udmVyc2lvbnMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLWNvbnZlcnNpb25zJztcclxuaW1wb3J0IHsgQ2FudmFzT3ZlcmxheSB9IGZyb20gJy4uL2NhbnZhcy1vdmVybGF5JztcclxuaW1wb3J0IHsgTWFwTGFiZWwgfSBmcm9tICcuLi9tYXAtbGFiZWwnO1xyXG5pbXBvcnQgeyBHb29nbGVNYXBMYWJlbCB9IGZyb20gJy4vZ29vZ2xlLWxhYmVsJztcclxuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtdHlwZXMnO1xyXG5pbXBvcnQgeyBFeHRlbmRlciB9IGZyb20gJy4uL2V4dGVuZGVyJztcclxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XHJcblxyXG4vKipcclxuICogQ29uY3JldGUgaW1wbGVtZW50aW5nIGEgY2FudmFzIG92ZXJsYXkgdG8gYmUgcGxhY2VkIG9uIHRoZSBtYXAgZm9yIEdvb2dsZSBNYXBzLlxyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR29vZ2xlQ2FudmFzT3ZlcmxheSBleHRlbmRzIENhbnZhc092ZXJsYXkge1xyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIGZpZWxkIGRlY2xhcmF0aW9uc1xyXG4gICAgLy8vXHJcbiAgICBwcml2YXRlIF92aWV3Q2hhbmdlRW5kRXZlbnQ6IEdvb2dsZU1hcFR5cGVzLk1hcHNFdmVudExpc3RlbmVyO1xyXG4gICAgcHJpdmF0ZSBfbWFwUmVzaXplRXZlbnQ6IEdvb2dsZU1hcFR5cGVzLk1hcHNFdmVudExpc3RlbmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgR29vZ2xlQ2FudmFzT3ZlcmxheSBjbGFzcy5cclxuICAgICAqIEBwYXJhbSBkcmF3Q2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYW52YXMgaXMgcmVhZHkgdG8gYmVcclxuICAgICAqIHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCBtYXAgdmlldy5cclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDYW52YXNPdmVybGF5XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGRyYXdDYWxsYmFjazogKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpID0+IHZvaWQpIHtcclxuICAgICAgICBzdXBlcihkcmF3Q2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXHJcbiAgICAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGFpbnMgZ2VvIGNvb3JkaW5hdGVzIGZvciB0aGUgY2xpY2sgbG9jYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZSAtIFRoZSBtb3VzZSBldmVudC5cclxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIElMYXRMb25nfSBjb250YWluaW5nIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGNsaWNrZWQgbWFya2VyLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNhbnZhc092ZXJsYXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGU6IEdvb2dsZU1hcFR5cGVzLk1vdXNlRXZlbnQpOiBJTGF0TG9uZyB7XHJcbiAgICAgICAgaWYgKCFlKSB7IHJldHVybiBudWxsOyB9XHJcbiAgICAgICAgaWYgKCFlLmxhdExuZykgeyByZXR1cm4gbnVsbDsgfVxyXG4gICAgICAgIGlmICghZS5sYXRMbmcubGF0IHx8ICFlLmxhdExuZy5sbmcpIHsgcmV0dXJuIG51bGw7IH1cclxuICAgICAgICByZXR1cm4geyBsYXRpdHVkZTogZS5sYXRMbmcubGF0KCksIGxvbmdpdHVkZTogZS5sYXRMbmcubG5nKCkgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1hcCBhc3NvY2l0ZWQgd2l0aCB0aGUgbGFiZWwuXHJcbiAgICAgKlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNhbnZhc092ZXJsYXlcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldE1hcCgpOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAge1xyXG4gICAgICAgIHJldHVybiAoPGFueT50aGlzKS5nZXRNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBNYXBMYWJlbCBpbnN0YW5jZSBmb3IgdGhlIGN1cnJlbnQgcGxhdGZvcm0gdGhhdCBjYW4gYmUgdXNlZCBhcyBhIHRvb2x0aXAuXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBvbmx5IGdlbmVyYXRlcyB0aGUgbWFwIGxhYmVsLiBDb250ZW50IGFuZCBwbGFjZW1lbnQgaXMgdGhlIHJlc3BvbnNpYmlsaXR5XHJcbiAgICAgKiBvZiB0aGUgY2FsbGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIC0gVGhlIGxhYmVsIHRvIGJlIHVzZWQgZm9yIHRoZSB0b29sdGlwLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNhbnZhc092ZXJsYXlcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFRvb2xUaXBPdmVybGF5KCk6IE1hcExhYmVsIHtcclxuICAgICAgICBjb25zdCBvOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xyXG4gICAgICAgICAgICBhbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAyNSksXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2Jpc3F1ZScsXHJcbiAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcclxuICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICBmb250Q29sb3I6ICcjMDAwMDAwJyxcclxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiAwXHJcbiAgICAgICAgfTtcclxuICAgICAgICBvLnpJbmRleCA9IDEwMDAwMDtcclxuICAgICAgICBjb25zdCBsYWJlbDogTWFwTGFiZWwgPSBuZXcgR29vZ2xlTWFwTGFiZWwobyk7XHJcbiAgICAgICAgbGFiZWwuU2V0TWFwKHRoaXMuR2V0TWFwKCkpO1xyXG4gICAgICAgIHJldHVybiBsYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBjdXN0b20gb3ZlcmxheSBpcyBhZGRlZCB0byB0aGUgbWFwLiBUcmlnZ2VycyBPbmxvYWQuLi4uXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2FudmFzT3ZlcmxheVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgT25BZGQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuT25BZGQoKTtcclxuICAgICAgICB0aGlzLk9uTG9hZCgpO1xyXG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS56SW5kZXggPSAnMTAwJztcclxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgY2FudmFzIGFib3ZlIHByaW1pdGl2ZXMgc3VjaCBhcyBwb2x5Z29ucy5cclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSBvdmVybGF5IHRvIHJlYWR5IHN0YXRlXHJcbiAgICAgICAgdGhpcy5fcmVhZHlSZXNvbHZlcih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuZXZlciB0aGUgY2FudmFzIG5lZWRzIHRvIGJlIHJlZHJhd24uIFRoaXMgbWV0aG9kIGRvZXMgbm90IGRvIHRoZSBhY3R1YWxcclxuICAgICAqIHVwZGF0ZSwgaXQgc2ltcGx5IHNjYWxlcyB0aGUgY2FudmFzLiBUaGUgYWN0dWFsIHJlZHJhdyBoYXBwZW5zIG9uY2UgdGhlIG1hcCBpcyBpZGxlLlxyXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNhbnZhc092ZXJseVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgT25EcmF3KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGlzU3RyZWV0VmlldzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwID0gdGhpcy5HZXRNYXAoKTtcclxuXHJcbiAgICAgICAgaWYgKGlzU3RyZWV0Vmlldykge1xyXG4gICAgICAgICAgICAvLyBEb24ndCBzaG93IHRoZSBjYW52YXMgaWYgdGhlIG1hcCBpcyBpbiBTdHJlZXRzaWRlIG1vZGUuXHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gUmUtZHJhd2luZyB0aGUgY2FudmFzIGFzIGl0IG1vdmVzIHdvdWxkIGJlIHRvbyBzbG93LiBJbnN0ZWFkLCBzY2FsZSBhbmQgdHJhbnNsYXRlIGNhbnZhcyBlbGVtZW50LlxyXG4gICAgICAgICAgICAvLyBVcG9uIGlkbGUgb3IgZHJhZyBlbmQsIHdlIGNhbiB0aGVuIHJlZHJhdyB0aGUgY2FudmFzLi4uLlxyXG4gICAgICAgICAgICBjb25zdCB6b29tQ3VycmVudDogbnVtYmVyID0gbWFwLmdldFpvb20oKTtcclxuICAgICAgICAgICAgY29uc3QgY2VudGVyQ3VycmVudDogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gbWFwLmdldENlbnRlcigpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG1hcCBzY2FsZSBiYXNlZCBvbiB6b29tIGxldmVsIGRpZmZlcmVuY2UuXHJcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlOiBudW1iZXIgPSBNYXRoLnBvdygyLCB6b29tQ3VycmVudCAtIHRoaXMuX3pvb21TdGFydCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIHNjYWxlZCBkaW1lbnNpb25zIG9mIHRoZSBjYW52YXMuXHJcbiAgICAgICAgICAgIGNvbnN0IGVsOiBIVE1MRGl2RWxlbWVudCA9IG1hcC5nZXREaXYoKTtcclxuICAgICAgICAgICAgY29uc3QgdzogbnVtYmVyID0gZWwub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgIGNvbnN0IGg6IG51bWJlciA9IGVsLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgY29uc3QgbmV3V2lkdGg6IG51bWJlciA9IHcgKiBzY2FsZTtcclxuICAgICAgICAgICAgY29uc3QgbmV3SGVpZ2h0OiBudW1iZXIgPSBoICogc2NhbGU7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgb2Zmc2V0IG9mIGNhbnZhcyBiYXNlZCBvbiB6b29tIGFuZCBjZW50ZXIgb2Zmc2V0cy5cclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdGlvbiA9ICg8YW55PnRoaXMpLmdldFByb2plY3Rpb24oKTtcclxuICAgICAgICAgICAgY29uc3QgY2MgPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKGNlbnRlckN1cnJlbnQpO1xyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBjYW52YXMgQ1NTIHBvc2l0aW9uIGFuZCBkaW1lbnNpb25zLlxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVBvc2l0aW9uKGNjLnggLSBuZXdXaWR0aCAvIDIsIGNjLnkgLSBuZXdIZWlnaHQgLyAyLCBuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYW52YXNPdmVybGF5IGxvYWRlZCwgYXR0YWNoIG1hcCBldmVudHMgZm9yIHVwZGF0aW5nIGNhbnZhcy5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDYW52YXNPdmVybGF5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBPbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXNTdHJlZXRWaWV3OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgbWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAgPSAoPGFueT50aGlzKS5nZXRNYXAoKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IG1hcCB2aWV3IGluZm9ybWF0aW9uLlxyXG4gICAgICAgIHRoaXMuX3pvb21TdGFydCA9IG1hcC5nZXRab29tKCk7XHJcbiAgICAgICAgY29uc3QgYzogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gbWFwLmdldENlbnRlcigpO1xyXG4gICAgICAgIHRoaXMuX2NlbnRlclN0YXJ0ID0ge1xyXG4gICAgICAgICAgICBsYXRpdHVkZTogYy5sYXQoKSxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiBjLmxuZygpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gV2hlbiB0aGUgbWFwIHN0b3BzIG1vdmluZywgcmVuZGVyIG5ldyBkYXRhIG9uIHRoZSBjYW52YXMuXHJcbiAgICAgICAgdGhpcy5fdmlld0NoYW5nZUVuZEV2ZW50ID0gZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFwLCAnaWRsZScsIChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVDYW52YXMoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheSB3aGVuIHRoZSBtYXAgaXMgcmVzaXplZC5cclxuICAgICAgICB0aGlzLl9tYXBSZXNpemVFdmVudCA9IGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ3Jlc2l6ZScsIChlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVDYW52YXMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFzc29jaWF0ZXMgdGhlIGNuYXZhcyBvdmVybGF5IHdpdGggYSBtYXAuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2FudmFzT3ZlcmxheVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0TWFwKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKTogdm9pZCB7XHJcbiAgICAgICAgKDxhbnk+dGhpcykuc2V0TWFwKG1hcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcbiAgICAvLy8gUHJvdGVjdGVkIG1ldGhvZHNcclxuICAgIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoZXMgdGhlIGNhbnZhcyB0byB0aGUgbWFwLlxyXG4gICAgICogQG1lbWJlcm9mIENhbnZhc092ZXJsYXlcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIFNldENhbnZhc0VsZW1lbnQoZWw6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcGFuZXMgPSAoPGFueT50aGlzKS5nZXRQYW5lcygpO1xyXG4gICAgICAgIGlmIChwYW5lcykge1xyXG4gICAgICAgICAgICBpZiAoZWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcGFuZXMub3ZlcmxheUxheWVyLmFwcGVuZENoaWxkKGVsKTtcclxuICAgICAgICAgICAgICAgIC8vIDQ6IGZsb2F0UGFuZSAoaW5mb3dpbmRvdylcclxuICAgICAgICAgICAgICAgIC8vIDM6IG92ZXJsYXlNb3VzZVRhcmdldCAobW91c2UgZXZlbnRzKVxyXG4gICAgICAgICAgICAgICAgLy8gMjogbWFya2VyTGF5ZXIgKG1hcmtlciBpbWFnZXMpXHJcbiAgICAgICAgICAgICAgICAvLyAxOiBvdmVybGF5TGF5ZXIgKHBvbHlnb25zLCBwb2x5bGluZXMsIGdyb3VuZCBvdmVybGF5cywgdGlsZSBsYXllciBvdmVybGF5cylcclxuICAgICAgICAgICAgICAgIC8vIDA6IG1hcFBhbmUgKGxvd2VzdCBwYW5lIGFib3ZlIHRoZSBtYXAgdGlsZXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYW5lcy5vdmVybGF5TGF5ZXIucmVtb3ZlQ2hpbGQodGhpcy5fY2FudmFzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSB0aGUgbWFwIGV2ZW50IGhhbmRsZXJzLlxyXG4gICAgICogQG1lbWJlcm9mIENhbnZhc092ZXJsYXlcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIFJlbW92ZUV2ZW50SGFuZGxlcnMoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBldmVudCBoYW5kbGVycyBmcm9tIHRoZSBtYXAuXHJcbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdDaGFuZ2VFbmRFdmVudCkgeyBnb29nbGUubWFwcy5ldmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLl92aWV3Q2hhbmdlRW5kRXZlbnQpOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcFJlc2l6ZUV2ZW50KSB7IGdvb2dsZS5tYXBzLmV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuX21hcFJlc2l6ZUV2ZW50KTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgQ2FudmFzIHNpemUgYmFzZWQgb24gdGhlIG1hcCBzaXplLlxyXG4gICAgICogQG1lbWJlcm9mIENhbnZhc092ZXJsYXlcclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIFJlc2l6ZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCA9ICg8YW55PnRoaXMpLmdldE1hcCgpO1xyXG5cclxuICAgICAgICAvLyBDbGVhciBjYW52YXMgYnkgdXBkYXRpbmcgZGltZW5zaW9ucy4gVGhpcyBhbHNvIGVuc3VyZXMgY2FudmFzIHN0YXlzIHRoZSBzYW1lIHNpemUgYXMgdGhlIG1hcC5cclxuICAgICAgICBjb25zdCBlbDogSFRNTERpdkVsZW1lbnQgPSBtYXAuZ2V0RGl2KCk7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gZWwub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IGVsLm9mZnNldEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIENhbnZhcy5cclxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBVcGRhdGVDYW52YXMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAgPSAoPGFueT50aGlzKS5nZXRNYXAoKTtcclxuXHJcbiAgICAgICAgLy8gT25seSByZW5kZXIgdGhlIGNhbnZhcyBpZiBpdCBpc24ndCBpbiBzdHJlZXRzaWRlIG1vZGUuXHJcbiAgICAgICAgaWYgKHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc2V0IENTUyBwb3NpdGlvbiBhbmQgZGltZW5zaW9ucyBvZiBjYW52YXMuXHJcbiAgICAgICAgICAgIGNvbnN0IGVsOiBIVE1MRGl2RWxlbWVudCA9IG1hcC5nZXREaXYoKTtcclxuICAgICAgICAgICAgY29uc3QgdzogbnVtYmVyID0gZWwub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgIGNvbnN0IGg6IG51bWJlciA9IGVsLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgY29uc3QgY2VudGVyUG9pbnQgPSAoPGFueT50aGlzKS5nZXRQcm9qZWN0aW9uKCkuZnJvbUxhdExuZ1RvRGl2UGl4ZWwobWFwLmdldENlbnRlcigpKTtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVQb3NpdGlvbigoY2VudGVyUG9pbnQueCAtIHcgLyAyKSwgKGNlbnRlclBvaW50LnkgLSBoIC8gMiksIHcsIGgpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVkcmF3IHRoZSBjYW52YXMuXHJcbiAgICAgICAgICAgIHRoaXMuUmVkcmF3KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IG1hcCB2aWV3IGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICB0aGlzLl96b29tU3RhcnQgPSBtYXAuZ2V0Wm9vbSgpO1xyXG4gICAgICAgICAgICBjb25zdCBjOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgPSBtYXAuZ2V0Q2VudGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRlclN0YXJ0ID0ge1xyXG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IGMubGF0KCksXHJcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IGMubG5nKClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZXh0ZW5kIHRoZSBPdmVybGF5VmlldyBpbnRvIHRoZSBDYW52YXNPdmVybGF5XHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQG1ldGhvZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE1peGluQ2FudmFzT3ZlcmxheSgpIHtcclxuXHJcbiAgICBuZXcgRXh0ZW5kZXIoR29vZ2xlQ2FudmFzT3ZlcmxheSlcclxuICAgICAgICAuRXh0ZW5kKG5ldyBnb29nbGUubWFwcy5PdmVybGF5VmlldylcclxuICAgICAgICAuTWFwKCdvbkFkZCcsICdPbkFkZCcpXHJcbiAgICAgICAgLk1hcCgnZHJhdycsICdPbkRyYXcnKVxyXG4gICAgICAgIC5NYXAoJ29uUmVtb3ZlJywgJ09uUmVtb3ZlJyk7XHJcbn1cclxuIl19