// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from 'react';
import { W2_COLORS } from './theme';

const INITIAL_ARR = [64, 34, 25, 12, 22, 11, 90, 45];
const INITIAL_IDS = INITIAL_ARR.map((_, i) => `slot-${i}`);

function W2_SortVisualizer({ algorithm }) {
  const [arr, setArr] = useState(INITIAL_ARR);
  const [ids] = useState(INITIAL_IDS);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  const generateSteps = useCallback((alg) => {
    const a = [...arr];
    const s = [{ arr: [...a], comparing: [], swapping: [], sorted: [] }];

    if (alg === "bubble") {
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
          s.push({ arr: [...a], comparing: [j, j + 1], swapping: [], sorted: Array.from({ length: i }, (_, k) => a.length - 1 - k) });
          if (a[j] > a[j + 1]) {
            [a[j], a[j + 1]] = [a[j + 1], a[j]];
            s.push({ arr: [...a], comparing: [], swapping: [j, j + 1], sorted: Array.from({ length: i }, (_, k) => a.length - 1 - k) });
          }
        }
      }
    } else if (alg === "selection") {
      for (let i = 0; i < a.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < a.length; j++) {
          s.push({ arr: [...a], comparing: [minIdx, j], swapping: [], sorted: Array.from({ length: i }, (_, k) => k), minIdx });
          if (a[j] < a[minIdx]) minIdx = j;
        }
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
        s.push({ arr: [...a], comparing: [], swapping: [i, minIdx], sorted: Array.from({ length: i + 1 }, (_, k) => k) });
      }
    } else if (alg === "insertion") {
      for (let i = 1; i < a.length; i++) {
        let j = i;
        while (j > 0 && a[j - 1] > a[j]) {
          s.push({ arr: [...a], comparing: [j - 1, j], swapping: [], sorted: Array.from({ length: i }, (_, k) => k) });
          [a[j - 1], a[j]] = [a[j], a[j - 1]];
          s.push({ arr: [...a], comparing: [], swapping: [j - 1, j], sorted: Array.from({ length: i }, (_, k) => k) });
          j--;
        }
      }
    }
    s.push({ arr: [...a], comparing: [], swapping: [], sorted: a.map((_, i) => i) });
    return s;
  }, [arr]);

  useEffect(() => {
    setSteps(generateSteps(algorithm));
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithm, generateSteps]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) { setIsPlaying(false); return prev; }
          return prev + 1;
        });
      }, 400);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, steps]);

  const step = steps[currentStep] || { arr, comparing: [], swapping: [], sorted: [] };
  const maxVal = Math.max(...step.arr);

  const getColor = (idx) => {
    if (step.swapping.includes(idx)) return W2_COLORS.danger;
    if (step.comparing.includes(idx)) return W2_COLORS.warn;
    if (step.sorted.includes(idx)) return W2_COLORS.accent3;
    return W2_COLORS.accent;
  };

  const reset = () => {
    setArr(INITIAL_ARR);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-[#0d1117] border border-[#1e2d45] rounded-[12px] p-5 my-4">
      <div className="flex items-end gap-[6px] h-[120px] mb-4">
        {step.arr.map((val, i) => (
          <div key={ids[i]} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[#e2e8f0] text-[11px]">{val}</span>
            <div style={{
              width: "100%",
              height: `${(val / maxVal) * 90}px`,
              background: getColor(i),
              borderRadius: "4px 4px 0 0",
              boxShadow: step.swapping.includes(i) ? `0 0 12px ${W2_COLORS.danger}` : step.comparing.includes(i) ? `0 0 8px ${W2_COLORS.warn}` : "none"
            }} className="transition-all duration-300" />
          </div>
        ))}
      </div>
      <div className="flex gap-3 items-center flex-wrap">
        <button type="button" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          className="px-[14px] py-[6px] bg-[#111827] border border-[#1e2d45] text-[#e2e8f0] rounded-[6px] cursor-pointer">◀ 이전</button>
        <button type="button" onClick={() => setIsPlaying(!isPlaying)}
          className="px-[18px] py-[6px] border-none text-black rounded-[6px] cursor-pointer font-bold"
          style={{ background: isPlaying ? W2_COLORS.danger : W2_COLORS.accent }}>
          {isPlaying ? "⏸ 멈춤" : "▶ 재생"}
        </button>
        <button type="button" onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          className="px-[14px] py-[6px] bg-[#111827] border border-[#1e2d45] text-[#e2e8f0] rounded-[6px] cursor-pointer">다음 ▶</button>
        <button type="button" onClick={reset}
          className="px-[14px] py-[6px] bg-[#111827] border border-[#1e2d45] text-[#64748b] rounded-[6px] cursor-pointer">🔄 리셋</button>
        <span className="text-[#64748b] text-[12px]">단계 {currentStep + 1} / {steps.length}</span>
      </div>
      <div className="flex gap-4 mt-3 text-[12px]">
        <span><span className="text-[#f59e0b]">●</span> 비교 중</span>
        <span><span className="text-[#ef4444]">●</span> 교환 중</span>
        <span><span className="text-[#10b981]">●</span> 정렬 완료</span>
        <span><span className="text-[#00d4ff]">●</span> 미정렬</span>
      </div>
    </div>
  );
}

function W2_BinarySearchViz() {
  const arr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91];
  const [target, setTarget] = useState(23);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const runSearch = () => {
    const s = [];
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      s.push({ left, right, mid, found: arr[mid] === target, tooSmall: arr[mid] < target });
      if (arr[mid] === target) break;
      if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    setSteps(s);
    setCurrentStep(0);
  };

  const step = steps[currentStep];

  return (
    <div className="bg-[#0d1117] border border-[#1e2d45] rounded-[12px] p-5 my-4">
      <div className="flex gap-3 mb-5 items-center flex-wrap">
        <span className="text-[#e2e8f0]">찾을 값:</span>
        <select value={target} onChange={e => { setTarget(Number(e.target.value)); setSteps([]); setCurrentStep(-1); }}
          className="px-3 py-[6px] bg-[#111827] border border-[#1e2d45] text-[#e2e8f0] rounded-[6px]">
          {arr.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <button type="button" onClick={runSearch}
          className="px-[18px] py-[6px] bg-[#00d4ff] border-none text-black rounded-[6px] cursor-pointer font-bold">🔍 탐색 시작</button>
        {steps.length > 0 && (
          <>
            <button type="button" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className="px-3 py-[6px] bg-[#111827] border border-[#1e2d45] text-[#e2e8f0] rounded-[6px] cursor-pointer">◀</button>
            <button type="button" onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className="px-3 py-[6px] bg-[#111827] border border-[#1e2d45] text-[#e2e8f0] rounded-[6px] cursor-pointer">▶</button>
            <span className="text-[#64748b] text-[12px]">{currentStep + 1} / {steps.length}단계</span>
          </>
        )}
      </div>
      <div className="flex gap-1 flex-wrap">
        {arr.map((val, i) => {
          let bg = W2_COLORS.card;
          let border = W2_COLORS.border;
          let color = W2_COLORS.text;
          if (step) {
            if (i === step.mid) { bg = step.found ? W2_COLORS.accent3 : W2_COLORS.warn; color = "#000"; }
            else if (i === step.left) { border = W2_COLORS.accent; }
            else if (i === step.right) { border = W2_COLORS.accent2; }
            else if (i < step.left || i > step.right) { color = W2_COLORS.muted; bg = "#0a0e1a"; }
          }
          return (
            <div key={val} className="w-[50px] h-[50px] flex flex-col items-center justify-center rounded-[8px] text-[14px] font-bold transition-all duration-300"
              style={{ background: bg, border: `2px solid ${border}`, color }}>
              <div>{val}</div>
              <div className="text-[9px]" style={{ color: i === step?.mid ? "#000" : W2_COLORS.muted }}>[{i}]</div>
            </div>
          );
        })}
      </div>
      {step && (
        <div className="mt-4 px-4 py-3 bg-[#111827] rounded-[8px]"
          style={{ borderLeft: `3px solid ${step.found ? W2_COLORS.accent3 : W2_COLORS.warn}` }}>
          <div className="text-[#e2e8f0] text-[13px]">
            <span className="text-[#00d4ff]">left={step.left}</span>, <span className="text-[#7c3aed]">right={step.right}</span>, <span className="text-[#f59e0b]">mid={step.mid}</span> → arr[{step.mid}]={arr[step.mid]}
            {step.found ? <span className="text-[#10b981] ml-2">✅ 찾았습니다!</span>
              : step.tooSmall ? <span className="text-[#64748b] ml-2">→ 목표값이 더 크므로 left = mid+1</span>
                : <span className="text-[#64748b] ml-2">→ 목표값이 더 작으므로 right = mid-1</span>}
          </div>
        </div>
      )}
    </div>
  );
}

const TREES = [
  { id: "t0", h: 3 }, { id: "t1", h: 5 }, { id: "t2", h: 6 },
  { id: "t3", h: 1 }, { id: "t4", h: 8 }, { id: "t5", h: 3 },
  { id: "t6", h: 7 }, { id: "t7", h: 4 }, { id: "t8", h: 2 },
  { id: "t9", h: 6 },
];

function W2_ParametricViz() {
  const [mid, setMid] = useState(3);
  const trees = TREES;
  const needed = 7;

  const calc = (height) => trees.reduce((sum, t) => sum + Math.max(0, t.h - height), 0);

  return (
    <div className="bg-[#0d1117] border border-[#1e2d45] rounded-[12px] p-5 my-4">
      <p className="text-[#e2e8f0] text-[13px] mt-0">🌲 나무 절단기 높이를 정해 {needed}m 이상 얻기 (백준 2805)</p>
      <div className="flex gap-1 items-end h-[100px] mb-3">
        {trees.map(({ id, h }) => (
          <div key={id} className="flex-1 flex flex-col items-center">
            <div className="w-full rounded-t-[3px] transition-all duration-300"
              style={{ height: `${(Math.min(h, mid) / 8) * 80}px`, background: W2_COLORS.accent3 }} />
            {h > mid && <div className="w-full rounded-t-[3px]"
              style={{ height: `${((h - mid) / 8) * 80}px`, background: W2_COLORS.warn }} />}
          </div>
        ))}
      </div>
      <div className="flex gap-[6px] mb-2 text-[12px]">
        <span><span className="text-[#10b981]">●</span> 남은 나무</span>
        <span><span className="text-[#f59e0b]">●</span> 잘린 나무 (획득)</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[#e2e8f0] text-[13px]">절단 높이:</span>
        <input type="range" min={0} max={8} value={mid} onChange={e => setMid(Number(e.target.value))}
          className="flex-1" style={{ accentColor: W2_COLORS.accent }} />
        <span className="text-[#00d4ff] font-bold min-w-[20px]">{mid}</span>
      </div>
      <div className="mt-3 px-[14px] py-[10px] bg-[#111827] rounded-[8px] text-[13px]">
        획득량: <span className="font-bold" style={{ color: calc(mid) >= needed ? W2_COLORS.accent3 : W2_COLORS.danger }}>{calc(mid)}m</span>
        <span className="text-[#64748b] ml-2">(필요: {needed}m → {calc(mid) >= needed ? "✅ 가능!" : "❌ 부족"})</span>
      </div>
    </div>
  );
}

function W2_ComplexityBadge({ time, space }) {
  return (
    <span className="inline-flex gap-2 text-[12px]">
      <span className="bg-[#1a2744] border border-[#00d4ff] text-[#00d4ff] px-2 py-[2px] rounded-[20px]">시간 {time}</span>
      <span className="bg-[#1a1744] border border-[#7c3aed] text-[#7c3aed] px-2 py-[2px] rounded-[20px]">공간 {space}</span>
    </span>
  );
}

export { W2_SortVisualizer, W2_BinarySearchViz, W2_ParametricViz };
