// @ts-nocheck
import { useState } from 'react';
import { W810_T } from './theme';
import { W810_DP1463Viz, W810_LISViz, W810_KnapsackViz, W810_LCSViz, W810_GreedyActivityViz, W810_NQueensViz, W810_BitMaskViz } from './visualizers';

export const W810_chapters = [
  { id:"intro",    week:"",   label:"목차",           icon:"🗺️", color:W810_T.text },
  { id:"dp_intro", week:"W8", label:"DP 개념",        icon:"🧠", color:W810_T.w8 },
  { id:"dp_1d",    week:"W8", label:"1차원 DP",       icon:"📊", color:W810_T.w8 },
  { id:"dp_2d",    week:"W8", label:"2차원 DP",       icon:"🔲", color:W810_T.w8 },
  { id:"knapsack", week:"W9", label:"배낭 문제",      icon:"🎒", color:W810_T.w9 },
  { id:"lis_lcs",  week:"W9", label:"LIS / LCS",     icon:"📈", color:W810_T.w9 },
  { id:"bitmask",  week:"W9", label:"비트마스킹 DP", icon:"🔢", color:W810_T.w9 },
  { id:"greedy",   week:"W10",label:"그리디",         icon:"💰", color:W810_T.w10 },
  { id:"divide",   week:"W10",label:"분할정복",       icon:"✂️", color:W810_T.w10 },
  { id:"backtrack",week:"W10",label:"백트래킹",       icon:"🔙", color:W810_T.w10 },
  { id:"problems", week:"",   label:"연습 문제",      icon:"📝", color:W810_T.text },
];

/* ══════════════════ SHARED UI ══════════════════ */
function W810_Badge({ children, color = W810_T.w8 }) {
  return (
    <span
      className="inline-block px-[10px] py-[2px] rounded-[20px] text-[12px] font-semibold border"
      style={{ background: `${color}22`, borderColor: `${color}55`, color }}
    >
      {children}
    </span>
  );
}

function W810_Callout({ color = W810_T.w8, icon = "💡", title, children }) {
  return (
    <div
      className="rounded-[10px] p-[14px_18px] my-[14px] border-l-[4px] border"
      style={{ background: `${color}10`, borderColor: `${color}40`, borderLeftColor: color }}
    >
      {title && (
        <div className="font-bold mb-[8px] text-[14px]" style={{ color }}>
          {icon} {title}
        </div>
      )}
      <div className="text-[#f8f8f2] leading-[1.9] text-[13.5px]">{children}</div>
    </div>
  );
}

function W810_SectionTitle({ children, sub, color = W810_T.w8 }) {
  return (
    <div className="mb-[24px]">
      <h2 className="m-0 text-[22px] font-extrabold font-mono" style={{ color }}>
        {children}
      </h2>
      {sub && <p className="text-[#6272a4] mt-[6px] mb-0 text-[14px]">{sub}</p>}
    </div>
  );
}

function W810_CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const kw = new Set(["def","for","while","if","elif","else","return","in","range","len","and","or",
    "not","True","False","None","import","from","class","break","continue","pass","lambda","with","as"]);
  const bi = new Set(["print","input","int","str","list","dict","set","min","max","sorted","enumerate",
    "zip","map","filter","sum","any","all","append","collections","defaultdict","heapq","heappush","heappop"]);

  const tokenize = (text) => text.split(/(\b\w+\b|[^\w\s]|\s+)/g).filter(Boolean).map((t,i) => {
    if (kw.has(t)) return <span key={i} className="text-[#c084fc] font-bold">{t}</span>;
    if (bi.has(t)) return <span key={i} className="text-[#8be9fd]">{t}</span>;
    if (/^\d+$/.test(t)) return <span key={i} className="text-[#f1fa8c]">{t}</span>;
    if (/^["']/.test(t)) return <span key={i} className="text-[#86efac]">{t}</span>;
    return <span key={i}>{t}</span>;
  });

  const renderLine = (line) => {
    const ci = line.indexOf("#");
    if (ci !== -1) return [tokenize(line.slice(0,ci)), <span key="c" className="text-[#4a5568] italic">{line.slice(ci)}</span>];
    return tokenize(line);
  };

  return (
    <div className="bg-[#0a0614] border border-[#2d2048] rounded-[12px] overflow-hidden my-[12px]">
      <div className="bg-[#110820] border-b border-[#2d2048] flex justify-between px-[14px] py-[6px]">
        <span className="text-[#6272a4] text-[11px] font-mono">python3</span>
        <button
          type="button"
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(()=>setCopied(false),1500); }}
          className={`bg-transparent border-0 cursor-pointer text-[12px] ${copied ? "text-[#50fa7b]" : "text-[#6272a4]"}`}
        >
          {copied ? "✅ 복사됨" : "📋 복사"}
        </button>
      </div>
      <pre className="p-[16px] m-0 overflow-x-auto font-mono text-[13px] leading-[1.75] text-[#f8f8f2]">
        {code.split("\n").map((line,i) => (
          <div key={i} className="flex">
            <span className="text-[#6272a4] select-none min-w-[28px] text-[11px] pt-[2px]">{i+1}</span>
            <span>{renderLine(line)}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

/* ══════════════════ SECTIONS ══════════════════ */
export const W810_sections = {
  intro: () => (
    <div>
      <W810_SectionTitle color={W810_T.w8}>🗺️ 3단계: DP · 그리디 · 고급탐색 (Week 8–10)</W810_SectionTitle>
      <div className="grid gap-[14px] mb-[24px] grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {[
          { week:"Week 8", title:"DP 기초", items:["메모이제이션","타뷸레이션","1차원 DP","2차원 DP"], color:W810_T.w8 },
          { week:"Week 9", title:"DP 심화", items:["배낭 문제","LIS · LCS","비트마스킹 DP","구간 DP"], color:W810_T.w9 },
          { week:"Week 10", title:"완전탐색", items:["그리디","분할정복","백트래킹","경우의 수"], color:W810_T.w10 },
        ].map(({ week, title, items, color }) => (
          <div
            key={week}
            className="bg-[#1e1530] border border-[#2d2048] rounded-[12px] p-[20px]"
            style={{ borderTop:`3px solid ${color}` }}
          >
            <div className="text-[11px] font-bold mb-[4px] font-mono" style={{ color }}>{week}</div>
            <div className="text-[#f8f8f2] text-[16px] font-bold mb-[12px]">{title}</div>
            {items.map(item => (
              <div key={item} className="text-[#6272a4] text-[13px] py-[4px] border-b border-[#2d2048]">• {item}</div>
            ))}
          </div>
        ))}
      </div>
      <W810_Callout color={W810_T.w8} icon="🧠" title="DP를 언제 쓰나?">
        <ul className="m-0 pl-[20px] leading-[2]">
          <li><strong>최적 부분 구조</strong>: 전체 최적해가 부분 최적해로 구성</li>
          <li><strong>중복 부분 문제</strong>: 같은 하위 문제가 반복 등장</li>
          <li>키워드: <span className="text-[#bd93f9]">최소·최대·경우의 수·가능 여부</span></li>
        </ul>
      </W810_Callout>
    </div>
  ),

  dp_intro: () => (
    <div>
      <W810_SectionTitle color={W810_T.w8}>🧠 다이나믹 프로그래밍 개념</W810_SectionTitle>
      <p className="text-[#6272a4] mb-[16px]">큰 문제를 작은 부분 문제로 나눠 풀고, 결과를 저장해 재사용하는 기법</p>
      <W810_Badge color={W810_T.w8}>시간 O(n) ~ O(n²)</W810_Badge>
      <div className="grid grid-cols-2 gap-[16px] my-[16px]">
        <div className="bg-[#1e1530] border border-[#2d2048] rounded-[10px] p-[16px]">
          <div className="text-[#bd93f9] font-bold mb-[8px]">📝 메모이제이션 (Top-Down)</div>
          <div className="text-[#f8f8f2] text-[13px] leading-[1.8]">재귀 + 캐싱 — 필요한 값만 계산<br/>직관적, 스택 오버플로 주의</div>
        </div>
        <div className="bg-[#1e1530] border border-[#2d2048] rounded-[10px] p-[16px]">
          <div className="text-[#8be9fd] font-bold mb-[8px]">📋 타뷸레이션 (Bottom-Up)</div>
          <div className="text-[#f8f8f2] text-[13px] leading-[1.8]">반복문 + dp 배열 — 모든 값 미리 계산<br/>빠르고 안정적 → 코테 권장</div>
        </div>
      </div>
      <W810_CodeBlock code={`# 피보나치 - 메모이제이션 vs 타뷸레이션
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo(n):
    if n <= 1: return n
    return fib_memo(n-1) + fib_memo(n-2)

def fib_dp(n):
    if n <= 1: return n
    dp = [0] * (n+1)
    dp[1] = 1
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]  # 점화식
    return dp[n]

print(fib_dp(10))  # 55`} />
      <W810_Callout color={W810_T.w8} icon="💡" title="DP 풀이 4단계">
        <ol className="m-0 pl-[20px] leading-[2]">
          <li><strong>dp 정의</strong>: dp[i] = "i번째 상태에서의 최적값"</li>
          <li><strong>점화식</strong>: dp[i]를 이전 dp 값들로 표현</li>
          <li><strong>초기값</strong>: dp[0], dp[1] 등 base case 설정</li>
          <li><strong>순서</strong>: 작은 문제부터 순서대로 계산</li>
        </ol>
      </W810_Callout>
      <W810_SectionTitle sub="백준 1463: 1로 만들기" color={W810_T.w8}>🔢 실전 예제</W810_SectionTitle>
      <W810_DP1463Viz />
      <W810_CodeBlock code={`# 백준 1463: N을 1로 만들기 (최소 연산)
def solve(n):
    dp = [0] * (n+1)
    for i in range(2, n+1):
        dp[i] = dp[i-1] + 1           # -1
        if i % 3 == 0: dp[i] = min(dp[i], dp[i//3] + 1)
        if i % 2 == 0: dp[i] = min(dp[i], dp[i//2] + 1)
    return dp[n]

print(solve(10))  # 3 (10→9→3→1)`} />
    </div>
  ),

  dp_1d: () => (
    <div>
      <W810_SectionTitle color={W810_T.w8}>📊 1차원 DP 패턴</W810_SectionTitle>
      <W810_Callout color={W810_T.cyan} icon="🔑" title="핵심 패턴">dp[i] = dp[i-1] (또는 이전 여러 상태)의 최적 조합</W810_Callout>
      <W810_CodeBlock code={`# 계단 오르기 (백준 2579)
def stairs(scores):
    n = len(scores)
    if n == 1: return scores[0]
    dp = [0] * n
    dp[0] = scores[0]
    dp[1] = scores[0] + scores[1]
    for i in range(2, n):
        dp[i] = max(dp[i-1] - scores[i-1] + scores[i],
                    dp[i-2] + scores[i])
    return dp[n-1]

# 동전 교환 (최소 동전 수)
def coin_change(coins, amount):
    dp = [float('inf')] * (amount+1)
    dp[0] = 0
    for i in range(1, amount+1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i-coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

# 최대 부분합 (카데인)
def max_subarray(nums):
    dp = cur = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        dp = max(dp, cur)
    return dp`} />
    </div>
  ),

  dp_2d: () => (
    <div>
      <W810_SectionTitle color={W810_T.w8}>🔲 2차원 DP 패턴</W810_SectionTitle>
      <W810_CodeBlock code={`# 격자 경로 최대 점수
def max_grid_path(grid):
    m, n = len(grid), len(grid[0])
    dp = [[0]*n for _ in range(m)]
    dp[0][0] = grid[0][0]
    for i in range(1,m): dp[i][0] = dp[i-1][0] + grid[i][0]
    for j in range(1,n): dp[0][j] = dp[0][j-1] + grid[0][j]
    for i in range(1,m):
        for j in range(1,n):
            dp[i][j] = max(dp[i-1][j], dp[i][j-1]) + grid[i][j]
    return dp[m-1][n-1]

# 편집 거리 (Edit Distance)
def edit_distance(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0] = i
    for j in range(n+1): dp[0][j] = j
    for i in range(1,m+1):
        for j in range(1,n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]

print(edit_distance("horse", "ros"))  # 3`} />
      <W810_Callout color={W810_T.w9} icon="⚠️" title="주의사항">
        초기값(0행·0열) 먼저 세팅! dp[i][j]의 의미를 명확히 정의하기
      </W810_Callout>
    </div>
  ),

  knapsack: () => (
    <div>
      <W810_SectionTitle color={W810_T.w9}>🎒 배낭 문제 (Knapsack)</W810_SectionTitle>
      <p className="text-[#6272a4] mb-[16px]">무게 제한 W 안에서 최대 가치를 구하는 고전 DP</p>
      <W810_Badge color={W810_T.w9}>시간 O(nW)</W810_Badge>
      <W810_KnapsackViz />
      <W810_CodeBlock code={`# 0/1 배낭 문제 - 1D 최적화 (실전 권장)
def knapsack(weights, values, W):
    dp = [0] * (W+1)
    for i in range(len(weights)):
        for w in range(W, weights[i]-1, -1):  # 역방향! (중복 방지)
            dp[w] = max(dp[w], dp[w-weights[i]] + values[i])
    return dp[W]

weights = [2, 3, 4, 5]
values  = [3, 4, 5, 6]
print(knapsack(weights, values, 8))  # 10`} />
      <W810_Callout color={W810_T.w9} icon="🔑" title="배낭 변형 패턴">
        <ul className="m-0 pl-[20px] leading-[2]">
          <li><strong>0/1 배낭</strong>: 역방향 순회 (W → 0)</li>
          <li><strong>무한 배낭</strong>: 정방향 순회 (0 → W)</li>
        </ul>
      </W810_Callout>
    </div>
  ),

  lis_lcs: () => (
    <div>
      <W810_SectionTitle color={W810_T.w9}>📈 LIS / LCS</W810_SectionTitle>
      <div className="text-[#ff79c6] font-bold text-[15px] mb-[8px]">LIS — 최장 증가 부분 수열</div>
      <W810_Badge color={W810_T.w9}>O(n²) 기본 / O(n log n) 이진탐색</W810_Badge>
      <W810_LISViz />
      <W810_CodeBlock code={`# LIS O(n log n) - 실전 권장
from bisect import bisect_left

def lis(nums):
    tails = []
    for num in nums:
        pos = bisect_left(tails, num)
        if pos == len(tails): tails.append(num)
        else: tails[pos] = num
    return len(tails)

nums = [10, 9, 2, 5, 3, 7, 101, 18]
print(lis(nums))  # 4`} />
      <div className="text-[#ff79c6] font-bold text-[15px] mt-[20px] mb-[8px]">LCS — 최장 공통 부분 수열</div>
      <W810_Badge color={W810_T.pink}>시간 O(mn)</W810_Badge>
      <W810_LCSViz />
      <W810_CodeBlock code={`def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1,m+1):
        for j in range(1,n+1):
            if s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1]+1
            else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

print(lcs("ABCBDAB", "BDCAB"))  # 4`} />
    </div>
  ),

  bitmask: () => (
    <div>
      <W810_SectionTitle color={W810_T.w9}>🔢 비트마스킹 DP</W810_SectionTitle>
      <p className="text-[#6272a4] mb-[16px]">집합의 부분집합을 정수(비트)로 표현해 DP 상태로 사용</p>
      <W810_Badge color={W810_T.w9}>시간 O(2ⁿ · n)</W810_Badge>
      <W810_BitMaskViz />
      <W810_CodeBlock code={`# 비트 연산 기초
n = 4
for mask in range(1 << n):
    subset = [i for i in range(n) if mask & (1 << i)]
    print(f"{mask:04b} → {subset}")

# 외판원 문제 (TSP) 비트마스킹 DP
def tsp(dist):
    n = len(dist)
    INF = float('inf')
    dp = [[INF]*n for _ in range(1<<n)]
    dp[1][0] = 0  # 0번 도시 출발

    for mask in range(1<<n):
        for u in range(n):
            if not (mask & (1<<u)) or dp[mask][u]==INF: continue
            for v in range(n):
                if mask & (1<<v): continue
                nxt = mask | (1<<v)
                dp[nxt][v] = min(dp[nxt][v], dp[mask][u] + dist[u][v])

    full = (1<<n)-1
    return min(dp[full][i]+dist[i][0] for i in range(1,n))`} />
      <W810_Callout color={W810_T.w9} icon="💡" title="적용 조건">
        원소 수 n ≤ 20 (보통 n ≤ 15) · 부분집합 방문 여부가 상태인 문제
      </W810_Callout>
    </div>
  ),

  greedy: () => (
    <div>
      <W810_SectionTitle color={W810_T.w10}>💰 그리디 알고리즘</W810_SectionTitle>
      <p className="text-[#6272a4] mb-[16px]">매 순간 가장 좋아 보이는 선택으로 전체 최적을 구하는 기법</p>
      <W810_Badge color={W810_T.w10}>시간 O(n log n) (정렬 포함)</W810_Badge>
      <W810_GreedyActivityViz />
      <W810_CodeBlock code={`# 활동 선택 문제 - 끝나는 시간 기준 정렬
def activity_selection(meetings):
    meetings.sort(key=lambda x: x[1])  # 끝나는 시간 기준!
    count, last_end = 0, -1
    for start, end in meetings:
        if start >= last_end:
            count += 1
            last_end = end
    return count

# 거스름돈
def change(amount, coins):
    coins.sort(reverse=True)
    result = []
    for coin in coins:
        while amount >= coin:
            amount -= coin; result.append(coin)
    return result`} />
      <W810_Callout color={W810_T.w10} icon="⚠️" title="그리디 적용 조건">
        <strong>탐욕 선택 속성</strong>: 지역 최적 → 전역 최적<br/>
        → 항상 성립하지 않음! 반례 검증 필수
      </W810_Callout>
    </div>
  ),

  divide: () => (
    <div>
      <W810_SectionTitle color={W810_T.w10}>✂️ 분할정복 (Divide &amp; Conquer)</W810_SectionTitle>
      <W810_Callout color={W810_T.w10} icon="🔑" title="3단계">
        <strong>Divide</strong>: 문제 분할 → <strong>Conquer</strong>: 재귀 해결 → <strong>Combine</strong>: 결과 합산
      </W810_Callout>
      <W810_CodeBlock code={`# 빠른 거듭제곱 O(log n)
def fast_pow(base, exp, mod):
    if exp == 0: return 1
    if exp % 2 == 0:
        half = fast_pow(base, exp//2, mod)
        return (half * half) % mod
    return (base * fast_pow(base, exp-1, mod)) % mod

print(fast_pow(2, 10, 1000))  # 24

# 병합 정렬 - 분할정복의 대표 예시
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: result.append(left[i]); i+=1
        else: result.append(right[j]); j+=1
    return result + left[i:] + right[j:]`} />
    </div>
  ),

  backtrack: () => (
    <div>
      <W810_SectionTitle color={W810_T.w10}>🔙 백트래킹 (Backtracking)</W810_SectionTitle>
      <p className="text-[#6272a4] mb-[16px]">불가능한 경우를 일찍 포기(가지치기)해 완전탐색을 최적화</p>
      <W810_NQueensViz />
      <W810_CodeBlock code={`# N-Queens
def n_queens(n):
    result = []
    cols, diag1, diag2 = set(), set(), set()

    def bt(row, path):
        if row == n:
            result.append(path[:])
            return
        for col in range(n):
            if col in cols or (row-col) in diag1 or (row+col) in diag2:
                continue  # 가지치기!
            cols.add(col); diag1.add(row-col); diag2.add(row+col)
            path.append(col)
            bt(row+1, path)
            path.pop()
            cols.discard(col); diag1.discard(row-col); diag2.discard(row+col)

    bt(0, [])
    return len(result)

print(n_queens(8))  # 92`} />
      <W810_CodeBlock code={`# 조합/순열 백트래킹 템플릿

def combinations(arr, r):          # 조합
    result = []
    def bt(start, curr):
        if len(curr) == r:
            result.append(curr[:]); return
        for i in range(start, len(arr)):
            curr.append(arr[i])
            bt(i+1, curr)
            curr.pop()
    bt(0, []); return result

def permutations(arr):             # 순열
    result = []
    def bt(curr, used):
        if len(curr) == len(arr):
            result.append(curr[:]); return
        for i in range(len(arr)):
            if not used[i]:
                used[i] = True; curr.append(arr[i])
                bt(curr, used)
                curr.pop(); used[i] = False
    bt([], [False]*len(arr)); return result`} />
    </div>
  ),

  problems: () => (
    <div>
      <W810_SectionTitle color={W810_T.w8}>📝 추천 연습 문제</W810_SectionTitle>
      {[
        { week:"W8 DP 기초", color:W810_T.w8, problems:[
          { title:"백준 1463 - 1로 만들기", level:"🟢 쉬움", desc:"1D DP 기본" },
          { title:"백준 2579 - 계단 오르기", level:"🟡 보통", desc:"1D DP 조건부" },
          { title:"백준 1149 - RGB 거리", level:"🟡 보통", desc:"2D DP" },
        ]},
        { week:"W9 DP 심화", color:W810_T.w9, problems:[
          { title:"백준 12865 - 평범한 배낭", level:"🟡 보통", desc:"0/1 배낭" },
          { title:"백준 11053 - LIS", level:"🟡 보통", desc:"LIS O(n²)" },
          { title:"백준 9251 - LCS", level:"🟡 보통", desc:"LCS 기본" },
          { title:"백준 2098 - 외판원 순회", level:"🔴 어려움", desc:"비트마스킹 DP" },
        ]},
        { week:"W10 그리디·백트래킹", color:W810_T.w10, problems:[
          { title:"백준 1931 - 회의실 배정", level:"🟢 쉬움", desc:"그리디 기본" },
          { title:"백준 11047 - 동전 0", level:"🟢 쉬움", desc:"그리디" },
          { title:"백준 9663 - N-Queen", level:"🟠 어려움", desc:"백트래킹" },
        ]},
      ].map(({ week, color, problems }) => (
        <div key={week} className="mb-[20px]">
          <div
            className="text-[13px] font-bold font-mono px-[12px] py-[6px] rounded-[6px] inline-block mb-[10px]"
            style={{ color, background: `${color}15` }}
          >
            {week}
          </div>
          <div className="bg-[#1e1530] rounded-[10px] overflow-hidden border border-[#2d2048]">
            {problems.map((p) => (
              <div key={p.title} className="flex justify-between items-center px-[16px] py-[10px] border-b border-[#2d2048]">
                <div>
                  <span className="text-[#f8f8f2] font-semibold">{p.title}</span>
                  <span className="text-[#6272a4] text-[12px] ml-[10px]">{p.desc}</span>
                </div>
                <span className="text-[12px]">{p.level}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
