// 메인 캐릭터

class Latte{
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
        this.limitY=parseInt(this.container.style.height); //공의 y축 한계점
      

        this.img.src=src;
        this.img.style.width=this.width+"px";
        this.img.style.height=this.height+"px";
        this.img.style.position="absolute";
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";

        this.container.appendChild(this.img);
    }

    tick(){
        this.x+=this.velX; //등속도 계속 누적
        this.y+=this.velY; //등속도 계속 누적

        if(this.y<=0){ //y축 mainPage 경계선 넘지않도록
            this.y=0;
        } else if(this.y>=this.limitY-this.height){
            this.y=this.limitY-this.height;
        }

        if(this.x<=0){ //x축 mainPage 경계선 넘지않도록
            this.x=0;
        } else if(this.x>=this.limitX-this.width){
            this.x=this.limitX-this.width;
        }

        //아이템과 충돌검사 (스코어)
        for(var i=0; i<itemArray.length;i++){
            var hitResult=hitTest(this.img, itemArray[i].img); 
            if(hitResult){
                removeObject(this.container, itemArray[i].img, itemArray, i); //아이템 제거
                score+=10; 

                var sound = new Howl({
                    src: ['/EstherGame/music/itemMusic.wav'],
                    autoplay: false,
                    loop: false,
                    volume: 0.5,
                });
                sound.play();

                printScore();
            }
        }
        
        // 아이템 2와 충돌
        for(var i=0; i<itemArray2.length;i++){
            var hitResult=hitTest(this.img, itemArray2[i].img); 
            if(hitResult){
                removeObject(this.container, itemArray2[i].img, itemArray2, i); //아이템 제거
                score+=5; 

                var sound = new Howl({
                    src: ['/EstherGame/music/itemMusic.wav'],
                    autoplay: false,
                    loop: false,
                    volume: 0.5,
                });
                sound.play();

                printScore();
            }
        }


        // 적과 충돌검사
        for(var i=0; i<beanArray.length; i++){
           if(hitTest(this.img, beanArray[i].img)){
                // alert("Game Over");
                removeObject(this.container, beanArray[i].img, beanArray, i);
                removeObject(this.container, latteArray[0].img, latteArray, 0);

                var sound = new Howl({
                    src: ['/EstherGame/music/hitMusic.wav'],
                    autoplay: false,
                    loop: false,
                    volume: 0.5,
                });
                sound.play();
            

            
                
                var div=document.createElement("div");
                    div.style.fontSize="100px";
                    div.style.textAlign="center";
                    div.style.position="absolute";
                    div.style.top=15+"%";
                    div.style.left=20+"%";
                    div.style.color="#ffffff";
                    div.style.fontWeight="bold";
                    div.style.height=600+"px";
                    div.innerHTML="GAME OVER <br> Your Score:<br>"+score+"<br><a href=\"javascript:location.reload()\"> Retry?</a>"
                    this.container.appendChild(div);
                
                    if(document.getElementById("noId")==null) {
                        // 랭킹등록
                        var xhttp = new XMLHttpRequest();//비동기 객체 생성
                        //이벤트 처리
                        xhttp.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                if (this.responseText == "notReach") {// 점수갱신 실패시 보이기
                                    if (confirm("Game Over \n 최고점수 갱신 실패 \n retry?")) {
                                        location.reload();
                                    }
                                } else {
                                    if (confirm("Game Over \n 최고점수 달성!!! \n retry?")) {
                                        location.reload();
                                    }
                                }
                            }
                        }
                        xhttp.open("POST", "/updaterank", true);
                        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        let postBody = "score=" + score + "&game=dg";
                        xhttp.send(postBody);
                    }
                    
            }
        }
       
    }

    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";

    }
}