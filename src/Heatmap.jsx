import React, { useRef, useEffect, useState } from "react";
function Heatmap({ rows, cols }) {
  const canvasRef = useRef(null);
  const [data, setData] = useState([]);
  const cellSize = 25;
  const width = cols * cellSize;
  const height = rows * cellSize;
  const generateRandomMatrix = () => {
    const mat = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push(Math.floor(Math.random() * 101));
      }
      mat.push(row);
    }
    return mat;
  };
  const getColor = (value) => {
    const red = Math.floor((value / 100) * 255);
    const blue = 255 - red;
    return `rgb(${red}, 50, ${blue})`;
  };
  useEffect(() => {
    setData(generateRandomMatrix());
  }, []);
  useEffect(() => {
    if (!data.length) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        ctx.fillStyle = getColor(data[r][c]);
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        ctx.strokeStyle = "white";
        ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }, [data, rows, cols, width, height]);
  const [hoverValue, setHoverValue] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const handleHover = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const c = Math.floor(x / cellSize);
    const r = Math.floor(y / cellSize);

    if (r >= 0 && r < rows && c >= 0 && c < cols) {
      setHoverValue(data[r][c]);
      setHoverPos({ x: c * cellSize, y: r * cellSize });
    } else {
      setHoverValue(null);
    }
  };

  return (
    <div className="heatmap-wrapper">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleHover}
        className="heatmap-canvas"></canvas>

      <div style={{ marginTop: 12 }}>
        <button
          className="btn"
          onClick={() => setData(generateRandomMatrix())}>
          🔄 Refresh Data
        </button>
        <button
          className="btn secondary"
          onClick={() => setData((d) => d.length ? d.map(row => row.map(v => Math.max(0, Math.min(100, v + Math.floor((Math.random()-0.5)*40))))) : generateRandomMatrix())}
          style={{ marginLeft: 8 }}>
          ✨ Mutate Data
        </button>
      </div>

      {hoverValue !== null && (
        <div
          className="tooltip"
          style={{
            left: hoverPos.x + 30,
            top: hoverPos.y + 30,
          }}>
          Value: {hoverValue}
        </div>
      )}
    </div>
  );
}

export default Heatmap;
