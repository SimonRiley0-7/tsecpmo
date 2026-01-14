import React from 'react';
import { PixelArtProps, Speaker } from '../types';
import background from '../background.png';
import judgeGif from '../judge.gif';
import opposerGif from '../opposer.gif';
import supporterGif from '../supporter.gif';

interface CourtroomBackgroundProps {
  currentSpeaker: Speaker;
}

// Courtroom background that switches between static image and animated GIFs
// When speaker is NONE, shows static background (stops GIF animation)
export const CourtroomBackground: React.FC<CourtroomBackgroundProps> = ({ currentSpeaker }) => {
  // When speaker is NONE, show static background
  if (currentSpeaker === Speaker.NONE || currentSpeaker === Speaker.SYSTEM) {
    return (
      <div className="absolute inset-0 z-0">
        <img
          src={background}
          alt="Courtroom Background"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Select the appropriate GIF based on speaker
  let bgSource = background;
  switch (currentSpeaker) {
    case Speaker.JUDGE:
      bgSource = judgeGif;
      break;
    case Speaker.OPPOSE:
      bgSource = opposerGif;
      break;
    case Speaker.SUPPORT:
      bgSource = supporterGif;
      break;
  }

  return (
    <div className="absolute inset-0 z-0">
      <img
        key={`gif-${currentSpeaker}`}
        src={bgSource}
        alt="Courtroom Background"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const JudgeAvatar: React.FC<PixelArtProps> = ({ isActive }) => (
  <div className={`relative transition-transform duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}>
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      {/* Chair */}
      <rect x="6" y="2" width="12" height="20" fill="#2d1b15" />
      {/* Head */}
      <rect x="10" y="6" width="4" height="4" fill="#ffccaa" />
      {/* Hair / Wig */}
      <rect x="9" y="5" width="6" height="3" fill="#eeeeee" />
      <rect x="9" y="8" width="1" height="2" fill="#eeeeee" />
      <rect x="14" y="8" width="1" height="2" fill="#eeeeee" />
      {/* Robe */}
      <rect x="8" y="10" width="8" height="10" fill="#111111" />
      {/* Gavel */}
      {isActive && <rect x="4" y="14" width="4" height="2" fill="#8d6e63" />}
      {isActive && <rect x="5" y="13" width="2" height="4" fill="#5d4037" />}
    </svg>
  </div>
);

export const SupportAvatar: React.FC<PixelArtProps> = ({ isActive }) => (
  <div className={`relative transition-transform duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}>
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      {/* Body */}
      <rect x="8" y="8" width="8" height="16" fill="#1e3a8a" />
      {/* Head */}
      <rect x="10" y="4" width="4" height="4" fill="#ffccaa" />
      {/* Hair */}
      <rect x="10" y="3" width="4" height="2" fill="#333" />
      {/* Arm Pointing */}
      {isActive && <rect x="14" y="10" width="6" height="2" fill="#1e3a8a" />}
      {isActive && <rect x="18" y="9" width="2" height="4" fill="#ffccaa" />}
    </svg>
  </div>
);

export const OpposeAvatar: React.FC<PixelArtProps> = ({ isActive }) => (
  <div className={`relative transition-transform duration-300 ${isActive ? 'scale-105 transform -scale-x-100' : 'scale-100 transform -scale-x-100'}`}>
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      {/* Body */}
      <rect x="8" y="8" width="8" height="16" fill="#7f1d1d" />
      {/* Head */}
      <rect x="10" y="4" width="4" height="4" fill="#eac086" />
      {/* Hair / Glasses */}
      <rect x="10" y="3" width="5" height="2" fill="#555" />
      <rect x="11" y="5" width="3" height="1" fill="#000" opacity="0.5" />
      {/* Paper */}
      {isActive && <rect x="14" y="12" width="4" height="5" fill="#fff" />}
    </svg>
  </div>
);

export const Bench: React.FC = () => (
  <svg width="100%" height="60" preserveAspectRatio="none" viewBox="0 0 100 20" shapeRendering="crispEdges">
    <rect width="100" height="20" fill="#5d4037" />
    <rect width="100" height="2" fill="#8d6e63" />
  </svg>
);
