const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const lineWidth = document.querySelector('#line-width');
const color = document.querySelector('#color');
const colorOptions = Array.from(document.querySelectorAll('.color-option'));
const modeBtn = document.querySelector('#mode-btn');
const deleteBtn = document.querySelector('#delete-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const flieInput = document.querySelector('#file');
const textInput = document.querySelector('#text');
const saveBtn = document.querySelector('#save');

canvas.width = 700;
canvas.height = 700;

context.lineWidth = lineWidth.value;
context.lineCap = "round";
let isPainting = false;
let isFilling = false;


function onMove(event) {
    if (isPainting) {
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
    }
    context.moveTo(event.offsetX, event.offsetY);
}

function mouseDown(event) {
    isPainting = true;
}

function stopPainting(event) {
    context.beginPath();
    isPainting = false;
}

function onLineWidthChange(event) {
    context.lineWidth = event.target.value;
}

function onColorChange(event) {
    context.strokeStyle = event.target.value;
    context.fillStyle = event.target.value;
}

function onColorClick(event) {
    const colorValue = event.target.attributes[2].nodeValue;
    context.strokeStyle = colorValue;
    context.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick(event) {
    if (isFilling == true) {
        modeBtn.innerText = 'Fill';
        isFilling = false;
    } else {
        modeBtn.innerText = 'Draw';
        isFilling = true;
    }
}

function onCanvasClick() {
    if (isFilling) {
        context.fillRect(0, 0, 700, 700);
    }
}

function onDeleteClick() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, 700, 700);
}

function onEraserClick() {
    context.strokeStyle = 'white';
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url)
    const image = document.createElement('img');
    image.src = url;
    image.onload = () => {
        context.drawImage(image, 0, 0, 700, 700);
    }
    flieInput.value = null;
}

function onDoubleClick(event) {
    const text = textInput.value;
    if (!text == "") {
        context.save();
        context.lineWidth = 1;
        context.font = "68px sans-serif";
        context.strokeText(text, event.offsetX, event.offsetY);
        context.restore();
    }
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener('dblclick', onDoubleClick);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);
canvas.addEventListener('click', onCanvasClick);

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick));
modeBtn.addEventListener('click', onModeClick);
deleteBtn.addEventListener('click', onDeleteClick);
eraserBtn.addEventListener('click', onEraserClick);
flieInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);