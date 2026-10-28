"""Check the reported illustration defects: symmetry and crossing hull edges."""
from pathlib import Path
import json,re
source=(Path(__file__).resolve().parent.parent/'js/script.js').read_text(encoding='utf-8')
shapes=json.loads(re.search(r'const shapes = (\[.*?\]);',source,re.S).group(1))
def cross(a,b,c):
    return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def intersect(a,b,c,d):
    return cross(a,b,c)*cross(a,b,d)<-1e-7 and cross(c,d,a)*cross(c,d,b)<-1e-7
checks=0
for a,b in zip(shapes,shapes[1:]):
    for step in range(101):
        t=step/100
        points=[(round(x+(u-x)*t,6),round(y+(v-y)*t,6)) for (x,y),(u,v) in zip(a,b)]
        assert all((-x,y) in points for x,y in points),'Hull is not bilaterally symmetric'
        assert points[0]==points[-1],'Hull is not closed'
        edges=list(zip(points,points[1:]))
        for i,(p,q) in enumerate(edges):
            for j,(r,s) in enumerate(edges):
                if abs(i-j)<=1 or {i,j}=={0,len(edges)-1}:continue
                assert not intersect(p,q,r,s),'Hull edges cross during transformation'
        checks+=1
print(f'PASS: {checks} sampled hulls are closed, symmetric, and free of crossing edges.')
