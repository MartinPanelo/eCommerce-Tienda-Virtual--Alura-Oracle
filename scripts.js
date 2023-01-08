ImgBanner = document.getElementById("ImgBanner");
btnlogin = document.getElementById("lg");
modallogin = document.getElementById("ml");
modaladd = document.getElementById("modalAdditem");
contitems = document.getElementById("ConteinerItems");
modallogin.style.display = "none";
modaladd.style.display = "none";
let token = 0;
let datos;
let opcmodal;
let idaux;

const url = "https://doted-flesh-production.up.railway.app/inventario";
const getdatos = async () => {
  try {
    const response = await fetch("https://doted-flesh-production.up.railway.app/inventario");
    const data = await response.json();
    // enter you logic when the fetch is successful
    console.log(data);
    datos = data;
    crearGondola(data);
  } catch (error) {
    // enter your logic for when there is an error (ex. error toast)
    console.log(error);
  }
};

getdatos();

function Credenciales(flag) {
  msjuser = document.getElementById("msjuser");
  msjuser = msjuser.innerHTML = "";

  if (flag && btnlogin.innerHTML == "Login") {
    document.body.scrollIntoView({
      behavior: "auto",
    });
    modallogin.style.display = "block";
    document.body.classList.add("stopscroll");
    document.body.classList.remove("scroll");
  } else {
    btnlogin.innerHTML = "Login";
    token = 0 ;
    crearGondola(datos);
    modallogin.style.display = "none";
    document.body.classList.add("scroll");
    document.body.classList.remove("stopscroll");
  }
}

function Login() {
  user = document.getElementById("inputUser");
  pass = document.getElementById("inputPass");

  /* http://localhost:8080/inventario/login/Admin/1234 */

  fetch(url + "/" + "login" + "/" + user.value + "/" + pass.value)
    .then((response) => response.json())
    .then((datatoken) => {
      token = datatoken;

      if (token == 404) {
        msjuser = document.getElementById("msjuser");
        msjuser = msjuser.innerHTML = "-ERROR EN LAS CREDENCIALES-";
      } else {
        token = datatoken;
        console.log(token);
        console.log(datos);
        btnlogin.innerHTML = "Logout";
        crearGondola(datos);
        modallogin.style.display = "none";
        document.body.classList.add("scroll");
        document.body.classList.remove("stopscroll");
      }
    })
    .catch((err) => console.log("posibles erroes" + err));
}

addEventListener("load", AjustarBanner());
window.onresize = AjustarBanner;

function AjustarBanner() {
  /*  console.log(ImgBanner.width);  */
  if (ImgBanner.width < 768) {
    ImgBanner.src = "./assets/Banner350.png";
  }
  if (ImgBanner.width >= 768 && ImgBanner.width < 1440) {
    ImgBanner.src = "./assets/Banner768.png";
  }
}

function crearGondola(data) {
  if (contitems.hasChildNodes()) {
    while (contitems.childNodes.length >= 1) {
      contitems.removeChild(contitems.firstChild);
    }
  }

  let flag = true;
  for (let i = 0; i < data.length; i++) {
    flag = true;
    for (let j = 0; j < i; j++) {
      // sale true si son distintos

      // console.log(data[i].categoria != data[j].categoria);
      if (data[i].categoria == data[j].categoria) {
        flag = false;
      }
    }
    if (flag) {
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

      if (token != 404 && token != 0) {
        let imgadd = document.createElement("i");
        imgadd.classList.add("fa-solid");
        imgadd.classList.add("fa-plus");
        imgadd.classList.add("fa-2x");
        let linkadd = document.createElement("button");
        linkadd.classList.add("editdelete");
        linkadd.onclick = function () {
          abrirmodalagregar(data[i].categoria);
        };
        linkadd.appendChild(imgadd);
        divtitulo.appendChild(linkadd);
      }

      const mouseWheel = listaitems; //= document.querySelector('.ListaItems');

      listaitems.addEventListener("wheel", function (e) {
        /*                   console.log(parseInt(mouseWheel.scrollWidth - mouseWheel.clientWidth));
                  console.log("Horizontal: " + parseInt(mouseWheel.scrollLeft));  */

        if (
          !(mouseWheel.scrollLeft == 0 && e.deltaY < 0) &&
          !(parseInt(mouseWheel.scrollLeft) > parseInt(mouseWheel.scrollWidth - mouseWheel.clientWidth - 10) && e.deltaY > 0)
        ) {
          if (e.deltaY > 0) {
            // Scroll right
            mouseWheel.scrollLeft += 50;
            e.preventDefault();
          } else {
            // Scroll left
            mouseWheel.scrollLeft -= 50;
            e.preventDefault();
          }
        }
      });

      for (let i = 0; i < data.length; i++) {
        if (data[i].categoria == titulo.innerHTML) {
          let item = document.createElement("div");
          item.classList.add("Item");
          let img = document.createElement("img");
          img.src = data[i].urlimg;
          img.classList.add("Itemimg");
          let pnombre = document.createElement("p");
          pnombre.innerHTML = data[i].nombre;
          let pprecio = document.createElement("p");
          pprecio.innerHTML = "$ "+ data[i].precio;
          let linkdeproducto = document.createElement("a");
          linkdeproducto.innerHTML = "Ver producto";
          linkdeproducto.href = "acavaellinkconconsultaincluida";

          item.appendChild(img);
          item.appendChild(pnombre);
          item.appendChild(pprecio);
          item.appendChild(linkdeproducto);
          listaitems.appendChild(item);

          if (token != 404 && token != 0) {
            let opcs = document.createElement("div");
            opcs.classList.add("opcitem");

            let imgedit = document.createElement("i");
            imgedit.classList.add("fa-solid");
            imgedit.classList.add("fa-trash");
            imgedit.classList.add("fa-2x");

            let linkedit = document.createElement("button");
            linkedit.classList.add("editdelete");
            linkedit.onclick = function () {
              borraritem(data[i].id);
            };
            linkedit.appendChild(imgedit);

            let imgdelet = document.createElement("i");

            imgdelet.classList.add("fa-solid");
            imgdelet.classList.add("fa-pen-to-square");
            imgdelet.classList.add("fa-2x");

            let linkdelet = document.createElement("button");
            linkdelet.classList.add("editdelete");
            linkdelet.onclick = function () {
              abrirmodaleditar(data[i].id);
            };
            linkdelet.appendChild(imgdelet);

            opcs.appendChild(linkedit);
            opcs.appendChild(linkdelet);
            item.appendChild(opcs);
          }
        }
      }
    }
  }
}

/* const mouseWheel = null;// = document.querySelector('.ListaItems'); */

function abrirmodalagregar(categoria) {
  modaladd.style.display = "block";

  document.body.classList.add("stopscroll");
  document.body.classList.remove("scroll");

  let formadd = document.forms["addform"];

  formadd["inputcategoria"].value = categoria;
  document.getElementById("inputcategoria").disabled = true;

  opcmodal = 1;
}

function cerrarmodaladd() {
  modaladd.style.display = "none";
  document.body.classList.remove("stopscroll");
  document.body.classList.add("scroll");
  titul = document.getElementById("titul");

  titul.innerHTML = "Agregar nuevo producto";
  return false;
}

function tipodemodal() {
  if (opcmodal == 1) {
    itemagregado();
  } else {
    itemeditado();
  }

  return false;
}

const itemeditado = async () => {
  let formadd = document.forms["addform"];

  let _datos = {
    nombre: formadd["inputnombre"].value,
    precio: formadd["inputprecio"].value,
    urlimg: formadd["inputurlimg"].value,
    categoria: formadd["inputcategoria"].value,
    descripcion: formadd["inputdescripcion"].value,
  };

  try {
    const response = await fetch("https://doted-flesh-production.up.railway.app/editar/" + idaux + "/" + token, {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(_datos),
    });
    const data = await response.text();
    // enter you logic when the fetch is successful
    console.log(data);
    getdatos();
  } catch (error) {
    // enter your logic for when there is an error (ex. error toast)

    console.log(error);
  }
};

const itemagregado = async () => {
  let formadd = document.forms["addform"];
  for (let i = 0; i < 5; i++) {
    console.log(formadd[i].value);
  }

  let _datos = {
    nombre: formadd["inputnombre"].value,
    precio: formadd["inputprecio"].value,
    urlimg: formadd["inputurlimg"].value,
    categoria: formadd["inputcategoria"].value,
    descripcion: formadd["inputdescripcion"].value,
  };
  console.log(_datos);

  try {
    const response = await fetch("https://doted-flesh-production.up.railway.app/agregar" + "/" + token, {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(_datos),
    });
    const data = await response.text();
    // enter you logic when the fetch is successful
    console.log(data);
    getdatos();
  } catch (error) {
    // enter your logic for when there is an error (ex. error toast)

    console.log(error);
  }
};

function abrirmodaleditar(id) {
  modaladd.style.display = "block";

  document.body.classList.add("stopscroll");
  document.body.classList.remove("scroll");

  titul = document.getElementById("titul");
  titul.innerHTML = "Editar pruducto";

  document.getElementById("inputcategoria").disabled = false;
  opcmodal = 2;
  idaux = id;
}

async function borraritem(id) {
  (async () => {
    try {
    await fetch("https://doted-flesh-production.up.railway.app/borrar/" + id + "/" + token, { method: "DELETE" });
    getdatos();
    crearGondola(datos);
    }catch(err) {
        console.log(err);
    }
  })();
}
