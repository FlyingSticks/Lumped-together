// check_calibration_room_v2.js — runs against rig_math.js (pre-build) or the shipped HTML's RIG block.
var RIG = require(process.argv[2] || './rig_math.js');
var pass = 0, fail = 0;
function ok(name, cond, note){ if(cond){pass++; console.log('  ok  ' + name + (note?'  ['+note+']':''));} else {fail++; console.log('  FAIL ' + name + (note?'  ['+note+']':''));} }
function near(a,b,tol){ return Math.abs(a-b) <= (tol||1e-9)*Math.max(1,Math.abs(b)); }
function rnd(a,b){ return a + Math.random()*(b-a); }
var Zp = 200, D = 100, S = RIG.slits(Zp, D), Zv = S.Zv, Zh = S.Zh;

console.log('rig constants');
ok('Zv = 150, Zh = 250', Zv===150 && Zh===250);
ok('z* = 187.5 (harmonic mean)', near(RIG.zStar(Zv,Zh), 187.5));
ok('z* = Zp − D²/4Zp (dial form)', near(RIG.zStarDial(Zp,D), 187.5));
ok('GM = √(ZvZh) ≈ 193.649', near(RIG.GM(Zv,Zh), 193.6491673, 1e-7));
ok('AR(350) = 0.300 (plate, D=100)', near(RIG.AR(Zv,Zh,350), 0.3));
var S50 = RIG.slits(Zp,50);
ok('AR(350) = 0.556 (plate, D=50)', near(RIG.AR(S50.Zv,S50.Zh,350), 0.5556, 1e-3));
ok('z* at D=50 = 196.9 (plate)', near(RIG.zStarDial(Zp,50), 196.875));
ok('AR saturates to Zv/Zh = 0.6', near(RIG.AR(Zv,Zh,1e9), 0.6, 1e-6));
ok('AR(Zh) = 0: the horizontal slit is the zero', near(RIG.AR(Zv,Zh,Zh), 0));

console.log('the harmonic thread');
var allNeg1 = true, mirror = true, dialAgree = true, glideToo = true;
for (var d = 2; d <= 180; d += 2) { var s = RIG.slits(Zp,d), zs = RIG.zStar(s.Zv,s.Zh);
  if (!near(RIG.AR(s.Zv,s.Zh,zs), -1)) allNeg1 = false;
  if (!near(RIG.mX(s.Zv,zs), -RIG.mY(s.Zh,zs))) mirror = false;
  if (!near(RIG.zStarDial(Zp,d), zs)) dialAgree = false;
  if (!near(RIG.ARg(s.Zv,s.Zh,zs), -1)) glideToo = false; }
ok('AR(z*) = −1 for every D in (0,180]', allNeg1);
ok('at z* the two magnifications cancel: mX = −mY', mirror);
ok('harmonic mean = Zp − D²/4Zp for every D', dialAgree);
ok('glide reading also sits at −1 on the neutral surface', glideToo);
var meansOrder = true;
for (var d2 = 1; d2 <= 180; d2 += 1) { var s2 = RIG.slits(Zp,d2), hm = RIG.zStar(s2.Zv,s2.Zh), gm = RIG.GM(s2.Zv,s2.Zh);
  if (!(hm < gm && gm < Zp)) meansOrder = false; }
ok('HM < GM < AM for every D > 0', meansOrder);
var s0 = RIG.slits(Zp,0);
ok('all three means collapse to Zp at D = 0', near(RIG.zStar(s0.Zv,s0.Zh),Zp) && near(RIG.GM(s0.Zv,s0.Zh),Zp));

console.log('the calibrated reading');
var dec = true, cr = true, flat = true;
for (var i = 0; i < 400; i++) { var z = rnd(260, 1200);
  if (!near(RIG.decode(Zv,Zh,RIG.AR(Zv,Zh,z)), z, 1e-10)) dec = false;
  if (!near(RIG.crossRatio(Zv,Zh,0,z), RIG.AR(Zv,Zh,z))) cr = false;
  if (!near(RIG.AR(s0.Zv,s0.Zh,z), 1)) flat = false; }
ok('decode(AR(z)) = z — the Möbius map inverts', dec);
ok('AR = cross-ratio (Zv, Zh ; screen, z)', cr);
ok('D = 0: AR ≡ 1 at every depth — depth lost', flat);

console.log('two readings, one congruence');
var prod = true, recip = true, straight = true, bows = 0, straightAt0 = true;
for (var j = 0; j < 300; j++) { var zz = rnd(260,1200), X = rnd(-80,80), Y = rnd(-80,80);
  if (!near(RIG.mX(Zv,zz)*RIG.gX(Zv,zz), 1) || !near(RIG.mY(Zh,zz)*RIG.gY(Zh,zz), 1)) prod = false;
  if (!near(RIG.AR(Zv,Zh,zz)*RIG.ARg(Zv,Zh,zz), 1)) recip = false;
  var z1 = rnd(260,700), z2 = z1 + rnd(50,500);
  var A = RIG.imgGL(Zv,Zh,X,Y,z1), Bp = RIG.imgGL(Zv,Zh,X,Y,z2), C = RIG.imgGL(Zv,Zh,X,Y,(z1+z2)/2);
  var cross = (Bp.x-A.x)*(C.y-A.y) - (Bp.y-A.y)*(C.x-A.x);
  if (Math.abs(cross) > 1e-9*Math.hypot(Bp.x-A.x,Bp.y-A.y)*Math.hypot(C.x-A.x,C.y-A.y)) straight = false;
  if (Math.abs(X) > 5 && Math.abs(Y) > 5 && RIG.sagitta(RIG.imgCS,Zv,Zh,X,Y,z1,z2,40).s > 1e-6) bows++;
  if (RIG.sagitta(RIG.imgCS,s0.Zv,s0.Zh,X,Y,z1,z2,40).s > 1e-9) straightAt0 = false; }
ok('gauge product m·g = 1 per channel along every ray', prod);
ok('AR_glide = 1/AR_cross-slit', recip);
ok('glide depth lines straight (3 image points collinear)', straight);
ok('cross-slit depth lines bow off the axes when D > 0', bows > 250, bows + '/300 bowed');
ok('cross-slit depth lines straight at D = 0 (perspective)', straightAt0);
var fuse = true;
for (var f = 0; f < 200; f++) { var X3 = rnd(-80,80), Y3 = rnd(-80,80), za = rnd(260,700), zb = rnd(260,700);
  var pA = RIG.imgCS(s0.Zv,s0.Zh,X3,Y3,za), pB = RIG.imgGL(s0.Zv,s0.Zh,X3,Y3,zb);
  if (Math.abs(pA.x*pB.y - pA.y*pB.x) > 1e-9*Math.hypot(pA.x,pA.y)*Math.hypot(pB.x,pB.y)) fuse = false; }
ok('D = 0: both readings fuse on one spoke through V per seed (graduations reciprocal)', fuse);

console.log('the correction and the budget');
var sq = true;
for (var k = 0; k < 100; k++) { var z0 = rnd(300,900), a = RIG.AR(Zv,Zh,z0), ag = RIG.ARg(Zv,Zh,z0);
  var half = 30, P = RIG.imgCS(Zv,Zh,half,half,z0), Q = RIG.imgGL(Zv,Zh,half,half,z0);
  if (!near(Math.abs(P.x/a)/Math.abs(P.y), 1)) sq = false;
  if (!near(Math.abs(Q.x/ag)/Math.abs(Q.y), 1)) sq = false; }
ok('one reciprocal factor squares the frame at z₀, both readings', sq);
var e1 = RIG.epsX(D, 4, 350, Zv, Zh), e5 = RIG.epsX(D, 20, 350, Zv, Zh);
ok('clean band ≈ 4 units per percent at z₀ = 350', near(e1, 0.01) && near(e5, 0.05));
var firstOrder = true;
[1,2,4].forEach(function(dl){ var z0 = 350, e = RIG.epsX(D,dl,z0,Zv,Zh);
  var actual = RIG.AR(Zv,Zh,z0+dl/2)/RIG.AR(Zv,Zh,z0) - 1;
  if (Math.abs(actual - e) > 0.02*Math.abs(e)) firstOrder = false; });
ok('εx = D·Δ/2(z₀−Zv)(z₀−Zh) matches the band-end residual to first order', firstOrder);
var bowQuad = RIG.sagitta(RIG.imgCS,Zv,Zh,40,40,350,350+4,80).s / RIG.sagitta(RIG.imgCS,Zv,Zh,40,40,350,350+2,80).s;
ok('bow is O(Δ²): doubling Δ ≈ ×4 sagitta', near(bowQuad, 4, 0.06), 'ratio ' + bowQuad.toFixed(3));
var corr = RIG.sagitta(RIG.imgCS,Zv,Zh,20,20,350,950,200);
ok('corridor plate: sagitta ≈ 1.5 on a 44.3 chord', near(corr.s,1.5,0.05) && near(corr.chord,44.3,0.01), corr.s.toFixed(2)+' on '+corr.chord.toFixed(1));
ok('corridor plate: AR along it 0.30, 0.48, 0.53', near(RIG.AR(Zv,Zh,350),0.30,1e-2) && near(RIG.AR(Zv,Zh,650),0.48,1e-2) && near(RIG.AR(Zv,Zh,950),0.525,1e-2));
var bg = RIG.budget(600, 100, 40), bw = RIG.budget(40, 100, 160);
ok('budget: corridor Δ·D=60,000 vs B²=1,600 → perspective', bg.cost===60000 && bg.breadth===1600 && bg.verdict==='perspective');
ok('budget: wide section Δ·D=4,000 vs B²=25,600 → glide', bw.verdict==='glide');

console.log('\n' + pass + '/' + (pass+fail) + ' checks pass');
process.exit(fail ? 1 : 0);
