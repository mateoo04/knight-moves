let board = [];

function knightMoves(start, goal) {
  for (let r = 0; r < 8; r++) {
    board.push([]);
    for (let c = 0; c < 8; c++) {
      board[r].push([]);
    }
  }

  let queue = [];
  queue.push(start);

  while (queue.length !== 0) {
    const current = queue.shift();

    const result = nextMove(current, goal);
    if (result === goal) {
      const path = getPath(start, goal);

      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach((move) => console.log(move));
      return;
    }

    queue = queue.concat(result);
  }
}

function nextMove(startPosition, goal) {
  const x = startPosition[0];
  const y = startPosition[1];
  const goalX = goal[0];
  const goalY = goal[1];

  const moves = [
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  let queue = [];

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];

    const newX = x + move[0];
    const newY = y + move[1];

    if (
      newX >= 0 &&
      newX <= 7 &&
      newY >= 0 &&
      newY <= 7 &&
      board[newX][newY].length === 0
    ) {
      board[newX][newY] = [x, y];
      if (newX === goalX && newY === goalY) return goal;
      queue.push([newX, newY]);
    }
  }

  return queue;
}

function getPath(startPosition, current) {
  let path = [];

  while (
    path.length === 0 ||
    path[0][0] !== startPosition[0] ||
    path[0][1] !== startPosition[1]
  ) {
    path.unshift(current);
    current = board[current[0]][current[1]];
  }

  return path;
}

knightMoves([3, 3], [4, 3]);
