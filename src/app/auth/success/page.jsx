import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AuthSuccess from "@/components/AuthSuccess";

export default async function AuthSuccessPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=social-error");
  }

  return <AuthSuccess />;
}