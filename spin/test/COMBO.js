let lastAngle = 0;
let totalRotation = 0;
let streak = 0;
let lastTime = performance.now();
const audio = new Audio("sound.mp3");
const ultimateCombo = new Audio("ultimateCombo.mp3");
const comboSounds = [
  new Audio("comboSound1.mp3"),
  new Audio("comboSound2.mp3"),
  new Audio("comboSound3.mp3"),
  new Audio("comboSound4.mp3"),
  new Audio("comboSound5.mp3"),
  new Audio("comboSound6.mp3"),
];

audio.play();

const startGyro = () => {
  window.addEventListener("deviceorientation", (event) => {
    let currentAngle = event.alpha;
    let currentTime = performance.now();
    let deltaTime = (currentTime - lastTime) / 1000;

    if (deltaTime > 0.1) {
      lastTime = currentTime;
      return;
    }

    let deltaAngle = currentAngle - lastAngle;
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;

    totalRotation += deltaAngle;

    if (Math.abs(deltaAngle) < 4) {
      totalRotation = 0;
      streak = 0;
      return;
    }

    if (Math.abs(totalRotation) >= 300) {
      if (Math.abs(deltaAngle) < 10) {
        totalRotation = 0;
        streak = 0;
        return;
      }

      if (streak < 6) {
        comboSounds[streak].play();
        streak++;
      } else {
        audio.play();
        ultimateCombo.play();
        streak = 0;
      }

      totalRotation = 0;
    }

    lastAngle = currentAngle;
    lastTime = currentTime;
  });
};

const requestGyroPermission = () => {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then((state) => {
        if (state === "granted") {
          startGyro();
        } else {
          console.warn("Permission denied for gyroscope.");
        }
      })
      .catch((error) => {
        console.error("Error requesting permission:", error);
      });
  } else {
    startGyro();
  }
};

document
  .getElementById("butt")
  .addEventListener("click", requestGyroPermission);
