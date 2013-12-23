/*
 * WebGL core teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de 
 *
 * Module: ParametricSurface
 *
 * This function creates an object to draw any parametric surface.
 *
 */


/* requireJS module definition */
define(["vbo"], 
       (function(vbo) {
       
    "use strict";
    
    /* constructor for Parametric Surface objects
     * gl:  WebGL context object
     * posFunc: function taking two arguments (u,v) and returning coordinates [x,y,z]
     * config: configuration object defining attributes uMin, uMax, vMin, vMax, 
     *         and drawStyle (i.e. "points", "wireframe", or "surface")
     */ 
    var ParametricSurface = function(gl, posFunc, config) {
                
        // read the configuration parameters
        config = config || {};
                
        var uMin = config["uMin"] || 0,
        uMax = config["uMax"] || 0,
        vMin = config["vMin"] || 0,
        vMax = config["vMax"] || 0;
                        
        var uSeg = config["uSeg"] || 40,
            vSeg = config["vSeg"] || 20;        
                        
        this.drawStyle = config.drawStyle || "points";
            
        window.console.log("Creating a ParametricSurface with uMin=" + 
                        uMin + ", uMax=" + uMax + ", vMin=" + vMin +
                        ", vMax=" + vMax + ", uSeg=" + uSeg + ", vSeg=" + 
                        vSeg);
                
        // generate vertex coordinates and store in an array
        var coords = [],
            pos    = [];
		var uStep = (uMax - uMin) / uSeg,
			vStep = (vMax - vMin) / vSeg;
		var u, v, x, y, z;
                
        for(var i=0; i <= uSeg; i++) {
			for(var j=0; j <= vSeg; j++) {                                
				u = uMin + (uStep * i);
				v = vMin + (vStep * j);
				pos = posFunc(u,v);
                                
				x = pos[0];
				y = pos[1];
				z = pos[2];
				coords.push(x,y,z);
            }            
        };
                
        // create vertex buffer object (VBO) for the coordinates
        this.coordsBuffer = new vbo.Attribute(gl, { "numComponents": 3,
                                                    "dataType": gl.FLOAT,
                                                    "data": coords 
                                                  } );    
           
    };  

    // draw method: activate buffers and issue WebGL draw() method
    ParametricSurface.prototype.draw = function(gl,program) {
         
        // bind the attribute buffers
        program.use();
        this.coordsBuffer.bind(gl, program, "vertexPosition");
 
        // draw the vertices as points
        if(this.drawStyle == "points") {
            gl.drawArrays(gl.POINTS, 0, this.coordsBuffer.numVertices()); 
        } else {
            window.console.log("ParametricSurface: draw style " + this.drawStyle + " not implemented.");
        }

    };
        
    // this module only returns the Band constructor function    
    return ParametricSurface;

})); // define

    
