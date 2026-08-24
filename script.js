// objeto chave-valor por isso os dados nas {}. Diferente da função
const tarefa = {
  name: 'Olhar os E-mails',
  data: new Date('2026-08-19 10:30'),
  finalizada: true

};
// data tem que colocar aspas

//array == lista 
const atividades = [
  tarefa, {
    nome: 'Separar as roupas que eu não uso',
    data: new Date('2026-08-25  15:00'),
    finalizada: false
  }
]



// chaves aqui entra como uma função = arrow fuction
const criarItemDeAtividade = (tarefa) => {

  let input = '<input type="checkbox" '

  if(tarefa.finalizada) {
    input = input + 'checked' //pega o imput antigo com a cocatenação do checked para ficar com o check
  }

  input = input + '>' //completar a linha 13


  return ` <section>
        <div>
          ${input}
          <span>${tarefa.name}</span> 
          <time>${tarefa.data}</time>
        </div>
      </section>`; //templet literal, 🚩lembrar do ;
};

// interpolar é chaves e não conchete
const section = document.querySelector('section');

for(let atividade of atividades){
  section.innerHTML = criarItemDeAtividade();
}