
import { useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

import { auth } from "./firebase";
import {
  registerUser,
  loginUser,
  resetUserPassword
} from "./authService";

function AuthScreen() {
  const [method, setMethod] = useState("email");
  const [isRegistering, setIsRegistering] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (isRegistering) {
        await registerUser(email, password);
        setMessage("Account created! Check your email for verification.");
      } else {
        await loginUser(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async (event) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (!confirmation) {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            { size: "normal" }
          );
        }

        const result = await signInWithPhoneNumber(
          auth,
          phone,
          window.recaptchaVerifier
        );

        setConfirmation(result);
        setMessage("Verification code sent to your phone.");
      } else {
        await confirmation.confirm(verificationCode);
      }
    } catch (err) {
      setError(err.message);

      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Enter your email address first.");
      return;
    }

    try {
      setError("");
      await resetUserPassword(email);
      setMessage("Password reset link sent to your email.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-mark">
            <span /><span /><span />
          </span>
          <div>
            <strong>agrivision</strong>
            <small>LESOTHO</small>
          </div>
        </div>

        <div className="auth-heading">
          <span>WELCOME TO AGRIVISION</span>
          <h1>Grow with confidence.</h1>
          <p>Sign in to access your growing space.</p>
        </div>

        <div className="auth-methods">
          <button
            type="button"
            className={method === "email" ? "auth-method active" : "auth-method"}
            onClick={() => {
              setMethod("email");
              setError("");
              setMessage("");
            }}
          >
            Email
          </button>

          <button
            type="button"
            className={method === "phone" ? "auth-method active" : "auth-method"}
            onClick={() => {
              setMethod("phone");
              setError("");
              setMessage("");
            }}
          >
            Phone
          </button>
        </div>

        {method === "email" ? (
          <form onSubmit={handleEmailSubmit} className="auth-form">
            <h2>{isRegistering ? "Create your account" : "Welcome back"}</h2>

            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              minLength={6}
              required
            />

            {!isRegistering && (
              <button
                type="button"
                className="auth-text-button"
                onClick={handleResetPassword}
              >
                Forgot password?
              </button>
            )}

            <button className="auth-submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : isRegistering
                  ? "Create account"
                  : "Sign in"}
            </button>

            <p className="auth-switch">
              {isRegistering
                ? "Already have an account?"
                : "Don't have an account?"}

              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError("");
                  setMessage("");
                }}
              >
                {isRegistering ? "Sign in" : "Register"}
              </button>
            </p>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePhoneSubmit();
            }}
            className="auth-form"
          >
            <h2>Phone sign in</h2>

            {!confirmation ? (
              <>
                <label>Phone number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+266XXXXXXXX"
                  required
                />

                <div id="recaptcha-container" />

                <button className="auth-submit" disabled={loading}>
                  {loading ? "Sending code..." : "Send verification code"}
                </button>
              </>
            ) : (
              <>
                <label>Verification code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter SMS code"
                  required
                />

                <button className="auth-submit" disabled={loading}>
                  {loading ? "Verifying..." : "Verify and sign in"}
                </button>
              </>
            )}
          </form>
        )}

        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-message">{message}</p>}

        <p className="auth-footer">
          Agrivision Lesotho · Growing a brighter future, together.
        </p>
      </div>
    </div>
  );
}

export default AuthScreen;
