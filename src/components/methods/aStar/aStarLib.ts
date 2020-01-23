// javascript-astar 0.4.1
// http://github.com/bgrins/javascript-astar
// Freely distributable under the MIT License.
// Implements the astar search algorithm in javascript using a Binary Heap.
// Includes Binary Heap (with modifications) from Marijn Haverbeke.
// http://eloquentjavascript.net/appendix2.html
// Converted to TS and ES6 by Jaspreet Singh

import { BinaryHeap, pathTo, GridNode, Graph } from "./binaryHeap";
import {
  colorSquare,
  done,
  sourcePoint,
  makeLine,
  colorGrid
} from "../methodDraw";

// See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
const heuristicFns = {
  manhattan: function(pos0: GridNode, pos1: GridNode) {
    var d1 = Math.abs(pos1.x - pos0.x);
    var d2 = Math.abs(pos1.y - pos0.y);
    return d1 + d2;
  },
  diagonal: function(pos0: GridNode, pos1: GridNode) {
    var D = 1;
    var D2 = Math.sqrt(2);
    var d1 = Math.abs(pos1.x - pos0.x);
    var d2 = Math.abs(pos1.y - pos0.y);
    return D * (d1 + d2) + (D2 - 2 * D) * Math.min(d1, d2);
  }
};

type heuristicFn = (node1: GridNode, node2: GridNode) => number;

/**
 * Perform an A* Search on a given graph, with a start:source and end node: destination.
 */
const aStarSearch = function(
  graph: Graph,
  startNode: GridNode,
  targetNode: GridNode,
  waitFor: number,
  options?: {
    closest: null | boolean;
    heuristic: null | heuristicFn;
  }
) {
  let totalWaitFor = waitFor;
  options = options || { closest: false, heuristic: heuristicFns.manhattan };
  let heuristic = options.heuristic || heuristicFns.manhattan;
  const closest = options.closest || false;

  const scoreFn = function(node: GridNode) {
    return node.f;
  };
  const openHeap = new BinaryHeap(scoreFn);
  let closestNode = startNode; // set the start node to be the closest if required

  startNode.h = heuristic(startNode, targetNode);
  graph.markDirty(startNode);

  openHeap.push(startNode);

  while (openHeap.size() > 0) {
    // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
    const currentNode = openHeap.pop();

    // End case -- result has been found, return the traced path.
    if (currentNode === targetNode) {
      return { result: pathTo(currentNode), waitFor: totalWaitFor };
    }

    // Normal case -- move currentNode from open to closed, process each of its neighbors.
    currentNode.closed = true;

    // Find all neighbors for the current node.
    const neighbors = graph.neighbors(currentNode);

    for (let i = 0, il = neighbors.length; i < il; ++i) {
      const neighbor = neighbors[i];
      if (neighbor.closed || neighbor.isWall()) {
        // Not a valid node to process, skip to next neighbor.
        continue;
      }

      // The g score is the shortest distance from start to current node.
      // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
      const gScore = currentNode.g + neighbor.getCost(currentNode);
      const beenVisited = neighbor.visited;

      if (!beenVisited || gScore < neighbor.g) {
        // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
        neighbor.visited = true;
        neighbor.parent = currentNode;
        neighbor.h = neighbor.h || heuristic(neighbor, targetNode);
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
        graph.markDirty(neighbor);
        totalWaitFor += waitFor;
        colorSquare(totalWaitFor, neighbor.x, neighbor.y, "visited");
        if (closest) {
          // If the neighbour is closer than the current closestNode or if it's equally close but has
          // a cheaper path than the current closest node then it becomes the closest node
          if (
            neighbor.h < closestNode.h ||
            (neighbor.h === closestNode.h && neighbor.g < closestNode.g)
          ) {
            closestNode = neighbor;
          }
        }

        if (!beenVisited) {
          // Pushing to heap will put it in proper place based on the 'f' value.
          openHeap.push(neighbor);
        } else {
          // Already seen the node, but since it has been rescored we need to reorder it in the heap
          openHeap.rescoreElement(neighbor);
        }
      }
    }
  }

  if (closest) {
    return { result: pathTo(closestNode), waitFor: totalWaitFor };
  }

  // No result was found - empty array signifies failure to find path.
  return { result: [], waitFor: totalWaitFor };
};

export default {
  aStarSearch,
  Graph
};
