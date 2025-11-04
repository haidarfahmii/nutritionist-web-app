import FormRegister from "@/features/register/components/FormRegister";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block">
          <img
            src="/assets/images/Left.png"
            alt="auth visual"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 md:p-12">
          <h1 className="text-3xl text-slate-800 font-semibold mb-2">
            Create Account
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Use your email and password to sign up
          </p>

          <FormRegister />
        </div>
      </div>
    </div>
  );
}
