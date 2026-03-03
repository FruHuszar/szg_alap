document.addEventListener("DOMContentLoaded", () => {
  const osszeadasElem = document.getElementById("osszeadas");
  const kivonasElem = document.getElementById("kivonas");
  const szorzasElem = document.getElementById("szorzas");
  const osztasElem = document.getElementById("osztas");
  const pontElem = document.getElementById(".");
  const egyenloElem = document.getElementById("egyenlo");
  const torlesElem = document.getElementById("torles");

  let szamokElem = document.querySelector(".szamok");
  const szamok = szamGombokLetrehoz();
  szamokElem.innerHTML = szamok.join("");

  let szamElem = document.querySelectorAll(".szamok button");
  let szoveg = "";
  let kifejezesElem = document.querySelector(".kifejezes");
  let eredmenyElem = document.querySelector(".eredmeny");

  
  
  
  eventAddGombokra(szamok);
  eventAddMuveletGombokra();
  torlesElem.addEventListener("click", torles);
  egyenloElem.addEventListener("click", kiertekel);

  
  
  
  function szamGombokLetrehoz() {
    const szamok = [];
    for (let i = 1; i <= 9; i++) {
      szamok.push(`<button class="szam">${i}</button>`);
    }
    szamok.push(`<button class="szam">0</button>`);
    return szamok;
  }

  function eventAddGombokra(szamok) {
    for (let i = 0; i < szamok.length; i++){
      szamElem[i].addEventListener("click", mezobeIr);
    }
  }
  
  function eventAddMuveletGombokra() {
    const muveletGombok = [osszeadasElem, kivonasElem, szorzasElem, osztasElem, pontElem];
    muveletGombok.forEach(gomb => {
        gomb.addEventListener("click", mezobeIr);
    });
  }

  
  
  // ...
function mezobeIr() {
  if (eredmenyElem.innerHTML !== "") {
    szoveg = eredmenyElem.innerHTML;
    eredmenyElem.innerHTML = "";
  }

  const ujKarakter = this.textContent;
  const muveletek = ["+", "-", "*", "/"];
  const utolsoKarakter = szoveg.slice(-1);
  const darabok = szoveg.split(/[\+\-\*\/]/);
  const utolsoSzam = darabok[darabok.length - 1];

  if (ujKarakter === "." && utolsoSzam.includes(".")) {
    return;
  }

  const utolsoMuvelet = muveletek.includes(utolsoKarakter) || utolsoKarakter === ".";
  const ujMuvelet = muveletek.includes(ujKarakter) || ujKarakter === ".";

  if (szoveg === "" && ujKarakter === "0") {
    return;
  } else if (utolsoMuvelet && ujMuvelet) {
    szoveg = szoveg.slice(0, -1) + ujKarakter;
  } else {
    szoveg += ujKarakter;
  }

  kifejezesElem.innerHTML = szoveg;
}

  function torles() {
    szoveg = "";
    kifejezesElem.innerHTML = "";
    eredmenyElem.innerHTML = "";
  }

  // hiányzik a funkcióból: zeroval osztás javítása. after hiba, torles();
  function kiertekel() {
    let string = kifejezesElem.innerHTML;
    if (string === "") return;

    // utolsó karakter vizsgálata, művelet + egyenlőségjel hibára
    const utolsoKarakter = string.slice(-1);
    if (["+", "-", "."].includes(utolsoKarakter)) {
      string += "0";
    } else if (["*", "/"].includes(utolsoKarakter)) {
      string += "1";
    }

    // eval használata? nem találtam jobb ötletet. string to műveletsor a cél
    try {
      let szamol = eval(string);
      eredmenyElem.innerHTML = szamol;
      szoveg = "";
      kifejezesElem.innerHTML = "";
    } catch (e) {
      eredmenyElem.innerHTML = "Hiba: " + e.message;
    }
  }
});
  }
});
