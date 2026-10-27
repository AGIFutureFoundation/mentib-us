/* ============ Mentib DeepMatch — swipe-driven dealmatching ============ */
(function () {
  "use strict";

  const D = window.MENTIB_DATA;
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const TYPE_LABELS = {
    startup: "Startup", investor: "Investor", corporation: "Corporation", family_fund: "Family Fund"
  };
  const ROLE_TO_DECK = {
    startup: ["investor", "corporation", "family_fund"],
    investor: ["startup"],
    corporation: ["startup"],
    family_fund: ["startup"]
  };

  /* ---- state ---- */
  const state = {
    role: localStorage.getItem("mentib:role") || null,
    prefs: JSON.parse(localStorage.getItem("mentib:prefs") || "null"),
    deck: [], index: 0,
    shortlist: JSON.parse(localStorage.getItem("mentib:shortlist") || "[]"),
    decisions: JSON.parse(localStorage.getItem("mentib:decisions") || "{}")
  };

  function save() {
    localStorage.setItem("mentib:role", state.role || "");
    localStorage.setItem("mentib:prefs", JSON.stringify(state.prefs));
    localStorage.setItem("mentib:shortlist", JSON.stringify(state.shortlist));
    localStorage.setItem("mentib:decisions", JSON.stringify(state.decisions));
  }

  /* ---- deep match engine ----
     Weighted scoring of viewer preferences against a profile:
     sectors 35, stage/check fit 25, check-size overlap 25, geography 15 + thesis bonus. */
  function matchScore(prefs, profile) {
    const reasons = [];
    let score = 0;

    // 1. Sector overlap (max 35)
    const sharedSectors = (prefs.sectors || []).filter((s) => profile.sectors.includes(s));
    if (prefs.sectors.length && sharedSectors.length) {
      const sectorScore = Math.min(35, Math.round((sharedSectors.length / Math.max(1, prefs.sectors.length)) * 35));
      score += sectorScore;
      reasons.push({ pts: sectorScore, text: "Sector fit — " + sharedSectors.join(", ") });
    }

    // 2. Stage fit (max 25) — startups have stage; capital side has stages[]
    let stageFit = false;
    if (profile.type === "startup") {
      stageFit = (prefs.stages || []).includes(profile.stage);
    } else {
      stageFit = (profile.stages || []).some((st) => (prefs.stage ? [prefs.stage] : ["building"]).includes(st));
      if (stageFit) reasons.push({ pts: 12, text: "Stage alignment — " + (profile.stages || []).join("/") });
    }
    if (stageFit && profile.type === "startup") {
      score += 25;
      reasons.push({ pts: 25, text: "Stage fit — " + profile.stage });
    }

    // 3. Check-size fit (max 25)
    const t = profile.type === "startup" ? profile.raiseTarget : profile.checkMin;
    const tMax = profile.type === "startup" ? profile.raiseTarget : profile.checkMax;
    const [pMin, pMax] = prefs.checkRange || [0, 10000];
    const overlaps = t <= pMax && tMax >= pMin;
    if (overlaps) {
      score += 25;
      reasons.push({
        pts: 25,
        text: (profile.type === "startup" ? "Raise target $" + profile.raiseTarget + "K in range" : "Checks $" + profile.checkMin + "K–$" + profile.checkMax + "K in range")
      });
    }

    // 4. Geography (max 15)
    const sharedGeo = (prefs.geography || []).filter((g) => profile.geography.includes(g));
    if (sharedGeo.length) {
      score += 15;
      reasons.push({ pts: 15, text: "Geography — " + sharedGeo.join("/") });
    }

    // 5. Thesis bonus (max 15) — shared values, not counted in the base 100
    const sharedThesis = (prefs.thesis || []).filter((th) => (profile.thesis || []).includes(th));
    if (sharedThesis.length) {
      const bonus = Math.min(15, sharedThesis.length * 7);
      score += bonus;
      reasons.push({ pts: bonus, text: "Thesis — " + sharedThesis.join(", ") });
    }

    // 6. Traction nudge (max ±5)
    if (profile.traction >= 70) {
      score += 5;
      reasons.push({ pts: 5, text: "Strong traction (" + profile.traction + "/100)" });
    }

    reasons.sort((a, b) => b.pts - a.pts);
    return { score: Math.min(100, score), reasons: reasons.slice(0, 4) };
  }

  function buildDeck() {
    const types = ROLE_TO_DECK[state.role] || ["startup"];
    let deck = D.PROFILES.filter((p) => types.includes(p.type) && !state.decisions[p.id]);
    // rank by match score against prefs
    deck = deck
      .map((p) => ({ profile: p, match: matchScore(state.prefs, p) }))
      .sort((a, b) => b.match.score - a.match.score)
      .map((x) => x.profile);
    state.deck = deck;
    state.index = 0;
  }

  /* ---- rendering ---- */
  function renderCard(profile, match) {
    const el = document.createElement("div");
    el.className = "dm-card";
    el.dataset.id = profile.id;
    const links = [
      profile.links && profile.links.site ? '<a href="' + profile.links.site + '" target="_blank" rel="noopener">Site ↗</a>' : "",
      profile.links && profile.links.github ? '<a href="' + profile.links.github + '" target="_blank" rel="noopener">GitHub ↗</a>' : ""
    ].filter(Boolean).join(" · ");
    el.innerHTML =
      '<div class="dm-card-inner">' +
      '<span class="dm-type-badge">' + TYPE_LABELS[profile.type] + "</span>" +
      '<div class="dm-score-ring" data-score="' + match.score + '"><span>' + match.score + "</span></div>" +
      "<h2>" + profile.name + "</h2>" +
      '<p class="dm-tagline">' + profile.tagline + "</p>" +
      '<p class="dm-desc">' + profile.description + "</p>" +
      '<div class="dm-meta">' +
      "<span>" + (profile.type === "startup" ? "Raise: $" + profile.raiseTarget + "K · " + profile.stage : "Checks: $" + profile.checkMin + "K–$" + profile.checkMax + "K") + "</span>" +
      "<span>📍 " + profile.geography.join("/") + "</span>" +
      "<span>Sectors: " + profile.sectors.join(", ") + "</span>" +
      "</div>" +
      '<ul class="dm-reasons">' +
      match.reasons.map((r) => "<li><b>" + r.pts + " pts</b> — " + r.text + "</li>").join("") +
      "</ul>" +
      (links ? '<div class="dm-links">' + links + "</div>" : "") +
      '<div class="dm-stamp dm-stamp-like">MATCH</div>' +
      '<div class="dm-stamp dm-stamp-pass">PASS</div>' +
      "</div>";
    return el;
  }

  function renderDeckTop() {
    const zone = $("#deckZone");
    if (!zone) return;
    zone.innerHTML = "";
    const next = state.deck[state.index];
    if (!next) {
      zone.innerHTML = '<div class="dm-empty"><h3>That is everyone for now 🎉</h3><p>Check your shortlist or reset the deck to run it again.</p><button class="btn btn-primary" id="resetDeck">Reset deck</button></div>';
      const rb = $("#resetDeck");
      if (rb) rb.addEventListener("click", () => { state.decisions = {}; save(); buildDeck(); renderDeckTop(); });
      return;
    }
    const match = matchScore(state.prefs, next);
    const card = renderCard(next, match);
    const behind = state.deck[state.index + 1];
    if (behind) {
      const bCard = renderCard(behind, matchScore(state.prefs, behind));
      bCard.classList.add("dm-card-behind");
      zone.appendChild(bCard);
    }
    zone.appendChild(card);
    attachSwipe(card, next, match);
    $("#counter").textContent = state.deck.length - state.index + " left";
  }

  function decide(profile, match, liked) {
    state.decisions[profile.id] = liked ? "liked" : "passed";
    if (liked) {
      state.shortlist.push({ id: profile.id, name: profile.name, score: match.score, reasons: match.reasons.map((r) => r.text) });
      if (match.score >= 70) showMatchModal(profile, match);
    }
    save();
    state.index++;
    renderDeckTop();
    renderShortlist();
  }

  function showMatchModal(profile, match) {
    const modal = $("#matchModal");
    if (!modal) return;
    modal.querySelector(".dm-match-name").textContent = profile.name;
    modal.querySelector(".dm-match-score").textContent = match.score + "% match";
    modal.querySelector(".dm-match-reasons").innerHTML = match.reasons.slice(0, 3).map((r) => "<li>" + r.text + "</li>").join("");
    modal.classList.add("open");
    setTimeout(() => modal.classList.remove("open"), 3800);
  }

  function renderShortlist() {
    const list = $("#shortlistItems");
    if (!list) return;
    list.innerHTML = state.shortlist.length
      ? state.shortlist.map((s) => '<li><span class="sl-score">' + s.score + "</span> " + s.name + '<ul class="sl-reasons">' + s.reasons.slice(0, 2).map((r) => "<li>" + r + "</li>").join("") + "</ul></li>").join("")
      : '<li class="sl-empty">No matches yet — swipe right.</li>';
    const badge = $("#shortlistCount");
    if (badge) badge.textContent = state.shortlist.length;
  }

  /* ---- swipe gestures ---- */
  function attachSwipe(card, profile, match) {
    let startX = 0, startY = 0, dx = 0, dragging = false;
    const likeStamp = card.querySelector(".dm-stamp-like");
    const passStamp = card.querySelector(".dm-stamp-pass");

    function setTransform(dxv, rot) {
      card.style.transform = "translateX(" + dxv + "px) rotate(" + rot + "deg)";
      const likeOp = Math.max(0, Math.min(1, dxv / 90));
      const passOp = Math.max(0, Math.min(1, -dxv / 90));
      if (likeStamp) likeStamp.style.opacity = likeOp;
      if (passStamp) passStamp.style.opacity = passOp;
    }
    function release() {
      dragging = false;
      if (Math.abs(dx) > 100) {
        const liked = dx > 0;
        card.style.transition = "transform .3s ease, opacity .3s ease";
        card.style.transform = "translateX(" + (liked ? 500 : -500) + "px) rotate(" + (liked ? 30 : -30) + "deg)";
        card.style.opacity = "0";
        setTimeout(() => decide(profile, match, liked), 250);
      } else {
        card.style.transition = "transform .25s ease";
        setTransform(0, 0);
        setTimeout(() => (card.style.transition = ""), 260);
      }
      dx = 0;
    }
    card.addEventListener("pointerdown", function (e) {
      if (e.target.closest("a, button")) return;
      dragging = true; startX = e.clientX; startY = e.clientY;
      card.setPointerCapture(e.pointerId);
    });
    card.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      dx = e.clientX - startX;
      setTransform(dx, dx / 18);
    });
    card.addEventListener("pointerup", release);
    card.addEventListener("pointercancel", release);
    card._decide = (liked) => {
      card.style.transition = "transform .3s ease, opacity .3s ease";
      card.style.transform = "translateX(" + (liked ? 500 : -500) + "px) rotate(" + (liked ? 30 : -30) + "deg)";
      card.style.opacity = "0";
      setTimeout(() => decide(profile, match, liked), 250);
    };
  }

  function currentCard() {
    const cards = document.querySelectorAll(".dm-card:not(.dm-card-behind)");
    return cards[cards.length - 1];
  }

  /* ---- boot & wiring ---- */
  document.addEventListener("DOMContentLoaded", function () {
    // role buttons
    $$(".role-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.role = btn.dataset.role;
        save();
        $("#setupRoles").hidden = true;
        $("#setupPrefs").hidden = false;
      });
    });
    // prefs form
    const prefsForm = $("#prefsForm");
    if (prefsForm) {
      prefsForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const sectors = Array.from($$("#prefsForm input[name=sector]:checked")).map(function (i) { return i.value; });
        const thesis = Array.from($$("#prefsForm input[name=thesis]:checked")).map(function (i) { return i.value; });
        const geography = Array.from($$("#prefsForm input[name=geo]:checked")).map(function (i) { return i.value; });
        const stage = $("#prefStage") ? $("#prefStage").value : "building";
        const checkRange = state.role === "startup" ? [0, 10000] : [Number($("#checkMin").value || 0), Number($("#checkMax").value || 10000)];
        state.prefs = {
          sectors: sectors.length ? sectors : D.SECTORS.slice(0, 3),
          stages: state.role === "startup" ? D.STAGES : [stage],
          stage: state.role === "startup" ? stage : null,
          checkRange: checkRange,
          geography: geography.length ? geography : ["US", "global"],
          thesis: thesis
        };
        save();
        enterApp();
      });
    }
    // action buttons
    const passBtn = $("#btnPass"), likeBtn = $("#btnLike");
    if (passBtn) passBtn.addEventListener("click", function () { const c = currentCard(); if (c && c._decide) c._decide(false); });
    if (likeBtn) likeBtn.addEventListener("click", function () { const c = currentCard(); if (c && c._decide) c._decide(true); });
    // keyboard
    document.addEventListener("keydown", function (e) {
      if ($("#app").hidden) return;
      if (e.key === "ArrowLeft") { const c = currentCard(); if (c && c._decide) c._decide(false); }
      if (e.key === "ArrowRight") { const c = currentCard(); if (c && c._decide) c._decide(true); }
    });
    // shortlist drawer + export
    const slBtn = $("#shortlistBtn");
    if (slBtn) slBtn.addEventListener("click", function () { $("#shortlistDrawer").classList.toggle("open"); });
    const slClose = $("#shortlistClose");
    if (slClose) slClose.addEventListener("click", function () { $("#shortlistDrawer").classList.remove("open"); });
    const exportBtn = $("#exportBtn");
    if (exportBtn) exportBtn.addEventListener("click", exportShortlist);
    const matchClose = $("#matchClose");
    if (matchClose) matchClose.addEventListener("click", function () { $("#matchModal").classList.remove("open"); });
    // nav toggle (mobile)
    const toggle = document.querySelector(".nav-toggle");
    const links = document.getElementById("navLinks");
    if (toggle && links) toggle.addEventListener("click", function () { links.classList.toggle("open"); });

    if (state.role && state.prefs) enterApp();
    else { $("#setup").hidden = false; $("#setupRoles").hidden = false; }
  });

  function enterApp() {
    $("#setup").hidden = true;
    $("#app").hidden = false;
    buildDeck();
    renderDeckTop();
    renderShortlist();
  }
  function exportShortlist() {
    const blob = new Blob([JSON.stringify({ generated: new Date().toISOString(), shortlist: state.shortlist }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "mentib-shortlist.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }
})();

