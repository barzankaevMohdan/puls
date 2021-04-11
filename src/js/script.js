document.addEventListener('DOMContentLoaded', function(){

    //slides
    'use strict';

    let slideIndex = 1,
        slides = document.querySelectorAll('.slide'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next');

    showSlide(slideIndex);

    function showSlide(n) {

        if (n > slides.length){
          slideIndex = 1;
        }
        if (n < 1) {
          slideIndex = slides.length;
        }

        slides.forEach((index) => index.style.display = 'none');

        slides[slideIndex - 1].style.display = 'block';
    }

    function plusSlide(n) {
      showSlide(slideIndex += n);
    }

    prev.addEventListener('click', function() {
      plusSlide(-1);
    });

    next.addEventListener('click', function() {
      plusSlide(1);
    });

    //Tabs 


    let tab = document.querySelectorAll('.catalog__tab'),
        info = document.querySelector('.catalog__tabs'),
        tabContent = document.querySelectorAll('.catalog__content');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('active-catalog');
            tabContent[i].classList.add('hide-catalog');
            tab[i].classList.remove('active-tab');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide-catalog')) {
            tabContent[b].classList.remove('hide-catalog');
            tabContent[b].classList.add('active-catalog');
            tab[b].classList.add('active-tab');
        }
    }


    info.addEventListener('click', function(event) {
      let target = event.target;
      if (target && target.classList.contains('catalog__tab')) {
          for (let i = 0; i < tab.length; i++) {
              if (target == tab[i]) {
                  hideTabContent(0);
                  showTabContent(i);
                  break;
              }
          }
      }
    });


    //More 


    let btnLink = document.querySelectorAll('.catalog-item__link'),
        btnBack = document.querySelectorAll('.catalog-item__list__back'),
        catalogItem = document.querySelectorAll('.catalog-item__content'),
        catalogList = document.querySelectorAll('.catalog-item__list');


    function hideCatalogContent(a) {
        for (let i = a; i < catalogItem.length; i++) {
            if (catalogItem[i].classList.contains('catalog-item__content_active')) {
                  catalogItem[i].classList.remove('catalog-item__content_active');
                  catalogList[i].classList.add('catalog-item__list_active');
                  return catalogItem[i];
            }
        }
    }


    function hideCatalogLink(b) {
        for (let i = b; i < catalogItem.length; i++) {
          if (catalogList[i].classList.contains('catalog-item__list_active')) {
               catalogList[i].classList.remove('catalog-item__list_active');
               catalogItem[i].classList.add('catalog-item__content_active');
               return catalogList[i];
          }
      }
    }
    

    for (let i = 0; i < btnLink.length; i++) {

        btnLink[i].addEventListener('click', function(event) {

          event.preventDefault();
          let target = event.target;

          if (target == btnLink[i]) {
              hideCatalogContent(i);
          }
          
        });
    }


    for (let i = 0; i < btnBack.length; i++) {

        btnBack[i].addEventListener('click', function(event) {

          event.preventDefault();
          let target = event.target;

          if (target == btnBack[i]) {
              hideCatalogLink(i);
          }
        
        });
    }


    //modal 


    let overlay = document.querySelector('.overlay'),
        consultation = document.querySelector('#consultation'),
		order = document.querySelector('#order'),
		thanks = document.querySelector('#thanks'),
		btnCall = document.querySelector('#btn-call'),
		btnConsultation = document.querySelector('#btn-consultation'),
		btnBuy = document.querySelectorAll('.button_mini'),
		modalClose = document.querySelectorAll('.modal__close'),
		cotalogItemSub = document.querySelectorAll('.catalog-item__subtitle'),
		modalDescr = document.querySelector('#modal-descr');


	for(let i = 0; i < modalClose.length; i++) {
		modalClose[i].addEventListener('click', function(event) {
			let target = event.target;
			if(target == modalClose[i]) {
				overlay.style.display = 'none';
				consultation.style.display = 'none';
				order.style.display = 'none';
				thanks.style.dispaly = 'none';
			}
		});
	}


	btnCall.addEventListener('click', function(){
		overlay.style.display = 'block';
		consultation.style.display = 'block';
	});

	btnConsultation.addEventListener('click', function(){
		overlay.style.display = 'block';
		consultation.style.display = 'block';
	});


	function orderSub(n) {
		for (let i = n; i < cotalogItemSub.length; i++) {
			modalDescr.textContent = cotalogItemSub[i].textContent;
			return cotalogItemSub[i];
		}
	}

	for(let i = 0; i < btnBuy.length; i++) {
		btnBuy[i].addEventListener('click', function(event) {
			let target = event.target;
			if(target == btnBuy[i]) {
				overlay.style.display = 'block';
				order.style.display = 'block';
				orderSub(i);
			}
		});
	}
	

	//Validate

    let mainForm = document.querySelector('#main-form');
    let consultationForm = document.querySelector('#consultation-form');
    let orderForm = document.querySelector('#order-form');
    
    let regExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/,
        regExpTel = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
        regExpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    
    let error = 0;
    

    let validateElem = (elem) => {
        if(elem.name === 'name') {
            if(!regExpName.test(elem.value) && elem.value !== '') {
                elem.nextElementSibling.textContent = 'Введите корректное имя';
                elem.classList.add('_error');
            } else {
                elem.nextElementSibling.textContent = '';
                elem.classList.remove('_error');
            }
        }
        if(elem.name === 'phone') {
            if(!regExpTel.test(elem.value) && elem.value !== '') {
                elem.nextElementSibling.textContent = 'Введите корректный номер телефона';
                elem.classList.add('_error');
            } else {
                elem.nextElementSibling.textContent = '';
                elem.classList.remove('_error');
            }
        }
        if(elem.name === 'email') {
            if(!regExpEmail.test(elem.value) && elem.value !== '') {
                elem.nextElementSibling.textContent = 'Введите корректный Email';
                elem.classList.add('_error');
            } else {
                elem.nextElementSibling.textContent = '';
                elem.classList.remove('_error');
            }
        }
    };

    function subValidate(a) {
        error =0;
        for (let elem of a.elements) {

            if(elem.tagName !== 'BUTTON') {

                if(elem.value === '') {
                    elem.nextElementSibling.textContent = 'Данное поле не заполнено!';
                    elem.classList.add('_error');
                    error++;
                }
                else if(elem.name === 'name') {
                    if(!regExpName.test(elem.value) && elem.value !== '') {
                        elem.nextElementSibling.textContent = 'Введите корректное имя';
                        elem.classList.add('_error');
                        error++;
                    } else {
                        elem.nextElementSibling.textContent = '';
                        elem.classList.remove('_error');
                    }
                }
                else if(elem.name === 'phone') {
                    if(!regExpTel.test(elem.value) && elem.value !== '') {
                        elem.nextElementSibling.textContent = 'Введите корректный номер телефона';
                        elem.classList.add('_error');
                        error++;
                    } else {
                        elem.nextElementSibling.textContent = '';
                        elem.classList.remove('_error');
                    }
                }
                else if(elem.name === 'email') {
                    if(!regExpEmail.test(elem.value) && elem.value !== '') {
                        elem.nextElementSibling.textContent = 'Введите корректный Email';
                        elem.classList.add('_error');
                        error++;
                    } else {
                        elem.nextElementSibling.textContent = '';
                        elem.classList.remove('_error');
                    }
                }else {
                    elem.nextElementSibling.textContent ='';
                    elem.classList.remove('_error');
                }
            }
        }
        return error;
    }

    function blurValidate (b) {
        for (let elem of b.elements) {
            if(elem.tagName !== 'BUTTON') {
                elem.addEventListener('blur', () => {
                    validateElem(elem);
                });        
            }
        }
    }

    blurValidate(mainForm);
    blurValidate(consultationForm);
    blurValidate(orderForm);

    mainForm.addEventListener('submit', (event) =>{
        event.preventDefault(); 
        subValidate(mainForm);

        let formData = {
            name: mainForm.name.value,
            phone: mainForm.phone.value,
            email: mainForm.email.value
        }
        
        subError(error, mainForm, formData);
    });

    consultationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        subValidate(consultationForm);

        let formData = {
            name: consultationForm.name.value,
            phone: consultationForm.phone.value,
            email: consultationForm.email.value
        }

        subError(error, consultationForm, formData);
    });

    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        subValidate(orderForm);

        let formData = {
            name: orderForm.name.value,
            phone: orderForm.phone.value,
            email: orderForm.email.value,
            model: modalDescr.textContent
        }

        subError(error,orderForm,formData);
    });

    async function subError (a,b, form) {
        if (a === 0) {
            let response = await fetch('https://posts-js-4d859-default-rtdb.firebaseio.com/posts.json', {
                method: 'post',
                body: JSON.stringify(form)
            })
            b.reset()
            overlay.style.display = 'block'
            thanks.style.display = 'block'
            consultation.style.display = 'none';
			order.style.display = 'none';
            setTimeout(function() {
                overlay.style.display = 'none'
                thanks.style.display = 'none'
            },4000)
        } else {
            console.error('error')
        }
    }
    


    //Scroll
    

    let pageUp =  document.querySelector('.pageup');

    window.addEventListener('scroll', function() {
        let scroll = pageYOffset;
        if (scroll >= 1000) {
            pageUp.style.display = 'block'
        } else {
            pageUp.style.display = 'none'
        }
    });
    
});
