import { useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

export default function QRScanner({ onScan }) {
  const scannerRef = useRef(null)

  useEffect(() => {
    const scanner = new Html5Qrcode('qr-reader')
    scannerRef.current = scanner

    scanner.start(
      { facingMode: 'environment' },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }
      },
      (decodedText) => {
        onScan(decodedText)
      },
      () => {}
    )
    .catch((error) => {
      console.warn('Câmera indisponível ou permissão negada. O leitor manual por código continuará ativo:', error)
    })

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .catch(() => {})
      }
    }
  }, [onScan])

  return (
    <div
      id="qr-reader"
      className="overflow-hidden rounded-2xl border border-gray-200 bg-black"
    />
  )
}
