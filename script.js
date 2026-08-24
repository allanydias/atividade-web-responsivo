// objeto chave-valor por isso os dados nas {}. Diferente da função
const tarefas = {
  name: 'Olhar os E-mails',
  data: new Date('2026-08-19 10:30'),
  finalizada: true

};
// data tem que colocar aspas

// chaves aqui entra como uma função = arrow fuction
const criarItemDeAtividade = (tarefas) => {

  let input = '<input type="checkbox" '

  if(tarefas.finalizada) {
    input = input + 'checked' //pega o imput antigo com a cocatenação do checked para ficar com o check
  }

  input = input + '>' //completar a linha 13


  return ` <section>
        <div>
          ${input}
          <span>${tarefas.name}</span> 
          <time>${tarefas.data}</time>
        </div>
      </section>`; //templet literal, 🚩lembrar do ;
};

// interpolar é chaves e não conchete
const section = document.querySelector('section');
section.innerHTML = criarItemDeAtividade(tarefas);