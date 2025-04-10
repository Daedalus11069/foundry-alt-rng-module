class AltRng extends MersenneTwister {
  int() {
    const uuid1 = crypto.randomUUID();
    const uuid2 = crypto.randomUUID();
    const tod = new Date().toISOString();

    const seed_data = `${tod}-${uuid1}-${uuid2}`;

    let seed = 0;
    for (let i = 0; i < seed_data.length; i++) {
      const charCode = seed_data.charCodeAt(i);
      seed = (seed * 31 + charCode) | 0; // Ensure 32-bit unsigned
    }

    return seed >>> 0;
  }
  static random() {
    return altRng.random();
  }
}

const altRng = new AltRng();

Hooks.once("init", async function () {
  CONFIG.Dice.randomUniform = AltRng.random;
});
