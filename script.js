var itemsLS = getItemsFromLS();

var content = document.querySelector('.list')
var form = document.querySelector('form')
var count = document.querySelector('.count')
var input = document.querySelector('input[type="text"]')
var clearAll = document.querySelector('.clearAll')


count.innerHTML = itemsLS.length;
loadItems();

//Local Storage  Functions
function getItemsFromLS() {
    if (localStorage.getItem('Items') === null) {
        items = []
    } else {
        items = JSON.parse(localStorage.getItem('Items'))
    }

    return items;
}

function saveToLS(item) {
    items = getItemsFromLS();
    items.push(item)
    localStorage.setItem('Items', JSON.stringify(items))
}

function deleteItemFromLS(items) {
    localStorage.setItem('Items', JSON.stringify(items))
    loadItems()

}

//Load Items

function loadItems() {
    content.innerHTML = ''
    items = getItemsFromLS()
    items.forEach(item => {
        let html = `<li><span  class='badge'>${items.indexOf(item)+1}</span> ${item}<a class="close" href=""><i class="fas fa-times"></i></a></li>`

        content.innerHTML += html
        count.innerHTML = items.length;
    })
}
//Add item
form.addEventListener('submit', AddItem)

function AddItem(e){
     if (input.value === '') {
         alert('add new item')
     } else {

         saveToLS(input.value);
         loadItems()
         input.value = ''
     }

     e.preventDefault();
}

//Delete Item
content.addEventListener('click', function (e) {

    if (e.target.classList.contains('fa-times')) {
        if (confirm('Are you sure?')) {
            items = getItemsFromLS()
            let index = e.target.parentElement.parentElement.children[0].textContent-1
            items.splice(index, 1)
            deleteItemFromLS(items);
            count.innerHTML = items.length
        }

    }
    e.preventDefault();
})

//DeleteAllItems

clearAll.addEventListener('click', function (e) {
    if (confirm('Are you sure?')) {
        localStorage.clear()
        loadItems()
        count.innerHTML = items.length
    }
    e.preventDefault();
})