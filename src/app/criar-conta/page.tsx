"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CriarContaPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── força da senha ─────────────────────────────────────────
  function getStrength(pwd: string): {
    level: 0 | 1 | 2 | 3 | 4;
    label: string;
    color: string;
  } {
    if (!pwd) return { level: 0, label: "", color: "#e5e5e7" };

    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[a-zA-Z]/.test(pwd) && /\d/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd) || pwd.length >= 12) score++;

    if (score <= 1) return { level: 1, label: "Fraca", color: "#ef4444" };
    if (score === 2) return { level: 2, label: "Razoável", color: "#f97316" };
    if (score === 3) return { level: 3, label: "Boa", color: "#eab308" };
    return { level: 4, label: "Forte", color: "#22c55e" };
  }

  const strength = getStrength(password);

  // ── submissão ──────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

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
          name,
          email,
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

      // Sucesso — vai pra tela de verificação
      router.push(`/verificar?email=${encodeURIComponent(email)}`);
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
          "linear-gradient(180deg, #fafafa 0%, #ffffff 50%, #f4f0ff 100%)"
      }}
    >
      <div style={{ width: "100%", maxWidth: "440px" }}>
        {/* logo */}
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

        {/* card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e5e7",
            borderRadius: "16px",
            padding: "32px 24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#18181b",
              margin: "0 0 8px 0",
              letterSpacing: "-0.02em"
            }}
          >
            Criar sua conta
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#71717a",
              margin: "0 0 24px 0"
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

          {/* formulário */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Field label="Nome completo">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="João Silva"
                required
                style={inputStyle}
              />
            </Field>

            <Field label="E-mail">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                required
                autoComplete="email"
                style={inputStyle}
              />
            </Field>

            <Field label="Telefone">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                required
                autoComplete="tel"
                style={inputStyle}
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
                  style={{ ...inputStyle, paddingRight: "44px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "6px",
                    fontSize: "16px",
                    color: "#71717a"
                  }}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>

              {/* barra de força */}
              {password && (
                <div style={{ marginTop: "8px" }}>
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
                          transition: "background 0.2s ease"
                        }}
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      color: strength.color,
                      fontWeight: 500
                    }}
                  >
                    Senha {strength.label}
                  </span>
                </div>
              )}
            </Field>

            <Field label="Confirmar senha">
              <input
                type={showPassword ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repita a senha"
                required
                autoComplete="new-password"
                style={{
                  ...inputStyle,
                  borderColor:
                    confirm && confirm !== password ? "#ef4444" : "#e5e5e7"
                }}
              />
              {confirm && confirm !== password && (
                <span
                  style={{
                    fontSize: "12px",
                    color: "#ef4444",
                    marginTop: "4px",
                    display: "block"
                  }}
                >
                  As senhas não coincidem
                </span>
              )}
            </Field>

            {error && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#b91c1c",
                  fontSize: "13px",
                  padding: "10px 12px",
                  borderRadius: "8px"
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "#a78bfa" : "#7c3aed",
                color: "#ffffff",
                border: "none",
                padding: "14px 24px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: "8px",
                transition: "background 0.2s ease"
              }}
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <p
            style={{
              fontSize: "13px",
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

// ─────────────────────────────────────────────────────────────
// componentes auxiliares
// ─────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #e5e5e7",
  borderRadius: "10px",
  fontSize: "15px",
  color: "#18181b",
  background: "#ffffff",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit"
};

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          fontSize: "13px",
          fontWeight: 500,
          color: "#3f3f46",
          marginBottom: "6px"
        }}
      >
        {label}
      </span>
      {children}
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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        background: "#ffffff",
        border: "1px solid #e5e5e7",
        borderRadius: "10px",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: 500,
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
