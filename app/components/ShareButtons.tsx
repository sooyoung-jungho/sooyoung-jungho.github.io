'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

declare global {
    interface Window {
        Kakao: any;
    }
}

export default function ShareButtons() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.Kakao) {
                if (!window.Kakao.isInitialized()) {
                    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
                }
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const sendKakaoLink = () => {
        if (window.Kakao) {
            window.Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: '수영 ♥ 정호의 결혼식에 초대합니다',
                    description: '2025년 2월 16일 일요일 오후 2시\n노블발렌티 대치',
                    imageUrl: 'https://sooyoung-jungho-wedding.netlify.app/gallery/thumbnail.webp',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
                buttons: [
                    {
                        title: '청첩장 보기',
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href,
                        },
                    },
                ],
            });
        }
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText('https://sooyoung-jungho.github.io/');
            toast.success('링크가 복사되었습니다.', {
                duration: 2000,
                style: {
                    borderRadius: '6px',
                    background: '#ffffff',
                    color: '#666666',
                    fontSize: '0.7rem',
                    padding: '0.25rem 0.55rem',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                },
                icon: undefined,
            });
        } catch (err) {
            toast.error('링크 복사에 실패했습니다.', {
                duration: 2000,
                style: {
                    borderRadius: '6px',
                    background: '#ffffff',
                    color: '#666666',
                    fontSize: '0.7rem',
                    padding: '0.25rem 0.55rem',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                },
                icon: undefined,
            });
        }
    };

    return (
        <div className="flex flex-col w-full max-w-md mx-auto">
            <div className="flex justify-center gap-4">
                <button
                    onClick={sendKakaoLink}
                    className="flex items-center justify-center gap-1 py-1.5 px-2.5 transition-colors korean-text text-[11px]"
                >
                    <Image
                        src="/kakaotalk.svg"
                        alt="카카오톡"
                        width={14}
                        height={14}
                        className="text-gray-600"
                        style={{ filter: 'invert(42%) sepia(9%) saturate(12%) hue-rotate(316deg) brightness(95%) contrast(87%)' }}
                    />
                    <span className="text-gray-600">카카오톡 공유하기</span>
                </button>

                <button
                    onClick={copyLink}
                    className="flex items-center justify-center gap-1 py-1.5 px-2.5 transition-colors korean-text text-[11px]"
                >
                    <svg
                        className="w-3.5 h-3.5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                    </svg>
                    <span className="text-gray-600">링크 주소 복사하기</span>
                </button>
            </div>

            <div className="text-center mt-8 mb-16 text-gray-400 text-xs space-y-1">
                <p>Made with ♥️ by Sooyoung</p>
            </div>
        </div>
    );
} 