/* Resilience Board Dashboard - rendering. Plain JavaScript, no build step, no dependencies. */
(function () {
  "use strict";
  var D = window.DASHBOARD_DATA;
  var SVGNS = "http://www.w3.org/2000/svg";
  var state = { qi: D.meta.quarters.indexOf(D.meta.defaultQuarter), kri: "vulns" };
  var tip = document.getElementById("tooltip");
  var LABEL = { green: "Green", amber: "Amber", red: "Red" };

  // ---------- helpers ----------
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function svg(tag, attrs, parent) {
    var n = document.createElementNS(SVGNS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function text(parent, x, y, str, attrs) {
    var t = svg("text", Object.assign({ x: x, y: y }, attrs || {}), parent);
    t.textContent = str;
    return t;
  }
  function icon(status) {
    var p = { green: "M4 8.5l2.5 2.5L12 5.5", amber: "M8 4.5v4.5M8 11.5v.5", red: "M5 5l6 6M11 5l-6 6" }[status];
    return '<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="' + p + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  }
  function badge(status, label, big) {
    return '<span class="badge ' + status + (big ? " big" : "") + '">' + icon(status) + esc(label || LABEL[status]) + "</span>";
  }
  function kriStatus(k, v) {
    if (k.direction === "up") {
      if (v >= k.red) return "red";
      if (k.amber !== null && v >= k.amber) return "amber";
      return "green";
    }
    if (v < k.red) return "red";
    if (k.amber !== null && v < k.amber) return "amber";
    return "green";
  }
  function fmt(k, v) { return v + (k.unit === "%" ? "%" : ""); }
  function thresholdText(k) {
    var op = k.direction === "up" ? "at or above " : "below ";
    var a = k.amber === null ? "n/a" : op + fmt(k, k.amber);
    return "Amber " + a + " · Red " + op + fmt(k, k.red);
  }
  function trendWord(k, i) {
    if (i === 0) return "First quarter";
    var d = k.values[i] - k.values[i - 1];
    if (d === 0) return "Stable";
    var worse = (k.direction === "up") ? d > 0 : d < 0;
    return worse ? "Worse" : "Better";
  }
  function showTip(evt, html) {
    tip.innerHTML = html;
    tip.hidden = false;
    var x = evt.clientX + 14, y = evt.clientY + 14;
    var r = tip.getBoundingClientRect();
    if (x + r.width > window.innerWidth - 8) x = evt.clientX - r.width - 14;
    if (y + r.height > window.innerHeight - 8) y = evt.clientY - r.height - 14;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
  }
  function hideTip() { tip.hidden = true; }
  function simpleTable(headers, rows) {
    var h = "<table class='data'><tr>" + headers.map(function (x) { return "<th>" + esc(x) + "</th>"; }).join("") + "</tr>";
    rows.forEach(function (r) { h += "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>"; });
    return h + "</table>";
  }

  // ---------- header & filter ----------
  function renderHeader() {
    $("institution").textContent = D.meta.institution;
    $("report-title").textContent = D.meta.reportTitle;
    $("framework").textContent = D.meta.framework;
    var f = $("quarter-filter");
    f.innerHTML = "";
    D.meta.quarters.forEach(function (q, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = q.replace(" 2026", "");
      b.setAttribute("aria-label", q);
      b.setAttribute("aria-pressed", String(i === state.qi));
      b.addEventListener("click", function () { state.qi = i; renderAll(); });
      f.appendChild(b);
    });
  }

  // ---------- headline ----------
  function renderHeadline() {
    var q = D.meta.quarters[state.qi];
    var h = D.headlines[q];
    var kris = D.kris.map(function (k) { return kriStatus(k, k.values[state.qi]); });
    var red = kris.filter(function (s) { return s === "red"; }).length;
    var amber = kris.filter(function (s) { return s === "amber"; }).length;
    var pos = red > 0 || amber > 0 ? (red > 2 ? "red" : "amber") : "green";
    $("position").innerHTML = badge(pos, LABEL[pos] + " · " + q, true);
    $("headline-text").textContent = h.text + " Key risk indicators: " + red + " red, " + amber + " amber, " + (kris.length - red - amber) + " green.";
    $("decisions").innerHTML = h.decisions.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("");
  }

  // ---------- outcomes ----------
  function renderOutcomes() {
    $("outcomes").innerHTML = D.outcomes.map(function (o, i) {
      var s = o.status[state.qi];
      return '<div class="outcome ' + s + '"><span class="outcome-num">0' + (i + 1) + '</span><span class="outcome-name">' + esc(o.name) + "</span>" + badge(s) + '<span class="outcome-note">' + esc(o.note) + "</span></div>";
    }).join("");
  }

  // ---------- KRI table ----------
  function renderKriTable() {
    var t = $("kri-table");
    var h = "<tr><th>Indicator</th><th>Value</th><th>Thresholds</th><th>Status</th><th>Trend</th></tr>";
    D.kris.forEach(function (k) {
      var v = k.values[state.qi];
      var s = kriStatus(k, v);
      h += '<tr class="selectable' + (k.id === state.kri ? " selected" : "") + '" tabindex="0" data-id="' + k.id + '">' +
        "<td>" + esc(k.name) + "</td><td class='num'>" + esc(fmt(k, v)) + "</td><td>" + esc(thresholdText(k)) + "</td><td>" + badge(s) + "</td><td>" + esc(trendWord(k, state.qi)) + "</td></tr>";
    });
    t.innerHTML = h;
    Array.prototype.forEach.call(t.querySelectorAll("tr.selectable"), function (row) {
      function pick() { state.kri = row.getAttribute("data-id"); renderKriTable(); renderTrend(); }
      row.addEventListener("click", pick);
      row.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
    });
  }

  // ---------- KRI trend line ----------
  function renderTrend() {
    var k = D.kris.filter(function (x) { return x.id === state.kri; })[0];
    $("trend-name").textContent = k.name;
    $("trend-sub").textContent = thresholdText(k) + ". UAE anchor: " + k.anchor + ".";
    var W = 600, H = 260, L = 44, R = 96, T = 16, B = 32;
    var box = $("trend-chart");
    box.innerHTML = "";
    var s = svg("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": k.name + " by quarter" }, box);
    var vals = k.values.slice();
    var refs = [k.red].concat(k.amber === null ? [] : [k.amber]);
    var hi = Math.max.apply(null, vals.concat(refs));
    var lo = Math.min.apply(null, vals.concat(refs));
    var yMin = k.unit === "%" ? Math.max(0, Math.floor((lo - 10) / 10) * 10) : 0;
    var yMax = Math.ceil(hi * 1.15 + (k.unit === "%" ? 0 : 1));
    if (k.unit === "%") yMax = Math.min(100, Math.ceil((hi + 5) / 10) * 10);
    function X(i) { return L + (W - L - R) * (i / (vals.length - 1)); }
    function Y(v) { return T + (H - T - B) * (1 - (v - yMin) / (yMax - yMin)); }
    // grid + axis ticks
    var steps = 4;
    for (var g = 0; g <= steps; g++) {
      var gv = yMin + (yMax - yMin) * g / steps;
      svg("line", { x1: L, x2: W - R, y1: Y(gv), y2: Y(gv), stroke: "var(--grid)", "stroke-width": 1 }, s);
      text(s, L - 8, Y(gv) + 4, (Math.round(gv * 10) / 10) + (k.unit === "%" ? "%" : ""), { "text-anchor": "end" });
    }
    D.meta.quarters.forEach(function (q, i) {
      text(s, X(i), H - 10, q.replace(" 2026", ""), { "text-anchor": "middle", class: i === state.qi ? "label-strong" : "" });
    });
    // thresholds (reference lines, labelled in text ink)
    [["Red", k.red, "var(--critical)"], ["Amber", k.amber, "var(--warning)"]].forEach(function (r) {
      if (r[1] === null) return;
      svg("line", { x1: L, x2: W - R, y1: Y(r[1]), y2: Y(r[1]), stroke: r[2], "stroke-width": 1.5, "stroke-dasharray": "5 4" }, s);
      text(s, W - R + 8, Y(r[1]) + 4, r[0] + " " + fmt(k, r[1]), {});
    });
    // line
    var d = vals.map(function (v, i) { return (i ? "L" : "M") + X(i) + " " + Y(v); }).join(" ");
    svg("path", { d: d, fill: "none", stroke: "var(--series-1)", "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }, s);
    vals.forEach(function (v, i) {
      svg("circle", { cx: X(i), cy: Y(v), r: i === state.qi ? 6 : 4.5, fill: "var(--series-1)", stroke: "var(--surface-1)", "stroke-width": 2 }, s);
    });
    // direct label on the selected quarter only
    text(s, X(state.qi), Y(vals[state.qi]) - 12, fmt(k, vals[state.qi]), { "text-anchor": "middle", class: "label-strong" });
    // hover: crosshair + tooltip snapping to nearest quarter
    var cross = svg("line", { y1: T, y2: H - B, stroke: "var(--axis)", "stroke-width": 1, visibility: "hidden" }, s);
    var hit = svg("rect", { x: L - 20, y: 0, width: W - L - R + 40, height: H, fill: "transparent" }, s);
    hit.addEventListener("mousemove", function (e) {
      var r = s.getBoundingClientRect();
      var px = (e.clientX - r.left) * (W / r.width);
      var i = Math.max(0, Math.min(vals.length - 1, Math.round((px - L) / ((W - L - R) / (vals.length - 1)))));
      cross.setAttribute("x1", X(i)); cross.setAttribute("x2", X(i)); cross.setAttribute("visibility", "visible");
      var st = kriStatus(k, vals[i]);
      showTip(e, "<strong>" + esc(D.meta.quarters[i]) + "</strong>" + esc(fmt(k, vals[i])) + " · " + LABEL[st]);
    });
    hit.addEventListener("mouseleave", function () { cross.setAttribute("visibility", "hidden"); hideTip(); });
    $("trend-table").innerHTML = simpleTable(["Quarter", "Value", "Status"], vals.map(function (v, i) { return [D.meta.quarters[i], fmt(k, v), LABEL[kriStatus(k, v)]]; }));
  }

  // ---------- Critical Operations bullet bars ----------
  function renderOps() {
    var ops = D.criticalOperations;
    var W = 600, rowH = 46, L = 200, R = 120, T = 8;
    var H = T + ops.length * rowH + 28;
    var maxH = 26;
    var box = $("ops-chart");
    box.innerHTML = "";
    var s = svg("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": "Tested recovery time against tolerance for each Critical Operation" }, box);
    function X(h) { return L + (W - L - R) * (h / maxH); }
    [0, 4, 8, 12, 16, 20, 24].forEach(function (h) {
      svg("line", { x1: X(h), x2: X(h), y1: T, y2: H - 24, stroke: "var(--grid)", "stroke-width": 1 }, s);
      text(s, X(h), H - 8, h + " h", { "text-anchor": "middle" });
    });
    ops.forEach(function (o, i) {
      var cy = T + i * rowH + rowH / 2;
      text(s, 0, cy + 4, o.name, {});
      var st, label;
      if (o.testedHours === null) {
        st = "amber"; label = "Not tested · Amber";
        svg("rect", { x: X(0), y: cy - 7, width: X(o.toleranceHours) - X(0), height: 14, rx: 4, fill: "none", stroke: "var(--axis)", "stroke-dasharray": "4 3" }, s);
      } else {
        st = o.testedHours > o.toleranceHours ? "red" : "green";
        label = o.testedHours + " h vs " + o.toleranceHours + " h · " + LABEL[st];
        svg("rect", { x: X(0), y: cy - 7, width: Math.max(4, X(o.testedHours) - X(0)), height: 14, rx: 4, fill: "var(--series-1)" }, s);
      }
      svg("line", { x1: X(o.toleranceHours), x2: X(o.toleranceHours), y1: cy - 13, y2: cy + 13, stroke: "var(--marker)", "stroke-width": 3, "stroke-linecap": "round" }, s);
      text(s, W - R + 10, cy + 4, label, { class: st === "red" ? "label-strong" : "" });
      var hit = svg("rect", { x: 0, y: cy - rowH / 2, width: W, height: rowH, fill: "transparent" }, s);
      hit.addEventListener("mousemove", function (e) {
        showTip(e, "<strong>" + esc(o.name) + "</strong>Tolerance: " + o.toleranceHours + " h<br>Last test: " + (o.testedHours === null ? "not yet tested" : o.testedHours + " h (" + esc(o.testMonth) + ")") + "<br>Fully mapped: " + esc(o.mapped) + "<br>Status: " + LABEL[st]);
      });
      hit.addEventListener("mouseleave", hideTip);
    });
    $("ops-table").innerHTML = simpleTable(["Critical Operation", "Tolerance", "Last test", "Mapped"], ops.map(function (o) {
      return [o.name, o.toleranceHours + " h", o.testedHours === null ? "Not yet tested" : o.testedHours + " h (" + o.testMonth + ")", o.mapped];
    }));
  }

  // ---------- Incidents ----------
  function renderIncidents() {
    var I = D.incidents, i = state.qi;
    $("inc-stats").innerHTML =
      '<div class="stat"><div class="stat-value">' + I.major[i] + '</div><div class="stat-label">major incidents</div></div>' +
      '<div class="stat"><div class="stat-value">' + I.onTimePct[i] + '%</div><div class="stat-label">CBUAE notices on time</div></div>' +
      '<div class="stat"><div class="stat-value">' + I.minor[i] + '</div><div class="stat-label">minor incidents' + (i ? ", " + (I.minor[i] >= I.minor[i - 1] ? "up" : "down") + " from " + I.minor[i - 1] : "") + "</div></div>";
    var W = 600, H = 190, L = 36, R = 8, T = 22, B = 28;
    var box = $("inc-chart");
    box.innerHTML = "";
    var s = svg("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": "Minor incidents per quarter" }, box);
    var max = 60;
    function Y(v) { return T + (H - T - B) * (1 - v / max); }
    [0, 20, 40, 60].forEach(function (v) {
      svg("line", { x1: L, x2: W - R, y1: Y(v), y2: Y(v), stroke: "var(--grid)" }, s);
      text(s, L - 8, Y(v) + 4, v, { "text-anchor": "end" });
    });
    var n = I.minor.length, slot = (W - L - R) / n, bw = Math.min(56, slot * 0.5);
    I.minor.forEach(function (v, j) {
      var x = L + slot * j + (slot - bw) / 2;
      var y = Y(v), h = Y(0) - y;
      // rounded top only, anchored to baseline
      var r = 4;
      svg("path", { d: "M" + x + " " + Y(0) + " V" + (y + r) + " Q" + x + " " + y + " " + (x + r) + " " + y + " H" + (x + bw - r) + " Q" + (x + bw) + " " + y + " " + (x + bw) + " " + (y + r) + " V" + Y(0) + " Z",
        fill: "var(--series-1)", opacity: j === i ? 1 : 0.45 }, s);
      text(s, x + bw / 2, y - 6, v, { "text-anchor": "middle", class: j === i ? "label-strong" : "" });
      text(s, x + bw / 2, H - 8, D.meta.quarters[j].replace(" 2026", ""), { "text-anchor": "middle", class: j === i ? "label-strong" : "" });
      var hit = svg("rect", { x: L + slot * j, y: T, width: slot, height: H - T - B, fill: "transparent" }, s);
      hit.addEventListener("mousemove", function (e) { showTip(e, "<strong>" + esc(D.meta.quarters[j]) + "</strong>" + v + " minor incidents<br>" + I.major[j] + " major"); });
      hit.addEventListener("mouseleave", hideTip);
    });
    svg("line", { x1: L, x2: W - R, y1: Y(0), y2: Y(0), stroke: "var(--axis)" }, s);
    $("inc-table").innerHTML = simpleTable(["Quarter", "Minor", "Major", "Notices on time"], I.minor.map(function (v, j) { return [D.meta.quarters[j], v, I.major[j], I.onTimePct[j] + "%"]; }));

    // major incidents table, year to date up to selected quarter
    var upto = D.meta.quarters.slice(0, i + 1);
    var list = I.majorList.filter(function (m) { return upto.indexOf(m.quarter) >= 0; });
    var t = "<tr><th>Incident</th><th>Classification</th><th>Regulatory status</th><th>Appetite and tolerance</th><th>What it reveals</th></tr>";
    if (!list.length) t += "<tr><td colspan='5'>No major incidents so far this year.</td></tr>";
    list.forEach(function (m) {
      t += "<tr><td><strong>" + esc(m.title) + "</strong><br>" + esc(m.quarter) + " · " + esc(m.duration) + " · about " + m.customers.toLocaleString("en-US") + " customers</td><td>" + esc(m.classification) + "</td><td>" + esc(m.regulatory) + "</td><td>" + esc(m.appetite) + "</td><td>" + esc(m.systemic) + "</td></tr>";
    });
    $("major-table").innerHTML = t;
  }

  // ---------- Third parties ----------
  function renderThirdParties() {
    var tp = D.thirdParties.slice().sort(function (a, b) { return b.criticalOps - a.criticalOps; });
    var W = 600, rowH = 34, L = 170, R = 60, T = 4;
    var H = T + tp.length * rowH + 4;
    var box = $("tp-chart");
    box.innerHTML = "";
    var s = svg("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": "Critical Operations supported per critical provider" }, box);
    function X(v) { return L + (W - L - R) * (v / 14); }
    tp.forEach(function (p, i) {
      var cy = T + i * rowH + rowH / 2;
      text(s, 0, cy + 4, p.name, {});
      svg("rect", { x: X(0), y: cy - 7, width: X(p.criticalOps) - X(0), height: 14, rx: 4, fill: "var(--series-1)" }, s);
      text(s, X(p.criticalOps) + 8, cy + 4, p.criticalOps + " of 14", { class: i === 0 ? "label-strong" : "" });
      var hit = svg("rect", { x: 0, y: cy - rowH / 2, width: W, height: rowH, fill: "transparent" }, s);
      hit.addEventListener("mousemove", function (e) { showTip(e, "<strong>" + esc(p.name) + "</strong>" + esc(p.supports) + "<br>Supports " + p.criticalOps + " of 14 Critical Operations"); });
      hit.addEventListener("mouseleave", hideTip);
    });
    var t = "<tr><th>Provider</th><th>Supports</th><th>SLAs met</th><th>Exit plan</th><th>Status</th></tr>";
    tp.forEach(function (p) { t += "<tr><td>" + esc(p.name) + "</td><td>" + esc(p.supports) + "</td><td class='num'>" + esc(p.slaMet) + "</td><td>" + esc(p.exitPlan) + "</td><td>" + badge(p.status) + "</td></tr>"; });
    $("tp-table").innerHTML = t;
  }

  // ---------- Testing & remediation ----------
  function renderTesting() {
    $("testing").innerHTML = D.testing.map(function (t) {
      var pct = Math.round(100 * t.done / t.total);
      var val = t.total === 100 ? pct + "%" : t.done + " of " + t.total;
      return '<div class="meter"><div class="meter-head"><span>' + esc(t.name) + "</span><strong>" + val + '</strong></div><div class="meter-track" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '" aria-label="' + esc(t.name) + '"><div class="meter-fill" style="width:' + pct + '%"></div></div></div>';
    }).join("");
    var R = D.remediation, total = R.onTrack + R.late + R.atRisk;
    $("rem-bar").innerHTML =
      '<div class="segbar" role="img" aria-label="' + R.onTrack + " on track, " + R.late + " late, " + R.atRisk + ' at risk">' +
      '<div class="s-green" style="flex:' + R.onTrack + '">' + R.onTrack + " on track</div>" +
      '<div class="s-amber" style="flex:' + R.late + '">' + R.late + " late</div>" +
      '<div class="s-red" style="flex:' + R.atRisk + '">' + R.atRisk + "</div></div>" +
      '<div class="seglegend"><span>' + total + " actions in total</span><span>" + R.atRisk + " at risk</span></div>";
    var t = "<tr><th>Action</th><th>Source</th><th>Owner</th><th>Due</th><th>Status</th></tr>";
    R.items.forEach(function (x) { t += "<tr><td>" + esc(x.action) + "</td><td>" + esc(x.source) + "</td><td>" + esc(x.owner) + "</td><td class='num'>" + esc(x.due) + "</td><td>" + badge(x.status, x.label) + "</td></tr>"; });
    $("rem-table").innerHTML = t;
  }

  function renderAll() {
    renderHeader(); renderHeadline(); renderOutcomes(); renderKriTable(); renderTrend();
    renderOps(); renderIncidents(); renderThirdParties(); renderTesting();
  }
  window.addEventListener("scroll", hideTip, { passive: true });
  renderAll();
})();
