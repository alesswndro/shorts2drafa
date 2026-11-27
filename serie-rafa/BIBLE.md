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
  Sente culpa pela dívida; nunca cobra o Rafa. No EP05: "Essa conta nunca foi pra ser tua" / "Então a gente faz junto" /
  regra: às 7h na escola ("teu futuro não entra nessa conta").
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
| 5 "R$ 215 de atraso" | 5 | R$ 85 | 26 (meta → R$ 66) | Mãe já sabia; "a gente faz junto"; escola às 7h. Voto nos comentários: A) sozinho, com muito esforço / B) com os meninos, dividindo o lucro |
| 6 "Nona entrega" | 6 | R$ 148 (+63) | 25 (meta R$ 69) | Sozinho, 7h em ponto, R$ 6 abaixo da meta; vê a senhora do geladinho. Voto: A) larga as entregas e aposta tudo / B) continua nas entregas (dinheiro certo) |
| 7 "Gelo com sal" | 7→8 | R$ 218 (−40 +110) | 23 (meta R$ 69, batida) | Gelo com sal na caixa do Bené; vende 55 na saída do colégio; a senhora: "esse ponto aqui é meu". Voto: A) outro ponto, longe da escola / B) fica e vende a R$ 1,50 |
| 8 "Guerra de preço" | 9→10 | R$ 244 (282 no dia 9) | 21 (meta R$ 73) | R$ 1,50: vende 80 e ganha R$ 64; a senhora baixa pra R$ 1 (custo dela R$ 0,50); proposta: "eu tenho freezer e faço barato, tu tem perna e tem freguês". Voto: A) sócio dela, divide o lucro / B) recusa, segue na guerra de preço |
| 9 "A sociedade" | 11 | R$ 336 (376 − 40) | 20 (meta R$ 78) | Sócio da Dona Graça; Kauã, Duda e Biel revendem (R$ 0,30/un); 200 vendidos, R$ 132 pro Rafa; Biel volta sem R$ 40 (remédio da irmã). Voto: A) perdoa, paga aos poucos / B) tira o Biel do time |

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

### EP05 (final v7 — take sem sufixo, 87,3 s de voz, vídeo ≈ 90 s)
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
"Eu vi. Essa conta nunca foi pra ser tua."
[pause] Mas o Rafa pegou o caderno de volta... e refez a conta.
Dia 5. Devia ter R$ 300. Tem R$ 85.
[dramatically] R$ 215 de atraso.
[sighs] Ele tava comemorando... enquanto perdia a corrida.
Agora é R$ 66 por dia. E ele não ia parar.
[warmly] A mãe segurou a mão dele: "Então a gente faz junto."
"Mas às 7 em ponto, tu tá na escola. Teu futuro não entra nessa conta."
Das 5 às 7. Dez entregas. Sozinho, não dá.
[excited] Mas na rua dele tinha três meninos com bicicleta... e nenhum com trabalho.
[curious] E agora, você decide:
A: o Rafa faz tudo sozinho, no limite...
B: ou chama os meninos e divide o lucro?
Comenta aí: A ou B.
```
Novos personagens: Kauã (camiseta verde), Duda (puffs, camiseta rosa), Biel (boné amarelo) — crianças da rua com bicicleta.

### EP06 (final — take sem sufixo, 85,2 s de voz, vídeo ≈ 88 s)
```
[nervous] 6 e 52. Nona entrega... e a escola ainda tava a 3 quilômetros.
[warmly] Vocês escolheram: o Rafa ia fazer tudo sozinho, no limite.
[short pause] E ele fez. Do jeito mais difícil.
Se você chegou agora: o Rafa tem 25 dias pra juntar R$ 1.800... ou a família perde a casa.
Às 5 da manhã ele já tava no Ver-o-Peso. Peixe, gelo, açaí...
Uma entrega atrás da outra. Sem parar nem pra beber água.
[sighs] Às 7 em ponto, ele cruzou o portão da escola. Suado, tremendo... mas na hora.
R$ 63. Faltaram 6 pra meta. E ele tava morto.
[curious] Mas foi na última entrega que ele viu.
Uma senhora no Ver-o-Peso, comprando 10 quilos de polpa de cupuaçu.
"É pros meus geladinhos, menino. Vendo 150 por dia na porta do colégio."
[excited] O Rafa fez a conta ali mesmo, de cabeça.
70 centavos pra fazer. R$ 2 pra vender.
Ela não corria atrás do dinheiro... o dinheiro fazia fila na porta dela.
[softly] Naquela noite, ele abriu o caderno numa página nova.
E escreveu uma palavra só: GELADINHO.
[curious] E agora, você decide:
A: o Rafa larga as entregas... e aposta tudo no geladinho.
B: ou continua nas entregas, que é dinheiro certo?
Comenta aí: A ou B.
```
Nova personagem: **senhora do geladinho** (chapéu de palha, cabelo branco curto, blusa laranja, avental verde-água,
caixa térmica azul/branca) — compra polpa no Ver-o-Peso, vende 150/dia na porta do colégio.

### EP07 (final — take `_1`, 90,5 s de voz, vídeo ≈ 93,5 s)
```
[nervous] Meia-noite. 55 geladinhos em cima da pia... e o freezer só cabia 20.
[excited] Dessa vez foi acirrado... mas a opção A ganhou.
[warmly] Vocês escolheram: o Rafa largou as entregas e apostou tudo no geladinho.
Se você chegou agora: o Rafa tem 24 dias pra juntar R$ 1.800... ou a família perde a casa.
Ele gastou R$ 40 no Ver-o-Peso: polpa de cupuaçu, de açaí, leite e saquinho.
[warmly] A mãe chegou cansada do trabalho... e ajudou a encher um por um.
[nervous] Aí veio o freezer. 35 geladinhos sem lugar... derretendo.
[curious] Então ele lembrou dos peixeiros do Ver-o-Peso.
Gelo com sal. Segura o peixe gelado a manhã inteira.
[excited] Ele encheu a caixa térmica do Seu Bené: gelo, sal... e geladinho.
[softly] De manhã, abriu a tampa com o coração na mão...
[excited] Tava tudo durinho.
Meio-dia, saída do colégio. Ele abriu a caixa... e formou fila.
Cupuaçu acabou primeiro. Depois o açaí.
[dramatically] 55 geladinhos. R$ 110. Primeiro dia acima da meta.
[softly] Mas quando fechou a caixa vazia... sentiu alguém atrás dele.
Era a senhora do geladinho.
[dramatically] "Menino... esse ponto aqui é meu."
[curious] E agora, você decide:
A: o Rafa procura outro ponto, longe da escola... e vende menos.
B: ou fica e baixa pra R$ 1,50... e compra briga com ela?
Comenta aí: A ou B.
```

### EP08 (final — take `_1`, 89,6 s de voz, vídeo ≈ 92,6 s)
```
[excited] R$ 1,50. E a fila inteira trocou de lado.
[warmly] A maioria escolheu B: o Rafa ficou... e baixou o preço.
Se você chegou agora: o Rafa tem 22 dias pra juntar R$ 1.800... ou a família perde a casa.
Na saída do colégio, as crianças olharam as duas caixas... e correram pra dele.
[excited] 20, 40, 60... 80 geladinhos. Recorde.
Ele voltou pra casa rindo. Aí abriu o caderno.
[curious] A R$ 1,50, tirando o custo... sobravam 80 centavos por geladinho.
80 vezes 80 centavos... R$ 64.
[sighs] Faltaram 8 pra meta. Ele vendeu mais... e ganhou menos.
[nervous] No outro dia, a senhora chegou primeiro. Com uma plaquinha nova:
[dramatically] R$ 1.
Ela compra polpa no atacado. O geladinho dela custa 50 centavos.
Ela podia baixar. Ele não.
[softly] No fim da tarde, quase ninguém tinha comprado de nenhum dos dois.
E o Rafa viu a senhora sentada na calçada... contando moeda por moeda.
Sozinha. Igual a mãe dele, no fim do mês.
[pause] Aí ela levantou... e veio na direção dele.
"Menino... eu tenho freezer e faço barato. Tu tem perna e tem freguês."
[curious] E agora, você decide:
A: o Rafa vira sócio dela... e divide o lucro.
B: ou recusa e continua sozinho... na guerra de preço?
Comenta aí: A ou B.
```
Experimento (não é regra): gag do "aaah" (som do Roblox Work at a Pizza Place, arquivo do usuário) depois do carimbo do despejo —
Rafa com `expr="scream"` e `armUp="both"`.

### EP09 (final — take `_1`, 84,4 s de voz, vídeo ≈ 87,4 s)
```
[excited] 200 geladinhos por dia. Foi assim que começou a sociedade.
[warmly] Dessa vez foi acirrado... mas a opção A ganhou.
Vocês escolheram: o Rafa virou sócio da senhora.
Se você chegou agora: o Rafa tem 20 dias pra juntar R$ 1.800... ou a família perde a casa.
O nome dela era Dona Graça. E o acordo era simples:
ela fazia, com o freezer dela e a polpa do atacado.
Ele vendia. E o preço voltou pra R$ 2.
[curious] Só que 200 geladinhos... ele não vendia sozinho.
Aí ele lembrou dos três meninos da rua dele. Com bicicleta... e sem trabalho.
[excited] Kauã, Duda e Biel. 30 centavos pra cada geladinho vendido.
O Rafa ficou na porta do colégio. Os meninos se espalharam pelo bairro.
[dramatically] No fim do dia: 200 vendidos.
Tirando o custo, a comissão e a parte da Dona Graça...
R$ 132 pro Rafa. Quase o dobro da meta.
[warmly] Naquela noite, ele mostrou o caderno pra mãe. Ela leu duas vezes.
[softly] Mas na hora de acertar as contas... faltou um.
Biel voltou sem o dinheiro. R$ 40.
[pause] E com o olho vermelho.
"Minha irmã tava com febre, Rafa... eu comprei o remédio."
[curious] E agora, você decide:
A: o Rafa perdoa... e o Biel paga aos poucos.
B: ou tira o Biel do time... pra não perder mais?
Comenta aí: A ou B.
```
A senhora agora tem nome: **Dona Graça**. Biel tem uma irmã (estava com febre).
