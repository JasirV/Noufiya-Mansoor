import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noufiya & Mansoor | Wedding Invitation",
  description:
    "Join us as Noufiya & Mansoor joyfully celebrate their wedding on 15 November 2026. We would be honoured to have you celebrate with us.",
  openGraph: {
    title: "Noufiya & Mansoor | Wedding Invitation",
    description:
      "Two hearts, one beautiful journey. Celebrate Noufiya & Mansoor's wedding on 15 November 2026.",
    type: "website",
    locale: "en_IN",
    url: "https://noufiya-mansoor.com",
    siteName: "Noufiya & Mansoor Wedding",
    images: [
      {
        url: "/images/IMG_2602.JPG.jpeg",
        width: 1920,
        height: 1280,
        alt: "Noufiya & Mansoor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noufiya & Mansoor | Wedding Invitation",
    description:
      "Two hearts, one beautiful journey. Celebrate Noufiya & Mansoor's wedding on 15 November 2026.",
    images: ["/images/IMG_2602.JPG.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{
          fontFamily: "var(--font-sans)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
