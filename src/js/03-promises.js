import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('click', onClickForm);

const options = {
   position: 'right',
   distance: '15px',
   borderRadius: '15px',
   timeout: 5000,
   clickToClose: true,
   cssAnimationStyle: 'from-right',
};

function createPromise(position, delay) {
   return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
         if (shouldResolve) {
            resolve({ position, delay });
         } else {
            reject({ position, delay });
         }
      }, delay);
   });
};

function onClickForm(e) {
   e.preventDefault();

   const { delay, step, amount } = e.currentTarget.elements;

   let valueDelay = Number(delay.value);
   let valueStep = Number(step.value);
   let valueAmount = Number(amount.value);

   for (let i = 0; i < valueAmount; i++) {
      valueDelay += valueStep;

      createPromise(i, valueDelay)
         .then(({ position, delay }) => {
            Notify.success(`Fulfilled promise ${position + 1} in ${delay}ms`, options);
         })
         .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position + 1} in ${delay}ms`, options);
         });
      e.currentTarget.reset();
   }
};


