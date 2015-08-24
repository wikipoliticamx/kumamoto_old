var playing = false;
$(function(){
    $(".youtubeBackground").click(function(){
        if(playing){
            $(".youtubeBackground").YTPStop();
        }else{
            $(".youtubeBackground").YTPlayer();
        }
        playing = !playing;
    });
   });
