import FormLogin from "@/features/login/components/FormLogin";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left */}
        <div className="lg:block bg-gray-100">
          <img
            src="/assets/images/Left.png"
            alt="visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right */}
        <div className="p-8 md:p-12">
          <h1 className="text-3xl text-slate-800 font-semibold mb-2">
            Sign In
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Don't have an account?{" "}
            <a href="/register" className="text-emerald-500">
              Sign Up
            </a>
          </p>

          {/* Form component */}
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
