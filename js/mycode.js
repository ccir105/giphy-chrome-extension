console.log('[-] Checking [-]')

//We get the input box

var inputBox = document.querySelector('.country-input')

//we listen the user keyboard enter key
inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        document.querySelector('.message-box .here-man').innerText = inputBox.value
        var userValue = inputBox.value
        // inputBox.value = ""

        //we do search in giphy
        doSomething(userValue)
    }
});

var puranoKuraharu = ""

var loadingNode = document.querySelector('.here-man')

document.querySelector('.last-resort').addEventListener("load", function () {
    console.log('Image Loaded')
    loadingNode.innerText = puranoKuraharu
})

function doSomething(kuraharu) {
    //we do this giphy api with our api key
    var gify = GiphyAPI(apiKey)
    puranoKuraharu = kuraharu
    loadingNode.innerText = "Loading.."
    gify.search(kuraharu, (e, r) => {
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