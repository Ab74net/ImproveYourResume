function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatTimestamp(isoString) {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function getDeltaText(currentScore, previousScore) {
  if (typeof previousScore !== "number") {
    return "";
  }

  const delta = currentScore - previousScore;

  if (delta === 0) {
    return "No score change";
  }

  return delta > 0 ? `+${delta} vs. previous run` : `${delta} vs. previous run`;
}

export function renderHistoryList(container, history, activeId, onSelect) {
  if (!history.length) {
    container.innerHTML = `<p class="placeholder-text">Run an analysis to start building a quick session history.</p>`;
    return;
  }

  container.innerHTML = history
    .map((record, index) => {
      const previous = history[index + 1];
      const deltaText = getDeltaText(record.response.score, previous?.response?.score);
      const deltaClass = deltaText.startsWith("+")
        ? "history-card__delta history-card__delta--up"
        : deltaText === "No score change"
          ? "history-card__delta"
          : "history-card__delta history-card__delta--down";

      return `
        <button
          type="button"
          class="history-card ${record.id === activeId ? "history-card--active" : ""}"
          data-analysis-id="${record.id}"
        >
          <div class="history-card__top">
            <strong>${escapeHtml(record.request.targetRoleLabel)}</strong>
            <span class="history-card__score">${escapeHtml(record.response.score)}/100</span>
          </div>
          <p class="history-card__meta">${escapeHtml(record.request.targetCompanyLabel)} | ${escapeHtml(formatTimestamp(record.createdAt))}</p>
          ${deltaText ? `<p class="${deltaClass}">${escapeHtml(deltaText)}</p>` : ""}
        </button>
      `;
    })
    .join("");

  container.querySelectorAll("[data-analysis-id]").forEach((button) => {
    button.addEventListener("click", () => {
      onSelect(button.dataset.analysisId);
    });
  });
}
