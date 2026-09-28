// 1. unique(arr) — массив без дубликатов
export function unique(arr) {
  return [...new Set(arr)];
}

// 2. groupBy(arr, keyFn) — группировка объектов по ключу
export function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = typeof keyFn === 'function' ? keyFn(item) : item[keyFn];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

// 3. chunk(arr, size) — разбить массив на куски по size
export function chunk(arr, size) {
  if (size <= 0) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// 4. deepClone(obj) — глубокая копия без JSON-методов
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  const cloned = {};
  for (const key of Object.keys(obj)) {
    cloned[key] = deepClone(obj[key]);
  }
  return cloned;
}

// 5. memoize(fn) — кэширование на замыкании
export function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// 6. counter() — фабрика, возвращающая объект с методами (замыкание)
export function counter() {
  let count = 0;
  return {
    inc: () => ++count,
    dec: () => --count,
    get value() {
      return count;
    }
  };
}