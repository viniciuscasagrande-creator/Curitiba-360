// frontend/src/utils/exportAndAudioUtils.js
// Utilitários reais de Exportação CSV/Excel compatível com Microsoft Excel (UTF-8 BOM), Impressão PDF Timbrado e Bip Sonoro de Catraca (Web Audio API)

export function downloadExcelCsv(filename, headers, rows) {
  try {
    const cleanFilename = filename.endsWith('.csv') ? filename : `${filename}.csv`;
    const escapeCell = (val) => {
      const str = String(val ?? '').replace(/"/g, '""');
      return `"${str}"`;
    };
    const csvLines = [
      headers.map(escapeCell).join(';'),
      ...rows.map((r) => r.map(escapeCell).join(';'))
    ];
    // BOM UTF-8 (\uFEFF) + separador ';' para abrir direto no Excel em Português com colunas e acentos perfeitos
    const csvContent = '\uFEFF' + csvLines.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = cleanFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch (e) {
    console.error('Erro ao exportar planilha:', e);
    return false;
  }
}

export function playTurnstileBeep(type = 'success') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      // Bip duplo agudo de catraca liberada
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, ctx.currentTime); // C6
      osc.frequency.setValueAtTime(1318.5, ctx.currentTime + 0.09); // E6
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } else {
      // Bip grave de bloqueio / fraude
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(165, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch {
    // Ignorar se áudio bloqueado pelo browser
  }
}
