import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=protected");
  }

  return <UpdateProfileForm
  user={{
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  }}
/>
}