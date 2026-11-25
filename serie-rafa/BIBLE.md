# Série "Rafa" — Bible recuperada (EP01–EP04)

Recuperado em 2026-11-24 a partir dos MP4 finais + flows do ElevenLabs.
Processo de produção: skill `.claude/skills/rafa-shorts`. Estado atual: `serie-rafa/estado.md`.

## Voz (ElevenLabs)
- Voz: **Sandro Dutra** — `voice_id: qPfM2laM0pRL4rrZtBGl` (professional, pt-BR, jovem, narrative_story)
- Modelo: **eleven_v4**
- Output: `mp3_44100_128`
- Stability / similarity / style: **padrão** (nenhum override salvo nos nós)
- Sem pronunciation dictionary
- Flow de referência: "Rafa EP1 narração" (`eU2Cyd4ERiMzj7afDQ6E`) — contém roteiros EP1 e EP2
- Formato do roteiro: uma frase por linha, audio tags em inglês entre colchetes no começo da frase
  (`[warmly] [excited] [softly] [curious] [sighs] [nervous] [dramatically] [shouting] [pause] [short pause]`),
  falas de personagem entre aspas, ênfase com CAIXA ALTA ("R$ 60. POR DIA."), reticências pra suspense.
- Tamanho: ~1.050–1.260 caracteres → 55–85 s de vídeo.
- NÃO usar a voz `VtMklhKDP2Y2mBvBbLwL` (flow do El Niño, outro projeto).

## Técnico
- Remotion 4.0.543, 1080x1920, 30 fps, H.264 + AAC 48 kHz estéreo
- Mixagem final: média ≈ -19 dB, pico ≈ -3.5 dB (voz + trilha + SFX)
- Capa extra 1080x1440 (3:4) pro feed. ⚠️ capa 9:16 do EP4 tem uma faixa cinza de ~60 px no topo (bug).

## Linguagem visual
- Cartoon flat vetorial, contorno escuro grosso (~#1E1B26), bochechas rosadas, olhos grandes brancos.
- Fonte condensada bold (estilo Oswald/Bebas), legendas em CAIXA ALTA com stroke escuro.
- Legenda: 1–3 palavras por vez; palavras-chave coloridas — amarelo #F5C431 (nomes/lugares),
  vermelho #FF5A5F (perigo/problema), verde #5BE08A (dinheiro/solução). Posição varia por cena.
- **Abertura**: pill vermelha "PARTE N" + número-gancho gigante + linha branca + linha colorida.
- **HUD fixo** (a partir da 1ª cena): `BELÉM · DIA N` | `GUARDADO R$ xx,00` (verde) | `DESPEJO N DIAS` (roxo, pisca vermelho)
  + pill `META: R$ 60/DIA`.
- Recursos recorrentes: cronômetro/relógio, tela verde com sunburst p/ contador de dinheiro ("R$ 43"),
  "+ R$ 18" chip de moeda, balão de fala p/ diálogos, "HA HA" flutuando, chip "DIA 3 → DIA 4",
  calendário de novembro com X, caderno com rota desenhada, checklist "O QUE ELE APRENDEU",
  palavra riscada (PROBLEMA → FERRAMENTA), cartões numerados "1, 2, 3" de entrega.
- **Final**: escurece + "PARTE N+1: VOCÊ DECIDE / O QUE O RAFA DEVE FAZER?" + cartão A (círculo laranja)
  e B (círculo azul-petróleo) + "VOTA NA ENQUETE ↓".

## Personagens
- **Rafa (Rafael)**, 16 — boné vermelho virado, mochila de entrega laranja, camiseta azul-petróleo, suspensório, bermuda azul, bicicleta azul velha.
- **Mãe** — lenço roxo na cabeça, blusa rosa/salmão. Chega do trabalho às 22h. "Fingiu que não viu" o caderno (EP1).
- **Dona Socorro** — Farmácia Socorro, cabelo branco, óculos, jaleco. Paga R$ 6/entrega.
- **Seu Raimundo** (casa azul nº 40, outro lado do canal) + filha (deu R$ 5 de gorjeta).
- **Seu Bené** — Oficina do Bené, boné laranja, barba branca, macacão azul. Deu a corrente e a caixa térmica.
- **Feirante do açaí** (bandana amarela), **peixeiro** (careca, bigode) — Ver-o-Peso.
- **Diretora** — coque grisalho, óculos, celular na mão. Escola Estadual.

## Linha do tempo / estado
| EP | Dia | Guardado | Despejo | Gancho final / enquete |
|---|---|---|---|---|
| 1 "R$ 12 pra salvar a casa" | 1 | R$ 12 | 30 | Dona Socorro: "remédio em 15 min!" |
| 2 "15 minutos pra entregar a insulina" | 2 | R$ 25 (+8 +5 gorjeta) | 29 | Corrente estourou no meio da ladeira |
| 3 "R$ 35 que ele não tinha" | 3→4 | R$ 43 (+18, 3 entregas) | 27 | Enquete: A) caixa pro Ver-o-Peso às 5h / B) só farmácia |
| 4 "6 entregas antes da escola" | 5 | R$ 85 (+42, 6×R$7) | 26 | Chegou 40 min atrasado; diretora: "Vou ligar pra tua mãe, Rafael." Enquete: A) contar tudo pra mãe / B) esconder da mãe → **venceu A** |
| 5 "R$ 215 de atraso" | 5 | R$ 85 | 26 (meta → R$ 66) | Mãe já sabia; regra: escola às 7h. Enquete: A) sozinho, com muito esforço / B) com os meninos, dividindo o lucro |

## Roteiros
### EP01 (do flow ElevenLabs)
```
[warmly] Imagina ter 16 anos... e descobrir que faltam 30 dias pro despejo.
Foi isso que aconteceu com o Rafa, aqui em Belém.
A mãe dele tava devendo R$ 1.800 de aluguel.
E o Rafa? [short pause] Tinha R$ 12 no bolso.
E uma bicicleta velha... que soltava a corrente em toda ladeira.
Mas ele olhou pra mãe e prometeu: [softly] "Deixa comigo."
[curious] Naquela noite, ele baixou o aplicativo de entrega.
Nome. Endereço. Data de nascimento...
[pause] Cadastro recusado.
Idade mínima: 18 anos.
[sighs] Pois é.
Aí ele pegou o caderno e fez a conta.
R$ 1.800, dividido por 30 dias...
R$ 60. POR DIA.
Sem aplicativo, sem moto, sem nenhum cliente.
[softly] A mãe chegou do trabalho às 10 da noite.
Viu o caderno aberto em cima da mesa...
e fingiu que não viu.
[warmly] No outro dia, o Rafa acordou às 5 da manhã.
Encheu o pneu com a bomba do vizinho...
e saiu pedalando pelo bairro, sem saber pra onde ir.
[excited] Foi aí que a Dona Socorro, da farmácia, gritou lá da porta:
[shouting] "Menino! Tu tem bicicleta?
Tem um remédio aqui que precisa chegar em 15 minutos!"
```
### EP02 (do flow ElevenLabs)
```
[excited] 15 minutos. Esse era o tempo pra um remédio atravessar o bairro inteiro.
E quem ia levar era um menino de 16 anos, numa bicicleta velha.
[warmly] Se você chegou agora: o Rafa tem 29 dias pra juntar R$ 1.800... ou a família dele perde a casa.
A Dona Socorro colocou a sacolinha na mão dele.
"É insulina. Pro Seu Raimundo, lá do outro lado do canal."
[softly] "Ele não pode ficar sem."
O Rafa nem respondeu. Só pedalou.
Desceu a rua, cortou caminho pela feira...
[nervous] e aí ele viu a ponte.
A maré tinha subido. A ponte tava debaixo d'água.
Dar a volta? Mais 20 minutos.
[sighs] Ele olhou o relógio. Faltavam 11.
Aí ele tirou o tênis... e botou a bicicleta no ombro.
E atravessou.
A água batia no joelho. Mas a sacolinha... ele levantou bem alto.
Do outro lado, calçou o tênis molhado e pedalou de novo.
[excited] Casa azul, número 40.
Bateu na porta...
Quando o Seu Raimundo abriu, faltavam 48 segundos.
[warmly] Ele pagou R$ 8 pela entrega.
E a filha dele ainda deu mais R$ 5, de gorjeta.
R$ 25 guardados. Primeiro dia de trabalho.
Na volta, a Dona Socorro tava esperando na porta.
"Menino... tu faz isso todo dia? Eu pago R$ 6 por entrega."
[excited] O Rafa já ia dizer que sim...
[dramatically] quando a corrente estourou. No meio da ladeira.
```
### EP03 (reconstruído das legendas; tags não recuperáveis)
A corrente estourou no meio da ladeira. E o Rafa teve que empurrar a bicicleta, no sol. (calendário: 28 dias)
A única oficina do bairro era a do Seu Bené. "Corrente nova?" R$ 35. (R$ 25 / R$ 35)
Mas o Rafa olhou em volta... e viu 20 bicicletas sujas. 20. De lama.
"E se eu lavar todas elas?" — Bené riu (HA HA)... depois pensou. "Lava tudo até amanhã, e a corrente é tua."
Dois dias de balde, sabão e graxa. (DIA 3 → DIA 4) E enquanto lavava, ele prestava atenção.
Aprendeu a esticar a corrente, apertar o freio, trocar um raio. A bicicleta não era mais PROBLEMA. Era FERRAMENTA.
No dia 4, fez 3 entregas. Mais R$ 18. R$ 43 guardados.
Aí o Seu Bené puxou uma caixa velha do fundo da oficina. (caixa térmica / isopor)
→ PARTE 4: VOCÊ DECIDE — A) Levar a caixa pro Ver-o-Peso às 5h  B) Ficar só nas entregas da farmácia

### EP04 (reconstruído das legendas)
5 da manhã. O Ver-o-Peso já tem mais trabalho que gente. Peixe, açaí, gelo... tudo precisando chegar nos restaurantes.
E os motoboys? Só começavam às 8.
O Rafa chegou com a caixa do Seu Bené amarrada na bicicleta. "Moça, eu levo. Gelado, e antes das 7."
A primeira feirante riu. A segunda pagou adiantado.
Uma entrega. Duas. Três. Ele riscava o caminho no caderno: feira, restaurante, feira.
6 entregas antes das 7. Mais R$ 42. R$ 85 guardados. O dobro de ontem.
Ele pedalou pra escola rindo, sozinho... e chegou 40 minutos atrasado.
A diretora já tava com o telefone na mão. "Vou ligar pra tua mãe, Rafael."
→ PARTE 5: VOCÊ DECIDE — A) Contar tudo pra mãe  B) Esconder da mãe — VOTA NA ENQUETE ↓

### EP05 (final — take sem sufixo, 76,3 s de voz, vídeo ≈ 79 s)
```
[softly] 7 e 40. O telefone da mãe do Rafa tocou.
[warmly] Vocês escolheram: o Rafa ia contar tudo pra mãe.
[short pause] Só que a escola contou primeiro.
Se você chegou agora: o Rafa tem 26 dias pra juntar R$ 1.800... ou a família perde a casa.
Naquela noite, ele contou tudo.
A farmácia. A oficina. O Ver-o-Peso de madrugada.
[pause] Ela não gritou. Não chorou.
Só abriu a bolsa... e tirou uma folha dobrada.
A página do caderno dele. Do primeiro dia.
[softly] "Tu achou que eu não tinha visto, Rafael?"
"Eu vi. E fiz a conta todo dia."
Embaixo, com a letra dela:
Dia 5. Devia ter R$ 300. Tem R$ 85.
[dramatically] R$ 215 de atraso.
[sighs] Ele tava comemorando... enquanto perdia a corrida.
Agora é R$ 66 por dia. Sem falhar nenhum.
[warmly] "Tu pode trabalhar. Mas às 7 em ponto, tu tá na escola."
"Atrasou de novo... acabou."
Das 5 às 7. Dez entregas. Sozinho, não dá.
[excited] Mas na rua dele tinha três meninos com bicicleta... e nenhum com trabalho.
[curious] E agora, você decide:
o Rafa faz tudo sozinho, no limite...
ou chama os meninos e divide o lucro?
Vota na enquete.
```
Novos personagens: Kauã (camiseta verde), Duda (puffs, camiseta rosa), Biel (boné amarelo) — crianças da rua com bicicleta.
