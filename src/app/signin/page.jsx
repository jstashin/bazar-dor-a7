import SignInForm from "@/components/SignInForm";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;

  return <SignInForm reason={params.reason} />;
}