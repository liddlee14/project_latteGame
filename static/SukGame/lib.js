//재 사용성이 높은 코드는 모아두자

//매개변수 n 0~n미만까지 랜덤수 반환
function getRandom(n){
    var r =parseInt(Math.random()*n);
    return r;
}

//오브젝트 제거
function removeObject(container,child,arr,index){
    //부모 div로 부터 제거
    container.removeChild(child);
    //배열에서 삭제
    arr.splice(index,1);
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
function rangeCheck(me, target, range) {
    //두물체간 충돌 여부 판단 
    me_x= parseInt(me.style.left);
    me_y= parseInt(me.style.top);
    me_width=parseInt(me.style.width);
    me_height=parseInt(me.style.height);
    // console.log(me_x,me_y,me_width,me_height);
    


    //타겟 xy를 4점 주고 4점중에 어디든지 범위안에 있으면 무조건 리턴 트루


    target_x= parseInt(target.style.left)-parseInt(range/2)-50;
    target_y= parseInt(target.style.top)-parseInt(range/2)-50;
    target_width=parseInt(target.style.width)+range+100;
    target_height=parseInt(target.style.height)+range+100;
    // console.log(target_x,target_y,target_width,target_height);

    
    var result1=(me_x >= target_x) && (me_x <= (target_x+target_width));//나의 x좌표위치가 타겟의 x range 내에 있는지 판단 
    var result2=(me_x+me_width >= target_x) && (me_x+me_width <= (target_x+target_width));  //나의 가로폭이 타겟의 가로폭 내에 있는지 판단
    var result3=(me_y >= target_y) && (me_y <= (target_y+target_height));//나의 y좌표위치가 타겟의 세로폭 내에 있는지 판단
    var result4=(me_y+me_height >= target_y) && (me_y+me_height <= (target_y+target_height));//나의 y폭이 타겟의 세로폭 내에 있는지 판단
    // console.log(result1,result2,result3,result4);
    return (result1 || result2) && (result3 || result4);
}

function getZeroString(n){
    var result=(n>=10)?n:"0"+n;
    return result;
}