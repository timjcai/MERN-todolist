const newTask = document.querySelector('button.create')
const form = document.querySelector('.create-todo')
const title = document.querySelectorAll('todo.title')
const tag = document.querySelectorAll('todo.tag')
const trashcan = document.querySelectorAll('a.delete')
const listItem = document.querySelectorAll('.list-item')
const edit = document.querySelectorAll('a.edit')

newTask.addEventListener('click', (e) => {
  e.preventDefault
  form.classList.toggle('hidden')
})

trashcan.forEach((item) => {
  item.addEventListener('click', (e) => {
    const endpoint = `${item.dataset.id}`
    fetch(endpoint, { method: 'DELETE' })
      .then((response) => window.location.reload())
      .catch((err) => console.log(err))
  })
})

listItem.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault
    item.classList.toggle('editing')
    const edit = item.querySelector('.edit')
    if (item.classList.contains('editing')) {
      const edit = item.querySelector('.edit')
      console.log(edit)
      edit.innerHTML = '<i class="ph-fill ph-bookmark-simple"></i>'
    } else {
      edit.innerHTML = '<i class="ph-fill ph-pencil"></i>'
    }
    const itemInputs = item.querySelectorAll('input')
    itemInputs.forEach((input) => {
      input.toggleAttribute('readonly')
      console.log(input)
      const value = input.value
      input.value = value
    })
  })
})

title.forEach((item) => {
  console.log(item)
  item.addEventListener('click', (e) => {
    e.preventDefault
    const endpoint = `${item.dataset.id}`
    console.log(endpoint)
  })
})

title.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault
    const endpoint = `${item.dataset.id}`
    console.log(endpoint)
  })
})
