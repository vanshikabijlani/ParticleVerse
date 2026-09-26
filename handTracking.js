// ======================================================
// PARTICLEVERSE
// FAST TWO-GESTURE HAND TRACKER
// ======================================================


import {

    HandLandmarker,

    FilesetResolver

} from
"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs";


// ======================================================
// VIDEO
// ======================================================

const video =
    document.getElementById(
        "webcam"
    );


let handLandmarker =
    null;


let lastVideoTime =
    -1;


// ======================================================
// GESTURE STABILITY
// ======================================================

let candidateGesture =
    "none";


let candidateFrames =
    0;


let stableGesture =
    "none";


const REQUIRED_FRAMES =
    2;


// ======================================================
// DISTANCE
// ======================================================

function distance(
    a,
    b
) {

    const dx =
        a.x -
        b.x;


    const dy =
        a.y -
        b.y;


    return Math.sqrt(
        dx * dx +
        dy * dy
    );

}


// ======================================================
// FINGER EXTENSION
// ======================================================

function isExtended(
    tip,
    pip,
    wrist
) {

    const tipDistance =
        distance(
            tip,
            wrist
        );


    const pipDistance =
        distance(
            pip,
            wrist
        );


    return (
        tipDistance >
        pipDistance *
        1.12
    );

}


// ======================================================
// DETECT INDEX OR FIST
// ======================================================

function detectGesture(
    hand
) {

    const wrist =
        hand[0];


    // ------------------------------------------
    // INDEX
    // ------------------------------------------

    const indexTip =
        hand[8];

    const indexPip =
        hand[6];


    // ------------------------------------------
    // MIDDLE
    // ------------------------------------------

    const middleTip =
        hand[12];

    const middlePip =
        hand[10];


    // ------------------------------------------
    // RING
    // ------------------------------------------

    const ringTip =
        hand[16];

    const ringPip =
        hand[14];


    // ------------------------------------------
    // PINKY
    // ------------------------------------------

    const pinkyTip =
        hand[20];

    const pinkyPip =
        hand[18];


    // ------------------------------------------
    // FINGER STATES
    // ------------------------------------------

    const index =
        isExtended(
            indexTip,
            indexPip,
            wrist
        );


    const middle =
        isExtended(
            middleTip,
            middlePip,
            wrist
        );


    const ring =
        isExtended(
            ringTip,
            ringPip,
            wrist
        );


    const pinky =
        isExtended(
            pinkyTip,
            pinkyPip,
            wrist
        );


    // ==========================================
    // INDEX FINGER
    // ==========================================

    if (
        index &&
        !middle &&
        !ring &&
        !pinky
    ) {

        return "index";

    }


    // ==========================================
    // FIST
    // ==========================================

    if (
        !index &&
        !middle &&
        !ring &&
        !pinky
    ) {

        return "fist";

    }


    // ==========================================
    // EVERYTHING ELSE
    // ==========================================

    return "none";

}


// ======================================================
// STABILIZE
// ======================================================

function stabilizeGesture(
    gesture
) {

    if (
        gesture ===
        candidateGesture
    ) {

        candidateFrames++;

    }

    else {

        candidateGesture =
            gesture;

        candidateFrames =
            1;

    }


    if (
        candidateFrames >=
        REQUIRED_FRAMES
    ) {

        stableGesture =
            candidateGesture;

    }


    return stableGesture;

}


// ======================================================
// INITIALIZE MEDIAPIPE
// ======================================================

async function initializeHandTracking() {

    try {

        console.log(
            "🖐 Loading fast gesture engine..."
        );


        // --------------------------------------
        // WASM
        // --------------------------------------

        const vision =
            await FilesetResolver.forVisionTasks(

                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm"

            );


        // --------------------------------------
        // HAND LANDMARKER
        // --------------------------------------

        handLandmarker =
            await HandLandmarker.createFromOptions(

                vision,

                {

                    baseOptions: {

                        modelAssetPath:
                            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",

                        delegate:
                            "GPU"

                    },


                    runningMode:
                        "VIDEO",


                    numHands:
                        1,


                    minHandDetectionConfidence:
                        0.45,


                    minHandPresenceConfidence:
                        0.45,


                    minTrackingConfidence:
                        0.45

                }

            );


        console.log(
            "⚡ FAST INDEX + FIST TRACKER READY"
        );


        detectHands();

    }

    catch (error) {

        console.error(
            "❌ Hand tracking initialization failed:",
            error
        );

    }

}


// ======================================================
// DETECT HANDS
// ======================================================

function detectHands() {

    if (
        !handLandmarker
    ) {

        requestAnimationFrame(
            detectHands
        );

        return;

    }


    // ------------------------------------------
    // ONLY PROCESS NEW VIDEO FRAMES
    // ------------------------------------------

    if (
        video.readyState >= 2 &&
        video.currentTime !==
        lastVideoTime
    ) {

        lastVideoTime =
            video.currentTime;


        try {

            const results =
                handLandmarker.detectForVideo(

                    video,

                    performance.now()

                );


            // ==================================
            // HAND FOUND
            // ==================================

            if (
                results.landmarks &&
                results.landmarks.length > 0
            ) {

                const hand =
                    results.landmarks[0];


                const rawGesture =
                    detectGesture(
                        hand
                    );


                const gesture =
                    stabilizeGesture(
                        rawGesture
                    );


                if (
                    window.particleControl
                ) {

                    window.particleControl.active =
                        true;


                    window.particleControl.gesture =
                        gesture;

                }

            }


            // ==================================
            // NO HAND
            // ==================================

            else {

                candidateGesture =
                    "none";


                candidateFrames =
                    0;


                stableGesture =
                    "none";


                if (
                    window.particleControl
                ) {

                    window.particleControl.active =
                        false;


                    window.particleControl.gesture =
                        "none";

                }

            }

        }

        catch (error) {

            console.warn(
                "Detection frame skipped:",
                error
            );

        }

    }


    requestAnimationFrame(
        detectHands
    );

}


// ======================================================
// WAIT FOR CAMERA
// ======================================================

function waitForCamera() {

    if (
        video &&
        video.readyState >= 2
    ) {

        initializeHandTracking();

    }

    else {

        setTimeout(
            waitForCamera,
            100
        );

    }

}


waitForCamera();


// ======================================================
// READY
// ======================================================

console.log(
    "☝️✊ PARTICLEVERSE TWO-GESTURE MODE LOADED"
);