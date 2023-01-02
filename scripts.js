ImgBanner = document.getElementById("ImgBanner");
btnlogin = document.getElementById("lg");
modallogin = document.getElementById("ml");
modallogin.style.display = "none";

function Credenciales(flag){

    
    if(flag){
        document.body.scrollIntoView({
            behavior: "auto",
          });
        modallogin.style.display = "block";
        document.body.classList.add('stopscroll');
    }else{
        modallogin.style.display = "none";
        document.body.classList.add('scroll');
    }
   
 
      /*   modallogin.style.display = "none";
        document.body.classList.add('scroll'); */


}




//addEventListener("resize", AjustarBanner());
addEventListener("load", AjustarBanner());
window.onresize = AjustarBanner;

function AjustarBanner() {
    console.log(ImgBanner.width); 
    if(ImgBanner.width < 768){
        ImgBanner.src = "./assets/Banner350.png"
    }
    if(ImgBanner.width >= 768 && ImgBanner.width < 1440){
        ImgBanner.src = "./assets/Banner768.png"
    }
}



const url = "http://localhost:8080/inventario";
let listaInventario;

fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data);
    crearGondola(data);
})
.catch(err => console.log("posibles erroes" +err));



   /*  console.log(data[0].categoria);
    console.log(data.length);  */



 /*    if(data.length >= 0){ */

/*         let cate = document.createElement("div");
        cate.classList.add("Categoriaitems");
    
        let divtitulo = document.createElement("div");
        divtitulo.classList.add("Opcs");
        let titulo = document.createElement("h1");
        titulo.innerHTML = data[0].categoria;

        divtitulo.appendChild(titulo);
        cate.appendChild(divtitulo);
        contitems.appendChild(cate); */

 // primero creo todas las categorias

contitems = document.getElementById("ConteinerItems");
function crearGondola(data) {
        let flag = true;
        for(let i = 0 ; i < data.length; i++) {
            flag = true;
            for(let j = 0 ; j < i; j++) {// sale true si son distintos

               // console.log(data[i].categoria != data[j].categoria);
                if(data[i].categoria == data[j].categoria){
                    flag = false;
                }
            }
            if(flag){
                
                let cate = document.createElement("div");
                cate.classList.add("Categoriaitems");
            
                let divtitulo = document.createElement("div");
                divtitulo.classList.add("Opcs");
                let titulo = document.createElement("h1");
                titulo.innerHTML = data[i].categoria;

                let listaitems = document.createElement("div");
                listaitems.classList.add("ListaItems");
                /* mouseWheel = document.querySelector('.ListaItems'); */


                divtitulo.appendChild(titulo);
                cate.appendChild(divtitulo);
                contitems.appendChild(cate);
                cate.appendChild(listaitems);


                const mouseWheel = document.querySelector('.ListaItems');
              
                mouseWheel.addEventListener('wheel', function(e) {
                
                  console.log(parseInt(mouseWheel.scrollWidth - mouseWheel.clientWidth));
                  console.log("Horizontal: " + parseInt(mouseWheel.scrollLeft)); 


                   if((!(mouseWheel.scrollLeft == 0 && e.deltaY < 0)) && (!(parseInt(mouseWheel.scrollLeft) > parseInt(mouseWheel.scrollWidth - mouseWheel.clientWidth - 10) && e.deltaY > 0))){
                        if (e.deltaY > 0){ // Scroll right
                            mouseWheel.scrollLeft += 50;
                            e.preventDefault();
                        }
                        else{ // Scroll left
                            mouseWheel.scrollLeft -= 50;
                            e.preventDefault();
                        }
                   }
                    
                   
                 

                });

                for(let i=0; i<data.length; i++){

                  
                    if(data[i].categoria == titulo.innerHTML){

                        
                        let item = document.createElement("div");
                        item.classList.add("Item");
                        let img = document.createElement("img");
                        img.src="https://via.placeholder.com/175";
                        let pnombre = document.createElement("p");
                        pnombre.innerHTML =data[i].nombre;
                        let pprecio = document.createElement("p");
                        pprecio.innerHTML =data[i].precio;
                        let linkdeproducto = document.createElement("a");
                        linkdeproducto.innerHTML = "Ver producto";
                        linkdeproducto.href = "acavaellinkconconsultaincluida"
                        item.appendChild(img);
                        item.appendChild(pnombre);
                        item.appendChild(pprecio);
                        item.appendChild(linkdeproducto);
                        listaitems.appendChild(item);

                    }

                }
            
            }
            
            
        
        /*      } */

        }
    

 

   

   

    



}

/* const mouseWheel = null;// = document.querySelector('.ListaItems'); */

