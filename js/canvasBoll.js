function Canvas(idx, id) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    canvas.width = 155;
    canvas.height = 155;
    //这个是分数的
    var fenshu = Number(idx) / 100;
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    loop();
    var step = 0;

    function loop() {
        var lines = ["rgba(254,200,85, 1)",
            "rgba(254,200,85, 0.6)"
        ];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#dfeaff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        step++;
        //画3个不同颜色的矩形
        for (var j = lines.length - 1; j >= 0; j--) {
            var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
            if (j == 1) {
                my_gradient.addColorStop(0, lines[j]);
                my_gradient.addColorStop(1, "rgba(255,202,87, 0.2)");
                ctx.fillStyle = my_gradient;
            } else {
                my_gradient.addColorStop(0, lines[j]);
                my_gradient.addColorStop(1, "rgba(255,202,87, 0.2)");
                ctx.fillStyle = my_gradient;
            }
            //每个矩形的角度都不同，每个之间相差45度

            var angle = (step + j * 30) * Math.PI / 90;
            var deltaHeight = Math.sin(angle) * 10;
            var deltaHeightRight = Math.cos(angle) * 10;
            //console.log(canvas.height*fenshu+deltaHeight,canvas.height/2+deltaHeight);
            ctx.beginPath();
            ctx.moveTo(0, canvas.height - canvas.height * fenshu + deltaHeight);
            if (j == 1) {
                ctx.bezierCurveTo(canvas.width / 2, canvas.height - canvas.height * fenshu + deltaHeightRight, canvas.width / 2, canvas.height - canvas.height * fenshu + deltaHeight, canvas.width, canvas.height - canvas.height * fenshu + deltaHeight);
            } else {
                ctx.bezierCurveTo(canvas.width / 2, canvas.height - canvas.height * fenshu + deltaHeight, canvas.width / 2, canvas.height - canvas.height * fenshu + deltaHeightRight, canvas.width, canvas.height - canvas.height * fenshu + deltaHeightRight);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(0, canvas.height * fenshu + deltaHeight);
            ctx.closePath();
            ctx.fill();
        }
        requestAnimFrame(loop);
    }
}