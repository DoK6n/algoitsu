// @ts-nocheck
import { useState } from 'react';
import { W810_T } from './theme';

function W810_DPTableViz({ title, dp, highlightCell, headers, rowHeaders, color = W810_T.w8 }) {
  return (
    <div className="overflow-x-auto my-[12px]">
      {title && <div className="text-[#6272a4] text-[12px] mb-[6px]">{title}</div>}
      <table className="border-collapse font-mono text-[13px]">
        {headers && (
          <thead>
            <tr>
              <th className="px-[10px] py-[5px] text-[#6272a4] border border-[#2d2048]" />
              {headers.map((h) => (
                <th key={h} className="px-[12px] py-[5px] text-[#8be9fd] border border-[#2d2048] font-bold">{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {dp.map((row, i) => (
            <tr key={rowHeaders ? rowHeaders[i] : i}>
              {rowHeaders && (
                <td className="px-[10px] py-[5px] text-[#ffb86c] border border-[#2d2048] font-bold">{rowHeaders[i]}</td>
              )}
              {(Array.isArray(row) ? row : [row]).map((val, j) => {
                const isHL = highlightCell?.some(([hi, hj]) => hi === i && hj === j);
                return (
                  <td
                    key={j}
                    className="px-[14px] py-[6px] text-center border border-[#2d2048] transition-all duration-300 min-w-[36px]"
                    style={{
                      background: isHL ? `${color}33` : val > 0 ? `${color}11` : "transparent",
                      color: isHL ? color : val === 0 ? W810_T.muted : W810_T.text,
                      fontWeight: isHL ? 700 : 400,
                    }}
                  >
                    {val === Number.POSITIVE_INFINITY ? "∞" : val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ══════════════════════════════ DP 1463 VIZ ══════════════════════════════ */
function W810_DP1463Viz() {
  const [n, setN] = useState(10);
  const dp = Array(n + 1).fill(0);
  dp[1] = 0;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + 1;
    if (i % 3 === 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
    if (i % 2 === 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
  }
  const [step, setStep] = useState(1);

  return (
    <div className="bg-[#090612] border border-[#2d2048] rounded-[12px] p-[20px] my-[14px]">
      <div className="flex gap-[12px] items-center mb-[14px] flex-wrap">
        <span className="text-[#f8f8f2] text-[13px]">N =</span>
        <input
          type="range"
          min={2}
          max={20}
          value={n}
          onChange={e => { setN(Number(e.target.value)); setStep(1); }}
          className="w-[120px]"
          style={{ accentColor: W810_T.w8 }}
        />
        <span className="text-[#bd93f9] font-bold">{n}</span>
        <span className="text-[#6272a4] text-[12px]">
          최소 연산 횟수: <strong className="text-[#50fa7b]">{dp[n]}</strong>
        </span>
      </div>
      <div className="flex gap-[4px] flex-wrap mb-[14px]">
        {dp.slice(1).map((v, i) => {
          const idx = i + 1;
          const isStep = idx === step;
          return (
            <div
              key={idx}
              onClick={() => setStep(idx)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setStep(idx); }}
              role="button"
              tabIndex={0}
              className="min-w-[42px] h-[48px] flex flex-col items-center justify-center rounded-[8px] cursor-pointer transition-all duration-200 gap-[2px]"
              style={{
                background: isStep ? `${W810_T.w8}44` : idx <= step ? `${W810_T.w8}11` : W810_T.card,
                border: `2px solid ${isStep ? W810_T.w8 : idx < step ? `${W810_T.w8}55` : W810_T.border}`,
              }}
            >
              <div className="text-[#6272a4] text-[10px]">{idx}</div>
              <div
                className="font-mono"
                style={{ color: isStep ? W810_T.w8 : W810_T.text, fontWeight: isStep ? 700 : 400 }}
              >
                {v}
              </div>
            </div>
          );
        })}
      </div>
      {step >= 2 && (
        <div className="px-[14px] py-[10px] bg-[#1e1530] border-l-[3px] border-l-[#bd93f9] rounded-[0_8px_8px_0] text-[13px] font-mono">
          <span className="text-[#bd93f9]">dp[{step}]</span> ={" "}
          {step % 3 === 0 && step % 2 === 0
            ? `min(dp[${step - 1}]+1=${dp[step - 1] + 1}, dp[${step / 3}]+1=${dp[step / 3] + 1}, dp[${step / 2}]+1=${dp[step / 2] + 1})`
            : step % 3 === 0
            ? `min(dp[${step - 1}]+1=${dp[step - 1] + 1}, dp[${step / 3}]+1=${dp[step / 3] + 1})`
            : step % 2 === 0
            ? `min(dp[${step - 1}]+1=${dp[step - 1] + 1}, dp[${step / 2}]+1=${dp[step / 2] + 1})`
            : `dp[${step - 1}]+1 = ${dp[step - 1] + 1}`}{" "}
          = <span className="text-[#50fa7b] font-bold">{dp[step]}</span>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════ LIS VIZ ══════════════════════════════ */
function W810_LISViz() {
  const [arr] = useState([10, 9, 2, 5, 3, 7, 101, 18]);
  const [step, setStep] = useState(-1);

  const dp = Array(arr.length).fill(1);
  const steps = [];
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          steps.push({ i, j, dp: [...dp], msg: `arr[${j}]=${arr[j]} < arr[${i}]=${arr[i]} → dp[${i}]=max(dp[${i}], dp[${j}]+1)=${dp[i]}` });
        }
      }
    }
  }
  const maxLen = Math.max(...dp);
  const cur = step >= 0 && step < steps.length ? steps[step] : null;
  const curDp = cur ? cur.dp : dp.map(() => 1);

  return (
    <div className="bg-[#090612] border border-[#2d2048] rounded-[12px] p-[20px] my-[14px]">
      <div className="mb-[12px]">
        <div className="text-[#6272a4] text-[12px] mb-[6px]">
          배열: [{arr.join(", ")}] — LIS 길이: <strong className="text-[#50fa7b]">{maxLen}</strong>
        </div>
        <div className="flex gap-[4px] flex-wrap">
          {arr.map((v, i) => (
            <div
              key={`arr-${i}`}
              className="min-w-[44px] h-[52px] flex flex-col items-center justify-center gap-[3px] rounded-[8px] transition-all duration-300"
              style={{
                background: cur && (i === cur.i || i === cur.j) ? `${W810_T.w9}33` : W810_T.card,
                border: `2px solid ${cur && i === cur.i ? W810_T.w9 : cur && i === cur.j ? W810_T.cyan : W810_T.border}`,
              }}
            >
              <div className="text-[#f8f8f2] font-bold font-mono">{v}</div>
              <div
                className="text-[11px] font-mono"
                style={{ color: cur && i <= cur.i ? W810_T.w9 : W810_T.muted }}
              >
                {curDp[i] || 1}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-[8px] mb-[12px] flex-wrap">
        <button type="button" onClick={() => setStep(-1)} className="px-[12px] py-[6px] bg-[#1e1530] border border-[#2d2048] text-[#6272a4] rounded-[8px] cursor-pointer text-[12px]">초기화</button>
        <button type="button" onClick={() => setStep(p => Math.max(-1, p - 1))} className="px-[10px] py-[6px] bg-[#1e1530] border border-[#2d2048] text-[#f8f8f2] rounded-[8px] cursor-pointer">◀</button>
        <button type="button" onClick={() => setStep(p => Math.min(steps.length - 1, p + 1))} className="px-[10px] py-[6px] bg-[#1e1530] border border-[#2d2048] text-[#f8f8f2] rounded-[8px] cursor-pointer">▶</button>
        <span className="text-[#6272a4] text-[12px] self-center">{step + 1}/{steps.length}</span>
      </div>
      {cur && (
        <div className="px-[12px] py-[8px] bg-[#1e1530] border-l-[3px] border-l-[#ff79c6] rounded-[0_8px_8px_0] text-[13px] font-mono text-[#f8f8f2]">
          {cur.msg}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════ KNAPSACK VIZ ══════════════════════════════ */
function W810_KnapsackViz() {
  const items = [{ w: 1, v: 1 }, { w: 2, v: 6 }, { w: 3, v: 10 }, { w: 5, v: 16 }];
  const W = 7;
  const n = items.length;

  const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= W; j++) {
      dp[i][j] = dp[i - 1][j];
      if (items[i - 1].w <= j) {
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - items[i - 1].w] + items[i - 1].v);
      }
    }
  }

  const [hlRow, setHlRow] = useState(null);
  const [hlCol, setHlCol] = useState(null);

  return (
    <div className="bg-[#090612] border border-[#2d2048] rounded-[12px] p-[20px] my-[14px]">
      <div className="flex gap-[16px] mb-[12px] flex-wrap">
        <div>
          <div className="text-[#6272a4] text-[12px] mb-[6px]">물건 목록</div>
          <div className="flex gap-[6px] flex-wrap">
            {items.map((item, i) => (
              <div key={`item-${i}`} className="px-[12px] py-[8px] bg-[#1e1530] border border-[#2d2048] rounded-[8px]">
                <div className="text-[#ff79c6] font-bold text-[13px]">물건 {i + 1}</div>
                <div className="text-[#f8f8f2] text-[12px]">무게:{item.w} 가치:{item.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="self-center px-[16px] py-[10px] bg-[#ff79c622] border border-[#ff79c6] rounded-[10px]">
          <div className="text-[#6272a4] text-[12px]">가방 용량: {W}kg</div>
          <div className="text-[#ff79c6] font-bold text-[18px]">최대 가치: {dp[n][W]}</div>
        </div>
      </div>
      <div className="text-[#6272a4] text-[12px] mb-[6px]">DP 테이블 — 클릭해서 확인 (행=물건, 열=용량)</div>
      <div className="overflow-x-auto">
        <table className="border-collapse font-mono text-[12px]">
          <thead>
            <tr>
              <th className="px-[8px] py-[4px] text-[#6272a4] border border-[#2d2048] text-[11px]">i\w</th>
              {Array.from({ length: W + 1 }, (_, j) => (
                <th
                  key={`col-${j}`}
                  className="px-[8px] py-[4px] border border-[#2d2048]"
                  style={{
                    color: hlCol === j ? W810_T.cyan : W810_T.muted,
                    background: hlCol === j ? `${W810_T.cyan}22` : "transparent",
                  }}
                >
                  {j}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dp.map((row, i) => (
              <tr key={`row-${i}`}>
                <td
                  className="px-[8px] py-[4px] border border-[#2d2048] font-bold text-[11px]"
                  style={{
                    color: hlRow === i ? W810_T.orange : W810_T.muted,
                    background: hlRow === i ? `${W810_T.orange}22` : "transparent",
                  }}
                >
                  {i === 0 ? "—" : `아이템${i}`}
                </td>
                {row.map((v, j) => {
                  const isHL = hlRow === i && hlCol === j;
                  return (
                    <td
                      key={`cell-${i}-${j}`}
                      onClick={() => { setHlRow(i); setHlCol(j); }}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setHlRow(i); setHlCol(j); } }}
                      role="button"
                      tabIndex={0}
                      className="px-[10px] py-[5px] text-center border border-[#2d2048] cursor-pointer transition-all duration-200 min-w-[32px]"
                      style={{
                        background: isHL ? `${W810_T.w9}44` : (hlRow === i || hlCol === j) ? `${W810_T.w9}11` : v > 0 ? `${W810_T.w9}08` : "transparent",
                        color: isHL ? W810_T.w9 : v > 0 ? W810_T.text : W810_T.muted,
                        fontWeight: isHL ? 700 : v === dp[n][W] ? 600 : 400,
                      }}
                    >
                      {v}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hlRow !== null && hlCol !== null && hlRow > 0 && (
        <div className="mt-[10px] px-[12px] py-[8px] bg-[#1e1530] border-l-[3px] border-l-[#ff79c6] rounded-[0_8px_8px_0] text-[13px] font-mono text-[#f8f8f2]">
          dp[{hlRow}][{hlCol}] ={" "}
          {hlCol < items[hlRow - 1].w
            ? `dp[${hlRow - 1}][${hlCol}] = ${dp[hlRow - 1][hlCol]} (물건 ${hlRow} 못 넣음, 무게 ${items[hlRow - 1].w} > ${hlCol})`
            : `max(dp[${hlRow - 1}][${hlCol}]=${dp[hlRow - 1][hlCol]}, dp[${hlRow - 1}][${hlCol - items[hlRow - 1].w}]+${items[hlRow - 1].v}=${dp[hlRow - 1][hlCol - items[hlRow - 1].w] + items[hlRow - 1].v}) = ${dp[hlRow][hlCol]}`}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════ LCS VIZ ══════════════════════════════ */
function W810_LCSViz() {
  const [s1] = useState("ABCBDAB");
  const [s2] = useState("BDCABA");
  const [hlCell, setHlCell] = useState(null);

  const dp = Array.from({ length: s1.length + 1 }, () => Array(s2.length + 1).fill(0));
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  return (
    <div className="bg-[#090612] border border-[#2d2048] rounded-[12px] p-[20px] my-[14px]">
      <div className="mb-[10px] flex gap-[16px] flex-wrap">
        <span className="text-[#f8f8f2] text-[13px]">S1: <strong className="text-[#8be9fd] font-mono">{s1}</strong></span>
        <span className="text-[#f8f8f2] text-[13px]">S2: <strong className="text-[#ffb86c] font-mono">{s2}</strong></span>
        <span className="text-[#f8f8f2] text-[13px]">LCS 길이: <strong className="text-[#50fa7b]">{dp[s1.length][s2.length]}</strong></span>
      </div>
      <div className="text-[#6272a4] text-[12px] mb-[6px]">셀 클릭으로 점화식 확인</div>
      <div className="overflow-x-auto">
        <table className="border-collapse font-mono text-[12px]">
          <thead>
            <tr>
              <th className="px-[8px] py-[4px] border border-[#2d2048] text-[#6272a4]" />
              <th className="px-[8px] py-[4px] border border-[#2d2048] text-[#6272a4]">∅</th>
              {s2.split("").map((c, j) => (
                <th key={`s2-${j}`} className="px-[10px] py-[4px] border border-[#2d2048] text-[#ffb86c]">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dp.map((row, i) => (
              <tr key={`lcs-row-${i}`}>
                <td className="px-[8px] py-[4px] border border-[#2d2048] text-[#8be9fd] font-bold">
                  {i === 0 ? "∅" : s1[i - 1]}
                </td>
                {row.map((v, j) => {
                  const isHL = hlCell && hlCell[0] === i && hlCell[1] === j;
                  const isMatch = i > 0 && j > 0 && s1[i - 1] === s2[j - 1];
                  return (
                    <td
                      key={`lcs-cell-${i}-${j}`}
                      onClick={() => setHlCell([i, j])}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setHlCell([i, j]); }}
                      role="button"
                      tabIndex={0}
                      className="px-[10px] py-[5px] text-center border border-[#2d2048] cursor-pointer transition-all duration-200 min-w-[28px]"
                      style={{
                        background: isHL ? `${W810_T.w9}44` : isMatch && v > 0 ? `${W810_T.green}22` : W810_T.card,
                        color: isHL ? W810_T.w9 : isMatch && v > 0 ? W810_T.green : v > 0 ? W810_T.text : W810_T.muted,
                        fontWeight: isHL ? 700 : 400,
                      }}
                    >
                      {v}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hlCell && hlCell[0] > 0 && hlCell[1] > 0 && (
        <div className="mt-[10px] px-[12px] py-[8px] bg-[#1e1530] border-l-[3px] border-l-[#ff79c6] rounded-[0_8px_8px_0] text-[13px] font-mono text-[#f8f8f2]">
          {s1[hlCell[0] - 1] === s2[hlCell[1] - 1]
            ? <span><span className="text-[#50fa7b]">✅ 문자 일치</span>: dp[{hlCell[0]}][{hlCell[1]}] = dp[{hlCell[0] - 1}][{hlCell[1] - 1}]+1 = {dp[hlCell[0] - 1][hlCell[1] - 1] + 1}</span>
            : <span><span className="text-[#6272a4]">불일치</span>: dp[{hlCell[0]}][{hlCell[1]}] = max(dp[{hlCell[0] - 1}][{hlCell[1]}]={dp[hlCell[0] - 1][hlCell[1]]}, dp[{hlCell[0]}][{hlCell[1] - 1}]={dp[hlCell[0]][hlCell[1] - 1]}) = {dp[hlCell[0]][hlCell[1]]}</span>
          }
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════ GREEDY VIZ ══════════════════════════════ */
function W810_GreedyActivityViz() {
  const activities = [
    { s: 1, e: 4, name: "A" }, { s: 3, e: 5, name: "B" }, { s: 0, e: 6, name: "C" },
    { s: 5, e: 7, name: "D" }, { s: 3, e: 9, name: "E" }, { s: 5, e: 9, name: "F" },
    { s: 6, e: 10, name: "G" }, { s: 8, e: 11, name: "H" }, { s: 8, e: 12, name: "I" },
    { s: 2, e: 14, name: "J" }, { s: 12, e: 16, name: "K" },
  ];
  const sorted = [...activities].sort((a, b) => a.e - b.e);
  const selected = [];
  let lastEnd = -1;
  for (const act of sorted) {
    if (act.s >= lastEnd) { selected.push(act.name); lastEnd = act.e; }
  }

  const maxT = 16;

  return (
    <div className="bg-[#090612] border border-[#2d2048] rounded-[12px] p-[20px] my-[14px]">
      <div className="text-[#6272a4] text-[12px] mb-[8px]">활동 선택 문제 — 종료 시간 기준 정렬 후 그리디</div>
      <div className="relative mb-[8px]">
        <div className="flex gap-[2px] mb-[4px]">
          {Array.from({ length: maxT + 1 }, (_, i) => (
            <div key={`t-${i}`} className="flex-1 text-center text-[#6272a4] text-[10px]">{i}</div>
          ))}
        </div>
        {sorted.map((act) => {
          const isSelected = selected.includes(act.name);
          return (
            <div key={act.name} className="flex items-center mb-[3px] gap-[6px]">
              <div
                className="w-[16px] text-[11px] font-bold"
                style={{ color: isSelected ? W810_T.green : W810_T.muted }}
              >
                {act.name}
              </div>
              <div className="flex-1 relative h-[16px]">
                <div
                  className="absolute h-full rounded-[4px] transition-all duration-300"
                  style={{
                    left: `${(act.s / maxT) * 100}%`,
                    width: `${((act.e - act.s) / maxT) * 100}%`,
                    background: isSelected ? `${W810_T.green}66` : `${W810_T.muted}33`,
                    border: `1px solid ${isSelected ? W810_T.green : `${W810_T.muted}55`}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-[10px] text-[13px]">
        <span className="text-[#6272a4]">선택된 활동: </span>
        {selected.map(name => (
          <span key={name} className="text-[#50fa7b] mr-[6px] font-mono font-bold">{name}</span>
        ))}
        <span className="text-[#6272a4] text-[12px]">(총 {selected.length}개)</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════ BACKTRACKING VIZ ══════════════════════════════ */
function W810_NQueensViz() {
  const [n, setN] = useState(5);
  const [solutions, setSolutions] = useState([]);
  const [currentSol, setCurrentSol] = useState(0);
  const [solved, setSolved] = useState(false);

  const solve = () => {
    const result = [];
    const board = Array(n).fill(-1);
    const cols = new Set();
    const diag1 = new Set();
    const diag2 = new Set();

    function bt(row) {
      if (row === n) { result.push([...board]); return; }
      for (let col = 0; col < n; col++) {
        if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
        board[row] = col;
        cols.add(col); diag1.add(row - col); diag2.add(row + col);
        bt(row + 1);
        board[row] = -1;
        cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
      }
    }
    bt(0);
    setSolutions(result);
    setCurrentSol(0);
    setSolved(true);
  };

  const sol = solutions[currentSol] || [];

  return (
    <div className="bg-[#090612] border border-[#2d2048] rounded-[12px] p-[20px] my-[14px]">
      <div className="flex gap-[10px] items-center mb-[14px] flex-wrap">
        <span className="text-[#f8f8f2] text-[13px]">N =</span>
        <select
          value={n}
          onChange={e => { setN(Number(e.target.value)); setSolved(false); setSolutions([]); }}
          className="px-[10px] py-[6px] bg-[#1e1530] border border-[#2d2048] text-[#f8f8f2] rounded-[6px]"
        >
          {[4, 5, 6, 7, 8].map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <button
          type="button"
          onClick={solve}
          className="px-[16px] py-[7px] bg-[#50fa7b] border-0 text-black rounded-[8px] cursor-pointer font-bold"
        >
          🔙 풀기
        </button>
        {solved && (
          <>
            <span className="text-[#50fa7b] text-[13px]">해 {solutions.length}개 발견!</span>
            <button
              type="button"
              onClick={() => setCurrentSol(p => Math.max(0, p - 1))}
              disabled={currentSol <= 0}
              className="px-[10px] py-[6px] bg-[#1e1530] border border-[#2d2048] text-[#f8f8f2] rounded-[6px] cursor-pointer"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => setCurrentSol(p => Math.min(solutions.length - 1, p + 1))}
              disabled={currentSol >= solutions.length - 1}
              className="px-[10px] py-[6px] bg-[#1e1530] border border-[#2d2048] text-[#f8f8f2] rounded-[6px] cursor-pointer"
            >
              ▶
            </button>
            <span className="text-[#6272a4] text-[12px]">{currentSol + 1}/{solutions.length}</span>
          </>
        )}
      </div>
      {solved && sol.length > 0 && (
        <div
          className="inline-grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${n}, 44px)` }}
        >
          {Array.from({ length: n }, (_, row) =>
            Array.from({ length: n }, (_, col) => {
              const isQueen = sol[row] === col;
              const isDark = (row + col) % 2 === 1;
              return (
                <div
                  key={`${row}-${col}`}
                  className="w-[44px] h-[44px] flex items-center justify-center rounded-[6px] text-[22px] transition-all duration-300"
                  style={{
                    background: isQueen ? `${W810_T.w10}44` : isDark ? W810_T.card : W810_T.surface,
                    border: `1px solid ${isQueen ? W810_T.w10 : W810_T.border}`,
                  }}
                >
                  {isQueen ? "♛" : ""}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════ BITMASK VIZ ══════════════════════════════ */
function W810_BitMaskViz() {
  const [mask, setMask] = useState(0);
  const n = 4;
  const items = ["🍎 사과", "🍌 바나나", "🍇 포도", "🍓 딸기"];

  const toggle = (i) => setMask(m => m ^ (1 << i));
  const check = (i) => (mask >> i) & 1;

  return (
    <div className="bg-[#090612] border border-[#2d2048] rounded-[12px] p-[20px] my-[14px]">
      <div className="text-[#6272a4] text-[12px] mb-[10px]">클릭해서 비트 ON/OFF</div>
      <div className="flex gap-[8px] mb-[14px] flex-wrap">
        {items.map((item, i) => (
          <button
            key={item}
            type="button"
            onClick={() => toggle(i)}
            className="px-[14px] py-[8px] rounded-[8px] cursor-pointer transition-all duration-200 text-[13px]"
            style={{
              background: check(i) ? `${W810_T.w9}44` : W810_T.card,
              border: `2px solid ${check(i) ? W810_T.w9 : W810_T.border}`,
              color: check(i) ? W810_T.w9 : W810_T.muted,
              fontWeight: check(i) ? 700 : 400,
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex gap-[6px] items-center mb-[12px] font-mono">
        <span className="text-[#6272a4] text-[12px]">비트 마스크:</span>
        {Array.from({ length: n }, (_, i) => n - 1 - i).map(i => (
          <div
            key={`bit-${i}`}
            className="w-[36px] h-[36px] flex flex-col items-center justify-center rounded-[6px]"
            style={{
              background: check(i) ? `${W810_T.w9}33` : W810_T.card,
              border: `2px solid ${check(i) ? W810_T.w9 : W810_T.border}`,
            }}
          >
            <div
              className="font-bold text-[16px]"
              style={{ color: check(i) ? W810_T.w9 : W810_T.muted }}
            >
              {check(i)}
            </div>
            <div className="text-[#6272a4] text-[9px]">2^{i}</div>
          </div>
        ))}
        <span className="text-[#ff79c6] text-[20px] font-bold ml-[4px]">= {mask}</span>
      </div>
      <div className="flex gap-[16px] text-[13px] font-mono flex-wrap">
        {[
          ["mask | (1<<i)", "비트 켜기", W810_T.green],
          ["mask & ~(1<<i)", "비트 끄기", W810_T.red],
          ["mask ^ (1<<i)", "비트 토글", W810_T.w9],
          ["(mask>>i) & 1", "비트 확인", W810_T.cyan],
          ["mask & (mask-1)", "최하위 비트 제거", W810_T.orange],
        ].map(([op, desc, color]) => (
          <div key={op} className="px-[10px] py-[6px] bg-[#1e1530] rounded-[6px]">
            <div className="text-[12px]" style={{ color }}>{op}</div>
            <div className="text-[#6272a4] text-[11px]">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════ SECTIONS ══════════════════════════════ */

export { W810_DPTableViz, W810_DP1463Viz, W810_LISViz, W810_KnapsackViz, W810_LCSViz, W810_GreedyActivityViz, W810_NQueensViz, W810_BitMaskViz };
