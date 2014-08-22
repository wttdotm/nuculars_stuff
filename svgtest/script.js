var $body;
var $image;

var $starburst;
var $starburst_rays;
var $starburst_color;

var then, time = 0;

var resized = true;
var colors = [
    "white", "red", "black", "green", "white", "blue",
    "black", "magenta", "white", "yellow", "black", "cyan"
];
var frame = 0;

var img_rot = 0;
var img_scale = 0;
var img_width = 500, img_height = 300;

var win_width = 0, win_height = 0;

function animate() {
    requestAnimationFrame(animate);
    
    var now = Date.now();
    dt = (now - then) / 1000;
    then = now;
    time += dt;

    $body.css("background-color", colors[frame % colors.length]);
    $starburst_rays.attr("transform", "rotate(" + (time * 50) + ")");
    $starburst_color.attr("stop-color", colors[(frame + 1) % colors.length]);

    img_scale = 0.8 + (Math.cos(time * 20) / 4);
    var width = img_width * img_scale;
    var height = img_height * img_scale;
    var x = (win_width / 2) - (width / 2), y = (win_height / 2) - (height / 2);

    $image.css({
        "width": Math.floor(width),
        "height": Math.floor(height),
        "transform": "rotate(" + img_rot + "deg)",
        "left": Math.floor(x),
        "top": Math.floor(y)
    });

    img_rot = Math.sin(time * 10) * 10;

    frame++;
}

setInterval(function() {
    if (resized) {
        resized = false;

        win_width = $(window).width();
        win_height = $(window).height();

        var wf = win_width / win_height, hf = win_height / win_width;
        if (wf > hf)
            $starburst.attr("transform", "scale(" + wf + "," + 1 + ")");
        else
            $starburst.attr("transform", "scale(" + 1 + "," + hf + ")");
    }
}, 300)

$(function() {
    $body = $(document.body);
    $image = $("#image");
    $starburst = $("#starburst-g");
    $starburst_rays = $("#starburst-rays");
    $starburst_color = $("#starburst-color");

    if (window.location.search.length > 1) {
        $image.attr("src", window.location.search.substr(1));
    }

    $image.bind("load", function() {
        img_width = $image.width();
        img_height = $image.height();
        animate();
    });

    $(window).bind("resize", function(e) {
        resized = true;
    });

    then = Date.now();
});
