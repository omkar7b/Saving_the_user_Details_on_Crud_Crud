function ongetacall(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;


//Storing Data

    user = {
        name: name,
        email: email,
        phone: phone,
        date: date,
        time: time
    }
    let key = document.getElementById('email').value;
    let uesrJSON = JSON.stringify(user);
    localStorage.setItem(key,uesrJSON);
    
    axios.post('https://crudcrud.com/api/f6fc7e1152e1431db20b00f111f9c9/appointmentData', user)
    .then(response => {
        showUserOnScreen(response.data)
        console.log(response)
    })
    .catch(err => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something Went Wrong</h4>"
        console.log(err);
    })
}

//Show User On Screen Function
function showUserOnScreen(user){
    let parentElement = document.getElementById('listOfItems');
    let childElement = document.createElement('li');
    childElement.textContent = user.name+ '-' + user.email+ '-' + user.phone + '-' + user.date + '-' + user.time;
    
//Delete Button
    var deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.style.backgroundColor = 'orange';
    deleteBtn.value = 'Delete';

    deleteBtn.onclick = () => {
        localStorage.removeItem(user.email);
        parentElement.removeChild(childElement);
    }
    
//Edit Button
    var edit = document.createElement('input');
    edit.type = 'button';
    edit.style.backgroundColor = 'orange';
    edit.value = 'Edit';

    edit.onclick = () => {
        let edituser = JSON.parse(localStorage.getItem(user.email));
        document.getElementById('name').value=edituser.name;
        document.getElementById('email').value=edituser.email;
        document.getElementById('phone').value=edituser.phone;
        document.getElementById('time').value.edituser.time;
        document.getElementById('date').value.edituser.date;

        localStorage.removeItem(user.email);
        parentElement.removeChild(childElement);
    }

    childElement.appendChild(edit);
    childElement.appendChild(deleteBtn);
    parentElement.appendChild(childElement);
}

