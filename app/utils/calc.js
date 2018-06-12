const getCost = (map, route) => {
  if (!route || route.length < 2) {
    return null;
  }
  const cost = map[route[0]][route[1]];
  if (!cost) {
    return null;
  }
  if (route.length === 2) {
    return cost;
  }
  const nextCost = getCost(map, route.slice(1));
  if (!nextCost) {
    return null;
  }
  return cost + nextCost;
};

const getCountRoutes = (map, start, end, stops = 0, routesUsed = []) => {
  if (routesUsed.indexOf(start + end) > -1) {
    return 0;
  }
  let result = 0;
  if ((map[start] || {})[end]) {
    result += 1;
  }
  if (stops && routesUsed.length === stops - 1) {
    return result;
  }
  const keys = Object.keys(map[start]);
  for (let i = 0; i < keys.length; i += 1) {
    if (!(keys[i] === end || routesUsed.indexOf(start + keys[i]) > -1)) {
      result += getCountRoutes(map, keys[i], end, stops, routesUsed.concat(start + keys[i]));
    }
  }
  return result;
};

const bestRoute = (map, start, end, stops = 0, cost = 0, routes = [], cheapest = 0) => {
  let cheapestRoute = [];
  let cheapestCost = cheapest;
  const directCost = (map[start] || {})[end];
  if (directCost && (cheapest < 1 || cost + directCost < cheapest)) {
    cheapestCost = cost + directCost;
    cheapestRoute = routes.concat(start + end);
  }
  if (stops < 1 || routes.length < stops - 1) {
    const keys = Object.keys(map[start]);
    for (let i = 0; i < keys.length; i += 1) {
      if (!(keys[i] === end || routes.indexOf(start + keys[i]) > -1)) {
        const moveCost = map[start][keys[i]];
        if (cheapestCost < 1 || cost + moveCost < cheapestCost) {
          const result = bestRoute(map, keys[i], end, stops, cost + moveCost, routes.concat(start + keys[i]), cheapestCost);
          if (cheapestCost < 1 || result.cost < cheapestCost) {
            cheapestCost = result.cost;
            cheapestRoute = result.route;
          }
        }
      }
    }
  }
  return {
    cost: cheapestCost,
    route: cheapestRoute,
  };
};

export { getCost, getCountRoutes, bestRoute };
