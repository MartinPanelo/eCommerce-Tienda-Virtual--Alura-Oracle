ImgBanner = document.getElementById("ImgBanner");

addEventListener("load", function(){

   console.log(ImgBanner.width); 
if(ImgBanner.width <= 350){
    ImgBanner.src = "./assets/Banner350.png"
}
if(ImgBanner.width > 350 && ImgBanner.width <= 768){
    ImgBanner.src = "./assets/Banner768.png"
}
});




