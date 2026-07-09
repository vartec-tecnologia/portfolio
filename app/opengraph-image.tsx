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
          background: '#0B1220', // ink — docs/design-tokens.md
          color: '#FAFBFC', // paper — docs/design-tokens.md
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
