const sessions = new Map();

export function getSession(phoneNumber) {
  return sessions.get(phoneNumber) || {
    phoneNumber,
    state: "MAIN_MENU",
    lastOption: "0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export function saveSession(phoneNumber, session) {
  sessions.set(phoneNumber, {
    ...session,
    phoneNumber,
    updatedAt: new Date().toISOString()
  });
}

export function listSessions() {
  return Array.from(sessions.values());
}
