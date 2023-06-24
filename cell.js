class Cell{
  constructor(i, j, lado, bomba){
    this.i = i;
    this.j=j;
    this.lado=lado;
    this.temBomba = bomba;
    this.aberto = false;
  }
  
  desenhar(){
    if(this.aberto){
      fill(color("red"));
    }else{
      fill(color("grey"));
    }
    rect(this.j*this.lado, this.i*this.lado, this.lado);
  }
  
  abrir(){
    this.aberto = true;
  }
}
