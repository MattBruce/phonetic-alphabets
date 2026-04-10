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
        Z: "Zulu",
        " ": "(space)",
        "'": "(apostrophe)",
        ".": "(stop)",
        ",": "(comma)",
        "-": "(dash)",
        "!": "(exclamation)",
        "?": "(question)",
        "_": "(underscore)",
        "@": "(at)"
    },
    cursed: {
        A: "Aisle",
        B: "Bdellium",
        C: "Cue",
        D: "Djinn",
        E: "Ewe",
        F: "Fjall",
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
        R: "Rwanda",
        S: "Sea",
        T: "Tsar",
        U: "Urn",
        V: "Voila",
        W: "Why",
        X: "Xenon",
        Y: "Yttrium",
        Z: "Zhuzh",
        " ": "(silence)",
        "'": "(whisper)",
        ".": "(glitch)",
        ",": "(shiver)",
        "-": "(void)",
        "!": "(scream)",
        "?": "(confusion)",
        "_": "(undefined)",
        "@": "(at)"
    },
    hipster: {
        A: "Açai",
        B: "Burrata",
        C: "Chia",
        D: "Dukkah",
        E: "Einkorn",
        F: "Focaccia",
        G: "Gochujang",
        H: "Hemp",
        I: "Icebrew",
        J: "Jackfruit",
        K: "Kombucha",
        L: "Labneh",
        M: "Matcha",
        N: "Nduja",
        O: "Oatmilk",
        P: "Poke",
        Q: "Quinoa",
        R: "Rooibos",
        S: "Sourdough",
        T: "Turmeric",
        U: "Ube",
        V: "Verjus",
        W: "Wakame",
        X: "Xanthan",
        Y: "Yuzu",
        Z: "Za’atar",
        " ": "(space)",
        "'": "(ownership)",
        ".": "(finish)",
        ",": "(breath)",
        "-": "(connection)",
        "!": "(emphasis)",
        "?": "(curiosity)",
        "@": "(at)"
    },
    business: {
        A: "Actionable",
        B: "Blue-sky",
        C: "Circle-back",
        D: "Deep dive",
        E: "Ecosystem",
        F: "Funnel",
        G: "Go-forward",
        H: "Hackathon",
        I: "Ideation",
        J: "Journey",
        K: "KPI",
        L: "Leverage",
        M: "Mindshare",
        N: "Net-new",
        O: "Optics",
        P: "Paradigm",
        Q: "Quick-win",
        R: "Roadmap",
        S: "Synergy",
        T: "Touch-base",
        U: "Utilisation",
        V: "Value-add",
        W: "Workflow",
        X: "X-functional",
        Y: "Year-over-year",
        Z: "Zero-sum",
        " ": "(space)",
        "'": "(apostrophe)",
        ".": "(stop)",
        ",": "(comma)",
        "-": "(pipeline)",
        "!": "(impact)",
        "?": "(clarity)",
        "_": "(underscore)",
        "@": "(at)"
    },
    insta: {
        A: "Authentic-self",
        B: "Boho",
        C: "Curated",
        D: "Detox",
        E: "Engagement",
        F: "Filtered",
        G: "Glow-up",
        H: "Hot-girl-walk",
        I: "Influencer",
        J: "Juice-cleanse",
        K: "Kombucha",
        L: "Lifestyle",
        M: "Manifest",
        N: "Namaste",
        O: "Outfit-of-the-day",
        P: "Partnership",
        Q: "Quiet-luxury",
        R: "Rebrand",
        S: "Self-care",
        T: "Thirst-trap",
        U: "Unboxing",
        V: "Vibes",
        W: "Wanderlust",
        X: "XOXO-bestie",
        Y: "Yoga",
        Z: "Zodiac",
        " ": "(space)",
        "'": "(sparkle)",
        ".": "(full stop vibes)",
        ",": "(pause)",
        "-": "(soft dash)",
        "!": "(excited energy)",
        "?": "(confused queen moment)",
        "_": "(deadass serious)",
        "@": "(handle)"
    },
    techbro: {
        A: "AI-first",
        B: "Blockchain",
        C: "Crypto",
        D: "Disrupt",
        E: "Exit",
        F: "Founder-mode",
        G: "Growth-hack",
        H: "Hyper-scale",
        I: "Iteration",
        J: "Jetpack",
        K: "Kubernetes",
        L: "Lean",
        M: "Monetise",
        N: "Network-effect",
        O: "Optimise",
        P: "Pivot",
        Q: "Quantum",
        R: "Runway",
        S: "Stealth",
        T: "Tokenise",
        U: "Unicorn",
        V: "VC-backed",
        W: "Web3",
        X: "XaaS",
        Y: "YoY-growth",
        Z: "Zero-to-one",
        " ": "(space)",
        "'": "(quote)",
        ".": "(dot)",
        ",": "(comma)",
        "-": "(dash)",
        "!": "(bang)",
        "?": "(query)",
        "_": "(underscore)",
        "@": "(at)"
    }
};

//mode
let currentMode = "standard";
function getAlphabet() {
    return phoneticModes[currentMode];
}

let voices = [];

function loadVoices() {
    voices = speechSynthesis.getVoices();
}

loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;

const voiceMap = {
    standard: null, // default system voice
    cursed: (v) => v.name.toLowerCase().includes("daniel") || v.name.toLowerCase().includes("male"),
    hipster: (v) => v.name.toLowerCase().includes("samantha") || v.lang.includes("en-GB"),
    business: (v) => v.lang === "en-GB",
    insta: (v) => v.name.toLowerCase().includes("female") || v.lang.startsWith("en"),
    techbro: (v) => v.name.toLowerCase().includes("google") || v.lang.includes("en-US")
};
function protectBracketPhrases(text) {
    const protectedMap = [];
    
    const cleaned = text.replace(/\(([^)]+)\)/g, (match, inside) => {
        const token = `__BRACKET_${protectedMap.length}__`;

        // convert internal spaces → dash
        const spoken = inside.trim().replace(/\s+/g, "-");

        protectedMap.push(spoken);
        return token;
    });

    return { cleaned, protectedMap };
}
function buildSpokenText(text, includePunct) {
    const { cleaned, protectedMap } = protectBracketPhrases(text);

    const phonetic = getPlainPhonetic(cleaned, includePunct);

    let i = 0;
    const restored = phonetic.replace(/__BRACKET_\d+__/g, () => {
        return protectedMap[i++];
    });

    return restored;
}
function toPhonetic(word) {
    return word
        .toUpperCase()
        .split("")
        .map((char) => {
            const translation = getAlphabet()[char] || char;
            // Wrap in <em> if it's not a standard A-Z letter or number
            return /^[A-Z0-9]$/.test(char) ? translation : `<em>${translation}</em>`;
        })
        .join(" ");
}

function getPlainPhonetic(word, includePunct = true) {
    return word
        .toUpperCase()
        .split("")
        .map((char) => {
            const isLetter = /^[A-Z0-9]$/.test(char);

            if (!includePunct && !isLetter) {
                return null; // skip punctuation entirely
            }

            return getAlphabet()[char] || char;
        })
        .filter(Boolean)
        .join(" ");
}
function formatForSpeech(text) {
    const tokens = text.match(/\(.*?\)|[^\s]+/g) || [];
    return tokens.join(", ");
}
function speakPhonetic(text, mode = "standard") {
    if (!("speechSynthesis" in window)) return;

    speechSynthesis.cancel();

    const includePunct = document.getElementById("punct")?.checked;

    //const plain = getPlainPhonetic(text, includePunct);
    const plain = buildSpokenText(text, includePunct);
    const paused = formatForSpeech(plain);

    const utterance = new SpeechSynthesisUtterance(paused);

    const settings = {
        standard: { rate: 1, pitch: 1 },
        cursed: { rate: 0.85, pitch: 0.7 },
        hipster: { rate: 0.95, pitch: 1.1 },
        business: { rate: 1.05, pitch: 0.95 },
        insta: { rate: 1.2, pitch: 1.3 },
        techbro: { rate: 1.1, pitch: 0.9 }
    };

    const cfg = settings[mode] || settings.standard;
    utterance.rate = cfg.rate;
    utterance.pitch = cfg.pitch;

    const voices = speechSynthesis.getVoices();

    const nameRules = {
        cursed: ["daniel", "male", "google uk english male"],
        hipster: ["samantha", "fiona", "uk english"],
        business: ["daniel", "uk english", "google uk english male"],
        insta: ["female", "samantha", "uk english female"],
        techbro: ["google", "us english", "alex"]
    };

    const rules = nameRules[mode];

    const voice =
        rules
            ? voices.find(v =>
                rules.some(r => v.name.toLowerCase().includes(r))
            )
            : null;

    if (voice) utterance.voice = voice;

    speechSynthesis.speak(utterance);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function renderPhoneticAlphabet(container) {
    if (!container) return;

    // Only render A-Z letters in the interactive grid
    const alphabet = Object.entries(getAlphabet()).filter(([key]) => /^[A-Z]$/.test(key));

    for (const [letter, word] of alphabet) {
        const existingDfn = document.getElementById(letter);
        const dfn = existingDfn || document.createElement("dfn");
        dfn.id = letter;
        if (!existingDfn) {
            container.appendChild(dfn);
        }
        //dfn.classList.add("flip-animation");
        dfn.setAttribute("currentMode", currentMode);
        document.documentElement.setAttribute("currentMode", currentMode);
        refreshClass(dfn, "flip-animation");
        dfn.textContent = word;

        await sleep(10); // Adjust delay (ms) as needed
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
        standard: "Standard mode.",
        hipster: "☕ Hipster Mode. Please compost your alphabet.",
        cursed: "👹 Cursed Mode engaged. Good luck.",
        business: "💼 Business Mode. Leveraging phonetic synergies.",
        insta: "💖 Instagram Mode. Showing up as your most phonetic, authentic self.",
        techbro: "🚀 Techbro Mode. Disrupting phonetics at scale."
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
    const validModes = ["standard", "hipster", "cursed", "business", "insta", "techbro"];

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
        document.getElementById("output").innerHTML = toPhonetic(
            document.getElementById("input").value
        );
        showToast(currentMode);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    (async () => {
        const container = document.getElementById("container");
        const modeSelector = document.getElementById("modeSelector");
        const input = document.getElementById("input");
        const output = document.getElementById("output");
        const speakButton = document.getElementById("speak");
        
        // Focus input on load
        input.focus();

        // set mode from URL param if present
        setModeFromURL();
        // init
        await renderPhoneticAlphabet(container);

        // On speak click
        speakButton.addEventListener("click", () => {
            speakPhonetic(input.value, currentMode);
        });

        // Trigger speech on Enter key
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                speakPhonetic(input.value, currentMode);
            }
        });

        // On <input> change
        input.addEventListener("input", () => {
            const val = input.value;
            output.innerHTML = toPhonetic(val);

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
                output.innerHTML = "";
                await renderPhoneticAlphabet(container);
                output.innerHTML = toPhonetic(input.value);
            }
        });
    })();
});
