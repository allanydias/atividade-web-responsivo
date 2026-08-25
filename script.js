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

  let input = `<input onchange="concluirAtividade(event)" value="${tarefa.data}"
  type="checkbox"`

  if(tarefa.finalizada ) {
    input += ' checked' //pega o imput antigo com a cocatenação do checked para ficar com o check
  }

  input += '>' //completar a linha 13

  const formatar = formate(tarefa.data);


  return `
        <div class="card-bg">
          ${input}

          <div>
            <svg class="active" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256">
              <g fill="#9acd32" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)">
              <path d="M24,4c-11.028,0 -20,8.972 -20,20c0,11.028 8.972,20 20,20c11.028,0 20,-8.972 20,-20c0,-11.028 -8.972,-20 -20,-20zM32.561,20.561l-10,10c-0.293,0.293 -0.677,0.439 -1.061,0.439c-0.384,0 -0.768,-0.146 -1.061,-0.439l-5,-5c-0.586,-0.586 -0.586,-1.535 0,-2.121c0.586,-0.586 1.535,-0.586 2.121,0l3.939,3.939l8.939,-8.939c0.586,-0.586 1.535,-0.586 2.121,0c0.586,0.586 0.587,1.535 0.002,2.121z"></path> </g></g>
            </svg>

          <img width="24" height="24" src="https://img.icons8.com/ios/50/EBEBEB/inactive-state.png" alt="inactive-state" class="inactive"/>
          
          <span>${tarefa.nome}</span> 
          </div>

          <time class="short">
            ${formatar.dia.semana.curto}
            ${formatar.dia.numerico}
            ${formatar.hora}
          </time>

          <time class="full">${formatar.dia.semana.longo}, 
          dia ${formatar.dia.numerico} de ${formatar.mes} às ${formatar.hora}h </time>

        </div>`//templet literal
}

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

atualizarListaDeAtividade() 

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