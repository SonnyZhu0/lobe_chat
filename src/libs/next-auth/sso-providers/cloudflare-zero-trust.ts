import type { OIDCConfig } from '@auth/core/providers';

import { authEnv } from '@/config/auth';

import { CommonProviderConfig } from './sso.config';

export type CloudflareZeroTrustProfile = {
  email: string;
  name: string;
  sub: string;
};

const provider = {
  id: 'cloudflare-zero-trust',
  provider: {
    ...CommonProviderConfig,
    authorization: { params: { scope: 'openid email profile' } },
    checks: ['state', 'pkce'],
    // TODO(NextAuth ENVs Migration): Remove once nextauth envs migration time end
    clientId: authEnv.CLOUDFLARE_ZERO_TRUST_CLIENT_ID ?? process.env.AUTH_CLOUDFLARE_ZERO_TRUST_ID,
    clientSecret:
      authEnv.CLOUDFLARE_ZERO_TRUST_CLIENT_SECRET ?? process.env.CLOUDFLARE_ZERO_TRUST_SECRET,
    // Remove end
    id: 'cloudflare-zero-trust',
    issuer: authEnv.CLOUDFLARE_ZERO_TRUST_ISSUER ?? process.env.CLOUDFLARE_ZERO_TRUST_ISSUER,
    name: 'Cloudflare Zero Trust',
    profile(profile) {
      return {
        email: profile.email,
        name: profile.name ?? profile.email,
        providerAccountId: profile.sub,
      };
    },
    type: 'oidc',
  } satisfies OIDCConfig<CloudflareZeroTrustProfile>,
};

export default provider;
