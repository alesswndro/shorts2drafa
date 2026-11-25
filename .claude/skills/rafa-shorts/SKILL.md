---
name: rafa-shorts
description: Produz o próximo episódio da série de shorts animados "Rafa" (menino de 16 anos em Belém juntando R$ 1.800 pra evitar o despejo) — roteiro no formato da voz Sandro Dutra no ElevenLabs, storyboard cena a cena, narração, enquete "você decide" e atualização da continuidade. Use quando o usuário falar em Rafa, próxima parte, parte N, episódio, storyboard ou roteiro da série, resultado de enquete, ou pedir pra gerar a narração do Sandro.
---

# Série Rafa — produção de episódio

Fonte da verdade (LEIA ANTES de escrever qualquer coisa):
- `serie-rafa/estado.md` — onde a história parou: dia, dinheiro, prazo, enquete pendente, fios soltos.
- `serie-rafa/BIBLE.md` — personagens, roteiros anteriores, linguagem visual.
- `references/voz.md` — configuração exata do ElevenLabs e formato do texto.
- `references/roteiro.md` — estrutura e regras de roteiro.
- `references/visual.md` — sistema visual / Remotion.
- `templates/storyboard.md` — formato do storyboard.

## Fluxo

1. **Estado.** Leia `estado.md`. Se houver enquete pendente e o usuário não disse o resultado, pergunte. Não invente o vencedor.
2. **Conta.** Recalcule a meta: `meta = ceil((1800 - guardado) / dias_restantes)` e o atraso:
   `atraso = (dia_atual × 60) - guardado`. Use esses números no episódio — a pressão financeira é o motor da série.
3. **Ideia.** Proponha o episódio em 3–5 linhas (gancho, obstáculo, virada, cliffhanger, enquete A/B).
   Seja crítico: se a ideia for fraca, diga. Espere o OK do usuário só se ele pediu pra aprovar antes;
   caso contrário, siga e marque o que é decisão sua.
4. **Roteiro** em `serie-rafa/episodios/epNN/roteiro.md`, no formato de `references/voz.md`
   (**máx. 900 caracteres**, uma frase por linha, audio tags em inglês). Confira com `wc -m`.
5. **Storyboard** em `serie-rafa/episodios/epNN/storyboard.md` seguindo o template:
   cena a cena com tempo estimado, narração, chunks de legenda com cor, visual, HUD, SFX.
   Também título da capa e texto da enquete.
6. **Narração** (só se o usuário pedir — gasta créditos): ElevenLabs `creative_generate_speech`,
   config de `references/voz.md`, 1 take (`generations_count: 1`). Nunca re-chamar pra "tentar de novo"
   sem o usuário pedir. Salve o flow_id no `estado.md`.
7. **Vídeo** (sempre que o usuário mandar o áudio — ver `references/visual.md`):
   escolher o take (mais pausas = alinhamento melhor; justificar) → copiar pra `remotion/public/epNN/voz.mp3` →
   `align.py` → conferir se as pausas caem na pontuação → escrever `src/epNN/EpNN.tsx` seguindo o storyboard →
   `cues.json` + `sound.py` → stills de cada cena e corrigir → render → conferir duração ≤ 70 s → enviar MP4 no chat.
8. **Atualize a continuidade** (obrigatório ao final):
   - `estado.md`: novo dia/dinheiro/prazo/meta, enquete nova pendente, fios soltos.
   - `BIBLE.md`: linha na tabela da linha do tempo + roteiro final + personagens novos.
   - Se aprendeu algo sobre o processo (feedback do usuário, erro, preferência), registre em
     `references/` e no **Changelog** abaixo. Esta skill evolui a cada episódio.
9. Commit + push no branch de trabalho.

## Regras que não se negociam
- **Capas: sempre mandar a 9:16 E a 3:4** junto com o vídeo (SendUserFile).
- **HUD idêntico ao original** — usar o componente `Hud` sem alterar medidas (ver `references/visual.md`).
- **Recebeu o áudio do usuário → gere o vídeo (sempre).** Não perguntar; escolher o take (justificar),
  alinhar legendas, renderizar e enviar o MP4 no chat.
- **Duração MÁXIMA 1min10s (70 s), sempre**, contando capa e enquete. Narração ≤ 900 caracteres
  (Sandro ≈ 14,7 caracteres/s → ~61 s + ~6 s de enquete). Ritmo sem enrolação: corte frase que repete
  informação, frase que só descreve o que a imagem já mostra, e transição "e aí, então".
- **SEMPRE entregar no chat** (pedido do usuário): toda vez que escrever ou revisar o texto com audio tags,
  colar o roteiro completo num bloco de código na resposta, pronto pra copiar no ElevenLabs,
  E enviar o arquivo `roteiro.md` com `SendUserFile`. Toda vez que renderizar vídeo, áudio ou capa,
  enviar o arquivo com `SendUserFile` (MP4/MP3/PNG). Não basta salvar no repo e citar o caminho.
- Voz: Sandro Dutra `qPfM2laM0pRL4rrZtBGl`, modelo `eleven_v4`. Nunca outra voz sem o usuário pedir.
- Números batem com episódios anteriores (dinheiro, dias, preços por entrega, horários).
- Todo episódio termina com cliffhanger + **enquete narrada pelo Sandro** (última fala do roteiro) + "PARTE N+1: VOCÊ DECIDE" com 2 opções **igualmente tentadoras
  e com custo real**. Se uma opção é obviamente a "certa", a enquete é fraca — reescreva.
- Rafa é menor de idade: o perigo é real mas nunca glamourizado (sem fuga da polícia, sem risco de vida gratuito).
- Linguagem paraense leve e natural ("tu", "menino", "lá do outro lado do canal") — sem caricatura.

## Changelog
- 2026-11-24 — Skill recriada a partir dos MP4 finais EP01–EP04 e do flow "Rafa EP1 narração".
  Roteiros EP03/EP04 reconstruídos pelas legendas (tags perdidas). Regra nova: meta diária recalculada
  na tela (antes ficava fixa em R$ 60, escondendo o atraso). Resultado da enquete EP04: **A — contar pra mãe**.
- 2026-11-24 — Regra do usuário: roteiro com tags e qualquer vídeo/áudio gerado SEMPRE enviados no chat
  (bloco de código + SendUserFile), nunca só salvos no repo.
- 2026-11-24 — Regra do usuário: vídeo no MÁXIMO 70 s, sem ficar maçante. EP01 (72 s) e EP02 (86 s)
  passaram do limite. Narração ≤ 900 caracteres. EP05 cortado de 1.259 → 879.
- 2026-11-24 — Regra do usuário: a escolha do final é OBRIGATÓRIA no roteiro (narrada, não só visual).
  Esquecida no EP05 v2; corrigido na v3 (867 caracteres).
- 2026-11-24 — Voz: stability 0.40 / similarity 0.75 (do nome do arquivo). Regra: áudio recebido → gerar vídeo.
- 2026-11-25 — HUD refeito idêntico ao original (medido pixel a pixel). Regra: sempre enviar capa 9:16 + 3:4.
- 2026-11-25 — Regra do usuário: opções da enquete menos óbvias, cada uma com seu custo explícito
  (ex.: "sozinho, com muito esforço" vs "com os meninos, dividindo o lucro").
