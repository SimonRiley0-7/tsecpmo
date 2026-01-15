import React, { useMemo } from 'react';
import { CourtroomBackground } from './PixelAssets';
import SpeechBubble from './SpeechBubble';
import { Speaker, Factor } from '../types';

const MAX_VISIBLE_LINES = 3;
const CHARS_PER_LINE = 80;

interface CourtroomProps {
  currentSpeaker: Speaker;
  displayedText: string;
  isLoading: boolean;
  currentFactor?: Factor | null;
  roundInfo?: { current: number; total: number } | null;
  isAudioPlaying: boolean;
  onSkip?: () => void;
}

const Courtroom: React.FC<CourtroomProps> = ({
  currentSpeaker,
  displayedText,
  isLoading,
  currentFactor,
  roundInfo,
  isAudioPlaying,
  onSkip,
}) => {
  // Only show animated background when audio is actually playing
  const showAnimatedBackground = isAudioPlaying && currentSpeaker !== Speaker.NONE;

  // Calculate visible text (last 3 lines)
  const visibleText = useMemo(() => {
    const totalChars = displayedText.length;
    const maxChars = MAX_VISIBLE_LINES * CHARS_PER_LINE;

    if (totalChars <= maxChars) {
      return displayedText;
    }

    const startIndex = totalChars - maxChars;
    const nextSpace = displayedText.indexOf(' ', startIndex);

    if (nextSpace !== -1 && nextSpace < startIndex + 20) {
      return '...' + displayedText.slice(nextSpace + 1);
    }

    return '...' + displayedText.slice(startIndex);
  }, [displayedText]);

  return (
    <div className="relative w-full h-full bg-[#fdf6e3] overflow-hidden select-none border-b-4 border-[#2d1b0e]">
      {/* Background Layer (Transparent to show parent bg, or same beige) */}
      <CourtroomBackground
        currentSpeaker={showAnimatedBackground ? currentSpeaker : Speaker.NONE}
      />

      {/* Grid Overlay for Retro Feel - Adjusted for light theme */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,27,14,0)_50%,rgba(45,27,14,0.05)_50%),linear-gradient(90deg,rgba(45,27,14,0.03),rgba(45,27,14,0.01),rgba(45,27,14,0.03))] z-10 pointer-events-none bg-[length:100%_4px,6px_100%]"></div>

      {/* Factor Info Banner - CENTERED */}
      {currentFactor && showAnimatedBackground && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-none">
          <div className="bg-[#fdf6e3]/90 border-4 border-[#d97706] px-8 py-4
                          font-pixel text-[#5c3a21] text-center
                          shadow-[6px_6px_0_rgba(45,27,14,0.2)] animate-pulse">
            <div className="text-[#d97706] text-xs mb-1 tracking-widest">NOW DEBATING</div>
            <div className="text-[#2d1b0e] text-lg md:text-xl">{currentFactor.name}</div>
          </div>
        </div>
      )}

      {/* Speech Bubble */}
      {showAnimatedBackground && visibleText && (
        <SpeechBubble
          speaker={currentSpeaker}
          text={visibleText}
          roundInfo={roundInfo}
          isPlaying={isAudioPlaying}
          onSkip={onSkip}
        />
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#2d1b0e]/40 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-[#fdf6e3] font-pixel text-2xl animate-pulse mb-4 drop-shadow-md">
              {'>'} ANALYZING EVIDENCE...
            </div>
            <div className="text-[#fdf6e3] font-pixel text-sm">
              The court is reviewing the document
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courtroom;
