const btnSubmit=document.getElementById('addCon');
btnSubmit.addEventListener('click', myfunc);

 function myfunc(){
    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const phone = document.getElementById('formPassword').value;
    const type = document.getElementsByName('type');
    const cards = document.getElementById('cards');

    for(let i=0;i<type.length;i++){
        if(type[i].checked){
            var profession = type[i].value;
        }
    }

     const classname = profession === 'Personal' ? 'btn-primary' : 'btn-success'

        const card = document.createElement('div');
        card.classList='card';
        const cardInner= `<section class="card d-flex flex-row crd col-lg-12">
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


