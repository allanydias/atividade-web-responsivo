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
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm')
  }
}

//array == lista 
let atividades = [
  {
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

  let input = `<input onchange="concluirAtividade(event) value="${tarefa.data}"
  type="checkbox"`

  if(tarefa.finalizada ) {
    input += 'checked' //pega o imput antigo com a cocatenação do checked para ficar com o check
  }

  input += '>' //completar a linha 13

  const formatar = formate(tarefa.data);


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
  section.innerHTML = ''

  //verificar se a minha lista está vazia
  if(atividades.length == 0) { //length significa quantos elementos tem na lista
    section.innerHTML = `<p>Nenhuma Atividade cadastrada.</p>`
      return //para a aplicação
  } 
  
  for(let atividade of atividades){
    section.innerHTML += criarItemDeAtividade(atividade);
  }

}

//formulário
const salvarAtividade = (event) => {
  event.preventDefault()
  const dadosDoFormulario = new FormData(event.target)

  const nome = dadosDoFormulario.get('atividade')
  const dia = dadosDoFormulario.get('dia')
  const hora = dadosDoFormulario.get('hora')
  const data = `${dia} ${hora}`

  // objeto chave-valor por isso os dados nas {}. Diferente da função
  const tarefa = {
    nome, 
    data,
    // data tem que colocar aspas
    finalizada: false //atributo
  }

  const atividadeExiste = atividades.find((item) => {
    return item.data == tarefa.data
  })

  atividades = [tarefa,...atividades] //três pontinhos para representar as atividade antigas
  atualizarListaDeAtividade()
}

//função dos dias
const criarDiasSelecao = () => {
  const dias = [
    "2027-02-28",
    "2027-02-29",
    "2027-03-01",
    "2027-03-02",
    "2027-03-03",
    "2027-03-04",
  ]

  let diaSelecao = ''

  for(let dia of dias) {
    const formatar = formate(dia)
    const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}` 
    
    diaSelecao += `<option value="${dia}">${diaFormatado}</option>`
  }

  document.querySelector('select[name="dia"]').innerHTML = diaSelecao

}

criarDiasSelecao()

//função das horas
const criarHorasSelecao = () => {
  let horasDisponiveis = ''

  for(let i = 6; i<23; i++) {//vai executar de 6 até 23
    const hora = String(i).padStart(2, '0')
    horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
     horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
  }

  document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}
criarHorasSelecao()

const concluirAtividade = (event) => {
  const input = event.target
  const dataDesteInput = input.value

  const atividade = atividades.find((item) => {
    return item.data == dataDesteInput
  })

  if(!atividade) return
  
  atividade.finalizada = !atividade.finalizada
  atualizarListaDeAtividade()
}


//39:38