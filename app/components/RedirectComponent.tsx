'use client';

import { useEffect, useState } from 'react';

export default function RedirectComponent() {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fadeToBlack, setFadeToBlack] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            if (hostname.includes('github.io')) {
                setShouldRedirect(true);

                const startTime = Date.now();
                const duration = 300;

                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min((elapsed / duration) * 100, 100);

                    setProgress(progress);

                    if (progress < 100) {
                        requestAnimationFrame(animate);
                    } else {
                        setFadeToBlack(true);
                        setTimeout(() => {
                            window.location.replace('https://sooyoung-jungho-wedding.netlify.app' + window.location.pathname);
                        }, 100);
                    }
                };

                requestAnimationFrame(animate);

                // GitHub Pages일 때 메타 태그 업데이트
                const metaTags = {
                    'og:image': 'https://sooyoung-jungho.github.io/gallery/thumbnail.jpg',
                    'twitter:image': 'https://sooyoung-jungho.github.io/gallery/thumbnail.jpg'
                };

                Object.entries(metaTags).forEach(([property, content]) => {
                    let meta = document.querySelector(`meta[property="${property}"]`);
                    if (!meta) {
                        meta = document.createElement('meta');
                        meta.setAttribute('property', property);
                        document.head.appendChild(meta);
                    }
                    meta.setAttribute('content', content);
                });

                // favicon 업데이트
                let favicon = document.querySelector("link[rel='icon']");
                if (!favicon) {
                    favicon = document.createElement('link');
                    favicon.setAttribute('rel', 'icon');
                    document.head.appendChild(favicon);
                }
                favicon.setAttribute('href', '/wedding-cake-thin.svg');
            }
        }
    }, []);

    return shouldRedirect ? (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#1a472a',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div style={{ width: '300px', position: 'relative' }}>
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '2px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '1px'
                    }}
                >
                    <div
                        style={{
                            width: `${progress}%`,
                            height: '100%',
                            backgroundColor: 'white'
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            left: `${progress}%`,
                            top: '-10px',
                            transform: 'translateX(-50%)',
                            color: 'white',
                            fontSize: '14px'
                        }}
                    >
                        ♥
                    </div>
                </div>
            </div>

            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'black',
                    opacity: fadeToBlack ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    zIndex: 10000
                }}
            />
        </div>
    ) : null;
} 