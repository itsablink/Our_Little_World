// Simple server-side session helpers.
// No database needed — two httpOnly cookies gate access:
//   "olw_session"  -> set after correct ID + password
//   "olw_gate"     -> set after the 3-question memory gate is cleared
//
// Both cookies are compared against SESSION_SECRET from env.

export const SESSION_COOKIE = "olw_session";
export const GATE_COOKIE = "olw_gate";

export function expectedSessionValue() {
  return process.env.SESSION_SECRET || "dev-secret";
}

export function expectedGateValue() {
  return `${process.env.SESSION_SECRET || "dev-secret"}-gate`;
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/"
  // maxAge omitted intentionally so it is a session-only cookie that expires when browser session closes
};
