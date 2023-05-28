import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { fabric } from "fabric";
import { SideBar } from "../../widgets/SideBar";
import { UpperBar } from "../../widgets/UpperBar";

import "./style.css";

const EditorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [draw, setDraw] = useState({ mode: false, typePen: 'aboba', sizePen: 3, colorPen: "#000000", penOpacity: 100 });
  const [moveCtr, set] = useState(false);

  const canvasName = location.state.canvasName;
  const canvasWidth = location.state.canvasWidth;
  const canvasHeight = location.state.canvasHeight;
  const canvasBackColor = location.state.canvasBackColor;
  const canvasMode = location.state.mode;
  const photo = location.state.image

  const fabricRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  ////////////////////////////////////////////Віделение обьектов////////////////////////////////
  const onAddSelection = () => {
    fabricRef.current.selection = true;
  };
  const onRemoveSelection = () => {
    fabricRef.current.selection = false;
  };
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
      top: fabricRef.current.height / 2 - fabricRef.current.height / 4,
      left: fabricRef.current.width / 2 - fabricRef.current.width / 4,
      fill: color,
      stroke: borderCol,
      strokeWidth: 3
    });
    fabricRef.current.add(ellipse);
  };
  /////////////////////////////////////////////Удаление/////////////////////////////////////////////
  const onDeleteObjects = () => {
    console.log(fabricRef.current.getActiveObjects())
    fabricRef.current.getActiveObjects().forEach((obj) => {
      fabricRef.current.remove(obj)
    });
    fabricRef.current.discardActiveObject().renderAll()
  };
  //////////////////////////////////////////////Создание текста///////////////////////////////////////
  const createText = (size, color, font, opacity) => {
    console.log(font)
    const text = new fabric.Textbox('Type Here', {
      fontSize: size,
      fill: color,
      opacity: opacity,
      fontFamily: font,
      top: fabricRef.current.height / 2 - fabricRef.current.height / 4,
      left: fabricRef.current.width / 2 - fabricRef.current.width / 4,
    })

    fabricRef.current.add(text)
    fabricRef.current.setActiveObject(text); // Set the added text as the active object
  }

  ///////////////////////////////////////Возможность взаемодействовать/////////////////////////////////
  const allowEditObj = (a, b, c, dell) => {
    const objects = fabricRef.current.getObjects()
    objects.forEach((obj) => {
      obj.lockScalingX = a;
      obj.lockScalingY = a;
      obj.lockRotation = a
      obj.hasControls = b;
      obj.selectable = c;
      obj.evented = c;
      if (!dell) { fabricRef.current.discardActiveObject().renderAll(); }
      fabricRef.current.renderAll()

    })
  }
  //

  //---------------------------------------------------------------------------------------------//
  React.useEffect(() => {
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth || window.innerWidth * 0.7,
      height: canvasHeight || window.innerHeight * 0.8, // размеры холста
      backgroundColor: canvasBackColor || null, //цвет холста
      selection: false
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
              fabricRef.current.setWidth(img.width * scaleFactor);
              fabricRef.current.setHeight(img.height * scaleFactor);

              saveCanvasState();
            } else {
              fabricRef.current.setWidth(img.width);
              fabricRef.current.setHeight(img.height);
              saveCanvasState();
            }
          };
          fabricRef.current.renderAll();
        });
      } else {
        fabricRef.current.loadFromJSON(savedCanvasState, () => {
          fabricRef.current.renderAll();
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

    const disposeFabric = () => {
      fabricRef.current.dispose();
    };

    fabricRef.current.on("object:added", saveCanvasState);
    fabricRef.current.on("object:removed", saveCanvasState);
    fabricRef.current.on("object:modified", saveCanvasState);
    // fabricRef.current.renderAll();

    allowEditObj(true, false, false)

    fabricRef.current.renderAll();
    saveCanvasState();

    return () => {
      fabricRef.current.off("object:added", saveCanvasState);
      fabricRef.current.off("object:removed", saveCanvasState);
      fabricRef.current.off("object:modified", saveCanvasState);
      disposeFabric();
    };
  }, [canvasBackColor, canvasHeight, canvasMode, canvasWidth, navigate, photo]);

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

  const handleCrop = () => {
    // Create a crop selection rectangle
    const cropRect = new fabric.Rect({
      fill: 'transparent',
      strokeWidth: 2,
      stroke: 'red',
      selectable: false,
      evented: false,
    });
    fabricRef.current.add(cropRect);

    // Initialize crop selection
    fabricRef.current.on('mouse:down', handleMouseDown);
    fabricRef.current.on('mouse:move', handleMouseMove);
    fabricRef.current.on('mouse:up', handleMouseUp);

    let startX, startY, isDown;

    function handleMouseDown(event) {
      const pointer = fabricRef.current.getPointer(event.e);
      startX = pointer.x;
      startY = pointer.y;
      isDown = true;
    }

    function handleMouseMove(event) {
      if (!isDown) return;

      const pointer = fabricRef.current.getPointer(event.e);
      const width = pointer.x - startX;
      const height = pointer.y - startY;

      cropRect.set({
        left: startX,
        top: startY,
        width: width,
        height: height,
      });
      fabricRef.current.renderAll();
    }

    function handleMouseUp() {
      isDown = false;

      // Perform crop
      const activeObject = fabricRef.current.getActiveObject();
      if (activeObject && activeObject.type === 'image') {
        const scaleX = activeObject.scaleX;
        const scaleY = activeObject.scaleY;
        const cropWidth = cropRect.width * scaleX;
        const cropHeight = cropRect.height * scaleY;
        const left = cropRect.left - activeObject.left * scaleX;
        const top = cropRect.top - activeObject.top * scaleY;

        activeObject.set({
          clipPath: new fabric.Rect({
            left: left,
            top: top,
            width: cropWidth,
            height: cropHeight,
          }),
        });

        fabricRef.current.remove(cropRect);
        fabricRef.current.off('mouse:down', handleMouseDown);
        fabricRef.current.off('mouse:move', handleMouseMove);
        fabricRef.current.off('mouse:up', handleMouseUp);
        fabricRef.current.renderAll();
      }
    }
  };



  React.useEffect(() => {

    fabricRef.current.isDrawingMode = draw.mode;
    fabricRef.current.freeDrawingBrush.width = 1 * draw.sizePen;
    fabricRef.current.freeDrawingBrush.color = draw.colorPen;
  }, [draw]);

  const handleColorPick = (event) => {
    const pointer = fabricRef.current.getPointer(event.e);
    const color = fabricRef.current.getContext().getImageData(pointer.x, pointer.y, 1, 1).data;
    const pickedColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`;
    console.log('Picked color:', pickedColor);
    // Do something with the picked color (e.g., update state, trigger an action, etc.)
  };
  const handlePepette = (event) => {
    fabricRef.current.on('mouse:down', handleColorPick);

    // fabricRef.current.off('mouse:down', handleColorPick);
  };

  return (
    <div className="box_all_holst_ed_p">
      <div className="box_holst_ed_p">
        <div>
          <SideBar onMove={allowEditObj} createText={createText} draw={draw} setDraw={setDraw} onAddRectangle={onAddRectangle} onAddCircle={onAddCircle} onAddEllipse={onAddEllipse}
            onDeleteObjects={onDeleteObjects} onAddSelection={onAddSelection} onRemoveSelection={onRemoveSelection} />
          <UpperBar canvasName={canvasName} handleImageUpload={handleImageUpload} />
        </div>
        <div className="row_box_canvas">
          <button onClick={handlePepette}>pepette</button>
          <canvas
            className="sample-canvas"
            id="canvas"
            ref={canvasRef}
          ></canvas>
        </div>
      </div>
    </div >
  );
};

export default EditorPage;


