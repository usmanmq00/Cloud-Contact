const btnSubmit = document.getElementById('addCon');
btnSubmit.addEventListener('click', myfunc);

function myfunc() {
  const name = document.getElementById('formName').value;
  const email = document.getElementById('formEmail').value;
  const phone = document.getElementById('formPassword').value;
  const type = document.getElementsByName('type');
  const cards = document.getElementById('cards');

  for (let i = 0; i < type.length; i++) {
    if (type[i].checked) {
      var profession = type[i].value;
    }
  }

  if (!validateForm(name, email, phone)) {
    return false;
  }

  const classname = profession === 'Personal' ? 'btn-primary' : 'btn-success'

  const card = document.createElement('div');
  card.classList = 'card';
  const cardInner = `<section class="card d-flex flex-row crd col-lg-12">
        <div class="cardLeft col-lg-9">
          <h2 class="userName">${name}</h2>
          <p class="userMail"><i class="fa-solid fa-envelope-open userIcon Icon"></i>${email}</p>
          <p class="userPhone"><i class="fa-solid fa-phone userIco Icon"></i>${phone}</p>
          <div class="userButtons">
            <button class="edit text-white bg-secondary">Edit</button>
            <button type="button" class="btn btn-danger">Delete</button>
          </div>
        </div>
        <div class="cardRight col-lg-3">
          <button type="button" class="btn ${classname}" id="profession">${profession}</button>
          <img src="img/img_avatar1.png" alt="ishan" width="150px" height="150px">
        </div>
      </section>`;

  card.innerHTML += cardInner;
  cards.appendChild(card);
}


function validateForm(name, email, phone){
  if (name == "") {
    alert("Name must be filled out");
    return false;
  }
  if (email == "") {
    alert("Email must be filled out");
    return false;
  }
  if (!/(\W|^)[\w.+\-]*@gmail\.com(\W|$)/.test(email)){
    alert("You have entered an invalid email address!")
    return false;
  }
  if (phone == "") {
    alert("Phone must be filled out");
    return false;
  }
  if (!/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(phone)){
    alert("You have entered an invalid phone number!")
    return false;
  }
  return true;
}