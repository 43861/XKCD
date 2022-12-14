window.onload= function(){ // När kärmen lagas det händer nånting 
    document.maxComic = -1; // Max comic är den nyaste comic.
    getComic("latest"); // det tar info fron api so att sätta info på kärmen (börjar med sista comic)
    let node = document.getElementById("first");// tar första id fron html id
    node.addEventListener("click",function() {getComic(1)}); // Nånting händer när du klickar

    let node2 = document.getElementById("previous"); // samma sak men förra, loopar till sista när man är på första
    node2.addEventListener("click",function() {getComic(minComicIf())});

    let node3 = document.getElementById("random"); // samma sak men slumpmässigt
    node3.addEventListener("click",function() {getComic(Math.floor(Math.random() * 
      document.maxComic))}); // slumpmässigt calculation

    let node4 = document.getElementById("next"); // nästa, loopar tillbaks när man är på sista
    node4.addEventListener("click",function() {getComic(maxComicIf())});

    let node5 = document.getElementById("last"); // sista
    node5.addEventListener("click",function() {getComic(document.maxComic)});

}

function getComic(which){ // function så att man kan tavilken comic man använder
    fetch("https://xkcd.vercel.app/?comic="+ which) // tar url och sätter vilken comic det ska vara 
    .then(function(response){ // testar om det är giltig
        if(response.status==200){ // betyder det är bra 
            return response.json(); // tar json fil so man kan ta info
        }
    })
    .then(function(data){ // sätter up max comic
        if (document.maxComic < data.num){
            document.maxComic =data.num;
        }
        appendComic(data); // använder function appendComic so att man kan ta json info till kärmen
    })
}

function appendComic(data) {
 // Tar json info so att html kan använda 
    let title = document.createElement("h1"); //Skapar Titel 
    title.innerHTML = data.title; //sätter comic data till titel

    let date = document.createElement("p");
    let datum = new Date(data.year,data.month, data.day); // lagar datum
    date.innerHTML = datum.toLocaleDateString(); // format datum


    let caption = document.createElement("figcaption"); // Vilken comic den är
    caption.innerHTML = "Comic Number: " + data.num;

    let image = document.createElement("img"); // bilden soi att det ska laddas upp
    image.src = data.img; // tar bildens src
    image.width = "400"; // bredden av bilden
    image.alt = data.alt; // alt om bilden laddas inte

    let figure = document.createElement("figure"); // Formatera bilden
    figure.appendChild(image);
    figure.appendChild(caption);




    let mainComic = document.getElementById("mainComic"); // sätta allt till mainComic div
    mainComic.innerHTML = "";
    mainComic.appendChild(title);
    mainComic.appendChild(date);
    mainComic.appendChild(figure);
   


    document.currentComic = data.num; // räknas current comic och sätter det globalt

}



function maxComicIf() { // so att last kanppen loopar och funkar 
    if (document.currentComic == document.maxComic) {
        return 1;
} else {
    return document.currentComic+1;
}
}

function minComicIf() { // so att först knappen loopar och funkar
    if (document.currentComic == 1) {
        return document.maxComic
    } else {
        return document.currentComic-1;
    }
}