let participantes = [
  {
    nome: "Vinicius",
    email: "vinicius@gmail.com",
    dataInscricao: new Date(2024, 3, 23, 19, 23),
    dataCheckIn: new Date(2024, 3, 23, 20, 20)
  },
  {
    nome: "Alexandre",
    email: "alexandre@gmail.com",
    dataInscricao: new Date(2024, 3, 23, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Matheus",
    email: "matheus@gmail.com",
    dataInscricao: new Date(2024, 3, 23, 19, 23),
    dataCheckIn: new Date(2024, 3, 23, 20, 20)
  },
  {
    nome: "Davi",
    email: "davi@gmail.com",
    dataInscricao: new Date(2024, 3, 23, 19, 23),
    dataCheckIn: new Date(2024, 3, 23, 20, 20)
  },
  {
    nome: "Gustavo",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2024, 3, 23, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Daniel",
    email: "daniel@gmail.com",
    dataInscricao: new Date(2024, 3, 23, 19, 23),
    dataCheckIn: new Date(2024, 3, 23, 20, 20)
  },
  {
    nome: "Jardel",
    email: "jardel@gmail.com",
    dataInscricao: new Date(2024, 3, 23, 19, 23),
    dataCheckIn: new Date(2024, 3, 23, 20, 20)
  },
  {
    nome: "Eduardo",
    email: "eduardo@gmail.com",
    dataInscricao: new Date(2024, 3, 23, 19, 23),
    dataCheckIn: new Date(2024, 3, 23, 20, 20)
  },
  {
    nome: "Isaias",
    email: "isaias@gmail.com",
    dataInscricao: new Date(2024, 3, 23, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Luiz",
    email: "luiz@gmail.com",
    dataInscricao: new Date(2024, 3, 23, 19, 23),
    dataCheckIn: null
  }  
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  // condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }
  
  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email  
  )
  
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}