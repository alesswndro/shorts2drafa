# Voz — ElevenLabs

| Campo | Valor |
|---|---|
| Voz | Sandro Dutra |
| voice_id | `qPfM2laM0pRL4rrZtBGl` |
| Modelo | `eleven_v4` |
| output_format | `mp3_44100_128` |
| stability / similarity / style / speed | padrão (não alterar) |
| pronunciation dictionary | nenhum |
| Flow de referência | "Rafa EP1 narração" — `eU2Cyd4ERiMzj7afDQ6E` |

Chamada MCP:
```
creative_generate_speech(voice_id="qPfM2laM0pRL4rrZtBGl", model_id="eleven_v4", text=<roteiro>, generations_count=1)
```
Depois: `creative_get_flow_run_status` até `all_completed`. Crie/reaproveite um flow chamado
"Rafa EPNN narração" (`creative_create_flow`) pra manter organizado.

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
- Tamanho: **máx. 900 caracteres** (≈ 14,7 caracteres/s → ~61 s + enquete ≈ 67 s). Limite duro do vídeo: 70 s.
  Medir com `wc -m` só no texto (dentro do bloco de código).

## Não usar
- `VtMklhKDP2Y2mBvBbLwL` — voz de outro projeto (El Niño).
