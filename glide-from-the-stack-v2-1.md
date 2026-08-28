# Glide from the Stack — v2.1: The Anchor and the Spine
## Expansions of §8.3 and §8.5

---

## 8.3′ The anchor: why the A/B split is affine, and why duality cannot see it

**8.3′a The split is not projective data in the first place.** Before duality even enters: within bare projective geometry, all perspectivities between two lines form a *single orbit*. Conjugating a parallel projection by a projectivity yields a central one, and conversely — any projectivity moving Ω off ℓ_∞ turns a Type A transfer into a Type B transfer between the images. So projective geometry does not *contain* the A/B distinction; the distinction is created by marking a hyperplane and asking whether the center is incident with the mark. Duality is a projective operation. It cannot preserve a distinction that the projective group itself does not define. **[T]**

**8.3′b What duality does to the mark.** Affine geometry *is* projective geometry plus a marked hyperplane: (Pⁿ, H_∞). A duality δ carries the marked hyperplane to a marked **point** O = δ(H_∞). So the dual of the affine world is not an affine world — it is (Pⁿ\*, O), a projective space with a distinguished point: **the pinhole stage.** The dual of "parallel" (meeting on the mark) is "concurrent at O" (joined through the mark). The two stages of 4.4 — marked hyperplane, marked point — are therefore genuinely dual *as stages*. What fails is the transport of the *plays*: dualizing also transposes the cast (ranges of point-marks become pencils of line-marks), so a B-play on the point-stage arrives as a pencil-play on the hyperplane-stage, never as an A-play on point-marks. 4.4's instinct was right about the stages and wrong about the plays. **[T]**

**8.3′c The torsor problem.** "Duality" is not one map. The correlations of Pⁿ form a torsor under PGL: composing any duality with any projectivity gives another duality, and as δ ranges over all of them, δ(H_∞) sweeps out *every* point of the dual space. There is consequently no canonical answer to "where does infinity go" — each choice of δ is a gauge choice, and the A/B classification on the dual side ("axis through O" versus "axis missing O") changes with the gauge. The dichotomy transports coherently once δ is fixed; no δ is fixed by the projective structure alone. **[T]**

**8.3′d What would anchor it — and why the board doesn't have one.** A canonical duality is exactly a marked **polarity**, and a polarity is exactly a **conic** (quadric, in space): pole–polar duality with respect to it. And with a conic C in hand, the anchor is classical: the pole of ℓ_∞ with respect to C is the **center of C**. So:

  no canonical image for ℓ_∞ ⇔ no marked polarity ⇔ no marked conic.

The drawing board is straightedge-only. The straightedge draws no conics. **The missing duality anchor is the compass.** This locates the anchorlessness of §8.2–8.3 in the grammar itself: the same instrument-poverty that made even spacing non-constructible (10.4) makes duality gauge-dependent — and it is consonant with the mirror-circle work on the Anharmonic side, where a *circle* is precisely what marries the reciprocal involution to metric geometry (inversion as reflection in a curved mirror). A board with one drawn circle acquires a canonical O = its center, and the dual A/B split snaps into place. **[T for the equivalences; O for the reading]**

**8.3′e What survives with the anchor and the category-swap admitted.** Fix δ and re-read the dual axis as the new infinity. Then the dual of a Type B play (marks collected through a point) becomes: two pencils of lines correspond when corresponding lines are **parallel** — marks matched by *direction*. Matching by direction is evaluation against a fibration (each line read off by its ideal point), i.e. it is Type A *in the category of lines*, with ℓ_∞ serving as the stack of directions. So duality does exchange collection ↔ evaluation — it just simultaneously exchanges point-marks ↔ line-marks. The corrected slogan for 4.4:

  **duality swaps collection and evaluation across the point/line divide; it never swaps them within one cast.** **[T, given the re-reading convention]**

---

## 8.5′ The spine: follow-up, self-correction, and the sharpened conjecture

**8.5′a Upgrade: the page-reading half is now theorem.** The pencil of planes through the u-slit maps perspectivally to the range of their trace lines on the picture plane; a perspectivity of a pencil onto a range is a projective parametrization. The shipped cross-slit coordinate X₀·ω(μᵤ) = X₀/(1 − λrᵤ) is a Möbius function of λ, hence *is* a projective parameter of that pencil — the page reading. Same per the v-channel. The statement "cross-slit image coordinates are the two page readings" is symbolic algebra, not a numerical question, and is hereby regraded **[T]**. What remains pending is only the *engine-level identification*, and there the news is worse and better:

**8.5′b Self-correction: the naive identification has an obstruction.** In the assembly, glide's two channels graduate by μᵤ = λrᵤ and μᵥ = λrᵥ — both functions of depth ζ alone. Their level sets are the **same** family of parallel planes, calibrated twice (two rates on one pencil): **one axis, two scales.** Dualize: one spine line carrying two graduations — that is, *coincident slits*, the degenerate catalog, not the genuine skew-slit congruence. So the naive claim — "the glide apparatus of a given assembly dualizes to the cross-slit apparatus of the same assembly" — is **false as stated**, unless glide's true per-channel graduating pencils have *distinct* axes. Whether they do is a decidable question about the board, not about mathematics: does the directing structure (railD / directingDepth / the D-plane apparatus) supply each channel with its own pencil axis, or do both channels genuinely share the depth-axis with two calibrations? **This is the first thing the repo must answer.** **[T for the obstruction; the question is the check]**

**8.5′c Lemma (meeting is self-dual).** Two lines of P³ meet iff their duals meet. *Proof.* r, s meet ⇔ they span a plane π ⇔ (dualizing "r ⊂ π" to "r\* ∋ π\*") both r\*, s\* pass through the point π\* ⇔ r\*, s\* meet. ∎ **[T]**

Consequently the class of cross-slit congruences is **self-dual**: the dual of {lines meeting S_u and S_v} is {lines meeting S_u\* and S_v\*} — another cross-slit congruence, on the dual slits.

**8.5′d The sharpened conjecture.** Since duality carries congruences of this class to congruences of this class (8.5′c), and carries stacks to spines (8.4), the correct form of "transpose = duality" is not an identity within one assembly but a **conjugation across dual assemblies**:

  cross-slit reading on K ≟ δ ∘ (glide reading on δK) ∘ δ,

possibly composed with one *fixed* element of the anharmonic S₃ (the candidate being the seam relation ρτ = ω itself, which is exactly the algebraic gap between the two shipped gauges). The fusion locus of the two readings should then be the configurations with δK ≅ K — the **self-dual** ones. This aligns, rather than merely rhymes, with the established reading of the four-rung ladder as the *fused/self-dual seam* of congruence space: the seam would be self-dual literally, under the anchoring polarity. **[Conjecture; the alignment with the existing seam reading is O]**

**8.5′e Protocol for the check.**
1. **Answer 8.5′b first** (one axis or two, per channel, in the code). If one shared axis: only the conjugation form 8.5′d is in play. If two: the within-assembly form revives and is tested the same way.
2. **Choose the anchor.** A polarity of P³ is a symmetric 4×4 matrix Q. Natural candidates are fixed by the assembly's own furniture: demand the two slits be mutually polar lines of Q, and that Q swap picture plane ↔ station point. (Note the established ω-orbit {picture plane, station point, plane at infinity}: a good anchor should interact legibly with that 3-cycle; how, exactly, is itself informative output.)
3. **Implement δ** on Plücker coordinates; compute the dual congruence δK (dual slits), dual rays r\*.
4. **Compare gauge scalars**, not pictures: for sampled rays, test whether the cross-slit (u, v) of r on K equals the glide (u, v) of r\* on δK up to one fixed Möbius map; identify that map against the six anharmonic elements.
5. **Run on-seam and off-seam** (rᵤ = rᵥ and rᵤ ≠ rᵥ), machine precision, multiple random configurations.
6. **Falsifiers:** if the linking map varies with configuration outside the group, or the fusion locus fails to be the self-dual locus, 8.5′d is demoted and struck.

---

## Ledger (v2.1 additions and regrades)

| # | Claim | Grade |
|---|---|---|
| 8.3′a | A/B is not projective data: PGL has one orbit of perspectivities | T |
| 8.3′b | Dual of (Pⁿ, H_∞) = (Pⁿ\*, O): dual of the affine stage is the pinhole stage; stages dualize, plays do not | T |
| 8.3′c | Correlations form a PGL-torsor; δ(H_∞) sweeps all points; no canonical anchor | T |
| 8.3′d | Anchor ⇔ polarity ⇔ conic; pole of ℓ_∞ = conic center; the missing anchor is the compass | T + O |
| 8.3′e | With anchor + category-swap: duality exchanges collection ↔ evaluation across the point/line divide | T |
| 8.5′a | Cross-slit coordinates = page readings (trace perspectivity, Möbius in λ) — regraded from pending | T |
| 8.5′b | Obstruction: glide channels share one plane-pencil axis (two calibrations) ⇒ naive dual is the degenerate catalog; repo question posed | T |
| 8.5′c | Meeting of lines is self-dual; cross-slit congruences form a self-dual class | T |
| 8.5′d | Transpose = duality-conjugation across dual congruences, up to one fixed S₃ element; fusion locus = self-dual configurations | Conjecture (+O) |
| 8.5 (v2) | Engine-level identification in its naive within-assembly form | **struck**, replaced by 8.5′b–d |

---

*v2.1 — expansions requested of §8.3 and §8.5; one strike, one upgrade, one conjecture with protocol. The v3 candidates of v2 stand, with (i) now specified by 8.5′e.*
