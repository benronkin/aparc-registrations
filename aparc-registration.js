;(function n_main() {
  var cats = {
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
  }

  var query = window.location.search.substring(1)
  if (query && query.indexOf('&') == -1 && query.indexOf('=') > 0) {
    console.log('Referred visitor')
    var pair = query.split('=')
    if ((pair[0] = 'p' && typeof cats[pair[1]] !== 'undefined')) {
      insertCat(pair[1], 'mainDiv')
      document.getElementById(pair[1]).checked = true
      delete cats[pair[1]]
      document.getElementById('alsoLike').classList.remove('n-hidden')
      for (var k in cats) {
        insertCat(k, 'categoriesDiv')
      }
    }
  } else if (query) {
    console.log('Existing subscriber')
    for (var k in cats) {
      insertCat(k, 'categoriesDiv')
    }
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
      const [k, v] = vars[i].split('=')
      if (k === 'em') {
        document.getElementById('email').value = v
        continue
      }

      if (v === 'true') {
        document.getElementById(k).checked = true
      }
    }
  } else {
    console.log('No query param')
    for (var k in cats) {
      insertCat(k, 'categoriesDiv')
    }
    // prevent users from subscribing with no category selected
    document.getElementById('email-submit').setAttribute('disabled', 'disabled')
  }

  function handleUserInput() {
    const checkedCategories = document.querySelectorAll('.category-checkbox:checked')
    if (checkedCategories.length > 0 && document.querySelector('#email').value.length > 5) {
      // prevent users from subscribing with no category selected
      document.getElementById('email-submit').disabled = false
    } else {
      document.getElementById('email-submit').disabled = true
    }
  }

  function insertCat(k, target) {
    var newDiv = document.createElement('div')
    newDiv.classList.add('program-select')

    newDiv.innerHTML =
      "<input type='checkbox' class='category-checkbox' id='" +
      k +
      "' name='" +
      cats[k]['name'] +
      "' value='true'><strong>" +
      cats[k]['name'] +
      "</strong><p class='muted'>" +
      cats[k]['desc'] +
      '</p > '
    document.getElementById(target).appendChild(newDiv)
    document.getElementById(k).addEventListener('change', handleUserInput)
  }

  document.querySelector('#email').addEventListener('keyup', handleUserInput)
})()
