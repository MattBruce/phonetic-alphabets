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

async function modeChange(mode) {
    currentMode = mode;
    await renderPhoneticAlphabet(document.getElementById("container"));
    document.getElementById("output").innerHTML = toPhonetic(
        document.getElementById("input").value
    );
}

function toPhonetic(word) {
    return word
        .toUpperCase()
        .split("")
        .map((char) => {
            const translation = getAlphabet()[char] || char;
            // Wrap in <em> if it's not a standard A-Z letter
            return /^[A-Z]$/.test(char) ? translation : `<em>${translation}</em>`;
        })
        .join(" ");
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
        const input = document.querySelector("input[type='text']");
        const output = document.querySelector("output");
        // set mode from URL param if present
        setModeFromURL();
        // init
        await renderPhoneticAlphabet(container);
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
                await renderPhoneticAlphabet(container);
                output.innerHTML = toPhonetic(input.value);
            }
        });
    })();
});
