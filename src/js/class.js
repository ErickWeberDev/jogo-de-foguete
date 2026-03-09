const foguete = {
  name: null,
  speed: 8,

  x: 230,
  y: 467,

  life: undefined,

  width: 40,
  height: 80,
  el: document.querySelector(".foguete"),

  move(keys) {
    if (keys["d"]) this.x += this.speed;
    if (keys["a"]) this.x -= this.speed;
  },

  render() {
    this.el.style.left = this.x + "px";
  },

  colide(obj) {
    return (
      this.x < obj.x + obj.width &&
      this.x + this.width > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + this.height > obj.y
    );
  },
};

let meteoros = [];

const stage = {
  stageEl: document.querySelector(".stage-game"),

  keys: {},

  width: 500,
  height: 500,

  lifeEl: null,

  start(name, nameEl, lifeEl) {
    foguete.life = 3;
    foguete.name = name;

    this.lifeEl = lifeEl;
    nameEl.innerHTML = name;

    meteoros = [];
    document.querySelectorAll(".meteoro").forEach((el) => el.remove());

    this.setupEvents();
    this.spawnMeteoros();

    this.loop();
  },

  loop() {
    if (foguete.life > 0) {
      this.update();
      this.render();

      requestAnimationFrame(() => this.loop());
    } else {
      document.querySelector("main").classList.add("remove");
      document.querySelector(".form").classList.remove("remove");
    }
  },

  update() {
    foguete.move(this.keys);

    this.checkLimits();

    this.moveMeteoros();

    this.checkCollisions();
    this.updateLife();
  },

  render() {
    foguete.render();
  },

  updateLife() {
    this.lifeEl.innerHTML = `HP ${foguete.life} / 3`;
  },

  checkLimits() {
    if (foguete.x < 0) foguete.x = 0;

    if (foguete.x > this.width - foguete.width) {
      foguete.x = this.width - foguete.width;
    }
  },

  setupEvents() {
    document.addEventListener("keydown", (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });

    document.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
  },

  spawnMeteoros() {
    if (foguete.life <= 0)
      return document.querySelectorAll(".meteoro").forEach((el) => el.remove());
    const time = 500 + Math.random() * 500;

    setTimeout(() => {
      this.createMeteoro();
      this.spawnMeteoros();
    }, time);
  },

  createMeteoro() {
    const meteoroEl = document.createElement("div");

    meteoroEl.classList.add("meteoro");

    this.stageEl.appendChild(meteoroEl);

    const meteoro = {
      x: Math.random() * (this.width - 40),
      y: 47,
      speed: 2 + Math.random() * 7,
      damage: 1,
      width: 40,
      height: 40,
      el: meteoroEl,
    };

    meteoroEl.style.left = meteoro.x + "px";
    meteoroEl.style.top = meteoro.y + "px";

    meteoros.push(meteoro);
  },

  moveMeteoros() {
    for (let i = meteoros.length - 1; i >= 0; i--) {
      const m = meteoros[i];

      m.y += m.speed;

      m.el.style.top = m.y + "px";
      m.el.style.left = m.x + "px";

      if (m.y > this.height) {
        m.el.remove();
        meteoros.splice(i, 1);
      }
    }
  },
  checkCollisions() {
    for (let i = meteoros.length - 1; i >= 0; i--) {
      const m = meteoros[i];

      if (foguete.colide(m)) {
        foguete.life -= m.damage;

        m.el.remove();

        meteoros.splice(i, 1);
      }
    }
  },
};
