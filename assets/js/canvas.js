function canvas(selector, options){
    const canvas = document.querySelector(selector);
    canvas.classList.add('canvas')
    canvas.setAttribute('width', `${options.width || 400}px`)
    canvas.setAttribute('height', `${options.height || 300}px`)
 
 
    // отримання контексту для малювання
    const context = canvas.getContext('2d')
   // отримуємо координати canvas відносно viewport
    const rect = canvas.getBoundingClientRect();
    let isPaint = false // чи активно малювання
    let points = [] //масив з точками
    
        // об’являємо функцію додавання точок в масив
    const addPoint = (x, y, dragging) => {
       // преобразуємо координати події кліка миші відносно canvas
       points.push({
           x: (x - rect.left),
           y: (y - rect.top),
           dragging: dragging,
           color : options.strokeColor,
           size : options.strokeWidth
       })
    }
     // головна функція для малювання
   const redraw = () => {
    //очищуємо  canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
 
    //context.strokeStyle = options.strokeColor;
    
    context.lineJoin = "round";
    //context.lineWidth = options.strokeWidth;
    let prevPoint = null;
    for (let point of points){
        context.strokeStyle = point.color;
        context.lineWidth = point.size;
        context.beginPath();
        if (point.dragging && prevPoint){
            context.moveTo(prevPoint.x, prevPoint.y)
        } else {
            context.moveTo(point.x - 1, point.y);
        }
        context.lineTo(point.x, point.y)
        context.closePath()
        context.stroke();
        prevPoint = point;
    }
 }
 
      // функції обробники подій миші
 const mouseDown = event => {
    isPaint = true
    addPoint(event.pageX, event.pageY);
    redraw();
 }
 
 const mouseMove = event => {
    if(isPaint){
        addPoint(event.pageX, event.pageY, true);
        redraw();
    }
 }
 
 // додаємо обробку подій
 canvas.addEventListener('mousemove', mouseMove)
 canvas.addEventListener('mousedown', mouseDown)
 canvas.addEventListener('mouseup',() => {
    isPaint = false;
 });
 canvas.addEventListener('mouseleave',() => {
    isPaint = false;
 });
 // TOOLBAR
const toolBar = document.getElementById('toolbar')
// clear button
const clearBtn = document.createElement('button')
clearBtn.classList.add('btn')
clearBtn.innerHTML = '<i class="fas fa-eraser"></i>'
//clearBtn.textContent = 'Clear'

clearBtn.addEventListener('click', () => {
// тут необхідно додати код очистки canvas та масиву точок (clearRect)
context.clearRect(0, 0, context.canvas.width, context.canvas.height);
points.length = 0;
})
toolBar.insertAdjacentElement('afterbegin', clearBtn)

   const downloadBtn = document.createElement('button');
   downloadBtn.classList.add('downloadBtn')
   downloadBtn.innerHTML = '<i class="fas fa-file-export"></i>'
   //downloadBtn.textContent = 'Download'
   downloadBtn.addEventListener('click', () => {
    const dataUrl = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    const newTab = window.open('about:blank','image from canvas');
    newTab.document.write("<img src='" + dataUrl + "' alt='from canvas'/>");
    })
    toolBar.insertAdjacentElement('afterbegin', downloadBtn)

    const saveBtn = document.createElement('button');
   saveBtn.classList.add('saveBtn')
    saveBtn.innerHTML = '<i class="far fa-save"></i>'
   //saveBtn.textContent = 'Save'
   saveBtn.addEventListener('click', () => {
    localStorage.setItem('points', JSON.stringify(points));
    })
    toolBar.insertAdjacentElement('afterbegin', saveBtn)

    const restoreBtn = document.createElement('button');
    restoreBtn.classList.add('restoreBtn')
    restoreBtn.innerHTML = '<i class="far fa-window-restore"></i>'
    //restoreBtn.textContent = 'restore'
    restoreBtn.addEventListener('click', () => {
    const raw = localStorage.getItem('points')
    points = JSON.parse(raw)
    redraw();

    })
    toolBar.insertAdjacentElement('afterbegin', restoreBtn)

    const timeStampBtn = document.createElement('button');
    timeStampBtn.classList.add('timeStampBtn')
    timeStampBtn.innerHTML = '<i class="far fa-calendar-times"></i>'
    //timeStampBtn.textContent = 'timeStamp'
    timeStampBtn.addEventListener('click', () => {
    //raw.stringify
    context.fillText(new Date(), 50, 100);

    })
    toolBar.insertAdjacentElement('afterbegin', timeStampBtn)
    
    const brushColorBtn = document.createElement('button');
    brushColorBtn.classList.add('brushColorBtn')
    brushColorBtn.innerHTML = '<i class="fas fa-paint-brush"></i>'
    //brushColorBtn.textContent = 'brushColor'
    brushColorBtn.addEventListener('click', () => {
    var context = canvas.getContext("2d");
    context.strokeStyle = 'id = "color - picker"'

    })
    toolBar.insertAdjacentElement('afterbegin', brushColorBtn)

    const sizeEl = document.createElement('input');
    sizeEl.classList.add('sizeEl')
    sizeEl.addEventListener("change",() =>{
        options.strokeWidth = sizeEl.value
    })
    toolBar.insertAdjacentElement('afterbegin',  sizeEl)

    const brushSizeBtn = document.createElement('button');
    brushSizeBtn.classList.add('brushSizeBtn')
    brushSizeBtn.innerHTML = '<i class="fas fa-text-size"></i>'
    //brushSizeBtn.textContent = 'brushSize'
    brushSizeBtn.addEventListener('click', () => {
    var context = canvas.getContext("2d");
    context.strokeStyle = 'id = "color - picker"'
    })

    toolBar.insertAdjacentElement('afterbegin',  brushSizeBtn)

    const backgroundBtn = document.createElement('button');
    backgroundBtn.classList.add('backgroundBtn')
    backgroundBtn.innerHTML = '<i class="fas fa-images"></i>'
    //backgroundBtn.textContent = 'background'
    backgroundBtn.addEventListener('click', () => {
        const img = new Image;
        img.src =`https://www.fillmurray.com/200/300)`;
        img.onload = () => {
        context.drawImage(img, 0, 0);
        }
    })
    toolBar.insertAdjacentElement('afterbegin', backgroundBtn)

    const colorEl = document.getElementById("color")
    colorEl.addEventListener("change", () =>{
        options.strokeColor = colorEl.value
    } )
}
 
 