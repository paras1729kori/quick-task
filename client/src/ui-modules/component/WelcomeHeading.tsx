import { useAuth } from "../../contexts/AuthProvider";

export default function WelcomeHeading() {
  const { user } = useAuth();

  return (
    <section className="text-center">
      <h1 className="text-2xl md:text-4xl font-semibold">
        Welcome, {user?.name || "Guest"}
      </h1>
      {/* <p className="text-slate-600">Quote of the day generator</p> */}
    </section>
  );
}
