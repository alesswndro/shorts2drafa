---
name: rafa-shorts
description: Produz o próximo episódio da série de shorts animados "Rafa" (menino de 16 anos em Belém juntando R$ 1.800 pra evitar o despejo) — roteiro no formato da voz Sandro Dutra no ElevenLabs, storyboard cena a cena, vídeo em Remotion a partir do áudio do usuário, capas 9:16 e 3:4, voto "você decide" nos comentários e atualização da continuidade. Use quando o usuário falar em Rafa, próxima parte, parte N, episódio, storyboard ou roteiro da série, resultado do voto/enquete, mandar um áudio do Sandro, ou pedir pra gerar a narração.
---

# Série Rafa — produção de episódio

Fonte da verdade (LEIA ANTES de escrever qualquer coisa):
- `serie-rafa/estado.md` — onde a história parou: dia, dinheiro, prazo, meta, voto pendente, fios soltos.
- `serie-rafa/BIBLE.md` — personagens, linha do tempo, roteiros de todos os episódios.
- `serie-rafa/personagens.png` — ficha visual dos personagens (frames reais).
- `references/voz.md` — configuração exata do ElevenLabs e formato do texto com tags.
- `references/roteiro.md` — estrutura, retenção, voto, continuidade financeira, intenção dos personagens.
- `references/visual.md` — sistema visual, HUD (medidas exatas), capas, projeto Remotion, recursos prontos.
- `references/som.md` — trilha, efeitos e mixagem.
- `templates/storyboard.md` — formato do storyboard.

## Preferências do usuário (todas — valem sempre)
**Jeito de trabalhar**
- Responder em português. Ser sincero: não concordar com tudo; se uma ideia for fraca, dizer por quê e propor melhor.
- Quando o usuário pede uma mudança específica ("não mude nada além disso"), mudar SÓ aquilo.
- Toda preferência nova ou correção vira regra aqui (seção certa + Changelog). Salvar e dar push sempre.

**Marca**
- Perfil: **Fora do Roteiro** (o usuário voltou ao nome em 2026-11-25; antes estava "Só Mais uma História").
  Hashtag da marca: `#foradoroteiro`. Selo/avatar: "FORA DO ROTEIRO". Manter tudo consistente com esse nome.

**Entregas (sempre no chat)**
- Roteiro com tags: colar COMPLETO num bloco de código na resposta (pronto pra colar no ElevenLabs)
  + enviar `roteiro.md` com `SendUserFile`. Informar a duração estimada.
- Vídeo: enviar o MP4 + **capa 9:16 E capa 3:4**, sempre as duas, com `SendUserFile`.
- Descrição do post: padrão de `references/roteiro.md` (gancho + emoji + "Parte N 👇 No final, comenta A ou B!" + hashtags fixas).
  Nunca só salvar no repo e citar o caminho.
- **Recebeu o áudio → gera o vídeo direto**, sem perguntar. O usuário gera a voz ele mesmo no ElevenLabs
  e costuma mandar 2 takes (`..._v4.mp3` e `..._v4_1.mp3`). Só gerar narração pelo MCP se ele pedir.

**Roteiro**
- **BEM envolvente**: gancho na 1ª linha, ciclo aberto a cada ~10–15 s, viradas ("só que", "mas"),
  revelação emocional, cliffhanger. Nada de linha que só enche.
- **Duração-alvo: ~900 caracteres falados ≈ ~70 s. Não é limite — é alvo.** Tentar se aproximar dele;
  pode passar quando for a favor da história (EP05 final: 90 s). O que não pode é tempo tomado por
  futilidade: cada linha a mais tem que trazer tensão, emoção ou informação nova. Ao passar do alvo,
  dizer quanto passou e por quê. **Nunca cortar a ponto de a história perder o sentido** — nesse caso,
  passar do alvo é o certo (regra do usuário). Estimar: caracteres falados (sem tags) ÷ ~12,6 por segundo.
- **Abertura com o voto**: linha 1 = gancho; linha 2 = "Vocês escolheram: <opção>." + virada ("Só que...");
  linha 3 = recap pros novos ("Se você chegou agora: ..."). Nunca abrir com "vocês escolheram".
- **Voto obrigatório e narrado no final de TODOS os episódios, inclusive o último da temporada.** Nunca sair
  desse gancho: é o que gera comentário e foi o que deu visualização (regra do usuário). Nos COMENTÁRIOS (não enquete):
  `E agora, você decide:` / `A: ...` / `B: ...` / `Comenta aí: A ou B.` — na tela "COMENTA AÍ: A OU B? ↓".
- **Opções nada óbvias, cada uma com o próprio custo explícito** (modelo do usuário:
  "faz tudo sozinho com muito esforço" vs "faz com os meninos e divide o lucro").
- **O Rafa ajuda porque quer.** Ele decide, se cobra e insiste. A mãe/adultos nunca impõem meta nem cobram;
  a mãe sente culpa, protege (escola, futuro) e apoia ("então a gente faz junto"). Fala de adulto que soe
  como chefe, cobrança ou castigo → reescrever.

**Visual e som**
- **HUD idêntico ao original** — componente `Hud` com as medidas de `references/visual.md`. Não mexer.
- **Câmera sempre se movendo devagar** (zoom suave, deslize leve, paralaxe) — nada parado, nada exagerado.
- Efeito/drone tenso **só onde a cena pede** (picos dramáticos curtos); no resto, trilha normal (`references/som.md`).
- Voz do Sandro nunca é editada nem re-cronometrada; a imagem se ajusta à voz.

## Fluxo
1. **Estado.** Leia `estado.md`. Voto pendente sem resultado informado → pergunte. Nunca invente o vencedor.
2. **Conta.** `meta = ceil((1800 - guardado) / dias_restantes)`; `atraso = dia × 60 - guardado`.
3. **Ideia** em 3–5 linhas (gancho, obstáculo, virada, cliffhanger, voto A/B com custos). Crítica sincera.
4. **Roteiro** em `serie-rafa/episodios/epNN/roteiro.md` (formato de `references/voz.md`). Entregar no chat.
5. **Storyboard** em `serie-rafa/episodios/epNN/storyboard.md` (template).
6. **Áudio chegou → vídeo** (ver `references/visual.md` e `references/som.md`):
   1. Rodar `tools/align.py` nos dois takes. **Escolher o take cujas pausas caem na pontuação do começo ao fim**
      (segmentos com duração coerente com o texto). Explicar a escolha em 1 linha.
   2. Copiar pra `remotion/public/epNN/voz.mp3`, gerar `align.json`, copiar pra `src/epNN/align.json`.
      Se um trecho de fala contínua ficou mal dividido, redistribuir as palavras dele por sílabas.
   3. Escrever/atualizar `src/epNN/EpNN.tsx` (cenas por tempo; legendas `CHUNKS` por índice de palavra;
      balões nas falas entre aspas; voto com cartões entrando na fala de cada opção).
   4. `cues.json` + `tools/sound.py` → `mix.wav`.
   5. Stills de todas as cenas (`npx remotion still`) → olhar → corrigir (nada vazio, nada sob o HUD).
   6. Render completo + capas (`EPNN-capa-9x16`, `EPNN-capa-3x4`, frame 40).
   7. QA: duração, `freezedetect` (nenhum trecho parado ≥ 0,6 s), volume (média ≈ -19 dB, pico ≤ -1,5 dB).
   8. Enviar MP4 + 2 capas no chat.
   - **Mudança só de áudio**: regenerar `mix.wav` e renderizar de novo pelo Remotion (frames idênticos).
     Não remuxar com `ffmpeg -shortest` (corta frames do fim) nem recodificar AAC sem limitador.
7. **Continuidade** (obrigatório): `estado.md` (números, voto pendente, fios soltos) e `BIBLE.md`
   (linha do tempo + roteiro final + personagens novos). Personagem novo → atualizar `personagens.png`.
8. Commit + push no branch de trabalho.

## Regras de série
- Voz: Sandro Dutra `qPfM2laM0pRL4rrZtBGl`, `eleven_v4`, stability 0.40, similarity 0.75. Nunca outra voz.
- Números batem com os episódios anteriores (dinheiro, dias, preços por entrega, horários).
- Rafa é menor de idade: perigo real mas nunca glamourizado (sem fuga da polícia, sem risco de vida gratuito).
- Linguagem paraense leve e natural ("tu", "menino", "lá do outro lado do canal") — sem caricatura.

## Changelog
- 2026-11-24 — Skill recriada a partir dos MP4 finais EP01–EP04 e do flow "Rafa EP1 narração".
  Roteiros EP03/EP04 reconstruídos pelas legendas (tags perdidas). Meta diária passa a ser recalculada na tela.
  Voto EP04: **A — contar pra mãe**.
- 2026-11-24 — Roteiro com tags e mídias sempre entregues no chat (bloco de código + SendUserFile).
- 2026-11-24 — ~~Vídeo no máximo 70 s / narração ≤ 900 caracteres~~ (substituído em 2026-11-25).
- 2026-11-24 — Escolha do final obrigatória e narrada. Voz: stability 0.40 / similarity 0.75 (do nome do arquivo).
  Áudio recebido → gerar vídeo.
- 2026-11-24 — Projeto Remotion recriado em `remotion/` (código original perdido): personagens SVG, HUD,
  legendas, balões, voto, cenários; `tools/align.py` (alinhamento sem ASR) e `tools/sound.py` (trilha/SFX/mix).
- 2026-11-25 — HUD refeito idêntico ao original (medido pixel a pixel). Sempre enviar capa 9:16 + 3:4.
- 2026-11-25 — Opções do voto menos óbvias, cada uma com custo explícito.
- 2026-11-25 — Roteiro BEM envolvente; 70 s é referência, não teto; abrir citando a opção vencedora + recap.
- 2026-11-25 — O Rafa ajuda por vontade própria; adultos protegem, não cobram (EP05 v6).
- 2026-11-25 — Voto nos comentários: "Comenta aí: A ou B." / "COMENTA AÍ: A OU B? ↓".
- 2026-11-25 — Drone tenso só nos picos dramáticos; resto com trilha normal (EP05: 24,8–30,3 s e 48,3–55,3 s).
  EP05 final entregue: 90 s, voz take sem sufixo (87,3 s).
- 2026-11-25 — Esclarecido pelo usuário: ~900 caracteres/~70 s é ALVO, não limite. Aproximar-se dele; passar
  só a favor da história, nunca com futilidades.
- 2026-11-25 — Padrão de descrição do post definido a partir dos prints do EP01–04 (EP03/04 = modelo).
- 2026-11-25 — Marca unificada: perfil volta a se chamar "Fora do Roteiro" (= hashtag #foradoroteiro).
- 2026-11-26 — Voto EP05 = A. Arco 2: o Rafa empreende com geladinho, arco enxuto (EP06–EP10) com saltos de tempo.
  Reforço do usuário: escolha A/B no final de TODOS os episódios (gera comentário/views).
- 2026-11-26 — EP06 v2: o voto acontece na tela antes da virada; a ideia nasce do que o Rafa vê. Passar do alvo
  de tempo é ok quando cortar deixaria a história sem sentido.
- 2026-11-26 — Regra do usuário: movimento de câmera lento e sutil em todas as cenas (nada travado, nada exagerado).
