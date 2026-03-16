export default function Logo({ size = 100 }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 100 m -60 0 a 60 60 0 1 1 120 0 a 45 45 0 1 0 -90 0"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M100 100 m -28 28 a 30 30 0 1 1 42 0"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * FILE ROLE:
 * Simple NOMAD logo mark component.
 *
 * CONNECTS TO:
 * - styles.css (global styling)
 *
 * USED BY:
 * - pages/LandingPage.jsx
 * - pages/LoginPage.jsx
 * - pages/SignupPage.jsx
 * - components/Header.jsx
 */

