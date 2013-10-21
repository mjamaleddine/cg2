/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de 
 *
 * Module: circle
 *
 * A StraighLine knows how to draw itself into a specified 2D context,
 * can tell whether a certain mouse position "hits" the object,
 * and implements the function createDraggers() to create a set of
 * draggers to manipulate itself.
 *
 */


/* requireJS module definition */
define(["util", "vec2", "scene", "point_dragger"], 
       (function(Util,vec2,Scene,PointDragger) {
       
    "use strict";

    /**
     *  A simple straight line that can be dragged 
     *  around by its endpoints.
     *  Parameters:
     *  - point0 and point1: array objects representing [x,y] coordinates of start and end point
     *  - lineStyle: object defining width and color attributes for line drawing, 
     *       begin of the form { width: 2, color: "#00FF00" }
     */ 

    var Circle = function(center, radius, lineStyle) {

      //  console.log("creating straight line from [" + 
        //            point0[0] + "," + point0[1] + "] to [" +
          //          point1[0] + "," + point1[1] + "].");
        
        // draw style for drawing the line
        this.lineStyle = lineStyle || { width: "2", color: "#0000AA" };

        // initial values in case either point is undefined
        this.center = center || [0,0];
        this.radius = radius || 10;
        
    };

    // draw this line into the provided 2D rendering context
    Circle.prototype.draw = function(context) {

	// draw actual line
        context.beginPath();
        
        // set points to be drawn
        //context.moveTo(this.center[0],this.center[1]);
		context.arc(this.center[0], this.center[1], this.radius, 0.0, Math.PI*2, true);                            
        // set drawing style
        context.lineWidth = this.lineStyle.width;
        context.strokeStyle = this.lineStyle.color;
        
        // actually start drawing
        context.stroke(); 
        
    };

    // test whether the mouse position is on this line segment
    Circle.prototype.isHit = function(context,pos) {
    
		var dx = pos[0] - this.center[0];
        var dy = pos[1] - this.center[1];
        var r = this.radius+(this.lineStyle.width/2)+2;

        return (dx*dx + dy*dy) <= (r*r); 
        
    };
    
    // return list of draggers to manipulate this line
    Circle.prototype.createDraggers = function() {
    
        var draggerStyle = { radius:4, color: this.lineStyle.color, width:0, fill:true }
        var draggers = [];
        
        // create closure and callbacks for dragger
        var _circle = this;
        var getP0 = function() { return _circle.center; };
        var setP0 = function(dragEvent) { _circle.center = dragEvent.position; };
        draggers.push( new PointDragger(getP0, setP0, draggerStyle) );
        
        return draggers;
        
    };
    
    // this module only exports the constructor for StraightLine objects
    return Circle;

})); // define

    
