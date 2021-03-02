BASE_URL = 'http://localhost:3000/pups/'

document.addEventListener('DOMContentLoaded', () => {
    fetchDoggos()
    // goodDogFilter()
    const goodDogButton = document.getElementById('good-dog-filter')
    goodDogButton.addEventListener('click', () => {
        goodDogFilter()
        if(goodDogButton.innerText === "Filter good dogs: OFF"){
            goodDogButton.innerText = "Filter good dogs: ON" 
        }else{
            goodDogButton.innerText = "Filter good dogs: OFF"
        }
    })
})

async function fetchDoggos() {
    const response = await fetch(BASE_URL)
    const doggoData = await response.json()

    doggoData.forEach(doggo => {
        nameButton(doggo);
    })

    return doggoData
}

function nameButton(dog) {
    const nameBar = document.getElementById('dog-bar')

    const nameTag = document.createElement('span')
        nameTag.innerText = dog.name
        nameTag.addEventListener('click', () => {
            showDog(dog)
        })
    
    nameBar.append(nameTag);
}

function showDog(dog) {
    // console.log(dog)
    const dogInfo = document.getElementById('dog-info')
        while (dogInfo.firstChild){
            dogInfo.removeChild(dogInfo.firstChild)
        }
    
    const dogImg = document.createElement('img')
        dogImg.src = dog.image
    
    const dogName = document.createElement('h2')
        dogName.innerText = dog.name
    
    const dogBehavior = document.createElement('button')
        if(dog.isGoodDog === true){
            dogBehavior.innerText = "Good Dog!"
        } else {
            dogBehavior.innerText = "Bad Dog!"
        }
        dogBehavior.addEventListener('click', (event) => {

            const reqObj = {
                headers: {'Content-Type': 'application/json'},
                method: "PATCH",
                body: JSON.stringify({isGoodDog: !dog.isGoodDog})
            }

            // console.log(reqObj)

            fetch(BASE_URL+dog.id, reqObj)
                .then(res => res.json())
                .then(newDog => {
                    // if(dogBehavior.innerText === "Good Dog!"){
                    //     dogBehavior.innerText = "Bad Dog!"
                    // } else {
                    //     dogBehavior.innerText = "Good Dog!"
                    // }
                    toggleDogBehavior(dogBehavior)
                })
        })
    
    dogInfo.append(dogImg, dogName, dogBehavior);
}

function toggleDogBehavior(behavior){
    if(behavior.innerText === "Good Dog!"){
        behavior.innerText = "Bad Dog!"
    } else{
        behavior.innerText = "Good Dog!"
    }
}

function goodDogFilter() {
    const nameBar = document.getElementById('dog-bar')
    const filterBtn = document.getElementById('good-dog-filter')
    
    while(nameBar.firstChild){
        nameBar.firstChild.remove()
    }

    fetch(BASE_URL)
        .then(res => res.json())
        .then(dogs => {
            if(filterBtn.innerText === "Filter good dogs: ON"){
                dogs.forEach(dog => {
                    if(dog.isGoodDog === true){
                        nameButton(dog)
                    }
                })
            }else{
                dogs.forEach(dog => {
                    nameButton(dog)
                })
            }
        })
}