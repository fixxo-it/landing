"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

/* quiet-zone modules around the code — scanners need this margin to lock on */
const MARGIN = 4;

export default function PixelatedQr({
  value,
  size,
  className,
  label,
}: {
  value: string;
  image?: string;
  size: number;
  className?: string;
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const qr = QRCode.create(value, { errorCorrectionLevel: "H" });
    const count = qr.modules.size;
    const total = count + MARGIN * 2;
    const cell = size / total;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "#000";
    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        if (!qr.modules.get(row, col)) continue;
        ctx.fillRect(
          (col + MARGIN) * cell,
          (row + MARGIN) * cell,
          cell + 0.5,
          cell + 0.5,
        );
      }
    }
  }, [value, size]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      style={{ width: size, height: size }}
      className={className}
    />
  );
}
