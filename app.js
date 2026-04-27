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
const ERROR_CORRECTION_LEVELS = ["L", "M", "Q", "H"];
const TEXT_FONT_OPTIONS = ["Manrope", "Helvetica", "Arial", "Verdana", "Trebuchet MS", "Georgia", "Times New Roman", "Courier New"];
const PROFILE_VERSION = 1;

const PRESETS = {
  clean: {
    shape: "square",
    dotType: "rounded",
    cornerSquareType: "auto",
    cornerDotType: "auto",
    cornerSharpness: 70,
    dotColor: "#173f5f",
    cornerColor: "#2a5f8f",
    backgroundColor: "#f8fbff",
    noBackground: false,
    enableOutline: true,
    outlineThickness: 10,
    outlineRadius: 8,
    outlineColor: "#d4e2ee",
    outlineBackground: "#ffffff",
    enableTextDecoration: false,
    textDecorationValue: "Scan for details",
    textDecorationPosition: "bottom",
    textDecorationFont: "Manrope",
    textDecorationSize: 16,
    textDecorationColor: "#1f2d3d",
    textDecorationWeight: "bold",
    textDecorationTransform: "none",
    textDecorationCurved: true,
    enableGradient: false,
    gradientType: "linear",
    gradientStart: "#173f5f",
    gradientEnd: "#2a5f8f",
    gradientRotation: 28
  },
  playful: {
    shape: "square",
    dotType: "classyRounded",
    cornerSquareType: "classy",
    cornerDotType: "classy",
    cornerSharpness: 58,
    dotColor: "#0f766e",
    cornerColor: "#0f5d56",
    backgroundColor: "#f5fbfa",
    noBackground: false,
    enableOutline: true,
    outlineThickness: 10,
    outlineRadius: 8,
    outlineColor: "#cfe6e4",
    outlineBackground: "#ffffff",
    enableTextDecoration: false,
    textDecorationValue: "Scan for details",
    textDecorationPosition: "bottom",
    textDecorationFont: "Manrope",
    textDecorationSize: 16,
    textDecorationColor: "#1f2d3d",
    textDecorationWeight: "bold",
    textDecorationTransform: "none",
    textDecorationCurved: true,
    enableGradient: false,
    gradientType: "linear",
    gradientStart: "#0f766e",
    gradientEnd: "#0f5d56",
    gradientRotation: 22
  },
  warm: {
    shape: "square",
    dotType: "smallSquare",
    cornerSquareType: "classy",
    cornerDotType: "dot",
    cornerSharpness: 76,
    dotColor: "#334155",
    cornerColor: "#1f2937",
    backgroundColor: "#f8fafc",
    noBackground: false,
    enableOutline: true,
    outlineThickness: 12,
    outlineRadius: 10,
    outlineColor: "#d9e2ef",
    outlineBackground: "#ffffff",
    enableTextDecoration: false,
    textDecorationValue: "Scan for details",
    textDecorationPosition: "bottom",
    textDecorationFont: "Manrope",
    textDecorationSize: 16,
    textDecorationColor: "#1f2d3d",
    textDecorationWeight: "bold",
    textDecorationTransform: "none",
    textDecorationCurved: true,
    enableGradient: true,
    gradientType: "linear",
    gradientStart: "#334155",
    gradientEnd: "#64748b",
    gradientRotation: 38
  },
  neon: {
    shape: "square",
    dotType: "rounded",
    cornerSquareType: "square",
    cornerDotType: "square",
    cornerSharpness: 92,
    dotColor: "#312e81",
    cornerColor: "#3730a3",
    backgroundColor: "#f6f7ff",
    noBackground: false,
    enableOutline: true,
    outlineThickness: 11,
    outlineRadius: 9,
    outlineColor: "#d6daf8",
    outlineBackground: "#ffffff",
    enableTextDecoration: false,
    textDecorationValue: "Scan for details",
    textDecorationPosition: "bottom",
    textDecorationFont: "Manrope",
    textDecorationSize: 16,
    textDecorationColor: "#1f2d3d",
    textDecorationWeight: "bold",
    textDecorationTransform: "none",
    textDecorationCurved: true,
    enableGradient: true,
    gradientType: "linear",
    gradientStart: "#312e81",
    gradientEnd: "#4f46e5",
    gradientRotation: 64
  },
  mono: {
    shape: "square",
    dotType: "tinySquare",
    cornerSquareType: "square",
    cornerDotType: "square",
    cornerSharpness: 98,
    dotColor: "#111827",
    cornerColor: "#1f2937",
    backgroundColor: "#ffffff",
    noBackground: false,
    enableOutline: true,
    outlineThickness: 10,
    outlineRadius: 6,
    outlineColor: "#e3e7ee",
    outlineBackground: "#ffffff",
    enableTextDecoration: false,
    textDecorationValue: "Scan for details",
    textDecorationPosition: "bottom",
    textDecorationFont: "Manrope",
    textDecorationSize: 16,
    textDecorationColor: "#1f2d3d",
    textDecorationWeight: "bold",
    textDecorationTransform: "none",
    textDecorationCurved: true,
    enableGradient: false,
    gradientType: "linear",
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
  noBackground: document.querySelector("#noBackground"),
  enableOutline: document.querySelector("#enableOutline"),
  outlineFields: document.querySelector("#outlineFields"),
  outlineThickness: document.querySelector("#outlineThickness"),
  outlineThicknessValue: document.querySelector("#outlineThicknessValue"),
  outlineRadius: document.querySelector("#outlineRadius"),
  outlineRadiusValue: document.querySelector("#outlineRadiusValue"),
  outlineColor: document.querySelector("#outlineColor"),
  outlineBackground: document.querySelector("#outlineBackground"),
  enableTextDecoration: document.querySelector("#enableTextDecoration"),
  textDecorationFields: document.querySelector("#textDecorationFields"),
  textDecorationValue: document.querySelector("#textDecorationValue"),
  textDecorationPosition: document.querySelector("#textDecorationPosition"),
  textDecorationFont: document.querySelector("#textDecorationFont"),
  textDecorationSize: document.querySelector("#textDecorationSize"),
  textDecorationSizeValue: document.querySelector("#textDecorationSizeValue"),
  textDecorationColor: document.querySelector("#textDecorationColor"),
  textDecorationWeight: document.querySelector("#textDecorationWeight"),
  textDecorationTransform: document.querySelector("#textDecorationTransform"),
  textDecorationCurved: document.querySelector("#textDecorationCurved"),
  enableGradient: document.querySelector("#enableGradient"),
  gradientFields: document.querySelector("#gradientFields"),
  gradientStart: document.querySelector("#gradientStart"),
  gradientEnd: document.querySelector("#gradientEnd"),
  gradientType: document.querySelector("#gradientType"),
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
  saveProfile: document.querySelector("#saveProfile"),
  loadProfile: document.querySelector("#loadProfile"),
  profileUpload: document.querySelector("#profileUpload"),
  downloadFormat: document.querySelector("#downloadFormat"),
  downloadButton: document.querySelector("#downloadButton"),
  statusText: document.querySelector("#statusText"),
  qrMount: document.querySelector("#qrMount")
};

let qrCodeInstance;
let uploadedImageData = null;
let previousGradientEnabled = false;
let previousGradientType = "linear";

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
  elements.outlineThicknessValue.textContent = `${elements.outlineThickness.value}px`;
  elements.outlineRadiusValue.textContent = `${elements.outlineRadius.value}%`;
  elements.gradientRotationValue.textContent =
    elements.gradientType.value === "linear" ? `${elements.gradientRotation.value}deg` : "N/A for radial";
  elements.textDecorationSizeValue.textContent = `${elements.textDecorationSize.value}px`;
  elements.imageSizeValue.textContent = `${Math.round(Number(elements.imageSize.value) * 100)}%`;
  elements.imageMarginValue.textContent = `${elements.imageMargin.value} modules`;
}

function syncGradientFields() {
  const isEnabled = elements.enableGradient.checked;
  elements.gradientFields.classList.toggle("is-disabled", !isEnabled);
  elements.gradientFields.setAttribute("aria-hidden", String(!isEnabled));

  const isLinear = elements.gradientType.value === "linear";
  elements.gradientRotation.disabled = !isLinear;

  elements.backgroundColor.disabled = elements.noBackground.checked;

  const outlineEnabled = elements.enableOutline.checked;
  const textEnabled = elements.enableTextDecoration.checked;
  const showOutlineFields = outlineEnabled || textEnabled;
  elements.outlineFields.classList.toggle("is-disabled", !showOutlineFields);
  elements.outlineFields.setAttribute("aria-hidden", String(!showOutlineFields));

  elements.textDecorationFields.classList.toggle("is-disabled", !textEnabled);
  elements.textDecorationFields.setAttribute("aria-hidden", String(!textEnabled));
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
  const outlineEnabled = elements.enableOutline.checked;
  const textEnabled = elements.enableTextDecoration.checked;
  const textPosition = elements.textDecorationPosition.value;
  const normalizedTextTransform = elements.textDecorationTransform.value === "none" ? undefined : elements.textDecorationTransform.value;
  const outlineThickness = Math.round(Number(elements.outlineThickness.value));
  const textSize = Math.round(Number(elements.textDecorationSize.value));
  const borderThickness = textEnabled ? Math.max(outlineThickness, Math.round(textSize * 1.35)) : outlineThickness;
  const textStyle = {
    fontColor: elements.textDecorationColor.value,
    fontSize: textSize,
    fontWeight: elements.textDecorationWeight.value,
    fontFamily: elements.textDecorationFont.value
  };
  const buildTextDecoration = (isActive) => {
    const decoration = {
      type: "text",
      value: isActive ? elements.textDecorationValue.value.trim() : "",
      style: textStyle,
      offset: 14,
      curveDisabled: !elements.textDecorationCurved.checked,
      enableText: isActive,
      disabled: !isActive
    };

    if (normalizedTextTransform) {
      decoration.textTransform = normalizedTextTransform;
    }

    return decoration;
  };

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
      color: elements.noBackground.checked ? "transparent" : elements.backgroundColor.value,
      round: autoCornerProfile.backgroundRound
    },
    borderOptions: {
      hasBorder: outlineEnabled || textEnabled,
      thickness: borderThickness,
      color: outlineEnabled ? elements.outlineColor.value : "transparent",
      radius: `${Math.round(Number(elements.outlineRadius.value))}%`,
      background: elements.outlineBackground.value,
      showBackground: true,
      decorations: {
        top: buildTextDecoration(textEnabled && textPosition === "top"),
        bottom: buildTextDecoration(textEnabled && textPosition === "bottom")
      }
    }
  };

  if (elements.enableGradient.checked) {
    const gradient = {
      type: elements.gradientType.value,
      colorStops: [
        { offset: 0, color: elements.gradientStart.value },
        { offset: 1, color: elements.gradientEnd.value }
      ]
    };

    if (elements.gradientType.value === "linear") {
      gradient.rotation = (Number(elements.gradientRotation.value) * Math.PI) / 180;
    }

    options.dotsOptions.gradient = gradient;
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

    // Recreate instance when gradient mode/type changes to avoid stale nested options from update merges.
    const gradientEnabled = elements.enableGradient.checked;
    const gradientType = elements.gradientType.value;
    const gradientModeChanged = previousGradientEnabled !== gradientEnabled;
    const gradientTypeChanged = gradientEnabled && previousGradientType !== gradientType;
    const shouldRecreate = !qrCodeInstance || gradientModeChanged || gradientTypeChanged;

    if (shouldRecreate) {
      qrCodeInstance = new QRCodeJs(options);
      qrCodeInstance.append(elements.qrMount, { clearContainer: true });
    } else {
      qrCodeInstance.update(options);
    }

    previousGradientEnabled = gradientEnabled;
    previousGradientType = gradientType;
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
  elements.noBackground.checked = Boolean(preset.noBackground);
  elements.enableOutline.checked = Boolean(preset.enableOutline);
  elements.outlineThickness.value = String(preset.outlineThickness);
  elements.outlineRadius.value = String(preset.outlineRadius);
  elements.outlineColor.value = preset.outlineColor;
  elements.outlineBackground.value = preset.outlineBackground;
  elements.enableTextDecoration.checked = Boolean(preset.enableTextDecoration);
  elements.textDecorationValue.value = preset.textDecorationValue;
  elements.textDecorationPosition.value = preset.textDecorationPosition;
  elements.textDecorationFont.value = preset.textDecorationFont;
  elements.textDecorationSize.value = String(preset.textDecorationSize);
  elements.textDecorationColor.value = preset.textDecorationColor;
  elements.textDecorationWeight.value = preset.textDecorationWeight;
  elements.textDecorationTransform.value = preset.textDecorationTransform;
  elements.textDecorationCurved.checked = Boolean(preset.textDecorationCurved);
  elements.enableGradient.checked = preset.enableGradient;
  elements.gradientType.value = preset.gradientType;
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
  elements.noBackground.checked = Math.random() > 0.85;
  elements.enableOutline.checked = Math.random() > 0.45;
  elements.outlineThickness.value = String(randomInteger(6, 16));
  elements.outlineRadius.value = String(randomInteger(4, 20));
  elements.outlineColor.value = hslToHex((hue + 210) % 360, randomInteger(18, 35), randomInteger(78, 92));
  elements.outlineBackground.value = "#ffffff";
  elements.enableTextDecoration.checked = false;
  elements.textDecorationValue.value = "Scan for details";
  elements.textDecorationPosition.value = randomPick(["bottom", "top"]);
  elements.textDecorationFont.value = randomPick(["Manrope", "Helvetica", "Arial", "Verdana", "Georgia"]);
  elements.textDecorationSize.value = String(randomInteger(12, 20));
  elements.textDecorationColor.value = hslToHex((hue + 30) % 360, randomInteger(20, 42), randomInteger(18, 35));
  elements.textDecorationWeight.value = randomPick(["bold", "normal"]);
  elements.textDecorationTransform.value = randomPick(["none", "uppercase"]);
  elements.textDecorationCurved.checked = Math.random() > 0.45;

  // Randomization keeps contrast biased toward darker foreground + lighter background.
  const enableGradient = Math.random() > 0.4;
  elements.enableGradient.checked = enableGradient;
  elements.gradientType.value = randomPick(["linear", "radial"]);
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
  elements.noBackground.checked = false;
  elements.enableOutline.checked = true;
  elements.outlineThickness.value = "10";
  elements.outlineRadius.value = "8";
  elements.outlineColor.value = "#d4e2ee";
  elements.outlineBackground.value = "#ffffff";
  elements.enableTextDecoration.checked = false;
  elements.textDecorationValue.value = "Scan for details";
  elements.textDecorationPosition.value = "bottom";
  elements.textDecorationFont.value = "Manrope";
  elements.textDecorationSize.value = "16";
  elements.textDecorationColor.value = "#1f2d3d";
  elements.textDecorationWeight.value = "bold";
  elements.textDecorationTransform.value = "none";
  elements.textDecorationCurved.checked = true;
  elements.gradientType.value = "linear";
  elements.artisticPreset.value = "clean";
  uploadedImageData = null;
  elements.logoUpload.value = "";
  elements.profileUpload.value = "";

  applyPreset("clean");
  setStatus("Settings reset to defaults.");
}

function clampNumber(value, minimum, maximum, fallback) {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return fallback;
  }
  return Math.min(maximum, Math.max(minimum, numericValue));
}

function pickAllowed(value, allowedValues, fallback) {
  return allowedValues.includes(value) ? value : fallback;
}

function getCurrentProfile() {
  return {
    profileVersion: PROFILE_VERSION,
    savedAt: new Date().toISOString(),
    settings: {
      qrData: elements.qrData.value,
      qrSize: Number(elements.qrSize.value),
      qrMargin: Number(elements.qrMargin.value),
      errorCorrection: elements.errorCorrection.value,
      artisticPreset: elements.artisticPreset.value,
      shape: elements.shape.value,
      dotType: elements.dotType.value,
      cornerSquareType: elements.cornerSquareType.value,
      cornerDotType: elements.cornerDotType.value,
      cornerSharpness: Number(elements.cornerSharpness.value),
      dotColor: elements.dotColor.value,
      cornerColor: elements.cornerColor.value,
      backgroundColor: elements.backgroundColor.value,
      noBackground: elements.noBackground.checked,
      enableOutline: elements.enableOutline.checked,
      outlineThickness: Number(elements.outlineThickness.value),
      outlineRadius: Number(elements.outlineRadius.value),
      outlineColor: elements.outlineColor.value,
      outlineBackground: elements.outlineBackground.value,
      enableTextDecoration: elements.enableTextDecoration.checked,
      textDecorationValue: elements.textDecorationValue.value,
      textDecorationPosition: elements.textDecorationPosition.value,
      textDecorationFont: elements.textDecorationFont.value,
      textDecorationSize: Number(elements.textDecorationSize.value),
      textDecorationColor: elements.textDecorationColor.value,
      textDecorationWeight: elements.textDecorationWeight.value,
      textDecorationTransform: elements.textDecorationTransform.value,
      textDecorationCurved: elements.textDecorationCurved.checked,
      enableGradient: elements.enableGradient.checked,
      gradientType: elements.gradientType.value,
      gradientStart: elements.gradientStart.value,
      gradientEnd: elements.gradientEnd.value,
      gradientRotation: Number(elements.gradientRotation.value),
      imageMode: elements.imageMode.value,
      imageSize: Number(elements.imageSize.value),
      imageMargin: Number(elements.imageMargin.value),
      imageDataUrl: uploadedImageData
    }
  };
}

function applyProfileSettings(rawSettings = {}) {
  const settings = {
    qrData: typeof rawSettings.qrData === "string" ? rawSettings.qrData : "https://example.com/workshop",
    qrSize: clampNumber(rawSettings.qrSize, 180, 620, 360),
    qrMargin: clampNumber(rawSettings.qrMargin, 0, 40, 12),
    errorCorrection: pickAllowed(rawSettings.errorCorrection, ERROR_CORRECTION_LEVELS, "Q"),
    artisticPreset: pickAllowed(rawSettings.artisticPreset, Object.keys(PRESETS), "clean"),
    shape: pickAllowed(rawSettings.shape, ["square", "circle"], "square"),
    dotType: pickAllowed(rawSettings.dotType, DOT_TYPES, "rounded"),
    cornerSquareType: pickAllowed(rawSettings.cornerSquareType, CORNER_SQUARE_TYPES, "auto"),
    cornerDotType: pickAllowed(rawSettings.cornerDotType, CORNER_DOT_TYPES, "auto"),
    cornerSharpness: clampNumber(rawSettings.cornerSharpness, 0, 100, 70),
    dotColor: typeof rawSettings.dotColor === "string" ? rawSettings.dotColor : "#173f5f",
    cornerColor: typeof rawSettings.cornerColor === "string" ? rawSettings.cornerColor : "#20639b",
    backgroundColor: typeof rawSettings.backgroundColor === "string" ? rawSettings.backgroundColor : "#f7fbff",
    noBackground: Boolean(rawSettings.noBackground),
    enableOutline: rawSettings.enableOutline !== undefined ? Boolean(rawSettings.enableOutline) : true,
    outlineThickness: clampNumber(rawSettings.outlineThickness, 2, 44, 10),
    outlineRadius: clampNumber(rawSettings.outlineRadius, 0, 50, 8),
    outlineColor: typeof rawSettings.outlineColor === "string" ? rawSettings.outlineColor : "#d4e2ee",
    outlineBackground: typeof rawSettings.outlineBackground === "string" ? rawSettings.outlineBackground : "#ffffff",
    enableTextDecoration: Boolean(rawSettings.enableTextDecoration),
    textDecorationValue: typeof rawSettings.textDecorationValue === "string" ? rawSettings.textDecorationValue : "Scan for details",
    textDecorationPosition: pickAllowed(rawSettings.textDecorationPosition, ["top", "bottom"], "bottom"),
    textDecorationFont: pickAllowed(rawSettings.textDecorationFont, TEXT_FONT_OPTIONS, "Manrope"),
    textDecorationSize: clampNumber(rawSettings.textDecorationSize, 10, 34, 16),
    textDecorationColor: typeof rawSettings.textDecorationColor === "string" ? rawSettings.textDecorationColor : "#1f2d3d",
    textDecorationWeight: pickAllowed(rawSettings.textDecorationWeight, ["normal", "bold"], "bold"),
    textDecorationTransform: pickAllowed(rawSettings.textDecorationTransform, ["none", "uppercase", "lowercase", "capitalize"], "none"),
    textDecorationCurved: rawSettings.textDecorationCurved !== undefined ? Boolean(rawSettings.textDecorationCurved) : true,
    enableGradient: Boolean(rawSettings.enableGradient),
    gradientType: pickAllowed(rawSettings.gradientType, ["linear", "radial"], "linear"),
    gradientStart: typeof rawSettings.gradientStart === "string" ? rawSettings.gradientStart : "#173f5f",
    gradientEnd: typeof rawSettings.gradientEnd === "string" ? rawSettings.gradientEnd : "#3caea3",
    gradientRotation: clampNumber(rawSettings.gradientRotation, 0, 360, 35),
    imageMode: pickAllowed(rawSettings.imageMode, ["center", "overlay", "background"], "center"),
    imageSize: clampNumber(rawSettings.imageSize, 0.15, 0.5, 0.28),
    imageMargin: clampNumber(rawSettings.imageMargin, 0, 8, 2),
    imageDataUrl: typeof rawSettings.imageDataUrl === "string" ? rawSettings.imageDataUrl : null
  };

  elements.qrData.value = settings.qrData;
  elements.qrSize.value = String(settings.qrSize);
  elements.qrMargin.value = String(settings.qrMargin);
  elements.errorCorrection.value = settings.errorCorrection;
  elements.artisticPreset.value = settings.artisticPreset;
  elements.shape.value = settings.shape;
  elements.dotType.value = settings.dotType;
  elements.cornerSquareType.value = settings.cornerSquareType;
  elements.cornerDotType.value = settings.cornerDotType;
  elements.cornerSharpness.value = String(settings.cornerSharpness);
  elements.dotColor.value = settings.dotColor;
  elements.cornerColor.value = settings.cornerColor;
  elements.backgroundColor.value = settings.backgroundColor;
  elements.noBackground.checked = settings.noBackground;
  elements.enableOutline.checked = settings.enableOutline;
  elements.outlineThickness.value = String(settings.outlineThickness);
  elements.outlineRadius.value = String(settings.outlineRadius);
  elements.outlineColor.value = settings.outlineColor;
  elements.outlineBackground.value = settings.outlineBackground;
  elements.enableTextDecoration.checked = settings.enableTextDecoration;
  elements.textDecorationValue.value = settings.textDecorationValue;
  elements.textDecorationPosition.value = settings.textDecorationPosition;
  elements.textDecorationFont.value = settings.textDecorationFont;
  elements.textDecorationSize.value = String(settings.textDecorationSize);
  elements.textDecorationColor.value = settings.textDecorationColor;
  elements.textDecorationWeight.value = settings.textDecorationWeight;
  elements.textDecorationTransform.value = settings.textDecorationTransform;
  elements.textDecorationCurved.checked = settings.textDecorationCurved;
  elements.enableGradient.checked = settings.enableGradient;
  elements.gradientType.value = settings.gradientType;
  elements.gradientStart.value = settings.gradientStart;
  elements.gradientEnd.value = settings.gradientEnd;
  elements.gradientRotation.value = String(settings.gradientRotation);
  elements.imageMode.value = settings.imageMode;
  elements.imageSize.value = String(settings.imageSize);
  elements.imageMargin.value = String(settings.imageMargin);

  uploadedImageData = settings.imageDataUrl;
  if (!settings.imageDataUrl) {
    elements.logoUpload.value = "";
  }

  renderQrCode();
}

function saveProfileToFile() {
  const profile = getCurrentProfile();
  const serializedProfile = `${JSON.stringify(profile, null, 2)}\n`;
  const profileBlob = new Blob([serializedProfile], { type: "application/json" });
  const profileUrl = URL.createObjectURL(profileBlob);
  const downloadAnchor = document.createElement("a");
  const dayStamp = new Date().toISOString().slice(0, 10);

  downloadAnchor.href = profileUrl;
  downloadAnchor.download = `qr-style-profile-${dayStamp}.json`;
  downloadAnchor.click();

  URL.revokeObjectURL(profileUrl);
  setStatus("Profile JSON saved.");
}

async function handleProfileUpload(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  try {
    const rawText = await file.text();
    const parsedJson = JSON.parse(rawText);
    const settings = parsedJson.settings && typeof parsedJson.settings === "object" ? parsedJson.settings : parsedJson;
    applyProfileSettings(settings);
    setStatus(`Profile loaded: ${file.name}`);
  } catch (error) {
    setStatus(`Could not load profile JSON: ${error.message}`, true);
  } finally {
    elements.profileUpload.value = "";
  }
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
  elements.saveProfile.addEventListener("click", saveProfileToFile);
  elements.loadProfile.addEventListener("click", () => elements.profileUpload.click());
  elements.profileUpload.addEventListener("change", handleProfileUpload);
  elements.downloadButton.addEventListener("click", downloadQr);
}

setupEvents();
resetDefaults();
