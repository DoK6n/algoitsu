// @ts-nocheck
import { W2_COLORS } from "./theme";
import {
  W2_SortVisualizer,
  W2_BinarySearchViz,
  W2_ParametricViz,
} from "./visualizers";
import { ComplexityBadge as W2_ComplexityBadge } from "../../components/Badge";
import { CodeBlock as W2_CodeBlock } from "../../components/CodeBlock";

export const W2_chapters = [
  { id: "intro", label: "목차", icon: "📋" },
  { id: "bubble", label: "버블 정렬", icon: "🫧" },
  { id: "selection", label: "선택 정렬", icon: "🎯" },
  { id: "insertion", label: "삽입 정렬", icon: "🃏" },
  { id: "merge", label: "병합 정렬", icon: "🔀" },
  { id: "quick", label: "퀵 정렬", icon: "⚡" },
  { id: "heap", label: "힙 정렬", icon: "🏔️" },
  { id: "binary", label: "이진 탐색", icon: "🔍" },
  { id: "parametric", label: "파라메트릭 서치", icon: "🎚️" },
  { id: "summary", label: "정리 & 문제", icon: "📝" },
];

export const W2_sectionData = {
  intro: () => (
    <div>
      <h2 className="text-[#00d4ff] border-b-2 border-[#1e2d45] pb-3">
        📋 Week 2: 정렬 & 탐색
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 mt-5">
        {[
          {
            name: "버블 정렬",
            complexity: "O(n²)",
            cls: "border-l-[#ef4444] text-[#ef4444]",
          },
          {
            name: "선택 정렬",
            complexity: "O(n²)",
            cls: "border-l-[#ef4444] text-[#ef4444]",
          },
          {
            name: "삽입 정렬",
            complexity: "O(n²)",
            cls: "border-l-[#f59e0b] text-[#f59e0b]",
          },
          {
            name: "병합 정렬",
            complexity: "O(n log n)",
            cls: "border-l-[#10b981] text-[#10b981]",
          },
          {
            name: "퀵 정렬",
            complexity: "O(n log n)*",
            cls: "border-l-[#10b981] text-[#10b981]",
          },
          {
            name: "힙 정렬",
            complexity: "O(n log n)",
            cls: "border-l-[#10b981] text-[#10b981]",
          },
          {
            name: "이진 탐색",
            complexity: "O(log n)",
            cls: "border-l-[#00d4ff] text-[#00d4ff]",
          },
          {
            name: "파라메트릭",
            complexity: "O(log n × f(n))",
            cls: "border-l-[#7c3aed] text-[#7c3aed]",
          },
        ].map(item => (
          <div
            key={item.name}
            className={`bg-[#111827] border border-[#1e2d45] rounded-[10px] px-4 py-[14px] border-l-[3px] ${item.cls.split(" ")[0]}`}
          >
            <div className="text-[#e2e8f0] font-bold">{item.name}</div>
            <div className={`text-[13px] mt-1 ${item.cls.split(" ")[1]}`}>
              {item.complexity}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-[#111827] rounded-[10px] border-l-[3px] border-l-[#10b981]">
        <div className="text-[#10b981] font-bold mb-2">💡 핵심 포인트</div>
        <ul className="text-[#e2e8f0] leading-[2] m-0 pl-5">
          <li>
            파이썬 내장 <code className="text-[#00d4ff]">sort()</code>는 Timsort
            (O(n log n)) - 실무에선 이걸 씁니다
          </li>
          <li>
            정렬 알고리즘 직접 구현은 <strong>개념 이해</strong>가 목적
          </li>
          <li>
            이진 탐색은 <strong>정렬된 배열</strong>에서만 작동
          </li>
          <li>파라메트릭 서치 = "답을 가정하고 이진 탐색"</li>
        </ul>
      </div>
    </div>
  ),

  bubble: () => (
    <div>
      <h2 className="text-[#00d4ff]">🫧 버블 정렬 (Bubble Sort)</h2>
      <div className="text-[#64748b] mb-4">
        인접한 두 원소를 비교해 큰 값을 오른쪽으로 "버블처럼" 올립니다.
      </div>
      <W2_ComplexityBadge time="O(n²)" space="O(1)" />
      <W2_SortVisualizer algorithm="bubble" />
      <W2_CodeBlock
        code={`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:           # 인접 원소 비교
                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # 교환
    return arr

# 테스트
arr = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(arr))  # [11, 12, 22, 25, 34, 64, 90]`}
      />
      <div className="bg-[#0d1f2d] rounded-[10px] p-4 border-l-[3px] border-l-[#00d4ff] mb-3">
        <div className="text-[#00d4ff] font-bold mb-3">🔍 핵심 로직 해설</div>
        <div className="space-y-4 text-[14px] leading-[1.8]">
          <div>
            <span className="text-[#f59e0b] font-bold">
              두 번째 반복문이 왜 `n - i - 1`까지만 도는가?
            </span>
            <div className="text-[#e2e8f0] mt-1">
              버블 정렬은 한 번 훑을 때마다{" "}
              <strong>가장 큰 수가 맨 오른쪽으로 밀려납니다.</strong> 한 번
              밀려난 수는 이미 제 자리이므로 다음 번엔 그 자리까지 볼 필요가
              없습니다.
            </div>
            <div className="mt-2 text-[13px] bg-[#111827] rounded p-3 space-y-1">
              <div className="text-[#64748b]">
                배열: [5, 3, 1, 4, 2] (n = 5)
              </div>
              <div className="text-[#e2e8f0]">
                1회차(i=0): 끝까지 훑음 →{" "}
                <span className="text-[#10b981]">5가 맨 끝 확정</span> → 다음엔
                4칸만
              </div>
              <div className="text-[#e2e8f0]">
                2회차(i=1): 4칸 훑음 →{" "}
                <span className="text-[#10b981]">4가 확정</span> → 다음엔 3칸만
              </div>
              <div className="text-[#e2e8f0]">
                3회차(i=2): 3칸 훑음 →{" "}
                <span className="text-[#10b981]">3이 확정</span> → ...
              </div>
              <div className="text-[#64748b] mt-1">
                i번 끝나면 오른쪽 i개는 확정 → 남은 칸 수 = n - i - 1
              </div>
            </div>
            <div className="mt-3 bg-[#111827] rounded p-3 text-[13px] space-y-3">
              <div className="text-[#00d4ff] font-bold">
                n - i - 1, 각 항목이 의미하는 것
              </div>
              <div>
                <span className="text-[#10b981] font-bold">n</span>
                <span className="text-[#e2e8f0]">
                  {" "}
                  — 전체 원소 개수. 비교 범위의 기준점입니다.
                </span>
              </div>
              <div>
                <span className="text-[#f59e0b] font-bold">- i</span>
                <span className="text-[#e2e8f0]">
                  {" "}
                  — 이미 정렬이 확정된 원소 수. 바깥 루프를 i번 돌면 오른쪽에
                  i개가 확정되므로 그만큼 범위를 줄입니다.
                </span>
              </div>
              <div>
                <span className="text-[#ef4444] font-bold">- 1</span>
                <span className="text-[#e2e8f0]">
                  {" "}
                  — 인덱스 초과 방지. 안쪽 루프는{" "}
                  <code className="text-[#00d4ff]">arr[j]</code>와{" "}
                  <code className="text-[#00d4ff]">arr[j + 1]</code>을
                  비교하는데, j가 끝까지 가면 j+1이 배열 밖을 가리킵니다. 그래서
                  마지막 비교 가능한 j는 항상 n-1이 아니라 n-2입니다.
                </span>
              </div>
              <div className="border-t border-[#1e2d45] pt-2 font-mono">
                <div className="text-[#64748b]">
                  n=5, i=0일 때: range(
                  <span className="text-[#10b981]">5</span>
                  <span className="text-[#f59e0b]"> - 0</span>
                  <span className="text-[#ef4444]"> - 1</span>) = range(4)
                </div>
                <div className="text-[#e2e8f0]">
                  j = 0,1,2,3 → 비교 쌍: (0,1) (1,2) (2,3) (3,4) ✓
                </div>
                <div className="text-[#64748b] mt-1">
                  n=5, i=1일 때: range(
                  <span className="text-[#10b981]">5</span>
                  <span className="text-[#f59e0b]"> - 1</span>
                  <span className="text-[#ef4444]"> - 1</span>) = range(3)
                </div>
                <div className="text-[#e2e8f0]">
                  j = 0,1,2 → 비교 쌍: (0,1) (1,2) (2,3) ✓{" "}
                  <span className="text-[#10b981]">
                    (4번 인덱스는 이미 확정)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span className="text-[#f59e0b] font-bold">
              한 번도 교환이 없었다면? → 이미 정렬 완료!
            </span>
            <div className="text-[#e2e8f0] mt-1">
              한 회차를 통째로 훑었는데 아무것도 교환하지 않았다면, 배열이 이미
              정렬된 것입니다. <code className="text-[#00d4ff]">swapped</code>{" "}
              변수로 이를 감지해 즉시 멈추면 최선의 경우 O(n)이 됩니다.
            </div>
            <div className="mt-2 font-mono text-[13px] bg-[#111827] rounded p-3">
              <div className="text-[#e2e8f0]">{"for i in range(n):"}</div>
              <div className="text-[#e2e8f0]">{"    swapped = False"}</div>
              <div className="text-[#e2e8f0]">
                {"    for j in range(n - i - 1):"}
              </div>
              <div className="text-[#e2e8f0]">
                {"        if arr[j] > arr[j + 1]:"}
              </div>
              <div className="text-[#e2e8f0]">
                {"            arr[j], arr[j+1] = arr[j+1], arr[j]"}
              </div>
              <div className="text-[#e2e8f0]">
                {"            swapped = True"}
              </div>
              <div className="text-[#10b981]">
                {"    if not swapped: break  # 교환 없음 = 이미 정렬됨"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#f59e0b]">
        <div className="text-[#f59e0b] font-bold">⚠️ 실전에서는?</div>
        <div className="text-[#e2e8f0] mt-2 leading-[1.8]">
          O(n²)이라 실전 코딩테스트에선 거의 사용 안 함. <br />
          개념 이해용이지만 <strong>최선의 경우 O(n)</strong> 최적화 버전은 가끔
          출제됨.
        </div>
      </div>
    </div>
  ),

  selection: () => (
    <div>
      <h2 className="text-[#00d4ff]">🎯 선택 정렬 (Selection Sort)</h2>
      <div className="text-[#64748b] mb-4">
        매 단계에서 가장 작은 원소를 선택해 맨 앞에 배치합니다.
      </div>
      <W2_ComplexityBadge time="O(n²)" space="O(1)" />
      <W2_SortVisualizer algorithm="selection" />
      <W2_CodeBlock
        code={`def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i                    # 최솟값 인덱스 추적
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j            # 더 작은 값 발견시 갱신
        arr[i], arr[min_idx] = arr[min_idx], arr[i]  # 최솟값을 앞으로
    return arr

arr = [64, 25, 12, 22, 11]
print(selection_sort(arr))  # [11, 12, 22, 25, 64]`}
      />
      <div className="bg-[#0d1f2d] rounded-[10px] p-4 border-l-[3px] border-l-[#00d4ff] mb-3">
        <div className="text-[#00d4ff] font-bold mb-3">🔍 핵심 로직 해설</div>
        <div className="space-y-4 text-[14px] leading-[1.8]">
          <div>
            <span className="text-[#f59e0b] font-bold">
              `min_idx = i`로 시작하는 이유
            </span>
            <div className="text-[#e2e8f0] mt-1">
              "i번째 자리에 가장 작은 수를 채운다"가 목표입니다. 탐색을 시작하기
              전, 일단{" "}
              <strong>"현재 내가 서 있는 i번 자리가 최솟값"이라고 가정</strong>
              합니다. 그 뒤 오른쪽을 훑으면서 더 작은 게 나오면 min_idx를
              갱신합니다. 다 훑고 나면 딱 한 번만 자리를 바꿉니다.
            </div>
          </div>
          <div>
            <span className="text-[#f59e0b] font-bold">
              내부 루프가 `i + 1`부터 시작하는 이유
            </span>
            <div className="text-[#e2e8f0] mt-1">
              앞쪽(0 ~ i-1)은 이미 자리가 확정된 구간입니다. 건드릴 필요 없이
              아직 정렬 안 된 뒷부분(i+1 ~ 끝)만 훑으면 됩니다.
            </div>
            <div className="mt-2 font-mono text-[13px] bg-[#111827] rounded p-3">
              <div>
                <span className="text-[#10b981]">[11, 12]</span>
                <span className="text-[#64748b]"> | </span>
                <span className="text-[#e2e8f0]">[22, 25, 64]</span>
                <span className="text-[#64748b]"> ← i=2일 때</span>
              </div>
              <div className="text-[#64748b]">
                {" "}
                이미 확정 여기서만 최솟값 탐색
              </div>
            </div>
          </div>
          <div>
            <span className="text-[#f59e0b] font-bold">
              버블 정렬과 다른 점: 교환을 딱 1번만 함
            </span>
            <div className="text-[#e2e8f0] mt-1">
              버블 정렬은 비교할 때마다 바로바로 자리를 바꿉니다(최대 O(n²)번
              교환). 선택 정렬은 미리 최솟값 위치를 찾아두고{" "}
              <strong>한 번만</strong> 바꿉니다(딱 n번). "많이 비교하고, 적게
              교환"하는 방식입니다.
            </div>
          </div>
          <div className="mt-1 bg-[#111827] rounded p-3 text-[13px] space-y-3">
            <div className="text-[#00d4ff] font-bold">
              range(i + 1, n), 각 항목이 의미하는 것
            </div>
            <div>
              <span className="text-[#10b981] font-bold">i + 1</span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 탐색 시작점. i 자신은 이미 min_idx 초기값으로 "가정"됐으므로
                건너뛰고, 그 다음부터 비교를 시작합니다.
              </span>
            </div>
            <div>
              <span className="text-[#f59e0b] font-bold">n</span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 탐색 끝점. 아직 정렬 안 된 구간 전체(i+1 ~ 끝)를 빠짐없이 봐야
                진짜 최솟값을 찾을 수 있습니다.
              </span>
            </div>
            <div className="border-t border-[#1e2d45] pt-2 font-mono space-y-1">
              <div className="text-[#00d4ff] font-bold text-[12px]">
                arr[i], arr[min_idx] = arr[min_idx], arr[i] 분해
              </div>
              <div>
                <span className="text-[#10b981]">arr[i]</span>
                <span className="text-[#e2e8f0]">
                  {" "}
                  — 지금 채워야 할 자리 (i번째 확정 슬롯)
                </span>
              </div>
              <div>
                <span className="text-[#f59e0b]">arr[min_idx]</span>
                <span className="text-[#e2e8f0]">
                  {" "}
                  — 탐색으로 찾은 최솟값의 위치
                </span>
              </div>
              <div className="text-[#64748b] mt-1">
                i=0일 때: range(
                <span className="text-[#10b981]">1</span>,{" "}
                <span className="text-[#f59e0b]">5</span>) → j=1,2,3,4 탐색 →
                최솟값 확정 후 arr[0]과 교환
              </div>
              <div className="text-[#64748b]">
                i=1일 때: range(
                <span className="text-[#10b981]">2</span>,{" "}
                <span className="text-[#f59e0b]">5</span>) → j=2,3,4 탐색 →
                arr[1]과 교환{" "}
                <span className="text-[#10b981]">(0번은 이미 확정)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#00d4ff]">
        <div className="text-[#00d4ff] font-bold">🔑 특징</div>
        <ul className="text-[#e2e8f0] leading-[2] mt-2">
          <li>교환 횟수가 O(n)으로 적음 → 쓰기 비용이 큰 경우 유리</li>
          <li>항상 O(n²) - 최선/최악 동일</li>
          <li>불안정 정렬 (같은 값의 순서 보장 X)</li>
        </ul>
      </div>
    </div>
  ),

  insertion: () => (
    <div>
      <h2 className="text-[#00d4ff]">🃏 삽입 정렬 (Insertion Sort)</h2>
      <div className="text-[#64748b] mb-4">
        배열의 모든 요소를 앞에서부터 차례대로 이미 정렬된 배열 부분과 비교하여, 자신의 위치를 찾아 삽입함으로써 정렬하는 방식입니다.
      </div>
      <W2_ComplexityBadge time="O(n²) / O(n) 최선" space="O(1)" />
      <W2_SortVisualizer algorithm="insertion" />
      <W2_CodeBlock
        code={`def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]       # 삽입할 원소
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]  # 뒤로 밀기
            j -= 1
        arr[j + 1] = key   # 올바른 위치에 삽입
    return arr

arr = [12, 11, 13, 5, 6]
print(insertion_sort(arr))  # [5, 6, 11, 12, 13]`}
      />
      <div className="bg-[#0d1f2d] rounded-[10px] p-4 border-l-[3px] border-l-[#00d4ff] mb-3">
        <div className="text-[#00d4ff] font-bold mb-3">🔍 핵심 로직 해설</div>
        <div className="space-y-4 text-[14px] leading-[1.8]">
          <div>
            <span className="text-[#f59e0b] font-bold">
              while 조건에 두 가지가 붙는 이유
            </span>
            <div className="text-[#e2e8f0] mt-1 space-y-1">
              <div>
                <span className="text-[#10b981] font-bold">j &gt;= 0</span> —
                왼쪽 끝을 넘어가지 않으려는 안전장치입니다. j가 0보다 작아지면
                배열 밖을 가리키게 되므로 반드시 막아야 합니다.
              </div>
              <div>
                <span className="text-[#10b981] font-bold">
                  arr[j] &gt; key
                </span>{" "}
                — key보다 큰 원소를 만나는 동안만 계속 오른쪽으로 밉니다.
                key보다 작거나 같은 원소를 만나는 순간 "여기 바로 오른쪽이 내
                자리"라는 의미이므로 멈춥니다.
              </div>
            </div>
          </div>
          <div>
            <span className="text-[#f59e0b] font-bold">
              swap(교환) 대신 shift(밀기)를 쓰는 이유
            </span>
            <div className="text-[#e2e8f0] mt-1">
              카드를 끼워넣는다고 생각해 보세요. 공간을 만들기 위해 카드들을 한
              칸씩 오른쪽으로 밀고, 빈 자리에 한 번만 꽂습니다. 매번 두 장을
              맞바꾸는 것보다 훨씬 효율적입니다.
            </div>
            <div className="mt-2 font-mono text-[13px] bg-[#111827] rounded p-3">
              <div className="text-[#64748b]">
                # [11, 12, 13] 사이에 5를 끼워넣기
              </div>
              <div className="text-[#e2e8f0]">
                key = 5 를 들고, 빈 자리를 오른쪽으로 밀기
              </div>
              <div className="text-[#e2e8f0] mt-1">
                13 &gt; 5 → 13을 오른쪽으로 [11, 12,{" "}
                <span className="text-[#64748b]">__</span>, 13]
              </div>
              <div className="text-[#e2e8f0]">
                12 &gt; 5 → 12를 오른쪽으로 [11,{" "}
                <span className="text-[#64748b]">__</span>, 12, 13]
              </div>
              <div className="text-[#e2e8f0]">
                11 &gt; 5 → 11을 오른쪽으로 [
                <span className="text-[#64748b]">__</span>, 11, 12, 13]
              </div>
              <div className="text-[#10b981]">
                빈 자리에 5를 꽂기 [5, 11, 12, 13] ✓
              </div>
            </div>
          </div>
          <div>
            <span className="text-[#f59e0b] font-bold">
              거의 정렬된 배열에서 O(n)이 되는 이유
            </span>
            <div className="text-[#e2e8f0] mt-1">
              이미 정렬된 배열이라면 카드를 들었을 때 바로 왼쪽 카드가 더
              작으므로 while 루프가 한 번도 돌지 않습니다. 그냥 원소 하나씩
              확인만 하면 되니 O(n)입니다.
            </div>
          </div>
          <div className="mt-1 bg-[#111827] rounded p-3 text-[13px] space-y-3">
            <div className="text-[#00d4ff] font-bold">
              while j &gt;= 0 and arr[j] &gt; key, 각 항목이 의미하는 것
            </div>
            <div>
              <span className="text-[#10b981] font-bold">j &gt;= 0</span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 왼쪽 경계 초과 방지. j가 -1이 되면 배열 밖이므로 반드시 먼저
                확인해야 합니다. (and는 앞 조건이 거짓이면 뒤 조건을 아예
                평가하지 않아 안전합니다)
              </span>
            </div>
            <div>
              <span className="text-[#f59e0b] font-bold">arr[j] &gt; key</span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 삽입 위치 탐색. key보다 큰 원소를 만나는 동안 계속 오른쪽으로
                밀고, key보다 작거나 같은 순간 "여기 바로 오른쪽"이 삽입
                위치입니다.
              </span>
            </div>
            <div className="border-t border-[#1e2d45] pt-2 font-mono space-y-1">
              <div className="text-[#00d4ff] font-bold text-[12px]">
                arr[j + 1] = key 분해
              </div>
              <div>
                <span className="text-[#10b981]">j + 1</span>
                <span className="text-[#e2e8f0]">
                  {" "}
                  — while이 멈춘 j의 바로 오른쪽. arr[j] &lt;= key 이거나 j가
                  -1인 시점이므로, j+1이 key가 들어갈 정확한 자리입니다.
                </span>
              </div>
              <div>
                <span className="text-[#f59e0b]">key</span>
                <span className="text-[#e2e8f0]">
                  {" "}
                  — 루프 시작 전에 따로 저장해둔 삽입할 원소. 밀기 과정에서
                  덮어씌워지지 않으므로 끝에 한 번만 씁니다.
                </span>
              </div>
              <div className="text-[#64748b] mt-1">
                key=5, [11, 12, 13, __] 상태에서 while 종료 시점: j=-1
              </div>
              <div className="text-[#e2e8f0]">
                → arr[<span className="text-[#10b981]">-1+1</span>] ={" "}
                <span className="text-[#f59e0b]">5</span> → arr[0] = 5 ✓
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#10b981]">
        <div className="text-[#10b981] font-bold">✅ 강점</div>
        <ul className="text-[#e2e8f0] leading-[2] mt-2">
          <li>
            <strong>거의 정렬된 데이터</strong>에서 O(n) 근접 - 매우 빠름
          </li>
          <li>안정 정렬 (같은 값의 순서 유지)</li>
          <li>파이썬 Timsort의 내부에서 삽입 정렬 사용</li>
        </ul>
      </div>
    </div>
  ),

  merge: () => (
    <div>
      <h2 className="text-[#00d4ff]">🔀 병합 정렬 (Merge Sort)</h2>
      <div className="text-[#64748b] mb-4">
        분할 정복 전략: 반으로 나눠 각각 정렬 후 병합합니다.
      </div>
      <W2_ComplexityBadge time="O(n log n)" space="O(n)" />
      <div className="p-4 bg-[#111827] rounded-[10px] my-3">
        <div className="text-[#e2e8f0] text-[13px] text-center font-mono">
          <div className="text-[#00d4ff]">[38, 27, 43, 3, 9, 82, 10]</div>
          <div className="text-[#64748b] text-[18px] my-1">↓ 분할 (divide)</div>
          <div className="flex justify-center gap-5">
            <span className="text-[#7c3aed]">[38, 27, 43, 3]</span>
            <span className="text-[#10b981]">[9, 82, 10]</span>
          </div>
          <div className="text-[#64748b] text-[18px] my-1">↓ 재귀 정렬</div>
          <div className="flex justify-center gap-5">
            <span className="text-[#7c3aed]">[3, 27, 38, 43]</span>
            <span className="text-[#10b981]">[9, 10, 82]</span>
          </div>
          <div className="text-[#64748b] text-[18px] my-1">↓ 병합 (merge)</div>
          <div className="text-[#10b981]">[3, 9, 10, 27, 38, 43, 82]</div>
        </div>
      </div>
      <W2_CodeBlock
        code={`def merge_sort(arr):
    if len(arr) <= 1:          # 기저 조건
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])   # 왼쪽 재귀 정렬
    right = merge_sort(arr[mid:])  # 오른쪽 재귀 정렬

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])   # 남은 원소 추가
    result.extend(right[j:])
    return result

arr = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(arr))  # [3, 9, 10, 27, 38, 43, 82]`}
      />
      <div className="bg-[#0d1f2d] rounded-[10px] p-4 border-l-[3px] border-l-[#00d4ff] mb-3">
        <div className="text-[#00d4ff] font-bold mb-3">🔍 핵심 로직 해설</div>
        <div className="space-y-4 text-[14px] leading-[1.8]">
          <div>
            <span className="text-[#f59e0b] font-bold">
              재귀가 멈추는 조건 `if len(arr) &lt;= 1`
            </span>
            <div className="text-[#e2e8f0] mt-1">
              "반으로 나눠라"를 계속 반복하면 결국 원소가 1개짜리 배열이 됩니다.
              원소가 1개면 이미 정렬된 상태이므로 그냥 돌려보냅니다. 이 조건이
              없으면 무한히 나누다가 프로그램이 터집니다.
            </div>
          </div>
          <div>
            <span className="text-[#f59e0b] font-bold">
              merge 함수: 두 줄을 어떻게 하나로 합치는가?
            </span>
            <div className="text-[#e2e8f0] mt-1">
              left와 right는 각각 <strong>이미 정렬된</strong> 배열입니다. 두
              배열의 맨 앞끼리만 비교해서 더 작은 쪽을 결과에 담으면 됩니다.
              어느 한 쪽이 바닥나면 나머지는 어차피 정렬돼 있으니 통째로 이어
              붙입니다.
            </div>
            <div className="mt-2 font-mono text-[13px] bg-[#111827] rounded p-3">
              <div className="text-[#64748b]">
                left=[3, 27, 38] right=[9, 10, 82]
              </div>
              <div className="text-[#e2e8f0] mt-1">
                3 vs 9 → <span className="text-[#10b981]">3</span> 꺼냄 →
                result=[3]
              </div>
              <div className="text-[#e2e8f0]">
                27 vs 9 → <span className="text-[#10b981]">9</span> 꺼냄 →
                result=[3, 9]
              </div>
              <div className="text-[#e2e8f0]">
                27 vs 10 → <span className="text-[#10b981]">10</span> 꺼냄 →
                result=[3, 9, 10]
              </div>
              <div className="text-[#e2e8f0]">
                27 vs 82 → <span className="text-[#10b981]">27</span> 꺼냄 →
                result=[3, 9, 10, 27]
              </div>
              <div className="text-[#e2e8f0]">
                38 vs 82 → <span className="text-[#10b981]">38</span> 꺼냄 →
                result=[3, 9, 10, 27, 38]
              </div>
              <div className="text-[#10b981]">
                left 바닥남 → [82] 통째로 붙이기 → [3,9,10,27,38,82] ✓
              </div>
            </div>
          </div>
          <div>
            <span className="text-[#f59e0b] font-bold">
              왜 항상 O(n log n)인가?
            </span>
            <div className="text-[#e2e8f0] mt-1">
              8개짜리 배열을 반씩 나누면 → 4 → 2 → 1, 딱 3번(log₂8 = 3)만
              나뉩니다. 합칠 때는 매 단계에서 전체 n개를 한 번씩 훑습니다. 즉{" "}
              <strong>log n 단계 × n번 작업 = O(n log n)</strong>이고, 어떤
              순서의 입력이든 이 구조가 바뀌지 않아 항상 동일합니다.
            </div>
          </div>
          <div className="mt-1 bg-[#111827] rounded p-3 text-[13px] space-y-3">
            <div className="text-[#00d4ff] font-bold">
              merge 함수 핵심 코드, 각 항목이 의미하는 것
            </div>
            <div>
              <span className="text-[#10b981] font-bold">i, j = 0, 0</span>
              <span className="text-[#e2e8f0]">
                {" "}
                — left와 right 각각의 현재 비교 위치. 둘 다 맨 앞(0)부터
                시작해서 더 작은 쪽을 꺼낼 때마다 해당 포인터를 한 칸
                전진합니다.
              </span>
            </div>
            <div>
              <span className="text-[#f59e0b] font-bold">
                while i &lt; len(left) and j &lt; len(right)
              </span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 어느 한 쪽이 바닥나면 루프 종료. 남은 쪽은 이미 정렬돼 있어
                그냥 이어 붙이면 됩니다.
              </span>
            </div>
            <div>
              <span className="text-[#ef4444] font-bold">
                result.extend(left[i:])
              </span>
              <span className="text-[#e2e8f0]">
                {" "}
                — left[i:]는 left 배열에서 아직 꺼내지 않은 나머지 전부입니다.
                right가 먼저 바닥났을 때 실행됩니다. right[j:]도 같은
                이유입니다.
              </span>
            </div>
            <div className="border-t border-[#1e2d45] pt-2 font-mono space-y-1">
              <div className="text-[#64748b]">
                left=[3, 27] right=[9] 상태에서 9 꺼낸 후 right 소진
              </div>
              <div className="text-[#e2e8f0]">i=0, j=1(소진) → while 종료</div>
              <div className="text-[#e2e8f0]">
                extend(left[<span className="text-[#10b981]">0</span>:]) =
                extend([3, 27]) → 나머지 한 번에 추가 ✓
              </div>
              <div className="text-[#64748b] mt-1">
                ※ extend(left[i:])에서 i가 0이 아닐 수도 있음 — 이미 꺼낸 원소는
                건너뜀
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#10b981]">
        <div className="text-[#10b981] font-bold">✅ 병합 정렬의 장점</div>
        <ul className="text-[#e2e8f0] leading-[2] mt-2">
          <li>항상 O(n log n) 보장 - 최악의 경우 없음</li>
          <li>안정 정렬</li>
          <li>연결 리스트 정렬에 유리</li>
          <li>외부 정렬(파일 정렬)에 활용</li>
        </ul>
      </div>
    </div>
  ),

  quick: () => (
    <div>
      <h2 className="text-[#00d4ff]">⚡ 퀵 정렬 (Quick Sort)</h2>
      <div className="text-[#64748b] mb-4">
        피벗을 기준으로 좌우를 분할하는 분할 정복 정렬입니다.
      </div>
      <W2_ComplexityBadge
        time="O(n log n) 평균 / O(n²) 최악"
        space="O(log n)"
      />
      <div className="p-4 bg-[#111827] rounded-[10px] my-3 font-mono text-[13px]">
        <div className="text-[#e2e8f0]">
          [3, 6, 8, 10, 1, 2,{" "}
          <span className="text-[#f59e0b] font-bold">1</span>] 피벗: 1
        </div>
        <div className="text-[#64748b] my-[6px]">
          → 피벗보다 작은 값: [] | 피벗: [1] | 피벗보다 큰 값: [3, 6, 8, 10, 2]
        </div>
        <div className="text-[#10b981]">→ 재귀적으로 반복...</div>
      </div>
      <W2_CodeBlock
        code={`# 파이썬다운 방식 (이해하기 쉬운 버전)
def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]  # 중간 원소를 피벗으로
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)

# 인플레이스 방식 (공간 효율적, 실전용)
def quick_sort_inplace(arr, low, high):
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort_inplace(arr, low, pivot_idx - 1)
        quick_sort_inplace(arr, pivot_idx + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

arr = [10, 7, 8, 9, 1, 5]
print(quick_sort(arr))  # [1, 5, 7, 8, 9, 10]`}
      />
      <div className="bg-[#0d1f2d] rounded-[10px] p-4 border-l-[3px] border-l-[#00d4ff] mb-3">
        <div className="text-[#00d4ff] font-bold mb-3">🔍 핵심 로직 해설</div>
        <div className="space-y-4 text-[14px] leading-[1.8]">
          <div>
            <span className="text-[#f59e0b] font-bold">
              피벗을 중간 원소로 고르는 이유
            </span>
            <div className="text-[#e2e8f0] mt-1">
              피벗은 "기준값"입니다. 피벗을 맨 앞이나 맨 뒤로 고르면, 이미
              정렬된 배열에서 항상 한쪽이 비어버려 O(n²)으로 느려집니다. 중간
              원소를 고르면 이 최악의 상황을 피할 수 있습니다.
            </div>
          </div>
          <div>
            <span className="text-[#f59e0b] font-bold">
              partition 함수: `i = low - 1`이 뭘 뜻하는가?
            </span>
            <div className="text-[#e2e8f0] mt-1">
              i는 "피벗보다 작은 원소들의 구역이 여기까지 찼다"는 경계선입니다.
              처음엔 피벗보다 작은 게 하나도 없으므로 배열 시작 바로 왼쪽(low -
              1), 즉 "아직 비어있다"는 뜻으로 초기화합니다.
            </div>
            <div className="mt-2 font-mono text-[13px] bg-[#111827] rounded p-3">
              <div className="text-[#64748b]">
                # arr=[10, 7, 8, 9, 1, 5], 피벗=5 (맨 뒤)
              </div>
              <div className="text-[#64748b]">
                i = -1 ← "작은 구역 아직 없음"
              </div>
              <div className="text-[#e2e8f0] mt-1">
                j=0: 10 &gt; 5 → 그냥 넘어감
              </div>
              <div className="text-[#e2e8f0]">j=1: 7 &gt; 5 → 그냥 넘어감</div>
              <div className="text-[#e2e8f0]">j=2: 8 &gt; 5 → 그냥 넘어감</div>
              <div className="text-[#e2e8f0]">j=3: 9 &gt; 5 → 그냥 넘어감</div>
              <div className="text-[#e2e8f0]">
                j=4: <span className="text-[#10b981]">1 &lt;= 5</span> → i=0,
                1과 10 교환 → [<span className="text-[#10b981]">1</span>, 7, 8,
                9, 10, 5]
              </div>
              <div className="text-[#10b981]">
                루프 끝 → i+1=1 위치와 피벗 교환 → [1,{" "}
                <span className="text-[#10b981]">5</span>, 8, 9, 10, 7]
              </div>
              <div className="text-[#64748b]">
                피벗 5가 인덱스 1에 최종 확정, return 1
              </div>
            </div>
          </div>
          <div>
            <span className="text-[#f59e0b] font-bold">
              피벗은 재귀에서 제외하는 이유
            </span>
            <div className="text-[#e2e8f0] mt-1">
              partition이 끝나면 피벗은 이미 <strong>자기 최종 자리</strong>에
              앉아있습니다. 더 이상 움직일 필요가 없으므로 재귀 범위에서 뺍니다.
              피벗 왼쪽(~ pivot_idx-1)과 오른쪽(pivot_idx+1 ~)을 독립적으로 다시
              정렬합니다.
            </div>
          </div>
          <div className="mt-1 bg-[#111827] rounded p-3 text-[13px] space-y-3">
            <div className="text-[#00d4ff] font-bold">
              partition 함수 핵심 코드, 각 항목이 의미하는 것
            </div>
            <div>
              <span className="text-[#10b981] font-bold">i = low - 1</span>
              <span className="text-[#e2e8f0]">
                {" "}
                — "피벗보다 작은 원소 구역의 오른쪽 끝" 포인터. 처음엔 해당
                원소가 없으므로 low 바로 왼쪽(존재하지 않는 위치)으로
                초기화합니다.
              </span>
            </div>
            <div>
              <span className="text-[#f59e0b] font-bold">
                if arr[j] &lt;= pivot: i += 1; swap
              </span>
              <span className="text-[#e2e8f0]">
                {" "}
                — j가 피벗보다 작거나 같은 원소를 발견하면, 작은 구역을 한 칸
                넓히고(i+1) 그 자리에 해당 원소를 교환해 넣습니다.
              </span>
            </div>
            <div>
              <span className="text-[#ef4444] font-bold">
                arr[i + 1], arr[high] = arr[high], arr[i + 1]
              </span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 루프가 끝난 후 피벗을 최종 위치에 꽂습니다. i+1이 "작은 원소
                구역 바로 다음 칸"이므로 피벗의 올바른 자리입니다.
              </span>
            </div>
            <div>
              <span className="text-[#7c3aed] font-bold">return i + 1</span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 피벗의 최종 인덱스를 반환. 호출한 쪽에서 이 인덱스를 기준으로
                왼쪽(low ~ i)과 오른쪽(i+2 ~ high)을 재귀 정렬합니다.
              </span>
            </div>
            <div className="border-t border-[#1e2d45] pt-2 font-mono space-y-1">
              <div className="text-[#64748b]">
                arr=[10,7,8,9,1,5], low=0, high=5, pivot=5
              </div>
              <div className="text-[#e2e8f0]">
                j=4: 1 &lt;= 5 → <span className="text-[#10b981]">i=0</span>,
                swap(arr[0],arr[4]) → [1,7,8,9,10,5]
              </div>
              <div className="text-[#e2e8f0]">
                루프 끝 →{" "}
                <span className="text-[#ef4444]">swap(arr[1], arr[5])</span> →
                [1,<span className="text-[#f59e0b]">5</span>,8,9,10,7]
              </div>
              <div className="text-[#e2e8f0]">
                <span className="text-[#7c3aed]">return 1</span> → 왼쪽[0,0]
                오른쪽[2,5] 재귀
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#f59e0b]">
        <div className="text-[#f59e0b] font-bold">⚠️ 최악의 경우 주의</div>
        <div className="text-[#e2e8f0] mt-2 leading-[1.8]">
          이미 정렬된 배열에서 맨 앞/뒤를 피벗으로 선택시 O(n²)
          <br />→ <strong>해결책:</strong> 랜덤 피벗, 중앙값 피벗 사용
        </div>
      </div>
    </div>
  ),

  heap: () => (
    <div>
      <h2 className="text-[#00d4ff]">🏔️ 힙 정렬 (Heap Sort)</h2>
      <div className="text-[#64748b] mb-4">
        힙 자료구조를 이용한 정렬. 파이썬에선 heapq 모듈로 간단 구현!
      </div>
      <W2_ComplexityBadge time="O(n log n)" space="O(1)" />
      <div className="p-4 bg-[#111827] rounded-[10px] my-3">
        <div className="text-[#e2e8f0] text-[13px]">
          <strong className="text-[#00d4ff]">힙(Heap)이란?</strong>
          <br />
          <span className="text-[#64748b]">
            최솟값(min heap) 또는 최댓값(max heap)이 항상 루트에 위치하는 완전
            이진 트리
          </span>
        </div>
        <div className="text-center font-mono mt-3 text-[14px]">
          <div className="text-[#10b981]">1 (루트 = 최솟값)</div>
          <div className="flex justify-center gap-[30px] mt-1">
            <span className="text-[#00d4ff]">3</span>
            <span className="text-[#00d4ff]">2</span>
          </div>
          <div className="flex justify-center gap-[10px] mt-1">
            <span className="text-[#64748b]">9</span>
            <span className="text-[#64748b]">5</span>
            <span className="text-[#64748b]">4</span>
            <span className="text-[#64748b]">7</span>
          </div>
        </div>
      </div>
      <W2_CodeBlock
        code={`import heapq

# 방법 1: heapq를 이용한 힙 정렬
def heap_sort(arr):
    heap = []
    for val in arr:
        heapq.heappush(heap, val)  # 힙에 삽입 O(log n)
    return [heapq.heappop(heap) for _ in range(len(heap))]  # 순서대로 꺼냄

# 방법 2: 우선순위 큐로 활용 (코딩테스트에서 많이 씀!)
def top_k_elements(arr, k):
    heap = []
    for val in arr:
        heapq.heappush(heap, val)
    return [heapq.heappop(heap) for _ in range(k)]

# 최댓값 힙 (파이썬은 기본이 min heap이라 음수 활용)
def max_heap_sort(arr):
    heap = []
    for val in arr:
        heapq.heappush(heap, -val)  # 음수로 저장
    return [-heapq.heappop(heap) for _ in range(len(heap))]

arr = [3, 1, 4, 1, 5, 9, 2, 6]
print(heap_sort(arr))        # [1, 1, 2, 3, 4, 5, 6, 9]
print(top_k_elements(arr, 3))  # [1, 1, 2] (가장 작은 3개)
print(max_heap_sort(arr))    # [9, 6, 5, 4, 3, 2, 1, 1]`}
      />
      <div className="bg-[#0d1f2d] rounded-[10px] p-4 border-l-[3px] border-l-[#00d4ff] mb-3">
        <div className="text-[#00d4ff] font-bold mb-3">🔍 핵심 로직 해설</div>
        <div className="space-y-4 text-[14px] leading-[1.8]">
          <div>
            <span className="text-[#f59e0b] font-bold">
              heappush와 heappop이 각각 O(log n)인 이유
            </span>
            <div className="text-[#e2e8f0] mt-1">
              힙은 완전 이진 트리 구조입니다. 원소를 넣거나 뺄 때 트리의
              높이만큼만 이동하면 되는데, n개짜리 완전 이진 트리의 높이가
              log₂n이라 O(log n)입니다.
            </div>
          </div>
          <div>
            <span className="text-[#f59e0b] font-bold">
              최댓값 힙에서 왜 음수(-val)를 쓰는가?
            </span>
            <div className="text-[#e2e8f0] mt-1">
              파이썬 heapq는 항상 최솟값을 루트에 두는 min heap입니다. 값을
              음수로 뒤집어 넣으면 원래 가장 큰 값이 음수로는 가장 작아지므로,
              min heap이 사실상 max heap처럼 동작합니다.
            </div>
          </div>
          <div className="bg-[#111827] rounded p-3 text-[13px] space-y-3">
            <div className="text-[#00d4ff] font-bold">
              heapq 핵심 함수, 각 항목이 의미하는 것
            </div>
            <div>
              <span className="text-[#10b981] font-bold">
                heapq.heappush(heap, val)
              </span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 힙에 val을 삽입하고 힙 속성(부모 ≤ 자식)을 자동으로
                유지합니다. 넣은 후 위로 올라가며 자리를 찾습니다(sift up).
              </span>
            </div>
            <div>
              <span className="text-[#f59e0b] font-bold">
                heapq.heappop(heap)
              </span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 루트(최솟값)를 꺼내고, 마지막 원소를 루트로 옮긴 뒤 아래로
                내려가며 자리를 찾습니다(sift down). 항상 가장 작은 값이
                반환됩니다.
              </span>
            </div>
            <div>
              <span className="text-[#ef4444] font-bold">
                heapq.heappush(heap, -val)
              </span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 음수로 저장하는 max heap 트릭. 꺼낼 때
                <code className="text-[#00d4ff]"> -heapq.heappop(heap)</code>
                으로 부호를 다시 뒤집습니다.
              </span>
            </div>
            <div className="border-t border-[#1e2d45] pt-2 font-mono space-y-1">
              <div className="text-[#64748b]">
                arr = [3, 1, 4] min heap 예시
              </div>
              <div className="text-[#e2e8f0]">
                push(3) → [<span className="text-[#10b981]">3</span>]
              </div>
              <div className="text-[#e2e8f0]">
                push(1) → [<span className="text-[#10b981]">1</span>, 3] (1이
                루트로 올라옴)
              </div>
              <div className="text-[#e2e8f0]">
                push(4) → [<span className="text-[#10b981]">1</span>, 3, 4]
              </div>
              <div className="text-[#f59e0b]">
                pop() → 1 반환, [3, 4] 재정렬
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#10b981]">
        <div className="text-[#10b981] font-bold">🎯 코딩테스트 활용</div>
        <ul className="text-[#e2e8f0] leading-[2] mt-2">
          <li>
            <strong>K번째 최솟값/최댓값</strong> 찾기 문제
          </li>
          <li>
            <strong>다익스트라 알고리즘</strong>에서 우선순위 큐로 사용
          </li>
          <li>
            힙 정렬 자체보다 <code className="text-[#00d4ff]">heapq</code>{" "}
            사용법이 더 중요!
          </li>
        </ul>
      </div>
    </div>
  ),

  binary: () => (
    <div>
      <h2 className="text-[#00d4ff]">🔍 이진 탐색 (Binary Search)</h2>
      <div className="text-[#64748b] mb-4">
        정렬된 배열에서 반씩 줄여가며 탐색. O(log n)의 마법!
      </div>
      <W2_ComplexityBadge time="O(log n)" space="O(1)" />
      <W2_BinarySearchViz />
      <W2_CodeBlock
        code={`# 방법 1: 직접 구현
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid          # 찾음!
        elif arr[mid] < target:
            left = mid + 1      # 오른쪽 탐색
        else:
            right = mid - 1     # 왼쪽 탐색

    return -1  # 없음

# 방법 2: bisect 모듈 활용 (실전 추천!)
from bisect import bisect_left, bisect_right

arr = [1, 3, 5, 7, 9, 11, 13]
target = 7

# bisect_left: target 이상인 첫 위치
idx = bisect_left(arr, target)
if idx < len(arr) and arr[idx] == target:
    print(f"찾음: 인덱스 {idx}")

# 특정 범위의 원소 개수 세기
arr = [1, 2, 3, 3, 3, 5, 6]
count = bisect_right(arr, 3) - bisect_left(arr, 3)
print(f"3의 개수: {count}")  # 3

# 테스트
arr = [2, 5, 8, 12, 16, 23, 38, 45]
print(binary_search(arr, 23))  # 5 (인덱스)
print(binary_search(arr, 6))   # -1 (없음)`}
      />
      <div className="bg-[#0d1f2d] rounded-[10px] p-4 border-l-[3px] border-l-[#00d4ff] mb-3">
        <div className="text-[#00d4ff] font-bold mb-3">🔍 핵심 로직 해설</div>
        <div className="space-y-4 text-[14px] leading-[1.8]">
          <div>
            <span className="text-[#f59e0b] font-bold">
              왜 `while left &lt;= right`인가? (&lt; 가 아닌 이유)
            </span>
            <div className="text-[#e2e8f0] mt-1">
              left == right일 때 탐색 범위가 원소 딱 1개인 상태입니다. 이 원소도
              반드시 확인해야 하므로 {"<="} 를 씁니다. {"<"} 로 쓰면 마지막
              원소를 확인하지 못하고 -1을 반환하는 버그가 생깁니다.
            </div>
          </div>
          <div>
            <span className="text-[#f59e0b] font-bold">
              `left = mid + 1`, `right = mid - 1`에서 왜 ±1인가?
            </span>
            <div className="text-[#e2e8f0] mt-1">
              mid는 이미 확인했으므로 다음 탐색에서 제외해야 합니다. mid 그대로
              두면 left == right == mid인 상황에서 무한 루프가 발생합니다.
            </div>
          </div>
          <div className="bg-[#111827] rounded p-3 text-[13px] space-y-3">
            <div className="text-[#00d4ff] font-bold">
              이진 탐색 핵심 변수, 각 항목이 의미하는 것
            </div>
            <div>
              <span className="text-[#10b981] font-bold">left = 0</span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 현재 탐색 범위의 왼쪽 끝 인덱스. target이 mid보다 크면 left를
                mid+1로 올려 오른쪽 절반만 봅니다.
              </span>
            </div>
            <div>
              <span className="text-[#f59e0b] font-bold">
                right = len(arr) - 1
              </span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 현재 탐색 범위의 오른쪽 끝 인덱스. len(arr)이 아닌
                len(arr)-1인 이유는 배열 마지막 인덱스가 n-1이기 때문입니다.
              </span>
            </div>
            <div>
              <span className="text-[#ef4444] font-bold">
                mid = (left + right) // 2
              </span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 탐색 범위 정중앙 인덱스. 홀수 범위면 내림(//), 짝수 범위면
                왼쪽 중앙을 가리킵니다. 매 단계마다 탐색 범위가 절반으로 줄어
                O(log n)이 됩니다.
              </span>
            </div>
            <div className="border-t border-[#1e2d45] pt-2 font-mono space-y-1">
              <div className="text-[#64748b]">
                arr=[2,5,8,12,16,23,38,45], target=23
              </div>
              <div className="text-[#e2e8f0]">
                left=<span className="text-[#10b981]">0</span>, right=
                <span className="text-[#f59e0b]">7</span>, mid=
                <span className="text-[#ef4444]">3</span> → arr[3]=12 &lt; 23 →
                left=4
              </div>
              <div className="text-[#e2e8f0]">
                left=<span className="text-[#10b981]">4</span>, right=
                <span className="text-[#f59e0b]">7</span>, mid=
                <span className="text-[#ef4444]">5</span> → arr[5]=23 == 23 ✓
              </div>
              <div className="text-[#10b981]">return 5</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#ef4444]">
        <div className="text-[#ef4444] font-bold">❗ 실수 주의</div>
        <ul className="text-[#e2e8f0] leading-[2] mt-2">
          <li>
            <code className="text-[#f59e0b]">while left {"<="} right</code> ←{" "}
            {"<"} 가 아니라 {"<="} 임에 주의!
          </li>
          <li>
            중간값:{" "}
            <code className="text-[#f59e0b]">
              {"mid = (left + right) // 2"}
            </code>
          </li>
          <li>
            반드시 <strong>정렬된 배열</strong>에서만 사용 가능
          </li>
        </ul>
      </div>
    </div>
  ),

  parametric: () => (
    <div>
      <h2 className="text-[#00d4ff]">🎚️ 파라메트릭 서치 (Parametric Search)</h2>
      <div className="text-[#64748b] mb-4">
        "최적의 답을 직접 구하는 대신, 답의 범위에 이진 탐색을 적용"
      </div>
      <W2_ComplexityBadge time="O(log(범위) × f(n))" space="O(1)" />
      <div className="p-4 bg-[#111827] rounded-[10px] my-3">
        <div className="text-[#10b981] font-bold mb-2">🧠 핵심 아이디어</div>
        <div className="text-[#e2e8f0] leading-[1.9]">
          <span className="text-[#f59e0b]">문제:</span> "조건을 만족하는 최적값
          구하기"
          <br />
          <span className="text-[#00d4ff]">→ 이진 탐색:</span> "이 값이 조건을
          만족하는가?" (예/아니오 판단)
          <br />
          <span className="text-[#10b981]">→ 만족하면</span> 더 최적값을 찾고,{" "}
          <span className="text-[#ef4444]">불만족이면</span> 범위 조정
        </div>
      </div>
      <W2_ParametricViz />
      <W2_CodeBlock
        code={`# 예제: 나무 자르기 (백준 2805)
# 절단기 높이 H를 정하면 → 얻을 수 있는 나무 길이 계산
# 최소 M미터를 얻을 수 있는 최대 H를 구하시오

input = sys.stdin.readline

def can_get(trees, h, need):
    """높이 h로 자를 때 need 이상 얻을 수 있는가?"""
    total = sum(max(0, t - h) for t in trees)
    return total >= need

def solve():
    n, m = map(int, input().split())
    trees = list(map(int, input().split()))

    left, right = 0, max(trees)
    answer = 0

    while left <= right:
        mid = (left + right) // 2   # 절단 높이 후보

        if can_get(trees, mid, m):  # 가능하면
            answer = mid            # 일단 저장
            left = mid + 1          # 더 높여서 최대화
        else:
            right = mid - 1         # 낮춰야 함

    return answer

# 입력:
# 4 7
# 20 15 10 17
# 출력: 15`}
      />
      <W2_CodeBlock
        code={`# 예제: 입국심사 (프로그래머스)
# n명, 각 심사관이 걸리는 시간 times[]
# 모든 사람이 심사 받는 최소 시간?

def solution(n, times):
    left = 1
    right = max(times) * n  # 최악의 경우
    answer = right

    while left <= right:
        mid = (left + right) // 2  # 시간 후보

        # mid 시간 내에 몇 명 심사 가능?
        total = sum(mid // t for t in times)

        if total >= n:             # n명 이상 가능하면
            answer = mid           # 저장
            right = mid - 1        # 더 줄여보기
        else:
            left = mid + 1         # 시간 늘려야 함

    return answer

print(solution(6, [7, 10]))  # 28`}
      />
      <div className="bg-[#0d1f2d] rounded-[10px] p-4 border-l-[3px] border-l-[#00d4ff] mb-3">
        <div className="text-[#00d4ff] font-bold mb-3">🔍 핵심 로직 해설</div>
        <div className="space-y-4 text-[14px] leading-[1.8]">
          <div>
            <span className="text-[#f59e0b] font-bold">
              이진 탐색과 파라메트릭 서치의 차이
            </span>
            <div className="text-[#e2e8f0] mt-1">
              이진 탐색은 "값이 배열에 있는가?"를 찾습니다. 파라메트릭 서치는
              "이 값으로 조건을 만족할 수 있는가?"를 묻습니다. 탐색 대상이
              배열의 원소가 아니라 <strong>답의 후보(정수 범위)</strong>입니다.
            </div>
          </div>
          <div>
            <span className="text-[#f59e0b] font-bold">
              `answer = mid`를 저장하고 계속 탐색하는 이유
            </span>
            <div className="text-[#e2e8f0] mt-1">
              조건을 만족하는 mid를 찾았다고 바로 종료하면 안 됩니다. 더 최적인
              값(더 크거나 더 작은)이 있을 수 있으므로, 일단 저장해두고 탐색
              범위를 좁혀가며 계속 갱신합니다.
            </div>
          </div>
          <div className="bg-[#111827] rounded p-3 text-[13px] space-y-3">
            <div className="text-[#00d4ff] font-bold">
              파라메트릭 서치 핵심 구조, 각 항목이 의미하는 것
            </div>
            <div>
              <span className="text-[#10b981] font-bold">
                left, right = 0, max(trees)
              </span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 답이 될 수 있는 범위. 절단 높이는 0(아무것도 안 자름)부터 가장
                큰 나무 높이까지가 가능한 전체 범위입니다.
              </span>
            </div>
            <div>
              <span className="text-[#f59e0b] font-bold">
                mid = (left + right) // 2
              </span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 지금 시도해볼 답 후보. "절단 높이를 mid로 하면 조건을
                만족하는가?"를 can_get으로 판단합니다.
              </span>
            </div>
            <div>
              <span className="text-[#ef4444] font-bold">
                answer = mid; left = mid + 1
              </span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 조건 만족 시: 일단 저장(answer)하고, 더 최적값이 있는지 오른쪽
                절반을 계속 탐색합니다(최대화 문제는 left를 올림).
              </span>
            </div>
            <div>
              <span className="text-[#7c3aed] font-bold">right = mid - 1</span>
              <span className="text-[#e2e8f0]">
                {" "}
                — 조건 불만족 시: mid가 너무 크므로(절단 높이가 높아 나무를 못
                얻음) 왼쪽 절반으로 좁힙니다.
              </span>
            </div>
            <div className="border-t border-[#1e2d45] pt-2 font-mono space-y-1">
              <div className="text-[#64748b]">
                나무 자르기: trees=[20,15,10,17], m=7
              </div>
              <div className="text-[#e2e8f0]">
                left=<span className="text-[#10b981]">0</span>, right=
                <span className="text-[#f59e0b]">20</span>, mid=
                <span className="text-[#ef4444]">10</span> → 얻는 양=12 &gt;=7 ✓
                → <span className="text-[#ef4444]">answer=10</span>, left=11
              </div>
              <div className="text-[#e2e8f0]">
                left=<span className="text-[#10b981]">11</span>, right=
                <span className="text-[#f59e0b]">20</span>, mid=
                <span className="text-[#ef4444]">15</span> → 얻는 양=7 &gt;=7 ✓
                → <span className="text-[#ef4444]">answer=15</span>, left=16
              </div>
              <div className="text-[#e2e8f0]">
                left=<span className="text-[#10b981]">16</span>, right=
                <span className="text-[#f59e0b]">20</span>, mid=
                <span className="text-[#ef4444]">18</span> → 얻는 양=4 &lt;7 ✗ →
                right=17
              </div>
              <div className="text-[#10b981]">... 최종 answer = 15 ✓</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#111827] rounded-[10px] p-4 border-l-[3px] border-l-[#7c3aed]">
        <div className="text-[#7c3aed] font-bold">
          🔑 파라메트릭 서치 패턴 인식법
        </div>
        <ul className="text-[#e2e8f0] leading-[2] mt-2">
          <li>"최대 몇 ... 이하에서" / "최소 몇 ... 이상에서" 조건</li>
          <li>답의 범위가 연속적인 정수일 때</li>
          <li>"가능 여부"를 O(n)으로 빠르게 판단할 수 있을 때</li>
          <li>
            키워드: <em className="text-[#f59e0b]">최소화, 최대화, 결정</em>
          </li>
        </ul>
      </div>
    </div>
  ),

  summary: () => (
    <div>
      <h2 className="text-[#00d4ff]">📝 정리 & 연습 문제</h2>
      <div className="bg-[#111827] rounded-[10px] p-4 mb-4">
        <div className="text-[#10b981] font-bold mb-3">
          ⚡ 복잡도 한눈에 보기
        </div>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-[#1e2d45]">
              {["알고리즘", "평균", "최악", "공간", "안정?"].map(h => (
                <th key={h} className="text-[#64748b] px-3 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["버블", "O(n²)", "O(n²)", "O(1)", "✅"],
              ["선택", "O(n²)", "O(n²)", "O(1)", "❌"],
              ["삽입", "O(n²)", "O(n²)", "O(1)", "✅"],
              ["병합", "O(n log n)", "O(n log n)", "O(n)", "✅"],
              ["퀵", "O(n log n)", "O(n²)", "O(log n)", "❌"],
              ["힙", "O(n log n)", "O(n log n)", "O(1)", "❌"],
            ].map(([name, avg, worst, space, stable], i) => (
              <tr
                key={name}
                className={`border-b border-[#1e2d45] ${i % 2 !== 0 ? "bg-[#0d1117]" : ""}`}
              >
                <td className="text-[#e2e8f0] px-3 py-2 font-bold">{name}</td>
                <td
                  className={`px-3 py-2 ${avg.includes("n²") ? "text-[#ef4444]" : "text-[#10b981]"}`}
                >
                  {avg}
                </td>
                <td
                  className={`px-3 py-2 ${worst.includes("n²") ? "text-[#ef4444]" : "text-[#10b981]"}`}
                >
                  {worst}
                </td>
                <td className="text-[#7c3aed] px-3 py-2">{space}</td>
                <td className="px-3 py-2">{stable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-[#111827] rounded-[10px] p-4 mb-4">
        <div className="text-[#f59e0b] font-bold mb-3">📚 추천 연습 문제</div>
        {[
          {
            title: "백준 2750 - 수 정렬하기",
            level: "🟢 쉬움",
            desc: "O(n²) 정렬 직접 구현",
            url: "https://www.acmicpc.net/problem/2750",
          },
          {
            title: "백준 2751 - 수 정렬하기 2",
            level: "🟡 보통",
            desc: "병합정렬 or Python sort() 활용",
            url: "https://www.acmicpc.net/problem/2751",
          },
          {
            title: "백준 1920 - 수 찾기",
            level: "🟡 보통",
            desc: "이진 탐색 기본",
            url: "https://www.acmicpc.net/problem/1920",
          },
          {
            title: "백준 1654 - 랜선 자르기",
            level: "🟠 어려움",
            desc: "파라메트릭 서치 입문",
            url: "https://www.acmicpc.net/problem/1654",
          },
          {
            title: "백준 2805 - 나무 자르기",
            level: "🟠 어려움",
            desc: "파라메트릭 서치",
            url: "https://www.acmicpc.net/problem/2805",
          },
          {
            title: "프로그래머스 - 입국심사",
            level: "🔴 고급",
            desc: "파라메트릭 서치 응용",
            url: "https://programmers.co.kr/learn/courses/30/lessons/43238",
          },
          {
            title: "프로그래머스 - H-Index",
            level: "🟡 보통",
            desc: "이진 탐색 응용",
            url: "https://programmers.co.kr/learn/courses/30/lessons/42747",
          },
        ].map(p => (
          <div
            key={p.title}
            className="flex justify-between items-center py-[10px] border-b border-[#1e2d45]"
          >
            <div>
              <span className="text-[#e2e8f0] font-bold">{p.title}</span>
              <span className="text-[#64748b] text-[12px] ml-[10px]">
                {p.desc}
              </span>
            </div>
            <span className="text-[12px]">{p.level}</span>
          </div>
        ))}
      </div>
      <W2_CodeBlock
        code={`# 실전 팁: 파이썬에서 정렬
arr = [3, 1, 4, 1, 5, 9, 2, 6]

# 기본 정렬
arr.sort()                        # in-place, O(n log n)
sorted_arr = sorted(arr)          # 새 배열 반환

# 역순 정렬
arr.sort(reverse=True)

# 키 기반 정렬
words = ["banana", "apple", "cherry"]
words.sort(key=len)               # 길이순
words.sort(key=lambda x: x[-1])  # 마지막 글자순

# 튜플 정렬 (다중 키)
data = [(1, 'b'), (2, 'a'), (1, 'a')]
data.sort()                       # (1,'a'), (1,'b'), (2,'a')
data.sort(key=lambda x: (x[1], -x[0]))  # 2번째 오름, 1번째 내림

print("정렬 완료!")`}
      />
    </div>
  ),
};
