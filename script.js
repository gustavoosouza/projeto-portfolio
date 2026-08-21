/* PORTFÓLIO — GUSTAVO OLIVEIRA DE SOUZA */

document.addEventListener("DOMContentLoaded", () => {
  /* --- 1. MENU DO CELULAR (abre e fecha ao clicar no botão) --- */
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha o menu quando o usuário clica em um dos links
  mainNav.querySelectorAll(".tab").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* --- 2. TEMA CLARO / ESCURO --- */
  const themeToggle = document.getElementById("theme-toggle");
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme) {
    htmlEl.setAttribute("data-theme", savedTheme);
    themeToggle.setAttribute("aria-pressed", String(savedTheme === "dark"));
  }

  themeToggle.addEventListener("click", () => {
    const isDark = htmlEl.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";

    if (nextTheme === "light") {
      htmlEl.removeAttribute("data-theme");
    } else {
      htmlEl.setAttribute("data-theme", "dark");
    }

    localStorage.setItem("portfolio-theme", nextTheme);
    themeToggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
  });

  /* --- 3. ABA ATIVA CONFORME A SEÇÃO NA TELA --- */
  const sections = document.querySelectorAll("main .section");
  const tabs = document.querySelectorAll(".tab");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          tabs.forEach((tab) => {
            tab.classList.toggle("is-active", tab.dataset.tab === id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  ); // considera a seção "ativa" quando ela chega perto do meio da tela

  sections.forEach((section) => observer.observe(section));

  /* --- 4. FORMULÁRIO DE CONTATO --- */
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const modal = document.getElementById("confirm-modal");
  const modalClose = document.getElementById("modal-close");

  // Padrão de texto que confere se o e-mail tem o formato "algo@algo.algo"
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(input, message) {
    const field = input.closest(".form-field");
    const errorEl = document.getElementById(`${input.id}-error`);
    if (message) {
      field.classList.add("has-error");
      errorEl.textContent = message;
    } else {
      field.classList.remove("has-error");
      errorEl.textContent = "";
    }
  }

  function validateForm() {
    let isValid = true;

    // Campo Nome
    if (nameInput.value.trim() === "") {
      setFieldError(nameInput, "Por favor, informe seu nome.");
      isValid = false;
    } else {
      setFieldError(nameInput, "");
    }

    // Campo E-mail
    if (emailInput.value.trim() === "") {
      setFieldError(emailInput, "Por favor, informe seu e-mail.");
      isValid = false;
    } else if (!EMAIL_REGEX.test(emailInput.value.trim())) {
      setFieldError(
        emailInput,
        "Informe um e-mail válido (ex: usuario@dominio.com).",
      );
      isValid = false;
    } else {
      setFieldError(emailInput, "");
    }

    // Campo Mensagem
    if (messageInput.value.trim() === "") {
      setFieldError(messageInput, "Escreva uma mensagem antes de enviar.");
      isValid = false;
    } else {
      setFieldError(messageInput, "");
    }

    return isValid;
  }

  function openModal() {
    modal.hidden = false;
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // impede a página de recarregar

    if (!validateForm()) return;

    // Finge que está enviando
    const submitBtn = form.querySelector(".btn-submit");
    const btnText = submitBtn.querySelector(".btn-text");
    const originalText = btnText.textContent;

    submitBtn.disabled = true;
    btnText.textContent = "Enviando...";

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      btnText.textContent = originalText;
      openModal();
    }, 900);
  });

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
});
