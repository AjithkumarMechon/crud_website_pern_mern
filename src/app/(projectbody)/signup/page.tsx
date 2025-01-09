import dynamic from "next/dynamic";

const SignupComponent = dynamic(
  () => import("@/components/Signup/SignupComponent"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Page = (): JSX.Element => {
  return (
    <main className="bg-no-repeat bg-center bg-cover flex  h-screen w-screen flex-col items-center justify-center">
      <SignupComponent />
    </main>
  );
};
export default Page;
