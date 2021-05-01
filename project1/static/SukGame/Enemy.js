class Buyer extends Content{
    constructor(container,src,width,height,x,y,hp,stage){
        super(container,src,width,height,x,y);
        this.hp=hp+parseInt(stage*3)+(Math.floor(stage/10)*10);
        this.stage=stage;
        this.velY=1+(this.stage/2);
        this.velX=0;
        this.move=0;
        this.n=3;
    }
    tick(){
        this.x+=this.velX;
        this.y+=this.velY;

        //HP확인
        if(this.hp<=0){
            removeObject(this.container,this.div,enemyArray,enemyArray.indexOf(this))
            gold+=(this.stage<=20)?10:20;
        }

        // 움직임 제어
        if(this.x<180 && this.y>670){
            this.y=670;
            this.velY=0;
            this.velX=1+(this.stage/2);
        }else if(254<this.x&&this.x<330&& this.y>=670){
            this.x=255;
            this.velY=-(1+(this.stage/2));
            this.velX=0;
        }else if(254<this.x&&this.x<330&& this.y<145){
            this.y=145;
            this.velY=0;
            this.velX=1+(this.stage/2);
        }else if(404<this.x&&this.x<480&&this.y<=145){
            this.x=405;
            this.velY=1+(this.stage/2);
            this.velX=0;
        }else if(404<this.x&&this.x<480&&this.y>=670){
            this.y=670;
            this.velY=0;
            this.velX=1+(this.stage/2);
        }else if(554<this.x&&this.x<630&& this.y>=670){
            this.x=555;
            this.velY=-(1+(this.stage/2));
            this.velX=0;
        }else if(554<this.x&&this.x<630&& this.y<145){
            this.y=145;
            this.velY=0;
            this.velX=1+(this.stage/2);
        }else if(704<this.x&&this.x<780&&this.y<=145){
            this.x=705;
            this.velY=1+(this.stage/2);
            this.velX=0;
        }else if(704<this.x&&this.x<780&&this.y>=670){
            this.y=670;
            this.velY=0;
            this.velX=1+(this.stage/2);
        }else if(854<this.x&&this.x<930&& this.y>=670){
            this.x=855;
            this.velY=-(1+(this.stage/2));
            this.velX=0;
        }else if(this.x>854&& this.y<=80){
            removeObject(this.container,this.div,enemyArray,enemyArray.indexOf(this))
            userHp--
        }

        if(this.velX==0){
            this.n = (this.velY>=1)? 3:1;
        }else if(this.velY==0){
            this.n = (this.velX>=1)? 2:0;
        }
        this.move+=this.stage;
        if(this.move>297){
            this.move=0
        }

    }
    render(){
        var actN=(this.stage-1)%12;
        var move=parseInt(this.move/100)
        this.div.style.backgroundPosition=actArry[actN][this.n][move].pos;
        this.div.style.width=actArry[actN][this.n][move].width;
        this.div.style.height=actArry[actN][this.n][move].height;
        this.div.style.left=this.x+"px";
        this.div.style.top=(this.y-parseInt(this.div.style.height))+"px";
    }
}