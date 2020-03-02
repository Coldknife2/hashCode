const fs = require('fs');
const name = "c_incunabula";
// f_libraries_of_the_world
// e_so_many_books
// d_tough_choices
// c_incunabula
// b_read_on
// a_example

const content = fs.readFileSync(`./exemples/${name}.txt`, {encoding: "utf8"}).split("\n");
let [books, libraries, days] = content.shift().split(" ").map(Number);

let bookScores = content.shift().split(" ").map(Number);

let librariesDescription = [];

for(let i = 0; i < libraries; i++)
{
    let [, signupTime, shippingCapacity] = content.shift().split(" ").map(Number);
    let valueTotaleLib = 0;
    let books = content.shift().split(" ").map(bookId => {
        let id = Number(bookId);
        valueTotaleLib += id
        return {"bookId": id, "value": bookScores[id]}
    }).sort((a,b)=> b.value - a.value);
    let timeToDeplete = Math.ceil(books.length / signupTime);
    let averagePointsValueTotaleLib = valueTotaleLib / (timeToDeplete + signupTime);

    librariesDescription.push({
        "totalTime": timeToDeplete + signupTime,
        timeToDeplete, 
        averagePointsvalueTotaleLib: averagePointsValueTotaleLib, 
        valueTotaleLib, 
        "index": i, 
        books, 
        signupTime, 
        shippingCapacity
    });
}

let bookScoresSorted = bookScores.map((v, i) => ({"value": v, "index": i})).sort((a, b) => b.value - a.value);
function megaSort()
{
    librariesDescription.sort((a, b) => b.timeToDeplete - a.timeToDeplete);
}
megaSort();


let bookSet = new Set();
librariesDescription.forEach(library => {
    bookSet = new Set([...bookSet, ...library.books.map(v => v.bookId)])
    library.books = library.books.filter(b => bookSet.has(b.bookId));
    library.valueTotaleLib = library.books.reduce((acc,val) => acc + val.value, 0);
    library.averagePointsValueTotaleLib = library.valueTotaleLib / (library.totalTime);
    library.timeToDeplete = Math.ceil(library.books.length / library.signupTime);
});

megaSort();

// Tant qu'il nous reste du temps
const librairiesAnswer = [];

while(days > 0)
{
    // console.log(days);
    if(librariesDescription.length <= 0)
    {
        days = 0;
    } else {
        const {books, index, signupTime} = librariesDescription.shift();
        days -= signupTime;
        librairiesAnswer.push([index, books.map(({bookId}) => bookId)]);
        librariesDescription = librariesDescription.filter(({signupTime}) => signupTime <= days);
    }
}


// librairies.push([id, bookid, bookid, bookid]);

let dataToWrite = librairiesAnswer.length;
for(let i = 0; i < librairiesAnswer.length; i++)
{
    dataToWrite += "\n";
    dataToWrite += librairiesAnswer[i].shift() + " ";
    dataToWrite += librairiesAnswer[i][0].length;
    dataToWrite += "\n";
    dataToWrite += librairiesAnswer[i][0].join(" ");
}

//dataToWrite = JSON.stringify(librariesDescription);

fs.writeFileSync(`./exemples/${name}.out3.txt`, dataToWrite, {encoding: "utf8"});



