import { QRCodeJs } from "https://cdn.jsdelivr.net/npm/@qr-platform/qr-code.js@latest/+esm";

// Supported style values taken from the qr-code.js documentation.
const DOT_TYPES = [
  "dot",
  "square",
  "rounded",
  "extraRounded",
  "classy",
  "classyRounded",
  "verticalLine",
  "horizontalLine",
  "randomDot",
  "smallSquare",
  "tinySquare",
  "star",
  "plus",
  "diamond"
];

const CORNER_SQUARE_TYPES = ["auto", "dot", "square", "rounded", "classy", "outpoint", "inpoint"];
const CORNER_DOT_TYPES = ["auto", "dot", "square", "heart", "rounded", "classy", "outpoint", "inpoint"];

const PRESETS = {
  clean: {
    shape: "square",
    dotType: "rounded",
    cornerSquareType: "auto",
    cornerDotType: "auto",
    cornerSharpness: 70,
    dotColor: "#173f5f",
    cornerColor: "#20639b",
    backgroundColor: "#f7fbff",
    enableGradient: false,
    gradientStart: "#173f5f",
    gradientEnd: "#3caea3",
    gradientRotation: 35
  },
  playful: {
    shape: "circle",
    dotType: "star",
    cornerSquareType: "rounded",
    cornerDotType: "dot",
    cornerSharpness: 38,
    dotColor: "#0f3d8c",
    cornerColor: "#ef476f",
    backgroundColor: "#fff7ec",
    enableGradient: true,
    gradientStart: "#ef476f",
    gradientEnd: "#ffd166",
    gradientRotation: 52
  },
  warm: {
    shape: "square",
    dotType: "classy",
    cornerSquareType: "classy",
    cornerDotType: "classy",
    cornerSharpness: 58,
    dotColor: "#602437",
    cornerColor: "#8f2d56",
    backgroundColor: "#fdf6ee",
    enableGradient: true,
    gradientStart: "#602437",
    gradientEnd: "#f18805",
    gradientRotation: 18
  },
  neon: {
    shape: "square",
    dotType: "diamond",
    cornerSquareType: "outpoint",
    cornerDotType: "inpoint",
    cornerSharpness: 86,
    dotColor: "#0d2a63",
    cornerColor: "#1089ff",
    backgroundColor: "#eef8ff",
    enableGradient: true,
    gradientStart: "#1089ff",
    gradientEnd: "#00f5d4",
    gradientRotation: 125
  },
  mono: {
    shape: "square",
    dotType: "tinySquare",
    cornerSquareType: "square",
    cornerDotType: "square",
    cornerSharpness: 98,
    dotColor: "#111827",
    cornerColor: "#000000",
    backgroundColor: "#ffffff",
    enableGradient: false,
    gradientStart: "#111827",
    gradientEnd: "#4b5563",
    gradientRotation: 0
  }
};

const elements = {
  controlsForm: document.querySelector("#controlsForm"),
  qrData: document.querySelector("#qrData"),
  qrSize: document.querySelector("#qrSize"),
  qrSizeValue: document.querySelector("#qrSizeValue"),
  qrMargin: document.querySelector("#qrMargin"),
  qrMarginValue: document.querySelector("#qrMarginValue"),
  errorCorrection: document.querySelector("#errorCorrection"),
  artisticPreset: document.querySelector("#artisticPreset"),
  shape: document.querySelector("#shape"),
  dotType: document.querySelector("#dotType"),
  cornerSquareType: document.querySelector("#cornerSquareType"),
  cornerDotType: document.querySelector("#cornerDotType"),
  cornerSharpness: document.querySelector("#cornerSharpness"),
  cornerSharpnessValue: document.querySelector("#cornerSharpnessValue"),
  dotColor: document.querySelector("#dotColor"),
  cornerColor: document.querySelector("#cornerColor"),
  backgroundColor: document.querySelector("#backgroundColor"),
  enableGradient: document.querySelector("#enableGradient"),
  gradientFields: document.querySelector("#gradientFields"),
  gradientStart: document.querySelector("#gradientStart"),
  gradientEnd: document.querySelector("#gradientEnd"),
  gradientRotation: document.querySelector("#gradientRotation"),
  gradientRotationValue: document.querySelector("#gradientRotationValue"),
  logoUpload: document.querySelector("#logoUpload"),
  removeImage: document.querySelector("#removeImage"),
  imageMode: document.querySelector("#imageMode"),
  imageSize: document.querySelector("#imageSize"),
  imageSizeValue: document.querySelector("#imageSizeValue"),
  imageMargin: document.querySelector("#imageMargin"),
  imageMarginValue: document.querySelector("#imageMarginValue"),
  randomizeStyle: document.querySelector("#randomizeStyle"),
  resetDefaults: document.querySelector("#resetDefaults"),
  downloadFormat: document.querySelector("#downloadFormat"),
  downloadButton: document.querySelector("#downloadButton"),
  statusText: document.querySelector("#statusText"),
  qrMount: document.querySelector("#qrMount")
};

let qrCodeInstance;
let uploadedImageData = null;

function toTitleCase(value) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (first) => first.toUpperCase());
}

function fillSelect(selectElement, values) {
  const optionsMarkup = values
    .map((value) => `<option value="${value}">${value === "auto" ? "Auto" : toTitleCase(value)}</option>`)
    .join("");
  selectElement.innerHTML = optionsMarkup;
}

function setStatus(message, isError = false) {
  elements.statusText.textContent = message;
  elements.statusText.style.color = isError ? "#9f1d35" : "#4f6274";
}

function updateMetricReadouts() {
  elements.qrSizeValue.textContent = `${elements.qrSize.value}px`;
  elements.qrMarginValue.textContent = `${elements.qrMargin.value}px`;
  elements.cornerSharpnessValue.textContent = `${elements.cornerSharpness.value}%`;
  elements.gradientRotationValue.textContent = `${elements.gradientRotation.value}deg`;
  elements.imageSizeValue.textContent = `${Math.round(Number(elements.imageSize.value) * 100)}%`;
  elements.imageMarginValue.textContent = `${elements.imageMargin.value} modules`;
}

function syncGradientFields() {
  const isEnabled = elements.enableGradient.checked;
  elements.gradientFields.classList.toggle("is-disabled", !isEnabled);
  elements.gradientFields.setAttribute("aria-hidden", String(!isEnabled));
}

// Converts the sharpness slider into stylistic defaults when corner type is set to auto.
function deriveCornerProfile(sharpness) {
  if (sharpness <= 33) {
    return {
      square: "rounded",
      dot: "dot",
      backgroundRound: 0.34
    };
  }

  if (sharpness <= 66) {
    return {
      square: "classy",
      dot: "classy",
      backgroundRound: 0.18
    };
  }

  return {
    square: "square",
    dot: "square",
    backgroundRound: 0.05
  };
}

function buildQrOptions() {
  const data = elements.qrData.value.trim() || "https://example.com";
  const sharpness = Number(elements.cornerSharpness.value);
  const autoCornerProfile = deriveCornerProfile(sharpness);

  const cornerSquareType =
    elements.cornerSquareType.value === "auto" ? autoCornerProfile.square : elements.cornerSquareType.value;
  const cornerDotType = elements.cornerDotType.value === "auto" ? autoCornerProfile.dot : elements.cornerDotType.value;

  // Keep a single options object source-of-truth so preview and download always match.
  const options = {
    data,
    width: Number(elements.qrSize.value),
    height: Number(elements.qrSize.value),
    margin: Number(elements.qrMargin.value),
    shape: elements.shape.value,
    qrOptions: {
      errorCorrectionLevel: elements.errorCorrection.value
    },
    dotsOptions: {
      type: elements.dotType.value,
      color: elements.dotColor.value
    },
    cornersSquareOptions: {
      type: cornerSquareType,
      color: elements.cornerColor.value
    },
    cornersDotOptions: {
      type: cornerDotType,
      color: elements.cornerColor.value
    },
    backgroundOptions: {
      color: elements.backgroundColor.value,
      round: autoCornerProfile.backgroundRound
    }
  };

  if (elements.enableGradient.checked) {
    options.dotsOptions.gradient = {
      type: "linear",
      rotation: (Number(elements.gradientRotation.value) * Math.PI) / 180,
      colorStops: [
        { offset: 0, color: elements.gradientStart.value },
        { offset: 1, color: elements.gradientEnd.value }
      ]
    };
  }

  if (uploadedImageData) {
    options.image = uploadedImageData;
    options.imageOptions = {
      mode: elements.imageMode.value,
      imageSize: Number(elements.imageSize.value),
      margin: Number(elements.imageMargin.value)
    };
  }

  return options;
}

function renderQrCode() {
  updateMetricReadouts();
  syncGradientFields();

  try {
    const options = buildQrOptions();

    // Create once, then update in place for fast, smooth control changes.
    if (!qrCodeInstance) {
      qrCodeInstance = new QRCodeJs(options);
      qrCodeInstance.append(elements.qrMount, { clearContainer: true });
    } else {
      qrCodeInstance.update(options);
    }

    setStatus("Preview updated");
  } catch (error) {
    setStatus(`Could not render QR code: ${error.message}`, true);
  }
}

function applyPreset(presetName) {
  const preset = PRESETS[presetName] || PRESETS.clean;

  elements.shape.value = preset.shape;
  elements.dotType.value = preset.dotType;
  elements.cornerSquareType.value = preset.cornerSquareType;
  elements.cornerDotType.value = preset.cornerDotType;
  elements.cornerSharpness.value = String(preset.cornerSharpness);
  elements.dotColor.value = preset.dotColor;
  elements.cornerColor.value = preset.cornerColor;
  elements.backgroundColor.value = preset.backgroundColor;
  elements.enableGradient.checked = preset.enableGradient;
  elements.gradientStart.value = preset.gradientStart;
  elements.gradientEnd.value = preset.gradientEnd;
  elements.gradientRotation.value = String(preset.gradientRotation);

  renderQrCode();
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPick(values) {
  return values[randomInteger(0, values.length - 1)];
}

function hslToHex(hue, saturation, lightness) {
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  const hue2rgb = (p, q, t) => {
    if (t < 0) {
      return t + 1;
    }
    if (t > 1) {
      return t - 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const red = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const green = Math.round(hue2rgb(p, q, h) * 255);
  const blue = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

  const toHex = (channel) => channel.toString(16).padStart(2, "0");
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function randomizeAppearance() {
  const hue = randomInteger(0, 360);
  const accentHue = (hue + randomInteger(18, 84)) % 360;

  elements.shape.value = randomPick(["square", "circle"]);
  elements.dotType.value = randomPick(DOT_TYPES);
  elements.cornerSquareType.value = randomPick(CORNER_SQUARE_TYPES);
  elements.cornerDotType.value = randomPick(CORNER_DOT_TYPES);
  elements.cornerSharpness.value = String(randomInteger(20, 100));

  elements.dotColor.value = hslToHex(hue, randomInteger(55, 90), randomInteger(20, 46));
  elements.cornerColor.value = hslToHex(accentHue, randomInteger(50, 90), randomInteger(24, 48));
  elements.backgroundColor.value = hslToHex((hue + 180) % 360, randomInteger(28, 54), randomInteger(92, 98));

  // Randomization keeps contrast biased toward darker foreground + lighter background.
  const enableGradient = Math.random() > 0.4;
  elements.enableGradient.checked = enableGradient;
  elements.gradientStart.value = hslToHex(hue, randomInteger(58, 95), randomInteger(28, 52));
  elements.gradientEnd.value = hslToHex(accentHue, randomInteger(52, 95), randomInteger(30, 56));
  elements.gradientRotation.value = String(randomInteger(0, 360));

  elements.qrMargin.value = String(randomInteger(4, 22));
  elements.errorCorrection.value = randomPick(["M", "Q", "H"]);

  renderQrCode();
  setStatus("Randomized a new look. Scan-test before sharing.");
}

function resetDefaults() {
  elements.qrData.value = "https://example.com/workshop";
  elements.qrSize.value = "360";
  elements.qrMargin.value = "12";
  elements.errorCorrection.value = "Q";
  elements.imageMode.value = "center";
  elements.imageSize.value = "0.28";
  elements.imageMargin.value = "2";
  elements.artisticPreset.value = "clean";
  uploadedImageData = null;
  elements.logoUpload.value = "";

  applyPreset("clean");
  setStatus("Settings reset to defaults.");
}

async function handleImageUpload(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  // Data URL keeps the image self-contained for client-side rendering and export.
  const reader = new FileReader();

  reader.onload = () => {
    uploadedImageData = String(reader.result);
    renderQrCode();
    setStatus(`Loaded image: ${file.name}`);
  };

  reader.onerror = () => {
    setStatus("Could not read the selected image.", true);
  };

  reader.readAsDataURL(file);
}

async function downloadQr() {
  if (!qrCodeInstance) {
    return;
  }

  const extension = elements.downloadFormat.value;
  const safeStem = (elements.qrData.value.trim().split(/[\s/?#&=]+/)[0] || "qr-workshop")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);

  const baseName = safeStem || "qr-workshop";

  elements.downloadButton.disabled = true;

  try {
    await qrCodeInstance.download({
      name: `${baseName}-${new Date().toISOString().slice(0, 10)}`,
      extension
    });

    setStatus(`Downloaded ${extension.toUpperCase()} file.`);
  } catch (error) {
    setStatus(`Download failed: ${error.message}`, true);
  } finally {
    elements.downloadButton.disabled = false;
  }
}

function setupEvents() {
  // The select lists are generated from arrays to keep UI + option values in sync.
  fillSelect(elements.dotType, DOT_TYPES);
  fillSelect(elements.cornerSquareType, CORNER_SQUARE_TYPES);
  fillSelect(elements.cornerDotType, CORNER_DOT_TYPES);

  elements.controlsForm.addEventListener("input", renderQrCode);
  elements.controlsForm.addEventListener("change", renderQrCode);

  elements.artisticPreset.addEventListener("change", (event) => {
    applyPreset(event.target.value);
    setStatus(`Applied preset: ${toTitleCase(event.target.value)}`);
  });

  elements.logoUpload.addEventListener("change", handleImageUpload);

  elements.removeImage.addEventListener("click", () => {
    uploadedImageData = null;
    elements.logoUpload.value = "";
    renderQrCode();
    setStatus("Removed embedded image.");
  });

  elements.randomizeStyle.addEventListener("click", randomizeAppearance);
  elements.resetDefaults.addEventListener("click", resetDefaults);
  elements.downloadButton.addEventListener("click", downloadQr);
}

setupEvents();
resetDefaults();
