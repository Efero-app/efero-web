const INK = '#00281f'
const FOREST = '#004c3a'
const MUTED = '#3d5c52'
const PAPER = '#f5f7f5'
const MIST = '#d3ded8'

type EferoSocialImageProps = {
  title: string
  description?: string
}

function EferoSocialLogo() {
  return (
    <svg
      aria-label="Efero"
      role="img"
      viewBox="0 0 205 48"
      width="256"
      height="60"
      style={{ display: 'flex' }}
    >
      <path fill="#004C3A" d="M12 1h40L42 11H2L12 1Zm-11 18h37v10H1V19Zm1 18h40l10 10H12L2 37Z" />
      <g transform="translate(65 2)">
        <path
          fill="#00163B"
          fillRule="evenodd"
          d="M 42.302 1.989 C 39.847 3.003, 37 7.815, 37 10.950 C 37 12.561, 36.358 13, 34 13 C 31.333 13, 31 13.333, 31 16 C 31 18.667, 31.333 19, 34 19 L 37 19 37 31 L 37 43 41 43 L 45 43 45 31 L 45 19 50 19 C 54.889 19, 55 18.933, 55 16 C 55 13.067, 54.889 13, 50 13 C 46.333 13, 45 12.619, 45 11.571 C 45 9.081, 48.022 7, 51.638 7 C 54.861 7, 55.108 6.786, 54.816 4.250 C 54.522 1.692, 54.151 1.485, 49.500 1.290 C 46.750 1.175, 43.511 1.489, 42.302 1.989 M 1 22.527 L 1 43.053 15.750 42.777 L 30.500 42.500 30.500 39.500 L 30.500 36.500 19.750 36.216 L 9 35.932 9 30.966 L 9 26 17.500 26 L 26 26 26 22.500 L 26 19 17.500 19 L 9 19 9 14 L 9 9 19 9 L 29 9 29 5.500 L 29 2 15 2 L 1 2 1 22.527 M 64.352 13.049 C 62.620 13.574, 59.830 15.569, 58.151 17.481 C 48.072 28.961, 57.959 46.041, 73.193 43.467 C 77.313 42.771, 84.352 37.557, 83.723 35.668 C 83.528 35.085, 82.094 34.268, 80.534 33.851 C 78.412 33.283, 77.073 33.584, 75.214 35.046 C 71.788 37.741, 67.448 37.539, 64.455 34.545 C 63.105 33.195, 62 31.620, 62 31.045 C 62 30.378, 66.208 30, 73.636 30 L 85.272 30 84.654 25.492 C 83.913 20.083, 81.673 16.399, 77.956 14.477 C 74.199 12.534, 68.142 11.898, 64.352 13.049 M 101.021 13.104 C 99.657 13.655, 97.744 14.826, 96.771 15.708 C 95.129 17.194, 95 17.154, 95 15.155 C 95 13.308, 94.429 13, 91 13 L 87 13 87 28 L 87 43 90.903 43 L 94.807 43 95.153 33.603 C 95.568 22.365, 96.969 20, 103.215 20 C 107.115 20, 107.120 19.995, 106.810 16.258 C 106.472 12.175, 105.130 11.445, 101.021 13.104 M 117.914 12.904 C 110.763 15.213, 107 20.506, 107 28.253 C 107 33.194, 109.634 37.934, 114.301 41.391 C 118.354 44.394, 127.211 44.269, 132.279 41.137 C 136.519 38.516, 138.667 35.025, 139.528 29.355 C 140.277 24.423, 136.794 17.288, 132.413 14.776 C 128.740 12.670, 121.524 11.739, 117.914 12.904 M 64 21 C 62.900 22.100, 62 23.450, 62 24 C 62 24.578, 65.167 25, 69.500 25 C 73.833 25, 77 24.578, 77 24 C 77 21.741, 72.888 19, 69.500 19 C 67.333 19, 65.238 19.762, 64 21 M 117.174 21.314 C 114.038 24.653, 114.178 31.269, 117.455 34.545 C 120.941 38.032, 125.345 37.809, 129.202 33.952 C 131.903 31.251, 132.186 30.425, 131.688 26.712 C 130.997 21.561, 128.133 19, 123.064 19 C 120.473 19, 118.690 19.701, 117.174 21.314"
        />
      </g>
    </svg>
  )
}

export function EferoSocialImage({ title, description }: EferoSocialImageProps) {
  return (
    <div
      style={{
        background: PAPER,
        backgroundImage:
          'radial-gradient(circle at 88% 4%, rgba(0,76,58,0.14), rgba(245,247,245,0) 62%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          background: FOREST,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <EferoSocialLogo />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1010 }}>
        <span
          style={{
            color: MUTED,
            fontSize: 22,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: 26,
          }}
        >
          For norske håndverksbedrifter
        </span>
        <span
          style={{
            color: INK,
            fontSize: title.length > 42 ? 64 : 76,
            fontWeight: 600,
            letterSpacing: '-2.5px',
            lineHeight: 1.02,
          }}
        >
          {title}
        </span>
        {description ? (
          <span
            style={{
              color: MUTED,
              fontSize: 27,
              lineHeight: 1.28,
              marginTop: 22,
              maxWidth: 980,
            }}
          >
            {description}
          </span>
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: `2px solid ${MIST}`,
          paddingTop: 26,
        }}
      >
        <span style={{ color: MUTED, fontSize: 26 }}>
          Tilbud · Jobber · Timer · Materialer · Sjekklister · Faktura
        </span>
        <span style={{ color: FOREST, fontSize: 26, fontWeight: 600 }}>efero.no</span>
      </div>
    </div>
  )
}
