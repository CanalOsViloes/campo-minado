let grid = [];
let lin = 10;
let col = 10;
let lado = 40;

function criaArray2D(colunas, linhas){
  let arr = new Array(linhas);
  
  for(let i=0;i<colunas;i++){
    arr[i] = new Array(colunas);
  }
  
  return arr;
}

function setup() {
  createCanvas(400, 400);
  
  grid = criaArray2D(col, lin);
  
  for(let i=0;i<lin;i++){
    for(let j=0;j<col;j++){
      grid[i][j] = new Cell(i, j,lado,Math.random() < 0.5);
    }
  }
  
}

function draw() {
  background(220);
  for(let i=0;i<lin;i++){
    for(let j=0;j<col;j++){
      grid[i][j].desenhar();
    }
  }
}

function abrirCelula(i,j){
  grid[i][j].abrir();
}

function mouseClicked(){
  let j = floor(mouseX/lado);
  let i = floor(mouseY/lado);
  
  abrirCelula(i,j);
  
}
