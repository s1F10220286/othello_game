import { useState, useEffect } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [gameStarted, setGameStarted] = useState(false);
  const [turnColor, setTurnColor] = useState(1);
  const [gameResult, setGameResult] = useState('');

  const directions = [
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
  ];

  useEffect(() => {
    if (turnColor === 2 && gameStarted) {
      setTimeout(() => cpuMove(), 500);
    }
  }, [turnColor, gameStarted]);




  
  const checkGameEnd = (board) => {
    let blackCount = 0;
    let whiteCount = 0;
    let gameEnded = true;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (board[y][x] === 0) {
          gameEnded = false;
        } else if (board[y][x] === 1) {
          blackCount++;
        } else if (board[y][x] === 2) {
          whiteCount++;
        }
      }
    }
    if (gameEnded) {
      let resultMessage = `黒の合計枚数は ${blackCount} 枚、白の合計枚数は ${whiteCount} 枚です。`;
      if (blackCount > whiteCount) {
        resultMessage += '黒の勝ちです。';
      } else if (whiteCount > blackCount) {
        resultMessage += '白の勝ちです。';
      } else {
        resultMessage += '引き分けです。';
      }
      setGameResult(resultMessage);
    }
    return gameEnded;
  };

  const resetGame = () => {
    setBoard([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    setTurnColor(1);
    setGameResult('');
    setGameStarted(false);
  };

  const clickCell = (x, y) => {
    if (turnColor === 1) {
      makeMove(x, y);
    }
  };

  const makeMove = (x, y) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    let moved = false;

    if (newBoard[y][x] === 0) {
      for (const direction of directions) {
        for (let distance = 1; distance < 8; distance++) {
          if (newBoard[y + direction[0] * distance] === undefined) {
            break;
          } else {
            if (newBoard[y + direction[0] * distance][x + direction[1] * distance] === undefined) {
              break;
            } else if (newBoard[y + direction[0] * distance][x + direction[1] * distance] === 0) {
              break;
            } else if (
              newBoard[y + direction[0] * distance][x + direction[1] * distance] === turnColor
            ) {
              if (distance > 1) {
                for (let back = distance; back >= 0; back--) {
                  newBoard[y + direction[0] * back][x + direction[1] * back] = turnColor;
                }
                moved = true;
              }
              break;
            } else if (
              newBoard[y + direction[0] * distance][x + direction[1] * distance] ===
              3 - turnColor
            ) {
              continue;
            }
          }
        }
      }

      if (moved) {
        setBoard(newBoard);
        setTurnColor(3 - turnColor);
        if (checkGameEnd(newBoard)) {
          alert('試合が終わりました');
        }
      }
    }
  };

  const cpuMove = () => {
    const validMoves = [];
    let maxFlips = 0;
    let bestMove = null;

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const tempBoard = JSON.parse(JSON.stringify(board));
        const tempTurnColor = turnColor;
        let moved = false;
        let flips = 0;

        if (tempBoard[y][x] === 0) {
          for (const direction of directions) {
            for (let distance = 1; distance < 8; distance++) {
              if (tempBoard[y + direction[0] * distance] === undefined) {
                break;
              } else {
                if (
                  tempBoard[y + direction[0] * distance][x + direction[1] * distance] === undefined
                ) {
                  break;
                } else if (
                  tempBoard[y + direction[0] * distance][x + direction[1] * distance] === 0
                ) {
                  break;
                } else if (
                  tempBoard[y + direction[0] * distance][x + direction[1] * distance] ===
                  tempTurnColor
                ) {
                  if (distance > 1) {
                    for (let back = distance; back >= 0; back--) {
                      tempBoard[y + direction[0] * back][x + direction[1] * back] = tempTurnColor;
                      flips++;
                    }
                    moved = true;
                  }
                  break;
                } else if (
                  tempBoard[y + direction[0] * distance][x + direction[1] * distance] ===
                  3 - tempTurnColor
                ) {
                  continue;
                }
              }
            }
          }
          if (moved) {
            if (flips > maxFlips) {
              maxFlips = flips;
              bestMove = { x, y };
            }
          }
        }
      }
    }

    if (bestMove) {
      makeMove(bestMove.x, bestMove.y);
    } else {
      setTurnColor(3 - turnColor);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className={styles.container}>
      ゲーム
      {!gameStarted ? (
        <button onClick={startGame} className={styles.startButton}>
          ゲームをスタート
        </button>
      ) : (
        <>
          <div className={styles.board}>
            {board.map((row, y) =>
              row.map((color, x) => (
                <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickCell(x, y)}>
                  {color !== 0 && (
                    <div
                      className={styles.stone}
                      style={{ backgroundColor: color === 1 ? '#000' : '#fff' }}
                    />
                  )}
                </div>
              )),
            )}
          </div>
          {gameResult && <div className={styles.result}>{gameResult}</div>}
          <button onClick={resetGame} className={styles.resetButton}>
            ゲームをリセット
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
