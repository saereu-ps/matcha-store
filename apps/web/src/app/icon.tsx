import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: 512, height: 512, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f4ef', borderRadius: 108 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          {/* Tea bowl shape */}
          <svg width="280" height="200" viewBox="0 0 280 200">
            <path d="M30 80 C30 80 50 170 140 170 C230 170 250 80 250 80" stroke="#6b7f5e" strokeWidth="8" fill="none" strokeLinecap="round"/>
            <ellipse cx="140" cy="80" rx="110" ry="24" stroke="#6b7f5e" strokeWidth="6" fill="none"/>
            <ellipse cx="140" cy="80" rx="95" ry="18" fill="#6b7f5e" opacity="0.2"/>
            <path d="M110 50 C110 35 118 20 110 5" stroke="#6b7f5e" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
            <path d="M140 45 C140 28 148 12 140 -5" stroke="#6b7f5e" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
            <path d="M170 48 C170 33 178 18 170 3" stroke="#6b7f5e" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
          </svg>
          <span style={{ fontFamily: 'serif', fontSize: 52, color: '#2c2c2b', letterSpacing: 6 }}>Matchá</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
