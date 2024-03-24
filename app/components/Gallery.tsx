'use client';

// AVIF 이미지 import
import image6Avif from '@/assets/gallery/c.avif';
import image4Avif from '@/assets/gallery/c_2.avif';
import image2Avif from '@/assets/gallery/c_3.avif';
import image8Avif from '@/assets/gallery/c_black.avif';
import image3Avif from '@/assets/gallery/c_white.avif';
import image11Avif from '@/assets/gallery/couple_2.avif';
import image12Avif from '@/assets/gallery/couple_3.avif';
import image1Avif from '@/assets/gallery/m_black.avif';
import image9Avif from '@/assets/gallery/m_gray.avif';
import image7Avif from '@/assets/gallery/m_navy.avif';
import image10Avif from '@/assets/gallery/w_r.avif';
import image5Avif from '@/assets/gallery/w_r2.avif';

// WebP 이미지 import (fallback용)
import image6Webp from '@/assets/gallery/c.webp';
import image4Webp from '@/assets/gallery/c_2.webp';
import image2Webp from '@/assets/gallery/c_3.webp';
import image8Webp from '@/assets/gallery/c_black.webp';
import image3Webp from '@/assets/gallery/c_white.webp';
import image11Webp from '@/assets/gallery/couple_2.webp';
import image12Webp from '@/assets/gallery/couple_3.webp';
import image1Webp from '@/assets/gallery/m_black.webp';
import image9Webp from '@/assets/gallery/m_gray.webp';
import image7Webp from '@/assets/gallery/m_navy.webp';
import image10Webp from '@/assets/gallery/w_r.webp';
import image5Webp from '@/assets/gallery/w_r2.webp';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

export interface GalleryProps {
    selectedImage: number | null;
    setSelectedImage: React.Dispatch<React.SetStateAction<number | null>>;
}

// 투명한 1x1 픽셀 이미지
const transparentBlurDataURL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default function Gallery({ selectedImage, setSelectedImage }: GalleryProps) {
    const images = useMemo(() => [
        {
            src: image1Avif,
            fallback: image1Webp,
            alt: "Gallery Image 1"
        },
        {
            src: image2Avif,
            fallback: image2Webp,
            alt: "Gallery Image 2"
        },
        {
            src: image3Avif,
            fallback: image3Webp,
            alt: "Gallery Image 3"
        },
        {
            src: image4Avif,
            fallback: image4Webp,
            alt: "Gallery Image 4"
        },
        {
            src: image5Avif,
            fallback: image5Webp,
            alt: "Gallery Image 5"
        },
        {
            src: image6Avif,
            fallback: image6Webp,
            alt: "Gallery Image 6"
        },
        {
            src: image7Avif,
            fallback: image7Webp,
            alt: "Gallery Image 7"
        },
        {
            src: image8Avif,
            fallback: image8Webp,
            alt: "Gallery Image 8"
        },
        {
            src: image9Avif,
            fallback: image9Webp,
            alt: "Gallery Image 9"
        },
        {
            src: image10Avif,
            fallback: image10Webp,
            alt: "Gallery Image 10"
        },
        {
            src: image11Avif,
            fallback: image11Webp,
            alt: "Gallery Image 11"
        },
        {
            src: image12Avif,
            fallback: image12Webp,
            alt: "Gallery Image 12"
        },
    ], []);

    const [isImageLoading, setIsImageLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isGalleryVisible, setIsGalleryVisible] = useState(false);

    // isMounted 상태 설정
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    // 갤러리 페이드인 효과
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsGalleryVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // 최소 스와이프 거리
    const minSwipeDistance = 50;

    // 이전/다음 이미지로 이동하는 함수들
    const handlePrevImage = useCallback(() => {
        setSelectedImage((prev: number | null) => {
            if (prev === null) return null;
            return (prev - 1 + images.length) % images.length;
        });
    }, [images.length]);
    const handleNextImage = useCallback(() => {
        setSelectedImage((prev: number | null) => {
            if (prev === null) return 0;
            return (prev + 1) % images.length;
        });
    }, [images.length]);

    const handleImageClick = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // 클릭 시 즉시 이미지 프리로드 시작
        const img = new window.Image();
        img.src = images[index].src.src;
        img.onload = () => {
            setIsImageLoading(false);
            setLoadedImages(prev => new Set(Array.from(prev).concat(index.toString())));
        };

        setSelectedImage(index);
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${window.scrollY}px`;
    };

    const handleClose = useCallback((e?: React.MouseEvent | React.KeyboardEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        setSelectedImage(null);

        // 스크롤 위치 저장
        const scrollY = document.body.style.top;

        // 스크롤 관련 스타일 초기화
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('width');
        document.body.style.removeProperty('top');

        // requestAnimationFrame을 사용하여 스크롤 위치 복원
        if (scrollY) {
            window.requestAnimationFrame(() => {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            });
        }
    }, []);

    // 모달 배경 클릭 핸들러 수정
    const handleModalBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
        }
    }, [handleClose]);

    // 이미지 프리로딩 로직을 원래대로 복구
    useEffect(() => {
        if (selectedImage !== null) {
            const img = new window.Image();
            img.src = images[selectedImage].src.src;
            img.onload = () => {
                setIsImageLoading(false);
                setLoadedImages(prev => new Set(Array.from(prev).concat(selectedImage.toString())));
            };
        }
    }, [selectedImage, images]);

    // 썸네일용 이미지 로더
    const imageLoader = ({ src, width, quality }: { src: string, width: number, quality: number }) => {
        // 썸네일은 더 낮은 품질로 설정
        return `${src}?w=${width}&q=${quality || 60}&format=webp`
    }

    // 모달용 고품질 이미지 로더 추가
    const modalImageLoader = ({ src, width, quality }: { src: string, width: number, quality: number }) => {
        return `${src}?w=${width}&q=${quality || 85}&format=webp`
    }

    return (
        <>
            <div className={`w-full relative transition-opacity duration-1000 ${isGalleryVisible ? 'opacity-100' : 'opacity-0'
                }`} role="region" aria-label="Gallery">
                {/* Gallery 타이틀 */}
                <div className="text-center mb-8">
                    <div
                        className="inline-block border border-green-800 px-8 py-2 text-green-800"
                        style={{ borderRadius: '50%', fontFamily: 'MadeKenfolg' }}
                    >
                        gallery
                    </div>
                </div>

                {/* 이미지 그리드 - 각 이미지에도 페이드인 효과 추가 */}
                <div className="grid grid-cols-3 gap-2">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative aspect-square cursor-pointer"
                            onClick={(e) => handleImageClick(index, e)}
                        >
                            <picture>
                                <source srcSet={image.src.src} type="image/avif" />
                                <Image
                                    loader={({ src: imageSrc, width, quality = 20 }) => imageLoader({ src: imageSrc, width, quality })}
                                    src={image.fallback}
                                    alt={image.alt}
                                    fill
                                    sizes="(max-width: 768px) 33vw, 200px"
                                    className="object-cover rounded-lg hover:opacity-90 transition-all duration-300"
                                    quality={20}
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL={transparentBlurDataURL}
                                />
                            </picture>
                        </div>
                    ))}
                </div>
            </div>

            {/* 모달 부분 수정 - z-index 값을 더 높게 설정 */}
            {selectedImage !== null && isMounted && createPortal(
                <div
                    className="fixed inset-0 bg-black/90 z-[100] p-4 flex items-center justify-center transition-opacity duration-300"
                    onClick={handleModalBackdropClick}
                    style={{
                        overscrollBehavior: 'contain',
                        overflow: 'hidden'
                    }}
                >
                    <div
                        className="relative max-w-4xl w-full p-4"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* 닫기 버튼 */}
                        <button
                            onClick={handleClose}
                            className="absolute top-0 right-4 -translate-y-10 w-8 h-8 flex items-center justify-center text-white/75 hover:text-white transition-colors z-50"
                            aria-label="Close modal"
                        >
                            ×
                        </button>

                        {/* 이전/다음 버튼 수정 */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handlePrevImage();
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/75 hover:text-white transition-colors bg-black/20 rounded-full z-50 cursor-pointer"
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleNextImage();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/75 hover:text-white transition-colors bg-black/20 rounded-full z-50 cursor-pointer"
                            aria-label="Next image"
                        >
                            ›
                        </button>

                        {/* 이미지 컨테이너 */}
                        <div
                            className="relative w-full aspect-[4/3] flex items-center justify-center"
                            style={{
                                touchAction: 'manipulation pinch-zoom',
                                overscrollBehavior: 'contain'
                            }}
                        >
                            {/* 이미지 */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                {isImageLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    </div>
                                )}
                                <picture>
                                    <source srcSet={images[selectedImage].src.src} type="image/avif" />
                                    <Image
                                        loader={({ src: imageSrc, width, quality = 55 }) => modalImageLoader({ src: imageSrc, width, quality })}
                                        src={images[selectedImage].fallback}
                                        alt={images[selectedImage].alt}
                                        fill
                                        className={`object-contain transition-opacity duration-500 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                                        onLoad={() => setIsImageLoading(false)}
                                        quality={55}
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 1024px"
                                        style={{
                                            touchAction: 'pan-x pan-y pinch-zoom',
                                            userSelect: 'none',
                                            WebkitUserSelect: 'none'
                                        }}
                                    />
                                </picture>
                            </div>
                        </div>

                        {/* 이미지 카운터를 이미지 컨테이너 바로 아래에 배치 */}
                        <div className="self-center text-center mt-2 text-white/75 text-sm px-3 py-1.5 rounded-full">
                            {selectedImage + 1} / {images.length}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
} 