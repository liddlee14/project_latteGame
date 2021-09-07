/*총알을 정의한다*/
class Bullet extends Content{
    /*변수(Property), 함수(Method)*/
    constructor(container, src, width, height, x, y, target){
        //멤버변수 (객체와 생명을 같이 하는 변수)
        super(container, bulletSrcArr[src], width, height, x, y);
        this.target=target;
        this.div.style.backgroundSize="cover";
        this.damage=src+1;
    }

    //물리량 변화
    tick(){
        this.count++;
        this.targetX = parseFloat(this.target.div.style.left)+15;
        this.targetY = parseFloat(this.target.div.style.top)+15;

        var hitResult = hitTest(this.div,this.target.div);
        if(hitResult){
            removeObject(this.container, this.div, bulletArr, bulletArr.indexOf(this));
            
            hitSounds.play();
            this.target.hp-=this.damage;
            score+=this.damage;
        }
    }
    
    render(){
        this.div.style.left=parseFloat(this.div.style.left)+0.5*(this.targetX-parseFloat(this.div.style.left))+"px";
        this.div.style.top=parseFloat(this.div.style.top)+0.5*(this.targetY-parseFloat(this.div.style.top))+"px";
    }
}
//총알 단계별 src 배열
var bulletSrcArr=["/SukGame/images/bullet/q1.png","/SukGame/images/bullet/q2.png","/SukGame/images/bullet/q3.png","/SukGame/images/bullet/q4.png"];

// 총알 피격음
var hitSounds = new Howl({
    src: ['/SukGame/sounds/Bosshit.wav'],
    autoplay: true,
    volume: 0.1,
});