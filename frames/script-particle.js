var Particles = function () {
  this.iDots = guiControls.density;
  this.aDots = [];
  this.bAttract = false;
  this.iInteract = guiControls.mouseInteraction;

  Particles.prototype.build = function () {
    this.aDots = [];
    this.iDots = guiControls.density;

    for (var i = 0; i < guiControls.density; i++) {
      this.addDot();
    }
  };

  Particles.prototype.addDot = function () {
    var oDot = {
      x: rand(10, oSize.w - 10),
      y: rand(10, oSize.h - 10),
      r: rand(0, guiControls.size), //radius
      a: 0, //alpha
      ta: rand(1, 8), //targeted alpha
      life: rand(0, guiControls.life),
      dist: rand(300, 600),
      speed: rand(5, guiControls.speed) / 200,
    };

    oDot.ta = oDot.ta / 10;
    oDot.tx = rand(oDot.x - oDot.dist, oDot.x + oDot.dist);
    oDot.ty = rand(oDot.y - oDot.dist, oDot.y + oDot.dist);

    this.aDots.push(oDot);
  };

  Particles.prototype.getDist = function (dot1, dot2) {
    var dx = dot1.x - dot2.x;
    var dy = dot1.y - dot2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    return distance;
  };

  Particles.prototype.checkMouse = function (dot, rad) {
    // detection collision circle
    var dx = oMouse.x - dot.x;
    var dy = oMouse.y - dot.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < rad) return true;
    else return false;
  };

  Particles.prototype.updateDot = function () {
    for (var i = this.aDots.length - 1; i >= 0; i--) {
      //decrease his life
      this.aDots[i].life -= 0.1;

      if (!this.bAttract) {
        //update position
        var tx = this.aDots[i].tx - this.aDots[i].x,
          ty = this.aDots[i].ty - this.aDots[i].y,
          dist = Math.sqrt(tx * tx + ty * ty);

        if (dist >= this.aDots[i].speed) {
          velX = (tx / dist) * this.aDots[i].speed;
          velY = (ty / dist) * this.aDots[i].speed;
          this.aDots[i].x += velX;
          this.aDots[i].y += velY;
        }
      } else {
        //update position
        var tx = oMouse.x - this.aDots[i].x,
          ty = oMouse.y - this.aDots[i].y,
          dist = Math.sqrt(tx * tx + ty * ty);

        if (dist >= this.aDots[i].speed * 2) {
          velX = (tx / dist) * (this.aDots[i].speed * 2);
          velY = (ty / dist) * (this.aDots[i].speed * 2);
          this.aDots[i].x -= velX;
          this.aDots[i].y -= velY;
        }
      }

      if (
        this.checkMouse(this.aDots[i], this.iInteract) &&
        !this.checkMouse(this.aDots[i], this.iInteract / 1.8)
      ) {
        var ta = 1;

        if (this.aDots[i].a <= ta) this.aDots[i].a += 0.1;
      }

      //if gonna die
      if (this.aDots[i].life <= 0) {
        //if no alpha, you die
        if (this.aDots[i].a <= 0) {
          //good bye my friend
          this.aDots.splice(i, 1);
          //her the new choosen one
          if (this.aDots.length < guiControls.density) this.addDot();
        } else {
          //decrease his alpha
          this.aDots[i].a -= 0.01;
        }
        //if not gonna die
      } else {
        //and you just born, you can appear my baby
        if (this.aDots[i].a < this.aDots[i].ta) this.aDots[i].a += 0.01;
      }
    }
  };

  Particles.prototype.update = function () {
    this.iInteract = guiControls.mouseInteraction;
    this.updateDot();
  };

  Particles.prototype.drawDots = function (ctx) {
    for (var i = this.aDots.length - 1; i >= 0; i--) {
      var d = this.aDots[i];

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r * 1.5, 0, 2 * Math.PI, false);
      ctx.fillStyle = "rgba( 5, 135, 135, " + d.a / 2 + " )";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
      ctx.fillStyle = "rgba( 0, 255, 255, " + d.a + " )";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r / 2, 0, 2 * Math.PI, false);
      ctx.fillStyle = "rgba( 255, 255, 255, " + d.a * 3 + " )";
      ctx.fill();
    }
  };

  Particles.prototype.draw = function (ctx) {
    this.drawDots(ctx);
  };
};

/** global vars **/
var oSize = {
  h: window.innerHeight,
  w: window.innerWidth,
};
var oMouse = {
  x: oSize.w / 2,
  y: oSize.h / 2,
};

var canvas = document.getElementById("particles");
var ctx = canvas.getContext("2d");

canvas.height = oSize.h;
canvas.width = oSize.w;

var bPersiste = false;
rand = function (min, max) {
  return Math.random() * (max - min) + min;
};
update_mouse = function (_e) {
  oMouse.y = _e.pageY;
  oMouse.x = _e.pageX;
};
onresize = function () {
  oSize.w = canvas.width = window.innerWidth;
  oSize.h = canvas.height = window.innerHeight;
};
merge = function (o1, o2) {
  var o3 = {};
  for (var attr in o1) {
    o3[attr] = o1[attr];
  }
  for (var attr in o2) {
    o3[attr] = o2[attr];
  }
  return o3;
};
attract = function () {
  oParticles.bAttract = true;
};
neutre = function () {
  oParticles.bAttract = false;
};

/** DAT GUI **/
var guiControls = new (function () {
  this.density = 1000;
  this.life = 2;
  this.size = 1;
  this.speed = 100;
  this.mouseInteraction = 150;
})();
var datGUI = new dat.GUI();
//j'ajoute a mon ui les variable
datGUI.add(guiControls, "density", 50, 2000);
datGUI.add(guiControls, "life", 1, 100);
datGUI.add(guiControls, "size", 1, 5);
datGUI.add(guiControls, "speed", 5, 300);
datGUI.add(guiControls, "mouseInteraction", 20, 300);

var oParticles = new Particles();

document.addEventListener("mousemove", update_mouse, false);
document.addEventListener("onresize", onresize, false);
document.addEventListener("mousedown", attract, false);
document.addEventListener("mouseup", neutre, false);
window.onresize();

oParticles.build();

/** ANIMATION **/
function render() {
  ctx.fillStyle = "rgb( 0, 0, 0, 0.07 )";
  ctx.fillRect(0, 0, oSize.w, oSize.h);

  if (oParticles.aDots.length < guiControls.density) oParticles.addDot();

  oParticles.update();

  oParticles.draw(ctx);

  requestAnimationFrame(render);
}
render();
