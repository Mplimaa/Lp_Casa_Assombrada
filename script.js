const fantasma = document.getElementById('fantasma');
const button = document.getElementById('encontre-o-fantasma');
const pararButton = document.getElementById('parar-busca'); // Botão de parar
const contadorDisplay = document.getElementById('contador');
let contadorCliques = 0; // Variável para contar os cliques

// Função para contar e exibir visitas
function contarVisitas() {
    let visitas = localStorage.getItem('visitas');

    // Se o valor for null ou não um número, inicializa como 0
    if (visitas === null || Number.isNaN(Number(visitas))) {
        visitas = 0;
    } else {
        visitas = Number.parseInt(visitas); // Converte o valor em número usando Number.parseInt
    }

    visitas++; // Incrementa o número de visitas
    localStorage.setItem('visitas', visitas); // Armazena o valor atualizado

    // Enviar visitas para o servidor
    fetch('http://localhost:3000/api/visitas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ visitas }) // Envia o número de visitas em formato JSON
    });
    return visitas; // Retorna o total de visitas
}


// Função para exibir contagem de visitas no footer
function exibirContagemVisitas() {
    const contagem = contarVisitas();
    document.getElementById('contagemVisitas').innerHTML = `Total de visitas: ${contagem}`;
}

// Chama a função para exibir a contagem ao carregar a página
window.onload = exibirContagemVisitas;

button.addEventListener('click', () => {
    fantasma.style.display = 'block';
    moveGhost();
});

function moveGhost() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    fantasma.style.left = `${x}px`;
    fantasma.style.top = `${y}px`;
}

fantasma.addEventListener('click', () => {
    contadorCliques++; // Incrementa o contador
    alert(`Você encontrou o fantasma! Total de cliques: ${contadorCliques}`);
    fantasma.style.display = 'none'; // Esconde o fantasma após clicar
    button.click(); // Mover o fantasma novamente
});

document.addEventListener('DOMContentLoaded', () => {
        const listItems = document.querySelectorAll('#curiosidades-list li');
        const explanationDiv = document.getElementById('explanation');

        listItems.forEach(item => {
            item.addEventListener('click', () => {
                // Limpar a explicação anterior
                explanationDiv.textContent = '';

                // Adicionar a nova explicação
                explanationDiv.textContent = item.getAttribute('data-explanation');
            });
        });
    });

const questions = [
    {
        question: "Qual é a origem do Halloween?",
        options: ["Festival Celta chamado Samhain", "Uma festa cristã", "Uma festa pagã egípcia"],
        answer: 0
    },
    {
        question: "O que significa 'trick or treat'?",
        options: ["Biscoito ou doce", "Travessura ou gostosura", "Fantasia ou verdade"],
        answer: 1
    },
    {
        question: "Qual criatura é tradicionalmente associada ao Halloween?",
        options: ["Coelhos", "Bruxas", "Ursos"],
        answer: 1
    },
    {
        question: "Qual é o símbolo mais famoso do Halloween?",
        options: ["Gato Preto", "Abóbora", "Fantasma"],
        answer: 1
    },
    {
        question: "O que as pessoas costumam fazer no Halloween?",
        options: ["Trocar presentes", "Decorar suas casas com temas assustadores", "Fazer uma festa de aniversário"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.getElementById('start-quiz').addEventListener('click', startQuiz);
document.getElementById('submit-quiz').addEventListener('click', submitQuiz);

function startQuiz() {
    document.getElementById('start-quiz').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement('br'));
    });

    document.getElementById('submit-quiz').style.display = 'block';
}

function submitQuiz() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);
        if (answerIndex === questions[currentQuestionIndex].answer) {
            score++;
        }
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('quiz-result').innerHTML = `Você acertou ${score} de ${questions.length} perguntas.`;
}
// Mover o fantasma a cada 1 segundo
setInterval(moveGhost, 1000);
