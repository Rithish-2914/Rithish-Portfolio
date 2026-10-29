import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Bajjuri Rithish: 18-year-old founder, full-stack & AI engineer and world record holder from Hyderabad, studying IT at VIT Vellore.";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Bajjuri Rithish | Founder & Full-Stack AI Engineer",
  description,
  openGraph: {
    title: "Bajjuri Rithish",
    description,
    images: ["/photos/shore.jpg"],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Bajjuri Rithish", description },
};

export const viewport: Viewport = {
  themeColor: "#03060b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="day" className={`${archivo.variable} ${jetbrains.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Apply a saved night theme before first paint, so there's no cream flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="noise">{children}</body>
    </html>
  );
}
