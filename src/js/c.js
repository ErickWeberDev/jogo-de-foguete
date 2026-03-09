const foguete = {
  life: 3,
  speed: 5,
  x: 230,
  y: 467,
  
};

const meteoros = [];

const stage = {


  fogueteEl: document.querySelector(".foguete"),
  stageEl: document.querySelector(".stage-game"),
  keys: {},
  areaWidth: 500,
  areaHeight: 500,
  fogueteWidth: 40,



  start(name, nameEl, lifeEl) {
    nameEl.innerText = name;
    lifeEl.innerText = `Life: ${foguete.life} / 3`;
    this.lifeEl = lifeEl;

    this.setupEvents();
    this.startSpawn();
    this.loop();
  },

  setupEvents() {
    document.addEventListener("keydown", (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });

    document.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
  },

  // LOOP PRINCIPAL

  loop() {
    this.update();
    requestAnimationFrame(() => this.loop());
  },

  update() {
    this.moveFoguete();
    this.checkLimits();
    this.moveMeteoros();
    this.renderFoguete();
  },

  // CRIAR METEORO

  createMeteoro() {
    const el = document.createElement("div");
    el.classList.add("meteoro");
    this.stageEl.appendChild(el);

    const novoMeteoro = {
      x: Math.random() * (this.areaWidth - 40),
      y: 47,
      speed: 2 + Math.random() * 7,
      id: el,
      damage: 1,
    };

    el.style.left = novoMeteoro.x + "px";
    el.style.top = novoMeteoro.y + "px";

    meteoros.push(novoMeteoro);
  },

  startSpawn() {
    let time = (1 + Math.random() * 1) * 500;
    setTimeout(() => {
      this.createMeteoro();
      this.startSpawn();
    }, time);
  },

  //MOVER TODOS METEOROS
  moveMeteoros() {
    meteoros.forEach((m, index) => {
      m.y += m.speed;

      m.id.style.top = m.y + "px";
      m.id.style.left = m.x + "px";

      if (m.y > this.areaHeight) {
        m.id.remove();
        meteoros.splice(index, 1);
      }

      
    });
  },

  //MOVIMENTO FOGUETE

  moveFoguete() {
    if (this.keys["d"]) foguete.x += foguete.speed;
    if (this.keys["a"]) foguete.x -= foguete.speed;
  },

  checkLimits() {
    if (foguete.x < 0) foguete.x = 0;

    if (foguete.x > this.areaWidth - this.fogueteWidth) {
      foguete.x = this.areaWidth - this.fogueteWidth;
    }
  },

  //RENDER

  renderFoguete() {
    this.fogueteEl.style.left = foguete.x + "px";
    
  },
};
