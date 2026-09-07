'use client';
import { XMTPProvider as BaseXMTPProvider } from '@xmtp/react-sdk';

export function XMTPProvider({ children }) {
  return (
    <BaseXMTPProvider persistenceType="indexedDB">
      {children}
    </BaseXMTPProvider>
  );
}
