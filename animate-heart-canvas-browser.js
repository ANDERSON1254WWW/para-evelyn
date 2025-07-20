class AnimateHeartCanvas {
  constructor(hMin, hMax, countMin, countMax, sizeMin, sizeMax, bgColor = "#000") {
    this.canvas = document.getElementById("canvas-heart");
    this.ctx = this.canvas.getContext("2d");
    this.bgColor = bgColor;
    this.hMin = hMin;
    this.hMax = hMax;
    this.countMin = countMin;
    this.countMax = countMax;
    this.sizeMin = sizeMin;
    this.sizeMax = sizeMax;
    this.hearts = [];
    this.resize();
    this.init();
    window.addEventListener("resize", () => this.resize());
    requestAnimationFrame(() => this.animate());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  randomColor() {
    const h = Math.floor(Math.random() * (this.hMax - this.hMin) + this.hMin);
    return `hsl(${h}, 100%, 60%)`;
  }

  createHeart() {
    return {
      x: Math.random() * this.canvas.width,
      y: this.canvas.height + Math.random() * 100,
      size: Math.random() * (this.sizeMax - this.sizeMin) + this.sizeMin,
      speed: Math.random() * 1.5 + 0.5,
      color: this.randomColor(),
      alpha: Math.random() * 0.5 + 0.5
    };
  }

  init() {
    const count = Math.floor(Math.random() * (this.countMax - this.countMin) + this.countMin);
    for (let i = 0; i < count; i++) {
      this.hearts.push(this.createHeart());
    }
  }

  drawHeart(x, y, size, color, alpha) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 30, size / 30);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -3, -5, -15, -15, -15);
    ctx.bezierCurveTo(-35, -15, -35, 15, -35, 15);
    ctx.bezierCurveTo(-35, 35, -10, 55, 0, 65);
    ctx.bezierCurveTo(10, 55, 35, 35, 35, 15);
    ctx.bezierCurveTo(35, 15, 35, -15, 15, -15);
    ctx.bezierCurveTo(5, -15, 0, -3, 0, 0);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.fill();
    ctx.restore();
  }

  animate() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.hearts.forEach(h => {
      this.drawHeart(h.x, h.y, h.size, h.color, h.alpha);
      h.y -= h.speed;
      if (h.y < -100) Object.assign(h, this.createHeart());
    });
    requestAnimationFrame(() => this.animate());
  }
}
