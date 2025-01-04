'use client';

import { signIn, signOut } from 'next-auth/react';
import * as Icons from 'lucide-react';
const { Github } = Icons; // 이렇게 하면 TypeScript 경고가 사라집니다

interface Provider {
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  bgColor: string;
  textColor?: string;
  borderColor?: string;
  hoverColor: string;
}

type Providers = {
  [key: string]: Provider;
};

const providers: Providers = {
  github: {
    name: 'GitHub',
    icon: Github,
    bgColor: 'bg-gray-900',
    hoverColor: 'hover:bg-gray-700',
  },
  google: {
    name: 'Google',
    bgColor: 'bg-white',
    textColor: 'text-gray-900',
    borderColor: 'border-gray-300',
    hoverColor: 'hover:bg-gray-50',
  },
  kakao: {
    name: '카카오',
    bgColor: 'bg-[#FEE500]',
    textColor: 'text-gray-900',
    hoverColor: 'hover:bg-[#FDD835]',
  },
  naver: {
    name: '네이버',
    bgColor: 'bg-[#03C75A]',
    hoverColor: 'hover:bg-[#02B350]',
  },
};

export function SignIn() {
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(providers).map(([id, provider]) => (
        <button
          key={id}
          className={`
            flex items-center justify-center px-4 py-2 rounded-lg
            ${provider.bgColor}
            ${provider.textColor || 'text-white'}
            ${provider.borderColor ? 'border' : ''}
            ${provider.hoverColor}
            transition-colors
          `}
          onClick={() => signIn(id, { callbackUrl: '/' })}
        >
          {provider.icon && <provider.icon className="w-5 h-5 mr-2" />}
          {provider.name}로 로그인
        </button>
      ))}
    </div>
  );
}

export function SignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
    >
      로그아웃
    </button>
  );
}
