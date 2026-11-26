# Sistema visual

## Render
- Remotion 4.0.543 · 1080x1920 · 30 fps · H.264 + AAC 48 kHz estéreo.
- **Capas: SEMPRE entregar as duas** — 9:16 (1080x1920) e 3:4 (1080x1440) — compositions `EPNN-capa-9x16` e
  `EPNN-capa-3x4` (`src/epNN/Cover.tsx`), still no frame 40. Título em cima, personagem embaixo, sem HUD/legenda.
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
- Som e mix: ver `references/som.md` (drone tenso só nos picos dramáticos).
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

## HUD — IDÊNTICO ao original (medido pixel a pixel no EP04, não mexer)
Implementado em `remotion/src/components/ui.tsx` (`Hud`, `MetaPill`). Valores em px num frame 1080x1920:
- 3 cartões, y 170–309 (140 px), borda 8 px `#1E1B28`, raio 22, fundo `#FAF7F0`:
  BELÉM x 32–327 · GUARDADO x 338–681 · DESPEJO x 692–1047 (vão de 10 px).
- Ícone 96x96 a 11 px da borda interna (x 51, y 192), borda 6 px, raio 20, glifo branco:
  relógio teal `#2F7E8E` · "$" verde `#1F9C54` · casa roxo `#7A4EC9` (alerta: `#D93A3F`).
- Rótulo Oswald 500 27,5 px cinza `#8F82A1` (topo da maiúscula em y 209); valor Oswald 700 45 px
  (maiúscula y 246–281), x 165. Valor do GUARDADO em verde `#1F9C54`.
- Meta: pílula x 304–775, y 324–407 (84 px), anel 6 px amarelo `#F5C13A`, fundo `#1D1B25`, ícone ◎ 45 px,
  texto Oswald 700 42 px letter-spacing 1,2 (x 410–713). Alerta: vermelho `#FF5A5F`.
- Entrada: cartões aparecem em sequência (DIA → GUARDADO → DESPEJO) e a meta por último.
- Nada de conteúdo (balão, legenda, caderno) acima de y ≈ 430 enquanto o HUD está na tela.
- O HUD é escondido na capa e na enquete final.

## Recursos recorrentes
Cronômetro grande (15:00) · relógio pill (5:20) · tela verde com sunburst + valor gigante ·
chip "+ R$ X" com moeda · "HA HA" flutuando · chip "DIA 3 → DIA 4" · calendário de novembro com X ·
caderno pautado com rota desenhada · checklist "O QUE ELE APRENDEU" · palavra riscada e substituída ·
cartões numerados 1/2/3 com fundo colorido · placa/aviso com valor em carimbo vermelho.

## Encerramento
Cena escurece → pill vermelha "PARTE N+1: VOCÊ DECIDE" → "O QUE O RAFA DEVE FAZER?" →
cartão A (círculo laranja) entra → cartão B (círculo azul-petróleo) entra → "COMENTA AÍ: A OU B? ↓" amarelo (voto nos comentários, não enquete).

## Ficha de personagens
`serie-rafa/personagens.png` — recortes reais dos EP01–EP04. Usar como referência de modelo.
Gerada por script a partir dos MP4 (frames: EP1 20s mãe/Rafa · EP2 20s Socorro · EP2 66s Raimundo+filha ·
EP3 54s Bené · EP4 16s açaí · 22s peixeiro · 43s diretora · 1s figurantes). Atualizar a cada personagem novo.
Atenção: Dona Socorro e Diretora são parecidas (senhora, cabelo grisalho, óculos) — diferenciar por cenário/roupa.

## Recursos criados no EP05 (reutilizáveis em `src/ep05/Ep05.tsx`)
- `VoteRecap` — "VOCÊS ESCOLHERAM" + cartão da opção vencedora com ✓; virada com celular/elemento entrando
  e cartão ficando cinza ("só que...").
- `CelebrationCrack` — tela verde de dinheiro que racha como vidro e perde a cor (comemoração que vira derrota).
- `MetaSwap` — pílula da meta vem pro centro, número riscado → novo valor, volta pra posição exata do HUD.
- `PaperUnfold`, `Write` (escrita à mão revelada), polaroids caindo, mãos dadas na mesa, grade de entregas
  que fica cinza, relógio correndo (`clock`).
- Caderno do Rafa: caneta azul, fonte Caveat. Letra de outra pessoa: cor/rotação diferentes.

## Movimento de câmera (regra do usuário, 2026-11-26)
- **Nenhum plano totalmente parado.** Toda cena tem movimento lento e contínuo — sutil, nada exagerado:
  - zoom suave de 3–8% ao longo da cena (in ou out, alternando entre cenas);
  - deslize lateral/vertical leve (20–60 px ao longo da cena), com easing;
  - paralaxe: cenário se move um pouco menos que os personagens (sensação de profundidade);
  - personagens sempre "vivos": respiração/bob, piscar, olhar mudando nas falas.
- Cortes com micro-pop (escala 1,05 → 1 em 5 frames) — já no componente `Scene`.
- Evitar: tremida fora de impacto, rotação, zoom rápido, movimento que distraia da legenda.
- QA: `freezedetect` não pode achar trecho parado ≥ 0,6 s (exceto o voto final segurando, que também tem zoom lento).

## Recursos criados no EP06
- `src/components/scene.tsx` — **use em todo episódio novo**: `Scene` (zoom lento + deslize `pan` + micro-pop),
  `Par` (paralaxe por profundidade), `At`, `Write`, `makeCaptions(W, CHUNKS, capY)`.
- `src/components/sets2.tsx` — `VerOPeso` (madrugada/dia), `SchoolGate` (portão abre), `RoadRush` (rua passando),
  `RafaBike` (Rafa pedalando com caixa térmica, suor), ícones `Fish`, `Ice`, `Acai`, `Geladinho`, `PolpaSack`.
- `Person`: chapéu `straw` e `apron`; preset `SenhoraGeladinho`.
- `TitleCard` aceita `bigSize` (texto grande longo, ex.: "9 ENTREGAS" = 205).
- Contador de entregas com "+ R$ X" subindo e HUD somando em tempo real.

## Bicicleta e Rafa pedalando (redesenho pedido pelo usuário, 2026-11-26)
- `src/components/BikeRide.tsx` — **padrão daqui pra frente**:
  - `RafaRiding` — Rafa SENTADO de perfil (como nos EP01–04): tronco inclinado, braço no guidão, boné vermelho
    pra trás, mochila laranja nas costas, pernas por cinemática inversa acompanhando o pedal, rodas girando,
    linhas de velocidade. Props: `width`, `expr`, `blink`, `sweat`, `cooler` (caixa térmica no bagageiro), `speed`
    (0 = parado; ~0,15 = chegando/freando; 1–1,3 = pedalando forte).
  - `BikeFrame` — a bike sozinha (quadro azul `#3C86D6` com contorno escuro, pneus pretos grossos, aro cinza, 8 raios).
  - `Bike` (em `Person.tsx`) agora usa o `BikeFrame` — bike parada (crianças etc.).
- `RafaBike` (em `sets2.tsx`) embrulha o `RafaRiding` numa caixa de altura `largura × 760/520`, com a bike embaixo.
  Tamanho bom: 700–780 px de largura em plano médio; ~420 px atravessando a tela.
- A bike antiga (Rafa em pé atrás da bike) foi descartada: ficou ruim.

