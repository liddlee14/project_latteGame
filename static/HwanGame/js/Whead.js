/* 머리를 만들어 보자*/ 
class Whead{
    constructor(container,src,width, height, x, y, velX, velY){
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
        //x축 막기
        if(this.x<=-100){ // 좌측 화면 밖으로 나가지 않도록 고정
            this.x=-100;
            removeObject(this.container,wHead.img, wArray,0); //몸통삭제
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
                let postBody = "score=" + score + "&game=cd";
                xhttp.send(postBody);
            }
        }
        if(this.x>=1100-this.width){ // 우측 화면 밖으로 나가지 않도록 고정
            this.x=1100-this.width;
            removeObject(this.container,wHead.img, wArray,0); //몸통삭제
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
                let postBody = "score=" + score + "&game=cd";
                xhttp.send(postBody);
            }
        }
        //y축 막기
        if(this.y<=-100){//아래로 안나가기
            this.y=-100;
            removeObject(this.container,wHead.img, wArray,0); //몸통삭제
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
                let postBody = "score=" + score + "&game=cd";
                xhttp.send(postBody);
            }
        }
        if(this.y>=850- this.height){ //위로
            this.y=850- this.height;
            removeObject(this.container,wHead.img, wArray,0); //몸통삭제
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
                let postBody = "score=" + score + "&game=cd";
                xhttp.send(postBody);
            }
        }
        //몸통 취득 (몸통과의 충돌검사)
        for(var i=0; i<wBodyArray.length;i++){
            if(hitTest(this.img, wBodyArray[i].img)){ // 몸통과 충돌
                //removeObject(어디어세 지울지, 누구를 지울지, 어느배열에서 ,몇번째인덱스);
                removeObject(this.container,wBodyArray[i].img, wBodyArray ,i); //몸통삭제
                plusBody();//몸통추가
                score+=10;
            }
        }
        //머리와 먹은 몸통 충돌시
        for(var i=1; i<wArray.length;i++){
            if(rangeCheck(wArray[0].img, wArray[i].img)){ 
            //removeObject(어디어세 지울지, 누구를 지울지, 어느배열에서 ,몇번째인덱스);
            //a++;
            collision();//충돌시 삭제
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
                let postBody = "score=" + score + "&game=cd";
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
