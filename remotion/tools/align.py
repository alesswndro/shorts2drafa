"""Alinha roteiro (com audio tags) ao áudio sem ASR.
Uso: python3 align.py voz.mp3 roteiro.txt out.json
Detecta trechos de fala (silencedetect), divide o roteiro em frases (pontuação),
e por DP agrupa frases consecutivas em cada trecho (custo = diferença de duração
esperada por sílabas). Dentro do trecho, palavras recebem tempo proporcional às sílabas."""
import json, re, subprocess, sys
mp3, txt, out = sys.argv[1:4]
NOISE, MIND = "-38dB", 0.2
r = subprocess.run(["ffmpeg","-i",mp3,"-af",f"silencedetect=noise={NOISE}:d={MIND}","-f","null","-"],capture_output=True,text=True).stderr
dur = float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",mp3],capture_output=True,text=True).stdout)
st=[float(x) for x in re.findall(r"silence_start: ([\d.]+)",r)]; en=[float(x) for x in re.findall(r"silence_end: ([\d.]+)",r)]
sil=list(zip(st,en+[dur]*(len(st)-len(en))))
segs=[]; t=0.0
for a,b in sil:
    if a-t>0.05: segs.append([t,a])
    t=b
if dur-t>0.05: segs.append([t,dur])
# frases
raw=open(txt).read()
lines=[l.strip() for l in raw.splitlines() if l.strip()]
words=[]  # dict(text, line, quote)
for li,l in enumerate(lines):
    l=re.sub(r"\[[^\]]+\]","",l).strip()
    quote=l.startswith('"')
    for w in l.split():
        words.append({"w":w,"line":li,"quote":quote})
def syl(w):
    w=w.lower()
    if re.match(r"r\$",w): return 2
    if re.match(r"[\d.]+",w):
        n=re.sub(r"\D","",w); return {"1800":4,"300":3,"215":6,"85":5,"66":5,"26":4,"40":3,"7":2,"5":2,"12":2}.get(n,len(n)*2)
    return max(1,len(re.findall(r"[aeiouáéíóúâêôãõà]+",w)))
for x in words: x["s"]=syl(x["w"])
# frases = quebras após pontuação
phr=[]; cur=[]
for i,x in enumerate(words):
    cur.append(i)
    if re.search(r"[.,:?!…]+\"?$",x["w"]) or i==len(words)-1 or words[i+1]["line"]!=x["line"]:
        phr.append(cur); cur=[]
P=len(phr); S=len(segs)
ps=[sum(words[i]["s"] for i in p) for p in phr]
rate=sum(b-a for a,b in segs)/sum(ps)
INF=1e18
dp=[[INF]*(P+1) for _ in range(S+1)]; bk=[[0]*(P+1) for _ in range(S+1)]
dp[0][0]=0
for i in range(1,S+1):
    L=segs[i-1][1]-segs[i-1][0]
    for j in range(1,P+1):
        acc=0
        for k in range(j-1,-1,-1):
            acc+=ps[k]
            if dp[i-1][k]>=INF: continue
            c=dp[i-1][k]+((L-acc*rate)/max(L,0.3))**2*L
            if c<dp[i][j]: dp[i][j]=c; bk[i][j]=k
assert dp[S][P]<INF, f"sem solução S={S} P={P}"
grp=[];j=P
for i in range(S,0,-1):
    k=bk[i][j]; grp.append((i-1,k,j)); j=k
grp.reverse()
for si,k,j in grp:
    a,b=segs[si]; idx=[i for p in phr[k:j] for i in p]
    tot=sum(words[i]["s"]+0.6 for i in idx); t=a
    for i in idx:
        d=(b-a)*(words[i]["s"]+0.6)/tot
        words[i]["start"]=round(t,3); words[i]["end"]=round(t+d,3); t+=d
json.dump({"duration":dur,"segments":segs,"words":words},open(out,"w"),ensure_ascii=False,indent=1)
for si,k,j in grp:
    print(f"{segs[si][0]:6.2f}-{segs[si][1]:6.2f} | "+" / ".join(" ".join(words[i]['w'] for i in p) for p in phr[k:j]))
