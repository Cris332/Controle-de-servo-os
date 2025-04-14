document.addEventListener('DOMContentLoaded', () => {
    aplicarPreferencias();
  
    const form = document.getElementById('config-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const theme = document.getElementById('theme').value;
        const language = document.getElementById('language').value;
        const fontSize = document.getElementById('font-size').value;
        const highContrast = document.getElementById('high-contrast').checked;
        const screenReader = document.getElementById('screen-reader').checked;
        const subtitleToggle = document.getElementById('subtitle-toggle').checked;
  
        localStorage.setItem('theme', theme);
        localStorage.setItem('language', language);
        localStorage.setItem('fontSize', fontSize);
        localStorage.setItem('highContrast', highContrast);
        localStorage.setItem('screenReader', screenReader);
        localStorage.setItem('subtitleToggle', subtitleToggle);
  
        alert("Preferências salvas!");
        aplicarPreferencias();
      });
  
      form.addEventListener('reset', () => {
        localStorage.clear();
        setTimeout(() => {
          aplicarPreferencias();
          alert("Preferências restauradas para o padrão.");
        }, 100);
      });
    }
  });
  
  function aplicarPreferencias() {
    const theme = localStorage.getItem('theme') || 'light';
    const fontSize = localStorage.getItem('fontSize') || 'normal';
    const contrast = localStorage.getItem('highContrast') === 'true';
    const screenReader = localStorage.getItem('screenReader') === 'true';
    const subtitleToggle = localStorage.getItem('subtitleToggle') === 'true';
    const language = localStorage.getItem('language') || 'pt-br';
  
    // Limpa classes anteriores
    document.body.classList.remove('light', 'dark', 'high-contrast');
    document.body.classList.add(theme);
    if (contrast) document.body.classList.add('high-contrast');
  
    // Fonte
    document.body.style.fontSize =
      fontSize === 'large' ? '18px' :
      fontSize === 'x-large' ? '20px' : '16px';
  
    // Acessibilidade
    if (screenReader) {
      document.body.setAttribute('aria-live', 'polite');
    } else {
      document.body.removeAttribute('aria-live');
    }
  
    if (subtitleToggle) {
      document.body.setAttribute('data-subtitles', 'on');
    } else {
      document.body.removeAttribute('data-subtitles');
    }
  
    document.documentElement.lang = language;
  
    traduzirInterface(language);
  
    // Preenche o formulário com os valores salvos (caso esteja na tela de configurações)
    preencherFormulario();
  }
  
  function preencherFormulario() {
    if (!document.getElementById('config-form')) return;
  
    document.getElementById('theme').value = localStorage.getItem('theme') || 'light';
    document.getElementById('language').value = localStorage.getItem('language') || 'pt-br';
    document.getElementById('font-size').value = localStorage.getItem('fontSize') || 'normal';
    document.getElementById('high-contrast').checked = localStorage.getItem('highContrast') === 'true';
    document.getElementById('screen-reader').checked = localStorage.getItem('screenReader') === 'true';
    document.getElementById('subtitle-toggle').checked = localStorage.getItem('subtitleToggle') === 'true';
  }
  
  // Tradução da interface
  function traduzirInterface(lang) {
    const textos = {
      'pt-br': {
        titulo: "Configurações do Sistema",
        salvar: "Salvar",
        restaurar: "Restaurar Padrões"
      },
      'en-us': {
        titulo: "System Settings",
        salvar: "Save",
        restaurar: "Reset to Defaults"
      },
      'es': {
        titulo: "Configuraciones del Sistema",
        salvar: "Guardar",
        restaurar: "Restaurar Valores"
      }
    };
  
    const traducao = textos[lang];
    if (!traducao) return;
  
    for (const [key, value] of Object.entries(traducao)) {
      const el = document.querySelector(`[data-i18n="${key}"]`);
      if (el) el.textContent = value;
    }
  }
  