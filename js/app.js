Vue.component('forma-registr', {
    
    template: `
    <form action="" @submit.prevent="checkForm">

        <div class="form-row">
            <div class="form-field">
                <div class="form-field__title">
                    <h2>Регистрация</h2>
                </div>
                <div class="form-field__text">
                    <p>Уже есть аккаунт?</p>
                    <a href="">Войти</a>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-field">
                <label for="form-name">Имя</label>
<!--Проверка. Буквы, пробел, дефис-->
                <input 
                onkeyup="this.value = this.value.replace(/[^A-Za-zА-Яа-яЁё\' '\-]/g,'');"
                type="text" 
                id="form-name" 
                v-model.trim="lastName" 
                placeholder="Введите свое имя"

                >
                <p v-model="errorName"  for="form-name" class="errorInput">{{errorName}}</p>
            </div>
        </div>

        <div class="form-row">
            <div class="form-field">
                <label for="form-email">Email</label>
                <input type="email" id="form-email" v-model.trim="lastEmail" placeholder="Введите свой Email">
                <p v-model="errorEmail" for="form-email" class="errorInput"> {{errorEmail}}</p>
            </div>
        </div>

        <div class="form-row">
            <div class="form-field">
                <label for="form-phone">Номер телефона</label>
                <!---->
<!--Проверка на телефон, всего длина ввода 17 символов. Ввод/цифры, с некоторыми символами-->
                <input 

                onkeyup="this.value = this.value.replace(/[^\d\()\-\+]/g,'');"
                maxlength="17"
                type="tel" 
                id="form-phone" 
                v-model.trim="lastPhone" 
                placeholder="Введите свой номер телефона">

                <p 
                v-model.trim="errorPhone" 
                for="form-phone" 
                class="errorInput"
                >{{errorPhone}}</p>
            </div>
        </div>

        <div class="form-row">
            <div class="form-field">
                <label for="lanquage-quantity">Язык</label>
                <select

                name="" 
                id="language-quantity" 
                v-model="languageQuantity"
                value="Язык"
                >
                    <option 
                        v-for="(country, index) in countries"
                        :value="country.value"
                        :key='index'

                    >{{country.label}}
                    </option>

                </select>
            </div>
        </div>

        <div class="form-row">
            <div class="form-field__check">
                <input 
                
                type="checkbox" 
                name="agreement" 
                id="agre" 
                v-model.lazy="agreementRules"
                >
                <label for="agre">Принимаю <a href="">условия</a> использования</label>
                <p v-model="errorCheckbox"  for="agre" class="errorCheckbox">{{errorCheckbox}}</p>
            </div>
        </div>
        
        <div class="registr">
            <button 
            type="submit" 
            v-bind:disabled="!formIsValid"
            >Зарегистрироваться</button>
        </div>
    </form>

    `,
        data () {
            return {
                        errors: [],
                        lastName : null,
                        lastEmail : null,
                        lastPhone : null,
                        languageQuantity : 'Russia',
                        agreementRules : false,
                        errorInput: true,
                        errorName : '',
                        errorPhone : '',
                        errorEmail : '',
                        errorCheckbox : '',
                        //Массив из выбора языков
                        countries : [
                            {
                                label: 'Русский',
                                value : 'Russia'
                            },
                            {
                                label: 'Английский',
                                value : 'USA'
                            },
                            {
                                label: 'Китайский',
                                value : 'China'
                            },
                            {
                                label: 'Испанский',
                                value : 'Spain'
                            },
                        ]
                    }
                },
            

    methods: {

//Проверка дополнительно на валидность
        formIsValid: function () {

            return this.lastName && this.lastEmail && this.lastPhone && this.lastEmail
        },

//Основная проверка валидности, в консоль выводит, прошла валидность или нет
        checkForm: function(e) {
            if (this.lastName && this.lastEmail && this.lastPhone && this.lastEmail && this.agreementRules) {
                console.log('ok')
                return true;
            } else {
                console.log('error');
            }

            
            //this.errors = [];
//Вывод, где не прошла проверка
            if(!this.lastName) {
                this.errorName = 'Введено не корректное имя';
            } else  {
                this.errorName = '';
            }
            if(!this.lastEmail) {
                this.errorEmail = 'Введено не корректное значение';
            } else {
                this.errorEmail = '';
            }
            if(!this.lastPhone) {
                this.errorPhone = 'Введено не корректное значение';
            } else {
                this.errorPhone = '';
            }
            if(!this.agreementRules) {
                this.errorCheckbox = 'Вы не согласились с условием';
            } else if (this.agreementRules) {
                this.errorCheckbox = '';
            }
            if(!this.email) {
                this.errors.push('Укажите электронную почту');
            } else if (!this.validEmail(this.email)) {
                this.errors.push('Укажите корректный адрес электронной почты');
            }

            if(!this.errors.length) {
                return true;
            }

            e.preventDefault();
        },
//Дополнительная проверка на заполнения поля Email
        validEmail: function(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
  })



let app = new Vue({
    el : '#app'

})