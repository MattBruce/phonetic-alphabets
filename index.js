import { phoneticModes, prosodyProfiles } from './modesAndProfiles.js';

//mode
let currentMode = "standard";
let toastTimeout;
function getAlphabet() {
    return phoneticModes[currentMode];
}

function toTokens(input, includePunct = true) {
    return input
        .split("")
        .map((char) => {
            const upper = char.toUpperCase();
            const translation = getAlphabet()[upper];

            const isLetter = /^[A-Z]$/.test(upper);
            const isNumber = /^[0-9]$/.test(char);
            const isAlphaNum = isLetter || isNumber;

            if (!includePunct && !isAlphaNum) return null;

            // ✅ Numbers → treated like words
            if (isNumber) {
                return {
                    type: "word",
                    text: char,
                    raw: char
                };
            }

            if (translation) {
                const isBracket = /^\(.*\)$/.test(translation);

                return {
                    type: isBracket ? "bracket" : "word",
                    text: isBracket
                        ? translation.slice(1, -1).replace(/\s+/g, "-") // spoken
                        : translation,
                    display: isBracket
                        ? `(${translation.slice(1, -1).replace(/\s+/g, "-")})`
                        : translation,
                    raw: char
                };
            }

            return {
                type: "raw",
                text: char,
                raw: char
            };

        })
        .filter(Boolean);
}




let voices = [];
function loadVoices() {
    voices = speechSynthesis.getVoices();
}
loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;

function pickBestVoice(mode, voices = []) {
    if (!Array.isArray(voices) || voices.length === 0) return null;

    // 1. Try explicit preferences first
    const prefs = preferredVoices[mode];
    if (prefs) {
        for (const pref of prefs) {
            const found = voices.find(v =>
                v.name.toLowerCase().includes(pref.toLowerCase())
            );
            if (found) return found;
        }
    }

    // 2. Fallback to scoring
    const scorer = voiceProfiles[mode];
    if (!scorer) return null;

    let best = null;
    let bestScore = -Infinity;

    for (const v of voices) {
        const score = scorer(v);
        if (score > bestScore) {
            bestScore = score;
            best = v;
        }
    }

    return best;
}
const voiceProfiles = {
    standard: () => 0,

    cursed: (v) => {
        let score = 0;
        const n = v.name.toLowerCase();

        if (v.lang === "en-GB") score += 3;
        if (n.includes("daniel")) score += 5;
        if (n.includes("google uk english male")) score += 4;
        if (n.includes("male")) score += 1;
        if (v.localService) score += 1;

        return score;
    },

    hipster: (v) => {
        let score = 0;
        const n = v.name.toLowerCase();

        if (v.lang === "en-GB") score += 3;
        if (["fiona", "karen"].some(x => n.includes(x))) score += 5;
        if (n.includes("google uk english female")) score += 4;
        if (n.includes("female")) score += 1;

        return score;
    },

    business: (v) => {
        let score = 0;
        const n = v.name.toLowerCase();

        if (v.lang === "en-GB") score += 4;
        if (n.includes("daniel")) score += 5;
        if (n.includes("google uk english male")) score += 4;
        if (n.includes("male")) score += 2;

        return score;
    },

    insta: (v) => {
        let score = 0;
        const n = v.name.toLowerCase();

        if (v.lang.startsWith("en-US")) score += 4;
        if (["samantha", "victoria"].some(x => n.includes(x))) score += 5;
        if (n.includes("google us english")) score += 3;
        if (n.includes("female")) score += 2;

        return score;
    },

    techbro: (v) => {
        let score = 0;
        const n = v.name.toLowerCase();

        if (v.lang.startsWith("en-US")) score += 4;
        if (["alex", "fred"].some(x => n.includes(x))) score += 5;
        if (n.includes("google us english male")) score += 4;
        if (n.includes("male")) score += 2;

        return score;
    }
};
const preferredVoices = {
    cursed: ["Daniel", "Google UK English Male"],
    hipster: ["Karen", "Fiona", "Google UK English Female"],
    business: ["Daniel", "Google UK English Male"],
    insta: ["Samantha", "Victoria", "Google US English"],
    techbro: ["Alex", "Fred", "Google US English Male"]
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

function renderTokens(tokens) {
    return tokens
        .map((t) => {
            if (t.type === "word") return t.text;

            if (t.type === "bracket") {
                return `<em>${t.display}</em>`;
            }

            return `<em>${t.text}</em>`;
        })
        .join(" ");
}

function toPhonetic(input) {
    const tokens = toTokens(input, true); // always show punctuation visually
    return renderTokens(tokens);
}


async function speakBracket(token, profile, speakOne, wait, base) {
    const parts = token.text.split("-");
    const strategy = profile.bracketStrategy || "flat";

    if (strategy === "rising") {
        const phrase = parts
            .map((p, i) => {
                const marker = i < parts.length - 1 ? " ↑" : "";
                return p + marker;
            })
            .join(" ");

        await speakOne(phrase, {
            rate: base.rate * 1.03,
            pitch: base.pitch + 0.35
        });

        await wait(profile.bracket.post || 120);
        return;
    }

    if (strategy === "chunked") {
        for (const p of parts) {
            await speakOne(p, {
                rate: base.rate * 0.9,
                pitch: base.pitch
            });
            await wait(120);
        }
        await wait(profile.bracket.post || 120);
        return;
    }

    // default flat
    await speakOne(token.text, profile.bracket);
}

async function speakPhonetic(text, mode = "standard") {
    if (!("speechSynthesis" in window)) return;

    speechSynthesis.cancel();

    const includePunct = document.getElementById("punct")?.checked;
    const tokens = toTokens(text, includePunct);

    const settings = {
        standard: { rate: 1, pitch: 1 },
        cursed: { rate: 0.85, pitch: 0.7 },
        hipster: { rate: 0.95, pitch: 1.1 },
        business: { rate: 1.05, pitch: 0.95 },
        insta: { rate: 1.2, pitch: 1.3 },
        techbro: { rate: 1.1, pitch: 0.9 }
    };

    const base = settings[mode] || settings.standard;
    const voice = pickBestVoice(mode, speechSynthesis.getVoices());

    const speakOne = (text, opts = {}) =>
        new Promise(resolve => {
            const u = new SpeechSynthesisUtterance(text);

            u.rate = opts.rate ?? base.rate;
            u.pitch = opts.pitch ?? base.pitch;

            if (voice) u.voice = voice;

            u.onend = resolve;
            speechSynthesis.speak(u);
        });

    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    for (const token of tokens) {
        const profile = prosodyProfiles[mode] || prosodyProfiles.standard;

        const cfg = profile[token.type] || profile.word;

        if (cfg.pre) await wait(cfg.pre);

        if (token.type === "bracket") {
            await speakBracket(token, profile, speakOne, wait, base);
        } else {
            await speakOne(token.text, {
                rate: (mode === "cursed" || mode === "insta")
                    ? base.rate + (Math.random() * 0.1 - 0.05)
                    : cfg.rate,
                pitch: cfg.pitch
            });
        }

        if (cfg.post) await wait(cfg.post);
    }


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
    clearTimeout(toastTimeout);
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
    toastTimeout = setTimeout(() => {
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
        const punctCheckbox = document.getElementById("punct");
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
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            } else {
                speakPhonetic(input.value, currentMode);
            }
        });

        // Trigger speech on Enter key
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                speakPhonetic(input.value, currentMode);
            }
        });

        // On <input> change
        input.addEventListener("input", () => {
            speechSynthesis.cancel();
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
                speechSynthesis.cancel();
                currentMode = document.querySelector('input[name="mode"]:checked')
                    .value;
                showToast(currentMode);
                output.innerHTML = "";
                await renderPhoneticAlphabet(container);
                output.innerHTML = toPhonetic(input.value);
            }
        });
        // on punct change
        punctCheckbox.addEventListener("change", () => {
            speechSynthesis.cancel();
        });
    })();
});
