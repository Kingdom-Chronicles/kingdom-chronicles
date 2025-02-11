import { Amplify } from '@aws-amplify/core';
import { AuthConfig } from '@aws-amplify/auth';
import { StorageConfig } from '@aws-amplify/storage';
import { APIConfig } from '@aws-amplify/api';

export const configureAWS = () => {
  const config = {
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_USER_POOL_ID,
        userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
        signUpVerificationMethod: 'code',
      }
    } satisfies AuthConfig,
    API: {
      GraphQL: {
        endpoint: import.meta.env.VITE_API_ENDPOINT,
        region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
        defaultAuthMode: 'apiKey',
      }
    } satisfies APIConfig,
    Storage: {
      S3: {
        bucket: import.meta.env.VITE_S3_BUCKET || 'kingdom-chronicles-assets',
        region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
      }
    } satisfies StorageConfig
  };

  Amplify.configure(config);
};