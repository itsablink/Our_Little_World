import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, GATE_COOKIE, expectedSessionValue, expectedGateValue } from "@/lib/session";

export default function RootPage() {
  const jar = cookies();
  const hasSession = jar.get(SESSION_COOKIE)?.value === expectedSessionValue();
  const hasGate = jar.get(GATE_COOKIE)?.value === expectedGateValue();

  if (hasSession && hasGate) redirect("/home");
  if (hasSession) redirect("/challenge");
  redirect("/login");
}
