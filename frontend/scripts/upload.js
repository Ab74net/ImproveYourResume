const PDF_LIB_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.min.mjs";
const PDF_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.mjs";
const MAX_FILE_BYTES = 4 * 1024 * 1024;

async function getPdfJs() {
  const pdfjsLib = await import(PDF_LIB_URL);
  pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;
  return pdfjsLib;
}

function setUploadStatus(statusEl, message, tone = "neutral") {
  statusEl.textContent = message;
  statusEl.dataset.tone = tone;
}

export async function handlePdfUpload(event, elements) {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  if (file.size > MAX_FILE_BYTES) {
    setUploadStatus(elements.uploadStatus, "PDF is larger than 4 MB. Please upload a smaller file.", "error");
    event.target.value = "";
    return;
  }

  setUploadStatus(elements.uploadStatus, "Reading PDF and extracting text...", "neutral");

  try {
    const pdfjsLib = await getPdfJs();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pages = [];

    for (let index = 1; index <= pdf.numPages; index += 1) {
      const page = await pdf.getPage(index);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => item.str).join(" "));
    }

    elements.resumeText.value = pages.join("\n").trim();
    setUploadStatus(
      elements.uploadStatus,
      `${file.name} loaded successfully (${pdf.numPages} page${pdf.numPages === 1 ? "" : "s"}).`,
      "success"
    );
  } catch (error) {
    setUploadStatus(
      elements.uploadStatus,
      "Could not read this PDF. Try pasting resume text directly.",
      "error"
    );
  } finally {
    event.target.value = "";
  }
}
