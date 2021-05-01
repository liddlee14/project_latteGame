class Bullet{

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

        this.img.src=this.src;
        //크기
        this.img.style.width=this.width+"px";
        this.img.style.height=this.height+"px";
        //위치
        this.img.style.position="absolute";
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";

        //부모 요소에 부착
        this.container.appendChild(this.img);
    }
    //물리량 변화
    tick(){
        this.x += this.velX;
        this.y += this.velY;

        for(var i=0;i<enemyArray.length;i++){
            var hitResult = hitTest(this.img, enemyArray[i].img);
            if(hitResult){
                removeObject(this.container, this.img, bulletArray, bulletArray.indexOf(this)); //총알 제거
                removeObject(this.container, enemyArray[i].img, enemyArray, i); //적군 제거
                score+=10;
            }
        }
        
        if(this.x > screen.width){
            var index = bulletArray.indexOf(this);
            removeObject(this.container, this.img, bulletArray, index);
        }
    }
    //그래픽적 처리
    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }
}