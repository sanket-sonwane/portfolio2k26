import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Naskh_Arabic, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/Cursor";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const devanagari = Tiro_Devanagari_Hindi({
  variable: "--font-devanagari",
  weight: "400",
  subsets: ["devanagari", "latin"],
  display: "swap",
});

const arabic = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  weight: "500",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sanket Sonwane — AI Engineer",
  description: site.description,
  keywords: [
    "AI Engineer",
    "Agentic AI",
    "LLM",
    "RAG",
    "Multi-Agent Systems",
    "LangGraph",
    "LlamaIndex",
    "AI Research",
    "Python",
    "FastAPI",
  ],
  authors: [{ name: site.name }],
  metadataBase: new URL(site.url),
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Sanket Sonwane — AI Engineer",
    description: "AI Engineer building intelligent systems that reason, retrieve & act.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanket Sonwane — AI Engineer",
    description: "AI Engineer building intelligent systems that reason, retrieve & act.",
  },
  robots: { index: true, follow: true },
};

const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

/*
 * Circular theme reveal (View Transitions API).
 * Kept as inline CSS on purpose: the Tailwind/Lightning CSS pipeline does not
 * recognize ::view-transition-* selectors and silently drops these rules.
 */
const themeRevealCss = `::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}
::view-transition-new(root){animation:theme-reveal 600ms ease-out;clip-path:circle(var(--reveal-r,150vmax) at var(--reveal-x,50vw) var(--reveal-y,0px))}
@keyframes theme-reveal{from{clip-path:circle(0px at var(--reveal-x,50vw) var(--reveal-y,0px))}to{clip-path:circle(var(--reveal-r,150vmax) at var(--reveal-x,50vw) var(--reveal-y,0px))}}
@media (prefers-reduced-motion:reduce){::view-transition-old(root),::view-transition-new(root){animation:none}}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <style dangerouslySetInnerHTML={{ __html: themeRevealCss }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&text=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${devanagari.variable} ${arabic.variable} flex min-h-full flex-col antialiased`}
      >
        {children}
        <Cursor />
      </body>
    </html>
  );
}
