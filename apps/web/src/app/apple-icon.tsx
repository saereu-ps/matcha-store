import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f4ef', borderRadius: 38 }}>
        <svg width="100" height="80" viewBox="0 0 280 200">
          <path d="M30 80 C30 80 50 170 140 170 C230 170 250 80 250 80" stroke="#6b7f5e" strokeWidth="10" fill="none" strokeLinecap="round"/>
          <ellipse cx="140" cy="80" rx="110" ry="24" stroke="#6b7f5e" strokeWidth="8" fill="none"/>
          <ellipse cx="140" cy="80" rx="95" ry="18" fill="#6b7f5e" opacity="0.2"/>
          <path d="M140 45 C140 28 148 12 140 -5" stroke="#6b7f5e" strokeWidth="4" strokeLinecap="round" opacity="0.4"/>
        </svg>
      </div>
    ),
    { ...size }
  );
}
