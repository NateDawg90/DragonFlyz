var

s_penguin;

function Sprite(img, x, y, width, height) {
  this.img = img;
  this.x = x * 2;
  this.y = y * 2;
  this.width = width * 2;
  this.height = height * 2;
}

Sprite.prototype.draw = function(ctx, x, y) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
		x, y, this.width, this.height);
};

// 137 x 72
function initSprites(img) {
  s_penguin = [
    new Sprite(img, 156, 115, 17, 12),
    new Sprite(img, 156, 128, 17, 12),
    new Sprite(img, 156, 141, 17, 12),

  ];
}
