console.log('[-] Checking [-]')

//We get the input box

var inputBox = document.querySelector('.country-input')

//we listen the user keyboard enter key
inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        document.querySelector('.message-box .here-man').innerText = inputBox.value
        var userValue = inputBox.value || puranoKuraharu
        inputBox.value = ""
        puranoKuraharu = userValue
        doSomething()
    }
});

var puranoKuraharu = ""

var loadingNode = document.querySelector('.here-man')

document.querySelector('.last-resort').addEventListener("load", function () {
    console.log('Image Loaded')
    loadingNode.innerText = puranoKuraharu
})


var preInit = () => {

    var tags = {
        '7AM': 'Fresh Day',
        '8AM': 'Burshing Teeth',
        '9AM': 'Food',
        '10AM': 'Cigar',
        '11AM': 'Reading A Book',
        '1PM': 'Guitar Time',
        '2PM': 'Better Youtube',
        '3PM': 'Hungry',
        '4PM': 'Pump The Blood',
        '5PM': 'No Booz',
        '6PM': 'Hungry Again',
        '7PM': 'TV TIme',
        '8PM': 'Pubg',
        '9PM': 'Crypto',
        '10PM': 'Good Night'
    }


    var currentState = (new Date()).toLocaleString([], { hour12: true}).split(',')[1].match(/^\s?([0-9]+).*\s([A-Z]+)$/)
    var whatToDo = currentState[1] + currentState[2]
    puranoKuraharu = tags[whatToDo]
    doSomething()

    setInterval(() => {
        doSomething()
    }, 1000 * 10)

}

function doSomething() {
    //we do this giphy api with our api key
    var gify = GiphyAPI(
        apikey
    )
    loadingNode.innerText = "Loading.."
    gify.search(puranoKuraharu, (e, r) => {
        var results = r.data

        //we get the  results, many results
        if (results.length > 0) {

            //we check if there are atleast 1 results
            //we grabbed a random result
            var result = results[Math.floor(Math.random() * results.length)];


            //we put that image gif in img tag of html
            document.querySelector('.last-resort').src = result.images.original.url
            //we hide turkey
            document.querySelector('.turkey').style.display = "none"
        }
        else {
            //if there no result,
            //we made default fuck giphy and get a random and show in img tag
            loadingNode.innerText = "Ke hanya muji"
            gify.search("fuck", (e, r) => {
                var results = r.data
                //finding a random fuck gif 
                var result = results[Math.floor(Math.random() * results.length)];
                document.querySelector('.last-resort').src = result.images.original.url
            })
        }
    })
}

preInit()