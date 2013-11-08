/*
 *
 * Module: bezier_curve
 *
 */


/* requireJS module definition */
define(["util", "vec2", "scene", "point_dragger", "parametric_curve"], 
       (function(Util,vec2,Scene, PointDragger, ParametricCurve) {
       
    "use strict";

    var BezierCurve = function(p0, p1, p2, p3, lineStyle) {

        this.lineStyle = lineStyle || { width: "2", color: "#0000AA" };
        
        this.p0 = p0 || [50, 50];
        this.p1 = p1 || [75, 75];
        this.p2 = p2 || [75, 25];
        this.p3 = p3 || [100, 50];
        
        
    };
    
    BezierCurve.prototype = new ParametricCurve();
    
    BezierCurve.prototype.createDraggers = function() {

       
    };
    
    return BezierCurve;

})); // define