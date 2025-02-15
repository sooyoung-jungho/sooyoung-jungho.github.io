'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';

interface RsvpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitSuccess: (entry: { name: string; message: string; submittedAt: string }) => void;
}

export default function RsvpModal({ isOpen, onClose, onSubmitSuccess }: RsvpModalProps) {
    const [activeTab, setActiveTab] = useState('신랑');
    const [attendance, setAttendance] = useState<'참석' | '미정' | '미참'>('참석');
    const [attendeeCount, setAttendeeCount] = useState(1);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (attendance === '참석' && (!attendeeCount || attendeeCount < 1)) {
            alert('참석 인원은 최소 1명 이상이어야 합니다.');
            return;
        }

        try {
            const now = new Date();
            const kstOffset = 9 * 60;
            const utcOffset = now.getTimezoneOffset();
            const totalOffset = kstOffset + utcOffset;
            const kstDate = new Date(now.getTime() + totalOffset * 60 * 1000);
            const submittedAt = kstDate.toISOString();

            const content = {
                name,
                side: activeTab,
                attendance,
                numberOfGuests: attendeeCount,
                message,
                submittedAt
            };

            const response = await fetch('/.netlify/functions/submitRsvp', {
                method: 'POST',
                body: JSON.stringify(content)
            });

            if (!response.ok) {
                throw new Error('제출 중 오류가 발생했습니다');
            }

            onSubmitSuccess({
                name,
                message,
                submittedAt
            });

            onClose();
            alert('참석 여부가 성공적으로 전달되었습니다.');
        } catch (error) {
            console.error('Error:', error);
            alert('제출 중 오류가 발생했습니다.');
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white rounded-lg w-full max-w-md p-6">
                    <Dialog.Title className="text-center mb-6 font-serif italic">
                        R.S.V.P
                    </Dialog.Title>

                    {/* 탭 */}
                    <div className="flex mb-6">
                        <button
                            type="button"
                            className={`flex-1 py-2 text-base korean-text-bold border-b ${activeTab === '신랑' ? 'bg-[#B4A89F] text-white' : ''}`}
                            onClick={() => setActiveTab('신랑')}
                        >
                            신랑측 하객
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2 korean-text-bold border-b ${activeTab === '신부' ? 'bg-[#B4A89F] text-white' : ''}`}
                            onClick={() => setActiveTab('신부')}
                        >
                            신부측 하객
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 korean-text-bold">
                        <div>
                            <label className="block text-sm text-gray-700">성함</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2"
                                required
                                placeholder="성함을 입력해 주세요"
                            />
                        </div>

                        <div>
                            <label className="block text-base text-gray-700">참석 여부</label>
                            <div className="flex flex-col gap-2 mt-1">
                                {[
                                    { value: '참석', label: '참석합니다' },
                                    { value: '미정', label: '미정입니다' },
                                    { value: '미참', label: '참석이 어렵습니다' }
                                ].map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="attendance"
                                            value={option.value}
                                            checked={attendance === option.value}
                                            onChange={() => setAttendance(option.value as typeof attendance)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-5 h-5 border rounded flex items-center justify-center peer-checked:bg-[#B4A89F] peer-checked:border-[#B4A89F]">
                                            <svg
                                                className="w-3 h-3 text-white hidden peer-checked:block"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-sm">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {attendance === '참석' && (
                            <div>
                                <label className="block text-sm text-gray-700">참석 인원</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={attendeeCount}
                                    onChange={(e) => {
                                        const value = e.target.value === '' ? '' : parseInt(e.target.value);
                                        setAttendeeCount(value as number);
                                    }}
                                    onBlur={() => {
                                        if (!attendeeCount || attendeeCount < 1) {
                                            setAttendeeCount(1);
                                        }
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm text-gray-700">축하 메시지</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2"
                                rows={3}
                                placeholder="축하 메시지를 남겨주세요 (선택사항)"
                            />
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                닫기
                            </button>
                            <button
                                type="submit"
                                disabled={!name.trim()}
                                className={`px-4 py-2 text-sm rounded-md ${name.trim()
                                    ? 'bg-[#B4A89F] text-white hover:bg-[#a39689]'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                제출하기
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
} 