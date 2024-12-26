import dynamic from "next/dynamic";

const LoginComponent = dynamic(
  () => import("@/components/Login/LoginComponent"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Page = (): JSX.Element => {
  return (
    <main className="bg-no-repeat bg-center bg-cover flex  h-screen w-screen flex-col items-center justify-center">
      <LoginComponent />
    </main>
  );
};
export default Page;
