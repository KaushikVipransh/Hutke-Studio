import RegistrationForm from "@/components/RegistrationForm";

const Register = () => {
  return (
    <main className="container mx-auto px-4 pt-24 pb-12 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl tracking-wider text-foreground text-glow sm:text-5xl md:text-6xl">
            Register Your Team
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Fill out the form below to enter the audition phase.
          </p>
        </div>
        <RegistrationForm />
      </div>
    </main>
  );
};

export default Register;