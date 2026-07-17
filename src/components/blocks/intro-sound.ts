const REVERB_TAIL_SECONDS = 2.2;

// Synthetic impulse response for a soft algorithmic reverb: exponentially
// decaying white noise. Avoids needing an actual recorded impulse file.
function createReverbImpulse(ctx: AudioContext, duration: number, decay: number) {
  const sampleRate = ctx.sampleRate;
  const length = Math.max(1, Math.floor(sampleRate * duration));
  const impulse = ctx.createBuffer(2, length, sampleRate);
  for (let channel = 0; channel < impulse.numberOfChannels; channel++) {
    const data = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return impulse;
}

function playNote(
  ctx: AudioContext,
  wetSend: AudioNode,
  freq: number,
  startTime: number,
  duration: number,
  peakGain: number
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(ctx.destination);
  gain.connect(wetSend);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

// A soft three-note rising chime (C5 - G5 - C6) — minimal and understated,
// matching the site's glassy/elegant visual language rather than a jarring
// "notification" sound. Routed through a warm, quiet reverb send so the
// tail blooms softly instead of cutting off flat.
function scheduleChime(ctx: AudioContext) {
  const convolver = ctx.createConvolver();
  convolver.buffer = createReverbImpulse(ctx, REVERB_TAIL_SECONDS, 2.6);

  const wetFilter = ctx.createBiquadFilter();
  wetFilter.type = "lowpass";
  wetFilter.frequency.value = 3200;

  const wetGain = ctx.createGain();
  wetGain.gain.value = 0.3;

  convolver.connect(wetFilter);
  wetFilter.connect(wetGain);
  wetGain.connect(ctx.destination);

  const now = ctx.currentTime;
  const lastNoteStart = 0.26;
  const lastNoteDuration = 1.15;
  playNote(ctx, convolver, 523.25, now, 0.9, 0.045);
  playNote(ctx, convolver, 783.99, now + 0.12, 1.0, 0.035);
  playNote(ctx, convolver, 1046.5, now + lastNoteStart, lastNoteDuration, 0.022);

  const closeDelayMs = (lastNoteStart + lastNoteDuration + REVERB_TAIL_SECONDS + 0.3) * 1000;
  window.setTimeout(() => {
    ctx.close().catch(() => {});
  }, closeDelayMs);
}

/**
 * Plays the site's intro chime once. Browsers block audio with sound until
 * the page has had a real user gesture, so an AudioContext created on load
 * is typically born "suspended" — in that case we wait for the first
 * pointerdown/keydown/touchstart anywhere on the page and play then,
 * scheduling the notes fresh at that point rather than reusing timings
 * computed back when the context was still suspended.
 */
export function playIntroChime() {
  try {
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextCtor) return;
    const ctx = new AudioContextCtor();

    if (ctx.state === "running") {
      scheduleChime(ctx);
      return;
    }

    const start = () => {
      cleanup();
      ctx.resume().then(() => scheduleChime(ctx)).catch(() => {});
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("touchstart", start);
    };
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    window.addEventListener("touchstart", start, { once: true });
  } catch {
    // Web Audio unsupported or blocked outright — the chime is a nice-to-
    // have and should never surface an error to the user.
  }
}
