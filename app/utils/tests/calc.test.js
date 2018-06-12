import { getCost, getCountRoutes, bestRoute } from 'utils/calc';

const map = {
  A: { B: 1, C: 4, D: 10 },
  B: { E: 3 },
  C: { D: 4, F: 2 },
  D: { E: 1 },
  E: { B: 3, A: 2 },
  F: { D: 1 },
};

test('getCost returns cost of route', () => {
  expect(getCost(map, ['E', 'A', 'C', 'F', 'D'])).toBe(2 + 4 + 2 + 1);
  expect(getCost(map, ['E'])).toBeNull();
  expect(getCost(map, ['E', 'A', 'E'])).toBeNull();
});

test('getCountRoutes returns count of routes between 2 cities', () => {
  expect(getCountRoutes(map, 'E', 'D')).toBe(6);
  expect(getCountRoutes(map, 'E', 'D', 4)).toBe(4);
  expect(getCountRoutes(map, 'E', 'E')).toBe(5);
});

test('bestRoute returns the cheapest route between 2 cities', () => {
  expect(bestRoute(map, 'E', 'D').cost).toBe(9);
  expect(bestRoute(map, 'E', 'E').cost).toBe(6);
});
