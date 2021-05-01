class Enemy{
   constructor(container, src, width, height, x, y, velX,velY){
        this.container=container;
        this.img = document.createElement("img");
        this.src=src;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.velX=velX; 
        this.velY=velY;
        this.limitX=parseInt(this.container.style.width);
        this.limitY=parseInt(this.container.style.height);
        this.img.src=src;
        //크기
        this.img.style.width=this.width+"px";
        this.img.style.height=this.height+"px";
        //위치
        this.img.style.position="absolute";
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";

        this.container.appendChild(this.img);
   }
    tick(){
        // if(this.x<0){
        //     removeObject(this.container, this.img, enemyArray, enemyArray.indexOf(this));
        // }
        this.x+=this.velX;
        this.y+=this.velY;

        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";

        if(this.x<=0){
            this.velX*=-1;
        }
        if(this.y<=0){
            this.velY=1;
        }else if(this.y>=this.limitY-this.height){
            this.velY=-1;
        }
   }
    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }
}