console.log('[-] Checking [-]')

var inputBox = document.querySelector('.country-input')
inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        document.querySelector('.message-box .here-man').innerText = inputBox.value
        var userValue = inputBox.value
        // inputBox.value = ""

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
    var gify = GiphyAPI(apiKey)
    puranoKuraharu = kuraharu
    loadingNode.innerText = "Loading.."
    gify.search(kuraharu, (e, r) => {
        var results = r.data

        /**
         *    10 
         *    1
         */


        if (results.length > 0) {

            var result = results[Math.floor(Math.random() * results.length)];

            document.querySelector('.last-resort').src = result.images.original.url
            document.querySelector('.turkey').style.display = "none"
        }
        else {
            loadingNode.innerText = "Ke hanya muji"
            gify.search("fuck", (e, r) => {
                var results = r.data
                var result = results[Math.floor(Math.random() * results.length)];
                document.querySelector('.last-resort').src = result.images.original.url
            })
        }
    })
}