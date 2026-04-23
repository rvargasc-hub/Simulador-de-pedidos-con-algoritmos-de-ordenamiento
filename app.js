// ─── Element references ───────────────────────────────────────────────────────
const el = {
  algorithm:   document.getElementById('algorithm'),
  language:    document.getElementById('language'),
  inputMode:   document.getElementById('inputMode'),
  arraySelect: document.getElementById('arraySelect'),
  arrayTitle:  document.getElementById('arrayTitle'),
  speed:       document.getElementById('speed'),
  speedValue:  document.getElementById('speedValue'),
  generateBtn: document.getElementById('generateBtn'),
  startBtn:    document.getElementById('startBtn'),
  resetBtn:    document.getElementById('resetBtn'),
  bars:        document.getElementById('bars'),
  codeBlock:   document.getElementById('codeBlock'),
  ordersBody:  document.getElementById('ordersBody'),
  comparisons: document.getElementById('comparisons'),
  swaps:       document.getElementById('swaps'),
  writes:      document.getElementById('writes'),
  approxTime:  document.getElementById('approxTime'),
  realTime:    document.getElementById('realTime'),
  stepCounter: document.getElementById('stepCounter')
};

// ─── Code library (unchanged from original) ──────────────────────────────────
const codeLibrary = {
  bubble: {
    cpp: {
      lines: [
        'void bubbleSort(vector<int>& arr) {',
        '  int n = arr.size();',
        '  for (int i = 0; i < n - 1; i++) {',
        '    bool swapped = false;',
        '    for (int j = 0; j < n - i - 1; j++) {',
        '      if (arr[j] > arr[j + 1]) {',
        '        swap(arr[j], arr[j + 1]);',
        '        swapped = true;',
        '      }',
        '    }',
        '    if (!swapped) break;',
        '  }',
        '}'
      ],
      map: { func: 1, outer: 3, setFlag: 4, inner: 5, compare: 6, swap: 7, flagTrue: 8, breakCheck: 11, breakStmt: 11 }
    },
    py: {
      lines: [
        'def bubble_sort(arr):',
        '    n = len(arr)',
        '    for i in range(n - 1):',
        '        swapped = False',
        '        for j in range(0, n - i - 1):',
        '            if arr[j] > arr[j + 1]:',
        '                arr[j], arr[j + 1] = arr[j + 1], arr[j]',
        '                swapped = True',
        '        if not swapped:',
        '            break'
      ],
      map: { func: 1, outer: 3, setFlag: 4, inner: 5, compare: 6, swap: 7, flagTrue: 8, breakCheck: 9, breakStmt: 10 }
    }
  },
  selection: {
    cpp: {
      lines: [
        'void selectionSort(vector<int>& arr) {',
        '  int n = arr.size();',
        '  for (int i = 0; i < n - 1; i++) {',
        '    int minIdx = i;',
        '    for (int j = i + 1; j < n; j++) {',
        '      if (arr[j] < arr[minIdx]) {',
        '        minIdx = j;',
        '      }',
        '    }',
        '    swap(arr[i], arr[minIdx]);',
        '  }',
        '}'
      ],
      map: { func: 1, outer: 3, minSet: 4, inner: 5, compare: 6, minUpdate: 7, swap: 10 }
    },
    py: {
      lines: [
        'def selection_sort(arr):',
        '    for i in range(len(arr) - 1):',
        '        min_idx = i',
        '        for j in range(i + 1, len(arr)):',
        '            if arr[j] < arr[min_idx]:',
        '                min_idx = j',
        '        arr[i], arr[min_idx] = arr[min_idx], arr[i]'
      ],
      map: { func: 1, outer: 2, minSet: 3, inner: 4, compare: 5, minUpdate: 6, swap: 7 }
    }
  },
  insertion: {
    cpp: {
      lines: [
        'void insertionSort(vector<int>& arr) {',
        '  int n = arr.size();',
        '  for (int i = 1; i < n; i++) {',
        '    int key = arr[i];',
        '    int j = i - 1;',
        '    while (j >= 0 && arr[j] > key) {',
        '      arr[j + 1] = arr[j];',
        '      j--;',
        '    }',
        '    arr[j + 1] = key;',
        '  }',
        '}'
      ],
      map: { func: 1, outer: 3, keySet: 4, jSet: 5, compare: 6, shift: 7, jDec: 8, insert: 10 }
    },
    py: {
      lines: [
        'def insertion_sort(arr):',
        '    for i in range(1, len(arr)):',
        '        key = arr[i]',
        '        j = i - 1',
        '        while j >= 0 and arr[j] > key:',
        '            arr[j + 1] = arr[j]',
        '            j -= 1',
        '        arr[j + 1] = key'
      ],
      map: { func: 1, outer: 2, keySet: 3, jSet: 4, compare: 5, shift: 6, jDec: 7, insert: 8 }
    }
  },
  shell: {
    cpp: {
      lines: [
        'void shellSort(vector<int>& arr) {',
        '  int n = arr.size();',
        '  for (int gap = n / 2; gap > 0; gap /= 2) {',
        '    for (int i = gap; i < n; i++) {',
        '      int temp = arr[i];',
        '      int j = i;',
        '      while (j >= gap && arr[j - gap] > temp) {',
        '        arr[j] = arr[j - gap];',
        '        j -= gap;',
        '      }',
        '      arr[j] = temp;',
        '    }',
        '  }',
        '}'
      ],
      map: { func: 1, gapInit: 3, outer: 4, tempSet: 5, jSet: 6, compare: 7, shift: 8, jDec: 9, insert: 11, gapHalf: 3 }
    },
    py: {
      lines: [
        'def shell_sort(arr):',
        '    n = len(arr)',
        '    gap = n // 2',
        '    while gap > 0:',
        '        for i in range(gap, n):',
        '            temp = arr[i]',
        '            j = i',
        '            while j >= gap and arr[j - gap] > temp:',
        '                arr[j] = arr[j - gap]',
        '                j -= gap',
        '            arr[j] = temp',
        '        gap //= 2'
      ],
      map: { func: 1, gapInit: 3, outer: 5, tempSet: 6, jSet: 7, compare: 8, shift: 9, jDec: 10, insert: 11, gapHalf: 12 }
    }
  },
  quick: {
    cpp: {
      lines: [
        'void quickSort(vector<int>& arr, int low, int high) {',
        '  if (low >= high) return;',
        '  int pivot = arr[high];',
        '  int i = low - 1;',
        '  for (int j = low; j < high; j++) {',
        '    if (arr[j] < pivot) {',
        '      i++;',
        '      swap(arr[i], arr[j]);',
        '    }',
        '  }',
        '  swap(arr[i + 1], arr[high]);',
        '  int p = i + 1;',
        '  quickSort(arr, low, p - 1);',
        '  quickSort(arr, p + 1, high);',
        '}'
      ],
      map: { func: 1, recurse: 2, partitionStart: 3, indexInit: 4, inner: 5, compare: 6, indexInc: 7, swap: 8, pivotSwap: 11, recurseLeft: 13, recurseRight: 14, done: 15 }
    },
    py: {
      lines: [
        'def quick_sort(arr, low, high):',
        '    if low >= high:',
        '        return',
        '    pivot = arr[high]',
        '    i = low - 1',
        '    for j in range(low, high):',
        '        if arr[j] < pivot:',
        '            i += 1',
        '            arr[i], arr[j] = arr[j], arr[i]',
        '    arr[i + 1], arr[high] = arr[high], arr[i + 1]',
        '    p = i + 1',
        '    quick_sort(arr, low, p - 1)',
        '    quick_sort(arr, p + 1, high)'
      ],
      map: { func: 1, recurse: 2, partitionStart: 4, indexInit: 5, inner: 6, compare: 7, indexInc: 8, swap: 9, pivotSwap: 10, recurseLeft: 12, recurseRight: 13, done: 1 }
    }
  },
  merge: {
    cpp: {
      lines: [
        'void mergeSort(vector<int>& arr, int l, int r) {',
        '  if (l >= r) return;',
        '  int m = l + (r - l) / 2;',
        '  mergeSort(arr, l, m);',
        '  mergeSort(arr, m + 1, r);',
        '  merge(arr, l, m, r);',
        '}',
        '// merge: compara y escribe en el arreglo'
      ],
      map: { func: 1, recurse: 2, split: 3, recurseLeft: 4, recurseRight: 5, mergeCall: 6, compare: 8, write: 8, done: 1 }
    },
    py: {
      lines: [
        'def merge_sort(arr, l, r):',
        '    if l >= r:',
        '        return',
        '    m = l + (r - l) // 2',
        '    merge_sort(arr, l, m)',
        '    merge_sort(arr, m + 1, r)',
        '    merge(arr, l, m, r)',
        '# merge compara y escribe en arr[k]'
      ],
      map: { func: 1, recurse: 2, split: 4, recurseLeft: 5, recurseRight: 6, mergeCall: 7, compare: 8, write: 8, done: 1 }
    }
  },
  heap: {
    cpp: {
      lines: [
        'void heapSort(vector<int>& arr) {',
        '  int n = arr.size();',
        '  for (int i = n/2 - 1; i >= 0; i--) heapify(arr, n, i);',
        '  for (int i = n - 1; i > 0; i--) {',
        '    swap(arr[0], arr[i]);',
        '    heapify(arr, i, 0);',
        '  }',
        '}',
        '// heapify: reubica la raiz'
      ],
      map: { func: 1, build: 3, extract: 4, swap: 5, heapify: 6, compare: 9, done: 1 }
    },
    py: {
      lines: [
        'def heap_sort(arr):',
        '    n = len(arr)',
        '    for i in range(n // 2 - 1, -1, -1):',
        '        heapify(arr, n, i)',
        '    for i in range(n - 1, 0, -1):',
        '        arr[0], arr[i] = arr[i], arr[0]',
        '        heapify(arr, i, 0)',
        '# heapify compara nodo con hijos'
      ],
      map: { func: 1, build: 3, extract: 5, swap: 6, heapify: 7, compare: 8, done: 1 }
    }
  }
};

// ─── State ────────────────────────────────────────────────────────────────────
const ORDERS = 8;

const state = {
  // Three arrays, always length ORDERS
  arrays: {
    produccion: [],   // 30–90 min
    entrega:    [],   // 15–60 min
    prioridad:  []    // 1–5
  },
  // The array currently being sorted (a copy)
  baseArray: [],
  steps: [],
  currentStep: -1,
  running: false,
  timer: null,
  runStart: null
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function activeKey() {
  return el.arraySelect.value; // 'produccion' | 'entrega' | 'prioridad'
}

const ARRAY_META = {
  produccion: { label: 'Tiempo de Produccion', min: 30, max: 90 },
  entrega:    { label: 'Tiempo de Entrega',    min: 15, max: 60 },
  prioridad:  { label: 'Prioridad',            min: 1,  max: 5  }
};

function generateArrayValues(key, mode) {
  const { min, max } = ARRAY_META[key];
  if (mode === 'random') {
    return Array.from({ length: ORDERS }, () => randomInt(min, max));
  }
  // Partially sorted: start near-sorted then do a few swaps
  const span = max - min;
  const step = span / (ORDERS - 1);
  const arr = Array.from({ length: ORDERS }, (_, i) => Math.round(min + i * step));
  const swaps = Math.max(1, Math.floor(ORDERS * 0.3));
  for (let k = 0; k < swaps; k++) {
    const i = randomInt(0, ORDERS - 1);
    const j = randomInt(0, ORDERS - 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ─── Tracer factories (unchanged logic) ──────────────────────────────────────
function copyCounts(c) { return { comparisons: c.comparisons, swaps: c.swaps, writes: c.writes }; }

function createTracer() {
  const steps = [];
  const counters = { comparisons: 0, swaps: 0, writes: 0 };
  function push(label, message, arr, marker) {
    steps.push({ label, message, array: arr.slice(), marker: marker || {}, counts: copyCounts(counters) });
  }
  return { steps, counters, push };
}

function traceBubble(input) {
  const arr = input.slice();
  const t = createTracer();
  t.push('func', 'Inicio de Bubble Sort', arr);
  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false;
    t.push('outer', 'Iteracion externa i=' + i, arr);
    t.push('setFlag', 'Se reinicia swapped=False', arr);
    for (let j = 0; j < arr.length - i - 1; j++) {
      t.counters.comparisons++;
      t.push('inner', 'Iteracion interna j=' + j, arr);
      t.push('compare', 'Comparando arr[' + j + '] y arr[' + (j + 1) + ']', arr, { compare: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        t.counters.swaps++;
        t.counters.writes += 2;
        t.push('swap', 'Intercambio de posiciones ' + j + ' y ' + (j + 1), arr, { swap: [j, j + 1] });
        t.push('flagTrue', 'swapped=True', arr);
      }
    }
    t.push('breakCheck', 'Revisando si hubo intercambios', arr);
    if (!swapped) { t.push('breakStmt', 'No hubo cambios, fin anticipado', arr); break; }
  }
  t.push('func', 'Arreglo ordenado', arr);
  return t;
}

function traceSelection(input) {
  const arr = input.slice();
  const t = createTracer();
  t.push('func', 'Inicio de Selection Sort', arr);
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    t.push('outer', 'Iteracion externa i=' + i, arr);
    t.push('minSet', 'min_idx=' + minIdx, arr, { write: [minIdx] });
    for (let j = i + 1; j < arr.length; j++) {
      t.counters.comparisons++;
      t.push('inner', 'Iteracion interna j=' + j, arr);
      t.push('compare', 'Comparando arr[' + j + '] con arr[' + minIdx + ']', arr, { compare: [j, minIdx] });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        t.counters.writes++;
        t.push('minUpdate', 'Nuevo minimo en posicion ' + minIdx, arr, { write: [minIdx] });
      }
    }
    if (minIdx !== i) { [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; t.counters.swaps++; t.counters.writes += 2; }
    t.push('swap', 'Colocando minimo en posicion ' + i, arr, { swap: [i, minIdx] });
  }
  t.push('func', 'Arreglo ordenado', arr);
  return t;
}

function traceInsertion(input) {
  const arr = input.slice();
  const t = createTracer();
  t.push('func', 'Inicio de Insertion Sort', arr);
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    t.counters.writes += 2;
    t.push('outer', 'Iteracion externa i=' + i, arr);
    t.push('keySet', 'key=' + key, arr, { write: [i] });
    t.push('jSet', 'j=' + j, arr);
    while (j >= 0) {
      t.counters.comparisons++;
      t.push('compare', 'Comparando arr[' + j + '] con key', arr, { compare: [j, j + 1] });
      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        t.counters.writes++;
        t.push('shift', 'Desplazando arr[' + j + '] a la derecha', arr, { write: [j + 1] });
        j--;
        t.counters.writes++;
        t.push('jDec', 'Decrementando j', arr);
      } else { break; }
    }
    arr[j + 1] = key;
    t.counters.writes++;
    t.push('insert', 'Insertando key en posicion ' + (j + 1), arr, { write: [j + 1] });
  }
  t.push('func', 'Arreglo ordenado', arr);
  return t;
}

function traceShell(input) {
  const arr = input.slice();
  const t = createTracer();
  t.push('func', 'Inicio de Shell Sort', arr);
  let gap = Math.floor(arr.length / 2);
  t.counters.writes++;
  t.push('gapInit', 'gap inicial=' + gap, arr);
  while (gap > 0) {
    for (let i = gap; i < arr.length; i++) {
      const temp = arr[i];
      let j = i;
      t.counters.writes += 2;
      t.push('outer', 'Recorriendo con i=' + i + ' y gap=' + gap, arr);
      t.push('tempSet', 'temp=' + temp, arr, { write: [i] });
      t.push('jSet', 'j=' + j, arr);
      while (j >= gap) {
        t.counters.comparisons++;
        t.push('compare', 'Comparando arr[' + (j - gap) + '] con temp', arr, { compare: [j - gap, j] });
        if (arr[j - gap] > temp) {
          arr[j] = arr[j - gap];
          t.counters.writes++;
          t.push('shift', 'Desplazando arr[' + (j - gap) + '] a posicion ' + j, arr, { write: [j] });
          j -= gap;
          t.counters.writes++;
          t.push('jDec', 'j = j - gap', arr);
        } else { break; }
      }
      arr[j] = temp;
      t.counters.writes++;
      t.push('insert', 'Insertando temp en posicion ' + j, arr, { write: [j] });
    }
    gap = Math.floor(gap / 2);
    t.counters.writes++;
    t.push('gapHalf', 'Nuevo gap=' + gap, arr);
  }
  t.push('func', 'Arreglo ordenado', arr);
  return t;
}

function traceQuick(input) {
  const arr = input.slice();
  const t = createTracer();
  t.push('func', 'Inicio de Quick Sort', arr);
  function qsort(low, high) {
    t.push('recurse', 'Llamada quick_sort(low=' + low + ', high=' + high + ')', arr);
    if (low >= high) return;
    const pivot = arr[high];
    let i = low - 1;
    t.counters.writes += 2;
    t.push('partitionStart', 'Pivot=' + pivot + ' en indice ' + high, arr, { write: [high] });
    t.push('indexInit', 'Inicializando i=' + i, arr);
    for (let j = low; j < high; j++) {
      t.push('inner', 'Recorriendo j=' + j, arr);
      t.counters.comparisons++;
      t.push('compare', 'Comparando arr[' + j + '] con pivot', arr, { compare: [j, high] });
      if (arr[j] < pivot) {
        i++;
        t.counters.writes++;
        t.push('indexInc', 'Incrementando i=' + i, arr);
        if (i !== j) { [arr[i], arr[j]] = [arr[j], arr[i]]; t.counters.swaps++; t.counters.writes += 2; t.push('swap', 'Intercambio de arr[' + i + '] y arr[' + j + ']', arr, { swap: [i, j] }); }
      }
    }
    const p = i + 1;
    if (p !== high) { [arr[p], arr[high]] = [arr[high], arr[p]]; t.counters.swaps++; t.counters.writes += 2; }
    t.push('pivotSwap', 'Ubicando pivot en posicion final ' + p, arr, { swap: [p, high] });
    t.push('recurseLeft', 'Subarreglo izquierdo [' + low + ', ' + (p - 1) + ']', arr);
    qsort(low, p - 1);
    t.push('recurseRight', 'Subarreglo derecho [' + (p + 1) + ', ' + high + ']', arr);
    qsort(p + 1, high);
  }
  qsort(0, arr.length - 1);
  t.push('done', 'Arreglo ordenado', arr);
  return t;
}

function traceMerge(input) {
  const arr = input.slice();
  const t = createTracer();
  t.push('func', 'Inicio de Merge Sort', arr);
  function merge(l, m, r) {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    t.counters.writes += 3;
    t.push('mergeCall', 'Combinando [' + l + ', ' + m + '] y [' + (m + 1) + ', ' + r + ']', arr);
    while (i < left.length && j < right.length) {
      t.counters.comparisons++;
      t.push('compare', 'Comparando left[' + i + '] y right[' + j + ']', arr, { compare: [k] });
      arr[k] = left[i] <= right[j] ? (i++, left[i - 1]) : (j++, right[j - 1]);
      t.counters.writes += 2;
      t.push('write', 'Escribiendo en arr[' + k + ']', arr, { write: [k] });
      k++; t.counters.writes++;
    }
    while (i < left.length)  { arr[k] = left[i++];  t.counters.writes += 2; t.push('write', 'Copiando restante izq en arr[' + k + ']', arr, { write: [k++] }); t.counters.writes += 2; }
    while (j < right.length) { arr[k] = right[j++]; t.counters.writes += 2; t.push('write', 'Copiando restante der en arr[' + k + ']', arr, { write: [k++] }); t.counters.writes += 2; }
  }
  function msort(l, r) {
    t.push('recurse', 'Llamada merge_sort(l=' + l + ', r=' + r + ')', arr);
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    t.counters.writes++;
    t.push('split', 'Punto medio m=' + m, arr);
    t.push('recurseLeft', 'Recursion izquierda', arr);
    msort(l, m);
    t.push('recurseRight', 'Recursion derecha', arr);
    msort(m + 1, r);
    merge(l, m, r);
  }
  msort(0, arr.length - 1);
  t.push('done', 'Arreglo ordenado', arr);
  return t;
}

function traceHeap(input) {
  const arr = input.slice();
  const t = createTracer();
  t.push('func', 'Inicio de Heap Sort', arr);
  function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    t.counters.writes += 3;
    t.push('heapify', 'heapify(n=' + n + ', i=' + i + ')', arr);
    if (left < n) {
      t.counters.comparisons++;
      t.push('compare', 'Comparando hijo izq con raiz', arr, { compare: [left, largest] });
      if (arr[left] > arr[largest]) { largest = left; t.counters.writes++; }
    }
    if (right < n) {
      t.counters.comparisons++;
      t.push('compare', 'Comparando hijo der con mayor actual', arr, { compare: [right, largest] });
      if (arr[right] > arr[largest]) { largest = right; t.counters.writes++; }
    }
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      t.counters.swaps++;
      t.counters.writes += 2;
      t.push('swap', 'Intercambio en heap: ' + i + ' <-> ' + largest, arr, { swap: [i, largest] });
      heapify(n, largest);
    }
  }
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) { t.push('build', 'Construyendo heap desde i=' + i, arr); heapify(n, i); }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    t.counters.swaps++;
    t.counters.writes += 2;
    t.push('extract', 'Extrayendo maximo a posicion ' + i, arr, { swap: [0, i] });
    heapify(i, 0);
  }
  t.push('done', 'Arreglo ordenado', arr);
  return t;
}

// ─── Build trace for currently selected array ─────────────────────────────────
function buildTrace() {
  const key = activeKey();
  state.baseArray = state.arrays[key].slice();

  const algorithm = el.algorithm.value;
  let traced;
  if (algorithm === 'bubble')    traced = traceBubble(state.baseArray);
  if (algorithm === 'selection') traced = traceSelection(state.baseArray);
  if (algorithm === 'insertion') traced = traceInsertion(state.baseArray);
  if (algorithm === 'shell')     traced = traceShell(state.baseArray);
  if (algorithm === 'quick')     traced = traceQuick(state.baseArray);
  if (algorithm === 'merge')     traced = traceMerge(state.baseArray);
  if (algorithm === 'heap')      traced = traceHeap(state.baseArray);

  state.steps = traced.steps;
  state.currentStep = -1;
  state.runStart = null;

  updateStepCounter();
  updateMetrics({ comparisons: 0, swaps: 0, writes: 0 }, true);
  renderBars(state.baseArray, {});
  renderCode(null);
  renderTable(state.baseArray, {});
  updateArrayTitle();
}

// ─── UI helpers ──────────────────────────────────────────────────────────────
function updateArrayTitle() {
  el.arrayTitle.textContent = ARRAY_META[activeKey()].label;

  // Highlight the active column header in the table
  const ths = document.querySelectorAll('#ordersTable thead th');
  const colMap = { produccion: 1, entrega: 2, prioridad: 3 };
  ths.forEach((th, i) => th.classList.toggle('active-col', i === colMap[activeKey()]));
}

function updateStepCounter() {
  el.stepCounter.textContent = (state.currentStep + 1) + ' / ' + state.steps.length;
}

function calcApproxMs(counts) {
  return (counts.comparisons * 0.004 + counts.swaps * 0.012 + counts.writes * 0.003).toFixed(2) + ' ms';
}

function updateMetrics(counts, resetReal) {
  el.comparisons.textContent = counts.comparisons;
  el.swaps.textContent = counts.swaps;
  el.writes.textContent = counts.writes;
  el.approxTime.textContent = calcApproxMs(counts);
  if (resetReal) el.realTime.textContent = '0.00 ms';
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
             .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function renderCode(activeLabel) {
  const algorithm = el.algorithm.value;
  const language  = el.language.value;
  const bundle    = codeLibrary[algorithm][language];
  const activeLine = activeLabel ? bundle.map[activeLabel] : -1;

  el.codeBlock.innerHTML = bundle.lines.map((line, idx) => {
    const lineNo = idx + 1;
    const cls = lineNo === activeLine ? 'code-line active' : 'code-line';
    return '<span class="' + cls + '">' + String(lineNo).padStart(2, '0') + '  ' + escapeHtml(line) + '</span>';
  }).join('');
}

// ─── Bar rendering (with value label on top) ─────────────────────────────────
function renderBars(values, marker) {
  const max = Math.max(...values, 1);
  const compareSet = new Set((marker.compare || []).map(String));
  const swapSet    = new Set((marker.swap    || []).map(String));
  const writeSet   = new Set((marker.write   || []).map(String));

  el.bars.innerHTML = values.map((value, index) => {
    let wrapCls = 'bar-wrap';
    if (compareSet.has(String(index))) wrapCls += ' compare';
    else if (swapSet.has(String(index))) wrapCls += ' swap';
    else if (writeSet.has(String(index))) wrapCls += ' write';

    const hPct = Math.max(4, (value / max) * 100);
    return (
      '<div class="' + wrapCls + '">' +
        '<span class="bar-label">' + value + '</span>' +
        '<div class="bar" style="height:' + hPct + '%" title="i=' + index + ' v=' + value + '"></div>' +
      '</div>'
    );
  }).join('');
}

// ─── Table rendering ──────────────────────────────────────────────────────────
// The table always shows the live state of ALL three arrays.
// The "sorted" column values come from the step snapshot; the other two columns
// stay at their original (unsorted) values so you can track their IDs visually.
function renderTable(sortedValues, marker) {
  const key = activeKey();
  const compareSet = new Set((marker.compare || []).map(String));
  const swapSet    = new Set((marker.swap    || []).map(String));
  const writeSet   = new Set((marker.write   || []).map(String));

  // Build a per-position lookup: sortedValues[pos] = value in the sorted column
  // The other arrays keep their original order (by logical pedido position)
  const rows = [];
  for (let i = 0; i < ORDERS; i++) {
    const prod     = key === 'produccion' ? sortedValues[i] : state.arrays.produccion[i];
    const entrega  = key === 'entrega'    ? sortedValues[i] : state.arrays.entrega[i];
    const prioridad= key === 'prioridad'  ? sortedValues[i] : state.arrays.prioridad[i];

    let cellCls = '';
    if (compareSet.has(String(i))) cellCls = 'cell-compare';
    else if (swapSet.has(String(i))) cellCls = 'cell-swap';
    else if (writeSet.has(String(i))) cellCls = 'cell-write';

    rows.push({ id: i + 1, prod, entrega, prioridad, cellCls });
  }

  el.ordersBody.innerHTML = rows.map(r => {
    // Only highlight the active sorted column
    const pCls  = key === 'produccion' && r.cellCls ? r.cellCls : '';
    const eCls  = key === 'entrega'    && r.cellCls ? r.cellCls : '';
    const prCls = key === 'prioridad'  && r.cellCls ? r.cellCls : '';

    return (
      '<tr>' +
        '<td class="cell-id">' + r.id + '</td>' +
        '<td class="' + pCls  + '">' + r.prod     + '</td>' +
        '<td class="' + eCls  + '">' + r.entrega  + '</td>' +
        '<td class="' + prCls + '">' + r.prioridad + '</td>' +
      '</tr>'
    );
  }).join('');
}

// ─── Playback ─────────────────────────────────────────────────────────────────
function applyStep(stepIndex) {
  const step = state.steps[stepIndex];
  renderBars(step.array, step.marker);
  renderCode(step.label);
  renderTable(step.array, step.marker);
  updateMetrics(step.counts, false);
  if (state.runStart !== null) {
    el.realTime.textContent = (performance.now() - state.runStart).toFixed(2) + ' ms';
  }
  updateStepCounter();
}

function stopRun() {
  state.running = false;
  if (state.timer) { clearInterval(state.timer); state.timer = null; }
}

function nextStep() {
  if (state.currentStep + 1 >= state.steps.length) { stopRun(); return; }
  if (state.runStart === null) state.runStart = performance.now();
  state.currentStep += 1;
  applyStep(state.currentStep);
  if (state.currentStep + 1 >= state.steps.length) stopRun();
}

function startRun() {
  if (state.running) return;
  if (!state.steps.length) return;
  state.running = true;
  state.timer = setInterval(nextStep, Number(el.speed.value));
}

function resetSimulation() {
  stopRun();
  state.currentStep = -1;
  state.runStart = null;
  renderBars(state.baseArray, {});
  renderCode(null);
  renderTable(state.baseArray, {});
  updateMetrics({ comparisons: 0, swaps: 0, writes: 0 }, true);
  updateStepCounter();
}

function regenerateAll() {
  const mode = el.inputMode.value;
  state.arrays.produccion = generateArrayValues('produccion', mode);
  state.arrays.entrega    = generateArrayValues('entrega',    mode);
  state.arrays.prioridad  = generateArrayValues('prioridad',  mode);
  buildTrace();
}

// ─── Event listeners ──────────────────────────────────────────────────────────
el.speed.addEventListener('input', () => {
  el.speedValue.textContent = el.speed.value;
  if (state.running) { stopRun(); startRun(); }
});

el.algorithm.addEventListener('change', () => buildTrace());
el.arraySelect.addEventListener('change', () => buildTrace());

el.language.addEventListener('change', () => {
  const label = state.currentStep >= 0 ? state.steps[state.currentStep].label : null;
  renderCode(label);
});

el.generateBtn.addEventListener('click', regenerateAll);
el.startBtn.addEventListener('click', startRun);
el.resetBtn.addEventListener('click', resetSimulation);

// ─── Init ─────────────────────────────────────────────────────────────────────
regenerateAll();
