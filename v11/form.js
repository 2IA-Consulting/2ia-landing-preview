// Envio dos formulários de captação ao Web3Forms sem sair da página. O
// action/method do <form> já basta sem JS; isto é a camada por cima.
//
// Serve as duas landings — /conversa/ e /auditoria/ —, que compartilham a mesma
// access key e se distinguem pelo `subject`. Cada página traz a própria
// confirmação em data-sent-message, porque "enviamos horários" e "um consultor
// entra em contato" não são a mesma promessa.
//
// Em produção depende de duas entradas de CSP servidas pelo Nginx (repo
// 2ia-infra): script-src 'self' para executar e connect-src
// https://api.web3forms.com para o fetch sair.
(() => {
  const form = document.querySelector("#form");
  const feedback = document.querySelector("#form-feedback");
  if (!form || !feedback) return;

  const submit = form.querySelector('button[type="submit"]');

  const say = (message, state) => {
    feedback.textContent = message;
    form.classList.toggle("is-error", state === "error");
    form.classList.toggle("is-sent", state === "sent");
  };

  form.addEventListener("submit", async (event) => {
    // O evento só dispara depois da validação nativa passar, então não há o que
    // revalidar aqui.
    event.preventDefault();
    submit.disabled = true;
    say("Enviando…");

    // FormData direto em vez de Object.fromEntries: um grupo de checkbox com
    // nomes repetidos colapsaria para um único valor na conversão para objeto.
    const data = new FormData(form);
    // O redirect existe só para o caminho sem JS.
    data.delete("redirect");

    try {
      const response = await fetch(form.action, { method: "POST", body: data });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) {
        throw new Error(result.message || String(response.status));
      }

      say(
        form.dataset.sentMessage ||
          "Recebemos seus dados. Entramos em contato em até 1 dia útil.",
        "sent",
      );
    } catch {
      // Sem e-mail de contato na mensagem: os links do rodapé ainda são
      // placeholders, então não há endereço público para oferecer.
      say(
        "Não conseguimos enviar agora. Tente novamente em alguns instantes.",
        "error",
      );
      submit.disabled = false;
    }
  });
})();
