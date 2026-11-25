import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, showBack = true }) {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 pb-10 pt-6">
        {showBack && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200"
            aria-label="Voltar"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <section className="flex-1">{children}</section>
      </div>
    </main>
  );
}
