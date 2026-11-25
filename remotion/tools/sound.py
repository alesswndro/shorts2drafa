"""Trilha + SFX sintetizados e mixagem com a voz (voz intocada, só ganho global no fim).
Uso: python3 sound.py voz.mp3 cues.json out.wav
cues.json: {"duration": s, "music": [[t0,t1,"mode"],...], "sfx": [[t,"tipo"],...]}
modes: "groove" (trilha leve), "tension" (drone grave), "rise" (groove com mais brilho)"""
import json, subprocess, sys
import numpy as np

SR = 48000
voice_path, cues_path, out = sys.argv[1:4]
cues = json.load(open(cues_path))
rng = np.random.default_rng(7)

def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)

voice = load(voice_path)
N = int(cues["duration"] * SR)
voice = np.pad(voice, (0, max(0, N - len(voice))))[:N]
tt = np.arange(N) / SR

def env(n, a=0.005, r=0.2):
    e = np.ones(n); na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na)
    e *= np.exp(-np.arange(n) / (r * SR)); return e

def note(f, d, a=0.004, r=0.25, harm=(1, .5, .25)):
    n = int(d * SR); x = np.arange(n) / SR
    s = sum(h * np.sin(2 * np.pi * f * (k + 1) * x) for k, h in enumerate(harm))
    return s * env(n, a, r)

def add(buf, t0, s, g=1.0):
    i = int(t0 * SR)
    if i >= len(buf): return
    s = s[: len(buf) - i]; buf[i : i + len(s)] += s * g

# ---------- música ----------
music = np.zeros(N)
BPM = 96; beat = 60 / BPM
# Lá menor → Fá → Dó → Sol (simpático, levemente melancólico)
prog = [(220.0, [261.6, 329.6]), (174.6, [220.0, 261.6]), (130.8, [196.0, 329.6]), (196.0, [246.9, 293.7])]
def groove(t0, t1, bright=False):
    t = t0
    k = 0
    while t < t1:
        bar = int(k // 4) % 4; root, chord = prog[bar]
        b = k % 4
        add(music, t, note(root / 2, beat * 0.9, r=0.18, harm=(1, .3)), 0.55)            # baixo
        if b in (1, 3):
            for c in chord: add(music, t, note(c, beat * 0.5, r=0.08, harm=(1, .2, .1)), 0.16)  # pluck
        if bright and b == 2: add(music, t, note(chord[-1] * 2, beat * 0.4, r=0.1), 0.10)
        sh = rng.standard_normal(int(0.05 * SR)) * env(int(0.05 * SR), 0.001, 0.015)        # shaker
        add(music, t + beat / 2, sh, 0.05)
        kick = np.sin(2 * np.pi * (55 + 60 * np.exp(-np.arange(int(.15 * SR)) / (.02 * SR))) * np.arange(int(.15 * SR)) / SR) * env(int(.15 * SR), .001, .06)
        if b in (0, 2): add(music, t, kick, 0.35)
        t += beat; k += 1
def tension(t0, t1):
    n = int((t1 - t0) * SR); x = np.arange(n) / SR
    s = (np.sin(2 * np.pi * 55 * x) + .5 * np.sin(2 * np.pi * 82.4 * x + .3) + .25 * np.sin(2 * np.pi * 110.3 * x)) * (0.7 + 0.3 * np.sin(2 * np.pi * 0.25 * x))
    fade = np.minimum(1, np.minimum(x / 1.0, (t1 - t0 - x) / 0.8)).clip(0, 1)
    add(music, t0, s * fade, 0.22)
for t0, t1, mode in cues["music"]:
    if mode == "tension": tension(t0, t1)
    else:
        seg = np.zeros(N); keep = music.copy(); music[:] = 0
        groove(t0, t1, bright=(mode == "rise"))
        i0, i1 = int(t0 * SR), min(N, int(t1 * SR)); m = np.zeros(N); m[i0:i1] = 1
        ramp_n = int(.4 * SR); m[i0:i0 + ramp_n] *= np.linspace(0, 1, ramp_n)
        m[max(i0, i1 - ramp_n):i1] *= np.linspace(1, 0, i1 - max(i0, i1 - ramp_n))
        music = keep + music * m

# ---------- SFX ----------
sfx = np.zeros(N)
def noise(d): return rng.standard_normal(int(d * SR))
def lp(x, a=0.05):
    y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)): acc += a * (x[i] - acc); y[i] = acc
    return y
def whoosh(d=0.45):
    n = int(d * SR); x = noise(d); w = np.sin(np.linspace(0, np.pi, n)) ** 2
    return lp(x, 0.12) * w * 3
def sweep(f0, f1, d, r=0.3):
    n = int(d * SR); f = np.geomspace(f0, f1, n); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env(n, .005, r)
def P(*xs):
    n = max(len(x) for x in xs); o = np.zeros(n)
    for x in xs: o[: len(x)] += x
    return o
LIB = {
    "whoosh": lambda: whoosh(),
    "thump": lambda: P(sweep(140, 45, .35, .12) * 1.4, lp(noise(.08), .3) * env(int(.08 * SR), .001, .02)),
    "boom": lambda: P(sweep(90, 30, 1.4, .5) * 1.5, lp(noise(.6), .03) * env(int(.6 * SR), .002, .25) * 2),
    "ding": lambda: note(1318.5, 1.0, .002, .35, (1, .4, .15)) * .8,
    "pling": lambda: P(note(1760, .6, .002, .2) * .6, note(2637, .5, .002, .15) * .3),
    "pop": lambda: sweep(500, 1100, .08, .03),
    "fail": lambda: np.concatenate([note(392, .16, r=.1), note(370, .16, r=.1), note(311, .5, r=.3)]) * .6,
    "tick": lambda: lp(noise(.02), .5) * env(int(.02 * SR), .0005, .004) * 1.5,
    "paper": lambda: lp(noise(.35), .4) * (np.abs(np.sin(np.linspace(0, 18, int(.35 * SR))))) * .9,
    "pencil": lambda: lp(noise(.7), .7) * (0.5 + 0.5 * np.sign(np.sin(np.linspace(0, 60, int(.7 * SR))))) * .35,
    "buzz": lambda: (np.sign(np.sin(2 * np.pi * 150 * np.arange(int(.35 * SR)) / SR)) * env(int(.35 * SR), .01, .5)) * .25,
    "crack": lambda: P(*[np.pad(noise(.03) * env(int(.03 * SR), .0005, .008) * 1.6, (int(k * .035 * SR), 0)) for k in range(5)]),
    "sting": lambda: P(*[note(f, 1.6, .01, .7, (1, .3)) for f in (220, 277.2, 329.6, 440)]) * .35,
}
for t, kind in cues["sfx"]:
    if kind == "ticks":  # [t, "ticks", dur, interval]
        continue
    add(sfx, t, LIB[kind]())
for c in cues.get("ticks", []):
    t0, dur, step = c
    t = t0
    while t < t0 + dur: add(sfx, t, LIB["tick"]()); t += step

# ---------- mix ----------
def grms(x):  # RMS com gate (só trechos ativos)
    b = int(.05 * SR); n = len(x) // b
    r = np.sqrt((x[: n * b].reshape(n, b) ** 2).mean(1)); thr = r.max() * 0.1
    return np.sqrt((r[r > thr] ** 2).mean())
vr = grms(voice)
MUSIC_DB, SFX_DB = cues.get("music_db", -9), cues.get("sfx_db", -8)
music *= vr * 10 ** (MUSIC_DB / 20) / max(grms(music), 1e-9)
sfx *= vr * 10 ** (SFX_DB / 20) / max(grms(sfx), 1e-9)
cap = 0.7 * np.abs(voice).max()
if np.abs(sfx).max() > cap: sfx *= cap / np.abs(sfx).max()
mix = voice + music + sfx
# ganho global pra média ≈ -19 dB (igual EP01–04) + limitador suave
mean_db = 20 * np.log10(np.sqrt((mix ** 2).mean()))
mix *= 10 ** ((cues.get("target_mean_db", -19) - mean_db) / 20)
lim = 10 ** (-1.5 / 20)
mix = np.where(np.abs(mix) > lim * 0.8, np.sign(mix) * (lim * 0.8 + (lim * 0.2) * np.tanh((np.abs(mix) - lim * 0.8) / (lim * 0.2))), mix)
pcm = (np.clip(mix, -1, 1) * 32767).astype(np.int16)
st = np.repeat(pcm[:, None], 2, axis=1)
import wave
with wave.open(out, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print(f"voz gated RMS {20*np.log10(vr):.1f} dB | música {MUSIC_DB} dB vs voz | sfx {SFX_DB} dB vs voz | média final {20*np.log10(np.sqrt((mix**2).mean())):.1f} dB | pico {20*np.log10(np.abs(mix).max()):.1f} dB")
