/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Extender = /** @class */ (function () {
    function Extender(obj) {
        this._obj = obj;
        this._proto = obj.prototype;
    }
    /**
     * @param {?} newObj
     * @return {?}
     */
    Extender.prototype.Extend = /**
     * @param {?} newObj
     * @return {?}
     */
    function (newObj) {
        this.Set('prototype', newObj, this._obj);
        for (var /** @type {?} */ y in this._proto) {
            if ((/** @type {?} */ (this._proto))[y] != null) {
                this.Set(y, (this._proto)[y], (/** @type {?} */ (this._obj.prototype))[y]);
            }
        }
        return this;
    };
    /**
     * @param {?} property
     * @param {?} newObj
     * @param {?=} obj
     * @return {?}
     */
    Extender.prototype.Set = /**
     * @param {?} property
     * @param {?} newObj
     * @param {?=} obj
     * @return {?}
     */
    function (property, newObj, obj) {
        if (typeof newObj === 'undefined') {
            return this;
        }
        if (typeof obj === 'undefined') {
            obj = this._proto;
        }
        Object.defineProperty(obj, property, newObj);
    };
    /**
     * @param {?} property
     * @param {?} newProperty
     * @return {?}
     */
    Extender.prototype.Map = /**
     * @param {?} property
     * @param {?} newProperty
     * @return {?}
     */
    function (property, newProperty) {
        this.Set(property, this._proto[newProperty], this._obj.prototype);
        return this;
    };
    return Extender;
}());
export { Extender };
function Extender_tsickle_Closure_declarations() {
    /** @type {?} */
    Extender.prototype._obj;
    /** @type {?} */
    Extender.prototype._proto;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2V4dGVuZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFBO0lBS0ksa0JBQVksR0FBUTtRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7S0FDL0I7Ozs7O0lBRUQseUJBQU07Ozs7SUFBTixVQUFPLE1BQVc7UUFFZCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpDLEdBQUcsQ0FBQyxDQUFDLHFCQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMxQixFQUFFLENBQUMsQ0FBQyxtQkFBTSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsbUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hFO1NBQ0o7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7Ozs7Ozs7SUFFRCxzQkFBRzs7Ozs7O0lBQUgsVUFBSSxRQUFnQixFQUFFLE1BQVcsRUFBRSxHQUFTO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM3QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNyQjtRQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNoRDs7Ozs7O0lBRUQsc0JBQUc7Ozs7O0lBQUgsVUFBSSxRQUFnQixFQUFFLFdBQW1CO1FBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7bUJBdENMO0lBdUNDLENBQUE7QUF2Q0Qsb0JBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEV4dGVuZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9vYmo6IGFueTtcclxuICAgIHByaXZhdGUgX3Byb3RvOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob2JqOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vYmogPSBvYmo7XHJcbiAgICAgICAgdGhpcy5fcHJvdG8gPSBvYmoucHJvdG90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIEV4dGVuZChuZXdPYmo6IGFueSk6IEV4dGVuZGVyIHtcclxuXHJcbiAgICAgICAgdGhpcy5TZXQoJ3Byb3RvdHlwZScsIG5ld09iaiwgdGhpcy5fb2JqKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCB5IGluIHRoaXMuX3Byb3RvKSB7XHJcbiAgICAgICAgICAgIGlmICgoPGFueT50aGlzLl9wcm90bylbeV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TZXQoeSwgKHRoaXMuX3Byb3RvKVt5XSwgKDxhbnk+dGhpcy5fb2JqLnByb3RvdHlwZSlbeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBTZXQocHJvcGVydHk6IHN0cmluZywgbmV3T2JqOiBhbnksIG9iaj86IGFueSk6IEV4dGVuZGVyIHtcclxuICAgICAgICBpZiAodHlwZW9mIG5ld09iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgb2JqID0gdGhpcy5fcHJvdG87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wZXJ0eSwgbmV3T2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBNYXAocHJvcGVydHk6IHN0cmluZywgbmV3UHJvcGVydHk6IHN0cmluZyk6IEV4dGVuZGVyIHtcclxuICAgICAgICB0aGlzLlNldChwcm9wZXJ0eSwgdGhpcy5fcHJvdG9bbmV3UHJvcGVydHldLCB0aGlzLl9vYmoucHJvdG90eXBlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufSJdfQ==