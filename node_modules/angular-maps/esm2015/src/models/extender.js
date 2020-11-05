/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class Extender {
    /**
     * @param {?} obj
     */
    constructor(obj) {
        this._obj = obj;
        this._proto = obj.prototype;
    }
    /**
     * @param {?} newObj
     * @return {?}
     */
    Extend(newObj) {
        this.Set('prototype', newObj, this._obj);
        for (const /** @type {?} */ y in this._proto) {
            if ((/** @type {?} */ (this._proto))[y] != null) {
                this.Set(y, (this._proto)[y], (/** @type {?} */ (this._obj.prototype))[y]);
            }
        }
        return this;
    }
    /**
     * @param {?} property
     * @param {?} newObj
     * @param {?=} obj
     * @return {?}
     */
    Set(property, newObj, obj) {
        if (typeof newObj === 'undefined') {
            return this;
        }
        if (typeof obj === 'undefined') {
            obj = this._proto;
        }
        Object.defineProperty(obj, property, newObj);
    }
    /**
     * @param {?} property
     * @param {?} newProperty
     * @return {?}
     */
    Map(property, newProperty) {
        this.Set(property, this._proto[newProperty], this._obj.prototype);
        return this;
    }
}
function Extender_tsickle_Closure_declarations() {
    /** @type {?} */
    Extender.prototype._obj;
    /** @type {?} */
    Extender.prototype._proto;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2V4dGVuZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNOzs7O0lBS0YsWUFBWSxHQUFRO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztLQUMvQjs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBVztRQUVkLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekMsR0FBRyxDQUFDLENBQUMsdUJBQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLG1CQUFNLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxtQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEU7U0FDSjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs7OztJQUVELEdBQUcsQ0FBQyxRQUFnQixFQUFFLE1BQVcsRUFBRSxHQUFTO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM3QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNyQjtRQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNoRDs7Ozs7O0lBRUQsR0FBRyxDQUFDLFFBQWdCLEVBQUUsV0FBbUI7UUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEV4dGVuZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9vYmo6IGFueTtcclxuICAgIHByaXZhdGUgX3Byb3RvOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob2JqOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vYmogPSBvYmo7XHJcbiAgICAgICAgdGhpcy5fcHJvdG8gPSBvYmoucHJvdG90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIEV4dGVuZChuZXdPYmo6IGFueSk6IEV4dGVuZGVyIHtcclxuXHJcbiAgICAgICAgdGhpcy5TZXQoJ3Byb3RvdHlwZScsIG5ld09iaiwgdGhpcy5fb2JqKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCB5IGluIHRoaXMuX3Byb3RvKSB7XHJcbiAgICAgICAgICAgIGlmICgoPGFueT50aGlzLl9wcm90bylbeV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TZXQoeSwgKHRoaXMuX3Byb3RvKVt5XSwgKDxhbnk+dGhpcy5fb2JqLnByb3RvdHlwZSlbeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBTZXQocHJvcGVydHk6IHN0cmluZywgbmV3T2JqOiBhbnksIG9iaj86IGFueSk6IEV4dGVuZGVyIHtcclxuICAgICAgICBpZiAodHlwZW9mIG5ld09iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgb2JqID0gdGhpcy5fcHJvdG87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wZXJ0eSwgbmV3T2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBNYXAocHJvcGVydHk6IHN0cmluZywgbmV3UHJvcGVydHk6IHN0cmluZyk6IEV4dGVuZGVyIHtcclxuICAgICAgICB0aGlzLlNldChwcm9wZXJ0eSwgdGhpcy5fcHJvdG9bbmV3UHJvcGVydHldLCB0aGlzLl9vYmoucHJvdG90eXBlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufSJdfQ==