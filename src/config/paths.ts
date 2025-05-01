const authPaths = {
  callback: {
    getHref: (baseURL?: string | null | undefined) => `${baseURL || ""}/api/auth/callback`,
  },
  privacy: {
    getHref: () => "/privacy",
  },
  resetPassword: {
    getHref: () => "/reset-password",
  },
  signIn: {
    getHref: (redirectTo?: string | null | undefined) =>
      `/sign-in${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
  },
  signOut: {
    getHref: () => "/sign-out",
  },
  signUp: {
    getHref: (redirectTo?: string | null | undefined) =>
      `/sign-up${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
  },
  terms: {
    getHref: () => "/terms",
  },
  verify: {
    getHref: (email?: string | null | undefined) =>
      `/verify${email ? `?email=${encodeURIComponent(email)}` : ""}`,
  },
} as const;

export const paths = {
  auth: authPaths,
} as const;
