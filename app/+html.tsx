import { ScrollViewStyleReset } from 'expo-router/html';

// Restore the path that 404.html encoded before redirecting here.
const restorePathScript = `
  (function() {
    var p = new URLSearchParams(window.location.search).get('p');
    if (p) {
      var base = '/goodestgoodnews';
      var restored = base + decodeURIComponent(p);
      window.history.replaceState(null, '', restored);
    }
  })();
`;

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="GGN" />
        <link rel="manifest" href="/goodestgoodnews/manifest.json" />
        {/* Restore encoded path redirected from 404.html */}
        <script dangerouslySetInnerHTML={{ __html: restorePathScript }} />
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
