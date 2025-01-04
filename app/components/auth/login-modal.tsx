// components/auth/login-modal.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Github } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';

type BaseProvider = {
  name: string;
  bgColor: string;
  hoverColor: string;
  textColor?: string;
  borderColor?: string;
};

type ProviderWithIcon = BaseProvider & {
  icon: LucideIcon;
};

type ProviderWithoutIcon = BaseProvider & {
  icon?: never;
};

type Provider = ProviderWithIcon | ProviderWithoutIcon;

type Providers = {
  [key: string]: Provider;
};

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
} as const;

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/',
      });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="w-full space-y-8">
          <div className="text-center">
            <Image
              src="/images/projects/portfolio.png"
              alt="Portfolio Logo"
              width={300}
              height={300}
              className="mx-auto rounded-3xl mb-4"
              priority
            />
            <p className="mt-2 text-sm text-gray-600">
              서비스를 이용하시려면 로그인해주세요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  이메일
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="이메일"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="비밀번호"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">또는</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {Object.entries(providers).map(([id, provider]) => (
              <button
                key={id}
                className={`
                  flex items-center justify-center px-4 py-2 rounded-lg
                  ${provider.bgColor}
                  ${provider.textColor || 'text-white'}
                  ${
                    provider.borderColor ? 'border ' + provider.borderColor : ''
                  }
                  ${provider.hoverColor}
                  transition-colors
                `}
                onClick={() => signIn(id, { callbackUrl: '/' })}
              >
                {provider.icon && <provider.icon className="w-5 h-5 mr-2" />}
                {provider.name}로 계속하기
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
