'use client';

import { signInAction } from '../actions/auth';

export default function SignIn() {
  return (
    <form action={() => signInAction('github')}>
      <button type="submit">Signin with GitHub</button>
    </form>
  );
}
