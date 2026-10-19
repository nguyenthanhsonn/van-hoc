'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
export default function Check() {
  const frame = useRef<HTMLIFrameElement>(null);
  const params = useParams<{id:string}>();
  const query = useSearchParams();
  const w = Number(query.get('w')) || 1440, h = Number(query.get('h')) || 900;
  const [scale,setScale] = useState(.6);
  const [count,setCount]=useState(0);
  const [stats,setStats] = useState('Loading…');
  useEffect(()=>{
    setScale(Math.min(1,(innerWidth-24)/w,(innerHeight-52)/h));
    const timer=setInterval(()=>{
      const doc=frame.current?.contentDocument, win=frame.current?.contentWindow;
      const root=doc?.querySelector<HTMLElement>('[data-reader-scroll]');
      if(!doc||!win||!root)return;
      const article=doc.querySelector('article');
      const body=article?.querySelector('section p');
      setStats(`${win.innerWidth}×${win.innerHeight} · content width ${root.scrollWidth}/${root.clientWidth} · font ${body?win.getComputedStyle(body).fontSize:'?'} · progress ${doc.querySelector('[role=progressbar]')?.getAttribute('aria-valuenow')}% · glossary ${doc.querySelector('details')?.open?'open':'closed'}`);
    },500);
    return ()=>clearInterval(timer);
  },[w,h]);
  return <div style={{position:'fixed',inset:0,background:'#e8e9e5',font:'12px sans-serif',overflow:'hidden'}}>
    <button onClick={()=>setCount(count+1)} aria-label="Client check">Client check {count}</button><p style={{padding:'0 12px'}}>{stats}</p>
    <iframe ref={frame} title="Reading viewport test" src={`/landmarks/${params.id}`} width={w} height={h}
      style={{position:'absolute',top:40,left:'50%',border:0,transform:`translateX(-50%) scale(${scale})`,transformOrigin:'top center'}} />
  </div>;
}
