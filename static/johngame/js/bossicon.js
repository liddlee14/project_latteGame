class BossIcon{
 
    constructor(container, src, width, height, x, y, velX){
        this.container=container;
        this.img = document.createElement("img");
        this.src=src;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.velX=velX;

        this.img.src=src;
        this.img.style.width=this.width+"px";
        this.img.style.height=this.height+"px";
        this.img.style.position="absolute";
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
        this.img.style.float="left";

        this.container.appendChild(this.img);
    }
    move(){
        this.img.style.left=(score/3)+"px";
    }
}