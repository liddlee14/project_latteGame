class Coffee{
 
    constructor(container, src, width, height, x, y, velX, velY){
        this.container=container;
        this.img = document.createElement("img");
        this.src=src;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.velX=velX;
        this.velY=velY;

        this.img.src=src;
        this.img.style.width=this.width+"px";
        this.img.style.height=this.height+"px";
        this.img.style.position="absolute";
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
        this.img.style.opacity=2+"px";
        this.img.style.float="left";

        this.container.appendChild(this.img);
    }
    tick(){
        this.x+=this.velX; 
        this.y+=this.velY;

        if(this.x<=0){ 
            this.x=0;
        }
        if(this.y<=0){
            this.y=0
        }
        
        for(var i=0;i<enemyArray.length;i++){
            if(hitTest(this.img, enemyArray[i].img)){
                removeObject(this.container, enemyArray[i].img, enemyArray, i);
                removeObject(info, hpArray[hpArray.length-1].img, hpArray, hpArray.length-1);
           }
        }
        if(bossCount==1){
            if(hitTest(this.img, boss.img)){
                removeObject(info, hpArray[hpArray.length-1].img, hpArray, hpArray.length-1);
            }
        }
        if(hpArray.length==0){
                if(deathCount==0){
                    clearInterval(gameInterval);
                    var div = document.createElement("div");
                    div.style.fontSize="150px";
                    div.style.textAlign="right";
                    div.style.color="white";
                    div.style.fontWeight="bold";
                    div.innerHTML="GAME OVER <br><a href=\"javascript:location.reload()\">재도전</a>";
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
                        let postBody = "score=" + score + "&game=sc";
                        xhttp.send(postBody);
                    }
                    deathCount++;
                    this.container.appendChild(div);
                }
            }

        if(this.x>=screen.width-this.width){ 
            this.x=screen.width-this.width;
        }
        if(this.y>=800-this.height){
            this.y=800-this.height;
        }
    }

    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }

}