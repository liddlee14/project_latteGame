/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
앞으로 졸업할때까지 유용하고 재사용성이 높은 코드는 모아두자
나만의 라이브러리
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/ 


/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
매개변수 n : 0~n미만까지의 랜덤한 수를 반환하는 함수
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/ 
function getRandom(n){
    var r = parseInt(Math.random()*n); //0.000xxx~n미만 사이의 난수 발생시켜줌
    return r;
}

/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
게임 등에서 메모리 제거 및 화면상의 제거를 담당할 함수
cotrainer : 어떤 부모 요소에서 지울지 결정
child : 어떤 요소를 지울지
arr : 어떤 배열에 있는지
index : 해당 배열의 몇번째 요소를 지울지
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/ 

function removeObject(container, child, arr, index){ // 오브젝트 삭제= (1.화면에서 삭제 2.메모리상 삭제_
    //화면에서 삭제 (부모div로 부터 제거)
    //부모div.removeChild(지울대상 즉 자식요소)\;
    container.removeChild(child);// 부모 div로부터 자식의 지울대상 // 여기까지가 화면에서의 삭제
    //배열에서의 삭제(메모리상)
    //배열.splice(몇번째녀석, 몇개를?);
    arr.splice(index,1);
}

function collisionCheck(me, you){
    var result=false; // 이 함수 호출자가 최종적으로 얻어갈 논리값 (true 충돌, false 불충돌)
    //왼쪽 상단만 체크 (내일 나머지 3개면에 대해서도 마무리)
    var x1 = parseInt(me.style.left); //px제거
    var y1 = parseInt(me.style.top); //px제거
    var w1 = parseInt(me.style.width); //px제거
    var h1 = parseInt(me.style.height); //px제거

    //타겟이 되는 사각형에 대한 정보
    var x2 = parseInt(you.style.left); //px제거
    var y2 = parseInt(you.style.top); //px제거
    var w2 = parseInt(you.style.width); //px제거
    var h2 = parseInt(you.style.height); //px제거
    
    var check1=((x1+w1)>=x2 &&(y1+h1)>=y2) &&(x1 <=(x2+w2) ); // 2사분면에 대한 충돌판단 그리고, 상대방의 x축의
                                                                    // 너비를 더한 좌표보다는 이하여야 함.
    var check2=false; // 3사분면에 대한 충돌판단
    var check3=false; // 4사분면에 대한 충돌판단
    var check4=false;//  1사분면에 대한 충돌판단

    result = check1 || check2 || check3 || check4;
    return result;
}


function hitTest(me, target) {
    //두물체간 충돌 여부 판단 
    me_x= parseInt(me.style.left);
    me_y= parseInt(me.style.top);
    me_width=parseInt(me.style.width);
    me_height=parseInt(me.style.height);

    target_x= parseInt(target.style.left);
    target_y= parseInt(target.style.top);
    target_width=parseInt(target.style.width);
    target_height=parseInt(target.style.height);


    var result1=(me_x >= target_x) && (me_x <= (target_x+target_width));//나의 x좌표위치가 타겟의 x range 내에 있는지 판단 
    var result2=(me_x+me_width >= target_x) && (me_x+me_width <= (target_x+target_width));  //나의 가로폭이 타겟의 가로폭 내에 있는지 판단
    var result3=(me_y >= target_y) && (me_y <= (target_y+target_height));//나의 y좌표위치가 타겟의 세로폭 내에 있는지 판단
    var result4=(me_y+me_height >= target_y) && (me_y+me_height <= (target_y+target_height));//나의 y폭이 타겟의 세로폭 내에 있는지 판단
    
    return (result1 || result2) && (result3 || result4);
}


/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
자리수 처리 함수
한자리수의 경우 앞에 0붙이기
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/ 
function getZeroString(n){
    var result=(n>=10)?n:str="0"+n;
    return result;
}


function rangeCheck(me, target) {
    //두물체간 충돌 여부 판단 
    me_x= parseInt(me.style.left);
    me_y= parseInt(me.style.top);
    me_width=parseInt(me.style.width);
    me_height=parseInt(me.style.height);
    // console.log(me_x,me_y,me_width,me_height);
    


    //타겟 xy를 4점 주고 4점중에 어디든지 범위안에 있으면 무조건 리턴 트루


    target_x= parseInt(target.style.left);
    target_y= parseInt(target.style.top);
    target_width=parseInt(target.style.width);
    target_height=parseInt(target.style.height);
    // console.log(target_x,target_y,target_width,target_height);

    
    var result1=(me_x >= target_x) && (me_x <= (target_x+target_width));//나의 x좌표위치가 타겟의 x range 내에 있는지 판단 
    var result2=(me_x+me_width >= target_x) && (me_x+me_width <= (target_x+target_width));  //나의 가로폭이 타겟의 가로폭 내에 있는지 판단
    var result3=(me_y >= target_y) && (me_y <= (target_y+target_height));//나의 y좌표위치가 타겟의 세로폭 내에 있는지 판단
    var result4=(me_y+me_height >= target_y) && (me_y+me_height <= (target_y+target_height));//나의 y폭이 타겟의 세로폭 내에 있는지 판단
    // console.log(result1,result2,result3,result4);
    return (result1 || result2) && (result3 || result4);
}