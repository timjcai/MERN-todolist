const newTask = document.querySelector('button.create')
const form = document.querySelector('.create-todo')
const completebtn = document.querySelectorAll('.completed')
const title = document.querySelectorAll('todo.title')
const tag = document.querySelectorAll('todo.tag')
const trashcan = document.querySelectorAll('a.delete')
const taskBlock = document.querySelectorAll('.task-block')
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

taskBlock.forEach((item) => {
  const edit = item.querySelector('.edit')
  edit.addEventListener('click', (e) => {
    item.classList.toggle('editing')
    const itemInputs = item.querySelectorAll('input')
    itemInputs.forEach((input) => {
      input.toggleAttribute('readonly')
      const title = item.querySelector('.title')
      title.focus()
      var val = title.value //store the value of the element
      title.value = '' //clear the value of the element
      title.value = val //set that value back.
    })
    if (item.classList.contains('editing')) {
      const edit = item.querySelector('.edit')
      edit.innerHTML = '<i class="ph-fill ph-bookmark-simple black"></i>'
      edit.addEventListener('click', (e) => {
        const endpoint = `${edit.dataset.id}`
        const body = {
          title: `${item.querySelector('.title').value}`,
          tag: `${item.querySelector('.tag').value}`,
        }
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
