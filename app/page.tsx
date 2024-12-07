'use client';

import junghoPhotoAvif from '@/assets/gallery/jungho2.avif';
import junghoPhotoWebp from '@/assets/gallery/jungho2.webp';
import paperBgAvif from '@/assets/gallery/paper.avif';
import paperBgWebp from '@/assets/gallery/paper.webp';
import sooyoungPhotoAvif from '@/assets/gallery/sooyoung5.avif';
import sooyoungPhotoWebp from '@/assets/gallery/sooyoung5.webp';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import ContactModal from './components/ContactModal';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import LocationInfo from './components/LocationInfo';
import ScrollIndicator from './components/ScrollIndicator';
import ShareButtons from './components/ShareButtons';

const RsvpModal = dynamic(() => import('./components/RsvpModal'), {
  ssr: false
});

const Toaster = dynamic(
  () => import('react-hot-toast').then((mod) => mod.Toaster),
  {
    ssr: false,
  }
);

// Add section flags at the top of the file
const SHOW_RSVP_SECTION = true;
const SHOW_ACCOUNT_SECTION = true;
const SHOW_GUESTBOOK_SECTION = true;

export default function Home() {

  const [mounted, setMounted] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Intersection Observer 대신 타이머로 순차적 표시
  const [visibleSections, setVisibleSections] = useState({
    section1: true, // 첫 번째 섹션은 즉시 보이게
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
    section7: false,
    section8: false,
  });

  // 컴포넌트 마운트 시 순차적으로 섹션 표시
  useEffect(() => {
    const showSectionsSequentially = () => {
      const sections = ['section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8'];
      sections.forEach((section, index) => {
        setTimeout(() => {
          setVisibleSections(prev => ({
            ...prev,
            [section]: true
          }));
        }, 200 * (index + 1)); // 각 섹션을 200ms 간격으로 표시
      });
    };

    // 약간의 지연 후 시작
    setTimeout(showSectionsSequentially, 200);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [newGuestbookEntry, setNewGuestbookEntry] = useState<{
    name: string;
    message: string;
    submittedAt: string;
  } | null>(null);

  const [initialFadeIn, setInitialFadeIn] = useState(false);

  useEffect(() => {
    // 약간의 지연 후에 fade-in 시작
    const timer = setTimeout(() => {
      setInitialFadeIn(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const [isGroomAccountModalOpen, setIsGroomAccountModalOpen] = useState(false);
  const [isBrideAccountModalOpen, setIsBrideAccountModalOpen] = useState(false);

  const handleCopy = async (accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      toast.success('계좌번호가 복사되었습니다');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('계좌번호 복사에 실패했습니다');
    }
  };

  if (!mounted) {
    return (
      <main className="h-screen flex items-center justify-center">
        <div className="text-green-800"></div>
      </main>
    );
  }

  return (
    <>
      <main
        className={`relative overflow-x-hidden overflow-y-auto scroll-smooth transition-opacity duration-1000 ${initialFadeIn ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          backgroundImage: `url(${paperBgAvif.src}), url(${paperBgWebp.src})`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backgroundBlendMode: 'overlay',
          WebkitOverflowScrolling: 'touch',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <div className="flex flex-col">
          {/* 첫 번째 섹션 */}
          <section
            className={`relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-4 fade-in-section ${visibleSections.section1 ? 'is-visible' : ''
              }`}
          >
            <div
              className="w-full max-w-4xl mx-auto text-center"
            >
              {/* 상단 날짜 */}
              <div className="inline-block border border-green-800 sm:px-4 px-3 py-2 mb-4 sm:mb-8 text-green-800 text-sm sm:text-base font-serif"
                style={{ borderRadius: '50%' }}>
                <span className="font-bold">2025 </span>
                <span className="font-bold">02 </span>
                <span className="font-bold">16</span>
              </div>

              {/* The Marriage of */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-green-800 relative z-10 mb-4 sm:mb-8 italic">
                The Marriage of
              </h1>

              {/* 메인 사진들 */}
              <div className="flex flex-row justify-center gap-3 sm:gap-4 lg:gap-6 my-4 sm:my-6 lg:my-8">
                <div className="w-[30vw] max-w-[144px] h-[40vw] max-h-[192px] relative">
                  <picture>
                    <source srcSet={sooyoungPhotoAvif.src} type="image/avif" />
                    <Image
                      src={sooyoungPhotoWebp}
                      alt="Sooyoung Photo"
                      className="object-cover rounded-lg shadow-lg"
                      fill
                      sizes="(max-width: 768px) 120px, 144px"
                      quality={20}
                      loading="eager"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
                    />
                  </picture>
                </div>
                <div className="w-[30vw] max-w-[144px] h-[40vw] max-h-[192px] relative">
                  <picture>
                    <source srcSet={junghoPhotoAvif.src} type="image/avif" />
                    <Image
                      src={junghoPhotoWebp}
                      alt="Jungho Photo"
                      className="object-cover rounded-lg shadow-lg"
                      fill
                      sizes="(max-width: 768px) 30vw, (max-width: 1024px) 144px, 192px"
                      quality={20}
                      loading="eager"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
                    />
                  </picture>
                </div>
              </div>

              {/* 이름 */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-green-800 mb-4 sm:mb-6 lg:mb-8 relative z-10">
                Sooyoung & Jungho
              </h2>

              {/* 날짜와 장소 */}
              <p className="text-sm sm:text-base lg:text-lg text-green-800 korean-text-bold italic">
                2025 02 16 SUN 2PM
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-green-800 korean-text-bold italic">
                노블발렌티 대치
              </p>

              {/* Invitation 원형 */}
              <div className="mt-4 sm:mt-6 lg:mt-8">
                <div className="inline-block border border-green-800 sm:px-4 px-3 py-2 text-green-800 text-sm sm:text-base font-serif"
                  style={{ borderRadius: '50%' }}>
                  invitation
                </div>
              </div>
            </div>
          </section>

          {/* 두 번째 섹션 */}
          <section
            className={`relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-4 pb-32 fade-in-section ${visibleSections.section2 ? 'is-visible' : ''
              }`}
          >
            <div
              className="w-full max-w-md text-center"
            >
              {/* Wedding Day */}
              <div className="text-center text-green-800 my-4">
                <div className="relative flex justify-center">
                  {'wedding day'.split('').map((letter, index, array) => {
                    const mid = Math.floor(array.length / 2);
                    const distanceFromMid = index - mid;
                    const rotation = distanceFromMid * 5;
                    const verticalOffset = Math.pow(Math.abs(distanceFromMid), 1.5) * 1.2;

                    return (
                      <span
                        key={index}
                        className="inline-block font-serif font-bold italic text-sm tracking-[0.15em] relative"
                        style={{
                          transform: `rotate(${rotation}deg) translateY(${verticalOffset}px)`,
                          transformOrigin: 'bottom center',
                          color: '#1a472a',
                          textShadow: '0.5px 0.5px 0px rgba(0,0,0,0.1)'
                        }}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </div>
                <div className="mt-1 font-serif text-sm tracking-wider">02</div>
                <div className="font-serif text-sm tracking-wider">16</div>
              </div>

              {/* 메인 텍스트 */}
              <div className="text-gray-600 mb-8 italic text-balance space-y-4 text-center korean-text-bold">
                <p>같이 있을 때</p>
                <p>가장 나다운 모습이 되게 하는</p>
                <p>사람을 만났습니다.</p>
                <br />
                <p>귀하신 발걸음이</p>
                <p>저희의 행복한 출발을</p>
                <p>더욱 빛나게 해주길 바랍니다.</p>
              </div>

              {/* 구분선 */}
              <div className="text-green-800 tracking-widest mt-16">
                . . . . . .
              </div>

              {/* 혼주 정보 */}
              <div className="text-center space-y-2 text-gray-700 mt-16 korean-text-bold">
                <div className="flex justify-between max-w-[220px] mx-auto">
                  <span>현종권 · 안미향 의 아들</span>
                  <span className="w-[60px]">정호</span>
                </div>
                <div className="flex justify-between max-w-[220px] mx-auto">
                  <span>문영환 · 이동신 의 딸</span>
                  <span className="w-[60px]">수영</span>
                </div>
              </div>

              <button
                onClick={() => setIsContactModalOpen(true)}
                className="mt-4 px-3 py-1.5 bg-green-800 text-white text-xs rounded-full shadow-lg hover:bg-green-700 transition-colors korean-text-bold"
              >
                연락하기
              </button>


              {/* 날짜 및 장소 */}
              <div className="relative w-72 mx-auto">
                <div className="border border-green-800 py-3 px-1 text-center text-gray-600 mt-14 backdrop-blur-sm relative korean-text-bold shadow-lg bg-white/80">
                  <p className="text-base font-bold text-green-800">2025년 2월 16일 일요일 오후 2시</p>
                  <p className="text-base font-bold text-green-800">노블발렌티 대치</p>
                </div>
              </div>
            </div>
          </section>

          {/* 네 번째 섹션: 지도 */}
          <section
            className={`relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-4 pt-16 fade-in-section ${visibleSections.section3 ? 'is-visible' : ''
              }`}
          >
            <LocationInfo />
          </section>






          {/* 다섯 번째 섹션: 계좌번호 */}
          {SHOW_ACCOUNT_SECTION && (
            <section
              className={`korean-text-bold relative z-10 w-full flex flex-col items-center justify-center text-center min-h-[80vh] py-8 fade-in-section ${visibleSections.section7 ? 'is-visible' : ''
                }`}
            >
              <h2 className="text-xl font-medium text-center mb-8 text-gray-800">
                마음 전해주실 곳
              </h2>
              <div className="text-gray-600 mb-8 italic text-balance space-y-4 text-center">
                <p>필요하신 분들을 위해</p>
                <p>안내드리니 양해 부탁드립니다.</p>
                <p>참석하지 못하시더라도 축하해주시는</p>
                <p>그 마음 감사히 간직하겠습니다.</p>
              </div>

              {/* 계좌번호 버튼들을 여기로 이동 */}
              <div className="flex gap-4">
                <button
                  onClick={() => setIsGroomAccountModalOpen(true)}
                  className="px-4 py-2 bg-[#4A6B55] text-white text-sm rounded-full shadow-lg korean-text-bold"
                >
                  신랑측 계좌번호
                </button>
                <button
                  onClick={() => setIsBrideAccountModalOpen(true)}
                  className="px-4 py-2 bg-[#C17F7F] text-white text-sm rounded-full shadow-lg korean-text-bold"
                >
                  신부측 계좌번호
                </button>
              </div>
            </section>
          )}

          {/* 다섯 번째 섹션: 갤러리 */}
          <section
            className={`relative z-10 w-full flex flex-col items-center justify-center min-h-screen py-16 fade-in-section ${visibleSections.section4 ? 'is-visible' : ''
              }`}
          >
            <div className="w-full max-w-md px-4 sm:px-0">
              <Gallery
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </div>
          </section>


          {SHOW_RSVP_SECTION && (
            <section
              className={`relative z-10 w-full flex flex-col items-center justify-center min-h-screen py-8 px-4 fade-in-section ${visibleSections.section5 ? 'is-visible' : ''
                }`}
            >
              <div
                className="w-full max-w-md px-4 sm:px-0 text-center space-y-6 korean-text-bold"
              >
                <div className="text-center mb-6">
                  <div className="inline-block border border-green-800 px-8 py-2 text-green-800" style={{ borderRadius: '50%', fontFamily: 'MadeKenfolg' }}>
                    R.S.V.P
                  </div>
                </div>
                <div className="text-gray-600 mb-8 italic text-balance space-y-4 text-center">
                  <p>부족함 없이 식사를 제공할 수 있기 위함이니</p>
                  <p>참석에 부담 가지지 마시고,</p>
                  <p>편하게 알려주시면 감사합니다.</p>
                </div>
                <div className="border-t border-gray-200 w-1/2 mx-auto my-8" />
                <button
                  className="mt-8 bg-green-800 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 transition-colors"
                  onClick={() => setIsRsvpOpen(true)}
                >
                  참석여부 전달하기
                </button>
              </div>
            </section>
          )}

          {/* 여섯 번째 섹션: 방명록 */}
          {SHOW_GUESTBOOK_SECTION && (
            <section
              id="guestbook"
              className={`relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-4 fade-in-section ${visibleSections.section5 ? 'is-visible' : ''
                }`}
            >
              <Guestbook newEntry={newGuestbookEntry} />

              {/* 방명록 작성 버튼 추가 */}
              <button
                onClick={() => setIsRsvpOpen(true)}
                className="mt-8 px-4 py-1.5 bg-green-800/10 text-green-800 text-xs rounded-full hover:bg-green-800/20 transition-colors korean-text-bold"
              >
                방명록 작성하기
              </button>
            </section>
          )}

          {/* 마지막 섹션: 공유하기 */}
          <section
            className="relative z-10 w-full flex flex-col items-center justify-center py-16 fade-in-section is-visible"
          >
            <ShareButtons />
          </section>
        </div>

        <Toaster position="bottom-center" />
      </main>

      <ScrollIndicator onOpenRsvp={() => setIsRsvpOpen(true)} />

      {/* Bottom Buttons */}
      {/* {SHOW_RSVP_SECTION && !hideButtonsForToday && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 shadow-lg transition-all duration-300 ease-in-out z-50 korean-text-bold">
          <div className="max-w-md mx-auto p-3 flex items-center justify-between">
            <button
              onClick={() => setIsRsvpOpen(true)}
              className="bg-green-800 text-white px-4 py-1.5 rounded-full text-xs hover:bg-green-700 transition-colors"
            >
              참석 여부 및 축하 메시지 전달하기
            </button>
            <button
              onClick={hideForToday}
              className="text-gray-500 text-xs hover:text-gray-700"
            >
              오늘 하루 보지 않기
            </button>
          </div>
        </div>
      )} */}

      {/* Modals */}
      <RsvpModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} onSubmitSuccess={(entry) => setNewGuestbookEntry(entry)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* 신랑측 계좌 모달 */}
      <Dialog
        open={isGroomAccountModalOpen}
        onClose={() => setIsGroomAccountModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 korean-text-bold">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-medium text-gray-800">
                신랑측 계좌번호
              </Dialog.Title>
              <button
                onClick={() => setIsGroomAccountModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              {/* 신랑 계좌 */}
              <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">신랑 계좌</h3>
                <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                  <div>
                    <p className="text-base text-gray-500 font-medium">신한 (예금주: 현정호)</p>
                    <p className="text-base text-gray-600 font-medium">110-354-833731</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleCopy('110354833731')}
                      className="w-auto px-4 h-8 text-base text-gray-600 font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      복사하기
                    </button>
                  </div>
                </div>
              </div>

              {/* 신랑 아버지 계좌 */}
              <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">신랑 아버지 계좌</h3>
                <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                  <div>
                    <p className="text-base text-gray-500 font-medium">하나 (예금주: 현종권)</p>
                    <p className="text-base text-gray-600 font-medium">800-910041-89907</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleCopy('80091004189907')}
                      className="w-auto px-4 h-8 text-base text-gray-600 font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      복사하기
                    </button>
                  </div>
                </div>
              </div>

              {/* 신랑 어머니 계좌 */}
              <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">신랑 어머니 계좌</h3>
                <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                  <div>
                    <p className="text-base text-gray-500 font-medium">신한 (예금주: 안미향)</p>
                    <p className="text-base text-gray-600 font-medium">110-513-232621</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleCopy('110513232621')}
                      className="w-auto px-4 h-8 text-base text-gray-600 font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      복사하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* 신부측 계좌 모달 */}
      <Dialog
        open={isBrideAccountModalOpen}
        onClose={() => setIsBrideAccountModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 korean-text-bold">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-medium text-gray-800">
                신부측 계좌번호
              </Dialog.Title>
              <button
                onClick={() => setIsBrideAccountModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              {/* 신부 계좌 */}
              <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">신부 계좌</h3>
                <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                  <div>
                    <p className="text-base text-gray-500 font-medium">토스 (예금주: 문수영)</p>
                    <p className="text-base text-gray-600 font-medium">1000-4828-5857</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleCopy('100048285857')}
                      className="w-auto px-4 h-8 text-base text-gray-600 font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      복사하기
                    </button>
                  </div>
                </div>
              </div>

              {/* 신부 아버지 계좌 */}
              <div className="p-4 bg-white rounded-lg shadow-sm space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">신부 혼주 계좌</h3>
                <div className="grid grid-cols-[1fr_100px] gap-2 items-center">
                  <div>
                    <p className="text-base text-gray-500 font-medium">우리 (예금주: 문영환)</p>
                    <p className="text-base text-gray-600 font-medium">1002-062-456376</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleCopy('1002062456376')}
                      className="w-auto px-4 h-8 text-base text-gray-600 font-medium bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      복사하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
