# Som — trilha, efeitos e mixagem

Ferramenta: `remotion/tools/sound.py voz.mp3 cues.json mix.wav` (sintetiza trilha + SFX e mixa).
`cues.json`: `{"duration": s, "music": [[t0, t1, modo], ...], "sfx": [[t, tipo], ...], "ticks": [[t0, dur, passo], ...]}`.

## Regras (preferências do usuário)
- **Voz intocada**: nunca editar, cortar ou re-cronometrar a voz do Sandro. Só um ganho global no mix final.
- **Drone tenso (`"tension"`) só onde a cena pede** — picos dramáticos curtos (~5–7 s cada), no máximo 2–3
  por episódio. Ex. EP05: "Ela não gritou. Não chorou. Só abriu a bolsa..." (24,8–30,3 s) e
  "R$ 215 de atraso" + comemoração que racha (48,3–55,3 s).
- **No resto, trilha normal** (`"groove"`). Diálogo afetivo, explicação, montagem, conta no caderno:
  sem drone. Antes de colocar tensão, perguntar: "a cena é um soco ou uma revelação?" Se não, groove.
- Final do episódio (rua + voto): `"rise"` (groove com brilho) + `sting` no "E agora, você decide".

## Modos de música
- `groove` — trilha leve (Lá m → Fá → Dó → Sol, 96 BPM: baixo, pluck, shaker, kick).
- `tension` — drone grave (55/82/110 Hz) pulsando.
- `rise` — groove com nota aguda extra.

## Efeitos (`sfx`)
`whoosh` (corte de cena, cartão entrando) · `thump` (carimbo, impacto leve, caderno fechando) ·
`boom` (revelação grande: R$ 215) · `ding` (acerto, ✓, meta nova) · `pling` (ideia, "!") · `pop` (ícone/cartão) ·
`fail` (deu errado: "não dá", cartão do voto ficando cinza) · `tick`/`ticks` (relógio) · `paper` (folha) ·
`pencil` (escrita) · `buzz` (celular vibrando) · `crack` (vidro rachando) · `sting` (abertura do voto).

## Níveis
- Trilha −9 dB e SFX −8 dB abaixo da voz (RMS com gate). Pico de SFX limitado a 0,7× o pico da voz.
- Ganho global pra média ≈ −19 dB e limitador em −1,5 dB (mesmo nível dos EP01–04).
- Conferir no MP4 final: `ffmpeg -i out.mp4 -af volumedetect -f null -` → média ≈ −19 dB, pico ≤ −1,5 dB.
