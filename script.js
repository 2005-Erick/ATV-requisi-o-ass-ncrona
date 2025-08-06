const cepInput = document.getElementById('cep');
const ruaInput = document.getElementById('rua');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');
const cepError = document.getElementById('cep-error');

const clearForm = () => {
    ruaInput.value = '';
    bairroInput.value = '';
    cidadeInput.value = '';
    ufInput.value = '';
};

const showError = (message) => {
    cepError.textContent = message;
    cepError.style.display = 'block';
    clearForm();
};

const hideError = () => {
    cepError.style.display = 'none';
};

cepInput.addEventListener('blur', () => {
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        showError('CEP inválido.');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                showError('CEP não encontrado.');
                return;
            }

            hideError();
            ruaInput.value = data.logradouro;
            bairroInput.value = data.bairro;
            cidadeInput.value = data.localidade;
            ufInput.value = data.uf;
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            showError('Erro ao buscar CEP.');
        });
});