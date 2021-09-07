/*
게시물을 만들 수 있는 틀!!
*/
class Comments{
    constructor(container,msg,author,writeDay){
        this.container=container;
        this.wrapper;
        this.msgDiv;
        this.authorDiv;
        this.writeDayDiv;

        this.msg=msg
        this.author=author
        this.writeDay=writeDay

        this.wrapper=document.createElement("div")
        this.msgDiv=document.createElement("div")
        this.authorDiv=document.createElement("div")
        this.writeDayDiv=document.createElement("div")

        this.msgDiv.style.width=70+"%";
        this.authorDiv.style.width=15+"%";
        this.writeDayDiv.style.width=10+"%";

        this.msgDiv.innerHTML=this.msg;
        this.authorDiv.innerHTML=this.author;
        this.writeDayDiv.innerHTML=this.writeDay;

        this.wrapper.classList.add("comment-list");

        this.wrapper.appendChild(this.msgDiv);
        this.wrapper.appendChild(this.authorDiv);
        this.wrapper.appendChild(this.writeDayDiv);

        this.container.appendChild(this.wrapper);
    }
}