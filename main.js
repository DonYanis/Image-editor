const file = document.querySelector('.file-input')
const chooseIMG = document.querySelector('.choose-img')
const image = document.querySelector('.preview-img img')
const container = document.querySelector('.container')
const filterOpt = document.querySelectorAll('.filter button')
const filterName = document.querySelector('.filter-info .name')
const filterValue = document.querySelector('.filter-info .value')
const filterRange = document.querySelector('.slider input')
const reset = document.querySelector('.reset-filter')
const save = document.querySelector('.save-img')
const rotateOpt = document.querySelectorAll('.rotate button')


let Brightness=100,Saturation=100,Inversion=0,Grayscale=0,Blur=0,Contrast=10,sepia=0,Hue=0
let rotate=0,flipH=1,flipV=1

file.addEventListener("change",loadImg)
function loadImg(){
    let inputFile=file.files[0] //first selected img
    if(!inputFile) return // no file
    image.src=URL.createObjectURL(inputFile)
    image.addEventListener("load",()=> {
        reset.click()
        container.classList.remove('disable')
    })   
}

chooseIMG.addEventListener('click',()=>file.click())

filterRange.addEventListener("input",updateFilter)
function updateFilter(){
    filterValue.innerHTML= filterRange.value+'%'

    const selectedFilter=document.querySelector('.filter .active')

    switch (selectedFilter.id) {
        case "Brightness":
            Brightness=filterRange.value
            break;
        case "Saturation":
            Saturation=filterRange.value
            break;
        case "Inversion":
            Inversion=filterRange.value
            break;
        case "Grayscale":
            Grayscale=filterRange.value
            break;
        case "Blur":
            Blur=filterRange.value
            break;
        case "Contrast":
            Contrast=filterRange.value
            break;
        case "Sepia":
            sepia=filterRange.value
            break;
        case "Hue-rotate":
            Hue=filterRange.value
            break;
        default:
            break;
    }
    applyFilters()
}

reset.addEventListener("click",()=>{
    Brightness=100;Saturation=100;Inversion=0;Grayscale=0
    Blur=0;Contrast=10;sepia=0;Hue=0
    rotate=0
    flipH=1
    flipV=1
    applyFilters()
    filterOpt[0].click()
})

rotateOpt.forEach(option =>{
    option.addEventListener("click",()=>{
        switch (option.id) {
            case "left":
                rotate -= 90
                break;
            case "right":
                rotate+=90
                break;
            case "vertical":
                flipH*=-1
                break;
            case "horizontal":
                flipV*=-1
                break;
            default:
                break;
        }
        applyFilters()
    })  
})

filterOpt.forEach(option => {
    option.addEventListener("click",()=>{
        document.querySelector('.filter .active').classList.remove('active')
        option.classList.add('active')
        filterName.innerHTML=option.innerHTML

        switch (option.id) {
            case "Brightness":
                filterRange.max='200'
                filterRange.value=Brightness
                break;
            case "Saturation":
                filterRange.max='200'
                filterRange.value=Saturation
                break;
            case "Inversion":
                filterRange.max='100'
                filterRange.value=Inversion
                break;
            case "Grayscale":
                filterRange.max='100'
                filterRange.value=Grayscale
                break;
            case "Blur":
                filterRange.max='100'
                filterRange.value=Blur
                break;
            case "Contrast":
                filterRange.max='100'
                filterRange.value=Contrast
                break;
            case "Sepia":
                filterRange.max='100'
                filterRange.value=sepia
                break;
            case "Hue-rotate":
                filterRange.max='360'
                filterRange.value=Hue
                break;
                
            default:
                break;
        }
        filterValue.innerHTML= filterRange.value+'%'
    })
})

function applyFilters(){
    image.style.transform=`rotate(${rotate}deg) scale(${flipH},${flipV})`
    image.style.filter=`brightness(${Brightness/100}) saturate(${Saturation/100}) invert(${Inversion/100}) grayscale(${Grayscale/100}) blur(${Blur/10}px) contrast(${Contrast/10}) sepia(${sepia/100}) hue-rotate(${Hue}deg)`
}

save.addEventListener("click",()=>{
    const canvas=document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width=image.naturalWidth
    canvas.height=image.naturalHeight

    ctx.filter=`brightness(${Brightness/100}) saturate(${Saturation/100}) invert(${Inversion/100}) grayscale(${Grayscale/100}) blur(${Blur/10}px) contrast(${Contrast/10}) sepia(${sepia/100}) hue-rotate(${Hue}deg)`
    ctx.translate(canvas.width/2,canvas.height/2)
    ctx.scale(flipH,flipV)
    ctx.rotate(rotate*Math.PI/180)
    ctx.drawImage(image,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height)
    
    const link=document.createElement("a")
    link.download="image.jpg"
    link.href=canvas.toDataURL()
    link.click()
})