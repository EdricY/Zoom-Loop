import setUpDropZone from './dropzone'
const getEl = (id) => document.getElementById(id);

setUpDropZone(getEl("drop-zone"), e => {
  console.log(e.dataTransfer.files)
  const file = e.dataTransfer.files[0]

  getEl("outer-img").src = URL.createObjectURL(file);
  getEl("inner-img").src = URL.createObjectURL(file);
  getEl("inner2-img").src = URL.createObjectURL(file);


})

let transform = { x: 0, y: 0, scale: 0.1, rotate: 0 };

getEl("start-btn").addEventListener("click", () => {
  console.log("go");
  const oldtranslate1 = getEl("inner-img").style.translate;
  const oldscale1 = getEl("inner-img").style.scale;
  const oldopacity1 = getEl("inner-img").style.opacity;

  const oldtranslate2 = getEl("outer-img").style.translate;
  const oldscale2 = getEl("outer-img").style.scale;

  getEl("outer-img").style.transition = `all linear 1s`;
  const iScale = 1 / transform.scale;
  getEl("outer-img").style.scale = iScale;
  getEl("outer-img").style.rotate = -transform.rotate + "deg";

  getEl("inner-img").style.transition = `all linear 1s`;
  // getEl("inner-img").style.translate = `0px 0px`;
  getEl("inner-img").style.scale = `1`;
  getEl("inner-img").style.opacity = `1`;
  getEl("inner-img").style.rotate = `0deg`;


  getEl("inner2-img").style.transition = `all linear 1s`;
  getEl("inner2-img").style.scale = transform.scale;
  getEl("inner2-img").style.opacity = `1`;
  getEl("inner2-img").style.rotate = transform.rotate + "deg";





  setTimeout(() => {
    getEl("inner-img").style.transition = ""
    getEl("inner-img").style.scale = transform.scale
    getEl("inner-img").style.opacity = oldopacity1
    getEl("inner-img").style.rotate = transform.rotate + "deg";

    getEl("inner2-img").style.transition = "";
    getEl("inner2-img").style.scale = transform.scale ** 2;
    getEl("inner2-img").style.opacity = `1`;
    getEl("inner2-img").style.rotate = transform.rotate * 2 + "deg";




    getEl("outer-img").style.transition = ""
    getEl("outer-img").style.scale = 1
    getEl("outer-img").style.rotate = `0deg`;

  }, 1000)
})

let loopInterval = null;
getEl("loop-btn").addEventListener("click", () => {
  if (loopInterval) {
    clearInterval(loopInterval);
    loopInterval = null;
    getEl("loop-btn").innerText = "Loop"
    return;
  }

  getEl("start-btn").click();
  loopInterval = setInterval(() => {
    getEl("start-btn").click();
  }, 1100);

  getEl("loop-btn").innerText = "Stop"
});


let isMouseDown = false;
document.addEventListener("mousedown", () => { isMouseDown = true });
document.addEventListener("mouseup", () => { isMouseDown = false });

const editOrigin = (e) => {
  console.log(e)
  transform.x = e.offsetX
  transform.y = e.offsetY
  getEl("outer-img").style.transformOrigin = `${transform.x}px ${transform.y}px`;
  getEl("inner-img").style.transformOrigin = `${transform.x}px ${transform.y}px`;
  getEl("inner2-img").style.transformOrigin = `${transform.x}px ${transform.y}px`;
}
getEl("stage").addEventListener("mousemove", (e) => {
  if (isMouseDown) {
    editOrigin(e)
  }
})
getEl("stage").addEventListener("click", (e) => {
  editOrigin(e)
})

function updateScale(e) {
  transform.scale = e.target.value;
  getEl("inner-img").style.scale = transform.scale;
  getEl("inner2-img").style.scale = transform.scale ** 2;
}
getEl("scale-range").addEventListener("input", updateScale)
getEl("scale-range").addEventListener("change", updateScale)


function updateRotate(e) {
  transform.rotate = e.target.value;
  getEl("inner-img").style.rotate = transform.rotate + "deg";
  getEl("inner2-img").style.rotate = transform.rotate * 2 + "deg";
}
getEl("rotate-range").addEventListener("input", updateRotate)
getEl("rotate-range").addEventListener("change", updateRotate)

