import React, {useRef, useState, useEffect} from "react";
import img from "./../assets/galaxy.jpg";
let imgObj = new Image();
imgObj.src = img;
let nw = imgObj.naturalWidth;
let nh = imgObj.naturalHeight;
export const ImgCanvas = () => {
  const myCanvasRef = useRef(null);
  const w = useRef(600);
  const h = useRef(400);

  const draw = (ctx, canvas) => {
    ctx.drawImage(imgObj, 0, 0, w.current, h.current);
  };

  const getImgData = (ctx, canvas) => {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let arr = imgData.data;
    for (let i = 0; i < arr.length; i = i + 4) {
      let ttl = arr[i] + arr[i + 1] + arr[i + 2];
      let avg = parseInt(ttl / 3);
      arr[i] = avg;
      arr[i + 1] = avg;
      arr[i + 2] = avg;
    }

    ctx.putImageData(imgData, 0, 0);
  };

  useEffect(() => {
    const canvas = myCanvasRef.current;
    canvas.width = w.current;
    canvas.height = h.current;
    let aspect = nw / nh;
    h.current = w.current / aspect;

    const ctx = canvas.getContext("2d");

    let animCancel;
    let timeoutCancel;
    draw(ctx);
    getImgData(ctx, canvas);
    // console.log("a");
    // const render = () => {
    //   draw(ctx);
    //   console.log("b");

    //   timeoutCancel = setTimeout(() => {
    //     animCancel = window.requestAnimationFrame(render);
    //   }, 1000 / 10);
    // };
    // render();
    return () => {
      clearTimeout(timeoutCancel);
      window.cancelAnimationFrame(animCancel);
      return;
    };
  }, [draw]);
  return (
    <section className="img_can_wrapper">
      <canvas className="img_canvas" ref={myCanvasRef}></canvas>
      {/* <img className="img" src={img} alt="galaxy" /> */}
    </section>
  );
};
