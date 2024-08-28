import React, { useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Context } from "../../"

import { fabric } from "fabric";
import { SideBar } from "../../widgets/SideBar";
import { UpperBar } from "../../widgets/UpperBar";

import "./style.css";

const EditorPage = () => {
  const params = useParams();


  const { store } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const [draw, setDraw] = useState({
    mode: false,
    typePen: "aboba",
    sizePen: 3,
    colorPen: "#000000",
    penOpacity: 100,
  });
  const [colorGlobal, setColorGlobal] = useState("#000000");

  const [canvasName, setCanvasName] = useState(location.state.canvasName)
  const canvasWidth = location.state.canvasWidth;
  const canvasHeight = location.state.canvasHeight;
  const canvasBackColor = location.state.canvasBackColor;
  const canvasMode = location.state.mode;
  const [canvasState, setCanvasState] = useState(location.state.canvasState)
  const photo = location.state.image;

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
      width:
        type === 1 ? fabricRef.current.width / 7 : fabricRef.current.width / 10,
      height: fabricRef.current.width / 10,
      stroke: borderCol,
      strokeWidth: 2,
      fill: color,
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
      strokeWidth: 3,
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
      strokeWidth: 3,
    });
    fabricRef.current.add(ellipse);
  };
  /////////////////////////////////////////////Удаление/////////////////////////////////////////////
  const onDeleteObjects = () => {
    fabricRef.current.getActiveObjects().forEach((obj) => {
      fabricRef.current.remove(obj);
    });
    fabricRef.current.discardActiveObject().renderAll();
  };
  //////////////////////////////////////////////Создание текста///////////////////////////////////////
  const createText = (size, color, font, opacity) => {
    const text = new fabric.Textbox("Type Here", {
      fontSize: size,
      fill: color,
      opacity: opacity,
      fontFamily: font,
      top: fabricRef.current.height / 2 - fabricRef.current.height / 4,
      left: fabricRef.current.width / 2 - fabricRef.current.width / 4,
    });

    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text); // Set the added text as the active object
  };

  ///////////////////////////////////////Возможность взаемодействовать/////////////////////////////////
  const allowEditObj = (a, b, c, dell) => {
    const objects = fabricRef.current.getObjects();
    objects.forEach((obj) => {
      obj.lockScalingX = a;
      obj.lockScalingY = a;
      obj.lockRotation = a;
      obj.hasControls = b;
      obj.selectable = c;
      obj.evented = c;
      if (!dell) {
        fabricRef.current.discardActiveObject().renderAll();
      }
      fabricRef.current.renderAll();
    });
  };
  ////////////////////////////////////////////////////////////////Пипетка/////////////////////////////////////
  const rgbaToHex = (color) => {
    if (/^rgb/.test(color)) {
      const rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(",");
      let hex = `#${(
        (1 << 24) +
        (parseInt(rgba[0], 10) << 16) +
        (parseInt(rgba[1], 10) << 8) +
        parseInt(rgba[2], 10)
      )
        .toString(16)
        .slice(1)}`;
      if (rgba[4]) {
        const alpha = Math.round(0o1 * 255);
        const hexAlpha = (alpha + 0x10000)
          .toString(16)
          .substr(-2)
          .toUpperCase();
        hex += hexAlpha;
      }
      return hex;
    }
  };
  const handleColorPick = (event) => {
    const pointer = fabricRef.current.getPointer(event.e);
    const color = fabricRef.current
      .getContext()
      .getImageData(pointer.x, pointer.y, 1, 1).data;
    const color3 = color[3] / 255;
    const pickedColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color3})`;
    const colorHex = rgbaToHex(pickedColor);
    setColorGlobal(colorHex);
  };
  const handlePepette = (state) => {
    if (state) {
      fabricRef.current.on("mouse:down", handleColorPick);
    } else {
      fabricRef.current.off("mouse:down");
    }
  };

  //---------------------------------------------------------------------------------------------//
  React.useEffect(() => {
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth || window.innerWidth * 0.7,
      height: canvasHeight || window.innerHeight * 0.8, // размеры холста
      backgroundColor: canvasBackColor || null, //цвет холста
      selection: false,
    });

    if (canvasState) {
      fabricRef.current.loadFromJSON(canvasState, () => {
        fabricRef.current.renderAll();
      })
      setCanvasState(null)
    }

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
            fabricRef.current.setBackgroundImage(
              image,
              fabricRef.current.renderAll.bind(fabricRef.current),
              {
                scaleX: scaleFactor,
                scaleY: scaleFactor,
              }
            );

            fabricRef.current.setWidth(image.width * scaleFactor);
            fabricRef.current.setHeight(image.height * scaleFactor);
            fabricRef.current.centerObject(image);
            saveCanvasState();
          });
        } else {
          fabric.Image.fromURL(photo, (image) => {
            fabricRef.current.setBackgroundImage(
              image,
              fabricRef.current.renderAll.bind(fabricRef.current)
            );
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

    allowEditObj(true, false, false);

    fabricRef.current.renderAll();
    saveCanvasState();

    return () => {
      fabricRef.current.off("object:added", saveCanvasState);
      fabricRef.current.off("object:removed", saveCanvasState);
      fabricRef.current.off("object:modified", saveCanvasState);
      disposeFabric();
    };
  }, [canvasBackColor, canvasHeight, canvasMode, canvasWidth, navigate, photo]);

  ////////////////////////////////////////////////////////////////Сохранение канваса/////////////////////////////////////
  const saveCanvasState = () => {
    const canvasState = JSON.stringify(fabricRef.current.toJSON());
    localStorage.setItem("canvasState", canvasState);
  };

  ////////////////////////////////////////////////////////////////Загрузка картинки/////////////////////////////////////
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

  ///////////////////////////////////////// ФИЛЬТРЫ ////////////////////////////////////////////////////

  function setFilter(filterName) {
    fabricRef.current.getActiveObjects().forEach((obj) => {
      if (obj.filters) {
        switch (filterName) {
          case 'BlackWhite': obj.filters.push(new fabric.Image.filters.BlackWhite()); break;
          case 'BlendColor': obj.filters.push(new fabric.Image.filters.BlendColor()); break;
          case 'Brownie': obj.filters.push(new fabric.Image.filters.Brownie()); break;
          case 'Invert': obj.filters.push(new fabric.Image.filters.Invert()); break;
          case 'Kodachrome': obj.filters.push(new fabric.Image.filters.Kodachrome()); break;
          case 'Grayscale': obj.filters.push(new fabric.Image.filters.Grayscale()); break;
          case 'Sepia': obj.filters.push(new fabric.Image.filters.Sepia()); break;
          case 'Remove': for (let i = 0; i < obj.filters.length; i++) delete obj.filters[i]; break;
          default: break;
        }
        obj.applyFilters();
      }
    });
  }


  const saveProject = async () => {
    const image = fabricRef.current.toDataURL("banfuciy", {
      format: "png",
      multiplier: 2, // Increase the multiplier for higher resolution
    });
    saveCanvasState();
    const projectId = params.id
    const state1 = localStorage.getItem("canvasState");
    const aboba = await store.updateProject(image, canvasName, state1, projectId, canvasWidth, canvasHeight)
  }


  React.useEffect(() => {
    fabricRef.current.isDrawingMode = draw.mode;
    fabricRef.current.freeDrawingBrush.width = 1 * draw.sizePen;
    fabricRef.current.freeDrawingBrush.color = draw.colorPen;
  }, [draw]);

  return (
    <div className="box_all_holst_ed_p">
      <div className="box_holst_ed_p">
        <div>
          <SideBar
            handlePepette={handlePepette}
            setColorGlobal={setColorGlobal}
            colorGlobal={colorGlobal}
            onMove={allowEditObj}
            createText={createText}
            draw={draw}
            setDraw={setDraw}
            onAddRectangle={onAddRectangle}
            onAddCircle={onAddCircle}
            onAddEllipse={onAddEllipse}
            onDeleteObjects={onDeleteObjects}
            onAddSelection={onAddSelection}
            onRemoveSelection={onRemoveSelection}
          />
          <UpperBar saveProject={saveProject} setCanvasName={setCanvasName}
            canvasName={canvasName}
            handleImageUpload={handleImageUpload}
            setFilter={setFilter}
          />
        </div>
        <div className="row_box_canvas">
          {/* <button onClick={saveProject}> save</button> */}
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
