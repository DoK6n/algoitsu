// @ts-nocheck
import { useState } from 'react';
import { W1112_T } from './theme';
import { W1112_UnionFindViz, W1112_TopoViz, W1112_SegTreeViz, W1112_CompletionDashboard } from './visualizers';

export const W1112_chapters = [
  { id:"intro",    week:"",   label:"목차",            icon:"🗺️", color:W1112_T.text },
  { id:"uf",       week:"W11",label:"유니온 파인드",   icon:"🔗", color:W1112_T.w11 },
  { id:"kruskal",  week:"W11",label:"크루스칼 MST",    icon:"🌲", color:W1112_T.w11 },
  { id:"topo",     week:"W11",label:"위상 정렬",       icon:"📐", color:W1112_T.w11 },
  { id:"segtree",  week:"W11",label:"세그먼트 트리",   icon:"📊", color:W1112_T.w11 },
  { id:"final",    week:"W12",label:"실전 전략",       icon:"🎯", color:W1112_T.w12 },
  { id:"company",  week:"W12",label:"기업별 출제 경향",icon:"🏢", color:W1112_T.w12 },
  { id:"checklist",week:"W12",label:"최종 체크리스트", icon:"✅", color:W1112_T.w12 },
  { id:"complete", week:"",   label:"🎓 커리큘럼 완료",icon:"🏆", color:W1112_T.w12 },
];

/* ══════════════════════════════ SHARED UI ══════════════════════════════ */
function W1112_Badge({ children, color = W1112_T.w11 }) {
  return (
    <span
      className="inline-block rounded-[20px] text-[12px] font-semibold px-[10px] py-[2px]"
      style={{ background: `${color}22`, border: `1px solid ${color}55`, color }}
    >
      {children}
    </span>
  );
}

function W1112_Callout({ color = W1112_T.w11, icon = "💡", title, children }) {
  return (
    <div
      className="rounded-[10px] px-[18px] py-[14px] my-[14px]"
      style={{
        background: `${color}0e`,
        border: `1px solid ${color}40`,
        borderLeft: `4px solid ${color}`,
      }}
    >
      {title && (
        <div className="font-bold mb-[8px] text-[14px]" style={{ color }}>
          {icon} {title}
        </div>
      )}
      <div className="text-[#e8f4fd] leading-[1.9] text-[13.5px]">{children}</div>
    </div>
  );
}

function W1112_SectionTitle({ children, sub, color = W1112_T.w11 }) {
  return (
    <div className="mb-[24px]">
      <h2
        className="m-0 text-[22px] font-extrabold font-mono"
        style={{ color, textShadow: `0 0 30px ${color}44` }}
      >
        {children}
      </h2>
      {sub && <p className="text-[#3a6080] mt-[6px] mb-0 text-[14px]">{sub}</p>}
    </div>
  );
}

function W1112_CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const kw = new Set(["def","for","while","if","elif","else","return","in","range","len","and","or","not","True","False","None","import","from","class","break","continue","pass","lambda","with","as","try","except","yield","global","print"]);
  const bi = new Set(["input","int","str","list","dict","set","tuple","min","max","heapq","heappush","heappop","collections","deque","append","pop","Counter","defaultdict","sorted","enumerate","zip","map","sum","any","all","float","inf","abs","sys"]);

  const renderLine = (line) => {
    const ci = line.indexOf("#");
    const src = ci !== -1 ? line.slice(0, ci) : line;
    const cmt = ci !== -1 ? line.slice(ci) : "";
    const tokens = src.split(/(\b\w+\b|[^\w\s]|\s+)/g).filter(Boolean).map((t, i) => {
      const k = `${i}-${t}`;
      if (kw.has(t)) return <span key={k} className="text-[#c084fc] font-bold">{t}</span>;
      if (bi.has(t)) return <span key={k} className="text-[#67e8f9]">{t}</span>;
      if (/^\d+$/.test(t)) return <span key={k} className="text-[#fbbf24]">{t}</span>;
      if (/^["']/.test(t)) return <span key={k} className="text-[#86efac]">{t}</span>;
      return <span key={k}>{t}</span>;
    });
    return [...tokens, cmt && <span key="c" className="text-[#1e3a5f] italic">{cmt}</span>];
  };

  return (
    <div
      className="bg-[#010610] border border-[#102040] rounded-[12px] overflow-hidden my-[12px]"
    >
      <div className="bg-[#040d1a] border-b border-[#102040] flex justify-between px-[14px] py-[6px]">
        <span className="text-[#3a6080] text-[11px] font-mono">python3</span>
        <button
          type="button"
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(()=>setCopied(false),1500); }}
          className={`bg-transparent border-none cursor-pointer text-[12px] ${copied ? "text-[#00ff88]" : "text-[#3a6080]"}`}
        >
          {copied ? "✅ 복사됨" : "📋 복사"}
        </button>
      </div>
      <pre className="p-[16px] m-0 overflow-x-auto font-mono text-[13px] leading-[1.75] text-[#e8f4fd]">
        {code.split("\n").map((line, i) => {
          const lineNum = i + 1;
          return (
            <div key={`${lineNum}-${line.trimStart().slice(0,12)}`} className="flex">
              <span className="text-[#3a6080] select-none min-w-[30px] text-[11px] pt-[2px]">{lineNum}</span>
              <span>{renderLine(line)}</span>
            </div>
          );
        })}
      </pre>
    </div>
  );
}

/* ══════════════════════════════ UNION-FIND VIZ ══════════════════════════════ */
export const W1112_sections = {

intro: () => (
  <div>
    <W1112_SectionTitle color={W1112_T.text}>🗺️ 5단계 Week 11 + 6단계 Week 12 — 마지막!</W1112_SectionTitle>
    <div className="grid gap-[12px] mb-[24px] grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {[
        { week:"Week 11", title:"기타 알고리즘", items:["유니온 파인드","위상 정렬","세그먼트 트리"], color:W1112_T.w11 },
        { week:"Week 12", title:"실전 대비", items:["기업별 전략","시간 최적화","디버깅 패턴"], color:W1112_T.w12 },
      ].map(({week,title,items,color}) => (
        <div key={week}
          className="bg-[#0a1628] border border-[#102040] rounded-[12px] p-[18px]"
          style={{ borderTop:`3px solid ${color}` }}
        >
          <div className="text-[11px] font-bold font-mono mb-[4px]" style={{ color }}>{week}</div>
          <div className="text-[#e8f4fd] font-bold text-[15px] mb-[12px]">{title}</div>
          {items.map(i => (
            <div key={i} className="text-[#3a6080] text-[13px] py-[4px] border-b border-[#102040]">• {i}</div>
          ))}
        </div>
      ))}
    </div>
    <W1112_Callout color={W1112_T.w12} icon="🏆" title="12주 완주를 축하합니다!">
      여기까지 왔다면 <strong>유니콘·대기업 코딩테스트</strong>를 충분히 도전할 수 있는 실력입니다.<br />
      마지막 두 주는 나머지 핵심 알고리즘을 마무리하고, 실전 감각을 극대화합니다.
    </W1112_Callout>
    <div className="grid gap-[10px] grid-cols-[repeat(auto-fill,minmax(170px,1fr))]">
      {[
        { name:"유니온 파인드", use:"연결 요소, MST", time:"O(α(N))≈O(1)", color:W1112_T.w11 },
        { name:"크루스칼 MST", use:"최소 신장 트리", time:"O(E log E)", color:W1112_T.w11 },
        { name:"위상 정렬", use:"의존관계, 순서", time:"O(V+E)", color:W1112_T.w11 },
        { name:"세그먼트 트리", use:"구간 쿼리/업데이트", time:"O(log N)", color:W1112_T.w11 },
      ].map(item => (
        <div key={item.name}
          className="bg-[#0a1628] border border-[#102040] rounded-[10px] px-[14px] py-[12px]"
          style={{ borderLeft:`3px solid ${item.color}` }}
        >
          <div className="text-[#e8f4fd] font-bold text-[13px]">{item.name}</div>
          <div className="text-[#3a6080] text-[11px] my-[4px]">{item.use}</div>
          <W1112_Badge color={item.color}>{item.time}</W1112_Badge>
        </div>
      ))}
    </div>
  </div>
),

uf: () => (
  <div>
    <W1112_SectionTitle sub="서로소 집합 — 합치기(Union)와 찾기(Find)" color={W1112_T.w11}>🔗 유니온 파인드 (Union-Find)</W1112_SectionTitle>
    <div className="flex gap-[8px] mb-[16px] flex-wrap">
      <W1112_Badge color={W1112_T.w11}>Find O(α(N)) ≈ O(1)</W1112_Badge>
      <W1112_Badge color={W1112_T.w11}>Union O(α(N)) ≈ O(1)</W1112_Badge>
      <W1112_Badge color={W1112_T.green}>경로 압축 + 랭크 최적화</W1112_Badge>
    </div>
    <W1112_UnionFindViz />
    <W1112_CodeBlock code={`# ─── 유니온 파인드 최적화 구현 ───
class W1112_UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))  # 초기: 자기 자신이 루트
        self.rank = [0] * n           # 트리 높이

    def find(self, x):
        # 경로 압축 (Path Compression): 루트까지 직접 연결!
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return False  # 이미 같은 집합

        # 랭크 기반 합치기 (Union by Rank): 작은 트리를 큰 트리 밑에
        if self.rank[rx] < self.rank[ry]:
            self.parent[rx] = ry
        elif self.rank[rx] > self.rank[ry]:
            self.parent[ry] = rx
        else:
            self.parent[ry] = rx
            self.rank[rx] += 1
        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)

# ─── 실전: BOJ 1717 집합의 표현 ───
input = sys.stdin.readline
sys.setrecursionlimit(10**6)

def solve():
    n, m = map(int, input().split())
    uf = W1112_UnionFind(n + 1)

    for _ in range(m):
        op, a, b = map(int, input().split())
        if op == 0:
            uf.union(a, b)
        else:
            print("YES" if uf.connected(a, b) else "NO")`} />
  </div>
),

kruskal: () => (
  <div>
    <W1112_SectionTitle sub="유니온 파인드 응용 — 최소 신장 트리(MST)" color={W1112_T.w11}>🌲 크루스칼 알고리즘 (Kruskal MST)</W1112_SectionTitle>
    <div className="flex gap-[8px] mb-[16px] flex-wrap">
      <W1112_Badge color={W1112_T.w11}>O(E log E)</W1112_Badge>
      <W1112_Badge color={W1112_T.green}>간선 정렬 + 유니온파인드</W1112_Badge>
    </div>
    <W1112_Callout color={W1112_T.w11} icon="🧠" title="MST 핵심 아이디어">
      <strong>모든 노드를 최소 비용의 간선으로 연결</strong>하는 트리<br />
      크루스칼: 간선을 <strong>가중치 오름차순</strong>으로 정렬 후, 사이클을 만들지 않는 간선만 추가
    </W1112_Callout>
    <W1112_CodeBlock code={`# ─── 크루스칼 MST ───
def kruskal(n, edges):
    """
    n: 노드 수 (1 ~ n)
    edges: [(가중치, u, v), ...]
    """
    edges.sort()  # 가중치 기준 정렬

    parent = list(range(n + 1))

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        rx, ry = find(x), find(y)
        if rx == ry: return False
        parent[ry] = rx
        return True

    total_cost = 0
    mst_edges = []

    for w, u, v in edges:
        if union(u, v):           # 사이클이 생기지 않으면
            total_cost += w
            mst_edges.append((u, v, w))
            if len(mst_edges) == n - 1:  # n-1개 간선이면 완성
                break

    return total_cost, mst_edges

# ─── 프로그래머스: 섬 연결하기 ───
def solution(n, costs):
    costs.sort(key=lambda x: x[2])
    parent = list(range(n))

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    answer = 0
    for a, b, c in costs:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[rb] = ra
            answer += c
    return answer`} />
    <div className="grid grid-cols-2 gap-[12px]">
      <W1112_Callout color={W1112_T.w11} icon="🌲" title="크루스칼 vs 프림">
        <strong>크루스칼</strong>: 간선 중심, 희소 그래프 유리, O(E log E)<br />
        <strong>프림</strong>: 노드 중심, 밀집 그래프 유리, O(V²) 또는 O(E log V)
      </W1112_Callout>
      <W1112_Callout color={W1112_T.green} icon="📌" title="MST 활용">
        네트워크 설계 비용 최소화<br />군집 분석 (최대 가중치 간선 제거)<br />프로그래머스 섬 연결하기, BOJ 1197
      </W1112_Callout>
    </div>
  </div>
),

topo: () => (
  <div>
    <W1112_SectionTitle sub="의존 관계가 있는 순서 결정 — BFS(Kahn) 방식" color={W1112_T.w11}>📐 위상 정렬 (Topological Sort)</W1112_SectionTitle>
    <div className="flex gap-[8px] mb-[16px] flex-wrap">
      <W1112_Badge color={W1112_T.w11}>시간 O(V+E)</W1112_Badge>
      <W1112_Badge color={W1112_T.orange}>방향 비순환 그래프(DAG)에서만</W1112_Badge>
    </div>
    <W1112_TopoViz />
    <W1112_CodeBlock code={`from collections import deque

# ─── 위상 정렬 (Kahn's Algorithm — BFS 방식) ───
def topological_sort(n, edges):
    graph = [[] for _ in range(n + 1)]
    in_degree = [0] * (n + 1)

    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1

    # 진입 차수 0인 노드부터 시작
    queue = deque([i for i in range(1, n+1) if in_degree[i] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # 모든 노드를 처리했는지 확인 (사이클 감지)
    if len(result) != n:
        return None  # 사이클 존재!
    return result

# ─── DFS 방식 위상 정렬 ───
def topological_sort_dfs(n, graph):
    visited = [False] * (n + 1)
    stack = []

    def dfs(v):
        visited[v] = True
        for nb in graph[v]:
            if not visited[nb]:
                dfs(nb)
        stack.append(v)  # 후위 순서로 스택에 추가

    for i in range(1, n + 1):
        if not visited[i]:
            dfs(i)

    return stack[::-1]  # 역순이 위상 정렬`} />
    <W1112_CodeBlock code={`# ─── 실전: BOJ 1005 ACM Craft (위상 정렬 + DP) ───
# 건물 짓는 순서에 맞게 최소 완료 시간 계산
from collections import deque
input = sys.stdin.readline

def acm_craft():
    W1112_T = int(input())
    for _ in range(W1112_T):
        n, k = map(int, input().split())
        cost = [0] + list(map(int, input().split()))

        graph = [[] for _ in range(n+1)]
        in_deg = [0] * (n+1)
        for _ in range(k):
            x, y = map(int, input().split())
            graph[x].append(y)
            in_deg[y] += 1

        target = int(input())
        dp = cost[:]  # dp[i] = i번 건물 완료 시간
        queue = deque([i for i in range(1,n+1) if in_deg[i]==0])

        while queue:
            node = queue.popleft()
            for nb in graph[node]:
                dp[nb] = max(dp[nb], dp[node] + cost[nb])
                in_deg[nb] -= 1
                if in_deg[nb] == 0:
                    queue.append(nb)

        print(dp[target])`} />
  </div>
),

segtree: () => (
  <div>
    <W1112_SectionTitle sub="구간 합/최솟값을 O(log N)에 — 배열 업데이트도 O(log N)" color={W1112_T.w11}>📊 세그먼트 트리 (Segment Tree)</W1112_SectionTitle>
    <div className="flex gap-[8px] mb-[16px] flex-wrap">
      <W1112_Badge color={W1112_T.w11}>구간 쿼리 O(log N)</W1112_Badge>
      <W1112_Badge color={W1112_T.w11}>업데이트 O(log N)</W1112_Badge>
      <W1112_Badge color={W1112_T.orange}>누적합보다 동적 업데이트에 강함</W1112_Badge>
    </div>
    <W1112_SegTreeViz />
    <W1112_Callout color={W1112_T.w11} icon="🔑" title="누적합 vs 세그먼트 트리 선택">
      <strong>누적합(prefix sum)</strong>: 쿼리 O(1), 업데이트 O(N) — 수정 없을 때<br />
      <strong>세그먼트 트리</strong>: 쿼리 O(log N), 업데이트 O(log N) — 수정 빈번할 때<br />
      <strong>페넥 트리(W1112_BIT)</strong>: 구현 간단, 세그트리와 유사 성능
    </W1112_Callout>
    <W1112_CodeBlock code={`# ─── 세그먼트 트리 (구간 합) ───
class W1112_SegTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.build(arr, 1, 0, self.n - 1)

    def build(self, arr, node, s, e):
        if s == e:
            self.tree[node] = arr[s]
            return
        m = (s + e) // 2
        self.build(arr, 2*node, s, m)
        self.build(arr, 2*node+1, m+1, e)
        self.tree[node] = self.tree[2*node] + self.tree[2*node+1]

    def query(self, l, r, node=1, s=None, e=None):
        if s is None: s, e = 0, self.n - 1
        if r < s or e < l: return 0          # 범위 밖
        if l <= s and e <= r: return self.tree[node]  # 완전 포함
        m = (s + e) // 2
        return (self.query(l, r, 2*node, s, m) +
                self.query(l, r, 2*node+1, m+1, e))

    def update(self, idx, val, node=1, s=None, e=None):
        if s is None: s, e = 0, self.n - 1
        if s == e:
            self.tree[node] = val
            return
        m = (s + e) // 2
        if idx <= m: self.update(idx, val, 2*node, s, m)
        else: self.update(idx, val, 2*node+1, m+1, e)
        self.tree[node] = self.tree[2*node] + self.tree[2*node+1]

# ─── 사용 예시 ───
arr = [1, 3, 5, 7, 9, 11]
seg = W1112_SegTree(arr)
print(seg.query(1, 3))    # 15 (3+5+7)
seg.update(2, 10)         # arr[2] = 10 (5→10)
print(seg.query(1, 3))    # 20 (3+10+7)`} />
    <W1112_CodeBlock code={`# ─── 페넥 트리 (W1112_BIT) — 더 간단한 구현 ───
class W1112_BIT:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i, delta):
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)  # 최하위 비트 더하기

    def query(self, i):  # 1부터 i까지 합
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)  # 최하위 비트 빼기
        return s

    def range_query(self, l, r):
        return self.query(r) - self.query(l - 1)`} />
  </div>
),

final: () => (
  <div>
    <W1112_SectionTitle sub="실전에서 이기는 전략 — 시간 배분, 접근법, 최적화" color={W1112_T.w12}>🎯 Week 12: 실전 전략</W1112_SectionTitle>
    <div className="grid grid-cols-2 gap-[12px] mb-[16px]">
      {[
        {
          title:"⏱️ 시간 배분 전략",
          color: W1112_T.w12,
          items:[
            "문제 읽기: 5분 (예제 직접 손으로 그리기)",
            "알고리즘 결정: 3분 (키워드 파악)",
            "코딩: 20-30분 (막히면 10분 후 다른 문제)",
            "테스트: 5분 (엣지 케이스 확인)",
          ]
        },
        {
          title:"🔍 알고리즘 결정 키워드",
          color: W1112_T.w11,
          items:[
            "최단거리 → BFS(가중치無) / 다익스트라(가중치有)",
            "모든 경로 / 조합 → DFS / 백트래킹",
            "최적화 문제 → DP / 그리디",
            "연결 여부 → 유니온 파인드",
          ]
        },
      ].map(({title,color,items}) => (
        <div key={title} className="bg-[#0a1628] border border-[#102040] rounded-[10px] p-[16px]">
          <div className="font-bold mb-[10px] text-[14px]" style={{ color }}>{title}</div>
          {items.map((item) => (
            <div key={item} className="text-[#3a6080] text-[12px] py-[4px] border-b border-[#102040] flex gap-[8px]">
              <span style={{ color, flexShrink:0 }}>→</span>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
    <W1112_CodeBlock code={`# ─── 코딩테스트 필수 스니펫 모음 ───
from collections import deque, defaultdict, Counter
from heapq import heappush, heappop
from itertools import permutations, combinations
from bisect import bisect_left, bisect_right

input = sys.stdin.readline  # 빠른 입력 (필수!)
sys.setrecursionlimit(10**6) # 재귀 깊이 증가

INF = float('inf')
MOD = 1_000_000_007

# 2D 4방향 이동
DR = [-1, 1, 0, 0]
DC = [0, 0, -1, 1]

# 2D 8방향 이동
DIR8 = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]

# 빠른 입출력
def ri(): return int(input())
def rli(): return list(map(int, input().split()))
def rii(): return map(int, input().split())

# 2D 배열 입력
def read_grid(r, c):
    return [rli() for _ in range(r)]

def read_char_grid(r):
    return [list(input().strip()) for _ in range(r)]`} />
    <W1112_CodeBlock code={`# ─── 디버깅 & 최적화 팁 ───

# 1. 시간 초과 원인 파악
start = time.time()
# ... 코드 ...
print(f"실행시간: {time.time()-start:.3f}초")

# 2. list 대신 set/dict로 O(1) 탐색
slow = [x for x in big_list if x in another_list]  # O(n²)!
fast_set = set(another_list)
fast = [x for x in big_list if x in fast_set]       # O(n)

# 3. 문자열 연결
bad  = ""
for c in chars: bad += c          # O(n²)!
good = "".join(chars)              # O(n)

# 4. 재귀 → 스택 변환 (재귀 깊이 문제 해결)
def dfs_stack(graph, start):
    stack = [start]
    visited = set()
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            stack.extend(graph[node])

# 5. 파이썬 int는 오버플로우 없음
# Java/C++처럼 int overflow 걱정 안 해도 됨!
big = 10**18 * 10**18  # 아무 문제 없음`} />
  </div>
),

company: () => (
  <div>
    <W1112_SectionTitle sub="기업마다 선호 알고리즘이 다릅니다" color={W1112_T.w12}>🏢 기업별 출제 경향</W1112_SectionTitle>
    <div className="flex flex-col gap-[12px]">
      {[
        {
          name:"🟡 카카오",
          color:"#FEE500",
          features:["구현/시뮬레이션 비중 높음", "문제 지문이 길고 복잡", "BFS/DFS + DP 복합", "문자열 처리 빈출"],
          tip:"예제를 직접 구현하면서 이해. 지문 꼼꼼히 읽기.",
          problems:["카카오 코드 페스티벌", "카카오 블라인드 채용", "인턴십 코딩테스트"],
        },
        {
          name:"🔵 네이버",
          color:"#03C75A",
          features:["그래프 탐색 중심", "자료구조 응용", "DP + 최단경로", "SQL 추가 출제"],
          tip:"DFS/BFS 완벽 숙지, heapq 활용 다익스트라 필수.",
          problems:["네이버 코딩테스트", "라인 코딩테스트"],
        },
        {
          name:"🟠 삼성 SW",
          color:"#1428A0",
          features:["구현/시뮬레이션 전문", "BFS/DFS 필수", "복잡한 조건 구현", "B형: 자료구조 직접 구현"],
          tip:"삼성 기출 패턴 반복 훈련. 코드 양이 많으므로 빠른 타이핑 연습.",
          problems:["SWEA(삼성 SW Expert Academy)", "SW 역량 테스트 A/B형"],
        },
        {
          name:"💚 토스/당근/쿠팡",
          color:"#0064FF",
          features:["알고리즘 + 코딩 능력 혼합", "LeetCode 스타일", "Medium~Hard 수준", "코드 리뷰 중시"],
          tip:"LeetCode Medium 100문제 풀기. 코드 가독성도 신경쓰기.",
          problems:["LeetCode", "HackerRank", "CodeSignal"],
        },
      ].map(co => (
        <div key={co.name}
          className="bg-[#0a1628] border border-[#102040] rounded-[12px] p-[16px]"
          style={{ borderLeft:`4px solid ${co.color}` }}
        >
          <div className="font-bold text-[16px] mb-[10px]" style={{ color:co.color }}>{co.name}</div>
          <div className="grid grid-cols-2 gap-[10px]">
            <div>
              <div className="text-[#3a6080] text-[11px] mb-[6px]">출제 특징</div>
              {co.features.map(f => (
                <div key={f} className="text-[#e8f4fd] text-[12px] py-[2px]">• {f}</div>
              ))}
            </div>
            <div>
              <div className="text-[#3a6080] text-[11px] mb-[6px]">추천 플랫폼</div>
              {co.problems.map(p => (
                <div key={p} className="text-[#3a6080] text-[12px] py-[2px]">📌 {p}</div>
              ))}
              <div
                className="mt-[8px] px-[10px] py-[6px] rounded-[6px] text-[11px]"
                style={{ background: `${co.color}15`, color: co.color }}
              >
                💡 {co.tip}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
),

checklist: () => (
  <div>
    <W1112_SectionTitle sub="합격까지 — 내 실력을 점검하세요" color={W1112_T.w12}>✅ 최종 체크리스트</W1112_SectionTitle>
    <W1112_CompletionDashboard />
    {[
      {
        title:"🔴 필수 (이것만큼은 완벽히!)",
        color:W1112_T.danger,
        items:[
          "DFS/BFS — 코드 보지 않고 5분 내 작성",
          "다익스트라 — heapq 패턴 암기",
          "DP 점화식 — 의미 먼저 정의 후 점화식",
          "유니온 파인드 — 경로 압축 구현",
          "이진 탐색 — while left <= right 조건",
          "스택/큐/힙 — deque, heapq 완숙",
        ],
      },
      {
        title:"🟡 중요 (골드 이상 목표)",
        color:W1112_T.w12,
        items:[
          "플로이드-워셜 — k→i→j 3중 반복",
          "배낭 문제 — 역순 순회 이유 이해",
          "LIS — O(n log n) bisect 풀이",
          "위상 정렬 — 진입차수 + 큐 패턴",
          "세그먼트 트리 — 구간 쿼리 구현",
          "그리디 — 정렬 기준 선택 논리",
        ],
      },
      {
        title:"🟢 심화 (탑티어 목표)",
        color:W1112_T.green,
        items:[
          "TSP 비트마스킹 DP",
          "Lazy Propagation 세그먼트 트리",
          "벨만-포드 음수 사이클 감지",
          "트라이 + 문자열 매칭",
          "크루스칼 + 다익스트라 복합",
          "백트래킹 가지치기 최적화",
        ],
      },
    ].map(section => (
      <div key={section.title} className="mb-[16px] bg-[#0a1628] border border-[#102040] rounded-[12px] p-[16px]">
        <div className="font-bold mb-[10px] text-[14px]" style={{ color:section.color }}>{section.title}</div>
        <div className="grid gap-[6px] grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
          {section.items.map(item => (
            <div key={item}
              className="flex gap-[8px] items-start px-[10px] py-[6px] rounded-[8px]"
              style={{
                background: `${section.color}0a`,
                border: `1px solid ${section.color}22`,
              }}
            >
              <span className="text-[13px]" style={{ color:section.color, flexShrink:0 }}>□</span>
              <span className="text-[#3a6080] text-[12px]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
),

complete: () => (
  <div className="text-center py-[20px]">
    <div className="text-[72px] mb-[24px]">🏆</div>
    <h1
      className="text-[#ffd700] text-[32px] font-black font-mono mb-[8px] [text-shadow:0_0_40px_#ffd70088]"
    >
      12주 커리큘럼 완주!
    </h1>
    <p className="text-[#3a6080] text-[16px] mb-[32px]">
      유니콘 · 대기업 코딩테스트 준비 완료
    </p>
    <div className="grid gap-[12px] max-w-[800px] mx-auto mb-[32px] text-left grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
      {[
        { icon:"📚", week:"Week 1-2", title:"기초 & 정렬/탐색", color:W1112_T.w11 },
        { icon:"🧱", week:"Week 3-4", title:"자료구조 완전정복", color:"#7eff6a" },
        { icon:"🕸️", week:"Week 5-7", title:"그래프 & 트리", color:"#e8645a" },
        { icon:"🧩", week:"Week 8-10", title:"DP & 그리디", color:"#bd93f9" },
        { icon:"⚡", week:"Week 11-12", title:"고급 알고리즘 & 실전", color:W1112_T.w12 },
      ].map(item => (
        <div key={item.week}
          className="bg-[#0a1628] rounded-[12px] px-[16px] py-[14px]"
          style={{ border:`1px solid ${item.color}44`, borderTop:`3px solid ${item.color}` }}
        >
          <div className="text-[24px] mb-[6px]">{item.icon}</div>
          <div className="text-[11px] font-mono" style={{ color:item.color }}>{item.week}</div>
          <div className="text-[#e8f4fd] font-bold text-[13px] mt-[2px]">{item.title}</div>
        </div>
      ))}
    </div>
    <div className="max-w-[600px] mx-auto">
      <W1112_Callout color={W1112_T.w12} icon="🚀" title="다음 단계">
        <strong>1단계</strong>: 프로그래머스 레벨 3 문제 20개 풀기<br />
        <strong>2단계</strong>: 목표 기업 기출 5년치 전부 풀기<br />
        <strong>3단계</strong>: 주 2회 모의 코딩테스트 (시간 제한 엄수)<br />
        <strong>4단계</strong>: 틀린 문제 오답노트 → 패턴 체화
      </W1112_Callout>
      <div className="mt-[24px] p-[20px] bg-[#0a1628] rounded-[12px] flex flex-col gap-[8px] border border-[#ffd70044]">
        <div className="text-[#ffd700] font-bold">📚 마지막 추천 자료</div>
        {[
          { name:"이것이 코딩 테스트다", desc:"나동빈 저 — 이 커리큘럼의 바이블" },
          { name:"파이썬 알고리즘 인터뷰", desc:"박상길 저 — 심화 학습용" },
          { name:"백준 solved.ac", desc:"티어별 문제 추천, 단계별 풀기" },
          { name:"프로그래머스", desc:"기업 기출 및 모의고사" },
          { name:"LeetCode", desc:"토스/당근 등 스타트업 준비" },
        ].map(r => (
          <div key={r.name} className="flex gap-[10px] py-[8px] border-b border-[#102040]">
            <span className="text-[#ffd700] text-[14px]">→</span>
            <div>
              <span className="text-[#e8f4fd] font-semibold text-[13px]">{r.name}</span>
              <span className="text-[#3a6080] text-[12px] ml-[8px]">{r.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
),

problems: () => (
  <div>
    <W1112_SectionTitle color={W1112_T.text}>📝 Week 11 연습 문제</W1112_SectionTitle>
    <div className="mb-[24px]">
      <div className="text-[#00e5ff] font-bold mb-[12px] text-[15px]">유니온 파인드 / MST</div>
      {[
        { id:"1717", title:"집합의 표현", level:"🟡", tip:"유니온 파인드 기본" },
        { id:"1976", title:"여행 가자", level:"🟡", tip:"유니온 파인드 연결 여부" },
        { id:"1197", title:"최소 스패닝 트리", level:"🟠", tip:"크루스칼 기본" },
      ].map(p => (
        <div key={p.id} className="flex justify-between items-center px-[16px] py-[10px] bg-[#0a1628] border border-[#102040] rounded-[10px] mb-[6px] border-l-[3px] border-l-[#00e5ff]">
          <div>
            <span className="text-[#3a6080] text-[12px] font-mono">BOJ {p.id}</span>
            <span className="text-[#e8f4fd] font-bold ml-[10px]">{p.title}</span>
            <span className="text-[#3a6080] text-[12px] ml-[10px]">{p.tip}</span>
          </div>
          <span>{p.level}</span>
        </div>
      ))}
      {[{title:"섬 연결하기",tip:"크루스칼 MST"}].map(p => (
        <div key={p.title} className="flex justify-between items-center px-[16px] py-[10px] bg-[#0a1628] border border-[#102040] rounded-[10px] mb-[6px] border-l-[3px] border-l-[#00e5ff88]">
          <div>
            <span className="text-[#3a6080] text-[12px]">프로그래머스</span>
            <span className="text-[#e8f4fd] font-bold ml-[10px]">{p.title}</span>
            <span className="text-[#3a6080] text-[12px] ml-[10px]">{p.tip}</span>
          </div>
          <W1112_Badge color={W1112_T.w11}>Lv.3</W1112_Badge>
        </div>
      ))}
    </div>
    <div className="mb-[24px]">
      <div className="text-[#ff8c00] font-bold mb-[12px] text-[15px]">위상 정렬</div>
      {[
        { id:"2252", title:"줄 세우기", level:"🟡", tip:"위상 정렬 기본" },
        { id:"1005", title:"ACM Craft", level:"🔴", tip:"위상 정렬 + DP" },
      ].map(p => (
        <div key={p.id} className="flex justify-between items-center px-[16px] py-[10px] bg-[#0a1628] border border-[#102040] rounded-[10px] mb-[6px] border-l-[3px] border-l-[#ff8c00]">
          <div>
            <span className="text-[#3a6080] text-[12px] font-mono">BOJ {p.id}</span>
            <span className="text-[#e8f4fd] font-bold ml-[10px]">{p.title}</span>
            <span className="text-[#3a6080] text-[12px] ml-[10px]">{p.tip}</span>
          </div>
          <span>{p.level}</span>
        </div>
      ))}
      {[{title:"순위",tip:"플로이드-워셜 or 위상 정렬"}].map(p => (
        <div key={p.title} className="flex justify-between items-center px-[16px] py-[10px] bg-[#0a1628] border border-[#102040] rounded-[10px] mb-[6px] border-l-[3px] border-l-[#ff8c0088]">
          <div>
            <span className="text-[#3a6080] text-[12px]">프로그래머스</span>
            <span className="text-[#e8f4fd] font-bold ml-[10px]">{p.title}</span>
            <span className="text-[#3a6080] text-[12px] ml-[10px]">{p.tip}</span>
          </div>
          <W1112_Badge color={W1112_T.orange}>Lv.3</W1112_Badge>
        </div>
      ))}
    </div>
    <W1112_Callout color={W1112_T.w12} icon="🏁" title="마지막 한 마디">
      알고리즘은 <strong>양보다 질</strong>입니다.<br />
      한 문제를 풀 때 <strong>"왜 이 알고리즘인가?"</strong>를 설명할 수 있어야 합니다.<br />
      모르는 문제는 30분 고민 후 풀이 보고, <strong>반드시 직접 다시 구현</strong>하세요.<br />
      <strong>꾸준함이 곧 실력입니다. 화이팅! 🔥</strong>
    </W1112_Callout>
  </div>
),

};

/* ══════════════════════════════ APP ══════════════════════════════ */


