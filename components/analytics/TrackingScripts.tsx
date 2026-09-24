import Script from "next/script";

const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA = process.env.NEXT_PUBLIC_GA_ID;

/** Meta Pixel and GA4 — only rendered when their IDs are set. */
export function TrackingScripts() {
  return (
    <>
      {GA ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA)}`}
            strategy="lazyOnload"
          />
          <Script id="ga4" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(GA)});`}
          </Script>
        </>
      ) : null}
      {PIXEL ? (
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(PIXEL)});fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
