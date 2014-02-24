function webGLStart() 
{
    var canvas = document.getElementById("ray_trace_canvas");
    initGL(canvas);
    initShaders();
    initTexture();
    loadWorld();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    tick();
}


function initShaders()
{

}


function initTexture()
{

}


function loadWorld()
{

}


function tick()
{
    
}