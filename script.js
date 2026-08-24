//biblioteca de terceiros - day.js
const formate = data => {
  return {
    dia: {
      numerico:dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    mes: dayjs(data.format('MMMM')),
    hora: dayjs(data).format('HH:mm')
  }
}


// objeto chave-valor por isso os dados nas {}. Diferente da função
const tarefa = {
  name: 'Olhar os E-mails',
  data: new Date('2026-08-19 10:30'),
  // data tem que colocar aspas
  finalizada: true //atributo
};

//array == lista 
let atividades = [
  tarefa, {
    name: 'Separar as roupas que eu não uso',
    data: new Date('2026-08-25  15:00'),
    finalizada: false
  },
  {
    name: 'Limpar a galeria de fotos',
    data: new Date('2026-08-26  10:00'),
    finalizada: true
  }
]

atividades = []

// chaves aqui entra como uma função = arrow fuction
const criarItemDeAtividade = (tarefa) => { 

  let input = '<input type="checkbox" '

  if(tarefa.finalizada ) {
    input += 'checked' //pega o imput antigo com a cocatenação do checked para ficar com o check
  }

  input += '>' //completar a linha 13

  const formatar = formatador(atividade.data);


  return ` <section>
        <div>
          ${input}
          <span>${tarefa.name}</span> 
          <time>${formatar.dia.semana.longo}, 
          dia ${formatar.dia.numerico} de ${formatar.mes} às ${formatar.hora}h </time>
        </div>
      </section>`; //templet literal, 🚩lembrar do ;
};

const atualizarListaDeAtividade = () => { // interpolar é chaves e não conchete
  const section = document.querySelector('section');

  //verificar se a minha lista está vazia
  if(atividades.length == 0) { //length significa quantos elementos tem na lista

    section.innerHTML = `<p>Nenhuma Atividade cadastrada.</p>`
    return //para a aplicação
  } 
  
  for(let atividade of atividades){
    section.innerHTML += criarItemDeAtividade(atividade);
  }

}