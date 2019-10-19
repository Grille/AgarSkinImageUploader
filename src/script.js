let ctx = null;

window.addEventListener("load", () => {
  let button = document.querySelector("#skinButton");
  button.addEventListener("click", () => {
    let openfl = document.querySelector("#openfl-content");
    openfl.addEventListener("click", () => {
      setTimeout(() => {
        let editor = document.querySelector("#skin-editor-app");
        let canvas = document.querySelector("#skin-editor-canvas");
        if (editor !== null) {
          ctx = canvas.getContext("2d");
          ctx.imageSmoothingEnabled = false;
          editor.ondragover = (e) => {
            e.preventDefault();
          }
          editor.ondrop = (e) => {
            e.preventDefault();
            let dt = e.dataTransfer;
            let url = dt.getData('text/plain');
            if (url !== "") {
              imageFromUrl(url);
            }
            else {
              imageFromFile(dt.files[0]);
            }
          }
        }
      }, 500);
    });
  });
});

function draw(img){
  let size = Math.min(img.width, img.height);
  let offsetX = (img.width - size) / 2;
  let offsetY = (img.height - size) / 2;
  ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, 512, 512);
}

function setImage(src){
  let img = new Image();
  img.onload = (e) => {
    draw(img);
  }
  img.onerror = (e) => {
    alert("Image src is not valid!\n\n" + src);
  }
  img.src = src;
}

function imageFromUrl(url){
  setImage(url);
}

function imageFromFile(file){
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    setImage(reader.result);
  }
}

