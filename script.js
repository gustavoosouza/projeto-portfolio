/* PORTFÓLIO - GUSTAVO OLIVEIRA DE SOUZA  */

/* 1. MENU MOBILE*/
let menuAberto = false;

const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");

function alternarMenu() {
  menuAberto = !menuAberto; // inverte o valor: true vira false, false vira true

  if (menuAberto) {
    menu.style.display = "flex"; // element.style, visto na Aula 6
  } else {
    menu.style.display = "none";
  }
}

botaoMenu.addEventListener("click", alternarMenu);

/* 2. TEMA CLARO / ESCURO */
let temaEscuroAtivo = false;

const botaoTema = document.getElementById("botao-tema");

function alternarTema() {
  temaEscuroAtivo = !temaEscuroAtivo;

  if (temaEscuroAtivo) {
    document.body.style.backgroundColor = "#1a1a2e";
    document.body.style.color = "#f2f3f7";
    botaoTema.textContent = "Ativar tema claro";
  } else {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#1a1a2e";
    botaoTema.textContent = "Ativar tema escuro";
  }
}

botaoTema.addEventListener("click", alternarTema);

/* 3. FORMULÁRIO DE CONTATO */
const formulario = document.getElementById("formulario-contato");

function validarEmail(email) {
  // split("@") divide o texto em pedaços usando "@" como separador.
  // Um e-mail válido precisa ter exatamente 2 pedaços: "usuario" e "dominio.com"
  const partes = email.split("@");

  if (partes.length !== 2) {
    return false;
  }

  const dominio = partes[1];

  // o domínio precisa conter um ponto, tipo "gmail.com"
  if (dominio.indexOf(".") === -1) {
    return false;
  }

  return true;
}

function enviarFormulario(evento) {
  evento.preventDefault(); // impede o recarregamento da página, pois não há servidor

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const mensagem = document.getElementById("mensagem").value;

  // Validação: nome
  if (nome === "") {
    alert("Por favor, preencha o campo Nome.");
    return;
  }

  // Validação: e-mail
  if (email === "") {
    alert("Por favor, preencha o campo E-mail.");
    return;
  }

  if (validarEmail(email) === false) {
    alert("Por favor, informe um e-mail válido (exemplo: usuario@dominio.com).");
    return;
  }

  // Validação: mensagem
  if (mensagem === "") {
    alert("Por favor, escreva uma mensagem.");
    return;
  }

  // Se passou em todas as validações, simula o envio
  alert("Mensagem enviada com sucesso!");
  formulario.reset(); // limpa os campos do formulário
}

formulario.addEventListener("submit", enviarFormulario);
