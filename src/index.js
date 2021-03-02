BASE_URL = 'http://localhost:3000/pups/'

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
    document.getElementById('good-dog-filter').addEventListener('click', () => {
        toggleGoodDogFilter()
        fetchDogs()
    });
})

async function fetchDogs() {
    const filterButton = document.getElementById('good-dog-filter')
    let filterPhrase = filterButton.innerText

    const dogBar = document.getElementById('dog-bar')
    while(dogBar.firstChild){
        dogBar.firstChild.remove()
    }

    const response = await fetch(BASE_URL)
    const doggoData = await response.json()

    // console.log(doggoData);

    doggoData.forEach(doggo => {
        if(filterPhrase === "Filter good dogs: OFF"){
            dogTag(doggo)
        }else{
            if(doggo.isGoodDog === true){
                dogTag(doggo)
            }
        }
    })
}

function toggleGoodDogFilter(){
    let filterButton = document.getElementById('good-dog-filter')

    if(filterButton.innerText === "Filter good dogs: OFF"){
        filterButton.innerText = "Filter good dogs: ON"
    }else{
        filterButton.innerText = "Filter good dogs: OFF"
    }
}

function dogTag(dog){
    const dogBar = document.getElementById('dog-bar')

    const nameTag = document.createElement('span')
        nameTag.addEventListener('click', () => {
            showDog(dog)
        })

    const dogName = document.createElement('p')
        dogName.innerText = dog.name
    
    nameTag.append(dogName)

    dogBar.append(nameTag)
}

function showDog(dog){
    const dogZone = document.getElementById('dog-info')
        while(dogZone.firstChild){
            dogZone.firstChild.remove()
        }

    const dogImg = document.createElement('img')
        dogImg.src = dog.image
    
    const dogName = document.createElement('h2')
        dogName.innerText = dog.name
    
    const behaviorButton = document.createElement('button')
        if(dog.isGoodDog === true){
            behaviorButton.innerText = "Good Dog!"
        }else{
            behaviorButton.innerText = "Bad Dog!"
        }
        behaviorButton.addEventListener('click', (event) => {
            toggleBehavior(event, dog)
        })
    
    dogZone.append(dogImg, dogName, behaviorButton)
}

function toggleBehavior(event, dog){
    let behaviorButton = event.target
    let behavior = dog.isGoodDog

    // console.log(behavior)
    console.log(dog)

    if(behaviorButton.innerText === "Good Dog!"){
        behaviorButton.innerText = "Bad Dog!"
    }else{
        behaviorButton.innerText = "Good Dog!"
    }

    const reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify({isGoodDog: !behavior})
    }

    console.log(reqObj)

    fetch(BASE_URL+dog.id, reqObj)
        .then(res => res.json())
        .then(_ => {
            // fetchDogs()
            dog.isGoodDog = !behavior
            fetchDogs()
        })
    // fetchDogs()
    
    // console.log(dog.isGoodDog)
}