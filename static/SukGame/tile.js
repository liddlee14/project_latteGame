var tileSrc=["/SukGame/images/tiles/towertile0.png","/SukGame/images/tiles/towertile1.png","/SukGame/images/tiles/towertile2.png","/SukGame/images/tiles/road.png"]
var map=[
    [0,3,1,2,2,2,1,2,2,2,1,3,0],
    [1,3,1,3,3,3,1,3,3,3,1,3,1],
    [1,3,1,3,0,3,1,3,0,3,1,3,1],
    [1,3,1,3,1,3,1,3,1,3,1,3,1],
    [1,3,1,3,1,3,1,3,1,3,1,3,1],
    [1,3,1,3,1,3,1,3,1,3,1,3,1],
    [1,3,1,3,1,3,1,3,1,3,1,3,1],
    [1,3,2,3,1,3,2,3,1,3,2,3,1],
    [1,3,3,3,1,3,3,3,1,3,3,3,1],
    [2,2,2,2,2,2,2,2,2,2,2,2,2]            
];
var xTile=13;
var yTile=10;

class BgTiles extends Content{
    constructor(container,src,width,height,x,y,a,i,n){
        super(container,src,width,height,x,y);
        this.index=n;
        this.divBorder(a,i);
    }
    divBorder(a,i){
        this.div.style.backgroundSize="cover";
        this.div.style.border="1px solid pink"
        this.div.addEventListener("click", function(){
            posInput[0].value=a;
            posInput[1].value=i;
            var index=tileArray[a][i].index;
            if(index>=3){
                towerBt.disabled=true;
                towerBt.innerText="건설불가";
            }else{
                if(gold>=50){
                    towerBt.disabled=false;
                    towerBt.innerText="타워건설";
                }else{
                    towerBt.disabled=true;
                    towerBt.innerText="골드부족";
                }
            }
        });
    }
}