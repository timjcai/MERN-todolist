const newTask = document.querySelector('button.create')
const form = document.querySelector('.create-todo')
const completebtn = document.querySelectorAll('.completed')
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
    console.log(endpoint)
    fetch(endpoint, { method: 'DELETE' })
      .then((response) => window.location.reload())
      .catch((err) => console.log(err))
  })
})

listItem.forEach((item) => {
  const edit = item.querySelector('.edit')
  edit.addEventListener('click', (e) => {
    item.classList.toggle('editing')
    const itemInputs = item.querySelectorAll('input')
    itemInputs.forEach((input) => {
      input.toggleAttribute('readonly')
      console.log(input.value)
    })
    if (item.classList.contains('editing')) {
      const edit = item.querySelector('.edit')
      edit.innerHTML = '<i class="ph-fill ph-bookmark-simple"></i>'
      edit.addEventListener('click', (e) => {
        const endpoint = `${edit.dataset.id}`
        console.log(endpoint)
        const body = {
          title: `${item.querySelector('.title').value}`,
          tag: `${item.querySelector('.tag').value}`,
        }
        console.log(body)
        fetch(endpoint, {
          method: 'PATCH',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then((response) => window.location.reload())
          .catch((err) => console.log(`hello + ${err}`))
      })
    } else {
      edit.innerHTML = '<i class="ph-fill ph-pencil"></i>'
    }
  })
})

completebtn.forEach((item) => {
  item.addEventListener('click', (e) => {
    const endpoint = `${item.dataset.id}`
    const state = `${item.dataset.state}`
    const body = { completed: state }
    console.log(body)
    fetch(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => window.location.reload())
      .catch((err) => console.log(err))
  })
})
