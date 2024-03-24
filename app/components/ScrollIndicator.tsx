'use client';

import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
    onOpenRsvp: () => void;
}

export default function ScrollIndicator({ onOpenRsvp }: ScrollIndicatorProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 3초 후에 인디케이터 표시
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div 
            className="fixed bottom-6 right-6 z-50 animate-bounce cursor-pointer sm:bottom-8 sm:right-8"
            onClick={onOpenRsvp}
        >
            <div className="relative w-10 h-10 sm:w-16 sm:h-16">
                {/* 3D 효과를 위한 그림자 레이어 */}
                <div className="absolute inset-0 bg-green-800/20 rounded-full transform translate-y-1 blur-sm"></div>
                
                {/* 메인 원형 배경 */}
                <div className="absolute inset-0 bg-white rounded-full shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform">
                    {/* 스크롤 아이콘 */}
                    <div className="relative w-4 h-5 sm:w-6 sm:h-8 border-2 border-green-800 rounded-full">
                        <div className="absolute top-0.5 sm:top-1 left-1/2 w-0.5 sm:w-1 h-1.5 sm:h-2 bg-green-800 rounded-full transform -translate-x-1/2 animate-scrollDown"></div>
                    </div>
                </div>
            </div>
        </div>
    );
} 