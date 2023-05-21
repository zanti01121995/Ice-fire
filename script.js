//////////////Main Div for the Ice and Fire Book Data API Header///////////////
let div = document.createElement('div');
div.style.backgroundColor='#e3f2fd';
div.style.margin="5px";
div.classList=("text-center");
div.style.borderRadius="2px";
div.style.padding="5px";
div.style.fontFamily='Calibri'

let h1 = document.createElement('h1')
h1.className="text-center"
h1.innerHTML ="Ice and Fire Book Data API"

////////////////Secondary Div for the Search Box/////////////////////
let secdiv = document.createElement('div')
secdiv.className='text-center'
let div2 = document.createElement('div');
div2.className=("w-100")

let form = document.createElement('form');

let idiv = document.createElement('div')
idiv.classList=('input-group mb-3 w-50 text-center')
idiv.style.marginLeft="25%";
idiv.style.marginTop="20px"
let input = document.createElement('input')
input.classList=('form-control');
input.setAttribute('type','search');
input.setAttribute('id','book')
input.setAttribute('placeholder','Enter the Name of the Book Here');
input.setAttribute('aria-label','Search');
input.addEventListener("keyup",data);
let br =document.createElement('br')

let button = document.createElement('button');
button.classList=("btn btn-primary");
button.setAttribute("type","button");
button.innerHTML="Search"
button.style.marginLeft="10px"
button.addEventListener("click",search)

///////////////////Creating container for aligning the Api data based Cards////////////////////////

var container =document.createElement('div');
container.className="container";
container.style.marginTop="25px"
container.style.marginLeft="8%"
container.style.marginRight="8%"
var row = document.createElement('ul');
row.setAttribute("id","myUL")
row.className='row';
row.style.listStyleType= "none";

container.append(row);

div2.append(form)
idiv.append(input,button)
form.append(idiv)

div.append(h1)
secdiv.append(div2)
document.body.append(div,secdiv)
//////////////////fetch the the data from the api////////////////////
async function getBookApi(){
  

    let d2 =await fetch('https://www.anapioficeandfire.com/api/books?page=1&pageSize=12');
    let d3 =await d2.json();
   
    return d3
   }

//////calling the data api inside the function using TRY/CATCH//////////
   async function getApi(){
    try{
        let res= await getBookApi();
        sendCard(res,res.length)
    }catch(error){
        console.log(error)
    }
   }
   getApi();


///////////////////Function to send the Api processed data to the cards//////////////////////
async function sendCard(res,len){
  
    
    for(var i=0;i<len;i++){
    let date = res[i].released.split('T')
     let character =res[i].characters;

    //  console.log(character.splice(1,10))
    let result =await findCharName(character.splice(1,10));
        let obj ={"name":res[i].name,
        "characters":result,
        "date":date,
        "NoofPages":res[i].numberOfPages,
        "isbn":res[i].isbn,
        "authors":res[i].authors,
        "publisher":res[i].publisher}

    let li = document.createElement('li');
    li.className="col-md-4";
    let a = document.createElement('a');
    a.setAttribute("href",'#')
    let div2 = document.createElement('div');
    div2.classList=('card border-none mb-3');
    div2.style.maxWidth="18rem";
    div2.style.backgroundColor="#e3f2fd"
    let div3 = document.createElement('div');
    div3.classList=('card-header text-center')
    div3.innerHTML=obj.name;
    let div4 = document.createElement('div')
    div4.classList=('card-body text-secondary');
    div4.innerHTML="- Written by " + obj.authors + " and Published by "+obj.publisher+" on "+obj.date[0];
    let hr = document.createElement('hr')
    let p = document.createElement('p');
    p.className="text-center";
    p.innerHTML="Characters : "+obj.characters.splice(1,5)
    let p1 = document.createElement('p');
    p1.className="text-center";
    p1.innerHTML="Number of Pages : "+obj.NoofPages

    let p2 = document.createElement('p');
    p2.className="text-center";
    p2.innerHTML="ISBN NO : "+obj.isbn
    div4.append(hr,p,p1,p2)
    div2.append(div3,div4);
    a.append(div2)
    li.append(a);
    row.append(li)
           document.body.append(container);
     }
}

sendCard();




////////////////function to process the search based on the values on the search box///////////////////////

function data(){
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("book");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";

        } else {
            li[i].style.display = "none";
        }
    }
}


/////////////////function to highlight the values from the input//////////////////////////////

function search() {
    if (window.find && window.getSelection) {
        document.designMode = "on";
        var sel = window.getSelection();
        sel.collapse(document.body, 0);
        let text = document.getElementById('book').value
        while (window.find(text)) {
            document.execCommand("HiliteColor", false, "yellow");
            sel.collapseToEnd();
        }
        document.designMode = "off";
    }
}


//////////////////function to find the character names from the loop api////////////////////

async function findCharName(char){
    let temp=[]
for(let i=0;i<char.length;i++){
   
    let d2 =await fetch(char[i]);
    let d3 =await d2.json(); 
    if(d3.name!=""){
        temp.push(d3.name)
    }
    
}
return temp
}

