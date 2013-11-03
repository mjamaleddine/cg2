/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de 
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */

 
/* requireJS module definition */
define(["jquery", "straight_line", "circle"], 
       (function($, StraightLine, Circle) {

    "use strict"; 
                
    /*
     * define callback functions to react to changes in the HTML page
     * and provide them with a closure defining context and scene
     */
    var HtmlController = function(context,scene,sceneController) {
    
		$("#Radius").hide();
		
        // generate random X coordinate within the canvas
        var randomX = function() { 
            return Math.floor(Math.random()*(context.canvas.width-10))+5; 
        };
            
        // generate random Y coordinate within the canvas
        var randomY = function() { 
            return Math.floor(Math.random()*(context.canvas.height-10))+5; 
        };
            
        // generate random color in hex notation
        var randomColor = function() {

            // convert a byte (0...255) to a 2-digit hex string
            var toHex2 = function(byte) {
                var s = byte.toString(16); // convert to hex string
                if(s.length == 1) s = "0"+s; // pad with leading 0
                return s;
            };
                
            var r = Math.floor(Math.random()*25.9)*10;
            var g = Math.floor(Math.random()*25.9)*10;
            var b = Math.floor(Math.random()*25.9)*10;
                
            // convert to hex notation
            return "#"+toHex2(r)+toHex2(g)+toHex2(b);
        };
		        		 
        /*
         * event handler for "new line button".
         */
        $("#btnNewLine").click( (function() {
        
            // create the actual line and add it to the scene
            var style = { 
                width: Math.floor(Math.random()*3)+1,
                color: randomColor()
            };
                          
            var line = new StraightLine( [randomX(),randomY()], 
                                         [randomX(),randomY()], 
                                         style );
            scene.addObjects([line]);
			
			$("#ipThickness").attr("value", line.getLineWidth());

            // deselect all objects, then select the newly created object
            sceneController.deselect();
            sceneController.select(line); // this will also redraw
                        
        }));
		
		$("#btnNewCircle").click( (function() {
			
            // create the actual line and add it to the scene
            var style = { 
                width: Math.floor(Math.random()*3)+1,
                color: randomColor()
            };
                          
            var circle = new Circle( [randomX(),randomY()], 
                                         randomX(), 
                                         style );
            scene.addObjects([circle]);

			$("#ipRadius").attr("value", circle.getRadius());
			 
            // deselect all objects, then select the newly created object
            sceneController.deselect();
            sceneController.select(circle); // this will also redraw
                        
        }));
        
		sceneController.onSelection(function(obj){
						selectionHandler();
                        $('#ipThickness').val(obj.lineStyle.width);
						$('#ipColor').val(obj.lineStyle.color);
						$('#ipRadius').val(obj.radius);
		});
		
		var selectionHandler = function() {
			var obj = sceneController.getSelectedObject();
			if (obj instanceof Circle) {
				$("#Radius").show();
			}
                                
			else if (obj instanceof StraightLine) {
				$("#Radius").hide();
			}
        };
		
		$("#ipThickness").change((function() {
                        var obj = sceneController.getSelectedObject();
                        if (obj instanceof Circle || obj instanceof StraightLine /*|| obj instanceof ParametricCurve || obj instanceof BezierCurve*/) {
                                obj.setLineWidth($("#ipThickness").attr("value"));
                                sceneController.deselect();
                                sceneController.select(obj);
                        }
		}));
		
		$("#ipColor").change((function() {
                        var obj = sceneController.getSelectedObject();
                        if (obj instanceof Circle || obj instanceof StraightLine /*|| obj instanceof ParametricCurve || obj instanceof BezierCurve*/) {
                                obj.setLineColor($("#ipColor").attr("value"));
                                sceneController.deselect();
                                sceneController.select(obj);
                        }
        }));
		
		$("#ipRadius").change((function() {
                        var obj = sceneController.getSelectedObject();
                        if (obj instanceof Circle) {
                                obj.setNewRadius($("#ipRadius").attr("value"));
                                sceneController.deselect();
                                sceneController.select(obj);
                        }
        }));
    
    };

    // return the constructor function 
    return HtmlController;


})); // require 



            
