import { useState } from 'react';

interface RsvpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RsvpModal({ isOpen, onClose }: RsvpModalProps) {
    const [activeTab, setActiveTab] = useState('신랑');
    const [attendance, setAttendance] = useState<'참석' | '미정' | '미참'>('참석');
    const [attendeeCount, setAttendeeCount] = useState(1);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const timestamp = new Date().toISOString();
            const content = {
                name,
                side: activeTab,
                attendance,
                numberOfGuests: attendance === '참석' ? attendeeCount : 0,
                message,
                submittedAt: timestamp
            };

            // Unicode 문자열을 Base64로 인코딩하는 함수
            const toBase64 = (str: string) => {
                return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                    function (match, p1) {
                        return String.fromCharCode(parseInt(p1, 16))
                    }));
            };

            const response = await fetch(
                `https://api.github.com/repos/sooyoung-jungho/sooyoung-jungho.github.io/contents/rsvp/${timestamp}.json`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: `RSVP submission from ${name}`,
                        content: toBase64(JSON.stringify(content, null, 2)),
                        branch: 'main'
                    })
                }
            );

            if (!response.ok) {
                throw new Error('제출 중 오류가 발생했습니다');
            }

            alert('참석 여부가 성공적으로 제출되었습니다. 감사합니다.');
            onClose();
            // 폼 초기화
            setName('');
            setAttendance('참석');
            setAttendeeCount(1);
            setMessage('');
            setActiveTab('신랑');
        } catch (error) {
            console.error('Failed to submit RSVP:', error);
            alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500"
                >
                    ✕
                </button>

                {/* 타이틀 */}
                <h2 className="text-center mb-6 font-serif italic">R.S.V.P</h2>

                {/* 탭 */}
                <div className="flex mb-6">
                    <button
                        className={`flex-1 py-2 border-b ${activeTab === '신랑' ? 'bg-[#B4A89F] text-white' : ''}`}
                        onClick={() => setActiveTab('신랑')}
                    >
                        신랑측 하객
                    </button>
                    <button
                        className={`flex-1 py-2 border-b ${activeTab === '신부' ? 'bg-[#B4A89F] text-white' : ''}`}
                        onClick={() => setActiveTab('신부')}
                    >
                        신부측 하객
                    </button>
                </div>

                {/* 폼 */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="성함"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-b p-2"
                            required
                        />
                    </div>

                    {/* 참석여부 부분 수정 */}
                    <div>
                        <p className="mb-2">참석여부</p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className={`flex-1 py-2 rounded ${attendance === '참석' ? 'bg-[#B4A89F] text-white' : 'border'
                                    }`}
                                onClick={() => setAttendance('참석')}
                            >
                                참석
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2 rounded ${attendance === '미정' ? 'bg-[#B4A89F] text-white' : 'border'
                                    }`}
                                onClick={() => setAttendance('미정')}
                            >
                                미정
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2 rounded ${attendance === '미참' ? 'bg-[#B4A89F] text-white' : 'border'
                                    }`}
                                onClick={() => setAttendance('미참')}
                            >
                                미참
                            </button>
                        </div>
                    </div>

                    {/* 참석인원 부분 수정 */}
                    <div>
                        <p className="mb-2">참석인원</p>
                        <input
                            type="number"
                            min="1"
                            value={attendeeCount}
                            onChange={(e) => setAttendeeCount(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full border-b p-2"
                        />
                    </div>

                    <div>
                        <textarea
                            placeholder="전달 사항"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border-b p-2 resize-none"
                            rows={3}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!name.trim()}
                        className={`w-full py-3 rounded ${name.trim()
                            ? 'bg-[#B4A89F] text-white hover:bg-[#a39689]'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        참석의사 전달하기
                    </button>
                </form>
            </div>
        </div>
    );
} 