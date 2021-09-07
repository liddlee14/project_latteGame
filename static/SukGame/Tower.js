class Tower extends Content{
    constructor(container,src,x,y,range,attSpeed,index){
        super(container,src,20,30,x+25,y+15);
        this.range=range;
        this.attSpeed=attSpeed;
        this.count=0;
        this.index=index;
        this.n=3;
        this.move=0;
        this.stage=1;
    }
    attShot(){
        if(this.count%this.attSpeed==0){
            for(var i=0;i<enemyArray.length;i++){
                var checkRange=rangeCheck(enemyArray[i].div,this.div,this.range)
                if(checkRange){
                    //container, src, width, height, x, y, target
                    var bullet=new Bullet(this.container, towerBulArr[this.index]%4,15,15,this.x+5,this.y+5,enemyArray[i])
                    bulletArr.push(bullet);
                    //0 1 2 3  왼 상 우 하
                    if(enemyArray[i].y>this.y+(this.range/3)){
                        this.n=3;
                    }else if(enemyArray[i].y<this.y-(this.range/3)){
                        this.n=1;
                    }else{
                        if(enemyArray[i].x>this.x){
                            this.n=2;
                        }else{
                            this.n=0;
                        }
                    }
                    break;
                }
            }
        }
        this.count++
        this.move+=this.stage;
        if(this.move>297){
            this.move=0
        }

        //렌더링까지 한번에..
        var move=parseInt(this.move/100)
        this.div.style.backgroundPosition=towerIdleArr[this.index][this.n][move].pos;
        this.div.style.width=towerIdleArr[this.index][this.n][move].width;
        this.div.style.height=towerIdleArr[this.index][this.n][move].height;
    }
}
// 차등 공격력, 차등 공격이미지
var towerBulArr=[0,0,0,0];

function upgradeBul(button,n){
    var price=parseInt(button.innerText)
    if(gold>=price){
        gold-=price
        button.innerText=parseInt(button.innerText)*2
        towerBulArr[n]+=1;
    }
}