// 아이템 생성

class Item{
    constructor(container, src, width, height, x, y){
        this.container=container;
        this.img=document.createElement("img");
        this.src=src;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;

        this.img.src=src;
        this.img.style.width=this.width+"px"
        this.img.style.height=this.height+"px"

        this.img.style.position="absolute";
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";

        this.container.appendChild(this.img);
    }

    
}