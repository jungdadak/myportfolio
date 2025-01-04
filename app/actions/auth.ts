'use server';

import { signIn } from '../../auth';

export async function signInAction(provider: string) {
  // GitHub 로그인 처리
  await signIn(provider);
}
