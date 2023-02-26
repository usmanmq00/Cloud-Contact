// document.getElementById("myBtn").addEventListener("click", handleform);
let result;

function handleform() {
    const name = document.getElementById('exampleInputName1').value
    const email = document.getElementById('exampleInputEmail1').value
    const phone = document.getElementById('exampleInputphone1').value
    const profession = document.getElementsByName('flexRadioDefault')
    let prof;
    for (i = 0; i < profession.length; i++) {
        if (profession[i].checked) {
            prof = profession[i].value
        }

    }

    if (!validateEmailandPhone(name, email, phone)) {
        return
    }

    appendCard(name, email, phone, prof)
}

function appendCard(userId = 0, name, email, phone, prof) {
    let dynamic = document.getElementById('contain');
    const card = document.createElement("div");
    card.classList.add('card', 'mt-3');
    card.setAttribute("id", `${userId}`);

    const structure = `
    <div class="d-flex justify-content-between p-3">
        <div class="d-flex flex-column ml-auto mt-3">
            <h5 id="title">${name}</h5>
            <div class="d-flex mt-2">
                <img src="https://cdn3.iconfinder.com/data/icons/feather-5/24/phone-512.png" alt=""
                    width="18px" height="15px" class="m-1">
                <p class="card-text" id="email">${email}</p>
            </div>
            <div class="d-flex mt-1">
                <img src="https://cdn3.iconfinder.com/data/icons/feather-5/24/phone-512.png" alt=""
                    width="18px" height="15px" class="m-1">
                <p class="card-text" id="phone">${phone}</p>
            </div>
            <div class="mt-4">
                <a href="#" class="btn btn-dark" onclick="openEditForm(${userId})">Edit</a>
                <a href="#" class="btn btn-danger" onclick="deleteCard(${userId})">Delete</a>
            </div>
        </div>
        <div class="d-flex flex-column mr-auto">
            <a href="#" class="btn ${prof === 'Personal' ? 'btn-primary' : 'btn-success'}" id="profession">${prof}</a>
            <img class="mt-1" src="images/index.jpg" alt="" width="150px" height="150px">
        </div>
    </div>
    `

    card.innerHTML += structure
    dynamic.appendChild(card)

}

function validateEmailandPhone(name, email, phone) {
    let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    let phoneno = /^\d{10}$/;
    let validPhone = phone.match(phoneno)

    if (name == '') {
        alert("Name cannot be blank")
    }
    if (validEmail && validPhone) {
        return true
    } else if (!validPhone && !validEmail) {
        alert("You have entered an invalid email address and phone no.!")
        return false
    } else if (!validEmail) {
        alert("You have entered an invalid email address!")
        return false
    } else if (!validPhone) {
        alert("You have entered an invalid phone no.!")
        return false
    }
}

function addUser() {
    const name = document.getElementById('exampleInputName1').value
    const email = document.getElementById('exampleInputEmail1').value
    const phone = document.getElementById('exampleInputphone1').value
    const profession = document.getElementsByName('flexRadioDefault')
    let userId;
    let prof;
    for (i = 0; i < profession.length; i++) {
        if (profession[i].checked) {
            prof = profession[i].value
        }
    }

    if (!validateEmailandPhone(name, email, phone)) {
        return
    }
    fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: name,
            email: email,
            phone: phone,
            company: {
                title: prof
            }
        })
    })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            userId = res.id;
            console.log(userId)
        });

    appendCard(userId, name, email, phone, prof)
}

function getUser() {
    fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(res => {
            let users = res.users
            result = [...users]
            for (let item of users) {
                appendCard(item.id, item.firstName, item.email, item.phone, 'Professional')
            }
        });
}

window.onload = getUser

function openEditForm(userId){
    const found_obj = result.find(obj => obj.id == userId);
    document.getElementById('exampleInputName1').value = found_obj.firstName
    document.getElementById('exampleInputEmail1').value = found_obj.email
    document.getElementById('exampleInputphone1').value = found_obj.phone
    //create an edit button
    let dynamic = document.getElementById('section12');
    
    
    // card.setAttribute("id", 'btn-1');
    const structure = `
    <button type="button" id="myBtn" class="btn btn-primary mt-3" onclick="editCard(${userId})">Edit User</button>`
    const card = document.createElement("div");
    card.innerHTML += structure
    dynamic.appendChild(card)
    

}

function editCard(userId) {
    //getting updated values
    const updated_name = document.getElementById('exampleInputName1').value
    const updated_email = document.getElementById('exampleInputEmail1').value
    const updated_phone = document.getElementById('exampleInputphone1').value


    let obj_index = result.findIndex((obj => obj.id == userId));
    result[obj_index].name = updated_name
    result[obj_index].email = updated_email
    result[obj_index].phone = updated_phone

    console.log("userindo",result[obj_index])
    fetch(`https://dummyjson.com/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: updated_name,
          email: updated_email,
          phone: updated_phone
        })
      })
      .then(res => res.json())
      .then(res => {
        console.log("res edit card" ,res)
        let card = document.getElementById(`${userId}`);
        card.querySelector('#title').innerHTML = res.firstName
        card.querySelector('#email').innerHTML = res.email
        card.querySelector('#phone').innerHTML = res.phone

      });

                  
}

function deleteCard(id) {
    fetch(`https://dummyjson.com/users/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => {
        if(res.isDeleted == true){
            let card = document.getElementById(`${id}`);
            card.classList.add('d-none');
        }
    });
}