import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import HeaderProvider from "@/providers/HeaderProvider";
import AuthProvider from "@/providers/AuthProvider";
import { ToastContainer } from "react-toastify";

const urbanist = Urbanist({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nutritionistku.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Nutritionist - Personalized Nutrition Coaching",
    template: "%s | Nutritionist",
  },
  description: "Transform your health with personalized nutrition coaching.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "nutritionist",
    "personalized diet plan",
    "nutrition coaching",
    "meal planning",
    "weight loss",
    "healthy eating",
    "certified nutritionist",
    "diet consultation",
    "wellness",
  ],
  authors: [{ name: "Nutritionist Team", url: `${siteUrl}/team` }],
  creator: "Nutritionist",
  openGraph: {
    title: "Nutritionist - Personalized Nutrition Coaching",
    description: "Transform your health with expert nutrition coaching.",
    url: siteUrl,
    siteName: "Nutritionist",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nutritionist - Professional Nutrition Services",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutritionist - Personalized Nutrition Coaching",
    description: "Transform your health with expert nutrition coaching.",
    images: ["/og-image.png"],
    creator: "@nutritionist",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#CBEA7B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://backendlessappcontent.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://randomuser.me"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${urbanist.variable} antialiased`}>
        <AuthProvider>
          <HeaderProvider>{children}</HeaderProvider>
        </AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </body>
    </html>
  );
}
