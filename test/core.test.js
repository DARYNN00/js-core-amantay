import { describe, it, expect } from 'vitest';
import { unique, groupBy, chunk, deepClone, memoize, counter } from '../src/functions.js';
import { Store, SortedStore } from '../src/Store.js';

describe('Lab 4 Tests', () => {
  it('1. unique removes duplicates', () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });

  it('2. unique handles empty array', () => {
    expect(unique([])).toEqual([]);
  });

  it('3. groupBy groups objects correctly', () => {
    const data = [{age: 20}, {age: 20}, {age: 25}];
    expect(groupBy(data, 'age')).toEqual({
      20: [{age: 20}, {age: 20}],
      25: [{age: 25}]
    });
  });

  it('4. chunk splits array by size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('5. chunk handles zero or invalid size gracefully', () => {
    expect(chunk([1, 2], 0)).toEqual([]);
  });

  it('6. deepClone copies nested objects deeply', () => {
    const obj = { a: { b: 2 } };
    const clone = deepClone(obj);
    clone.a.b = 10;
    expect(obj.a.b).toBe(2);
  });

  it('7. deepClone handles primitives and null', () => {
    expect(deepClone(null)).toBeNull();
    expect(deepClone(5)).toBe(5);
  });

  it('8. memoize caches function results', () => {
    let calls = 0;
    const fn = memoize((x) => { calls++; return x * 2; });
    expect(fn(5)).toBe(10);
    expect(fn(5)).toBe(10);
    expect(calls).toBe(1);
  });

  it('9. counter works with inc, dec, and getter value', () => {
    const c = counter();
    expect(c.value).toBe(0);
    c.inc();
    c.inc();
    expect(c.value).toBe(2);
    c.dec();
    expect(c.value).toBe(1);
  });

  it('10. Store manages items correctly', () => {
    const store = new Store();
    store.add('apple');
    store.add('banana');
    expect(store.total()).toBe(2);
    expect(store.find(i => i === 'banana')).toBe('banana');
    store.remove(i => i === 'apple');
    expect(store.total()).toBe(1);
  });

  it('11. Store static method works', () => {
    const store = Store.createEmpty();
    expect(store.total()).toBe(0);
  });

  it('12. SortedStore inherits and works via super', () => {
    const sorted = new SortedStore();
    sorted.add('test');
    expect(sorted.total()).toBe(1);
  });
});