'use client';

import { useEffect, useState } from 'react';

interface GuestbookEntry {
    name: string;
    message: string;
    submittedAt: string;
}

interface GuestbookProps {
    newEntry: GuestbookEntry | null;
}

export default function Guestbook({ newEntry }: GuestbookProps) {
    const [entries, setEntries] = useState<GuestbookEntry[]>([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/sooyoung-jungho/sooyoung-jungho.github.io/contents/rsvp');
                const files = await response.json();

                const entriesPromises = files.map(async (file: { download_url: string }) => {
                    const entryResponse = await fetch(file.download_url);
                    const entry = await entryResponse.json();
                    return {
                        name: entry.name,
                        message: entry.message,
                        submittedAt: entry.submittedAt
                    };
                });

                const entriesData = await Promise.all(entriesPromises);
                const filteredEntries = entriesData.filter(entry => entry.message?.trim());
                const sortedEntries = filteredEntries.sort((a, b) =>
                    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
                );
                setEntries(sortedEntries);
            } catch (error) {
                console.error('Failed to fetch guestbook entries:', error);
            }
        };

        fetchEntries();
    }, []);

    useEffect(() => {
        if (newEntry) {
            setEntries(prev => [newEntry, ...prev]);
        }
    }, [newEntry]);

    return (
        <div className="w-full max-w-sm mx-auto korean-text relative px-4">
            <div className="text-center mb-8">
                <div
                    className="inline-block border border-green-800 px-8 py-2 text-green-800 italic"
                    style={{ borderRadius: '50%', fontFamily: 'MadeKenfolg' }}
                >
                    guestbook
                </div>
            </div>

            <div className="text-gray-600 mb-8 italic text-balance space-y-4 text-center">
                <p>&ldquo;소중한 축하의 마음을</p>
                <p>남겨주셔서 감사합니다.&rdquo;</p>
            </div>

            <div className="space-y-6">
                {entries.map((entry, index) => (
                    <div
                        key={index}
                        className="bg-white/80 text-sm rounded-lg p-6 shadow-sm border border-green-800/10"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-green-800">{entry.name}</span>
                            <span className="text-xs text-gray-500">
                                {new Date(entry.submittedAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-600 whitespace-pre-wrap">{entry.message}</p>
                    </div>
                ))}
            </div>

            {entries.length === 0 && (
                <div className="text-center text-gray-500">
                    아직 작성된 방명록이 없습니다.
                </div>
            )}
        </div>
    );
} 