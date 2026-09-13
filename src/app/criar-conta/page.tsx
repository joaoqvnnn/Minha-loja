"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EMAIL_DOMAINS = [
  "gmail.com",
  "icloud.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "live.com"
];

export default function CriarContaPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── força da senha ─────────────────────────────────────────
  const strength = useMemo(() => {
    if (!password) return { level: 0, label: "", color: "#e5e5e7" };

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[a-zA-Z]/.test(password) && /\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password) || password.length >= 12) score++;

    if (score <= 1) return { level: 1, label: "Fraca", color: "#ef4444" };
    if (score === 2) return { level: 2, label: "Razoável", color: "#f97316" };
    if (score === 3) return { level: 3, label: "Boa", color: "#eab308" };
    return { level: 4, label: "Forte", color: "#22c55e" };
  }, [password]);

  // ── nome válido? (2+ palavras) ────────────────────────────
  const nameValid =
    name.trim().split(/\s+/).length >= 2 && /^[a-zA-ZÀ-ÿ\s'-]+$/.test(name);

  // ── sugestões de domínio ──────────────────────────────────
  const emailSuggestions = useMemo(() => {
    if (!email) return [];
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return [];

    const local = email.slice(0, atIndex);
    const typedDomain = email.slice(atIndex + 1).toLowerCase();
    if (!local) return [];

    // se já tem domínio completo (com ponto), não sugere
    if (typedDomain.includes(".") && typedDomain.length > 3) return [];

    return EMAIL_DOMAINS.filter((d) => d.startsWith(typedDomain)).slice(0, 4);
  }, [email]);

  // ── máscara de telefone ───────────────────────────────────
  function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (digits.length === 0) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function handlePhoneChange(value: string) {
    setPhone(formatPhone(value));
  }

  // ── submissão ─────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!nameValid) {
      setError("Digite nome e sobrenome");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.replace(/\D/g, ""),
          password,
          confirmPassword: confirm
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar conta");
        return;
      }

      router.push(`/verificar?email=${encodeURIComponent(email.trim().toLowerCase())}`);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
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

        {/* card */}
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
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#18181b",
              margin: "0 0 8px 0",
              letterSpacing: "-0.025em"
            }}
          >
            Criar sua conta
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#71717a",
              margin: "0 0 28px 0"
            }}
          >
            Leva menos de 1 minuto.
          </p>

          {/* botões sociais */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <SocialButton
              icon={<GoogleIcon />}
              label="Continuar com Google"
              onClick={() => alert("Login com Google será configurado em breve.")}
            />
            <SocialButton
              icon={<AppleIcon />}
              label="Continuar com Apple"
              onClick={() => alert("Login com Apple será configurado em breve.")}
            />
          </div>

          {/* divisor */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "24px 0"
            }}
          >
            <div style={{ flex: 1, height: 1, background: "#e5e5e7" }} />
            <span style={{ fontSize: "12px", color: "#a1a1aa" }}>ou</span>
            <div style={{ flex: 1, height: 1, background: "#e5e5e7" }} />
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            <Field
              label="Nome completo"
              hint={name && !nameValid ? "Digite nome e sobrenome" : undefined}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="João Silva"
                required
                autoComplete="name"
                className="input-base"
                style={{
                  borderColor:
                    name && !nameValid ? "#ef4444" : undefined
                }}
              />
            </Field>

            <Field label="E-mail">
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setTimeout(() => setEmailFocused(false), 150)}
                  placeholder="voce@email.com"
                  required
                  autoComplete="email"
                  className="input-base"
                />

                {/* sugestões de domínio */}
                {emailFocused && emailSuggestions.length > 0 && (
                  <div
                    className="animate-fade-in"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      right: 0,
                      background: "#ffffff",
                      border: "1px solid #e5e5e7",
                      borderRadius: "12px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                      padding: "6px",
                      zIndex: 10,
                      overflow: "hidden"
                    }}
                  >
                    {emailSuggestions.map((domain) => {
                      const local = email.split("@")[0];
                      const fullEmail = `${local}@${domain}`;
                      return (
                        <button
                          key={domain}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setEmail(fullEmail);
                            setEmailFocused(false);
                          }}
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            background: "transparent",
                            border: "none",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            color: "#18181b",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "background 0.15s ease"
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#f4f4f5")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          {fullEmail}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </Field>

            <Field label="Telefone">
              <input
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="(11) 99999-9999"
                required
                autoComplete="tel"
                inputMode="numeric"
                className="input-base"
              />
            </Field>

            <Field label="Senha">
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  required
                  autoComplete="new-password"
                  className="input-base"
                  style={{ paddingRight: "46px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    color: "#71717a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {password && (
                <div style={{ marginTop: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      marginBottom: "6px"
                    }}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        style={{
                          flex: 1,
                          height: "4px",
                          borderRadius: "999px",
                          background:
                            n <= strength.level ? strength.color : "#e5e5e7",
                          transition: "background 0.25s ease"
                        }}
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      color: strength.color,
                      fontWeight: 600
                    }}
                  >
                    Senha {strength.label}
                  </span>
                </div>
              )}
            </Field>

            <Field
              label="Confirmar senha"
              hint={
                confirm && confirm !== password
                  ? "As senhas não coincidem"
                  : undefined
              }
            >
              <input
                type={showPassword ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repita a senha"
                required
                autoComplete="new-password"
                className="input-base"
                style={{
                  borderColor:
                    confirm && confirm !== password ? "#ef4444" : undefined
                }}
              />
            </Field>

            {error && (
              <div
                className="animate-fade-in"
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#b91c1c",
                  fontSize: "13.5px",
                  padding: "11px 14px",
                  borderRadius: "10px"
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="hover-lift"
              style={{
                background: loading
                  ? "#a78bfa"
                  : "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
                color: "#ffffff",
                border: "none",
                padding: "15px 24px",
                borderRadius: "12px",
                fontSize: "15.5px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: "4px",
                fontFamily: "inherit",
                boxShadow: loading
                  ? "none"
                  : "0 6px 18px rgba(124,58,237,0.28)"
              }}
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <p
            style={{
              fontSize: "13.5px",
              color: "#71717a",
              textAlign: "center",
              marginTop: "24px",
              marginBottom: 0
            }}
          >
            Já tem conta?{" "}
            <Link
              href="/entrar"
              style={{
                color: "#7c3aed",
                fontWeight: 600,
                textDecoration: "none"
              }}
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENTES AUXILIARES
   ═══════════════════════════════════════════════════════════════ */

function Field({
  label,
  hint,
  children
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          fontSize: "13px",
          fontWeight: 600,
          color: "#3f3f46",
          marginBottom: "6px"
        }}
      >
        {label}
      </span>
      {children}
      {hint && (
        <span
          style={{
            display: "block",
            fontSize: "12px",
            color: "#ef4444",
            marginTop: "5px",
            fontWeight: 500
          }}
        >
          {hint}
        </span>
      )}
    </label>
  );
}

function SocialButton({
  icon,
  label,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover-lift"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        background: "#ffffff",
        border: "1px solid #e5e5e7",
        borderRadius: "11px",
        padding: "13px 16px",
        fontSize: "14px",
        fontWeight: 600,
        color: "#18181b",
        cursor: "pointer",
        fontFamily: "inherit"
      }}
    >
      {icon}
      {label}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ÍCONES SVG
   ═══════════════════════════════════════════════════════════════ */

function EyeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.2 35.3 26.7 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.2C41.9 35.5 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
