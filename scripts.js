ImgBanner = document.getElementById("ImgBanner");
btnlogin = document.getElementById("lg");
modallogin = document.getElementById("ml");
contitems = document.getElementById("ConteinerItems");
modallogin.style.display = "none";
let token = 0;
const url = "http://localhost:8080/inventario";

function Credenciales(flag){
    msjuser = document.getElementById("msjuser");
    msjuser = msjuser.innerHTML = "" ;
    
    if(flag){
        document.body.scrollIntoView({
            behavior: "auto",
          });
        modallogin.style.display = "block";
        document.body.classList.add('stopscroll');
        document.body.classList.remove('scroll');
    }else{
      
        modallogin.style.display = "none";
        document.body.classList.add('scroll');
        document.body.classList.remove('stopscroll');
    }
   
 
      /*   modallogin.style.display = "none";
        document.body.classList.add('scroll'); */


}

function Login(){

user = document.getElementById("inputUser");
pass = document.getElementById("inputPass");

/* http://localhost:8080/inventario/login/Admin/1234 */



fetch(url+"/"+"login"+"/"+user.value+"/"+pass.value)
.then(response => response.json())
.then(datatoken => {
    token = datatoken;

    if(token == 404){
        msjuser = document.getElementById("msjuser");
        msjuser = msjuser.innerHTML = "-ERROR EN LAS CREDENCIALES-" ;
    }else{
        mostarOpcs();
    }
})
.catch(err => console.log("posibles erroes" +err));

}

function mostarOpcs(){


}


//addEventListener("resize", AjustarBanner());
addEventListener("load", AjustarBanner());
window.onresize = AjustarBanner;

function AjustarBanner() {
   /*  console.log(ImgBanner.width);  */
    if(ImgBanner.width < 768){
        ImgBanner.src = "./assets/Banner350.png"
    }
    if(ImgBanner.width >= 768 && ImgBanner.width < 1440){
        ImgBanner.src = "./assets/Banner768.png"
    }
}






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

                let imgadd = document.createElement("i");                      
                imgadd.classList.add("fa-solid");
                imgadd.classList.add("fa-plus");
                imgadd.classList.add("fa-2x");
                let linkadd = document.createElement("a");
                linkadd.classList.add("editdelete");
                linkadd.href ="#";
                linkadd.appendChild(imgadd);


                

                divtitulo.appendChild(titulo);
                divtitulo.appendChild(linkadd);
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


                        let opcs = document.createElement("div");
                        opcs.classList.add("opcitem");

                        



                          let imgedit = document.createElement("i");                      
                          imgedit.classList.add("fa-solid");
                          imgedit.classList.add("fa-trash");
                          imgedit.classList.add("fa-2x");
                         
                          let linkedit = document.createElement("a");
                          linkedit.classList.add("editdelete");
                          linkedit.href ="#";
                          linkedit.appendChild(imgedit);
                         


                        let imgdelet = document.createElement("i");

                        imgdelet.classList.add("fa-solid");
                        imgdelet.classList.add("fa-pen-to-square");
                        imgdelet.classList.add("fa-2x");

                       
                        let linkdelet = document.createElement("a");
                        linkdelet.classList.add("editdelete");
                        linkdelet.href ="#";
                        linkdelet.appendChild(imgdelet);


                       opcs.appendChild(linkedit);
                       opcs.appendChild(linkdelet);
                        
                        let item = document.createElement("div");
                        item.classList.add("Item");
                        let img = document.createElement("img");
                        /* console.log(data[i].urlimg); */
                        img.src="https://via.placeholder.com/175";
                        img.classList.add("Itemimg");
                        let pnombre = document.createElement("p");
                        pnombre.innerHTML =data[i].nombre;
                        let pprecio = document.createElement("p");
                        pprecio.innerHTML =data[i].precio;
                        let linkdeproducto = document.createElement("a");
                        linkdeproducto.innerHTML = "Ver producto";
                        linkdeproducto.href = "acavaellinkconconsultaincluida"

                       


                        item.appendChild(img);
                        item.appendChild(opcs);
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

