/*몸통을 만들어보자*/ 
class Wbody{
    constructor(container, src,width, height, x, y,velX,velY){
        //멤버변수(객체와 생명을 같이 하는 변수)
        this.container=container;
        this.img=document.createElement("img");
        this.src=src;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.velX=velX;
        this.velY=velY;


        //아이템의 모습을 설정해본다.
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
    tick(){
        this.x=wArray[wArray.indexOf(this)-1].x;
        this.y=wArray[wArray.indexOf(this)-1].y;


    }
    //그래픽 적 처리
    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";

    }
}