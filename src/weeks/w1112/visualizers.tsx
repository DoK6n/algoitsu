// @ts-nocheck
import { useState } from "react";
import { W1112_T } from "./theme";

function W1112_UnionFindViz() {
  const n = 7;
  const [parent, setParent] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [rank, setRank] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [log, setLog] = useState([]);
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);

  const find = (p, x) => {
    if (p[x] !== x) return find(p, p[x]);
    return x;
  };

  const doUnion = () => {
    const p = [...parent],
      r = [...rank];
    const ra = find(p, a),
      rb = find(p, b);
    if (ra === rb) {
      setLog(l => [
        `union(${a},${b}): 이미 같은 집합 (루트=${ra})`,
        ...l.slice(0, 4),
      ]);
      return;
    }
    if (r[ra] < r[rb]) p[ra] = rb;
    else if (r[ra] > r[rb]) p[rb] = ra;
    else {
      p[rb] = ra;
      r[ra]++;
    }
    setParent(p);
    setRank(r);
    setLog(l => [`union(${a},${b}): ${ra}번 ↔ ${rb}번 합병`, ...l.slice(0, 4)]);
  };

  const doFind = () => {
    const root = find(parent, a);
    setLog(l => [`find(${a}): 루트 = ${root}`, ...l.slice(0, 4)]);
  };

  const reset = () => {
    setParent([0, 1, 2, 3, 4, 5, 6]);
    setRank([0, 0, 0, 0, 0, 0, 0]);
    setLog([]);
  };

  // Build tree structure for display
  const roots = [...new Set(parent.map((_, i) => find(parent, i)))];
  const groups = roots.map(r => ({
    root: r,
    members: parent.map((_, i) => i).filter(i => find(parent, i) === r),
  }));

  return (
    <div className="bg-[#010610] border border-[#102040] rounded-[12px] p-[20px] my-[14px]">
      <div className="flex gap-[12px] mb-[16px] flex-wrap">
        <div className="flex gap-[6px] items-center">
          <span className="text-[#3a6080] text-[12px]">노드 A:</span>
          <select
            value={a}
            onChange={e => setA(Number(e.target.value))}
            className="px-[8px] py-[5px] bg-[#0a1628] border border-[#102040] text-[#e8f4fd] rounded-[6px]"
          >
            {Array.from({ length: n }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <span className="text-[#3a6080] text-[12px]">B:</span>
          <select
            value={b}
            onChange={e => setB(Number(e.target.value))}
            className="px-[8px] py-[5px] bg-[#0a1628] border border-[#102040] text-[#e8f4fd] rounded-[6px]"
          >
            {Array.from({ length: n }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={doUnion}
          className="px-[14px] py-[6px] bg-[#00e5ff] border-none text-black rounded-[8px] cursor-pointer font-bold text-[13px]"
        >
          union
        </button>
        <button
          type="button"
          onClick={doFind}
          className="px-[14px] py-[6px] bg-[#142035] border border-[#00e5ff] text-[#00e5ff] rounded-[8px] cursor-pointer text-[13px]"
        >
          find
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-[12px] py-[6px] bg-[#0a1628] border border-[#102040] text-[#3a6080] rounded-[8px] cursor-pointer text-[12px]"
        >
          🔄 리셋
        </button>
      </div>

      {/* Groups visualization */}
      <div className="flex gap-[10px] flex-wrap mb-[14px]">
        {groups.map(g => (
          <div
            key={g.root}
            className="px-[14px] py-[8px] bg-[#00e5ff11] border-2 border-[#00e5ff44] rounded-[10px]"
          >
            <div className="text-[#3a6080] text-[10px] mb-[4px]">
              집합 (루트:{g.root})
            </div>
            <div className="flex gap-[5px]">
              {g.members.map(m => (
                <div
                  key={m}
                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[6px] font-mono font-bold text-[13px] text-[#e8f4fd] border-2"
                  style={{
                    background:
                      m === g.root ? `${W1112_T.w11}44` : W1112_T.card,
                    borderColor: m === g.root ? W1112_T.w11 : W1112_T.border,
                  }}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Parent array */}
      <div className="mb-[12px]">
        <div className="text-[#3a6080] text-[11px] mb-[4px]">parent 배열</div>
        <div className="flex gap-[3px]">
          {parent.map((p, i) => (
            <div key={i} className="text-center min-w-[36px]">
              <div className="text-[#3a6080] text-[10px]">{i}</div>
              <div
                className="h-[30px] flex items-center justify-center rounded-[5px] font-mono font-bold border"
                style={{
                  background: p === i ? `${W1112_T.w11}33` : W1112_T.card,
                  borderColor: p === i ? W1112_T.w11 : W1112_T.border,
                  color: p === i ? W1112_T.w11 : W1112_T.text,
                }}
              >
                {p}
              </div>
            </div>
          ))}
        </div>
      </div>

      {log.length > 0 && (
        <div className="flex flex-col gap-[3px]">
          {log.map((l, i) => (
            <div
              key={`${i}-${l.slice(0, 16)}`}
              className="px-[10px] py-[5px] text-[12px] font-mono rounded-[0_6px_6px_0] transition-all duration-300 border-l-2"
              style={{
                background: i === 0 ? `${W1112_T.w11}11` : W1112_T.card,
                borderLeftColor: i === 0 ? W1112_T.w11 : W1112_T.border,
                color: i === 0 ? W1112_T.text : W1112_T.muted,
              }}
            >
              {l}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════ TOPOLOGICAL SORT VIZ ══════════════════════════════ */
function W1112_TopoViz() {
  // 5 tasks with dependencies
  const nodes = [0, 1, 2, 3, 4, 5];
  const edges = [
    [0, 2],
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 5],
    [3, 5],
    [4, 5],
  ];
  const labels = ["수학", "영어", "물리", "화학", "생물", "과학종합"];
  const adj = { 0: [2, 3], 1: [3, 4], 2: [5], 3: [5], 4: [5], 5: [] };
  const inDeg = { 0: 0, 1: 0, 2: 1, 3: 2, 4: 1, 5: 3 };

  const [steps, setSteps] = useState([]);
  const [idx, setIdx] = useState(-1);

  const build = () => {
    const deg = { ...inDeg };
    const queue = Object.entries(deg)
      .filter(([, d]) => d === 0)
      .map(([k]) => Number(k));
    const order = [];
    const s = [
      {
        queue: [...queue],
        visited: [],
        current: null,
        deg: { ...deg },
        msg: "진입차수 0인 노드부터 시작",
      },
    ];

    const q = [...queue];
    while (q.length) {
      q.sort((a, b) => a - b);
      const node = q.shift();
      order.push(node);
      s.push({
        queue: [...q],
        visited: [...order],
        current: node,
        deg: { ...deg },
        msg: `노드 ${node}(${labels[node]}) 처리`,
      });
      for (const nb of adj[node] || []) {
        deg[nb]--;
        if (deg[nb] === 0) {
          q.push(nb);
        }
        s.push({
          queue: [...q],
          visited: [...order],
          current: node,
          deg: { ...deg },
          msg: `${labels[nb]}의 진입차수 ${deg[nb] + 1}→${deg[nb]}${deg[nb] === 0 ? " → 큐에 추가" : ""}`,
        });
      }
    }
    s.push({
      queue: [],
      visited: order,
      current: null,
      deg: { ...deg },
      msg: `위상 정렬 완료: ${order.map(i => labels[i]).join(" → ")}`,
    });
    setSteps(s);
    setIdx(0);
  };

  const step = steps[idx] || {
    queue: [],
    visited: [],
    current: null,
    deg: { ...inDeg },
    msg: "",
  };

  const nodePos = [
    { x: 60, y: 130 },
    { x: 60, y: 230 },
    { x: 180, y: 80 },
    { x: 180, y: 180 },
    { x: 180, y: 280 },
    { x: 300, y: 180 },
  ];

  const getNC = n => {
    if (n === step.current) return W1112_T.w11;
    if (step.visited.includes(n)) return W1112_T.green;
    if (step.queue.includes(n)) return W1112_T.orange;
    return W1112_T.muted;
  };

  return (
    <div className="bg-[#010610] border border-[#102040] rounded-[12px] p-[20px] my-[14px]">
      <div className="flex gap-[16px] flex-wrap">
        <svg viewBox="0 0 370 330" className="w-full max-w-[370px] flex-none">
          {edges.map(([a, b], i) => (
            <line
              key={`e-${a}-${b}-${i}`}
              x1={nodePos[a].x}
              y1={nodePos[a].y}
              x2={nodePos[b].x}
              y2={nodePos[b].y}
              stroke={W1112_T.border}
              strokeWidth={2}
              markerEnd="url(#arrow)"
            />
          ))}
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={W1112_T.border} />
            </marker>
          </defs>
          {nodes.map(n => {
            const { x, y } = nodePos[n];
            const nc = getNC(n);
            return (
              <g key={n}>
                <circle
                  cx={x}
                  cy={y}
                  r={26}
                  fill={nc === W1112_T.muted ? W1112_T.card : `${nc}22`}
                  stroke={nc}
                  strokeWidth={2.5}
                  style={{ transition: "all 0.35s" }}
                />
                <text
                  x={x}
                  y={y - 4}
                  textAnchor="middle"
                  fill={W1112_T.text}
                  fontSize={11}
                  fontWeight={700}
                  fontFamily="monospace"
                >
                  {n}
                </text>
                <text
                  x={x}
                  y={y + 8}
                  textAnchor="middle"
                  fill={nc === W1112_T.muted ? W1112_T.muted : nc}
                  fontSize={9}
                >
                  {labels[n].slice(0, 4)}
                </text>
                <text
                  x={x + 22}
                  y={y - 18}
                  fill={W1112_T.orange}
                  fontSize={11}
                  fontWeight={700}
                  fontFamily="monospace"
                >
                  {step.deg[n] !== undefined ? step.deg[n] : inDeg[n]}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="flex-1 min-w-[160px]">
          <div className="mb-[10px]">
            <div className="text-[#3a6080] text-[11px] mb-[4px]">
              큐 (진입차수 0)
            </div>
            <div className="flex gap-[4px] flex-wrap">
              {step.queue.length === 0 ? (
                <span className="text-[#3a6080] text-[12px]">비어있음</span>
              ) : (
                step.queue.map(n => (
                  <div
                    key={n}
                    className="w-[32px] h-[32px] flex items-center justify-center bg-[#ff8c0033] border-2 border-[#ff8c00] rounded-[6px] text-[#e8f4fd] font-bold font-mono text-[13px]"
                  >
                    {n}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="mb-[10px]">
            <div className="text-[#3a6080] text-[11px] mb-[4px]">처리 순서</div>
            <div className="flex gap-[3px] flex-wrap">
              {step.visited.map((n, i) => (
                <span
                  key={`vis-${n}-${i}`}
                  className="text-[#00ff88] font-mono text-[12px]"
                >
                  {i > 0 && "→"} {labels[n].slice(0, 2)}
                </span>
              ))}
            </div>
          </div>
          {step.msg && (
            <div className="px-[10px] py-[8px] bg-[#0a1628] border-l-[3px] border-l-[#00e5ff] rounded-[0_8px_8px_0] text-[12px] text-[#e8f4fd] font-mono">
              {step.msg}
            </div>
          )}
          <div className="mt-[8px] text-[11px] flex gap-[10px]">
            <span>
              <span className="text-[#00e5ff]">●</span> 현재
            </span>
            <span>
              <span className="text-[#00ff88]">●</span> 완료
            </span>
            <span>
              <span className="text-[#ff8c00]">●</span> 큐
            </span>
            <span className="text-[#ff8c00] font-mono text-[10px]">
              ↗ = 진입차수
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-[8px] mt-[12px] flex-wrap">
        <button
          type="button"
          onClick={build}
          className="px-[16px] py-[7px] bg-[#00e5ff] border-none text-black rounded-[8px] cursor-pointer font-bold text-[13px]"
        >
          📐 시작
        </button>
        <button
          type="button"
          onClick={() => setIdx(p => Math.max(0, p - 1))}
          disabled={idx <= 0}
          className="px-[10px] py-[7px] bg-[#0a1628] border border-[#102040] text-[#e8f4fd] rounded-[8px] cursor-pointer"
        >
          ◀
        </button>
        <button
          type="button"
          onClick={() => setIdx(p => Math.min(steps.length - 1, p + 1))}
          disabled={idx >= steps.length - 1}
          className="px-[10px] py-[7px] bg-[#0a1628] border border-[#102040] text-[#e8f4fd] rounded-[8px] cursor-pointer"
        >
          ▶
        </button>
        {steps.length > 0 && (
          <span className="text-[#3a6080] text-[12px] self-center">
            {idx + 1}/{steps.length}
          </span>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════ SEGMENT TREE VIZ ══════════════════════════════ */
function W1112_SegTreeViz() {
  const initArr = [1, 3, 5, 7, 9, 11];
  const n = initArr.length;
  const [arr, setArr] = useState([...initArr]);
  const [tree, setTree] = useState([]);
  const [hlNodes, setHlNodes] = useState([]);
  const [queryL, setQueryL] = useState(1);
  const [queryR, setQueryR] = useState(4);
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState("sum");

  const buildTree = a => {
    const t = Array(4 * n).fill(0);
    const build = (node, s, e) => {
      if (s === e) {
        t[node] = a[s];
        return;
      }
      const m = (s + e) >> 1;
      build(2 * node, s, m);
      build(2 * node + 1, m + 1, e);
      t[node] =
        mode === "sum"
          ? t[2 * node] + t[2 * node + 1]
          : Math.min(t[2 * node], t[2 * node + 1]);
    };
    build(1, 0, n - 1);
    return t;
  };

  useEffect(() => {
    setTree(buildTree(arr));
    setHlNodes([]);
    setResult(null);
  }, [arr, mode]);

  const query = (l, r) => {
    const hl = [];
    const q = (node, s, e, l, r) => {
      if (r < s || e < l) return mode === "sum" ? 0 : Infinity;
      if (l <= s && e <= r) {
        hl.push(node);
        return tree[node];
      }
      const m = (s + e) >> 1;
      return mode === "sum"
        ? q(2 * node, s, m, l, r) + q(2 * node + 1, m + 1, e, l, r)
        : Math.min(q(2 * node, s, m, l, r), q(2 * node + 1, m + 1, e, l, r));
    };
    const res = q(1, 0, n - 1, l, r);
    setHlNodes(hl);
    setResult(res);
  };

  // Draw tree nodes
  const nodeLayout = [];
  const maxDepth = Math.ceil(Math.log2(n)) + 1;
  const svgW = 420;
  const levelH = 52;
  const drawNode = (node, s, e, depth, xMin, xMax) => {
    if (s > n - 1 || node >= 4 * n || tree[node] === undefined) return;
    const x = (xMin + xMax) / 2,
      y = depth * levelH + 28;
    nodeLayout.push({ node, x, y, val: tree[node], s, e, depth });
    if (s < e) {
      const m = (s + e) >> 1;
      drawNode(2 * node, s, m, depth + 1, xMin, (xMin + xMax) / 2);
      drawNode(2 * node + 1, m + 1, e, depth + 1, (xMin + xMax) / 2, xMax);
    }
  };
  if (tree.length) drawNode(1, 0, n - 1, 0, 0, svgW);

  return (
    <div className="bg-[#010610] border border-[#102040] rounded-[12px] p-[20px] my-[14px]">
      <div className="flex gap-[8px] mb-[12px] flex-wrap">
        <button
          type="button"
          onClick={() => setMode("sum")}
          className="px-[12px] py-[5px] rounded-[6px] cursor-pointer"
          style={{
            background: mode === "sum" ? W1112_T.w11 : W1112_T.card,
            border: `1px solid ${mode === "sum" ? W1112_T.w11 : W1112_T.border}`,
            color: mode === "sum" ? "#000" : W1112_T.muted,
            fontWeight: mode === "sum" ? 700 : 400,
          }}
        >
          합 쿼리
        </button>
        <button
          type="button"
          onClick={() => setMode("min")}
          className="px-[12px] py-[5px] rounded-[6px] cursor-pointer"
          style={{
            background: mode === "min" ? W1112_T.w11 : W1112_T.card,
            border: `1px solid ${mode === "min" ? W1112_T.w11 : W1112_T.border}`,
            color: mode === "min" ? "#000" : W1112_T.muted,
            fontWeight: mode === "min" ? 700 : 400,
          }}
        >
          최솟값 쿼리
        </button>
      </div>

      {/* Array input */}
      <div className="flex gap-[5px] mb-[14px] flex-wrap items-center">
        <span className="text-[#3a6080] text-[12px]">배열:</span>
        {arr.map((v, i) => (
          <input
            key={i}
            type="number"
            value={v}
            onChange={e => {
              const na = [...arr];
              na[i] = Number(e.target.value) || 0;
              setArr(na);
            }}
            className="w-[44px] p-[4px] text-center bg-[#0a1628] border border-[#102040] text-[#e8f4fd] rounded-[6px] font-mono text-[13px] font-bold"
          />
        ))}
      </div>

      {/* Tree SVG */}
      <div className="overflow-x-auto mb-[14px]">
        <svg
          viewBox={`0 0 ${svgW} ${(maxDepth + 1) * levelH}`}
          className="w-full block"
          style={{ maxWidth: svgW }}
        >
          {nodeLayout.map(({ node, x, y }) => {
            const child2 = nodeLayout.find(nd => nd.node === 2 * node);
            const child3 = nodeLayout.find(nd => nd.node === 2 * node + 1);
            return (
              <g key={`e${node}`}>
                {child2 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={child2.x}
                    y2={child2.y}
                    stroke={W1112_T.border}
                    strokeWidth={1.5}
                  />
                )}
                {child3 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={child3.x}
                    y2={child3.y}
                    stroke={W1112_T.border}
                    strokeWidth={1.5}
                  />
                )}
              </g>
            );
          })}
          {nodeLayout.map(({ node, x, y, val, s, e }) => {
            const isHL = hlNodes.includes(node);
            return (
              <g key={node}>
                <circle
                  cx={x}
                  cy={y}
                  r={20}
                  fill={isHL ? `${W1112_T.w11}44` : W1112_T.card}
                  stroke={isHL ? W1112_T.w11 : W1112_T.border}
                  strokeWidth={isHL ? 2.5 : 1.5}
                  style={{ transition: "all 0.3s" }}
                />
                <text
                  x={x}
                  y={y + 1}
                  textAnchor="middle"
                  fill={isHL ? W1112_T.w11 : W1112_T.text}
                  fontSize={11}
                  fontWeight={700}
                  fontFamily="monospace"
                >
                  {val}
                </text>
                <text
                  x={x}
                  y={y + 12}
                  textAnchor="middle"
                  fill={W1112_T.muted}
                  fontSize={8}
                  fontFamily="monospace"
                >
                  [{s},{e}]
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Query controls */}
      <div className="flex gap-[8px] items-center flex-wrap">
        <span className="text-[#3a6080] text-[12px]">
          구간 쿼리 [{queryL},{queryR}]:
        </span>
        <input
          type="range"
          min={0}
          max={n - 1}
          value={queryL}
          onChange={e => setQueryL(Math.min(Number(e.target.value), queryR))}
          className="w-[80px]"
          style={{ accentColor: W1112_T.w11 }}
        />
        <span className="text-[#00e5ff] font-mono min-w-[16px]">{queryL}</span>
        <span className="text-[#3a6080]">~</span>
        <input
          type="range"
          min={0}
          max={n - 1}
          value={queryR}
          onChange={e => setQueryR(Math.max(Number(e.target.value), queryL))}
          className="w-[80px]"
          style={{ accentColor: W1112_T.w11 }}
        />
        <span className="text-[#00e5ff] font-mono min-w-[16px]">{queryR}</span>
        <button
          type="button"
          onClick={() => query(queryL, queryR)}
          className="px-[14px] py-[6px] bg-[#00e5ff] border-none text-black rounded-[8px] cursor-pointer font-bold"
        >
          쿼리
        </button>
        {result !== null && (
          <span className="text-[#00ff88] font-mono font-bold">= {result}</span>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════ COMPLETION DASHBOARD ══════════════════════════════ */
function W1112_CompletionDashboard() {
  const allTopics = [
    { week: 1, topic: "Python 기초 & 복잡도" },
    { week: 2, topic: "정렬 & 이진탐색" },
    { week: 3, topic: "스택 & 큐 & 힙" },
    { week: 4, topic: "해시 & 문자열 & 투포인터" },
    { week: 5, topic: "DFS & BFS" },
    { week: 6, topic: "최단경로 알고리즘" },
    { week: 7, topic: "트리 & BST & 트라이" },
    { week: 8, topic: "DP 기초" },
    { week: 9, topic: "DP 심화" },
    { week: 10, topic: "그리디 & 분할정복 & 백트래킹" },
    { week: 11, topic: "유니온파인드 & 위상정렬 & 세그트리" },
    { week: 12, topic: "실전 모의고사" },
  ];

  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kt_progress") || "{}");
    } catch {
      return {};
    }
  });

  const toggle = k => {
    const nc = { ...checked, [k]: !checked[k] };
    setChecked(nc);
    try {
      localStorage.setItem("kt_progress", JSON.stringify(nc));
    } catch {}
  };

  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / allTopics.length) * 100);

  return (
    <div className="bg-[#010610] border border-[#102040] rounded-[12px] p-[20px] my-[14px]">
      <div className="mb-[16px]">
        <div className="flex justify-between items-center mb-[8px]">
          <span className="text-[#ffd700] font-bold">
            전체 진도: {done}/{allTopics.length}
          </span>
          <span className="text-[#ffd700] font-bold font-mono">{pct}%</span>
        </div>
        <div className="bg-[#0a1628] rounded-[20px] h-[8px] overflow-hidden">
          <div
            className="h-full rounded-[20px] transition-[width] duration-500 ease-in-out"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg,${W1112_T.w11},${W1112_T.w12})`,
            }}
          />
        </div>
      </div>
      <div
        className="grid gap-[8px]"
        style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}
      >
        {allTopics.map(({ week, topic }) => {
          const k = `w${week}`;
          const isDone = checked[k];
          return (
            <button
              key={k}
              type="button"
              onClick={() => toggle(k)}
              className="flex items-center gap-[10px] px-[14px] py-[10px] rounded-[10px] cursor-pointer text-left transition-all duration-[250ms] border"
              style={{
                background: isDone ? `${W1112_T.w12}15` : W1112_T.card,
                borderColor: isDone ? W1112_T.w12 : W1112_T.border,
              }}
            >
              <div
                className="w-[22px] h-[22px] rounded-[6px] flex items-center justify-center shrink-0 transition-all duration-200 text-[13px] border-2"
                style={{
                  background: isDone ? W1112_T.w12 : "transparent",
                  borderColor: isDone ? W1112_T.w12 : W1112_T.muted,
                }}
              >
                {isDone && "✓"}
              </div>
              <div>
                <div className="text-[#3a6080] text-[10px] font-mono">
                  Week {week}
                </div>
                <div
                  className="text-[12px]"
                  style={{
                    color: isDone ? W1112_T.text : W1112_T.muted,
                    fontWeight: isDone ? 600 : 400,
                  }}
                >
                  {topic}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════ SECTIONS ══════════════════════════════ */

export {
  W1112_UnionFindViz,
  W1112_TopoViz,
  W1112_SegTreeViz,
  W1112_CompletionDashboard,
};
