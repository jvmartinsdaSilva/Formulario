const form = document.getElementById('form')
const UserName = document.getElementById('iUserName')
const Email = document.getElementById('iEmail')
const Password = document.getElementById('iPassword')
const PasswordConfirm = document.getElementById('iConfirm')
const formsConfigs = document.querySelectorAll('.content')


form.addEventListener('submit', (e) => {
    e.preventDefault()

    CheckForm()


    const formValid = [...formsConfigs].every((formConfig) => {
        return formConfig.className === 'content success'
    })

    if (formValid) {
        console.log('Cadastro valído')
    }
})

function CheckForm() {

    CheckUserName(UserName.value)
    CheckEmail(Email.value)
    CheckPassword(Password.value)
    PasswordConfirmation(Password.value, PasswordConfirm.value)
}

function CheckUserName(UserNameValue) {
    if (UserNameValue.length < 3) {
        inputError(UserName, 'O nome deve conter pelo menos 3 caracteres')
    } else {
        inputSuccess(UserName)
    }
}

function CheckEmail(EmailValue) {
    if (EmailValue === '') {
        inputError(Email, 'O Email é obrigatório')
    } else if (!EmailValid(EmailValue)) {
        inputError(Email, 'Insira um Email valído')
    } else {
        inputSuccess(Email)
    }

    function EmailValid(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
    }
}

function CheckPassword(PasswordValue) {

    PasswordLength(PasswordValue)
    PasswordNumber(PasswordValue)
    PasswordSpecial(PasswordValue)
    PasswordUpperCase(PasswordValue)

    const PasswordConfigs = document.querySelectorAll('.PasswordConfig')

    const PasswordValid = [...PasswordConfigs].every((PasswordConfig) => {
        return (PasswordConfig.className === 'PasswordConfig success')
    })

    if (!PasswordValid) {
        inputError(Password, 'Senha invalida')
    } else {
        inputSuccess(Password)
    }


    function PasswordLength(PasswordValue) {
        const liLength = document.getElementById('passwordLength')

        if (PasswordValue.length < 8) {
            inputError(Password, 'Senha invalida')
            liLength.className = 'PasswordConfig error'
        } else {
            liLength.className = 'PasswordConfig success'
        }
    }

    function PasswordNumber(PasswordValue) {
        const liNumber = document.getElementById('passwordNumber')
        const regex = /[0-9]/

        if (regex.test(PasswordValue)) {
            liNumber.className = 'PasswordConfig success'
        } else {
            liNumber.className = 'PasswordConfig error'
        }
    }

    function PasswordSpecial(PasswordValue) {
        const liSpecial = document.getElementById('passwordSpecial')
        const regex = /[#@_$%&./]/

        if (regex.test(PasswordValue)) {
            liSpecial.className = 'PasswordConfig success'
        } else {
            liSpecial.className = 'PasswordConfig error'
        }
    }

    function PasswordUpperCase(PasswordValue) {
        const liUppercase = document.getElementById('passwordUpperCase')
        const regex = /[A-ZÇ]/

        if (regex.test(PasswordValue)) {
            liUppercase.className = 'PasswordConfig success'
        } else {
            liUppercase.className = 'PasswordConfig error'
        }
    }

}


function PasswordConfirmation(PasswordValue, PasswordConfirmValue) {
    if (PasswordValue != PasswordConfirmValue || PasswordValue === '') {
        inputError(PasswordConfirm, 'As senhas não conferem')
    } else {
        inputSuccess(PasswordConfirm)
    }
}




function inputError(input, Message) {
    const content = input.parentElement
    const MessageText = content.querySelector('.Message')
    MessageText.textContent = Message

    content.className = 'content err'
}

function inputSuccess(input) {
    const content = input.parentElement
    const MessageText = content.querySelector('.Message')
    MessageText.textContent = ''

    content.className = 'content success'
}