import { ImageResponse } from 'next/og';

import { SITE_NAME } from '@/lib/seo';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1f2937',
          color: '#ffffff',
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        {SITE_NAME}
      </div>
    ),
    { ...size }
  );
}
