'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AccountInfo() {
    const [showGroomAccount, setShowGroomAccount] = useState(false);
    const [showBrideAccount, setShowBrideAccount] = useState(false);

    const handleCopy = async (accountNumber: string) => {
        try {
            await navigator.clipboard.writeText(accountNumber);
            toast.success('계좌번호가 복사되었습니다');
        } catch (err) {
            console.error('Failed to copy:', err);
            toast.error('계좌번호 복사에 실패했습니다');
        }
    };

    return (
        <div className="w-full max-w-md space-y-6 korean-text-bold">
            <div className="space-y-4">
                {/* 신랑측 계좌 */}
                <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                    <h3 className="text-lg text-gray-800 mb-2">신랑 계좌</h3>
                    <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                        <div>
                            <p className="text-base text-gray-500">신한 (예금주: 현정호)</p>
                            <p className="text-base text-gray-600">110-354-833731</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <button
                                onClick={() => handleCopy('110354833731')}
                                className="w-auto px-4 h-8 text-base text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
                            >
                                복사하기
                            </button>
                        </div>
                    </div>
                </div>

                {/* 신랑 아버지 계좌 */}
                <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                    <h3 className="text-lg text-gray-800 mb-2">신랑 아버지 계좌</h3>
                    <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                        <div>
                            <p className="text-base text-gray-500">하나 (예금주: 현종권)</p>
                            <p className="text-base text-gray-600">800-910041-89907</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <button
                                onClick={() => handleCopy('80091004189907')}
                                className="w-auto px-4 h-8 text-base text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
                            >
                                복사하기
                            </button>
                        </div>
                    </div>
                </div>

                {/* 신랑 어머니 계좌 */}
                <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                    <h3 className="text-lg text-gray-800 mb-2">신랑 어머니 계좌</h3>
                    <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                        <div>
                            <p className="text-base text-gray-500">신한 (예금주: 안미향)</p>
                            <p className="text-base text-gray-600">110-513-232621</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <button
                                onClick={() => handleCopy('110513232621')}
                                className="w-auto px-4 h-8 text-base text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
                            >
                                복사하기
                            </button>
                        </div>
                    </div>
                </div>

                {/* 신부 계좌 */}
                <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                    <h3 className="text-lg text-gray-800 mb-2">신부 계좌</h3>
                    <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                        <div>
                            <p className="text-base text-gray-500">토스 (예금주: 문수영)</p>
                            <p className="text-base text-gray-600">1000-4828-5857</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <button
                                onClick={() => handleCopy('100048285857')}
                                className="w-auto px-4 h-8 text-base text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
                            >
                                복사하기
                            </button>
                        </div>
                    </div>
                </div>

                {/* 신부 아버지 계좌 */}
                <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                    <h3 className="text-lg text-gray-800 mb-2">신부 아버지 계좌</h3>
                    <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                        <div>
                            <p className="text-base text-gray-500">우리 (예금주: 문영환)</p>
                            <p className="text-base text-gray-600">1002-062-456376</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <button
                                onClick={() => handleCopy('1002062456376')}
                                className="w-auto px-4 h-8 text-base text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
                            >
                                복사하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 