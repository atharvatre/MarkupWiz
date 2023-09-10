var themebtn = document.querySelector("#mode")
themebtn.addEventListener("click", () => {
  document.body.classList.toggle('dark')
  themebtn.textContent = document.body.classList.contains('dark') ? '☀️' : "🌙"
  themebtn.classList.toggle('dark')
})

const regex_h1 = /^#[^#].*$/gm;
const regex_h2 = /^##[^#].*$/gm;
const regex_bold = /\*\*[^\*\n]+\*\*/gm;
const regex_italics = /[^\*]\*[^\*\n]+\*/gm;
const regex_highlight = /==[^==\n]+==/gm;
const regex_hyperlinks = /\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm;
const regex_list = /^(\s*(\-|\d\.) [^\n]+)+$/gm;
const regex_unorderedlist = /^\-\s.*$/;
const regex_orderedlist = /^\d\.\s.*$/;



const textinput = document.querySelector("#txtinput")
let textpreview = document.querySelector("#txtpreview")



textinput.addEventListener('input', (e) => {
  let content = e.target.value
  //textpreview.innerHTML = content


  //here we will do the conversion
  if (regex_h1.test(content)) {
    const matches = content.match(regex_h1) // returns array [] of all heading 1

    matches.forEach((element) => {
      const extractedText = element.slice(1)
      // each element is sliced from index 1
      // Example string : # Hi , then string will be ' Hi' because at index 1 is whitespace.
      content = content.replace(element, `<h1>${extractedText}</h1>`)
      // then replace the matched string with formatted HTML whose text content is extracted text.
      // finally reassign this replaced string.
    })
  }
  textpreview.innerHTML = content
  if (regex_h2.test(content)) {
    const matches = content.match(regex_h2)
    matches.forEach(element => {
      const extractedtext = element.slice(2)
      content = content.replace(element, `<h2>${extractedtext}</h2>`)
    });
  }
  textpreview.innerHTML = content

  if (regex_bold.test(content)) {
    const matches = content.match(regex_bold)
    matches.forEach(element => {
      const extractedtext = element.slice(2, -2)
      content = content.replace(element, `<strong>${extractedtext}</strong>`)
    });
  }
  textpreview.innerHTML = content

  if (regex_italics.test(content)) {
    const matches = content.match(regex_italics)
    matches.forEach((element) => {
      const extractedText = element.slice(2, -1)
      //sliced from index 2 till the (total length - 1)
      // Example : *abhik* , index 2 is a because the regex for italics says there should be 1 more character before star, so the new string is started from a
      // total length is 8  therefore 8 - 1  is 7. So the new string is from index 2 to 7 which is abhik
      content = content.replace(element, `<em>${extractedText}</em>`)
    })
  }
  textpreview.innerHTML = content

  if (regex_highlight.test(content)) {
    const matches = content.match(regex_highlight)
    matches.forEach(element => {
      const extractedtext = element.slice(2, -2)
      content = content.replace(element, `<span class='highlight'>${extractedtext}</span>`)
    });
  }
  textpreview.innerHTML = content

  if (regex_hyperlinks.test(content)) {
    const matches = content.match(regex_hyperlinks)
    matches.forEach(element => {
      const text = element.match(/^\[.*\]/)[0].slice(1, -1)
      const url = element.match(/\]\(.*\)/)[0].slice(2, -1)
      // const extractedtext=element.slice(2,-2)
      content = content.replace(element, `<a href="${url}">${text}</a>`)
    });
  }
  textpreview.innerHTML = content

  if (regex_list.test(content)) {
    const matches = content.match(regex_list)

    matches.forEach((list) => {
      const listArray = list.split('\n')
      // ['- hi', '- bye', '', '1. hdhd', '2. jdjdj']
      const formattedList = listArray
        .map((currentValue, index, array) => {
          if (regex_unorderedlist.test(currentValue)) {
            currentValue = `<li>${currentValue.slice(2)}</li>`

            if (!regex_unorderedlist.test(array[index - 1])) {
              //array[index-1] will be false if it is null,undefined or < 0
              // unorderedList.test(array[index - 1]) will return true only if the the array element at index - 1 is ul element
              // !unorderedList.test(array[index - 1]) will return true if the unorderedList.test(array[index - 1]) returns false
              currentValue = '<ul>' + currentValue
              // this means if the previous element of the list element in the array  is not a list element or this list element is the 1st element of the array  then add a starting ul tag
            }
            if (!regex_unorderedlist.test(array[index + 1])) {
              //array[index+1] will be false if it is null,undefined or > length of the array
              // unorderedList.test(array[index + 1]) will return true only if the the array element at index+1 is ul element
              // !unorderedList.test(array[index + 1]) will return true if the unorderedList.test(array[index + 1]) returns false
              currentValue = currentValue + '</ul>'
              // this means if the next element of the list element in the array  is not a list element or this list element is the last element of the array  then append a closing ul tag
            }
          }
          //Similarly create ol
          if (regex_orderedlist.test(currentValue)) {
            currentValue = `<li>${currentValue.slice(2)}</li>`

            if (!regex_orderedlist.test(array[index - 1])) {
              currentValue = '<ol>' + currentValue
            }

            if (!regex_orderedlist.test(array[index + 1])) {
              currentValue = currentValue + '</ol>'
            }
          }

          return currentValue
        })
        .join('')

      content = content.replace(list, formattedList)
    })
  }
  textpreview.innerHTML = content
  content = content
    .split('\n')
    .map((line) => {
      if (!line.startsWith('<') && line !== '') {
        // if line is not empty & does not start with html tag
        return line.replace(line, `<p>${line}</p>`)
      } else {
        return line
      }
    })
    .join('\n')

})

