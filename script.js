// objeto chave-valor por isso os dados nas {}. Diferente da função
const tarefas = {
  name: 'Olhar os E-mails',
  data: new Date('2026-08-19 10:30'),
  finalizada: false

};
// data tem que colocar aspas

// chaves aqui entra como uma função = arrow fuction
const criarItemDeAtividade = () => {
  return ` <section>
        <div>
          <input type="checkbox">
          <span>${tarefas.name}</span> 
          <time>${tarefas.data}</time>
        </div>
      </section>`; //templet literal, 🚩lembrar do ;
};

// interpolar é chaves e não conchete
const section = document.querySelector('section');
section.innerHTML = criarItemDeAtividade(tarefas);