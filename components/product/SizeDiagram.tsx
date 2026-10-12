const PERSON_CM = 170;

/**
 * Mặt đứng sản phẩm (Dài × Cao) đặt cạnh dáng người cao 170 cm, cùng một
 * thang đo — để khách hình dung độ lớn thật thay vì chỉ đọc con số.
 */
export function SizeDiagram({ size }: { size: { w: number; d: number; h: number } }) {
  const personW = 46;
  const gap = 34;
  const fx = personW + gap;
  const maxH = Math.max(PERSON_CM, size.h);
  const totalW = fx + size.w;
  const font = Math.max(9, Math.round(Math.max(totalW, maxH) / 24));
  const pad = font * 2.6;
  const ground = maxH;
  const top = ground - size.h;
  const head = ground - PERSON_CM;
  const hx = fx + size.w + font * 0.8;

  return (
    <svg
      viewBox={`${-pad / 2} ${-pad} ${totalW + pad * 2} ${maxH + pad * 2.2}`}
      className="h-auto max-h-64 w-full"
      role="img"
      aria-label={`Sản phẩm dài ${size.w} cm, cao ${size.h} cm, đặt cạnh người cao ${PERSON_CM} cm`}
    >
      {/* Người 170 cm */}
      <g className="fill-ink/20">
        <circle cx={personW / 2} cy={head + 11} r={11} />
        <rect x={5} y={head + 26} width={personW - 10} height={68} rx={12} />
        <rect x={9} y={head + 86} width={13} height={PERSON_CM - 86} rx={5} />
        <rect x={personW - 22} y={head + 86} width={13} height={PERSON_CM - 86} rx={5} />
      </g>
      <text x={personW / 2} y={head - font * 0.6} textAnchor="middle" fontSize={font} className="fill-ink/50">
        170 cm
      </text>

      {/* Sản phẩm */}
      <rect
        x={fx}
        y={top}
        width={size.w}
        height={size.h}
        rx={Math.min(8, size.h / 6)}
        className="fill-gold/15 stroke-gold"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />

      {/* Mặt sàn */}
      <line
        x1={-pad / 2}
        x2={totalW + pad}
        y1={ground}
        y2={ground}
        className="stroke-ink/25"
        vectorEffect="non-scaling-stroke"
      />

      {/* Dài */}
      <line
        x1={fx}
        x2={fx + size.w}
        y1={ground + font * 1.1}
        y2={ground + font * 1.1}
        className="stroke-gold-deep"
        vectorEffect="non-scaling-stroke"
      />
      <text x={fx + size.w / 2} y={ground + font * 2.5} textAnchor="middle" fontSize={font} className="fill-gold-deep">
        Dài {size.w} cm
      </text>

      {/* Cao */}
      <line x1={hx} x2={hx} y1={top} y2={ground} className="stroke-gold-deep" vectorEffect="non-scaling-stroke" />
      <text
        x={hx + font * 0.9}
        y={top + size.h / 2}
        fontSize={font}
        textAnchor="middle"
        className="fill-gold-deep"
        transform={`rotate(90 ${hx + font * 0.9} ${top + size.h / 2})`}
      >
        Cao {size.h} cm
      </text>
    </svg>
  );
}
