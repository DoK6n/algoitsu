// @ts-nocheck
import { useState } from 'react';
import { W34_T } from './theme';

function W34_StackViz() {
  const [stack, setStack] = useState([3, 7, 2]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");
  const [flash, setFlash] = useState(null);

  const push = () => {
    const v = Number.parseInt(input, 10);
    if (Number.isNaN(v)) return;
    setStack(s => [...s, v]);
    setMsg(`push(${v}) → 스택 맨 위에 추가`);
    setFlash("push");
    setInput("");
    setTimeout(() => setFlash(null), 600);
  };

  const pop = () => {
    if (!stack.length) { setMsg("스택이 비어있습니다!"); return; }
    const v = stack[stack.length - 1];
    setStack(s => s.slice(0, -1));
    setMsg(`pop() → ${v} 꺼냄`);
    setFlash("pop");
    setTimeout(() => setFlash(null), 600);
  };

  const peek = () => {
    if (!stack.length) { setMsg("스택이 비어있습니다!"); return; }
    setMsg(`peek() → ${stack[stack.length - 1]} (꺼내지 않음)`);
  };

  return (
    <div className="bg-[#080b07] border border-[#2a3325] rounded-[12px] p-5 my-[14px]">
      <div className="flex gap-8 items-end flex-wrap">
        {/* Stack diagram */}
        <div className="flex flex-col items-center gap-1" style={{ minWidth: 120 }}>
          <div className="text-[#5a6e50] text-[12px] mb-1">← TOP</div>
          {stack.length === 0
            ? <div className="text-[#5a6e50] p-3 border border-dashed border-[#2a3325] rounded-[6px]">비어있음</div>
            : [...stack].reverse().map((v, i) => (
              <div key={`stack-item-${v}-${i}`} className="w-[100px] h-[38px] flex items-center justify-center rounded-[6px] transition-all duration-300 font-mono text-[16px] text-[#dde8d6] border-2"
                style={{
                  background: i === 0 && flash === "push" ? "#7eff6a44"
                            : i === 0 && flash === "pop" ? "#ff4f4f44"
                            : W34_T.card,
                  borderColor: i === 0 ? W34_T.accent : W34_T.border,
                  fontWeight: i === 0 ? 700 : 400,
                }}>{v}</div>
            ))}
          <div className="w-[100px] h-[6px] bg-[#2a3325] rounded-[3px] mt-1" />
          <div className="text-[#5a6e50] text-[11px]">BOTTOM</div>
        </div>
        {/* Controls */}
        <div className="flex-1" style={{ minWidth: 200 }}>
          <div className="flex gap-2 mb-3 flex-wrap">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && push()}
              placeholder="숫자 입력"
              className="px-3 py-2 bg-[#1a1f16] border border-[#2a3325] text-[#dde8d6] rounded-[8px] w-[100px] font-mono" />
            <button type="button" onClick={push}
              className="px-4 py-2 bg-[#7eff6a] border-none text-black rounded-[8px] cursor-pointer font-bold">push</button>
            <button type="button" onClick={pop}
              className="px-4 py-2 bg-[#ff4f4f] border-none text-white rounded-[8px] cursor-pointer font-bold">pop</button>
            <button type="button" onClick={peek}
              className="px-4 py-2 bg-[#1a1f16] border border-[#2a3325] text-[#dde8d6] rounded-[8px] cursor-pointer">peek</button>
          </div>
          {msg && <div className="text-[#7eff6a] bg-[#7eff6a15] border border-[#7eff6a33] px-[14px] py-2 rounded-[8px] text-[13px] font-mono">{msg}</div>}
          <div className="mt-3 text-[#5a6e50] text-[12px]">
            크기: {stack.length} | LIFO (Last In First Out)
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── QUEUE VISUALIZER ─────────────────── */
function W34_QueueViz() {
  const [queue, setQueue] = useState([5, 2, 8]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  const enqueue = () => {
    const v = Number.parseInt(input, 10);
    if (Number.isNaN(v)) return;
    setQueue(q => [...q, v]);
    setMsg(`enqueue(${v}) → 맨 뒤에 추가`);
    setInput("");
  };

  const dequeue = () => {
    if (!queue.length) { setMsg("큐가 비어있습니다!"); return; }
    setMsg(`dequeue() → ${queue[0]} 꺼냄 (맨 앞에서)`);
    setQueue(q => q.slice(1));
  };

  return (
    <div className="bg-[#080b07] border border-[#2a3325] rounded-[12px] p-5 my-[14px]">
      <div className="mb-3 flex justify-between">
        <span className="text-[#42c9ff] text-[12px]">← dequeue (앞)</span>
        <span className="text-[#ff8c42] text-[12px]">enqueue (뒤) →</span>
      </div>
      <div className="flex gap-1 items-center mb-4 overflow-x-auto pb-1">
        <div className="text-[#42c9ff] text-[20px] mr-1">▶</div>
        {queue.length === 0
          ? <div className="text-[#5a6e50] px-6 py-3 border border-dashed border-[#2a3325] rounded-[8px]">비어있음</div>
          : queue.map((v, i) => (
            <div key={`queue-item-${v}-${i}`} className="flex items-center justify-center rounded-[8px] text-[#dde8d6] font-bold font-mono text-[16px] border-2"
              style={{
                minWidth: 52,
                height: 52,
                background: i === 0 ? "#42c9ff33" : W34_T.card,
                borderColor: i === 0 ? W34_T.accent3 : i === queue.length - 1 ? W34_T.accent2 : W34_T.border,
              }}>{v}</div>
          ))}
        <div className="text-[#ff8c42] text-[20px] ml-1">▶</div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && enqueue()}
          placeholder="숫자"
          className="px-3 py-2 bg-[#1a1f16] border border-[#2a3325] text-[#dde8d6] rounded-[8px] w-[80px] font-mono" />
        <button type="button" onClick={enqueue}
          className="px-4 py-2 bg-[#ff8c42] border-none text-black rounded-[8px] cursor-pointer font-bold">enqueue</button>
        <button type="button" onClick={dequeue}
          className="px-4 py-2 bg-[#42c9ff] border-none text-black rounded-[8px] cursor-pointer font-bold">dequeue</button>
        {msg && <span className="text-[#7eff6a] text-[13px] py-2 font-mono">{msg}</span>}
      </div>
    </div>
  );
}

/* ─────────────────── DEQUE VISUALIZER ─────────────────── */
function W34_DequeViz() {
  const [deque, setDeque] = useState([4, 7, 1]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  const appendleft = () => {
    const v = Number.parseInt(input, 10);
    if (Number.isNaN(v)) return;
    setDeque(d => [v, ...d]);
    setMsg(`appendleft(${v})`);
    setInput("");
  };

  const append = () => {
    const v = Number.parseInt(input, 10);
    if (Number.isNaN(v)) return;
    setDeque(d => [...d, v]);
    setMsg(`append(${v})`);
    setInput("");
  };

  const popleft = () => {
    if (!deque.length) return;
    setMsg(`popleft() → ${deque[0]}`);
    setDeque(d => d.slice(1));
  };

  const pop = () => {
    if (!deque.length) return;
    setMsg(`pop() → ${deque[deque.length - 1]}`);
    setDeque(d => d.slice(0, -1));
  };

  return (
    <div className="bg-[#080b07] border border-[#2a3325] rounded-[12px] p-5 my-[14px]">
      <div className="flex gap-1 items-center mb-[14px] overflow-x-auto">
        <div className="text-[#ff4f8b] text-[14px]">⟵ 앞</div>
        {deque.map((v, i) => (
          <div key={`deque-item-${v}-${i}`} className="flex items-center justify-center rounded-[8px] text-[#dde8d6] font-bold font-mono text-[16px] border-2 bg-[#1a1f16]"
            style={{
              minWidth: 52,
              height: 52,
              borderColor: i === 0 ? W34_T.accent4 : i === deque.length - 1 ? W34_T.purple : W34_T.border,
            }}>{v}</div>
        ))}
        <div className="text-[#b57fff] text-[14px]">뒤 ⟶</div>
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        <input value={input} onChange={e => setInput(e.target.value)}
          placeholder="숫자"
          className="px-3 py-2 bg-[#1a1f16] border border-[#2a3325] text-[#dde8d6] rounded-[8px] w-[80px] font-mono" />
        <button type="button" onClick={appendleft} className="px-3 py-[6px] bg-[#ff4f8bcc] border-none text-white rounded-[8px] cursor-pointer text-[12px] font-bold">appendleft</button>
        <button type="button" onClick={popleft} className="px-3 py-[6px] bg-[#ff4f8b44] border border-[#ff4f8b] text-[#ff4f8b] rounded-[8px] cursor-pointer text-[12px]">popleft</button>
        <button type="button" onClick={append} className="px-3 py-[6px] bg-[#b57fffcc] border-none text-white rounded-[8px] cursor-pointer text-[12px] font-bold">append</button>
        <button type="button" onClick={pop} className="px-3 py-[6px] bg-[#b57fff44] border border-[#b57fff] text-[#b57fff] rounded-[8px] cursor-pointer text-[12px]">pop</button>
      </div>
      {msg && <div className="mt-[10px] text-[#7eff6a] font-mono text-[13px]">{msg}</div>}
    </div>
  );
}

/* ─────────────────── HEAP VIZ ─────────────────── */
function W34_HeapViz() {
  const [heap, setHeap] = useState([1, 3, 2, 9, 5, 7]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  const push = () => {
    const v = Number.parseInt(input, 10);
    if (Number.isNaN(v)) return;
    const h = [...heap, v];
    // bubble up
    let i = h.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (h[parent] > h[i]) { [h[parent], h[i]] = [h[i], h[parent]]; i = parent; }
      else break;
    }
    setHeap(h);
    setMsg(`heappush(${v}) → 최솟값: ${h[0]}`);
    setInput("");
  };

  const pop = () => {
    if (!heap.length) return;
    const h = [...heap];
    const min = h[0];
    h[0] = h[h.length - 1];
    h.pop();
    let i = 0;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < h.length && h[l] < h[smallest]) smallest = l;
      if (r < h.length && h[r] < h[smallest]) smallest = r;
      if (smallest !== i) { [h[smallest], h[i]] = [h[i], h[smallest]]; i = smallest; }
      else break;
    }
    setHeap(h);
    setMsg(`heappop() → ${min} 꺼냄, 새 최솟값: ${h[0] ?? "없음"}`);
  };

  const getPos = (i) => {
    const level = Math.floor(Math.log2(i + 1));
    const posInLevel = i - (2 ** level - 1);
    const totalInLevel = 2 ** level;
    const x = ((posInLevel + 0.5) / totalInLevel) * 300;
    const y = level * 54 + 20;
    return { x, y };
  };

  const lines = heap.map((_, i) => {
    if (i === 0) return null;
    const parent = Math.floor((i - 1) / 2);
    const p1 = getPos(parent);
    const p2 = getPos(i);
    return <line key={`heap-line-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={W34_T.border} strokeWidth={2} />;
  });

  const nodes = heap.map((v, i) => {
    const { x, y } = getPos(i);
    return (
      <g key={`heap-node-${i}`}>
        <circle cx={x} cy={y} r={18} fill={i === 0 ? `${W34_T.accent}33` : W34_T.card} stroke={i === 0 ? W34_T.accent : W34_T.border} strokeWidth={2} />
        <text x={x} y={y + 5} textAnchor="middle" fill={W34_T.text} fontSize={13} fontWeight={i === 0 ? 700 : 400} fontFamily="monospace">{v}</text>
      </g>
    );
  });

  const svgHeight = heap.length > 0 ? Math.floor(Math.log2(heap.length)) * 54 + 60 : 60;

  return (
    <div className="bg-[#080b07] border border-[#2a3325] rounded-[12px] p-5 my-[14px]">
      <svg width="300" height={svgHeight} aria-label="힙 트리 시각화" className="block mx-auto mb-3">
        {lines}
        {nodes}
      </svg>
      <div className="flex gap-2 flex-wrap items-center">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && push()}
          placeholder="숫자"
          className="px-3 py-2 bg-[#1a1f16] border border-[#2a3325] text-[#dde8d6] rounded-[8px] w-[80px] font-mono" />
        <button type="button" onClick={push} className="px-4 py-2 bg-[#7eff6a] border-none text-black rounded-[8px] cursor-pointer font-bold">heappush</button>
        <button type="button" onClick={pop} className="px-4 py-2 bg-[#ff4f4f] border-none text-white rounded-[8px] cursor-pointer font-bold">heappop</button>
        {msg && <span className="text-[#7eff6a] text-[13px] font-mono">{msg}</span>}
      </div>
    </div>
  );
}

/* ─────────────────── HASHMAP VIZ ─────────────────── */
function W34_HashMapViz() {
  const [entries, setEntries] = useState([["apple", 3], ["banana", 1], ["cherry", 5]]);
  const [key, setKey] = useState("");
  const [val, setVal] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [found, setFound] = useState(null);

  const add = () => {
    if (!key) return;
    setEntries(e => {
      const filtered = e.filter(([k]) => k !== key);
      return [...filtered, [key, val]];
    });
    setKey("");
    setVal("");
    setFound(null);
  };

  const search = () => {
    const e = entries.find(([k]) => k === searchKey);
    setFound(e ? e[1] : "❌ 없음");
  };

  const bucketSize = 5;
  const hash = (k) => k.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % bucketSize;
  const buckets = Array.from({ length: bucketSize }, (_, i) => entries.filter(([k]) => hash(k) === i));

  return (
    <div className="bg-[#080b07] border border-[#2a3325] rounded-[12px] p-5 my-[14px]">
      <div className="flex gap-5 flex-wrap">
        {/* Buckets */}
        <div className="flex-1" style={{ minWidth: 200 }}>
          <div className="text-[#5a6e50] text-[12px] mb-2">해시 버킷 (크기 {bucketSize})</div>
          {buckets.map((bucket, i) => (
            <div key={`bucket-${i}`} className="flex items-center gap-2 mb-1">
              <div className="w-[28px] h-[34px] bg-[#1a1f16] border border-[#2a3325] rounded-[4px] flex items-center justify-center text-[#5a6e50] text-[11px] font-mono">{i}</div>
              {bucket.map(([k, v]) => (
                <div key={k} className="px-[10px] py-1 bg-[#7eff6a22] border border-[#7eff6a55] rounded-[6px] text-[12px] text-[#7eff6a] font-mono">{k}: {v}</div>
              ))}
              {bucket.length === 0 && <div className="text-[#5a6e50] text-[12px]">—</div>}
            </div>
          ))}
        </div>
        {/* Controls */}
        <div className="flex-1" style={{ minWidth: 180 }}>
          <div className="text-[#5a6e50] text-[12px] mb-2">추가</div>
          <div className="flex gap-[6px] mb-3 flex-wrap">
            <input value={key} onChange={e => setKey(e.target.value)} placeholder="key"
              className="w-[80px] px-[10px] py-[6px] bg-[#1a1f16] border border-[#2a3325] text-[#dde8d6] rounded-[6px] font-mono text-[12px]" />
            <input value={val} onChange={e => setVal(e.target.value)} placeholder="value"
              className="w-[60px] px-[10px] py-[6px] bg-[#1a1f16] border border-[#2a3325] text-[#dde8d6] rounded-[6px] font-mono text-[12px]" />
            <button type="button" onClick={add} className="px-3 py-[6px] bg-[#ff8c42] border-none text-black rounded-[6px] cursor-pointer font-bold text-[12px]">추가</button>
          </div>
          <div className="text-[#5a6e50] text-[12px] mb-2">탐색 O(1)</div>
          <div className="flex gap-[6px]">
            <input value={searchKey} onChange={e => setSearchKey(e.target.value)} placeholder="key"
              className="w-[100px] px-[10px] py-[6px] bg-[#1a1f16] border border-[#2a3325] text-[#dde8d6] rounded-[6px] font-mono text-[12px]" />
            <button type="button" onClick={search} className="px-3 py-[6px] bg-[#42c9ff] border-none text-black rounded-[6px] cursor-pointer font-bold text-[12px]">탐색</button>
          </div>
          {found !== null && <div className="mt-[10px] text-[#7eff6a] font-mono text-[13px]">
            → {found}
          </div>}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── TWO POINTER VIZ ─────────────────── */
function W34_TwoPtrViz() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [target, setTarget] = useState(11);
  const [step, setStep] = useState(null);
  const [steps, setSteps] = useState([]);
  const [idx, setIdx] = useState(-1);

  const run = () => {
    const s = [];
    let l = 0;
    let r = arr.length - 1;
    while (l < r) {
      const sum = arr[l] + arr[r];
      s.push({ l, r, sum, found: sum === target });
      if (sum === target) break;
      if (sum < target) l++;
      else r--;
    }
    setSteps(s);
    setIdx(0);
    setStep(s[0]);
  };

  const next = () => {
    const ni = Math.min(idx + 1, steps.length - 1);
    setIdx(ni);
    setStep(steps[ni]);
  };

  const prev = () => {
    const ni = Math.max(idx - 1, 0);
    setIdx(ni);
    setStep(steps[ni]);
  };

  return (
    <div className="bg-[#080b07] border border-[#2a3325] rounded-[12px] p-5 my-[14px]">
      <div className="flex gap-[10px] items-center mb-[14px] flex-wrap">
        <span className="text-[#dde8d6] text-[13px]">합 = <strong className="text-[#7eff6a]">{target}</strong> 인 쌍 찾기:</span>
        <select value={target} onChange={e => { setTarget(Number(e.target.value)); setSteps([]); setIdx(-1); setStep(null); }}
          className="px-[10px] py-[6px] bg-[#1a1f16] border border-[#2a3325] text-[#dde8d6] rounded-[6px]">
          {[7, 9, 11, 13, 15, 17].map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <button type="button" onClick={run} className="px-4 py-[6px] bg-[#7eff6a] border-none text-black rounded-[8px] cursor-pointer font-bold">실행</button>
        {steps.length > 0 && <>
          <button type="button" onClick={prev} className="px-[10px] py-[6px] bg-[#1a1f16] border border-[#2a3325] text-[#dde8d6] rounded-[6px] cursor-pointer">◀</button>
          <button type="button" onClick={next} className="px-[10px] py-[6px] bg-[#1a1f16] border border-[#2a3325] text-[#dde8d6] rounded-[6px] cursor-pointer">▶</button>
          <span className="text-[#5a6e50] text-[12px]">{idx + 1}/{steps.length}</span>
        </>}
      </div>
      <div className="flex gap-[5px] mb-[14px]">
        {arr.map((v, i) => {
          const isL = step && i === step.l;
          const isR = step && i === step.r;
          const bg = isL ? "#42c9ff44" : isR ? "#ff4f8b44" : W34_T.card;
          const borderColor = isL ? W34_T.accent3 : isR ? W34_T.accent4 : W34_T.border;
          return (
            <div key={`twoptr-${v}-${i}`} className="flex flex-col items-center justify-center rounded-[8px] transition-all duration-[250ms] border-2"
              style={{ width: 44, height: 44, background: bg, borderColor }}>
              <div className="text-[#dde8d6] font-bold font-mono">{v}</div>
              {isL && <div className="text-[9px] text-[#42c9ff]">L</div>}
              {isR && <div className="text-[9px] text-[#ff4f8b]">R</div>}
            </div>
          );
        })}
      </div>
      {step && (
        <div className="px-[14px] py-[10px] rounded-[8px] text-[13px] font-mono border"
          style={{
            background: step.found ? "#7eff6a15" : W34_T.card,
            borderColor: step.found ? W34_T.accent : W34_T.border,
          }}>
          arr[{step.l}]({arr[step.l]}) + arr[{step.r}]({arr[step.r]}) = {step.sum}
          {step.found
            ? <span className="text-[#7eff6a] ml-[10px]">✅ 발견!</span>
            : step.sum < target
              ? <span className="text-[#5a6e50] ml-[10px]">→ 합이 작음, L++</span>
              : <span className="text-[#5a6e50] ml-[10px]">→ 합이 큼, R--</span>}
        </div>
      )}
    </div>
  );
}

/* ─────────────────── SLIDING WINDOW VIZ ─────────────────── */
function W34_SlidingWindowViz() {
  const arr = [2, 1, 5, 1, 3, 2, 6, 4, 1, 3];
  const [k, setK] = useState(3);
  const [winIdx, setWinIdx] = useState(0);
  const maxStart = arr.length - k;

  const maxSum = Math.max(...Array.from({ length: arr.length - k + 1 }, (_, i) =>
    arr.slice(i, i + k).reduce((a, b) => a + b, 0)));

  const curSum = arr.slice(winIdx, winIdx + k).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-[#080b07] border border-[#2a3325] rounded-[12px] p-5 my-[14px]">
      <div className="flex gap-[10px] items-center mb-[14px] flex-wrap">
        <span className="text-[#dde8d6] text-[13px]">윈도우 크기 k =</span>
        <input type="range" min={1} max={5} value={k} onChange={e => { setK(Number(e.target.value)); setWinIdx(0); }}
          className="w-[100px]" style={{ accentColor: W34_T.accent2 }} />
        <span className="text-[#ff8c42] font-bold">{k}</span>
      </div>
      <div className="flex gap-[5px] mb-[14px]">
        {arr.map((v, i) => {
          const inWin = i >= winIdx && i < winIdx + k;
          return (
            <div key={`slide-${i}`} className="flex flex-col items-center justify-center rounded-[8px] transition-all duration-[250ms] gap-[2px] border-2"
              style={{
                width: 40,
                height: 48,
                background: inWin ? "#ff8c4233" : W34_T.card,
                borderColor: inWin ? W34_T.accent2 : W34_T.border,
              }}>
              <div className="text-[#dde8d6] font-mono" style={{ fontWeight: inWin ? 700 : 400 }}>{v}</div>
              <div className="text-[9px] text-[#5a6e50]">{i}</div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 items-center mb-3">
        <button type="button" onClick={() => setWinIdx(Math.max(0, winIdx - 1))}
          className="px-3 py-[6px] bg-[#1a1f16] border border-[#2a3325] text-[#dde8d6] rounded-[6px] cursor-pointer">◀</button>
        <button type="button" onClick={() => setWinIdx(Math.min(maxStart, winIdx + 1))}
          className="px-3 py-[6px] bg-[#1a1f16] border border-[#2a3325] text-[#dde8d6] rounded-[6px] cursor-pointer">▶</button>
        <span className="text-[#5a6e50] text-[12px]">시작 인덱스: {winIdx}</span>
      </div>
      <div className="flex gap-4 text-[13px] font-mono">
        <span>현재 합: <strong className="text-[#ff8c42]">{curSum}</strong></span>
        <span>최대 합: <strong className="text-[#7eff6a]">{maxSum}</strong> {curSum === maxSum && "← ✅ 최대!"}</span>
      </div>
    </div>
  );
}

/* ─────────────────── SECTIONS ─────────────────── */

export { W34_StackViz, W34_QueueViz, W34_DequeViz, W34_HeapViz, W34_HashMapViz, W34_TwoPtrViz, W34_SlidingWindowViz };
