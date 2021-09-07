// 장애물

class Bean{
    constructor(container, src, width, height, x, y, velX, velY){
        this.container=container;
        this.img=document.createElement("img");
        this.src=src;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.velX=velX;
        this.velY=velY;

        this.limitX=parseInt(this.container.style.width); //공의 x축 한계점

        this.img.src=src;
        this.img.style.width=this.width+"px";
        this.img.style.height=this.height+"px";
        this.img.style.position="absolute";
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";

        this.container.appendChild(this.img);
        
    }

    tick(){
        this.x+=this.velX;
        this.y+=this.velY;
        
        if(this.x<0 || this.y<0){//배열 제거
            removeObject(this.container, this.img, beanArray, beanArray.indexOf(this));
        }
        
        if(this.x>parseInt(mainPage.style.width) || this.y>parseInt(mainPage.style.height)){
            removeObject(this.container, this.img, beanArray, beanArray.indexOf(this));
        }

        if(this.x>=this.limitX-this.width){ //x축 mainPage 경계선 넘지않도록
            removeObject(this.container, this.img, beanArray, beanArray.indexOf(this));
        }

    }

    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }
}