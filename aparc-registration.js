const aparcReg = {
  categories: {
    ap15: {
      name: 'APARC Bulletin',
      desc: 'A monthly roundup of news, research, and analysis from APARC experts, including programming highlights and selected upcoming events.'
    },
    ap24: {
      name: 'APARC Events',
      desc: 'A digest of upcoming events hosted by APARC and our research programs. Sent weekly during the academic year.'
    },
    ah81: {
      name: 'Asia Health Policy Update',
      desc: 'Event invitations and periodic research updates from the Asia Health Policy Program at APARC.'
    },
    ch33: {
      name: 'China Update',
      desc: 'Event invitations from the China Program at APARC and periodic updates from our experts on research and analysis of Chinese affairs and U.S.-China relations.'
    },
    jp17: {
      name: 'Japan Update',
      desc: 'Event invitations from the Japan Program at APARC and periodic updates from our experts on research and analysis of Japanese affairs and U.S.-Japan relations.'
    },
    kr15: {
      name: 'Korea Update',
      desc: 'Event invitations from the Korea Program at APARC and periodic updates from our experts on research and analysis of Korean affairs and U.S.-Korea relations.'
    },
    sa86: {
      name: 'South Asia Update',
      desc: 'Event invitation and research updates related to South Asian affairs and U.S.-South Asia relations.'
    },
    se04: {
      name: 'Southeast Asia Update',
      desc: 'Event invitations from the Southeast Asia Program at APARC and periodic updates from our experts on research and analysis of Southeast Asian affairs and U.S.-Southeast Asia relations.'
    },
    tw28: {
      name: 'Taiwan Update',
      desc: 'Event invitations from the Taiwan Program at APARC and periodic updates from our experts on research and analysis of contemporary Taiwan, focusing particularly on its economy, society, and culture.'
    }
  },
  elementIds: ['mainDiv', 'categoriesDiv', 'alsoLike', 'email-submit', 'email']
}

function getDomElements() {
  const obj = {}
  aparcReg.elementIds.forEach((id) => {
    obj[id] = document.getElementById(id)
  })
  return obj
}

function getQueryParams() {
  const obj = {}
  const queryString = window.location.search
  if (!queryString) {
    console.log('No query string. new user.')
    return obj
  }

  const searchParams = new URLSearchParams(queryString)

  const em = searchParams.get('em')
  if (em) {
    obj.em = em
  }

  const p = searchParams.get('p')
  if (p) {
    console.log('Referred visitor from a program page.')
    obj.p = p
    return obj
  }

  console.log('Existing subscriber from manage preferences link.')
  Object.keys(aparcReg.categories).forEach((cat) => {
    const x = searchParams.get(cat)
    if (x) {
      obj[cat] = x
    }
  })
  return obj
}

function handleReferredVisitor() {
  if (!isValidCategory(aparcReg.queryParams.p)) {
    console.error('Invalid category:', aparcReg.queryParams.p)
    return
  }
  insertCat(aparcReg.queryParams.p, 'mainDiv')
  document.getElementById(aparcReg.queryParams.p).checked = true
  delete aparcReg.categories[aparcReg.queryParams.p]
  document.getElementById('alsoLike').classList.remove('n-hidden')
}

function handleUserInput() {
  aparcReg.elements['email-submit'].disabled = !isFormSubmittable()
}

function insertCat(k, target) {
  const newDiv = document.createElement('div')
  newDiv.classList.add('program-select')

  newDiv.innerHTML =
    "<input type='checkbox' class='category-checkbox' id='" +
    k +
    "' name='" +
    aparcReg.categories[k]['name'] +
    "' value='true'><strong>" +
    aparcReg.categories[k]['name'] +
    "</strong><p class='muted'>" +
    aparcReg.categories[k]['desc'] +
    '</p > '
  document.getElementById(target).appendChild(newDiv)
  document.getElementById(k).addEventListener('change', handleUserInput)
}

function isValidCategory(cat) {
  return aparcReg.categories[cat] !== undefined
}

function isFormSubmittable() {
  const checkedCategories = document.querySelectorAll('.category-checkbox:checked')
  return checkedCategories.length > 0 && aparcReg.elements.email.value.length > 5
}

document.addEventListener('DOMContentLoaded', () => {
  aparcReg.elements = getDomElements()
  aparcReg.queryParams = getQueryParams()
  if (aparcReg.queryParams.p) {
    handleReferredVisitor()
  }
  if (aparcReg.queryParams.em) {
    aparcReg.elements.email.value = aparcReg.queryParams.em
  }
  for (const k in aparcReg.categories) {
    insertCat(k, 'categoriesDiv')
    if (aparcReg.queryParams[k] === 'true') {
      document.getElementById(k).checked = true
    }
  }
  aparcReg.elements.email.addEventListener('keyup', handleUserInput)
  handleUserInput()
})
