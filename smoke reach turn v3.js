// smoke_reach_turn_v2.js — checks for the v2 fixes (B1, M1, M2, M4) against the RT module extracted from the HTML
var fs=require('fs'); var html=fs.readFileSync('reach-and-turn-v3.html','utf8');
eval(html.match(/var RT = \(function\(\)\{[\s\S]*?\}\)\(\);/)[0]);
var n=0,f=0; function T(name,ok){ n++; if(!ok) f++; console.log((ok?'pass':'FAIL')+'  '+name); }
var INF=Infinity;
// B1: normalized product residual is scale-free and under tolerance whether inputs are pixels or fractions
var worstPix=0, worstFrac=0, worstRaw=0;
for(var u=0.05;u<=0.95;u+=0.0025)for(var v=0.05;v<=0.95;v+=0.0025){
  worstFrac=Math.max(worstFrac,RT.productResidual(u,1-u,v,1-v));
  worstPix=Math.max(worstPix,RT.productResidual(u*400,(1-u)*400,v*140,(1-v)*140));
  worstRaw=Math.max(worstRaw,Math.abs(RT.balances(u*400,(1-u)*400,v*140,(1-v)*140).product)); }
T('B1  residual (fractions) < 1e-12   worst '+worstFrac.toExponential(2), worstFrac<1e-12);
T('B1  residual (pixels)    < 1e-12   worst '+worstPix.toExponential(2), worstPix<1e-12);
T('B1  raw pixel product would NOT pass 1e-12 (the reviewer\'s point)   worst '+worstRaw.toExponential(2), worstRaw>1e-12);
T('B1  residual is scale-free: pixels vs fractions agree to 1e-15', Math.abs(RT.productResidual(0.62*400,0.38*400,0.38*140,0.62*140)-RT.productResidual(0.62,0.38,0.38,0.62))<1e-15);
// M1: the witness tends to 2 from below, never dips under 1, and the slider's D-range sweeps (1,2)
T('M1  witness(d=1e9) within 1e-6 of 2', Math.abs(RT.witness(1,1e9)-2)<1e-6);
T('M1  witness(d=0.0316, slider bottom) = 2(1+d)/(2+d) ≈ 1.0156', Math.abs(RT.witness(1,Math.pow(10,-1.5))-2*(1+Math.pow(10,-1.5))/(2+Math.pow(10,-1.5)))<1e-12);
var ok=true; for(var e=-1.5;e<1.5;e+=0.01){ var d=Math.pow(10,e), w=RT.witness(1,d); if(!(w>=1&&w<2)) ok=false; } T('M1  witness in [1,2) across the slider sweep', ok);
var inc=true; var prev=0; for(var e=-1.5;e<3;e+=0.05){ var w=RT.witness(1,Math.pow(10,e)); if(w<prev) inc=false; prev=w; } T('M1  witness monotone increasing in d', inc);
// M2: the six arcs are exactly the fixed-pair partners of the three involutions
T('M2  τ: 0↔1, −1↔2', RT.tau(0)===1&&RT.tau(-1)===2);
T('M2  ρ: ½↔2, 0↔∞', RT.rho(0.5)===2&&RT.rho(0)===INF&&RT.rho(INF)===0);
T('M2  third: −1↔½, 1↔∞', Math.abs(RT.third(-1)-0.5)<1e-15&&RT.third(1)===INF&&RT.third(INF)===1);
T('M2  fixed points: τ ½,∞; ρ ±1; third 0,2', RT.tau(0.5)===0.5&&RT.tau(INF)===INF&&RT.rho(1)===1&&RT.rho(-1)===-1&&RT.third(0)===0&&RT.third(2)===2);
// M4: tangent witness geometry on the negative side (R=1 units): T at (sg/outer, sqrt(1-1/outer^2)) lies on the circle and OT ⟂ PT
function wit(x){ var xi=1/x, sg=x<0?-1:1, outer=Math.max(Math.abs(x),Math.abs(xi)); var tx=sg/outer, ty=Math.sqrt(1-1/(outer*outer)); var px=sg*outer;
  return {onCircle:Math.abs(tx*tx+ty*ty-1), perp:Math.abs(tx*(px-tx)+ty*(0-ty)), aboveInner:Math.abs(tx-sg*Math.min(Math.abs(x),Math.abs(xi)))}; }
var g=true; [-2.4,-1.7,-0.6,-0.2,0.2,0.6,1.7,2.4].forEach(function(x){ var r=wit(x); if(r.onCircle>1e-12||r.perp>1e-12||r.aboveInner>1e-12) g=false; });
T('M4  tangent witness: T on circle, OT ⟂ PT, T above the inner point, both sides of 0', g);
T('M4  ρ on the negative side: (−x)(1/(−x)) = 1', Math.abs(-1.7*RT.rho(-1.7)-1)<1e-15);
T('M4  ω³ = id at a negative x', Math.abs(RT.omega(RT.omega(RT.omega(-1.3)))+1.3)<1e-12);
console.log('\n'+(n-f)+'/'+n+' pass');
process.exit(f?1:0);
