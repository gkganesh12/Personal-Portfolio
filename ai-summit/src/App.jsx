import { useState, useEffect, useRef } from "react";
import { C } from "./theme.js";
import { edition, extraBrands, topics, statsData, raceLanes, watches } from "./edition.js";

const baseBrands = {
  google:{color:"#4285F4",name:"Google",logo:(sz=18)=><svg width={sz} height={sz} viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.56-2.77.01-.54z" fill="#FBBC05"/><path d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.19 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.16 6.16-4.16z" fill="#EA4335"/></svg>},
  openai:{color:"#10A37F",name:"OpenAI",logo:(sz=18)=><svg width={sz} height={sz} viewBox="0 0 24 24" fill="#10A37F"><path d="M22.28 9.37a5.88 5.88 0 0 0-.51-4.85 5.96 5.96 0 0 0-6.42-2.86A5.9 5.9 0 0 0 10.86 0a5.97 5.97 0 0 0-5.69 4.13 5.88 5.88 0 0 0-3.94 2.86 5.96 5.96 0 0 0 .74 6.98 5.88 5.88 0 0 0 .5 4.85 5.96 5.96 0 0 0 6.42 2.86A5.9 5.9 0 0 0 13.14 24a5.97 5.97 0 0 0 5.69-4.13 5.88 5.88 0 0 0 3.94-2.86 5.96 5.96 0 0 0-.74-6.98zM13.14 22.3a4.42 4.42 0 0 1-2.83-1.02l.14-.08 4.7-2.71a.77.77 0 0 0 .38-.67v-6.62l1.99 1.15a.07.07 0 0 1 .04.05v5.49a4.46 4.46 0 0 1-4.42 4.42zm-9.53-4.06a4.42 4.42 0 0 1-.53-2.97l.14.08 4.7 2.71a.77.77 0 0 0 .76 0l5.74-3.31v2.3a.07.07 0 0 1-.03.06l-4.75 2.74a4.46 4.46 0 0 1-6.03-1.61zM2.34 7.9A4.42 4.42 0 0 1 4.65 5.95v5.57a.77.77 0 0 0 .38.67l5.74 3.31-1.99 1.15a.07.07 0 0 1-.06 0L4.03 13.9A4.46 4.46 0 0 1 2.34 7.9zm16.37 3.81-5.74-3.31 1.99-1.15a.07.07 0 0 1 .06 0l4.75 2.74a4.46 4.46 0 0 1-.68 8.05v-5.66a.77.77 0 0 0-.38-.67zm1.98-3a4.42 4.42 0 0 0-.53-.34l-.14-.08-4.7-2.71a.77.77 0 0 0-.76 0L8.82 8.9V6.6a.07.07 0 0 1 .03-.06l4.75-2.74a4.46 4.46 0 0 1 6.62 4.61l.46.29zM7.81 13.15l-1.99-1.15a.07.07 0 0 1-.04-.05V6.46a4.46 4.46 0 0 1 7.31-3.43l-.14.08-4.7 2.71a.77.77 0 0 0-.38.67l-.06 6.66zm1.08-2.33 2.56-1.47 2.56 1.47v2.95l-2.56 1.47-2.56-1.47v-2.95z"/></svg>},
  meta:{color:"#0081FB",name:"Meta",logo:(sz=18)=><svg width={sz} height={sz} viewBox="0 0 24 24" fill="#0081FB"><path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a4.21 4.21 0 0 0 1.738 2.622c.71.5 1.558.756 2.44.756.674 0 1.293-.145 1.874-.434.544-.272 1.073-.673 1.596-1.211.615-.634 1.236-1.468 1.874-2.539.76-1.275 1.545-2.848 2.347-4.678a.4.4 0 0 1 .088-.118.15.15 0 0 1 .104-.04c.03 0 .067.013.1.04a.4.4 0 0 1 .09.124c.791 1.799 1.563 3.345 2.315 4.6.641 1.072 1.266 1.906 1.883 2.54.524.54 1.054.94 1.6 1.213.58.288 1.199.433 1.872.433.883 0 1.731-.256 2.44-.756a4.21 4.21 0 0 0 1.738-2.622c.14-.604.21-1.267.21-1.973 0-2.566-.704-5.24-2.044-7.306C20.768 5.31 19.053 4.03 17.085 4.03c-1.124 0-2.15.396-3.06 1.168-.864.734-1.69 1.824-2.472 3.26a.2.2 0 0 1-.346 0c-.782-1.436-1.607-2.526-2.471-3.26-.91-.772-1.936-1.168-2.821-1.168z"/></svg>},
  anthropic:{color:"#D4A27F",name:"Anthropic",logo:(sz=18)=><svg width={sz} height={sz} viewBox="0 0 24 24" fill="#D4A27F"><path d="M17.304 3.541h-3.672l6.696 16.918h3.672l-6.696-16.918zm-10.608 0L0 20.459h3.744l1.38-3.588h7.104l1.38 3.588h3.744L10.656 3.541H6.696zm-.456 10.404L9 7.009l2.76 6.936H6.24z"/></svg>},
  nvidia:{color:"#76B900",name:"NVIDIA",logo:(sz=18)=><svg width={sz} height={sz} viewBox="0 0 24 24" fill="#76B900"><path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.27 3.02 6.27 3.02s-2.572 3.39-5.315 3.39c-.503 0-.97-.087-1.38-.244v-3.9c1.616.2 1.94.854 2.901 2.167l2.15-1.81s-1.677-2.17-4.087-2.17c-.36 0-.647.027-.963.06V8.8zm0-4.595v2.098l.424-.024c5.464-.173 8.742 4.217 8.742 4.217s-3.81 4.85-7.86 4.85c-.46 0-.895-.054-1.306-.152v1.605c.376.054.764.09 1.164.09 3.636 0 6.244-1.873 8.786-3.962.42.34 2.15 1.16 2.506 1.52-2.425 1.88-8.083 3.9-11.22 3.9a8.9 8.9 0 0 1-1.236-.09V20H23.5V4.203H8.948zM0 4.203v15.82h4.624v-1.5H2.25V5.703h17.5v6.148c.677.712 1.123 1.278 1.374 1.62V4.202H0zm8.948 9.715v1.438c-2.22-.612-2.854-2.834-2.854-2.834s1.148-1.283 2.854-1.078v.91l-.002-.004c-1.093-.14-1.946.826-1.946.826s.55 1.404 1.948 1.74z"/></svg>},
  mistral:{color:"#FA520F",name:"Mistral",logo:(sz=18)=><svg width={sz} height={sz} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="#FA520F"/><text x="12" y="17" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">M</text></svg>},
  cohere:{color:"#39594D",name:"Cohere",logo:(sz=18)=><svg width={sz} height={sz} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#39594D"/><text x="12" y="16.5" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">C</text></svg>},
  reddit:{color:"#FF4500",name:"Reddit",logo:(sz=18)=><svg width={sz} height={sz} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#FF4500"/><text x="12" y="16.5" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">r</text></svg>},
  deepseek:{color:"#4D6BFE",name:"DeepSeek",logo:(sz=18)=><svg width={sz} height={sz} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="#4D6BFE"/><text x="12" y="17" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">D</text></svg>},
  qwen:{color:"#615CED",name:"Qwen",logo:(sz=18)=><svg width={sz} height={sz} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="#615CED"/><text x="12" y="17" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">Q</text></svg>},
};

// Brands added by an edition get a simple letter logo; built-in brands win on a key clash.
const letterBrand = ({ name, color, letter }) => ({
  color, name,
  logo: (sz = 18) => <svg width={sz} height={sz} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill={color}/><text x="12" y="17" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">{letter || name[0]}</text></svg>,
});
const brands = {
  ...Object.fromEntries(Object.entries(extraBrands).map(([k, v]) => [k, letterBrand(v)])),
  ...baseBrands,
};

// Brands featured in the hero: every brand this edition's topics mention, in order.
const featuredBrands = [...new Set(topics.flatMap(t => t.multiBrand || [t.brand]))].filter(k => brands[k]).slice(0, 8);


/* ─── Hooks ─── */

function useInView(ref, threshold = 0.1) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setV(true);
    }, { threshold });
    o.observe(ref.current);
    return () => o.disconnect();
  }, [ref, threshold]);
  return v;
}

function useCounter(end, duration = 2000, start = false, decimals = 0) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);
  const startTime = useRef(null);
  useEffect(() => {
    if (!start) { setVal(0); return; }
    const animate = (ts) => {
      if (!startTime.current) startTime.current = ts;
      const progress = Math.min((ts - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setVal(parseFloat((eased * end).toFixed(decimals)));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); startTime.current = null; };
  }, [start, end, duration, decimals]);
  return val;
}

/* ─── Components ─── */

function AnimatedStat({ stat, index }) {
  const ref = useRef(null);
  const vis = useInView(ref, 0.3);
  const count = useCounter(stat.end, 2200 + index * 200, vis, stat.decimals || 0);
  const [hov, setHov] = useState(false);

  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: hov ? `${stat.c}10` : "transparent",
      border: `2px solid ${stat.c}`,
      padding: "1.5rem 1.8rem", textAlign: "center",
      flex: "1 1 180px", minWidth: "170px", maxWidth: "240px",
      position: "relative", overflow: "hidden",
      transform: vis ? (hov ? "translateY(-4px) scale(1.03)" : "translateY(0)") : "translateY(30px)",
      opacity: vis ? 1 : 0,
      transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
      boxShadow: hov ? `0 0 25px ${stat.c}30, inset 0 0 25px ${stat.c}08` : `inset 0 0 20px ${stat.c}06`,
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${stat.c}, transparent)`,
        opacity: vis ? 1 : 0, transition: "opacity 1s ease 0.5s",
      }} />
      {brands[stat.b] && <div style={{ position: "absolute", top: 6, right: 6, opacity: 0.5 }}>{brands[stat.b].logo(13)}</div>}
      <div style={{
        fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.2rem",
        color: stat.c, letterSpacing: "0.03em", lineHeight: 1,
        textShadow: hov ? `0 0 20px ${stat.c}40` : "none",
        transition: "text-shadow 0.3s",
      }}>{stat.prefix}{count}{stat.suffix}</div>
      <div style={{
        fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.7rem",
        color: "#555", marginTop: "0.5rem", letterSpacing: "0.14em",
      }}>{stat.l}</div>
      <div style={{
        marginTop: "0.6rem", height: "3px", background: `${stat.c}15`,
        borderRadius: "2px", overflow: "hidden",
      }}>
        <div style={{
          height: "100%", background: stat.c,
          width: vis ? "100%" : "0%",
          transition: `width 2.5s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
          borderRadius: "2px", boxShadow: `0 0 8px ${stat.c}60`,
        }} />
      </div>
      {[{t:3,l:3},{t:3,r:3},{b:3,l:3},{b:3,r:3}].map((pos,j) => (
        <div key={j} style={{ position: "absolute", width: 4, height: 4, background: stat.c, ...pos }} />
      ))}
    </div>
  );
}

function BrandBadge({ brandKey, size = "sm" }) {
  if (!brandKey || !brands[brandKey]) return null;
  const b = brands[brandKey]; const sz = size === "lg" ? 22 : 18;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      background: C.white, border: `1.5px solid ${C.black}`,
      padding: size === "lg" ? "4px 10px 4px 6px" : "3px 8px 3px 5px",
      boxShadow: `2px 2px 0 ${C.black}`,
      fontFamily: "'IBM Plex Mono',monospace",
      fontSize: size === "lg" ? "0.75rem" : "0.65rem",
      fontWeight: 700, color: C.black, letterSpacing: "0.04em", whiteSpace: "nowrap",
    }}>{b.logo(sz)}{b.name}</span>
  );
}

function TopicCard({ topic, index }) {
  const ref = useRef(null); const vis = useInView(ref);
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isLight = topic.bg !== C.black;
  const isFeat = topic.size === "featured";
  const rot = ["-0.5deg","0.4deg","-0.3deg","0.5deg","-0.3deg"][index % 5];

  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => setExpanded(!expanded)}
      style={{
        gridColumn: isFeat ? "span 2" : "span 1",
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? "translateY(-6px) rotate(0deg) scale(1.01)" : `rotate(${rot})`) : `translateY(60px) rotate(${parseFloat(rot)*3}deg)`,
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${(index % 5) * 0.06}s`,
        background: topic.bg, border: `3px solid ${C.black}`,
        boxShadow: hov ? `10px 10px 0 ${C.black}, 14px 14px 0 ${topic.color}30` : `6px 6px 0 ${C.black}`,
        overflow: "hidden", cursor: "pointer", position: "relative",
        borderRadius: "2px",
      }}>
      {/* Corner triangle */}
      <div style={{ position: "absolute", top: -1, right: -1, width: 0, height: 0, borderTop: `40px solid ${topic.color}`, borderLeft: "40px solid transparent", zIndex: 2, transition: "all 0.3s", filter: hov ? "brightness(1.2)" : "none" }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "stretch", borderBottom: `3px solid ${C.black}` }}>
        <div style={{
          background: C.black, color: topic.color,
          fontFamily: "'Bebas Neue',sans-serif", fontSize: isFeat ? "3.2rem" : "2.6rem",
          padding: "0.3rem 0.8rem", display: "flex", alignItems: "center",
          borderRight: `3px solid ${C.black}`, minWidth: isFeat ? "5.5rem" : "4.5rem",
          justifyContent: "center", letterSpacing: "0.05em",
          textShadow: hov ? `0 0 15px ${topic.color}50` : "none", transition: "text-shadow 0.3s",
        }}>{topic.num}</div>
        <div style={{ padding: "0.8rem 1.1rem", flex: 1, position: "relative" }}>
          <span style={{
            position: "absolute", top: "0.5rem", right: "0.6rem",
            fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.65rem", fontWeight: 700,
            background: topic.color, color: C.black, padding: "2px 8px",
            border: `1.5px solid ${C.black}`, letterSpacing: "0.08em",
            transform: `rotate(${index % 2 === 0 ? 2 : -1.5}deg)`, boxShadow: `2px 2px 0 ${C.black}`,
          }}>{topic.tag}</span>
          <h3 style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: isFeat ? "2rem" : "1.65rem",
            margin: 0, color: isLight ? C.black : topic.color, lineHeight: 1.1, letterSpacing: "0.04em",
            paddingRight: "3rem",
          }}>{topic.title}</h3>
          <p style={{
            fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.8rem", margin: "0.25rem 0 0",
            color: isLight ? "#555" : "#aaa", fontStyle: "italic",
          }}>{topic.sub}</p>
          <div style={{ marginTop: "0.5rem", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {topic.multiBrand
              ? topic.multiBrand.map(k => <BrandBadge key={k} brandKey={k} size="lg" />)
              : <BrandBadge brandKey={topic.brand} size="lg" />}
          </div>
        </div>
      </div>

      {/* Expand/Collapse indicator bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.4rem 1.1rem",
        background: isLight ? `${topic.color}12` : `${topic.color}15`,
        borderBottom: expanded ? `2px solid ${isLight ? C.black+"15" : topic.color+"30"}` : "none",
        transition: "all 0.3s",
      }}>
        <span style={{
          fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.7rem", fontWeight: 600,
          color: isLight ? "#666" : "#999", letterSpacing: "0.12em",
        }}>{expanded ? "COLLAPSE" : `${topic.points.length} KEY POINTS`}</span>
        <span style={{
          fontFamily: "'IBM Plex Mono',monospace", fontSize: "1.1rem", fontWeight: 700,
          color: topic.color, display: "inline-block",
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          lineHeight: 1,
        }}>▼</span>
      </div>

      {/* Points content */}
      <div style={{
        padding: expanded ? (isFeat ? "1.1rem 1.4rem" : "1rem 1.2rem") : "0 1.2rem",
        maxHeight: expanded ? "1400px" : "0",
        overflow: "hidden",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        opacity: expanded ? 1 : 0,
      }}>
        {topic.points.map((p, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "0.7rem",
            marginBottom: i < topic.points.length - 1 ? "0.6rem" : 0,
            padding: "0.35rem 0",
            opacity: vis && expanded ? 1 : 0,
            transform: vis && expanded ? "translateX(0)" : "translateX(-20px)",
            transition: `all 0.4s ease ${0.08 + i * 0.06}s`,
          }}>
            <span style={{
              display: "inline-block", width: "8px", height: "8px", minWidth: "8px",
              background: topic.color, border: `2px solid ${C.black}`, marginTop: "6px",
              transform: "rotate(45deg)", boxShadow: `1.5px 1.5px 0 ${C.black}`,
            }} />
            <span style={{
              fontFamily: "'IBM Plex Mono',monospace", fontSize: isFeat ? "0.95rem" : "0.88rem",
              color: isLight ? C.black : "#ddd", lineHeight: 1.5,
            }}>{p}</span>
          </div>
        ))}
      </div>

      {/* Bottom stripe */}
      <div style={{
        height: "5px",
        background: `repeating-linear-gradient(90deg,${topic.color} 0px,${topic.color} 10px,${C.black} 10px,${C.black} 12px)`,
        borderTop: `2px solid ${C.black}`,
      }} />
    </div>
  );
}

function Marquee({ text, bg, color, dir = "left", speed = 30 }) {
  const items = Array(20).fill(text);
  return (
    <div style={{ overflow: "hidden", background: bg, borderTop: `3px solid ${C.black}`, borderBottom: `3px solid ${C.black}`, padding: "0.55rem 0", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-block", animation: `m-${dir} ${speed}s linear infinite` }}>
        {items.map((t, i) => (
          <span key={i} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.15rem", color, marginRight: "2.5rem", letterSpacing: "0.12em" }}>{t} ✦</span>
        ))}
      </div>
    </div>
  );
}

/**
 * FIX: WatchItem extracted as its own component so that useRef / useInView
 * are called at the component level — not inside a .map() callback,
 * which violates React's Rules of Hooks.
 */
function WatchItem({ w, i }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} className="watch-item"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: w.c, border: `2.5px solid ${C.black}`,
        boxShadow: hov ? `10px 10px 0 ${C.black}` : `5px 5px 0 ${C.black}`,
        padding: "1rem 1.3rem",
        fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.25rem",
        color: C.black, cursor: "pointer", letterSpacing: "0.06em",
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? "translateX(10px) rotate(-0.3deg)" : "translateX(0)") : "translateX(-35px)",
        transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s`,
        display: "flex", alignItems: "center", gap: "0.6rem",
        position: "relative", overflow: "hidden",
      }}>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "25%", background: `repeating-linear-gradient(90deg,transparent,transparent 4px,${C.black}06 4px,${C.black}06 5px)`, pointerEvents: "none" }} />
      <span style={{ background: C.black, color: w.c, padding: "3px 9px", fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.75rem", fontWeight: 700 }}>0{i + 1}</span>
      {brands[w.b] && <span style={{ position: "relative", zIndex: 1, display: "flex" }}>{brands[w.b].logo(18)}</span>}
      <span style={{ position: "relative", zIndex: 1 }}>{w.t}</span>
      {/* Hover arrow indicator */}
      <span style={{
        marginLeft: "auto", position: "relative", zIndex: 1,
        fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.9rem", fontWeight: 700,
        opacity: hov ? 1 : 0, transform: hov ? "translateX(0)" : "translateX(-10px)",
        transition: "all 0.3s ease",
      }}>→</span>
    </div>
  );
}

/* ─── AI Race Scoreboard Lane ─── */
function RaceLane({ r, i }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: "#141414", border: `2px solid ${r.c}`,
      boxShadow: hov ? `8px 8px 0 ${r.c}` : `4px 4px 0 ${r.c}60`,
      padding: "1.1rem 1.2rem", position: "relative", overflow: "hidden",
      opacity: vis ? 1 : 0,
      transform: vis ? (hov ? "translateY(-4px)" : "translateY(0)") : "translateY(30px)",
      transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.65rem", fontWeight: 700, color: C.black, background: r.c, padding: "2px 8px", letterSpacing: "0.12em" }}>LANE 0{i + 1} · {r.lane}</span>
        {brands[r.b] && <span style={{ display: "flex", opacity: 0.8 }}>{brands[r.b].logo(16)}</span>}
      </div>
      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.6rem", color: "#666", letterSpacing: "0.2em", marginTop: "0.9rem" }}>IN THE LEAD</div>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.9rem", color: r.c, letterSpacing: "0.05em", lineHeight: 1.1, textShadow: hov ? `0 0 15px ${r.c}50` : "none", transition: "text-shadow 0.3s" }}>{r.leader}</div>
      <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.8rem", color: "#bbb", lineHeight: 1.55, marginTop: "0.5rem" }}>{r.note}</p>
    </div>
  );
}

/* ─── Scroll-to-Top Button ─── */
function ScrollToTopButton({ visible }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label="Scroll to top"
      style={{
        position: "fixed", bottom: "2rem", right: "2rem", zIndex: 150,
        width: 48, height: 48,
        background: C.yellow, color: C.black,
        border: `3px solid ${C.black}`,
        boxShadow: hov ? `5px 5px 0 ${C.black}` : `3px 3px 0 ${C.black}`,
        fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.4rem",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? (hov ? "translateY(-3px) scale(1.05)" : "translateY(0)") : "translateY(20px)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: visible ? "auto" : "none",
      }}>↑</button>
  );
}

/* ─── Floating Particles on Hero ─── */
function HeroParticles({ scrollY }) {
  const particles = useRef(
    Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      color: [C.yellow, C.pink, C.cyan, C.green, C.magenta, C.blue][i % 6],
      speed: 0.5 + Math.random() * 1.5,
      delay: Math.random() * 5,
    }))
  ).current;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.size,
          height: p.size,
          borderRadius: "50%",
          background: p.color,
          opacity: 0.25,
          transform: `translateY(${scrollY * p.speed * 0.05}px)`,
          animation: `float ${3 + p.speed}s ease-in-out ${p.delay}s infinite`,
          boxShadow: `0 0 ${p.size * 3}px ${p.color}40`,
        }} />
      ))}
    </div>
  );
}

/* ─── Edition Badge ─── */
function EditionBadge() {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{
      display: "flex", justifyContent: "center", padding: "2rem 1.5rem 0",
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.6s ease",
    }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "1rem",
        background: `${C.yellow}08`, border: `1.5px solid ${C.yellow}25`,
        padding: "0.6rem 1.5rem", position: "relative",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.65rem",
          color: C.yellow, letterSpacing: "0.2em", opacity: 0.7,
        }}>EDITION</div>
        <div style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem",
          color: C.yellow, letterSpacing: "0.08em",
        }}>{edition.kind}</div>
        <div style={{ width: 1, height: 28, background: `${C.yellow}30` }} />
        <div style={{
          fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.65rem",
          color: "#666", letterSpacing: "0.15em",
        }}>{edition.range}</div>
        {/* corners */}
        {[{t:0,l:0},{t:0,r:0},{b:0,l:0},{b:0,r:0}].map((pos,j) => (
          <div key={j} style={{ position: "absolute", width: 6, height: 6, border: `1.5px solid ${C.yellow}40`, ...pos,
            borderTop: pos.t !== undefined && pos.t === 0 ? `1.5px solid ${C.yellow}40` : "none",
            borderBottom: pos.b !== undefined && pos.b === 0 ? `1.5px solid ${C.yellow}40` : "none",
            borderLeft: pos.l !== undefined && pos.l === 0 ? `1.5px solid ${C.yellow}40` : "none",
            borderRight: pos.r !== undefined && pos.r === 0 ? `1.5px solid ${C.yellow}40` : "none",
          }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main App ─── */

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(new Date());
  const [dark, setDark] = useState(false);
  const heroRef = useRef(null);
  const heroVis = useInView(heroRef, 0.05);
  const [scrollPct, setScrollPct] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const h = () => {
      setScrollY(window.scrollY);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const bg = dark ? "#111" : C.cream;
  const sectionBg = dark ? "#1a1a1a" : C.cream;
  const showScrollTop = scrollPct > 15;

  return (
    <div style={{ background: bg, minHeight: "100vh", overflow: "hidden", position: "relative", transition: "background 0.5s" }}>
      {/* Noise */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9999, opacity: 0.025, mixBlendMode: "multiply", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Scroll progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: "3px", background: `linear-gradient(90deg, ${C.yellow}, ${C.pink}, ${C.cyan})`, width: `${scrollPct}%`, zIndex: 200, transition: "width 0.1s", boxShadow: `0 0 10px ${C.yellow}80` }} />

      {/* Scroll-to-top */}
      <ScrollToTopButton visible={showScrollTop} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:ital,wght@0,400;0,600;0,700;1,400&family=Syne:wght@400;700;800&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        @keyframes m-left{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes m-right{from{transform:translateX(-50%)}to{transform:translateX(0)}}
        @keyframes glitch{0%,100%{clip-path:inset(40% 0 40% 0);transform:translate(-2px,1px)}20%{clip-path:inset(10% 0 75% 0);transform:translate(2px,-1px)}40%{clip-path:inset(70% 0 5% 0);transform:translate(-1px,2px)}60%{clip-path:inset(25% 0 55% 0);transform:translate(1px,-2px)}80%{clip-path:inset(60% 0 15% 0);transform:translate(-2px,0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse-glow{0%,100%{box-shadow:0 0 5px currentColor}50%{box-shadow:0 0 20px currentColor}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .topic-grid{display:grid;grid-template-columns:repeat(3,1fr);align-items:start;gap:1.6rem;max-width:1400px;margin:0 auto;padding:2.5rem 2rem}
        @media(max-width:1200px){.topic-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:700px){.topic-grid{grid-template-columns:1fr;gap:1.2rem;padding:1.5rem 1rem}.topic-grid>*{grid-column:span 1!important}}
        .watch-item{transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}
        ::selection{background:${C.yellow};color:${C.black}}
        .sticker{transition:transform 0.3s cubic-bezier(0.16,1,0.3,1)}
        .sticker:hover{transform:rotate(0deg) scale(1.12)!important}
        .brand-strip-item{transition:all 0.3s ease}
        .brand-strip-item:hover{transform:scale(1.08) rotate(-1.5deg)!important;background:rgba(255,255,255,0.15)!important}
        .dark-toggle{transition:all 0.3s;cursor:pointer;user-select:none}
        .dark-toggle:hover{transform:scale(1.15) rotate(15deg)}
        .nav-link{transition:all 0.2s ease;border-radius:1px}
        .nav-link:hover{background:${C.yellow}!important;color:${C.black}!important;border-color:${C.yellow}!important}
        .mobile-nav-btn{display:none;background:none;border:none;color:#aaa;font-size:1.3rem;cursor:pointer;padding:4px}
        @media(max-width:640px){
          .nav-links-desktop{display:none!important}
          .mobile-nav-btn{display:block}
        }
        .mobile-nav-overlay{
          position:fixed;top:42px;left:0;right:0;bottom:0;
          background:rgba(10,10,10,0.95);backdrop-filter:blur(12px);
          z-index:99;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5rem;
        }
        .mobile-nav-overlay a{
          font-family:'Bebas Neue',sans-serif;font-size:2rem;color:${C.yellow};
          text-decoration:none;letter-spacing:0.1em;
          border:2px solid ${C.yellow}30;padding:0.3rem 2rem;
          transition:all 0.3s;
        }
        .mobile-nav-overlay a:hover{background:${C.yellow};color:${C.black}}
        .next-slide{aspect-ratio:16/9}
        @media(max-width:900px){.next-slide{aspect-ratio:auto}}
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: `${C.black}ee`,
        borderBottom: `2px solid ${C.yellow}40`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 1.5rem", height: "42px",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", color: C.black, background: C.yellow, padding: "0 8px", lineHeight: "1.4" }}>AI</span>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.2rem", color: C.yellow, letterSpacing: "0.08em" }}>SUMMIT</span>
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.6rem", color: C.pink, border: `1px solid ${C.pink}40`, padding: "2px 6px" }}>{edition.badge}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.65rem", color: C.green, letterSpacing: "0.08em", opacity: 0.8 }}>{time.toLocaleTimeString('en-US', { hour12: false })}</span>
          <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {["#stats","#topics","#race","#watch","#thanks","#next"].map(h => (
              <a key={h} href={h} className="nav-link" style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.65rem", color: "#aaa", padding: "3px 8px", border: "1px solid #333", textDecoration: "none", letterSpacing: "0.06em", fontWeight: 600 }}
              >{h.slice(1).toUpperCase()}</a>
            ))}
          </div>
          <span className="dark-toggle" onClick={() => setDark(!dark)} style={{
            fontSize: "1rem", marginLeft: "0.3rem", display: "inline-block",
          }}>{dark ? "☀️" : "🌙"}</span>
          <button className="mobile-nav-btn" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation">
            {mobileNav ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileNav && (
        <div className="mobile-nav-overlay" onClick={() => setMobileNav(false)}>
          {["#stats","#topics","#race","#watch","#thanks","#next"].map(h => (
            <a key={h} href={h}>{h.slice(1).toUpperCase()}</a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section ref={heroRef} style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", position: "relative", background: C.black, overflow: "hidden", paddingTop: "42px",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,229,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,229,0,0.03) 1px,transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <HeroParticles scrollY={scrollY} />
        {[
          {w:80,h:80,bg:C.yellow,top:"8%",left:"5%",r:12},{w:55,h:55,bg:C.pink,top:"15%",right:"7%",r:-15},
          {w:40,h:40,bg:C.blue,bottom:"15%",left:"8%",r:45},{w:65,h:65,bg:C.green,bottom:"20%",right:"10%",r:-20},
          {w:25,h:25,bg:C.magenta,top:"40%",left:"45%",r:22},{w:45,h:45,bg:C.cyan,top:"55%",left:"22%",r:-10},
        ].map((s,i) => (
          <div key={i} style={{ position: "absolute", width: s.w, height: s.h, background: "transparent", border: `2px solid ${s.bg}40`, top: s.top, left: s.left, right: s.right, bottom: s.bottom, transform: `rotate(${s.r + scrollY * 0.015}deg)`, animation: `float ${3.5 + i * 0.3}s ease-in-out infinite ${i * 0.4}s`, opacity: 0.3 }} />
        ))}
        <div style={{ position: "absolute", top: "10%", right: "12%", width: 100, height: 100, border: `1.5px dashed ${C.yellow}20`, borderRadius: "50%", animation: "spin-slow 25s linear infinite" }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.5rem" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.8rem", color: `${C.yellow}90`, letterSpacing: "0.35em", marginBottom: "1.5rem", opacity: heroVis ? 1 : 0, transition: "all 0.8s ease" }}>
            ◆ {edition.badge} · CURATED BY GANESH KHETAWAT ◆
          </div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3.5rem,12vw,9rem)", color: C.yellow, lineHeight: 0.9, letterSpacing: "0.04em", textShadow: `2px 2px 0 ${C.red}80, -1px -1px 0 ${C.blue}60`, opacity: heroVis ? 1 : 0, transform: heroVis ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>AI<br/>SUMMIT</h1>
            <h1 aria-hidden="true" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3.5rem,12vw,9rem)", color: C.cyan, lineHeight: 0.9, letterSpacing: "0.04em", position: "absolute", top: 0, left: 0, opacity: 0.2, animation: "glitch 4s infinite", pointerEvents: "none" }}>AI<br/>SUMMIT</h1>
          </div>

          <div style={{ marginTop: "2rem", display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap", opacity: heroVis ? 1 : 0, transition: "all 0.7s ease 0.3s" }}>
            {[{t:edition.short,bg:C.yellow,rot:-2.5},{t:`${topics.length} TOPICS`,bg:C.pink,rot:1.8},{t:edition.badge,bg:C.green,rot:-1.2},{t:"NEW EVERY SATURDAY ♥",bg:C.cyan,rot:2}].map((s,i) => (
              <span key={i} className="sticker" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(0.85rem,1.8vw,1.1rem)", background: s.bg, color: C.black, padding: "0.25rem 0.9rem", border: `2.5px solid ${C.black}`, boxShadow: `3px 3px 0 ${C.black}`, transform: `rotate(${s.rot}deg)`, letterSpacing: "0.08em", display: "inline-block", cursor: "default" }}>{s.t}</span>
            ))}
          </div>

          <div style={{ marginTop: "2.5rem", opacity: heroVis ? 1 : 0, transition: "all 0.8s ease 0.5s" }}>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.6rem", color: "#555", letterSpacing: "0.25em", marginBottom: "0.7rem" }}>FEATURING</div>
            <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", flexWrap: "wrap" }}>
              {featuredBrands.map((k, i) => (
                <span key={k} className="brand-strip-item" style={{
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  background: "rgba(255,255,255,0.05)", border: "1px solid #2a2a2a",
                  padding: "3px 8px 3px 5px",
                  fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.7rem", fontWeight: 600,
                  color: "#bbb", letterSpacing: "0.03em", cursor: "default",
                  transform: `rotate(${[-0.8, 0.4, -0.2, 0.6, -0.4, 0.8, -0.5, 0.3][i]}deg)`,
                }}>{brands[k].logo(14)}{brands[k].name}</span>
              ))}
            </div>
          </div>

          <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.1rem", fontWeight: 400, color: "#888", marginTop: "1.8rem", letterSpacing: "0.02em", opacity: heroVis ? 1 : 0, transition: "opacity 0.8s ease 0.6s" }}>
            What happened <span style={{ color: C.pink }}>✦</span> What matters <span style={{ color: C.green }}>✦</span> What's next
            <span style={{ animation: "blink 0.8s step-end infinite", color: C.yellow, marginLeft: "4px" }}>_</span>
          </p>

          <a href="#thanks" className="sticker" style={{ display: "inline-block", marginTop: "1.4rem", fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.75rem", fontWeight: 700, color: C.pink, border: `1.5px solid ${C.pink}60`, padding: "0.4rem 1rem", textDecoration: "none", letterSpacing: "0.12em", transform: "rotate(-0.5deg)", opacity: heroVis ? 1 : 0, transition: "opacity 0.8s ease 0.7s" }}>
            ♥ READ MY THANK-YOU NOTE ↓
          </a>

          <div style={{ marginTop: "2.5rem", opacity: heroVis ? 1 : 0, transition: "opacity 1s ease 0.8s" }}>
            <div style={{ width: 1, height: 40, background: `linear-gradient(${C.yellow}80, transparent)`, margin: "0 auto", animation: "float 1.5s ease-in-out infinite" }} />
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.5rem", color: `${C.yellow}70`, letterSpacing: "0.3em", marginTop: "0.4rem" }}>SCROLL</div>
          </div>
        </div>
      </section>

      <Marquee text={`${edition.badge} — ${topics.length} TOPICS — ${edition.range} — STAY CURIOUS`} bg={C.yellow} color={C.black} />

      {/* EDITION BADGE */}
      <div style={{ background: C.black }}>
        <EditionBadge />
      </div>

      {/* STATS */}
      <section id="stats" style={{ background: C.black, padding: "3rem 2rem 3.5rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${C.yellow}06 1px,transparent 1px)`, backgroundSize: "20px 20px", pointerEvents: "none" }} />
        <div style={{ textAlign: "center", marginBottom: "2rem", position: "relative" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.7rem", color: "#444", letterSpacing: "0.3em", marginBottom: "0.6rem" }}>SECTION 01 / BY THE NUMBERS</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.5rem", color: C.yellow, letterSpacing: "0.1em" }}>THE {edition.period} IN NUMBERS</h2>
        </div>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", position: "relative" }}>
          {statsData.map((s, i) => <AnimatedStat key={i} stat={s} index={i} />)}
        </div>
      </section>

      <Marquee text={edition.marquee} bg={C.black} color={C.yellow} dir="right" speed={35} />

      {/* TOPICS */}
      <section id="topics" style={{ background: sectionBg, position: "relative", transition: "background 0.5s" }}>
        <div style={{ position: "absolute", inset: 0, opacity: dark ? 0.04 : 0.02, pointerEvents: "none", backgroundImage: `repeating-linear-gradient(45deg,${dark?"#fff":C.black} 0,${dark?"#fff":C.black} 1px,transparent 0,transparent 50%),repeating-linear-gradient(-45deg,${dark?"#fff":C.black} 0,${dark?"#fff":C.black} 1px,transparent 0,transparent 50%)`, backgroundSize: "16px 16px" }} />
        <div style={{ textAlign: "center", padding: "3rem 1.5rem 0", position: "relative" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.75rem", color: dark ? "#666" : "#999", letterSpacing: "0.3em", marginBottom: "0.8rem" }}>SECTION 02 / DEEP DIVE</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.2rem,5vw,3.5rem)", color: C.black, display: "inline-block", background: C.pink, padding: "0.15rem 1.6rem", border: `3px solid ${C.black}`, boxShadow: `5px 5px 0 ${C.black}`, transform: "rotate(-0.8deg)", letterSpacing: "0.06em", lineHeight: 1.2 }}>THIS {edition.period}&apos;S {topics.length} TOPICS</h2>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.8rem", color: dark ? "#777" : "#999", marginTop: "1rem", letterSpacing: "0.05em" }}>Click any card to expand full details</p>
        </div>
        <div className="topic-grid">
          {topics.map((t, i) => <TopicCard key={i} topic={t} index={i} />)}
        </div>
      </section>

      {/* DIAGONAL DIVIDER */}
      <div style={{ position: "relative", height: "50px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -25, left: "-5%", right: "-5%", height: 100, background: C.black, transform: "rotate(-1.2deg)" }} />
      </div>

      {/* AI RACE SCOREBOARD */}
      <section id="race" style={{ background: C.black, padding: "3rem 1.5rem 3.5rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(90deg,${C.white}05 0,${C.white}05 1px,transparent 1px,transparent 80px)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.75rem", color: "#444", letterSpacing: "0.3em", marginBottom: "0.8rem" }}>SECTION 03 / THE AI RACE</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2rem,4.5vw,3rem)", color: C.black, background: C.yellow, display: "inline-block", padding: "0.15rem 1.4rem", border: `3px solid ${C.black}`, boxShadow: `4px 4px 0 ${C.pink}`, marginBottom: "0.8rem", transform: "rotate(-0.6deg)", letterSpacing: "0.06em" }}>WHO'S AHEAD? THE SCOREBOARD</h2>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.8rem", color: "#777", marginBottom: "2rem", letterSpacing: "0.03em" }}>Lane by lane, one line each — the whole race as of {edition.asOf}.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "1.2rem" }}>
            {raceLanes.map((r, i) => <RaceLane key={i} r={r} i={i} />)}
          </div>
        </div>
      </section>

      <Marquee text="THE RACE NEVER SLEEPS — STAY CURIOUS" bg={C.pink} color={C.black} speed={32} />

      {/* WATCH */}
      <section id="watch" style={{ background: C.black, padding: "3rem 1.5rem 4rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${C.yellow}04 1px,transparent 1px)`, backgroundSize: "24px 24px", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.75rem", color: "#444", letterSpacing: "0.3em", marginBottom: "0.8rem" }}>SECTION 04 / LOOKING AHEAD</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2rem,4.5vw,3rem)", color: C.black, background: C.lime, display: "inline-block", padding: "0.15rem 1.4rem", border: `3px solid ${C.black}`, boxShadow: `4px 4px 0 ${C.yellow}`, marginBottom: "2rem", transform: "rotate(0.6deg)", letterSpacing: "0.06em" }}>WHAT TO WATCH NEXT</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {watches.map((w, i) => (
              <WatchItem key={i} w={w} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAREWELL / GRATITUDE */}
      <section id="thanks" style={{ background: C.cream, borderTop: `3px solid ${C.black}`, padding: "4rem 1.5rem", position: "relative" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", background: C.white, border: `3px solid ${C.black}`, boxShadow: `8px 8px 0 ${C.black}`, padding: "2.5rem 2rem", position: "relative" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.7rem", color: "#777", letterSpacing: "0.3em", marginBottom: "0.8rem" }}>A NOTE FROM GANESH / OCT 30, 2026</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.2rem,5vw,3.4rem)", color: C.black, background: C.yellow, display: "inline-block", padding: "0.1rem 1.2rem", border: `3px solid ${C.black}`, boxShadow: `4px 4px 0 ${C.pink}`, transform: "rotate(-0.8deg)", letterSpacing: "0.06em", marginBottom: "1.6rem" }}>THANK YOU — THIS IS MY LAST DAY</h2>
          {[
            "Today is my last day, and this is my final edition of AI Summit. Tracking this race with you — every model launch, every benchmark fight, every \"wait, is that real?\" — has been one of the best parts of my time here.",
            "To everyone who read these, argued about the numbers, forwarded a card to a friend, or stopped me in the hallway with a question: thank you. Your curiosity is the reason this kept going.",
            "To my managers and mentors: thank you for the trust, the room to experiment, and the patience while I learned. To my teammates and friends: you made the hard days lighter and the good days better. I'm taking all of it with me.",
            "The models will keep getting smarter, the race will keep getting faster, and the headlines will keep getting stranger. Stay curious, stay kind, and keep asking what's next. I'll be cheering for every one of you from my next stop (scroll down).",
          ].map((p, i) => (
            <p key={i} style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.92rem", color: C.black, lineHeight: 1.7, marginBottom: "1rem" }}>{p}</p>
          ))}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1.6rem 0 0.4rem" }}>
            {[{t:"THANK YOU",bg:C.yellow,rot:-2},{t:"DHANYAVAAD",bg:C.pink,rot:1.5},{t:"GRACIAS",bg:C.cyan,rot:-1},{t:"MERCI",bg:C.green,rot:2},{t:"ARIGATŌ",bg:C.lavender,rot:-1.5}].map((s, i) => (
              <span key={i} className="sticker" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1rem", background: s.bg, color: C.black, padding: "0.2rem 0.8rem", border: `2px solid ${C.black}`, boxShadow: `2px 2px 0 ${C.black}`, transform: `rotate(${s.rot}deg)`, letterSpacing: "0.08em", display: "inline-block", cursor: "default" }}>{s.t}</span>
            ))}
          </div>
          <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", color: C.black, letterSpacing: "0.06em", marginTop: "1.4rem" }}>
            WITH GRATITUDE, <span style={{ color: C.pink }}>GANESH KHETAWAT</span> <span style={{ color: C.red }}>♥</span>
          </p>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.78rem", color: "#666", lineHeight: 1.6, marginTop: "0.8rem", fontStyle: "italic" }}>
            P.S. Somewhere, a model is reading this page and scoring its sentiment. For the record: 100% grateful, 0% hallucinated.
          </p>
        </div>
      </section>

      {/* WHAT'S NEXT — JOINING JCODE */}
      <section id="next" style={{ background: C.black, borderTop: `3px solid ${C.black}`, padding: "4rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.green}08 1px,transparent 1px),linear-gradient(90deg,${C.green}08 1px,transparent 1px)`, backgroundSize: "32px 32px", pointerEvents: "none" }} />
        <div className="next-slide" style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", background: "#101010", border: `3px solid ${C.green}`, boxShadow: `10px 10px 0 ${C.green}40`, padding: "clamp(1.5rem,4vw,3rem)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.8rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.7rem", color: "#666", letterSpacing: "0.3em" }}>SECTION 05 / WHAT'S NEXT</span>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.65rem", fontWeight: 700, color: C.black, background: C.green, padding: "3px 10px", letterSpacing: "0.12em" }}>NEW CHAPTER</span>
          </div>

          <div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "clamp(0.8rem,1.6vw,1rem)", color: C.green, letterSpacing: "0.05em", marginBottom: "0.6rem" }}>From covering the AI race to running in it —</div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,9vw,6.5rem)", color: C.white, lineHeight: 0.95, letterSpacing: "0.03em" }}>
              I'M JOINING <span style={{ color: C.black, background: C.green, padding: "0 0.25em", display: "inline-block", transform: "rotate(-1.5deg)", boxShadow: `5px 5px 0 ${C.yellow}` }}>JCODE</span>
            </h2>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1rem,2vw,1.25rem)", color: "#aaa", marginTop: "1.2rem", lineHeight: 1.5, maxWidth: "720px" }}>
              High-performance coding agents — open source, built in Rust, and part of Y Combinator's Summer 2026 batch in San Francisco.
            </p>
          </div>

          <div style={{ background: C.black, border: "1.5px solid #2a2a2a", padding: "1rem 1.2rem", fontFamily: "'IBM Plex Mono',monospace", fontSize: "clamp(0.75rem,1.4vw,0.9rem)", lineHeight: 1.8, overflowX: "auto", whiteSpace: "nowrap" }}>
            <div><span style={{ color: C.pink }}>ganesh@ai-summit</span><span style={{ color: "#666" }}>:~$</span> <span style={{ color: C.white }}>git checkout -b next-chapter</span></div>
            <div><span style={{ color: C.pink }}>ganesh@ai-summit</span><span style={{ color: "#666" }}>:~$</span> <span style={{ color: C.white }}>echo "joining jcode"</span></div>
            <div style={{ color: C.green }}>joining jcode<span style={{ animation: "blink 0.8s step-end infinite", color: C.yellow, marginLeft: "4px" }}>▌</span></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: "0.8rem" }}>
            {[
              { big: "~20K", small: "GITHUB STARS", c: C.yellow },
              { big: "20×", small: "LESS MEMORY PER AGENT*", c: C.green },
              { big: "MIT", small: "OPEN SOURCE · RUST", c: C.cyan },
              { big: "YC S26", small: "SAN FRANCISCO", c: C.orange },
            ].map((f, i) => (
              <div key={i} style={{ border: `2px solid ${f.c}`, padding: "0.8rem 1rem" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem", color: f.c, lineHeight: 1, letterSpacing: "0.03em" }}>{f.big}</div>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.65rem", color: "#888", letterSpacing: "0.14em", marginTop: "0.35rem" }}>{f.small}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.68rem", color: "#555", lineHeight: 1.6, maxWidth: "640px" }}>
              *vs. Claude Code, per JCode's own published benchmarks (~10 MB vs. ~213 MB per session) — which means more agents running in parallel on the same machine.
            </p>
            <a href="https://jcode.sh/" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.8rem", fontWeight: 700, color: C.green, border: `2px solid ${C.green}`, padding: "0.5rem 1rem", textDecoration: "none", letterSpacing: "0.08em" }}>JCODE.SH ↗</a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section style={{
        background: `linear-gradient(135deg, ${C.black} 0%, #1a1a2e 100%)`,
        padding: "3rem 1.5rem",
        textAlign: "center",
        borderTop: `3px solid ${C.yellow}30`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at center, ${C.yellow}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{
            fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.7rem",
            color: "#555", letterSpacing: "0.3em", marginBottom: "0.8rem",
          }}>THE RACE GOES ON</div>
          <h2 style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2rem,4vw,3.2rem)",
            color: C.yellow, letterSpacing: "0.08em", marginBottom: "0.8rem",
          }}>LET'S STAY IN TOUCH</h2>
          <p style={{
            fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.85rem",
            color: "#888", marginBottom: "1.5rem", lineHeight: 1.6,
          }}>
            That's a wrap on this {edition.period.toLowerCase()}'s edition of AI Summit. A new edition lands every Saturday — the race keeps going, and so does the conversation.
          </p>
          <div style={{
            display: "inline-flex", border: `3px solid ${C.yellow}`,
            boxShadow: `4px 4px 0 ${C.black}`,
            overflow: "hidden",
          }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.9rem",
                padding: "0.75rem 1.2rem", border: "none",
                background: `${C.black}`, color: C.white,
                outline: "none", minWidth: "260px",
                letterSpacing: "0.03em",
              }}
            />
            <button style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.15rem",
              padding: "0.75rem 1.8rem", border: "none",
              background: C.yellow, color: C.black,
              cursor: "pointer", letterSpacing: "0.08em",
              fontWeight: 400, transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.target.style.background = C.pink; e.target.style.color = C.black; }}
              onMouseLeave={e => { e.target.style.background = C.yellow; e.target.style.color = C.black; }}
            >SUBSCRIBE</button>
          </div>
          <p style={{
            fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.65rem",
            color: "#444", marginTop: "1rem", letterSpacing: "0.1em",
          }}>NEW EDITION EVERY SATURDAY • THANK YOU FOR READING • KEEP ASKING WHAT'S NEXT</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.yellow, borderTop: `3px solid ${C.black}`, padding: "1.5rem", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `repeating-linear-gradient(45deg,${C.black} 0,${C.black} 1px,transparent 0,transparent 8px)`, pointerEvents: "none" }} />
        <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", color: C.black, letterSpacing: "0.08em", position: "relative" }}>
          BUILT WITH <span style={{ color: C.red, animation: "float 1s ease-in-out infinite", display: "inline-block" }}>♥</span> FOR THE AI COMMUNITY
        </p>
        <div style={{ marginTop: "0.8rem", display: "inline-block", background: C.black, padding: "0.3rem 1.3rem", border: `2.5px solid ${C.black}`, boxShadow: `3px 3px 0 ${C.pink}`, transform: "rotate(-0.8deg)", position: "relative" }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.15rem", color: C.yellow, letterSpacing: "0.1em" }}>MADE BY </span>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.15rem", color: C.pink, letterSpacing: "0.1em" }}>GANESH KHETAWAT</span>
        </div>
        <div style={{ marginTop: "0.8rem", display: "flex", justifyContent: "center", gap: "0.6rem", position: "relative" }}>
          {[
            { label: "TWITTER/X", icon: "𝕏" },
            { label: "GITHUB", icon: "⌨" },
            { label: "LINKEDIN", icon: "in" },
          ].map((link, i) => (
            <span key={i} style={{
              fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.7rem", fontWeight: 700,
              background: C.black, color: C.yellow, padding: "6px 12px",
              border: `2px solid ${C.black}`, cursor: "pointer",
              boxShadow: `2px 2px 0 ${C.pink}`,
              letterSpacing: "0.06em",
              transition: "all 0.3s",
              display: "inline-flex", alignItems: "center", gap: "4px",
            }}
              onMouseEnter={e => { e.target.style.boxShadow = `3px 3px 0 ${C.pink}`; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.boxShadow = `2px 2px 0 ${C.pink}`; e.target.style.transform = "translateY(0)"; }}
            >
              <span style={{ fontSize: "0.7rem" }}>{link.icon}</span> {link.label}
            </span>
          ))}
        </div>
        <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.7rem", color: C.black, marginTop: "0.8rem", opacity: 0.4, letterSpacing: "0.15em", position: "relative" }}>{edition.published} — {edition.badge} · THANK YOU FOR READING</p>
      </footer>
    </div>
  );
}
