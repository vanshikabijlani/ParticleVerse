# 🌌 ParticleVerse

### YOUR HAND. YOUR STORY.

ParticleVerse is a real-time **gesture-controlled particle experience** that combines computer vision, interactive animation, and creative web development.

Users can write their own statements and control the experience using simple hand gestures.

---

## ✨ How It Works

Enter up to four custom statements and interact with them using your webcam.

| Gesture | Action |
|---|---|
| ☝️ Index Finger | Plays the current statement word-by-word |
| ✊ Fist | Moves to the next statement |

Each word is transformed into a collection of animated particles on the screen.

---

## 🧠 Technology

- **HTML5** — Application structure
- **CSS3** — Responsive visual design
- **JavaScript** — Application logic and interaction
- **Canvas API** — Real-time particle animation
- **MediaPipe Hand Landmarker** — Real-time hand tracking
- **Webcam API** — Camera input

---

## ⚙️ How It Works

```text
Webcam
   ↓
MediaPipe Hand Landmarker
   ↓
21 Hand Landmarks
   ↓
Gesture Classification
   ↓
☝️ INDEX / ✊ FIST
   ↓
JavaScript Controller
   ↓
Statement & Word Sequence
   ↓
Canvas Particle Engine
   ↓
Animated Word
````

---

## 🎨 Particle System

ParticleVerse creates each word dynamically using the Canvas API.

The application:

1. Draws the selected word onto an off-screen canvas.
2. Samples the visible text pixels.
3. Converts those pixels into particle target positions.
4. Animates particles toward those positions.
5. Creates the final word as a particle formation.

This allows the experience to create thousands of animated particles without creating thousands of HTML elements.

---

## 🎮 How to Use

### 1. Enter Your Statements

Enter up to four custom statements on the setup screen.

Example:

```text
I LOVE PARTICLEVERSE
CREATIVE CODE IS MAGIC
BUILD LEARN CREATE
WELCOME TO MY WORLD
```

### 2. Enter ParticleVerse

Click:

**ENTER PARTICLEVERSE**

Allow webcam access when your browser asks for permission.

### 3. Control the Experience

```text
☝️ INDEX FINGER
→ Plays the current statement word-by-word

✊ FIST
→ Moves to the next statement
```

You only need to show the gesture briefly. You don't need to continuously hold it.

---

## 📁 Project Structure

```text
ParticleVerse/
│
├── index.html
├── style.css
├── app.js
└── handTracking.js
```

### `index.html`

Contains the application structure, setup screen, statement inputs, HUD and canvas.

### `style.css`

Controls the responsive interface, visual effects, animations and overall ParticleVerse design.

### `app.js`

Controls the particle engine, statements, word-by-word sequence and application interaction.

### `handTracking.js`

Handles webcam input, MediaPipe hand tracking and gesture classification.

---

## 🧠 Gesture Detection

ParticleVerse uses **MediaPipe Hand Landmarker** to detect hand landmarks from the webcam.

The project intentionally focuses on two gestures:

### ☝️ Index Finger

The index finger is extended while the other fingers are folded.

**Action:** Starts the current statement.

### ✊ Fist

The four main fingers are folded.

**Action:** Moves to the next statement.

The system also uses gesture-state handling so the same gesture doesn't continuously trigger the action while the hand remains visible.

---

## 🛠️ Built With

```text
HTML5
CSS3
JavaScript
Canvas API
MediaPipe
Webcam API
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/vanshikabijlani/ParticleVerse.git
```

### Open the project

Open the downloaded folder in **VS Code**.

### Run the application

Use **VS Code Live Server** or another local web server.

Then open:

```text
index.html
```

### Camera Permission

Allow webcam access when prompted by the browser.

> Camera access is required because gesture detection happens in real time through the webcam.

---

## 💡 Key Learning

Building ParticleVerse helped me explore:

* Real-time computer vision
* Hand landmark detection
* Gesture classification
* Canvas-based animation
* Particle systems
* Real-time event handling
* Human-computer interaction
* Responsive web development

One of the biggest challenges was making gesture interaction responsive without repeatedly triggering the same action.

To improve reliability, the interaction was simplified to two gestures and gesture-state handling was added to prevent repeated triggers.

---

## 🎯 Why I Built It

ParticleVerse started as an experiment with particles and evolved into an exploration of **touchless human-computer interaction**.

Instead of clicking buttons or typing commands, the user can control the experience through simple hand gestures.

The project combines a technical computer-vision component with a creative visual experience.

---

## 🚀 Future Possibilities

* 🤟 More gesture controls
* 🎙️ Voice + gesture interaction
* ✋ Multi-hand interaction
* 💾 Saved user statements
* 🎮 Gesture-controlled games
* 📊 Interactive presentations
* 🖥️ Touchless interfaces
* ✨ More advanced particle effects

---

## 👩‍💻 Built By

### Vanshika Bijlani

**B.Tech CSE (AI & ML) Student**
**Python Developer • Creative Technologist**

Exploring the intersection of **AI, technology and creative problem-solving.**

---

## 🔗 Connect

GitHub:
[https://github.com/vanshikabijlani](https://github.com/vanshikabijlani)

---

### BUILD. LEARN. CREATE. ✨

If you found this project interesting, feel free to explore the code and experiment with it.

````

