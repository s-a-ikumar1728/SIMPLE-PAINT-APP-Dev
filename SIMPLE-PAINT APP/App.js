
// Function begins after body loading
function begin() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', MouseDown, false);
    canvas.addEventListener('mouseup', MouseUp, false);
    canvas.addEventListener('mousemove', MouseMove, false);
    canvas.addEventListener('dblclick', MouseDoubleClick, false);

    //No of triangles

    numoftriangles = [];

    //Applying colors to the triangle

    colors = ["Purple",  "Orange",  "Red", "Orange", "Green", "Blue", "Yellow",]

    index = 0;
    flag = false;
    drag = false;
    canvas.onselectstart = function () {
        return false;
    };
}

// deleting triangles

function MouseDoubleClick(e) {
    var pos = getMousePos(canvas, e);
    dbX = pos.x;
    dbY = pos.y;

    if (numoftriangles !== null) {
        for (var j = 0; j < numoftriangles.length; j++) {
            intializePath(numoftriangles[j]);
            if (ctx.isPointInPath(dbX, dbY)) {
                numoftriangles.splice(j, 1);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawMoveTri();
            }
        }
    }
}

// Drawing Triangles using mouse coordinates

//Mouse Down function starts the triangle draw function

function MouseDown(e) {
    var pos = getMousePos(canvas, e);
    MouseX = pos.x;
    MouseY = pos.y;

    mc = true;
    if (numoftriangles !== null) {
        for (var j = 0; j < numoftriangles.length; j++) {
            intializePath(numoftriangles[j]);
            if (ctx.isPointInPath(MouseX, MouseY)) {

                index = j;
                drag = true;

            }
        }
    }
}

//Mouse Move function enables the user to define the size of the triangles

function MouseMove(e) {
    var pos = getMousePos(canvas, e);

    if (mc) {
        mmx = pos.x;
        mmy = pos.y;

        if (drag) {
            var newX = mmx - MouseX;
            var newY = mmy - MouseY;
            MouseX = mmx;
            MouseY = mmy;
            numoftriangles[index].X += newX;
            numoftriangles[index].Y += newY;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawMoveTri();
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawTriangle();
        }

    }

}

//MouseUp Funtion ends the traingle draw function

function MouseUp() {

    mc = false;
    drag = false;

    if (flag) {
        var index = Math.floor(Math.random() * 6);
        ctx.fillStyle = colors[index];
        ctx.fill();
        numoftriangles.push({
            X: 0,
            Y: 0,
            x0: MouseX,
            y0: MouseY,
            x1: mmx,
            y1: mmy,
            x2: MouseX + (MouseX - mmx),
            y2: mmy,
            col: index
        });
        flag = false;
    }
}

// function for moving triangle around the canvas

function drawTriangle() {
    if (numoftriangles !== null) {
        for (var i = 0; i < numoftriangles.length; i++) {
            redraw(numoftriangles[i]);
        }
    }

    ctx.beginPath();
    ctx.moveTo(MouseX, MouseY);
    ctx.lineTo(mmx, mmy);
    ctx.lineTo(MouseX + (MouseX - mmx), mmy);
    ctx.closePath();
    ctx.stroke();
    flag = true;
}

function redraw(numoftriangles) {
    ctx.beginPath();
    ctx.moveTo(numoftriangles.x0 + numoftriangles.X, numoftriangles.y0 + numoftriangles.Y);
    ctx.lineTo(numoftriangles.x1 + numoftriangles.X, numoftriangles.y1 + numoftriangles.Y);
    ctx.lineTo(numoftriangles.x2 + numoftriangles.X, numoftriangles.y2 + numoftriangles.Y);
    ctx.closePath();
    ctx.fillStyle = colors[numoftriangles.col];
    ctx.fill();
}

function intializePath(numoftriangles) {
    ctx.beginPath();
    ctx.moveTo(numoftriangles.x0 + numoftriangles.X, numoftriangles.y0 + numoftriangles.Y);
    ctx.lineTo(numoftriangles.x1 + numoftriangles.X, numoftriangles.y1 + numoftriangles.Y);
    ctx.lineTo(numoftriangles.x2 + numoftriangles.X, numoftriangles.y2 + numoftriangles.Y);
    ctx.closePath();
}



function drawMoveTri() {
    for (var k = 0; k < numoftriangles.length; k++) {
        ctx.beginPath();
        ctx.moveTo(numoftriangles[k].x0 + numoftriangles[k].X, numoftriangles[k].y0 + numoftriangles[k].Y);
        ctx.lineTo(numoftriangles[k].x1 + numoftriangles[k].X, numoftriangles[k].y1 + numoftriangles[k].Y);
        ctx.lineTo(numoftriangles[k].x2 + numoftriangles[k].X, numoftriangles[k].y2 + numoftriangles[k].Y);
        ctx.closePath();
        ctx.fillStyle = colors[numoftriangles[k].col];
        ctx.fill();
    }
}


function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    }
}

//to clear the entire canvas

function Clear() {
    numoftriangles = [];
    flag = false;
    drag = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

