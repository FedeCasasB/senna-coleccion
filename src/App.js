import React, { useState } from "react";
import DESCRIPTIONS from "./descriptions";

const SENNA_CARS = [
  { year: 1984, car: "Toleman TG184", team: "Toleman", engine: "Hart 415T L4 Turbo 1.5", race_wins: 0, poles: 0, podiums: 2, image :"https://www.goodwood.com/globalassets/.road--racing/race/historic/2024/04-april/tfif-senna-monaco/ayrton_senna_monaco_1984_goodwood_12042024_list.jpg" },
  { year: 1985, car: "Lotus 97T", team: "Lotus", engine: "Renault EF4 V6 Turbo 1.5", race_wins: 2, poles: 7, podiums: 7, image :"https://imagenes.topgear.es/files/image_1920_1080/uploads/imagenes/2025/04/10/68c99bd621c17.jpeg" },
  { year: 1986, car: "Lotus 98T", team: "Lotus", engine: "Renault EF15 V6 Turbo 1.5", race_wins: 2, poles: 8, podiums: 8, image :"https://motorspot.es/wp-content/uploads/2014/03/1986_lotus_98t.jpg" },
  { year: 1987, car: "Lotus 99T", team: "Lotus", engine: "Honda RA167E V6 Turbo 1.5", race_wins: 2, poles: 2, podiums: 7, image :"https://live.staticflickr.com/2466/4014054060_c8f942ca1c_o.jpg" },
  { year: 1992, car: "McLaren MP4/7A", team: "McLaren", engine: "Honda RA122E V12 3.5", race_wins: 3, poles: 1, podiums: 11, image :"https://www.f1technical.net/f1db/cars/images/1992/mclaren-mp4-7a-big.jpg" },
  { year: 1993, car: "McLaren MP4/8", team: "McLaren", engine: "Ford HB V8 3.5", race_wins: 5, poles: 1, podiums: 15, image :"https://www.autohebdo.fr/app/uploads/2024/05/DPPI_09011031_015.jpg" },
  { year: 1994, car: "Williams FW16", team: "Williams", engine: "Renault RS6 V10 3.5", race_wins: 0, poles: 3, podiums: 0, image :"https://www.snaplap.net/wp-content/uploads/2017/04/williams_fw16.jpg" },
];

const TEAM_COLORS = {
  "Toleman": { primary: "#CC0000", secondary: "#FFFFFF" },
  "Lotus": { primary: "#000000", secondary: "#FFD700" },
  "McLaren": { primary: "#FF0000", secondary: "#FFFFFF" },
  "Williams": { primary: "#003087", secondary: "#FFFFFF" },
};

function CarSVG({ team, year }) {
  const colors = TEAM_COLORS[team] || { primary: "#333", secondary: "#FFF" };
  const isModern = year >= 1992;
  const isTurbo = year <= 1987;
  return (
    <svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <ellipse cx="140" cy="90" rx="100" ry="6" fill="rgba(255,255,255,0.1)"/>
      <circle cx="75" cy="72" r={isModern?18:15} fill="#111" stroke="#333" strokeWidth="2"/>
      <circle cx="75" cy="72" r={isModern?11:9} fill="#222"/>
      <circle cx="210" cy="72" r={isModern?15:13} fill="#111" stroke="#333" strokeWidth="2"/>
      <circle cx="210" cy="72" r={isModern?9:7} fill="#222"/>
      <path d={isModern?"M65,65 L68,45 L90,35 L170,32 L220,42 L235,55 L230,65 L190,68 L90,68 Z":"M65,65 L70,48 L95,38 L170,35 L215,45 L228,58 L220,65 L185,68 L90,68 Z"} fill={colors.primary}/>
      <path d={isModern?"M120,35 L125,22 L155,22 L160,35 Z":"M120,38 L125,25 L152,25 L157,38 Z"} fill="#111" stroke={colors.secondary} strokeWidth="1"/>
      <path d={isModern?"M128,27 L152,27 L150,32 L130,32 Z":"M128,28 L150,28 L148,33 L130,33 Z"} fill="#B8E0FF" opacity="0.9"/>
      <path d={isModern?"M220,55 L235,55 L245,60 L235,65 L220,65 Z":"M215,55 L228,55 L240,60 L228,65 L215,65 Z"} fill={colors.primary}/>
      <rect x={isModern?230:225} y={isModern?60:61} width={isModern?24:22} height="3" fill={colors.secondary} opacity="0.9"/>
      <rect x="42" y={isModern?38:42} width={isModern?22:18} height="4" fill={colors.secondary} opacity="0.9"/>
      {isTurbo&&<><path d="M88,42 L100,38 L100,45 L88,48 Z" fill="#555"/><path d="M175,38 L187,42 L187,48 L175,45 Z" fill="#555"/></>}
      <path d={isModern?"M95,35 L165,33 L165,37 L95,39 Z":"M98,38 L168,36 L168,40 L98,42 Z"} fill={colors.secondary} opacity="0.5"/>
      <rect x="100" y="68" width="40" height="14" rx="2" fill="rgba(0,0,0,0.7)"/>
      <text x="120" y="79" textAnchor="middle" fill="#FFD700" fontSize="9" fontFamily="monospace" fontWeight="bold">{year}</text>
    </svg>
  );
}

function StatBadge({ value, label, color }) {
  return (
    <div style={{textAlign:"center", padding:"6px 8px", background:"rgba(255,255,255,0.05)", border:`1px solid ${color}40`}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color, lineHeight:1}}>{value}</div>
      <div style={{fontSize:9, color:"#888", letterSpacing:"0.1em", marginTop:2}}>{label}</div>
    </div>
  );
}

function CarCard({ car }) {
  const [expanded, setExpanded] = useState(false);
  const description = DESCRIPTIONS[car.year];
  const colors = TEAM_COLORS[car.team] || { primary: "#333", secondary: "#FFF" };
  const isFinal = car.year === 1994;

  return (
    <div style={{
      background: "linear-gradient(160deg, #0D0D0D 0%, #1A1A1A 100%)",
      border: `1px solid ${isFinal ? "#FFD700" : colors.primary}`,
      borderTop: `6px solid ${isFinal ? "#FFD700" : colors.primary}`,
      fontFamily: "'Times New Roman', serif",
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.2s, box-shadow 0.2s",
      boxShadow: `4px 4px 0px rgba(0,0,0,0.5)`,
    }}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 30px rgba(${isFinal?"255,215,0":colors.primary==="#FF0000"?"255,0,0":colors.primary==="#000000"?"255,215,0":"0,48,135"},0.3)`;}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="4px 4px 0px rgba(0,0,0,0.5)";}}>

      {/* Watermark */}
      <div style={{position:"absolute",top:-10,right:-5,fontSize:90,fontFamily:"'Bebas Neue',sans-serif",color:"#FFFFFF",opacity:0.03,lineHeight:1,userSelect:"none",pointerEvents:"none"}}>{car.year}</div>

      {/* Brazil flag accent top */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:"3px",background:"linear-gradient(90deg, #009C3B, #FFDF00, #009C3B)",opacity:0.6}}/>

      {/* Header */}
      <div style={{padding:"14px 14px 10px", borderBottom:`1px solid rgba(255,255,255,0.08)`, position:"relative", zIndex:1}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:32, lineHeight:1, color: isFinal ? "#FFD700" : colors.primary === "#000000" ? "#FFD700" : colors.primary, letterSpacing:"0.03em"}}>{car.year}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:13, color:"#CCC", letterSpacing:"0.1em", textTransform:"uppercase", marginTop:2}}>{car.car}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:11, color:"#666", letterSpacing:"0.08em", marginTop:1}}>{car.team.toUpperCase()}</div>
          </div>
          {isFinal && (
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:10, color:"#FFD700", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.15em", border:"1px solid #FFD700", padding:"2px 6px"}}>ÚLTIMO COCHE</div>
            </div>
          )}
        </div>
      </div>

      {/* Car illustration */}
      <div style={{padding:"10px 14px", height:110, background:"#0A0A0A", position:"relative", zIndex:1}}>
        <CarSVG team={car.team} year={car.year}/>
      </div>

      {/* Stats */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, padding:"10px 14px", borderBottom:`1px solid rgba(255,255,255,0.06)`, position:"relative", zIndex:1}}>
        <StatBadge value={car.race_wins} label="VICTORIAS" color="#FFD700"/>
        <StatBadge value={car.poles} label="POLES" color="#009C3B"/>
        <StatBadge value={car.podiums} label="PODIOS" color="#CCC"/>
      </div>

      {/* Motor */}
      <div style={{padding:"8px 14px", borderBottom:`1px solid rgba(255,255,255,0.06)`, position:"relative", zIndex:1}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:9, color:"#555", letterSpacing:"0.15em"}}>MOTOR</div>
        <div style={{fontSize:11, color:"#AAA", fontStyle:"italic", marginTop:2}}>{car.engine}</div>
      </div>

      {/* Description */}
      {description && (
        <div style={{padding:"10px 14px", position:"relative", zIndex:1}}>
          <div style={{
            overflow:"hidden",
            maxHeight: expanded ? "400px" : "52px",
            transition:"max-height 0.3s ease",
            maskImage: expanded ? "none" : "linear-gradient(to bottom, black 40%, transparent 100%)",
            WebkitMaskImage: expanded ? "none" : "linear-gradient(to bottom, black 40%, transparent 100%)",
          }}>
            <div style={{fontSize:11, lineHeight:1.7, color:"#AAA", fontStyle:"italic", borderLeft:`2px solid ${isFinal?"#FFD700":colors.primary==="#000000"?"#FFD700":colors.primary}`, paddingLeft:8}}>
              {description}
            </div>
          </div>
          <button onClick={()=>setExpanded(!expanded)} style={{marginTop:8, width:"100%", padding:"5px 0", background:"transparent", color: isFinal?"#FFD700":colors.primary==="#000000"?"#FFD700":colors.primary, border:`1px solid ${isFinal?"#FFD700":colors.primary==="#000000"?"#FFD700":colors.primary}40`, cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", fontSize:11, letterSpacing:"0.1em"}}>
            {expanded ? "◀ LEER MENOS" : "▶ LEER MÁS"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function SennaCollection() {
  const urlYear = parseInt(new URLSearchParams(window.location.search).get("year"));
  const qrCar = urlYear ? SENNA_CARS.find(c => c.year === urlYear) : null;

  if (qrCar) return (
    <div style={{minHeight:"100vh", background:"#0A0A0A", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24}}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"/>
      <div style={{width:"100%", maxWidth:360}}>
        <div style={{textAlign:"center", marginBottom:16}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:13, color:"#FFD700", letterSpacing:"0.25em"}}>AYRTON SENNA · MONOPLAZAS F1</div>
        </div>
        <CarCard car={qrCar}/>
        <div style={{textAlign:"center", marginTop:16}}>
          <a href="/" style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:11, color:"#666", letterSpacing:"0.15em", textDecoration:"none"}}>VER COLECCIÓN COMPLETA →</a>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh", background:"#0A0A0A", fontFamily:"'Times New Roman', serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"/>

      {/* Header */}
      <div style={{textAlign:"center", padding:"56px 24px 40px", position:"relative", overflow:"hidden", borderBottom:"1px solid #1A1A1A"}}>
        <div style={{position:"absolute", top:0, left:0, right:0, height:"4px", background:"linear-gradient(90deg, #009C3B, #FFDF00, #002776, #FFDF00, #009C3B)"}}/>
        <div style={{position:"absolute", top:0, left:0, right:0, bottom:0, background:"radial-gradient(ellipse at center top, rgba(255,215,0,0.05) 0%, transparent 70%)", pointerEvents:"none"}}/>

        <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(14px,3vw,18px)", color:"#009C3B", letterSpacing:"0.4em", marginBottom:8}}>COLECCIÓN PRIVADA</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,12vw,100px)", color:"#FFD700", letterSpacing:"0.05em", lineHeight:0.9, textShadow:"0 0 60px rgba(255,215,0,0.2)"}}>AYRTON</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,12vw,100px)", color:"#FFFFFF", letterSpacing:"0.05em", lineHeight:0.9}}>SENNA</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(12px,2.5vw,16px)", color:"#444", letterSpacing:"0.3em", marginTop:16, borderTop:"1px solid #1A1A1A", paddingTop:16}}>
          MONOPLAZAS DE FÓRMULA 1 · 1984 – 1994
        </div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:12, color:"#333", letterSpacing:"0.2em", marginTop:6}}>
          EXCLUIDOS LOS COCHES CAMPEONES DEL MUNDO · 7 MONOPLAZAS
        </div>
      </div>

      {/* Grid */}
      <div style={{maxWidth:1200, margin:"0 auto", padding:"40px 24px"}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:24}}>
          {SENNA_CARS.map(car => <CarCard key={car.year} car={car}/>)}
        </div>
      </div>

      {/* Footer */}
      <div style={{textAlign:"center", padding:"32px 24px", borderTop:"1px solid #1A1A1A"}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:11, color:"#333", letterSpacing:"0.3em"}}>
          "SIENDO SEGUNDO NO SOY NADIE. SI NO PUEDO GANAR, NO TIENE SENTIDO CORRER." — AYRTON SENNA
        </div>
        <div style={{height:1, background:"linear-gradient(90deg, transparent, #FFD700, transparent)", margin:"16px auto", maxWidth:300, opacity:0.3}}/>
        <div style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:10, color:"#222", letterSpacing:"0.2em"}}>
          SÃO PAULO 1960 · IMOLA 1994
        </div>
      </div>
    </div>
  );
}
