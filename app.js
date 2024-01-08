//Constants

const add_book = document.getElementById("myBtn");

const myModal = document.getElementById("myModal");

const form_container = document.getElementById("form_container")

const submit_button = document.getElementById("submitButton");

const library_body = document.getElementById("libraryBody")

const form = document.getElementById("newBookForm");

//These are the input tags to get new Book values
const author = document.getElementById("author");
const title = document.getElementById("title");
const num_pages = document.getElementById("numPages");
const did_read = document.getElementById("trueRead");


const myLibrary = [];

function Book(author, title, num_pages, was_read) {
    this.author = author, 
    this.title = title, 
    this.num_pages = num_pages,
    this.was_read = was_read
}

window.addEventListener("DOMContentLoaded", (e) => {

    console.log("DOM content loaded aggain");

    const retArray = JSON.parse(localStorage.getItem("myLibrary"));
    if (retArray && myLibrary.length === 0) {
        myLibrary.push(...retArray);
    }

    console.log(retArray);

    generateCard(myLibrary);

    const cards = document.querySelectorAll("#card_info");

    console.log(cards);

    cards.forEach((element, index) => {
    return element.setAttribute('data-id', index);
    });
})

function generateCard(retArray) {

    library_body.innerHTML = "";

    for (let i = 0; i < retArray.length; i++) {

        const card_info = document.createElement("div");
        card_info.setAttribute("id", "card_info")

        const authorPara = document.createElement("p");
        const titlePara = document.createElement("p");
        const num_pagesPara = document.createElement("p");
        const was_readPara = document.createElement("p");

        authorPara.innerHTML = "Author: ";
        titlePara.innerHTML = "Title: "
        num_pagesPara.innerHTML = "Number of Pages: ";
        was_readPara.innerHTML = "Did you read? "

        const authorSpan = document.createElement("span");
        const titleSpan = document.createElement("span");
        const num_pagesSpan = document.createElement("span")
        const was_readSpan = document.createElement("span");

        authorSpan.innerHTML = retArray[i].author;
        titleSpan.innerHTML = retArray[i].title;
        num_pagesSpan.innerHTML = retArray[i].num_pages;
        was_readSpan.innerHTML = retArray[i].was_read;

        const label = document.createElement('label');
        label.setAttribute("id", "toggle");

        const slider = document.createElement("span");
        slider.setAttribute("id", "slider");


        const checkbox = document.createElement('input')
        checkbox.type = "checkbox";
        checkbox.id = "was_readCheck"

        checkbox.addEventListener("click", (e) => {
           

            if (checkbox.checked) {
                e['target']['nextSibling']['offsetParent']['offsetParent']['children'][3]['children'][0].innerHTML = "Yes";

                e['target']['nextSibling']['offsetParent']['offsetParent'].style.border = "20px solid green"

                console.log(e['target']['nextSibling']['offsetParent']['offsetParent']);

                console.log(e['target']['nextSibling']['offsetParent']['offsetParent'].getAttribute("data-id"));

                const elementID = e['target']['nextSibling']['offsetParent']['offsetParent'].getAttribute("data-id")

                adjustToggle(retArray, elementID);

            }
            else {
                e['target']['nextSibling']['offsetParent']['offsetParent']['children'][3]['children'][0].innerHTML = "No";

                e['target']['nextSibling']['offsetParent']['offsetParent'].style.border = "20px solid gold"

                console.log(e['target']['nextSibling']['offsetParent']['offsetParent'].getAttribute("data-id"));

                const elementID = e['target']['nextSibling']['offsetParent']['offsetParent'].getAttribute("data-id")

                adjustToggle(retArray, elementID);
            }
        })

        authorPara.appendChild(authorSpan);
        titlePara.appendChild(titleSpan);
        num_pagesPara.appendChild(num_pagesSpan);
        was_readPara.appendChild(was_readSpan);

        console.log(was_readSpan.innerHTML)

        if (was_readSpan.innerHTML == "Yes") {
            checkbox.checked = true;
            card_info.style.border = "20px solid green";
        }
        else {
            checkbox.checked = false;
            card_info.style.border = "20px solid gold";
        }


        was_readPara.appendChild(label);
        label.appendChild(checkbox);
        label.appendChild(slider);

        card_info.appendChild(authorPara);
        card_info.appendChild(titlePara);
        card_info.appendChild(num_pagesPara);
        card_info.appendChild(was_readPara);

        //Append this to the card_info 
        //<i class="fa-solid fa-square-xmark"></i>

        const x_button = document.createElement("span");
        x_button.setAttribute("id", "x_button");
        x_button.innerHTML = '<i class="fa-solid fa-square-xmark"></i>';
        card_info.appendChild(x_button)

        x_button.addEventListener("click", (event) => {

            for (let i = 0; i < myLibrary.length; i++) {
                //console.log(myLibrary[i].author);
                if (event['target']['offsetParent']['offsetParent']['children'][0]['children'][0]["innerHTML"] == myLibrary[i].author || event['target']['offsetParent']['offsetParent']['children'][0]['children'][0]["innerHTML"] == 'undefined') {
                    console.log(myLibrary[i]);
                    myLibrary.splice(i, 1);
                    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
                }
            }

            event['target']['offsetParent']['offsetParent'].remove();
        })
        
        //card.appendChild(card_info);
        library_body.appendChild(card_info);
        
    }
}

function adjustToggle(new_library, elementID) {

    console.log(new_library);

    console.log(elementID);

    if (new_library[elementID].was_read == "Yes") {
        new_library[elementID].was_read = "No"
        localStorage.setItem("myLibrary", JSON.stringify(new_library))
    }
    else {
        new_library[elementID].was_read = "Yes"
        localStorage.setItem("myLibrary", JSON.stringify(new_library))
    }

}


//This opens the model and the submit button adds a new book to the library

add_book.addEventListener("click", () => {

    console.log("Add button was pressed");

    myModal.style.display = "block";

})

submit_button.addEventListener("click", (event) => {

    console.log("submit Button was clicked")

    myModal.style.display = "none";

    const new_book = new Book(author.value, title.value, num_pages.value, did_read.checked ? "Yes" : "No")
    console.log(new_book);

    form.reset();

    addBookToLibrary(new_book) 
})

function addBookToLibrary(new_book) {

    console.log("Add book to library fired");

    //const tempLibrary = localStorage.getItem("myLibrary");

    //console.log(tempLibrary);

    myLibrary.push(new_book);

    console.log(myLibrary);

    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

    //console.log(JSON.parse(localStorage.getItem("myLibrary")))

    generateCard(myLibrary);

}



window.onclick = function(event) {
    if (event.target == myModal) {
      myModal.style.display = "none";
    }
  }


