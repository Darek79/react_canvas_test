/* eslint-disable */
import React, {useEffect, useRef, useState} from "react";

export const Canvas = () => {
  console.log(window.innerWidth / 2);
  const canvasRef = useRef(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const counterRef = useRef(0);
  const posXRef = useRef(window.innerWidth / 2);
  const posYRef = useRef(window.innerHeight / 2);
  const angleRef = useRef(0);
  const scaleRef = useRef(10);
  const radiusRef = useRef(0);
  const sizeRef = useRef(5);
  const canY = useRef(0);
  const [click, setClick] = useState(false);

  const mouseClick = () => {
    setClick((p) => !p);
  };
  const mouseMove = () => {};

  const draw = (ctx, frame) => {
    ctx.fillStyle = `hsl(${Math.floor(Math.random() * 255 + 1)},30%,50%)`;

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(posXRef.current, posYRef.current, sizeRef.current, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    let frameC = 5;
    let animCancel;
    let timeoutCancel;

    const render = () => {
      draw(ctx, frameC);
      timeoutCancel = setTimeout(() => {
        if (sizeRef.current < 100) {
          sizeRef.current += 0.2;
        }
        angleRef.current = counterRef.current * 0.5;
        radiusRef.current = scaleRef.current * Math.sqrt(angleRef.current);
        posXRef.current += radiusRef.current * Math.sin(angleRef.current);
        posYRef.current += radiusRef.current * Math.cos(angleRef.current);
        // console.log(Math.floor(posXRef.current));
        counterRef.current++;
        console.log(counterRef.current);

        // angleRef.current +=
        // 	0.1 > -0.9 ? (angleRef.current += 0.1) : (angleRef.current -= 0.1);
        if (counterRef.current < 600) {
          animCancel = window.requestAnimationFrame(render);
        }
      }, 1000 / 40);
    };

    if (click) {
      render();
    }

    return () => {
      window.cancelAnimationFrame(animCancel);
      clearTimeout(timeoutCancel);
    };
  }, [draw, click]);

  return (
    <section className="canvas_wrapper" onClick={mouseClick}>
      {console.log(click)}
      <canvas
        onMouseMove={mouseMove}
        className="canvas"
        ref={canvasRef}
      ></canvas>
 
    </section>
  );
};
