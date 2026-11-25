# Voz — ElevenLabs

| Campo | Valor |
|---|---|
| Voz | Sandro Dutra |
| voice_id | `qPfM2laM0pRL4rrZtBGl` |
| Modelo | `eleven_v4` |
| output_format | `mp3_44100_128` |
| stability | **0.40** (s40) |
| similarity_boost | **0.75** (sim75) |
| style / speed | padrão |
| pronunciation dictionary | nenhum |
| Flow de referência | "Rafa EP1 narração" — `eU2Cyd4ERiMzj7afDQ6E` |

Chamada MCP:
```
creative_generate_speech(voice_id="qPfM2laM0pRL4rrZtBGl", model_id="eleven_v4", text=<roteiro>, generations_count=1)
```
Depois: `creative_get_flow_run_status` até `all_completed`. Crie/reaproveite um flow chamado
"Rafa EPNN narração" (`creative_create_flow`) pra manter organizado.

Recuperado do nome do arquivo que o usuário exporta: `..._Sandro_Dutra_-_Articulated_and_Clear_pvc_s40_sim75_v4.mp3`.
O usuário costuma gerar 2 takes e mandar os dois.

## Formato do texto
- Uma frase (ou meia frase) por linha — a quebra de linha vira respiro.
- Audio tags em **inglês**, entre colchetes, no começo da frase que muda de emoção. A tag vale até a próxima.
  Usadas na série: `[warmly] [excited] [softly] [curious] [sighs] [nervous] [dramatically] [shouting] [pause] [short pause]`.
  Não encher de tag: 1 a cada 2–4 linhas.
- Falas de personagem entre aspas duplas. O Sandro narra todas as vozes (não tem elenco).
- Ênfase: CAIXA ALTA numa palavra ("R$ 60. POR DIA.").
- Suspense: reticências ("Bateu na porta...").
- Valores sempre como "R$ 1.800", "R$ 6" — o v4 lê certo.
- Horas por extenso quando faladas ("às 5 da manhã", "7 e 40").
- Ritmo do Sandro: 12,6–13,2 caracteres falados/s (tags não contam; varia por take — o EP05 v7 saiu mais lento:
  1.097 caracteres → 87 s). Duração ≈ `sed -E 's/\[[^]]*\] ?//g' roteiro.txt | wc -m` ÷ 12,6 (estimativa
  conservadora). Alvo: ~900 caracteres falados ≈ ~70 s — aproximar-se; passar só a favor da história.
- Letras das opções do voto ("A:", "B:") no começo da linha: o v4 lê bem. Se soletrar estranho, usar "Opção A:".
- Escolha do take: rodar `align.py` nos dois e ficar com o que tem pausas nas pontuações do começo ao fim.

## Não usar
- `VtMklhKDP2Y2mBvBbLwL` — voz de outro projeto (El Niño).
