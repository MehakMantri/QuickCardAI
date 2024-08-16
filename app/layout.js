// app/layout.js
import { ClerkProvider } from '@clerk/nextjs';

export default function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
