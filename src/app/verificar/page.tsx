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

  // foca o primeiro campo ao entrar
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // cooldown de reenvio
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

    // se preencheu tudo, envia automático
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
      setTimeout(() => router.push("/entrar"), 1500);
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
            "linear-gradient(180deg, #fafafa 0%, #ffffff 50%, #f4f0ff 100%)"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "999px",
              background: "#dcfce7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px auto",
              fontSize: "32px"
            }}
          >
            ✅
          </div>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#18181b",
              margin: "0 0 8px 0"
            }}
          >
            Conta confirmada!
          </h1>
          <p style={{ fontSize: "14px", color: "#71717a", margin: 0 }}>
            Redirecionando para o login...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        background:
          "linear-gradient(180deg, #fafafa 0%, #ffffff 50%, #f4f0ff 100%)"
      }}
    >
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            justifyContent: "center",
            textDecoration: "none",
            marginBottom: "32px"
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "#7c3aed"
            }}
          />
          <span
            style={{ fontSize: "18px", fontWeight: 600, color: "#18181b" }}
          >
            Minha Loja
          </span>
        </Link>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e5e7",
            borderRadius: "16px",
            padding: "32px 24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#ede9fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              fontSize: "24px"
            }}
          >
            📧
          </div>

          <h1
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#18181b",
              margin: "0 0 8px 0",
              letterSpacing: "-0.02em"
            }}
          >
            Verifique seu e-mail
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#71717a",
              margin: "0 0 28px 0",
              lineHeight: 1.5
            }}
          >
            Enviamos um código de 6 dígitos para{" "}
            <strong style={{ color: "#18181b" }}>{email || "seu e-mail"}</strong>
          </p>

          {/* caixas de dígitos */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              marginBottom: "20px"
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
                  height: "56px",
                  textAlign: "center",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#18181b",
                  background: "#ffffff",
                  border: digit ? "2px solid #7c3aed" : "1px solid #e5e5e7",
                  borderRadius: "10px",
                  outline: "none",
                  fontFamily: "monospace",
                  boxSizing: "border-box",
                  transition: "border 0.15s ease"
                }}
              />
            ))}
          </div>

          {error && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#b91c1c",
                fontSize: "13px",
                padding: "10px 12px",
                borderRadius: "8px",
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
            style={{
              width: "100%",
              background:
                loading || digits.some((d) => !d) ? "#a78bfa" : "#7c3aed",
              color: "#ffffff",
              border: "none",
              padding: "14px 24px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: 600,
              cursor:
                loading || digits.some((d) => !d) ? "not-allowed" : "pointer",
              transition: "background 0.2s ease"
            }}
          >
            {loading ? "Verificando..." : "Confirmar"}
          </button>

          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "13px",
              color: "#71717a"
            }}
          >
            Não recebeu?{" "}
            {resendCooldown > 0 ? (
              <span style={{ color: "#a1a1aa" }}>
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
                  fontSize: "13px",
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
