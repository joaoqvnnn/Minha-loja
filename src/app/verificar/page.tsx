"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function VerificarContent() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  function handleChange(index: number, value: string) {
    const clean = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);

    if (clean && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (clean && next.every((d) => d)) {
      submit(next.join(""));
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = ["", "", "", "", "", ""];
    text.split("").forEach((c, i) => (next[i] = c));
    setDigits(next);
    if (text.length === 6) submit(text);
  }

  async function submit(code: string) {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Código inválido");
        setDigits(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/entrar"), 1800);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    if (resendCooldown > 0) return;
    setError(null);

    try {
      const res = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Não foi possível reenviar");
        return;
      }
      setResendCooldown(60);
    } catch {
      setError("Erro de conexão.");
    }
  }

  /* ═══ TELA DE SUCESSO ═══════════════════════════════ */
  if (success) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 16px",
          background:
            "radial-gradient(ellipse at top, rgba(34,197,94,0.10) 0%, #fafafa 40%, #ffffff 100%)"
        }}
      >
        <div
          className="animate-scale-in"
          style={{ textAlign: "center", maxWidth: "380px" }}
        >
          <div
            className="animate-fade-in"
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px auto",
              color: "#16a34a",
              boxShadow: "0 8px 24px rgba(34,197,94,0.2)"
            }}
          >
            <CheckIcon />
          </div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#18181b",
              margin: "0 0 10px 0",
              letterSpacing: "-0.02em"
            }}
          >
            Conta confirmada
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "#71717a",
              margin: 0,
              lineHeight: 1.6
            }}
          >
            Redirecionando para o login...
          </p>
        </div>
      </main>
    );
  }

  /* ═══ TELA DE VERIFICAÇÃO ═══════════════════════════ */
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        background:
          "radial-gradient(ellipse at top, rgba(124,58,237,0.08) 0%, #fafafa 40%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* glow decorativo */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none"
        }}
      />

      <div
        className="animate-fade-up"
        style={{ width: "100%", maxWidth: "460px", position: "relative" }}
      >
        {/* logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "center",
            textDecoration: "none",
            marginBottom: "32px"
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
              boxShadow: "0 4px 12px rgba(124,58,237,0.25)"
            }}
          />
          <span
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#18181b",
              letterSpacing: "-0.02em"
            }}
          >
            Fofoca Store
          </span>
        </Link>

        <div
          className="animate-scale-in"
          style={{
            background: "#ffffff",
            border: "1px solid #e5e5e7",
            borderRadius: "20px",
            padding: "36px 28px",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 12px 32px rgba(124,58,237,0.06)"
          }}
        >
          {/* ícone envelope */}
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #ede9fe 0%, #f3e8ff 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "22px",
              color: "#7c3aed"
            }}
          >
            <MailIcon />
          </div>

          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#18181b",
              margin: "0 0 10px 0",
              letterSpacing: "-0.025em"
            }}
          >
            Verifique seu e-mail
          </h1>
          <p
            style={{
              fontSize: "14.5px",
              color: "#71717a",
              margin: "0 0 32px 0",
              lineHeight: 1.55
            }}
          >
            Enviamos um código de 6 dígitos para{" "}
            <strong style={{ color: "#18181b", fontWeight: 600 }}>
              {email || "seu e-mail"}
            </strong>
          </p>

          {/* caixas de dígitos */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              marginBottom: "24px"
            }}
          >
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                disabled={loading}
                style={{
                  width: "48px",
                  height: "58px",
                  textAlign: "center",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#18181b",
                  background: digit ? "#faf5ff" : "#ffffff",
                  border: digit
                    ? "2px solid #7c3aed"
                    : "1.5px solid #e5e5e7",
                  borderRadius: "12px",
                  outline: "none",
                  fontFamily: "ui-monospace, monospace",
                  boxSizing: "border-box",
                  transition: "all 0.15s ease",
                  boxShadow: digit
                    ? "0 0 0 3px rgba(124,58,237,0.10)"
                    : "none"
                }}
              />
            ))}
          </div>

          {error && (
            <div
              className="animate-fade-in"
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#b91c1c",
                fontSize: "13.5px",
                padding: "11px 14px",
                borderRadius: "10px",
                marginBottom: "16px",
                textAlign: "center"
              }}
            >
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={() => submit(digits.join(""))}
            disabled={loading || digits.some((d) => !d)}
            className="hover-lift"
            style={{
              width: "100%",
              background:
                loading || digits.some((d) => !d)
                  ? "#a78bfa"
                  : "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
              color: "#ffffff",
              border: "none",
              padding: "15px 24px",
              borderRadius: "12px",
              fontSize: "15.5px",
              fontWeight: 600,
              cursor:
                loading || digits.some((d) => !d) ? "not-allowed" : "pointer",
              transition: "background 0.2s ease",
              fontFamily: "inherit",
              boxShadow:
                loading || digits.some((d) => !d)
                  ? "none"
                  : "0 6px 18px rgba(124,58,237,0.28)"
            }}
          >
            {loading ? "Verificando..." : "Confirmar"}
          </button>

          <div
            style={{
              marginTop: "22px",
              textAlign: "center",
              fontSize: "13.5px",
              color: "#71717a"
            }}
          >
            Não recebeu?{" "}
            {resendCooldown > 0 ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#a1a1aa",
                  fontWeight: 500
                }}
              >
                Reenviar em {resendCooldown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={resend}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#7c3aed",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "13.5px",
                  fontFamily: "inherit"
                }}
              >
                Reenviar código
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function VerificarPage() {
  return (
    <Suspense fallback={null}>
      <VerificarContent />
    </Suspense>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ÍCONES SVG
   ═══════════════════════════════════════════════════════════════ */

function MailIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
