# Sistema visual

## Render
- Remotion 4.0.543 · 1080x1920 · 30 fps · H.264 + AAC 48 kHz estéreo.
- Capa extra 1080x1440 (3:4) pro feed.
- O código original dos EP01–EP04 se perdeu. **A partir do EP05 o projeto está em `remotion/`** (recriado):
  - `src/components/Person.tsx` — personagens em SVG (Rafa, Mãe, Kauã, Biel, Duda, Bike). Corpo genérico `Person`
    com chapéu/cabelo/roupa/expressão/olhar/piscar; cada personagem é um preset.
  - `src/components/ui.tsx` — HUD, legenda, balão, capa (TitleCard), enquete (Poll), Sunburst, ClockPill.
  - `src/components/sets.tsx` — cenários (cozinha à noite, cozinha do trabalho, porta do despejo, caderno, rua).
  - `src/epNN/EpNN.tsx` — o episódio: cenas por tempo absoluto, legendas por blocos de palavras (`CHUNKS`).
  - `tools/align.py` — alinha roteiro ao áudio (sem ASR): `python3 tools/align.py voz.mp3 roteiro.txt align.json`.
  - `tools/sound.py` — trilha + SFX sintetizados e mix: `python3 tools/sound.py voz.mp3 cues.json mix.wav`.
  - Render: `npx remotion render EPNN out/rafa-epNN.mp4 --codec=h264 --crf=18 --audio-codec=aac --audio-bitrate=192k`
    (navegador: `/opt/pw-browsers/chromium_headless_shell`, em `remotion.config.ts`).
  - Conferir antes: `npx remotion still EPNN out/stills/x.jpg --frame=N` em cada cena.
- Mix: voz intocada na frente; trilha -9 dB e SFX -8 dB abaixo da voz (RMS com gate); ganho global pra média ≈ -19 dB,
  limitador em -1.5 dB (igual EP01–04).
- Checar a capa antes de publicar (a capa 9:16 do EP4 saiu com faixa cinza de ~60 px no topo).

## Estilo
- Cartoon flat vetorial, contorno escuro grosso (~#1E1B26), olhos grandes brancos, bochechas rosadas.
- Cenários: casas coloridas de madeira de Belém, árvores com frutinhas, chuva em diagonal, Ver-o-Peso
  (torres azuis), palafitas no canal, oficina, farmácia verde, escola amarela.
- Fonte condensada bold (Oswald/Bebas), CAIXA ALTA, stroke escuro.

## Legendas
- 1–3 palavras por vez, sincronizadas com a narração, posição livre (acima do personagem).
- Cores de destaque: amarelo #F5C431 (nomes/lugares), vermelho #FF5A5F (problema/perigo),
  verde #5BE08A (dinheiro/solução). Resto branco.
- Falas de personagem: balão branco com texto preto, não legenda.

## HUD (do 1º corte em diante)
`BELÉM · DIA N` | `$ GUARDADO R$ xx,00` (verde) | `⌂ DESPEJO N DIAS` (roxo; pisca vermelho em momentos de tensão)
+ pill escura `◎ META: R$ xx/DIA` (amarela). Contador de dinheiro anima ao mudar.

## Recursos recorrentes
Cronômetro grande (15:00) · relógio pill (5:20) · tela verde com sunburst + valor gigante ·
chip "+ R$ X" com moeda · "HA HA" flutuando · chip "DIA 3 → DIA 4" · calendário de novembro com X ·
caderno pautado com rota desenhada · checklist "O QUE ELE APRENDEU" · palavra riscada e substituída ·
cartões numerados 1/2/3 com fundo colorido · placa/aviso com valor em carimbo vermelho.

## Encerramento
Cena escurece → pill vermelha "PARTE N+1: VOCÊ DECIDE" → "O QUE O RAFA DEVE FAZER?" →
cartão A (círculo laranja) entra → cartão B (círculo azul-petróleo) entra → "VOTA NA ENQUETE ↓" amarelo.

## Ficha de personagens
`serie-rafa/personagens.png` — recortes reais dos EP01–EP04. Usar como referência de modelo.
Gerada por script a partir dos MP4 (frames: EP1 20s mãe/Rafa · EP2 20s Socorro · EP2 66s Raimundo+filha ·
EP3 54s Bené · EP4 16s açaí · 22s peixeiro · 43s diretora · 1s figurantes). Atualizar a cada personagem novo.
Atenção: Dona Socorro e Diretora são parecidas (senhora, cabelo grisalho, óculos) — diferenciar por cenário/roupa.
