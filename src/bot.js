import { FALLBACK_MESSAGE, MAIN_MENU, REPLIES } from "./content.js";
import { getSession, saveSession } from "./sessionStore.js";

function normalizeInput(text = "") {
  return text.trim().toLowerCase();
}

function isMenuRequest(value) {
  return value === "0" || value === "main menu" || value === "menu" || value === "hi" || value === "hello";
}

export function buildReply(phoneNumber, incomingText) {
  const session = getSession(phoneNumber);
  const normalized = normalizeInput(incomingText);

  if (!normalized || isMenuRequest(normalized)) {
    saveSession(phoneNumber, {
      ...session,
      state: "MAIN_MENU",
      lastOption: "0"
    });
    return MAIN_MENU;
  }

  if (REPLIES[normalized]) {
    saveSession(phoneNumber, {
      ...session,
      state: "DETAIL_VIEW",
      lastOption: normalized
    });
    return REPLIES[normalized];
  }

  return FALLBACK_MESSAGE;
}
