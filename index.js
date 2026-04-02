const phoneticModes = {
  standard: {
    A: "Alpha",
    B: "Bravo",
    C: "Charlie",
    D: "Delta",
    E: "Echo",
    F: "Foxtrot",
    G: "Golf",
    H: "Hotel",
    I: "India",
    J: "Juliett",
    K: "Kilo",
    L: "Lima",
    M: "Mike",
    N: "November",
    O: "Oscar",
    P: "Papa",
    Q: "Quebec",
    R: "Romeo",
    S: "Sierra",
    T: "Tango",
    U: "Uniform",
    V: "Victor",
    W: "Whiskey",
    X: "X-ray",
    Y: "Yankee",
    Z: "Zulu"
  },
  cursed: {
    A: "Aisle",
    B: "Bdellium",
    C: "Cue",
    D: "Djinn",
    E: "Ewe",
    F: "Phlegm",
    G: "Gnome",
    H: "Heir",
    I: "Iceland",
    J: "Jalapeño",
    K: "Knot",
    L: "Llandudno",
    M: "Mnemonic",
    N: "Ndebele",
    O: "Ouija",
    P: "Pterodactyl",
    Q: "Qatar",
    R: "Rhombus",
    S: "Sea",
    T: "Tsar",
    U: "Urn",
    V: "Viaduct",
    W: "Why",
    X: "Xenon",
    Y: "Yttrium",
    Z: "Zhuzh"
  },
  hipster: {
    A: "Açai",
    B: "Brioche",
    C: "Chia",
    D: "Dukkah",
    E: "Espresso",
    F: "Focaccia",
    G: "Gochujang",
    H: "Hemp",
    I: "Infusion",
    J: "Jackfruit",
    K: "Kombucha",
    L: "Labneh",
    M: "Matcha",
    N: "Nduja",
    O: "Oatmilk",
    P: "Panettone",
    Q: "Quinoa",
    R: "Rooibos",
    S: "Sourdough",
    T: "Turmeric",
    U: "Ube",
    V: "Vanilla",
    W: "Wakame",
    X: "Xanthan",
    Y: "Yuzu",
    Z: "Za’atar"
  },
  business: {
    A: "Actionable",
    B: "Blue Sky",
    C: "Circle Back",
    D: "Deepdive",
    E: "Ecosystem",
    F: "Funnel",
    G: "Growth",
    H: "Hackathon",
    I: "Ideation",
    J: "Jib-it",
    K: "KPI",
    L: "Leverage",
    M: "Mindshare",
    N: "Net-new",
    O: "Optics",
    P: "Paradigm",
    Q: "Quick-win",
    R: "Roadmap",
    S: "Synergy",
    T: "Touch base",
    U: "Utilisation",
    V: "Vista",
    W: "Workflow",
    X: "X-functional",
    Y: "Yield",
    Z: "Zero-sum"
  },
  insta: {
  A: "Authentic-self",
  B: "Boho",
  C: "Curated",
  D: "Detox",
  E: "Engagement",
  F: "Filtered",
  G: "Glow-up",
  H: "Hustle",
  I: "Influencer",
  J: "Juice-cleanse",
  K: "Kale",
  L: "Lifestyle",
  M: "Manifest",
  N: "Namaste",
  O: "Overexposed",
  P: "Partnership",
  Q: "Quirkcore",
  R: "Rebrand",
  S: "Self-care",
  T: "Thirst-trap",
  U: "Unboxing",
  V: "Vibes",
  W: "Wanderlust",
  X: "Xoxo",
  Y: "Yoga",
  Z: "Zodiac"
}
};

//mode
let currentMode = "standard";
function getAlphabet() {
  return phoneticModes[currentMode];
}

async function modeChange(mode) {
  currentMode = mode;
  await renderPhoneticAlphabet(document.getElementById("container"));
  document.getElementById("output").textContent = toPhonetic(
    document.getElementById("input").value
  );
}

function toPhonetic(word) {
  return word
    .toUpperCase()
    .split("")
    .map((char) => getAlphabet()[char] || char)
    .join(" ");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function renderPhoneticAlphabet(container) {
  if (!container) return;

  const alphabet = Object.entries(getAlphabet());

  for (const [letter, word] of alphabet) {
    const existingDfn = document.getElementById(letter);
    const dfn = existingDfn || document.createElement("dfn");
    dfn.id = letter;
    if (!existingDfn) {
      container.appendChild(dfn);
    }
    //dfn.classList.add("flip-animation");
    dfn.setAttribute("currentMode", currentMode);
    refreshClass(dfn, "flip-animation");
    dfn.textContent = word;

    await sleep(40); // Adjust delay (ms) as needed
  }
}

function refreshClass(el, classname) {
  //reapplies class in a way that will retrigger animation
  el.classList.remove("run-animation");
  el.classList.remove("flip-animation");
  void el.offsetWidth; //<-- magic
  el.classList.add(classname);
}

function showToast(mode) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  clearTimeout(this.timeoutID);
  const messages = {
    standard: "Standard mode engaged.",
    hipster: "☕ Hipster Mode. Please compost your alphabet.",
    cursed: "👹 Cursed Mode!",
    business: "💼 Business Mode. Utilising phonetic pipelines.",
    insta: "💖 Instagram Mode: Showing up as your most phonetic authentic self."
  };
  toast.textContent = messages[mode] || "Mode changed.";
  toast.className = `toast show ${mode}`;
  //reset
  this.timeoutID = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function setModeFromURL() {
  const params = new URLSearchParams(window.location.search);
  const modeParam = params.get("mode");
  const txtParam = params.get("text");
  const validModes = ["standard", "hipster", "cursed"];

  if (modeParam && validModes.includes(modeParam)) {
    // Set the radio button
    const radio = document.querySelector(
      `input[name="mode"][value="${modeParam}"]`
    );
    if (radio) {
      radio.checked = true;
    }

    if (txtParam) {
      document.getElementById("input").value = txtParam;
    }

    // Update mode and UI
    currentMode = modeParam;

    renderPhoneticAlphabet(document.getElementById("container"));
    document.getElementById("output").textContent = toPhonetic(
      document.getElementById("input").value
    );
    showToast(currentMode);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const container = document.getElementById("container");
    const modeSelector = document.getElementById("modeSelector");
    const input = document.querySelector("input[type='text']");
    const output = document.querySelector("output");
    // set mode from URL param if present
    setModeFromURL();
    // init
    await renderPhoneticAlphabet(container);
    // On <input> change
    input.addEventListener("input", () => {
      const val = input.value;
      output.textContent = toPhonetic(val);

      const lastChar = val.slice(-1).toUpperCase();
      if (getAlphabet()[lastChar]) {
        const matchedDfn = document.getElementById(lastChar);
        if (matchedDfn) {
          // Trigger animation
          refreshClass(matchedDfn, "run-animation");
        }
      }
    });
    // On <dfn> click
    container.addEventListener("click", (e) => {
      if (e.target.tagName === "DFN") {
        const el = e.target;
        const letter = e.target.id;
        input.value += letter;
        // Trigger input event manually to update output
        input.dispatchEvent(new Event("input"));
      }
    });
    // on mode change
    modeSelector.addEventListener("change", async (e) => {
      if (e.target.matches('input[name="mode"]')) {
        currentMode = document.querySelector('input[name="mode"]:checked')
          .value;
        showToast(currentMode);
        await renderPhoneticAlphabet(container);
        output.textContent = toPhonetic(input.value);
      }
    });
  })();
});
