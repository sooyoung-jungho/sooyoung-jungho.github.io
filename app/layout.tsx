import type { Metadata } from "next";
import RedirectComponent from './components/RedirectComponent';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://sooyoung-jungho-wedding.netlify.app'),
  title: "정호 수영 결혼식에 초대합니다!",
  description: "2025.02.16 일요일 오후 2시 노블발렌티 대치",
  icons: {
    icon: '/wedding-cake-thin.svg',
  },
  openGraph: {
    title: "🩷 Wedding Invitation 🩷",
    description: "2025.02.16 정호 수영 결혼식에 초대합니다.",
    images: [
      {
        url: "/gallery/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Wedding Invitation",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🩷 Wedding Invitation 🩷",
    description: "2025.02.16 정호 수영 결혼식에 초대합니다.",
    images: ["/gallery/thumbnail.png"],
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
      </head>
      <body>
        <RedirectComponent />
        {children}
      </body>
    </html>
  )
}
