'use client';
import Map from './Map';

export default function LocationInfo() {
    return (
        <div className="w-full max-w-md mx-auto px-4 korean-text-bold">
            {/* 교통안내 섹션 */}
            <div className="text-base text-gray-600 space-y-6">
                <h2 className="text-xl font-medium text-center mb-8 text-gray-800">교통안내</h2>

                <Map />

                {/* 자가용 섹션 */}
                <div className="bg-white p-4 rounded shadow">
                    <p className="font-semibold text-lg text-green-800 mb-2">자가용 이용</p>
                    <p className="text-base font-medium">네비게이션: &ldquo;노블발렌티 대치&rdquo; 또는</p>
                    <p className="text-base font-medium">&ldquo;서울시 강남구 영동대로 325&rdquo; 검색</p>
                    <div className="mt-4">
                        <p className="text-base font-medium mt-1">주차 안내: 2시간 무료<br />(추가 10분당 1,000원)</p>
                    </div>
                </div>

                {/* 지하철 섹션 */}
                <div className="bg-white p-4 rounded shadow">
                    <p className="font-semibold text-lg text-green-800 mb-2">지하철 이용</p>
                    <p className="text-base font-medium">2호선 삼성역 3번 출구 하차 (도보 10분)</p>
                    <p className="text-base font-medium mt-1">* 삼성역에서 셔틀버스 수시 운행</p>
                </div>

                {/* 버스 섹션 */}
                <div className="bg-white p-4 rounded shadow">
                    <p className="font-semibold text-lg text-green-800 mb-2">버스 이용</p>
                    <p className="text-base font-medium mb-2">휘문고, 대치2동 주민센터 정거장 하차</p>
                    <div className="space-y-1">
                        <p className="text-base"><span className="font-semibold">간선</span>: 401</p>
                        <p className="text-base"><span className="font-semibold">지선</span>: 4318, 4319, 4419</p>
                        <p className="text-base"><span className="font-semibold">일반</span>: 11-3, 917</p>
                        <p className="text-base"><span className="font-semibold">직행</span>: 500-2, 9407, 9507, 9607</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 