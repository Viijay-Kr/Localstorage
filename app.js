$(document).ready(function(){
        $(".textareausr1,.textareausr2").animate({
          scrollTop:500
        },100);
        $("#edit").hide();
        var i=0;
        function loaddata(){
        //localStorage.clear();
        if(!localStorage.getItem('chatdata'))
       		{ 
       		 console.log("No messages to show");
          }
       	else
       	   {
       	    var localstore=JSON.parse(localStorage.getItem('chatdata'));	
       	   	//console.log(localstore.length);
       	   	while(i<localstore.length){
               if(localstore[i].user1)
                {
                 //console.log(i+" "+localstore[i].user1);
                 $(".textareausr1").append("<div class=msgofusr1 id=m"+i+">"+localstore[i].user1+"</div><button id=m"+i+"  type=button class=btn onclick=showtextbox(this.id)>Edit</button><input type=text class=m"+i+" style=display:none onkeyup=changetext(this.className) ><button type=button class=m"+i+" style=display:none onclick=hidediv(this.className)>Done</button><br>");
                 $(".textareausr2").append("<div class=msgforusr2 id=d"+i+">"+localstore[i].user1+"</div><br>");
                }
               if(localstore[i].user2)
               	{
               	 //console.log(i+" "+localstore[i].user2);
                 $(".textareausr2").append("<div class=msgofusr2 id=n"+i+">"+localstore[i].user2+"</div><button id=n"+i+"  type=button class=btn onclick=showtextbox(this.id)>Edit</button><input type=text class=n"+i+" style=display:none onkeyup=changetext(this.className) ><button type=button class=n"+i+" style=display:none onclick=hidediv(this.className)>Done</button><br>"); 
       	   	     $(".textareausr1").append("<div class=msgforusr1 id=e"+i+">"+localstore[i].user2+"</div><br>");
       	   	    }
               i=i+1;
            }
       	   }	
       }
      loaddata(); 
      // if(i)
      //     var i=0;
      $(".usr1btn").click(function(){
      	$(".textareausr1,.textareausr2").animate({
          scrollTop:500
        },100);
        var msg=$(".usr1msg").val();
        if(msg=='')
         { alert("Enter a Value");return;}
        //else{
        var oldmsgs=JSON.parse(localStorage.getItem('chatdata')) || [];
        var messages={"user1":msg};
        oldmsgs.push(messages);
      	var store=JSON.stringify(oldmsgs);
        console.log(store);
        localStorage.setItem('chatdata',store);
        i=i+1;
        //var localstore=JSON.parse(localStorage.getItem('chatdata'));
        $(".textareausr1").append("<div class=msgofusr1 id=m"+i+">"+msg+"</div><button id=m"+i+"  type=button class=btn onclick=showtextbox(this.id)>Edit</button><input type=text class=m"+i+" style=display:none onkeyup=changetext(this.className) ><button type=button class=m"+i+" style=display:none onclick=hidediv(this.className)>Done</button><br>");
        $(".textareausr2").append("<div class=msgforusr2 id=d"+i+">"+msg+"</div><br>");
        $(".usr1msg").val("").focus();
      //}
        // $("#m"+i).click(function(){
        //    
           //console.log($(this).attr("id"));
         // });
      });
        //if(i)
          //i=0;
        $(".usr2btn").click(function(){
      	console.log(i);
        $(".textareausr1,.textareausr2").animate({
          scrollTop:500
        },100);
        var msg=$(".usr2msg").val();
      	var oldmsgs=JSON.parse(localStorage.getItem('chatdata')) || [];
        var messages={"user2":msg};
        oldmsgs.push(messages);
      	var store=JSON.stringify(oldmsgs);
        localStorage.setItem('chatdata',store);
        i++;
        //var localstore=JSON.parse(localStorage.getItem('chatdata'));
      	$(".textareausr2").append("<div class=msgofusr2 id=n"+i+">"+msg+"</div><button id=n"+i+"  type=button class=btn onclick=showtextbox(this.id)>Edit</button><input type=text class=n"+i+" style=display:none onkeyup=changetext(this.className) ><button type=button class=n"+i+" style=display:none onclick=hidediv(this.className)>Done</button><br>");
      	$(".textareausr1").append("<div class=msgforusr1 id=e"+i+">"+msg+"</div><br>");
        $(".usr2msg").val(" ").focus();
      });
   
});
var oldtext;
function showtextbox(id){
   $("."+id).css("display","inline-block");
   id.split(" ");
   var last=id.substr(1,id.length-1);
   if(id[0]=='m')
    oldtext=$("#m"+last).text();
   if(id[0]=='n')
    oldtext=$("#n"+last).text();
}
function changetext(cls){
  cls.split(" ");
  var last=cls.substr(1,cls.length-1);
  var editing=$("."+cls).val();
  if(cls[0]=='m')
  { 
   $("#d"+last).text(editing);
   $("#m"+last).text(editing);
  }
  if(cls[0]=='n')
  {
   $("#e"+last).text(editing);
   $("#n"+last).text(editing);
  }
 }
function hidediv(clss){
  $("."+clss).val(" ");
  $("."+clss).css("display","none");
  clss.split(" ");
  var last=clss.substr(1,clss.length-1);
  var old=JSON.parse(localStorage.getItem('chatdata'));
  var store,local;
  var text;
  //console.log(oldtext);
  if(clss[0]=='m')
   {
   text=$("#m"+last).text();
   for(var j=0;j<old.length;j++)
     {
      if(old[j].user1==oldtext)
        old[j].user1=text; 
      console.log(old[j].user1);
     }
  }
  if(clss[0]=='n')
   {
   text=$("#n"+last).text();
   console.log(oldtext);
   for(var j=0;j<old.length;j++)
     {
      if(old[j].user2==oldtext)
        old[j].user2=text; 
      console.log(old[j].user2);
     }
  }
  store=JSON.stringify(old)
  local=localStorage.setItem('chatdata',store);
}      