
//http://api.exchangeratesapi.io/latest?access_key=30a2bc98e1707999f122f57ae71a05df&format=1
//currency - put inside the text box
const select = document.querySelectorAll('select');
        const input = document.querySelectorAll('input');
        let accessKey = '30a2bc98e1707999f122f57ae71a05df'

        const API_URL = `http://api.exchangeratesapi.io/latest?access_key=${accessKey}`;
        
        let html = '';

        async function currency(){
            const res =  await fetch(API_URL);
            const data = await res.json();
            console.log(data)
            const arrKeys = Object.keys(data.rates);
            const rates = data.rates;
            console.log(rates)

            arrKeys.map(item =>{
                return html += `<option value=${item}>${item}</option>`;
            });
            for(let i=0; i<select.length; i++){
                select[i].innerHTML = html;
            };

            function convert(i,j){
                input[i].value = input[j].value * rates[select[i].value] / rates[select[j].value];
            }

            
            input[0].addEventListener('keyup', ()=> convert(1,0));
              

            input[1].addEventListener('keyup', ()=> convert(0,1));
               

            select[0].addEventListener('change', ()=> convert(1,0));
                

            select[1].addEventListener('change', ()=>convert(0,1));

        };

        currency();