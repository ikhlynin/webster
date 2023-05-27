import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { fabric } from "fabric";

import { Context } from "../../index.js";
import { SideBar } from "../../widgets/SideBar";
import { UpperBar } from "../../widgets/UpperBar";

import photo1 from "./assets/kshoty.jpg";
import photo2 from "./assets/kalyan.jpg";
// import photo from "./assets/univers.jpg";

import "./style.css";

const EditorPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [drawMode, setDrawMode] = useState(false);

  const canvasName = location.state.canvasName;
  const canvasWidth = location.state.canvasWidth;
  const canvasHeight = location.state.canvasHeight;
  const canvasBackColor = location.state.canvasBackColor;
  const canvasMode = location.state.mode;
  const photo = location.state.image

  const fabricRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  /////////////////////////////////////////////Создание фигур/////////////////////////////////////
  const onAddRectangle = (color, borderCol, type) => {
    var rect = new fabric.Rect({
      top: fabricRef.current.height / 2 - fabricRef.current.height / 4,
      left: fabricRef.current.width / 2 - fabricRef.current.width / 4,
      width: type === 1 ? fabricRef.current.width / 7 : fabricRef.current.width / 10,
      height: fabricRef.current.width / 10,
      stroke: borderCol,
      strokeWidth: 2,
      fill: color
    });

    fabricRef.current.add(rect);
  };
  const onAddCircle = (color, borderCol) => {
    var circle = new fabric.Circle({
      radius: fabricRef.current.width / 20,
      fill: color,
      top: fabricRef.current.height / 2 - fabricRef.current.height / 4,
      left: fabricRef.current.width / 2 - fabricRef.current.width / 4,
      stroke: borderCol,
      strokeWidth: 3
    });
    fabricRef.current.add(circle);
  };
  const onAddEllipse = (color, borderCol) => {
    var ellipse = new fabric.Ellipse({
      rx: fabricRef.current.width / 14,
      ry: fabricRef.current.width / 20,
      fill: color,
      stroke: borderCol,
      strokeWidth: 3
    });
    fabricRef.current.add(ellipse);
  };

  const onDeleteObjects = () => {
    fabricRef.current.getActiveObjects().forEach((obj) => {
      fabricRef.current.remove(obj)
    });
    fabricRef.current.discardActiveObject().renderAll()
  };

  React.useEffect(() => {

    // const canvasWidth = localStorage.getItem("canvasWidth");
    // const canvasHeight = localStorage.getItem("canvasHeight");
    // const canvasBackColor = localStorage.getItem("canvasBackColor");

    // localStorage.clear()
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth || window.innerWidth * 0.7,
      height: canvasHeight || window.innerHeight * 0.8, // размеры холста
      backgroundColor: canvasBackColor || null, //цвет холста
    });
    const savedCanvasState = localStorage.getItem("canvasState");
    if (savedCanvasState) {
      if (canvasMode === 1) {
        fabricRef.current.loadFromJSON(savedCanvasState, () => {
          const img = new Image();
          img.src = photo;
          img.onload = () => {
            const maxWidth = window.innerWidth * 0.7;
            const maxHeight = window.innerHeight * 0.8;

            if (img.width > maxWidth || img.height > maxHeight) {
              const scaleFactor = Math.min(
                maxWidth / img.width,
                maxHeight / img.height
              );
              //   console.log(scaleFactor);
              fabricRef.current.setWidth(img.width * scaleFactor);
              fabricRef.current.setHeight(img.height * scaleFactor);

              saveCanvasState();
            } else {
              fabricRef.current.setWidth(img.width);
              fabricRef.current.setHeight(img.height);
            }
          };
          fabricRef.current.renderAll();
        });
      } else {
        fabricRef.current.loadFromJSON(savedCanvasState, () => {
          // console.log(fabricRef.current.getWidth());
          // console.log(fabricRef.current.getHeight());
          fabricRef.current.renderAll();
          // console.log(fabricRef.current.getObjects());
        });
      }

    } else if (canvasMode === 1) {
      if (!photo) {
        navigate("/createproject");
      }
      console.log("we are in else if(canvasMode === 1)")
      const img = new Image();
      img.src = photo;
      img.onload = () => {
        const maxWidth = window.innerWidth * 0.7;
        const maxHeight = window.innerHeight * 0.8;

        if (img.width > maxWidth || img.height > maxHeight) {
          const scaleFactor = Math.min(
            maxWidth / img.width,
            maxHeight / img.height
          );
          //   console.log(scaleFactor);
          fabric.Image.fromURL(photo, (image) => {
            fabricRef.current.setBackgroundImage(image, fabricRef.current.renderAll.bind(fabricRef.current), {
              scaleX: scaleFactor,
              scaleY: scaleFactor,
            });

            fabricRef.current.setWidth(image.width * scaleFactor);
            fabricRef.current.setHeight(image.height * scaleFactor);
            fabricRef.current.centerObject(image);
            saveCanvasState();
          });


        } else {
          fabric.Image.fromURL(photo, (image) => {
            fabricRef.current.setBackgroundImage(image, fabricRef.current.renderAll.bind(fabricRef.current));
            fabricRef.current.setWidth(image.width);
            fabricRef.current.setHeight(image.height);
            fabricRef.current.centerObject(image);
            saveCanvasState();
          });


        }
      };
    } else if (canvasMode === 0) {
    }

    // const initFabric = () => {
    //   fabricRef.current = new fabric.Canvas(canvasRef.current, {
    //     height: canvasHeight, // размеры холста
    //     width: canvasWidth,
    //     backgroundColor: canvasBackColor, //цвет холста
    //   });
    // };
    // initFabric();

    // const addRectangle = () => {
    //   const rect = new fabric.Rect({
    //     top: 50,
    //     left: 50,
    //     width: 50,
    //     height: 50,
    //     fill: "red",
    //   });

    //   fabricRef.current.add(rect);
    // };
    // addRectangle();

    const disposeFabric = () => {
      fabricRef.current.dispose();
    };

    fabricRef.current.on("object:added", saveCanvasState);
    fabricRef.current.on("object:removed", saveCanvasState);
    fabricRef.current.on("object:modified", saveCanvasState);
    fabricRef.current.renderAll();
    saveCanvasState();

    return () => {
      fabricRef.current.off("object:added", saveCanvasState);
      fabricRef.current.off("object:removed", saveCanvasState);
      fabricRef.current.off("object:modified", saveCanvasState);
      disposeFabric();
    };
  }, []);

  const saveCanvasState = () => {
    const canvasState = JSON.stringify(fabricRef.current.toJSON());
    localStorage.setItem("canvasState", canvasState);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = fabricRef.current.getWidth() * 0.9;
        const maxHeight = fabricRef.current.getHeight() * 0.9;

        if (img.width > maxWidth || img.height > maxHeight) {
          const scaleFactor = Math.min(
            maxWidth / img.width,
            maxHeight / img.height
          );
          fabric.Image.fromURL(e.target.result, (image) => {
            image.set({
              scaleX: scaleFactor,
              scaleY: scaleFactor,
            });
            fabricRef.current.add(image);
          });
        } else {
          fabric.Image.fromURL(e.target.result, (image) => {
            fabricRef.current.add(image);
          });
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    fabricRef.current.isDrawingMode = drawMode;

    const penSize = localStorage.getItem("penSize");
    const penColor = localStorage.getItem("penColor");

    fabricRef.current.freeDrawingBrush.width = penSize;
    fabricRef.current.freeDrawingBrush.color = penColor;
  }, [drawMode]);

  return (
    <div className="box_all_holst_ed_p">
      <div className="box_holst_ed_p">
        <div>
          <SideBar setDrawMode={setDrawMode} onAddRectangle={onAddRectangle} onAddCircle={onAddCircle} onAddEllipse={onAddEllipse} onDeleteObjects={onDeleteObjects} />
          <UpperBar canvasName={canvasName} handleImageUpload={handleImageUpload} />

          {/* <button onClick={onAddCircle}>Add Circle</button>
                    <button onClick={onAddLine}>Add Line</button>
                    <button onClick={onAddRectangle}>Add Rectangle</button>
                    <button onClick={onAddImage}>Add Image</button>
                    <button onClick={onDelete}>Delete</button> */}
        </div>
        <div className="row_box_canvas">
          {/* <FabricJSCanvas className="sample-canvas" onReady={onReady} /> */}
          <canvas
            className="sample-canvas"
            id="canvas"
            ref={canvasRef}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;

//sanya code, modes of canvas
/*if (savedCanvasState) {
      fabricRef.current.loadFromJSON(savedCanvasState, () => {
        fabricRef.current.renderAll();
        // console.log(fabricRef.current.getObjects());
      });
    } else if (canvasMode === 3) {
      // fabricRef.current.loadFromJSON(savedCanvasState, () => {
      //   fabricRef.current.renderAll();
      //   // console.log(fabricRef.current.getObjects());
      // });
    } else if (canvasMode === 1) {
      if (!photo) {
        navigate("/createproject");
      }
      const img = new Image();
      img.src = photo;
      img.onload = () => {
        const maxWidth = window.innerWidth * 0.7;
        const maxHeight = window.innerHeight * 0.8;

        if (img.width > maxWidth || img.height > maxHeight) {
          const scaleFactor = Math.min(
            maxWidth / img.width,
            maxHeight / img.height
          );
          //   console.log(scaleFactor);
          fabric.Image.fromURL(photo, (image) => {
            image.set({
              scaleX: scaleFactor,
              scaleY: scaleFactor,
            });
            fabricRef.current.setWidth(image.width * scaleFactor);
            fabricRef.current.setHeight(image.height * scaleFactor);

            fabricRef.current.centerObject(image);

            image.lockMovementX = true;
            image.lockMovementY = true;
            image.lockRotation = true;

            image.hasControls = false;
            image.hasBorders = false;

            fabricRef.current.add(image);
          });
          saveCanvasState();
        } else {
          fabric.Image.fromURL(photo, (image) => {
            fabricRef.current.setWidth(image.width);
            fabricRef.current.setHeight(image.height);

            fabricRef.current.centerObject(image);

            image.lockMovementX = true;
            image.lockMovementY = true;
            image.lockRotation = true;
            image.hasControls = false;
            image.hasBorders = false;

            fabricRef.current.add(image);
          });
        }
      };
    } else if (canvasMode === 0) {
      fabricRef.current.setWidth(canvasWidth);
      fabricRef.current.setHeight(canvasHeight);
      fabricRef.current.backgroundColor = canvasBackColor;
      fabricRef.current.renderAll();
    } */
