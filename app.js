import { QRCodeJs } from "https://cdn.jsdelivr.net/npm/@qr-platform/qr-code.js@latest/+esm";
import * as pdfjsLib from "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.mjs";
import { PDFDocument } from "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm";

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.worker.mjs";

// Supported style values taken from the qr-code.js documentation.
const STANDARD_DOT_TYPES = [
  "dot",
  "square",
  "rounded",
  "extraRounded",
  "classy",
  "classyRounded",
  "verticalLine",
  "horizontalLine",
  "smallSquare",
  "tinySquare"
];

const STANDARD_CORNER_SQUARE_TYPES = ["auto", "dot", "square", "rounded", "classy"];
const STANDARD_CORNER_DOT_TYPES = ["auto", "dot", "square", "rounded", "classy"];
const OPTIONAL_STYLE_OPTIONS = [
  { value: "none", label: "None" },
  { value: "star", label: "Star Dots" },
  { value: "plus", label: "Plus Dots" },
  { value: "diamond", label: "Diamond Dots" },
  { value: "randomDot", label: "Random Dot Mix" },
  { value: "cornerHeart", label: "Heart Corner Dots" },
  { value: "cornerOutpoint", label: "Outpoint Corner Dots" },
  { value: "cornerInpoint", label: "Inpoint Corner Dots" },
  { value: "squareOutpoint", label: "Outpoint Corner Squares" },
  { value: "squareInpoint", label: "Inpoint Corner Squares" }
];
const OPTIONAL_STYLE_VALUES = OPTIONAL_STYLE_OPTIONS.map((option) => option.value);
const ERROR_CORRECTION_LEVELS = ["L", "M", "Q", "H"];
const TEXT_FONT_OPTIONS = ["Manrope", "Helvetica", "Arial", "Verdana", "Trebuchet MS", "Georgia", "Times New Roman", "Courier New"];
const PROFILE_VERSION = 1;
const DEFAULT_SHRINKER_SUMMARY = "Upload one or more PDFs, PNGs, or JPGs and then run the shrinker.";
const HOSTED_BATCH_SIZE_LIMIT_BYTES = 120 * 1024 * 1024;
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1"]);

const PRESETS = {
  clean: {
    shape: "square",
    dotType: "rounded",
    cornerSquareType: "auto",
    cornerDotType: "auto",
    optionalStyle: "none",
    cornerSharpness: 70,
    dotColor: "#173f5f",
    cornerColor: "#2a5f8f",
    backgroundColor: "#f8fbff",
    noBackground: false,
    enableOutline: false,
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
    optionalStyle: "none",
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
    optionalStyle: "none",
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
    optionalStyle: "none",
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
    optionalStyle: "none",
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
  qrTabButton: document.querySelector("#qrTabButton"),
  shrinkerTabButton: document.querySelector("#shrinkerTabButton"),
  qrTabPanel: document.querySelector("#qrTabPanel"),
  shrinkerTabPanel: document.querySelector("#shrinkerTabPanel"),
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
  optionalStyle: document.querySelector("#optionalStyle"),
  optionalStyleEffect: document.querySelector("#optionalStyleEffect"),
  cornerSharpness: document.querySelector("#cornerSharpness"),
  cornerSharpnessValue: document.querySelector("#cornerSharpnessValue"),
  dotColor: document.querySelector("#dotColor"),
  cornerColor: document.querySelector("#cornerColor"),
  backgroundColor: document.querySelector("#backgroundColor"),
  noBackground: document.querySelector("#noBackground"),
  previewBackgroundField: document.querySelector("#previewBackgroundField"),
  previewBackgroundColor: document.querySelector("#previewBackgroundColor"),
  previewBackdropHelp: document.querySelector("#previewBackdropHelp"),
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
  imageUrlInput: document.querySelector("#imageUrlInput"),
  loadImageUrl: document.querySelector("#loadImageUrl"),
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
  qrMount: document.querySelector("#qrMount"),
  shrinkerForm: document.querySelector("#shrinkerForm"),
  shrinkFiles: document.querySelector("#shrinkFiles"),
  shrinkFilesSummary: document.querySelector("#shrinkFilesSummary"),
  shrinkFilesList: document.querySelector("#shrinkFilesList"),
  shrinkLimitNote: document.querySelector("#shrinkLimitNote"),
  shrinkScale: document.querySelector("#shrinkScale"),
  shrinkScaleValue: document.querySelector("#shrinkScaleValue"),
  shrinkQuality: document.querySelector("#shrinkQuality"),
  shrinkQualityValue: document.querySelector("#shrinkQualityValue"),
  pdfRasterFormat: document.querySelector("#pdfRasterFormat"),
  imageOutputMode: document.querySelector("#imageOutputMode"),
  convertGrayscale: document.querySelector("#convertGrayscale"),
  processShrinkFiles: document.querySelector("#processShrinkFiles"),
  clearShrinkResults: document.querySelector("#clearShrinkResults"),
  shrinkerStatus: document.querySelector("#shrinkerStatus"),
  shrinkerSummary: document.querySelector("#shrinkerSummary"),
  shrinkerProjection: document.querySelector("#shrinkerProjection"),
  shrinkerResults: document.querySelector("#shrinkerResults")
};

let qrCodeInstance;
let uploadedImageData = null;
let previousGradientEnabled = false;
let previousGradientType = "linear";
let shrinkerDownloadUrls = [];
let shrinkerSelectedFiles = [];
let shrinkerBatchOverLimit = false;
let shrinkProjectionRequestId = 0;
let shrinkProjectionTimer = null;

function toTitleCase(value) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (first) => first.toUpperCase());
}

function fillSelect(selectElement, values) {
  const optionsMarkup = values
    .map((entry) => {
      const value = typeof entry === "string" ? entry : entry.value;
      const label = typeof entry === "string" ? (value === "auto" ? "Auto" : toTitleCase(value)) : entry.label;
      return `<option value="${value}">${label}</option>`;
    })
    .join("");
  selectElement.innerHTML = optionsMarkup;
}

function setStatus(message, isError = false) {
  elements.statusText.textContent = message;
  elements.statusText.style.color = isError ? "#9f1d35" : "#4f6274";
}

function setShrinkerStatus(message, isError = false) {
  elements.shrinkerStatus.textContent = message;
  elements.shrinkerStatus.style.color = isError ? "#9f1d35" : "#4f6274";
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

function formatBytes(byteCount) {
  if (!Number.isFinite(byteCount) || byteCount <= 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(Math.floor(Math.log(byteCount) / Math.log(1024)), units.length - 1);
  const value = byteCount / 1024 ** unitIndex;
  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function isLocalEnvironment() {
  return window.location.protocol === "file:" || LOCAL_HOSTNAMES.has(window.location.hostname);
}

function getActiveBatchSizeLimit() {
  return isLocalEnvironment() ? null : HOSTED_BATCH_SIZE_LIMIT_BYTES;
}

function getBatchTotalBytes(fileList) {
  return Array.from(fileList || []).reduce((total, file) => total + file.size, 0);
}

function updateShrinkLimitNote() {
  const activeLimit = getActiveBatchSizeLimit();

  elements.shrinkLimitNote.textContent = activeLimit
    ? `Hosted mode limits each batch to ${formatBytes(activeLimit)} total so the public app stays stable in-browser.`
    : "Local mode has no enforced total batch-size cap. Very large batches can still use significant browser memory.";
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
  elements.shrinkScaleValue.textContent = `${elements.shrinkScale.value}%`;
  elements.shrinkQualityValue.textContent = `${elements.shrinkQuality.value}%`;
}

function setActiveTab(tabName) {
  const showQr = tabName === "qr";
  elements.qrTabButton.classList.toggle("is-active", showQr);
  elements.shrinkerTabButton.classList.toggle("is-active", !showQr);
  elements.qrTabButton.setAttribute("aria-pressed", String(showQr));
  elements.shrinkerTabButton.setAttribute("aria-pressed", String(!showQr));
  elements.qrTabPanel.classList.toggle("is-active", showQr);
  elements.shrinkerTabPanel.classList.toggle("is-active", !showQr);
}

function getOptionalStyleEffectText(optionalStyle) {
  const descriptions = {
    none: "Active effect: None. Base dot and corner styles are used.",
    star: "Active effect: Dot style is overridden to Star. Corner selections stay as chosen.",
    plus: "Active effect: Dot style is overridden to Plus. Corner selections stay as chosen.",
    diamond: "Active effect: Dot style is overridden to Diamond. Corner selections stay as chosen.",
    randomDot: "Active effect: Dot style is overridden to Random Dot Mix. Corner selections stay as chosen.",
    cornerHeart: "Active effect: Corner dot style is overridden to Heart. Dot and corner-square selections stay as chosen.",
    cornerOutpoint:
      "Active effect: Corner dot style is overridden to Outpoint. Dot and corner-square selections stay as chosen.",
    cornerInpoint:
      "Active effect: Corner dot style is overridden to Inpoint. Dot and corner-square selections stay as chosen.",
    squareOutpoint:
      "Active effect: Corner square style is overridden to Outpoint. Dot and corner-dot selections stay as chosen.",
    squareInpoint:
      "Active effect: Corner square style is overridden to Inpoint. Dot and corner-dot selections stay as chosen."
  };

  return descriptions[optionalStyle] || descriptions.none;
}

function syncGradientFields() {
  const isEnabled = elements.enableGradient.checked;
  elements.gradientFields.classList.toggle("is-disabled", !isEnabled);
  elements.gradientFields.setAttribute("aria-hidden", String(!isEnabled));

  const isLinear = elements.gradientType.value === "linear";
  elements.gradientRotation.disabled = !isLinear;

  elements.backgroundColor.disabled = elements.noBackground.checked;
  elements.previewBackgroundColor.disabled = !elements.noBackground.checked;
  elements.previewBackgroundField.classList.toggle("is-disabled", !elements.noBackground.checked);
  elements.previewBackdropHelp.textContent = elements.noBackground.checked
    ? "Preview backdrop color is active and affects preview only (export remains transparent)."
    : "Enable \"No background (transparent)\" to choose the preview-only backdrop color.";
  elements.optionalStyleEffect.textContent = getOptionalStyleEffectText(elements.optionalStyle.value);

  const outlineEnabled = elements.enableOutline.checked;
  const textEnabled = elements.enableTextDecoration.checked;
  const showOutlineFields = outlineEnabled || textEnabled;
  elements.outlineFields.classList.toggle("is-disabled", !showOutlineFields);
  elements.outlineFields.setAttribute("aria-hidden", String(!showOutlineFields));

  elements.textDecorationFields.classList.toggle("is-disabled", !textEnabled);
  elements.textDecorationFields.setAttribute("aria-hidden", String(!textEnabled));
}

function applyPreviewBackground() {
  if (elements.noBackground.checked) {
    elements.qrMount.classList.add("transparent-preview");
    elements.qrMount.style.setProperty("--preview-bg-color", elements.previewBackgroundColor.value);
    return;
  }

  elements.qrMount.classList.remove("transparent-preview");
  elements.qrMount.style.removeProperty("--preview-bg-color");
}

function resetShrinkerSummary() {
  elements.shrinkerSummary.textContent = DEFAULT_SHRINKER_SUMMARY;
}

function resetShrinkerProjection() {
  elements.shrinkerProjection.textContent = "Select files to see a projected output size and likely compression behavior.";
}

function clearShrinkResultsList() {
  shrinkerDownloadUrls.forEach((url) => URL.revokeObjectURL(url));
  shrinkerDownloadUrls = [];
  elements.shrinkerResults.innerHTML = "";
  resetShrinkerSummary();
}

function clearShrinkerSelectionState() {
  clearTimeout(shrinkProjectionTimer);
  shrinkProjectionRequestId += 1;
  shrinkerSelectedFiles = [];
  shrinkerBatchOverLimit = false;
  elements.processShrinkFiles.disabled = false;
  renderSelectedFilesList();
  resetShrinkerProjection();
}

function isPdfFile(file) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

function isImageFile(file) {
  return file.type.startsWith("image/");
}

function describeProjectionBehavior(options, selectedFiles) {
  const hasPdf = selectedFiles.some((entry) => entry.kind === "pdf");
  const hasImage = selectedFiles.some((entry) => entry.kind === "image");
  const notes = [];

  if (hasPdf) {
    notes.push(
      options.pdfRasterFormat === "jpeg"
        ? "PDF pages will be rasterized as JPEGs, which usually gives the smallest files for scanned documents."
        : "PDF pages will be rasterized as PNGs, which preserves sharper edges but often produces larger files."
    );
  }

  if (hasImage) {
    if (options.imageOutputMode === "auto") {
      notes.push("Image output uses JPEG for opaque images and PNG for images that appear to need transparency.");
    } else if (options.imageOutputMode === "jpeg") {
      notes.push("All image outputs will be recompressed as JPEG for smaller uploads.");
    } else {
      notes.push("All image outputs will be kept as PNG, which can stay larger but avoids JPEG artifacts.");
    }
  }

  if (options.grayscale) {
    notes.push("Grayscale conversion usually helps scanned pages and photos shrink further.");
  }

  notes.push(`Current downscale is ${formatPercent(options.scale)} with quality at ${formatPercent(options.quality)}.`);
  return notes.join(" ");
}

function estimateProjectionRange(projectedBytes, options, selectedFiles) {
  let variance = 0.14;

  if (selectedFiles.some((entry) => entry.kind === "pdf")) {
    variance += 0.1;
  }

  if (selectedFiles.some((entry) => entry.kind === "image") && options.imageOutputMode === "auto") {
    variance += 0.06;
  }

  if (options.pdfRasterFormat === "png") {
    variance += 0.04;
  }

  if (options.scale <= 0.45) {
    variance += 0.04;
  }

  variance = Math.min(0.34, variance);

  return {
    minimum: Math.max(Math.round(projectedBytes * (1 - variance)), 1),
    maximum: Math.max(Math.round(projectedBytes * (1 + variance)), 1)
  };
}

function estimateShrinkOutputSizeHeuristic(fileEntry, options) {
  const scaleFactor = options.scale ** 2;
  const qualityFactor = 0.45 + options.quality * 0.75;
  const grayscaleFactor = options.grayscale ? 0.82 : 1;

  if (fileEntry.kind === "pdf") {
    const rasterFactor = options.pdfRasterFormat === "png" ? 1.15 : 0.72;
    const pageFactor = fileEntry.pageCount ? Math.min(1.2, 0.9 + fileEntry.pageCount * 0.015) : 1;
    const estimated = fileEntry.file.size * scaleFactor * qualityFactor * grayscaleFactor * rasterFactor * pageFactor;
    return Math.max(Math.round(estimated), Math.round(fileEntry.file.size * 0.08));
  }

  if (fileEntry.kind === "image") {
    const outputMode = options.imageOutputMode === "auto"
      ? (fileEntry.hasTransparency ? "png" : "jpeg")
      : options.imageOutputMode;
    const formatFactor = outputMode === "png" ? 1.1 : 0.62;
    const alphaPenalty = outputMode === "png" && fileEntry.hasTransparency ? 1.12 : 1;
    const estimated = fileEntry.file.size * scaleFactor * qualityFactor * grayscaleFactor * formatFactor * alphaPenalty;
    return Math.max(Math.round(estimated), Math.round(fileEntry.file.size * 0.05));
  }

  return fileEntry.file.size;
}

function summarizeEstimateMethods(estimates) {
  const imageExactCount = estimates.filter((estimate) => estimate.method === "image-exact").length;
  const pdfSampledCount = estimates.filter((estimate) => estimate.method === "pdf-sampled").length;
  const heuristicCount = estimates.filter((estimate) => estimate.method === "heuristic").length;
  const notes = [];

  if (imageExactCount) {
    notes.push(`exact recompression for ${imageExactCount} image(s)`);
  }

  if (pdfSampledCount) {
    notes.push(`representative page sampling for ${pdfSampledCount} PDF(s)`);
  }

  if (heuristicCount) {
    notes.push(`fallback heuristic for ${heuristicCount} file(s)`);
  }

  return notes.length ? notes.join(", ") : "heuristic estimate";
}

function getRepresentativePdfPages(pageCount) {
  if (pageCount <= 3) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  return [...new Set([1, Math.ceil(pageCount / 2), pageCount])];
}

function estimatePdfContainerOverhead(pageCount) {
  return 1400 + pageCount * 220;
}

async function renderPdfPageBlob(sourcePage, options) {
  const viewport = sourcePage.getViewport({ scale: options.scale });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: false });
  const width = Math.max(1, Math.floor(viewport.width));
  const height = Math.max(1, Math.floor(viewport.height));
  const rasterMimeType = options.pdfRasterFormat === "png" ? "image/png" : "image/jpeg";

  canvas.width = width;
  canvas.height = height;
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);

  await sourcePage.render({
    canvasContext: context,
    viewport
  }).promise;

  if (options.grayscale) {
    grayscaleCanvas(context, width, height);
  }

  const blob = await canvasToBlob(canvas, rasterMimeType, options.quality);

  return {
    blob,
    width,
    height
  };
}

async function estimatePdfShrinkOutput(fileEntry, options) {
  const fallbackBytes = estimateShrinkOutputSizeHeuristic(fileEntry, options);
  let loadingTask;

  try {
    const pdfBytes = await fileEntry.file.arrayBuffer();
    loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(pdfBytes) });
    const pdfDocument = await loadingTask.promise;
    const pageCount = pdfDocument.numPages;
    const samplePages = new Set(getRepresentativePdfPages(pageCount));
    const sampleRates = [];
    let totalPixelArea = 0;

    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      const sourcePage = await pdfDocument.getPage(pageNumber);
      const viewport = sourcePage.getViewport({ scale: options.scale });
      const width = Math.max(1, Math.floor(viewport.width));
      const height = Math.max(1, Math.floor(viewport.height));
      const pixelArea = width * height;

      totalPixelArea += pixelArea;

      if (samplePages.has(pageNumber)) {
        const renderedPage = await renderPdfPageBlob(sourcePage, options);
        sampleRates.push(renderedPage.blob.size / Math.max(renderedPage.width * renderedPage.height, 1));
      }
    }

    if (!sampleRates.length || totalPixelArea <= 0) {
      throw new Error("Could not sample PDF pages.");
    }

    const averageRate = sampleRates.reduce((sum, rate) => sum + rate, 0) / sampleRates.length;
    const minimumRate = Math.min(...sampleRates);
    const maximumRate = Math.max(...sampleRates);
    const containerOverhead = estimatePdfContainerOverhead(pageCount);
    const estimatedBytes = Math.max(Math.round(averageRate * totalPixelArea + containerOverhead), 1);
    const minimumBytes = Math.max(Math.round(minimumRate * totalPixelArea + containerOverhead), 1);
    const maximumBytes = Math.max(Math.round(maximumRate * totalPixelArea + containerOverhead), minimumBytes);

    return {
      bytes: estimatedBytes,
      minimumBytes,
      maximumBytes,
      method: "pdf-sampled"
    };
  } catch {
    const fallbackRange = estimateProjectionRange(fallbackBytes, options, [fileEntry]);

    return {
      bytes: fallbackBytes,
      minimumBytes: fallbackRange.minimum,
      maximumBytes: fallbackRange.maximum,
      method: "heuristic"
    };
  } finally {
    if (loadingTask) {
      loadingTask.destroy();
    }
  }
}

async function estimateImageShrinkOutput(fileEntry, options) {
  try {
    const output = await shrinkImageFile(fileEntry.file, options);

    return {
      bytes: output.blob.size,
      minimumBytes: output.blob.size,
      maximumBytes: output.blob.size,
      method: "image-exact"
    };
  } catch {
    const fallbackBytes = estimateShrinkOutputSizeHeuristic(fileEntry, options);
    const fallbackRange = estimateProjectionRange(fallbackBytes, options, [fileEntry]);

    return {
      bytes: fallbackBytes,
      minimumBytes: fallbackRange.minimum,
      maximumBytes: fallbackRange.maximum,
      method: "heuristic"
    };
  }
}

async function estimateShrinkOutput(fileEntry, options) {
  if (fileEntry.kind === "pdf") {
    return estimatePdfShrinkOutput(fileEntry, options);
  }

  if (fileEntry.kind === "image") {
    return estimateImageShrinkOutput(fileEntry, options);
  }

  return {
    bytes: fileEntry.file.size,
    minimumBytes: fileEntry.file.size,
    maximumBytes: fileEntry.file.size,
    method: "heuristic"
  };
}

async function collectShrinkEstimates(fileEntries, options) {
  const estimates = [];

  for (const entry of fileEntries) {
    estimates.push(await estimateShrinkOutput(entry, options));
  }

  return estimates;
}

function renderSelectedFilesList() {
  elements.shrinkFilesList.innerHTML = "";

  if (!shrinkerSelectedFiles.length) {
    elements.shrinkFilesSummary.textContent = "No files selected yet.";
    return;
  }

  const totalSize = shrinkerSelectedFiles.reduce((sum, entry) => sum + entry.file.size, 0);
  elements.shrinkFilesSummary.textContent = `${shrinkerSelectedFiles.length} file(s) selected, ${formatBytes(totalSize)} total.`;

  shrinkerSelectedFiles.forEach((entry) => {
    const item = document.createElement("article");
    item.className = "result-item";

    const header = document.createElement("div");
    header.className = "result-header";

    const title = document.createElement("h3");
    title.className = "result-title";
    title.textContent = entry.file.name;

    const badge = document.createElement("span");
    badge.className = "metric-value";
    badge.textContent = entry.kind.toUpperCase();

    header.append(title, badge);
    item.append(header);

    const subtitle = document.createElement("p");
    subtitle.className = "result-subtitle";

    if (entry.kind === "pdf") {
      subtitle.textContent = `${formatBytes(entry.file.size)}${entry.pageCount ? `, ${entry.pageCount} page(s)` : ""}`;
    } else if (entry.kind === "image") {
      subtitle.textContent = `${formatBytes(entry.file.size)}${entry.width && entry.height ? `, ${entry.width}x${entry.height}px` : ""}`;
    } else {
      subtitle.textContent = `${formatBytes(entry.file.size)}, unsupported type`;
    }

    item.append(subtitle);
    elements.shrinkFilesList.append(item);
  });
}

async function updateShrinkProjection() {
  if (!shrinkerSelectedFiles.length) {
    resetShrinkerProjection();
    return;
  }

  const options = getShrinkerOptions();
  const supportedFiles = shrinkerSelectedFiles.filter((entry) => entry.kind === "pdf" || entry.kind === "image");

  if (!supportedFiles.length) {
    elements.shrinkerProjection.textContent = "Selected files are not supported. Upload PDFs, PNGs, or JPGs.";
    return;
  }

  const requestId = ++shrinkProjectionRequestId;
  const originalBytes = supportedFiles.reduce((sum, entry) => sum + entry.file.size, 0);
  elements.shrinkerProjection.textContent = "Estimating output from representative samples...";

  const estimates = await collectShrinkEstimates(supportedFiles, options);

  if (requestId !== shrinkProjectionRequestId || shrinkerBatchOverLimit) {
    return;
  }

  const projectedBytes = estimates.reduce((sum, estimate) => sum + estimate.bytes, 0);
  const percentDelta = originalBytes > 0 ? Math.round(((projectedBytes - originalBytes) / originalBytes) * 100) : 0;
  const sizeDirection = projectedBytes <= originalBytes
    ? `${Math.abs(percentDelta)}% smaller`
    : `${Math.abs(percentDelta)}% larger`;
  const projectionRange = {
    minimum: estimates.reduce((sum, estimate) => sum + estimate.minimumBytes, 0),
    maximum: estimates.reduce((sum, estimate) => sum + estimate.maximumBytes, 0)
  };
  const behavior = describeProjectionBehavior(options, supportedFiles);
  const estimateMethodSummary = summarizeEstimateMethods(estimates);
  const pdfCount = supportedFiles.filter((entry) => entry.kind === "pdf").length;
  const imageCount = supportedFiles.filter((entry) => entry.kind === "image").length;
  const unsupportedCount = shrinkerSelectedFiles.length - supportedFiles.length;
  const averageOutput = Math.max(Math.round(projectedBytes / supportedFiles.length), 1);

  elements.shrinkerProjection.innerHTML = [
    `<p><strong>Projected output:</strong> about ${formatBytes(projectedBytes)} total from ${formatBytes(originalBytes)} (${sizeDirection}).</p>`,
    `<p><strong>Likely range:</strong> roughly ${formatBytes(projectionRange.minimum)} to ${formatBytes(projectionRange.maximum)}, averaging about ${formatBytes(averageOutput)} per supported file.</p>`,
    `<p><strong>Batch mix:</strong> ${pdfCount} PDF(s), ${imageCount} image(s)${unsupportedCount ? `, ${unsupportedCount} unsupported file(s) ignored` : ""}.</p>`,
    `<p><strong>Estimate basis:</strong> ${estimateMethodSummary}.</p>`,
    `<p><strong>What to expect:</strong> ${behavior}</p>`
  ].join("");
}

function scheduleShrinkProjectionUpdate() {
  clearTimeout(shrinkProjectionTimer);

  if (!shrinkerSelectedFiles.length || shrinkerBatchOverLimit) {
    return;
  }

  shrinkProjectionTimer = setTimeout(() => {
    updateShrinkProjection().catch(() => {
      elements.shrinkerProjection.textContent = "Projection unavailable for the current selection.";
    });
  }, 220);
}

async function inspectSelectedFiles(fileList) {
  const files = Array.from(fileList || []);
  const inspected = await Promise.all(files.map(async (file) => {
    if (isPdfFile(file)) {
      try {
        const pdfBytes = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(pdfBytes) });
        const pdfDocument = await loadingTask.promise;
        return {
          file,
          kind: "pdf",
          pageCount: pdfDocument.numPages
        };
      } catch {
        return {
          file,
          kind: "pdf",
          pageCount: null
        };
      }
    }

    if (isImageFile(file)) {
      try {
        const image = await loadImageFromBlob(file);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", { alpha: true });
        canvas.width = Math.min(image.naturalWidth, 64);
        canvas.height = Math.min(image.naturalHeight, 64);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        return {
          file,
          kind: "image",
          width: image.naturalWidth,
          height: image.naturalHeight,
          hasTransparency: canvasHasTransparency(context, canvas.width, canvas.height)
        };
      } catch {
        return {
          file,
          kind: "image",
          width: null,
          height: null,
          hasTransparency: false
        };
      }
    }

    return {
      file,
      kind: "unsupported"
    };
  }));

  shrinkerSelectedFiles = inspected;
  renderSelectedFilesList();
  scheduleShrinkProjectionUpdate();
}

function updateShrinkerSummary(results) {
  if (!results.length) {
    resetShrinkerSummary();
    return;
  }

  const successResults = results.filter((result) => !result.error);
  const originalBytes = successResults.reduce((total, result) => total + result.originalSize, 0);
  const outputBytes = successResults.reduce((total, result) => total + result.outputSize, 0);
  const savedBytes = Math.max(0, originalBytes - outputBytes);
  const reduction = originalBytes > 0 ? Math.round((savedBytes / originalBytes) * 100) : 0;

  elements.shrinkerSummary.textContent = `${successResults.length} file(s) ready. ${formatBytes(originalBytes)} -> ${formatBytes(outputBytes)} (${reduction}% smaller).`;
}

function renderShrinkResult(result) {
  const card = document.createElement("article");
  card.className = "result-item";

  const header = document.createElement("div");
  header.className = "result-header";

  const title = document.createElement("h3");
  title.className = "result-title";
  title.textContent = result.name;

  const badge = document.createElement("span");
  badge.className = "metric-value";
  badge.textContent = result.error ? "Failed" : result.kind.toUpperCase();

  header.append(title, badge);
  card.append(header);

  const metrics = document.createElement("p");
  metrics.className = "result-metrics";

  if (result.error) {
    metrics.textContent = result.error;
    card.append(metrics);
    elements.shrinkerResults.append(card);
    return;
  }

  const reduction = result.originalSize > 0
    ? Math.round(((result.originalSize - result.outputSize) / result.originalSize) * 100)
    : 0;
  metrics.textContent = `${formatBytes(result.originalSize)} -> ${formatBytes(result.outputSize)} (${reduction}% smaller)`;
  card.append(metrics);

  const actions = document.createElement("div");
  actions.className = "result-actions";

  const downloadLink = document.createElement("a");
  downloadLink.href = result.url;
  downloadLink.download = result.outputName;
  downloadLink.className = "secondary-button button-link";
  downloadLink.textContent = "Download";
  actions.append(downloadLink);

  card.append(actions);
  elements.shrinkerResults.append(card);
}

function fileBaseName(filename) {
  return filename.replace(/\.[^./\\]+$/, "");
}

function grayscaleCanvas(context, width, height) {
  const imageData = context.getImageData(0, 0, width, height);
  const { data } = imageData;

  for (let index = 0; index < data.length; index += 4) {
    const grayscaleValue = Math.round(data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114);
    data[index] = grayscaleValue;
    data[index + 1] = grayscaleValue;
    data[index + 2] = grayscaleValue;
  }

  context.putImageData(imageData, 0, 0);
}

function canvasHasTransparency(context, width, height) {
  const { data } = context.getImageData(0, 0, width, height);

  for (let index = 3; index < data.length; index += 4) {
    if (data[index] !== 255) {
      return true;
    }
  }

  return false;
}

function canvasToBlob(canvas, mimeType, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }

      reject(new Error("Canvas export failed."));
    }, mimeType, quality);
  });
}

function loadImageFromBlob(fileBlob) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(fileBlob);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not decode image."));
    };

    image.src = objectUrl;
  });
}

function getShrinkerOptions() {
  return {
    scale: Number(elements.shrinkScale.value) / 100,
    quality: Number(elements.shrinkQuality.value) / 100,
    pdfRasterFormat: elements.pdfRasterFormat.value,
    imageOutputMode: elements.imageOutputMode.value,
    grayscale: elements.convertGrayscale.checked
  };
}

async function shrinkImageFile(file, options) {
  const image = await loadImageFromBlob(file);
  const width = Math.max(1, Math.round(image.naturalWidth * options.scale));
  const height = Math.max(1, Math.round(image.naturalHeight * options.scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: true });

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  if (options.grayscale) {
    grayscaleCanvas(context, width, height);
  }

  let mimeType = "image/jpeg";

  if (options.imageOutputMode === "png") {
    mimeType = "image/png";
  } else if (options.imageOutputMode === "auto") {
    mimeType = canvasHasTransparency(context, width, height) ? "image/png" : "image/jpeg";
  }

  const blob = await canvasToBlob(canvas, mimeType, options.quality);
  const extension = mimeType === "image/png" ? "png" : "jpg";

  return {
    kind: "image",
    outputName: `${fileBaseName(file.name)}-shrunk.${extension}`,
    blob
  };
}

async function shrinkPdfFile(file, options, progressCallback) {
  const pdfBytes = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(pdfBytes) });
  const pdfDocument = await loadingTask.promise;
  const outputDocument = await PDFDocument.create();
  const rasterMimeType = options.pdfRasterFormat === "png" ? "image/png" : "image/jpeg";

  for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
    progressCallback(pageNumber, pdfDocument.numPages);
    const sourcePage = await pdfDocument.getPage(pageNumber);
    const viewport = sourcePage.getViewport({ scale: options.scale });
    const renderedPage = await renderPdfPageBlob(sourcePage, options);
    const pageBlob = renderedPage.blob;
    const pageBytes = await pageBlob.arrayBuffer();
    const embeddedImage = rasterMimeType === "image/png"
      ? await outputDocument.embedPng(pageBytes)
      : await outputDocument.embedJpg(pageBytes);
    const outputPage = outputDocument.addPage([viewport.width, viewport.height]);

    outputPage.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: viewport.width,
      height: viewport.height
    });
  }

  const outputBytes = await outputDocument.save();

  return {
    kind: "pdf",
    outputName: `${fileBaseName(file.name)}-shrunk.pdf`,
    blob: new Blob([outputBytes], { type: "application/pdf" })
  };
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
  let resolvedDotType = elements.dotType.value;
  let resolvedCornerSquareType = cornerSquareType;
  let resolvedCornerDotType = cornerDotType;

  switch (elements.optionalStyle.value) {
    case "star":
    case "plus":
    case "diamond":
    case "randomDot":
      resolvedDotType = elements.optionalStyle.value;
      break;
    case "cornerHeart":
      resolvedCornerDotType = "heart";
      break;
    case "cornerOutpoint":
      resolvedCornerDotType = "outpoint";
      break;
    case "cornerInpoint":
      resolvedCornerDotType = "inpoint";
      break;
    case "squareOutpoint":
      resolvedCornerSquareType = "outpoint";
      break;
    case "squareInpoint":
      resolvedCornerSquareType = "inpoint";
      break;
    default:
      break;
  }

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
      type: resolvedDotType,
      color: elements.dotColor.value
    },
    cornersSquareOptions: {
      type: resolvedCornerSquareType,
      color: elements.cornerColor.value
    },
    cornersDotOptions: {
      type: resolvedCornerDotType,
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
  applyPreviewBackground();

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
  elements.optionalStyle.value = preset.optionalStyle || "none";
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
  const optionalStylePool = OPTIONAL_STYLE_OPTIONS.filter((option) => option.value !== "none").map((option) => option.value);

  elements.shape.value = randomPick(["square", "circle"]);
  elements.dotType.value = randomPick(STANDARD_DOT_TYPES);
  elements.cornerSquareType.value = randomPick(STANDARD_CORNER_SQUARE_TYPES);
  elements.cornerDotType.value = randomPick(STANDARD_CORNER_DOT_TYPES);
  elements.optionalStyle.value = Math.random() > 0.8 ? randomPick(optionalStylePool) : "none";
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
  elements.textDecorationFont.value = randomPick(TEXT_FONT_OPTIONS);
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
  elements.optionalStyle.value = "none";
  elements.imageMode.value = "center";
  elements.imageSize.value = "0.28";
  elements.imageMargin.value = "2";
  elements.previewBackgroundColor.value = "#f4f7fb";
  elements.noBackground.checked = false;
  elements.enableOutline.checked = false;
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
  elements.imageUrlInput.value = "";
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
      optionalStyle: elements.optionalStyle.value,
      cornerSharpness: Number(elements.cornerSharpness.value),
      dotColor: elements.dotColor.value,
      cornerColor: elements.cornerColor.value,
      backgroundColor: elements.backgroundColor.value,
      noBackground: elements.noBackground.checked,
      previewBackgroundColor: elements.previewBackgroundColor.value,
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
  const rawDotType = typeof rawSettings.dotType === "string" ? rawSettings.dotType : "rounded";
  const rawCornerSquareType = typeof rawSettings.cornerSquareType === "string" ? rawSettings.cornerSquareType : "auto";
  const rawCornerDotType = typeof rawSettings.cornerDotType === "string" ? rawSettings.cornerDotType : "auto";
  const settings = {
    qrData: typeof rawSettings.qrData === "string" ? rawSettings.qrData : "https://example.com/workshop",
    qrSize: clampNumber(rawSettings.qrSize, 180, 620, 360),
    qrMargin: clampNumber(rawSettings.qrMargin, 0, 40, 12),
    errorCorrection: pickAllowed(rawSettings.errorCorrection, ERROR_CORRECTION_LEVELS, "Q"),
    artisticPreset: pickAllowed(rawSettings.artisticPreset, Object.keys(PRESETS), "clean"),
    shape: pickAllowed(rawSettings.shape, ["square", "circle"], "square"),
    dotType: pickAllowed(rawDotType, STANDARD_DOT_TYPES, "rounded"),
    cornerSquareType: pickAllowed(rawCornerSquareType, STANDARD_CORNER_SQUARE_TYPES, "auto"),
    cornerDotType: pickAllowed(rawCornerDotType, STANDARD_CORNER_DOT_TYPES, "auto"),
    optionalStyle: pickAllowed(rawSettings.optionalStyle, OPTIONAL_STYLE_VALUES, "none"),
    cornerSharpness: clampNumber(rawSettings.cornerSharpness, 0, 100, 70),
    dotColor: typeof rawSettings.dotColor === "string" ? rawSettings.dotColor : "#173f5f",
    cornerColor: typeof rawSettings.cornerColor === "string" ? rawSettings.cornerColor : "#20639b",
    backgroundColor: typeof rawSettings.backgroundColor === "string" ? rawSettings.backgroundColor : "#f7fbff",
    noBackground: Boolean(rawSettings.noBackground),
    previewBackgroundColor:
      typeof rawSettings.previewBackgroundColor === "string" ? rawSettings.previewBackgroundColor : "#f4f7fb",
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

  if (settings.optionalStyle === "none") {
    if (["star", "plus", "diamond", "randomDot"].includes(rawDotType)) {
      settings.optionalStyle = rawDotType;
    } else if (rawCornerDotType === "heart") {
      settings.optionalStyle = "cornerHeart";
    } else if (rawCornerDotType === "outpoint") {
      settings.optionalStyle = "cornerOutpoint";
    } else if (rawCornerDotType === "inpoint") {
      settings.optionalStyle = "cornerInpoint";
    } else if (rawCornerSquareType === "outpoint") {
      settings.optionalStyle = "squareOutpoint";
    } else if (rawCornerSquareType === "inpoint") {
      settings.optionalStyle = "squareInpoint";
    }
  }

  elements.qrData.value = settings.qrData;
  elements.qrSize.value = String(settings.qrSize);
  elements.qrMargin.value = String(settings.qrMargin);
  elements.errorCorrection.value = settings.errorCorrection;
  elements.artisticPreset.value = settings.artisticPreset;
  elements.shape.value = settings.shape;
  elements.dotType.value = settings.dotType;
  elements.cornerSquareType.value = settings.cornerSquareType;
  elements.cornerDotType.value = settings.cornerDotType;
  elements.optionalStyle.value = settings.optionalStyle;
  elements.cornerSharpness.value = String(settings.cornerSharpness);
  elements.dotColor.value = settings.dotColor;
  elements.cornerColor.value = settings.cornerColor;
  elements.backgroundColor.value = settings.backgroundColor;
  elements.noBackground.checked = settings.noBackground;
  elements.previewBackgroundColor.value = settings.previewBackgroundColor;
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
    elements.imageUrlInput.value = "";
  } else if (/^https?:\/\//i.test(settings.imageDataUrl)) {
    elements.logoUpload.value = "";
    elements.imageUrlInput.value = settings.imageDataUrl;
  } else {
    elements.imageUrlInput.value = "";
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
    elements.imageUrlInput.value = "";
    renderQrCode();
    setStatus(`Loaded image: ${file.name}`);
  };

  reader.onerror = () => {
    setStatus("Could not read the selected image.", true);
  };

  reader.readAsDataURL(file);
}

function handleImageUrlLoad() {
  const rawValue = elements.imageUrlInput.value.trim();
  if (!rawValue) {
    setStatus("Enter an image URL first.", true);
    return;
  }

  try {
    const parsedUrl = new URL(rawValue);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("URL must start with http:// or https://");
    }

    uploadedImageData = parsedUrl.toString();
    elements.logoUpload.value = "";
    renderQrCode();
    setStatus("Loaded image from URL.");
  } catch (error) {
    setStatus(`Invalid image URL: ${error.message}`, true);
  }
}

async function handleShrinkFilesSubmit(event) {
  event.preventDefault();

  const files = Array.from(elements.shrinkFiles.files || []);
  if (!files.length) {
    setShrinkerStatus("Select at least one PDF, PNG, or JPG file.", true);
    return;
  }

  const batchSizeLimit = getActiveBatchSizeLimit();
  const totalBytes = getBatchTotalBytes(files);

  if ((batchSizeLimit && totalBytes > batchSizeLimit) || shrinkerBatchOverLimit) {
    shrinkerBatchOverLimit = true;
    elements.processShrinkFiles.disabled = true;
    setShrinkerStatus(
      `This hosted build only accepts batches up to ${formatBytes(batchSizeLimit)}. Current selection: ${formatBytes(totalBytes)}.`,
      true
    );
    return;
  }

  clearShrinkResultsList();
  setShrinkerStatus(`Preparing ${files.length} file(s)...`);
  elements.processShrinkFiles.disabled = true;
  elements.clearShrinkResults.disabled = true;

  const options = getShrinkerOptions();
  const results = [];

  try {
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];

      try {
        if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
          setShrinkerStatus(`Processing ${file.name} (${index + 1}/${files.length})...`);
          const output = await shrinkPdfFile(file, options, (pageNumber, totalPages) => {
            setShrinkerStatus(`Processing ${file.name}: page ${pageNumber} of ${totalPages} (${index + 1}/${files.length})...`);
          });
          const url = URL.createObjectURL(output.blob);

          shrinkerDownloadUrls.push(url);
          results.push({
            ...output,
            name: file.name,
            originalSize: file.size,
            outputSize: output.blob.size,
            url
          });
        } else if (file.type.startsWith("image/")) {
          setShrinkerStatus(`Processing ${file.name} (${index + 1}/${files.length})...`);
          const output = await shrinkImageFile(file, options);
          const url = URL.createObjectURL(output.blob);

          shrinkerDownloadUrls.push(url);
          results.push({
            ...output,
            name: file.name,
            originalSize: file.size,
            outputSize: output.blob.size,
            url
          });
        } else {
          results.push({
            name: file.name,
            kind: "unsupported",
            error: "Unsupported file type. Upload PDFs, PNGs, or JPGs only."
          });
        }
      } catch (error) {
        results.push({
          name: file.name,
          kind: "error",
          error: error instanceof Error ? error.message : "Processing failed."
        });
      }
    }

    results.forEach(renderShrinkResult);
    updateShrinkerSummary(results);
    const failedCount = results.filter((result) => result.error).length;

    setShrinkerStatus(
      failedCount ? `Finished with ${failedCount} failed file(s).` : `Finished processing ${results.length} file(s).`,
      failedCount > 0
    );
  } finally {
    elements.processShrinkFiles.disabled = false;
    elements.clearShrinkResults.disabled = false;
  }
}

async function handleShrinkFilesSelection(event) {
  const files = Array.from(event.target.files || []);

  if (!files.length) {
    clearShrinkerSelectionState();
    setShrinkerStatus("Ready");
    return;
  }

  const totalBytes = getBatchTotalBytes(files);
  const batchSizeLimit = getActiveBatchSizeLimit();

  if (batchSizeLimit && totalBytes > batchSizeLimit) {
    clearShrinkerSelectionState();
    shrinkerBatchOverLimit = true;
    elements.processShrinkFiles.disabled = true;
    elements.shrinkFilesSummary.textContent =
      `Selected batch is ${formatBytes(totalBytes)}. Hosted limit is ${formatBytes(batchSizeLimit)}.`;
    elements.shrinkerProjection.textContent =
      "Choose a smaller batch or split the upload into multiple runs before processing.";
    setShrinkerStatus(
      `Batch too large for hosted mode: ${formatBytes(totalBytes)} selected, limit is ${formatBytes(batchSizeLimit)}.`,
      true
    );
    return;
  }

  setShrinkerStatus(`Inspecting ${files.length} file(s)...`);
  await inspectSelectedFiles(files);
  shrinkerBatchOverLimit = false;
  elements.processShrinkFiles.disabled = false;

  const unsupportedCount = shrinkerSelectedFiles.filter((entry) => entry.kind === "unsupported").length;
  setShrinkerStatus(
    unsupportedCount
      ? `${files.length} file(s) selected. ${unsupportedCount} unsupported file(s) will be skipped.`
      : `${files.length} file(s) selected and ready to process.`
  );
}

function handleClearShrinkResults() {
  clearShrinkResultsList();
  elements.shrinkFiles.value = "";
  clearShrinkerSelectionState();
  setShrinkerStatus("Ready");
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
  fillSelect(elements.dotType, STANDARD_DOT_TYPES);
  fillSelect(elements.cornerSquareType, STANDARD_CORNER_SQUARE_TYPES);
  fillSelect(elements.cornerDotType, STANDARD_CORNER_DOT_TYPES);
  fillSelect(elements.optionalStyle, OPTIONAL_STYLE_OPTIONS);

  elements.controlsForm.addEventListener("input", renderQrCode);
  elements.controlsForm.addEventListener("change", renderQrCode);
  elements.shrinkerForm.addEventListener("input", () => {
    updateMetricReadouts();
    scheduleShrinkProjectionUpdate();
  });
  elements.shrinkerForm.addEventListener("change", () => {
    updateMetricReadouts();
    scheduleShrinkProjectionUpdate();
  });
  elements.qrTabButton.addEventListener("click", () => setActiveTab("qr"));
  elements.shrinkerTabButton.addEventListener("click", () => setActiveTab("shrinker"));

  elements.artisticPreset.addEventListener("change", (event) => {
    applyPreset(event.target.value);
    setStatus(`Applied preset: ${toTitleCase(event.target.value)}`);
  });

  elements.logoUpload.addEventListener("change", handleImageUpload);
  elements.loadImageUrl.addEventListener("click", handleImageUrlLoad);
  elements.imageUrlInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleImageUrlLoad();
    }
  });

  elements.removeImage.addEventListener("click", () => {
    uploadedImageData = null;
    elements.logoUpload.value = "";
    elements.imageUrlInput.value = "";
    renderQrCode();
    setStatus("Removed embedded image.");
  });

  elements.randomizeStyle.addEventListener("click", randomizeAppearance);
  elements.resetDefaults.addEventListener("click", resetDefaults);
  elements.saveProfile.addEventListener("click", saveProfileToFile);
  elements.loadProfile.addEventListener("click", () => elements.profileUpload.click());
  elements.profileUpload.addEventListener("change", handleProfileUpload);
  elements.downloadButton.addEventListener("click", downloadQr);
  elements.shrinkFiles.addEventListener("change", handleShrinkFilesSelection);
  elements.shrinkerForm.addEventListener("submit", handleShrinkFilesSubmit);
  elements.clearShrinkResults.addEventListener("click", handleClearShrinkResults);
}

setupEvents();
setActiveTab("qr");
resetDefaults();
resetShrinkerSummary();
updateShrinkLimitNote();
setShrinkerStatus("Ready");
