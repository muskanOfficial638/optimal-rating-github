import { useRouter } from "next/router";

export default function AuthErrorPage() {
  const { query } = useRouter();
  const error = query.error;

  const errorMessages = {
    OAuthCallback: "OAuth failed. Please try again or use a different provider.",
    AccessDenied: "You denied permission. Please allow access.",
    default: "Unknown error occurred.",
  };

  const message = errorMessages[error] || errorMessages.default;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login Error</h1>
      <p>{message}</p>
    </div>
  );
}
