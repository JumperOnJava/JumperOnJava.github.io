var html = (s) => document.createElement(s);
function coloredtext(text,color)
{
    var textElement = document.createElement("span")
    textElement.style.color = color;
    textElement.innerText = text;
    return textElement;
}
function contactEntry(site,name,image)
{
    var entry = html("div");
    var logo = html("img");
    logo.className = "logo";
    logo.src = "images/"+image;
    entry.appendChild(logo);
    entry.appendChild(coloredtext(site+": ","#DCDCAA"));
    entry.appendChild(coloredtext(name,"#9CDCFE"));
    entry.appendChild(html("br"));
    return entry;
}
let body = document.querySelector("body");
let box = document.createElement("div");
box.className = "box";
box.id = "info";
var append = (e) => box.appendChild(e);
append(coloredtext("Добро пожаловать на микросайт JavaJumper'a","#CCC"));
append(html("hr"));
var contactText = coloredtext("Контактная информация:","#EF7");
contactText.style.marginBottom = "1vw";
append(contactText);

append(contactEntry("Telegram","@JavaJump3r","telegram.png"));
append(contactEntry("Discord","JavaJumper","discord.png"));
append(contactEntry("E-mail","jumpergooog@gmail.com","gmail.png"));
body.appendChild(box);  
