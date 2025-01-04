'use client';

import { signIn } from 'next-auth/react';

export default function LoginBtn() {
  return (
    <button
      onClick={() => {
        signIn;
      }}
      className="shimmer-text text-sm text-yellow-300 font-thin"
    >
      Login
    </button>
  );
}
