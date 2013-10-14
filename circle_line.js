/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de 
 *
 * Module: circle
 *
 * A circle knows how to draw itself into a specified 2D context,
 * can tell whether a certain mouse position "hits" the object,
 * and implements the function createDraggers() to create a set of
 * draggers to manipulate itself.
 *
 */


/* requireJS module definition */
define(["util", "vec2", "scene", "point_dragger"],
        (function(Util, vec2, Scene, PointDragger) {

            "use strict";

            /**
             *  A simple straight line that can be dragged 
             *  around by its endpoints.
             *  Parameters:
             *  - point0 and point1: array objects representing [x,y] coordinates of start and end point
             *  - lineStyle: object defining width and color attributes for line drawing, 
             *       begin of the form { width: 2, color: "#00FF00" }
             */

            var CircleLine = function(point0, radius, lineStyle) {

                console.log("creating a circle  from [" +
                        point0[0] + "," + poin0[1] + "] with Radius: " + radius);


                // draw style for drawing the line
                this.lineStyle = lineStyle || {width: "2", color: "#0000AA"};

                // initial values in case either point is undefined
                this.p0 = point0 || [10, 10];
                this.r = radius || 50;

            };

            // draw this line into the provided 2D rendering context
            CircleLine.prototype.draw = function(context) {

                // draw actual line
                context.beginPath();

                // set points to be drawn
                context.arc(this.p0[0], this.p0[1], this.radius, 0, 2 * Math.Pi, false);
                // set drawing style
                context.lineWidth = this.lineStyle.width;
                context.strokeStyle = this.lineStyle.color;

                // actually start drawing
                context.stroke();

            };

            // test whether the mouse position is on this line segment
            CircleLine.prototype.isHit = function(context, pos) {

                // project point on line, get parameter of that projection point
                var t = vec2.projectPointOnLine(pos, this.p0,[this.radius, this.radius]);
                
                // outside the line segment?
                if (t < 0.0 || t > 1.0) {
                    return false;
                }

                // coordinates of the projected point 
                var p = vec2.add(this.p0, vec2.mult(vec2.sub(this.p1, this.p0), t));

                // distance of the point from the line
                var d = vec2.length(vec2.sub(p, pos));

                // allow 2 pixels extra "sensitivity"
                return d <= (this.lineStyle.width / 2) + 2;

            };

            // return list of draggers to manipulate this line
            CircleLine.prototype.createDraggers = function() {

                var draggerStyle = {radius: 4, color: this.lineStyle.color, width: 0, fill: true}
                var draggers = [];

                // create closure and callbacks for dragger
                var _line = this;
                var getP0 = function() {
                    return _line.p0;
                };
            
                var setP0 = function(dragEvent) {
                    _line.p0 = dragEvent.position;
                };
           
                draggers.push(new PointDragger(getP0, setP0, draggerStyle));

                return draggers;

            };

            // this module only exports the constructor for StraightLine objects
            return CircleLine;

        })); // define


// JavaScript Document// JavaScript Document