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
  createCanvas(401, 401);
  
  grid = criaArray2D(col, lin);
  
  for(let i=0;i<lin;i++){
    for(let j=0;j<col;j++){
      grid[i][j] = new Cell(i, j,lado,Math.random() < 0.1);
    }
  }
  
  for(let i=0;i<lin;i++){
    for(let j=0;j<col;j++){
      
      let bombasAoRedor = 0;
      
      for(let x=-1;x<2;x++){
        for(let y=-1;y<2;y++){
          
          if(x==0 && y==0){
            continue;
          }
          
          let linhaCheck = i+y;
          let colunaCheck = j+x;
          
          if(linhaCheck<0 || colunaCheck<0 || linhaCheck>=lin || colunaCheck>=col){
            continue;
          }
          
          if(grid[linhaCheck][colunaCheck].temBomba()){
            bombasAoRedor++;
          }
          
        }
      }
      
      grid[i][j].setQuantidadeBombasAoRedor(bombasAoRedor);
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
  if(grid[i][j].bombasAoRedor==0){
    floodFill(i,j);
  }
}

function floodFill(iOrigem, jOrigem){
  grid[iOrigem][jOrigem].setPesquisado();
  
  for(let x=-1;x<2;x++){
    for(let y=-1;y<2;y++){
      
      if(x==0 && y==0){
        continue;
      }
      
      let linhaCheck = iOrigem+y;
      let colunaCheck = jOrigem+x;
      
      if(linhaCheck<0 || colunaCheck<0 || linhaCheck>=lin || colunaCheck>=col){
        continue;
      }   
      
      if(!grid[linhaCheck][colunaCheck].pesquisado){
        grid[linhaCheck][colunaCheck].setPesquisado();
        if(!grid[linhaCheck][colunaCheck].temBomba()){
           abrirCelula(linhaCheck,colunaCheck);
        }
      }
      
      
    }
  }
  
  
}

function mouseClicked(){
  let j = floor(mouseX/lado);
  let i = floor(mouseY/lado);
  
  abrirCelula(i,j);
  
}
