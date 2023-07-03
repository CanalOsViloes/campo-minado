class Cell{
  constructor(i, j, lado, bomba){
    this.i = i;
    this.j=j;
    this.lado=lado;
    this.tenhoBomba = bomba;
    this.aberto = false;
    this.bombasAoRedor = 0;
    this.pesquisado = false;
  }
  
  desenhar(){
    if(this.aberto){
      if(this.tenhoBomba){
        fill(color("red"));  
        rect(this.j*this.lado, this.i*this.lado, this.lado);
      }else{
        fill(color("green"));  
        rect(this.j*this.lado, this.i*this.lado, this.lado);
        if(this.bombasAoRedor!=0){
          push();
            fill(color('black'));
            strokeWeight(5);
            textAlign(CENTER,CENTER);
            textSize(15);
            text(this.bombasAoRedor,
                 this.j*this.lado+this.lado/2,
                 this.i*this.lado+this.lado/2,
                );
          pop();
        }
      }
      
    }else{
      fill(color("grey"));
      rect(this.j*this.lado, this.i*this.lado, this.lado);
    }
    
    if(this.aberto && this.tenhoBomba){
      push();
        fill(color('black'));
        strokeWeight(4);
        circle(this.j*this.lado+this.lado/2,
               this.i*this.lado+this.lado/2,
               this.lado/4)
      pop();
    }
    
  }
  
  setQuantidadeBombasAoRedor(num){
    this.bombasAoRedor = num;
  }
  
  temBomba(){
    return this.tenhoBomba;
  }
  
  abrir(){
    this.aberto = true;
  }
  
  setPesquisado(){
    this.pesquisado = true;
  }
}
