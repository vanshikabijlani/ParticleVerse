// ======================================================
// PARTICLEVERSE
// STATEMENT MODE
// ======================================================


// ======================================================
// ELEMENTS
// ======================================================

const canvas =
    document.getElementById(
        "particleCanvas"
    );

const ctx =
    canvas.getContext(
        "2d"
    );


const intro =
    document.getElementById(
        "intro"
    );


const enterBtn =
    document.getElementById(
        "enterBtn"
    );


const exitBtn =
    document.getElementById(
        "exitBtn"
    );


const hud =
    document.getElementById(
        "hud"
    );


const currentGesture =
    document.getElementById(
        "currentGesture"
    );


const currentWord =
    document.getElementById(
        "currentWord"
    );


const statementIndicator =
    document.getElementById(
        "statementIndicator"
    );


const wordProgress =
    document.getElementById(
        "wordProgress"
    );


const transitionFlash =
    document.getElementById(
        "transitionFlash"
    );


// ======================================================
// STATEMENT INPUTS
// ======================================================

const statementInputs = [

    document.getElementById(
        "statement1"
    ),

    document.getElementById(
        "statement2"
    ),

    document.getElementById(
        "statement3"
    ),

    document.getElementById(
        "statement4"
    )

];


// ======================================================
// IMPORTANT
// MUST EXIST BEFORE RESIZE
// ======================================================

let activeWord = "";


// ======================================================
// CANVAS SIZE
// ======================================================

let width =
    window.innerWidth;

let height =
    window.innerHeight;


function resizeCanvas() {

    width =
        window.innerWidth;

    height =
        window.innerHeight;


    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            1.5
        );


    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;


    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    if (activeWord) {

        formWord(
            activeWord,
            true
        );

    }

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


// ======================================================
// PARTICLE CONTROL
// ======================================================

const particleControl = {

    active:
        false,

    gesture:
        "none"

};


window.particleControl =
    particleControl;


// ======================================================
// PARTICLES
// ======================================================

const PARTICLE_COUNT =
    1250;


const particles = [];


for (
    let i = 0;
    i < PARTICLE_COUNT;
    i++
) {

    particles.push({

        x:
            Math.random() *
            width,

        y:
            Math.random() *
            height,

        vx:
            (
                Math.random() -
                0.5
            ) * 0.5,

        vy:
            (
                Math.random() -
                0.5
            ) * 0.5,

        size:
            Math.random() *
            1.5 +
            0.4,

        alpha:
            Math.random() *
            0.6 +
            0.25,

        targetX:
            Math.random() *
            width,

        targetY:
            Math.random() *
            height

    });

}


// ======================================================
// TEXT CANVAS
// ======================================================

const textCanvas =
    document.createElement(
        "canvas"
    );


const textCtx =
    textCanvas.getContext(
        "2d"
    );


// ======================================================
// STORY STATE
// ======================================================

let statements = [];

let currentStatementIndex =
    0;

let currentWords = [];

let currentWordIndex =
    0;

let statementPlaying =
    false;

let wordTimer =
    null;


// ======================================================
// WORD SPEED
// ======================================================

const WORD_DURATION =
    1150;


// ======================================================
// LOAD USER STATEMENTS
// ======================================================

function loadStatements() {

    statements =
        statementInputs

            .map(
                input => {

                    if (!input) {

                        return "";

                    }

                    return input.value
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );

                }
            )

            .filter(
                text =>
                    text.length > 0
            );


    if (
        statements.length === 0
    ) {

        statements = [

            "I LOVE PARTICLEVERSE"

        ];

    }


    currentStatementIndex =
        0;


    console.log(
        "Statements loaded:",
        statements
    );

}


// ======================================================
// CREATE TEXT POINTS
// ======================================================

function createTextPoints(
    text
) {

    textCanvas.width =
        width;

    textCanvas.height =
        height;


    textCtx.clearRect(
        0,
        0,
        width,
        height
    );


    let fontSize =
        Math.min(
            width * 0.22,
            220
        );


    if (
        text.length >= 7
    ) {

        fontSize =
            Math.min(
                width * 0.16,
                170
            );

    }


    if (
        text.length >= 12
    ) {

        fontSize =
            Math.min(
                width * 0.105,
                115
            );

    }


    if (
        text.length >= 18
    ) {

        fontSize =
            Math.min(
                width * 0.075,
                85
            );

    }


    textCtx.font =
        `900 ${fontSize}px Arial`;


    textCtx.textAlign =
        "center";


    textCtx.textBaseline =
        "middle";


    textCtx.fillStyle =
        "#ffffff";


    textCtx.fillText(
        text,
        width / 2,
        height / 2
    );


    const imageData =
        textCtx.getImageData(
            0,
            0,
            width,
            height
        );


    const data =
        imageData.data;


    const points = [];


    const step =
        width < 700
            ? 5
            : 6;


    for (
        let y = 0;
        y < height;
        y += step
    ) {

        for (
            let x = 0;
            x < width;
            x += step
        ) {

            const pixelIndex =
                (
                    y * width +
                    x
                ) * 4;


            if (
                data[pixelIndex + 3] >
                120
            ) {

                points.push({

                    x:
                        x,

                    y:
                        y

                });

            }

        }

    }


    return points;

}


// ======================================================
// SHUFFLE
// ======================================================

function shuffle(
    array
) {

    for (
        let i =
            array.length - 1;

        i > 0;

        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }

}


// ======================================================
// FORM WORD
// ======================================================

function formWord(
    word,
    silent = false
) {

    if (!word) {

        return;

    }


    const points =
        createTextPoints(
            word
        );


    if (
        points.length === 0
    ) {

        return;

    }


    shuffle(
        points
    );


    activeWord =
        word;


    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        const particle =
            particles[i];


        const target =
            points[
                i %
                points.length
            ];


        particle.targetX =
            target.x +
            (
                Math.random() -
                0.5
            ) * 2;


        particle.targetY =
            target.y +
            (
                Math.random() -
                0.5
            ) * 2;


        particle.vx +=
            (
                Math.random() -
                0.5
            ) * 1.2;


        particle.vy +=
            (
                Math.random() -
                0.5
            ) * 1.2;

    }


    if (!silent) {

        triggerFlash();

    }

}


// ======================================================
// PLAY CURRENT STATEMENT
// ======================================================

function playCurrentStatement() {

    if (
        statementPlaying
    ) {

        return;

    }


    if (
        statements.length === 0
    ) {

        return;

    }


    const statement =
        statements[
            currentStatementIndex
        ];


    currentWords =
        statement
            .split(/\s+/)
            .filter(
                word =>
                    word.length > 0
            );


    currentWordIndex =
        0;


    statementPlaying =
        true;


    statementIndicator.textContent =
        "STATEMENT " +
        String(
            currentStatementIndex + 1
        ).padStart(
            2,
            "0"
        );


    currentGesture.textContent =
        "☝ PLAYING STATEMENT";


    playNextWord();

}


// ======================================================
// PLAY NEXT WORD
// ======================================================

function playNextWord() {

    if (
        !statementPlaying
    ) {

        return;

    }


    if (
        currentWordIndex >=
        currentWords.length
    ) {

        statementPlaying =
            false;


        wordTimer =
            null;


        currentWord.textContent =
            "✓";


        wordProgress.textContent =
            currentWords.length +
            " / " +
            currentWords.length;


        currentGesture.textContent =
            "STATEMENT COMPLETE — SHOW ✊";


        return;

    }


    const word =
        currentWords[
            currentWordIndex
        ];


    currentWord.textContent =
        word;


    wordProgress.textContent =
        (
            currentWordIndex + 1
        ) +
        " / " +
        currentWords.length;


    formWord(
        word
    );


    currentWordIndex++;


    wordTimer =
        setTimeout(
            playNextWord,
            WORD_DURATION
        );

}


// ======================================================
// NEXT STATEMENT
// ======================================================

function nextStatement() {

    if (
        wordTimer
    ) {

        clearTimeout(
            wordTimer
        );

        wordTimer =
            null;

    }


    statementPlaying =
        false;


    currentStatementIndex++;


    if (
        currentStatementIndex >=
        statements.length
    ) {

        currentStatementIndex =
            0;

    }


    currentWords = [];

    currentWordIndex =
        0;


    activeWord =
        "";


    statementIndicator.textContent =
        "STATEMENT " +
        String(
            currentStatementIndex + 1
        ).padStart(
            2,
            "0"
        );


    // Updated:
    // No repeated READY / SHOW message
    currentGesture.textContent =
        "✊ NEXT STATEMENT";


    currentWord.textContent =
        "";


    wordProgress.textContent =
        "0 / 0";


    scatterParticles();

}


// ======================================================
// SCATTER PARTICLES
// ======================================================

function scatterParticles() {

    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        const particle =
            particles[i];


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            150 +
            Math.random() *
            500;


        particle.targetX =
            width / 2 +
            Math.cos(angle) *
            distance;


        particle.targetY =
            height / 2 +
            Math.sin(angle) *
            distance;


        particle.vx +=
            (
                Math.random() -
                0.5
            ) * 5;


        particle.vy +=
            (
                Math.random() -
                0.5
            ) * 5;

    }


    triggerFlash();

}


// ======================================================
// GESTURE PROCESSOR
// ======================================================

let previousGesture =
    "none";


function processGesture() {

    if (
        !particleControl.active
    ) {

        previousGesture =
            "none";

        return;

    }


    const gesture =
        particleControl.gesture;


    if (
        !gesture ||
        gesture === "none"
    ) {

        return;

    }


    // Only react once when
    // the gesture changes.

    if (
        gesture ===
        previousGesture
    ) {

        return;

    }


    previousGesture =
        gesture;


    // ==========================================
    // INDEX
    // ==========================================

    if (
        gesture === "index"
    ) {

        playCurrentStatement();

    }


    // ==========================================
    // FIST
    // ==========================================

    else if (
        gesture === "fist"
    ) {

        nextStatement();

    }

}


// ======================================================
// FLASH
// ======================================================

function triggerFlash() {

    transitionFlash.classList.remove(
        "active"
    );


    void transitionFlash.offsetWidth;


    transitionFlash.classList.add(
        "active"
    );

}


// ======================================================
// CAMERA
// ======================================================

async function startCamera() {

    try {

        const video =
            document.getElementById(
                "webcam"
            );


        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            console.error(
                "Camera API unavailable."
            );

            return;

        }


        const stream =
            await navigator.mediaDevices
                .getUserMedia({

                    video: {

                        width: {

                            ideal:
                                480

                        },

                        height: {

                            ideal:
                                360

                        },

                        frameRate: {

                            ideal:
                                30,

                            max:
                                30

                        },

                        facingMode:
                            "user"

                    },

                    audio:
                        false

                });


        video.srcObject =
            stream;


        await video.play();


        console.log(
            "📷 Camera connected"
        );

    }

    catch (error) {

        console.error(
            "Camera error:",
            error
        );


        alert(
            "Please allow camera access to use ParticleVerse."
        );

    }

}


// ======================================================
// ENTER PARTICLEVERSE
// ======================================================

enterBtn.addEventListener(
    "click",
    () => {

        console.log(
            "🚀 Entering ParticleVerse..."
        );


        loadStatements();


        enterBtn.disabled =
            true;


        const buttonText =
            enterBtn.querySelector(
                "span"
            );


        if (buttonText) {

            buttonText.textContent =
                "ENTERING...";

        }


        // Start camera
        startCamera();


        // Hide intro
        intro.style.opacity =
            "0";


        intro.style.visibility =
            "hidden";


        setTimeout(
            () => {

                intro.style.display =
                    "none";


                hud.style.display =
                    "block";


                statementIndicator.textContent =
                    "STATEMENT 01";


                currentGesture.textContent =
                    "SHOW ☝ TO BEGIN";


                currentWord.textContent =
                    "READY";


                wordProgress.textContent =
                    "0 / 0";


                console.log(
                    "🌌 PARTICLEVERSE ACTIVE"
                );

            },
            550
        );

    }
);


// ======================================================
// EXIT
// ======================================================

exitBtn.addEventListener(
    "click",
    () => {

        const video =
            document.getElementById(
                "webcam"
            );


        if (
            video &&
            video.srcObject
        ) {

            video.srcObject
                .getTracks()
                .forEach(
                    track => {

                        track.stop();

                    }
                );

        }


        location.reload();

    }
);


// ======================================================
// PARTICLE ANIMATION
// ======================================================

let lastFrame =
    performance.now();


function animate(
    now
) {

    const delta =
        Math.min(
            now -
            lastFrame,
            32
        );


    lastFrame =
        now;


    const frameScale =
        delta /
        16.67;


    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        const particle =
            particles[i];


        const dx =
            particle.targetX -
            particle.x;


        const dy =
            particle.targetY -
            particle.y;


        particle.vx +=
            dx *
            0.016 *
            frameScale;


        particle.vy +=
            dy *
            0.016 *
            frameScale;


        particle.vx *=
            Math.pow(
                0.86,
                frameScale
            );


        particle.vy *=
            Math.pow(
                0.86,
                frameScale
            );


        particle.x +=
            particle.vx *
            frameScale;


        particle.y +=
            particle.vy *
            frameScale;

    }


    processGesture();


    drawParticles();


    requestAnimationFrame(
        animate
    );

}


// ======================================================
// DRAW PARTICLES
// ======================================================

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        const particle =
            particles[i];


        ctx.beginPath();


        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(
                170,
                235,
                255,
                ${particle.alpha}
            )`;


        ctx.fill();

    }

}


// ======================================================
// START
// ======================================================

console.log(
    "🌌 PARTICLEVERSE STATEMENT ENGINE READY"
);


requestAnimationFrame(
    animate
);