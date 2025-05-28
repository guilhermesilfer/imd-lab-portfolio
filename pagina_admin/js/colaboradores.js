(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const secaoColaboradores = document.getElementById('secaoColaboradores');
        if (!secaoColaboradores) return;

        const btnNovoColaborador = document.getElementById('btnNovoColaborador');
        const formNovoColaborador = document.getElementById('formNovoColaborador');
        const formColabTitle = formNovoColaborador.querySelector('h3');
        const formColabSubmitButton = formNovoColaborador.querySelector('button[type="submit"]');
        const btnCancelarColaborador = document.getElementById('btnCancelarColaborador');
        const listaColaboradoresContainer = document.getElementById('listaColaboradoresItens');
        const placeholderMsgColab = document.getElementById('colaboradoresPlaceholderMsg'); 

        let currentEditingColaboradorId = null;
        const originalFormTitle = formColabTitle.textContent;
        const originalSubmitButtonText = formColabSubmitButton.textContent;
        const imagemDefaultReal = 'img/JEAN_IMD_PERFIL.jpg'; 

        function updateColabPlaceholderVisibility() { 
            if (listaColaboradoresContainer && placeholderMsgColab) {
                placeholderMsgColab.style.display = listaColaboradoresContainer.children.length === 0 ? 'block' : 'none';
            }
        }

        function resetColabFormToDefault() { 
            formNovoColaborador.reset();
            formNovoColaborador.classList.add('hidden');
            currentEditingColaboradorId = null;
            formColabTitle.textContent = originalFormTitle;
            formColabSubmitButton.textContent = originalSubmitButtonText;
            formColabSubmitButton.classList.remove('btn-warning');
            formColabSubmitButton.classList.add('btn-primary');
        }
        
        function createCollaboratorElement(colabData) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('colaborador-item', 'card', 'mb-3');
            
            const imagemParaEsteColaborador = colabData.imagemRealEspecifica || imagemDefaultReal;


            itemDiv.dataset.id = colabData.id || Date.now().toString();
            itemDiv.dataset.nome = colabData.colabNome || '';
            itemDiv.dataset.cargo = colabData.colabCargo || '';
            itemDiv.dataset.formacao = colabData.colabFormacao || '';
            itemDiv.dataset.linkedin = colabData.colabLinkedin || '';
            itemDiv.dataset.email = colabData.colabEmail || '';
            itemDiv.dataset.imagemSolicitada = colabData.colabImagem || ''; 
            itemDiv.dataset.imagemReal = imagemParaEsteColaborador; 
            itemDiv.dataset.descricao = colabData.colabDescricao || '';

            const summaryDiv = document.createElement('div');
            summaryDiv.classList.add('colaborador-summary', 'card-header', 'bg-light', 'd-flex', 'justify-content-between', 'align-items-center');
            const nomeSpan = document.createElement('span');
            nomeSpan.classList.add('colaborador-nome-display', 'h6', 'mb-0');
            nomeSpan.textContent = colabData.colabNome;
            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('colaborador-item-actions');
            const expandButton = document.createElement('button');
            expandButton.type = 'button';
            expandButton.classList.add('btn', 'btn-sm', 'btn-outline-secondary', 'btn-expandir-colab');
            expandButton.innerHTML = '<i class="fas fa-chevron-down"></i> Expandir';
            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.classList.add('btn', 'btn-sm', 'btn-outline-warning', 'btn-editar-colab');
            editButton.innerHTML = '<i class="fas fa-edit"></i> Editar';
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'btn-excluir-colab');
            deleteButton.innerHTML = '<i class="fas fa-trash"></i> Excluir';
            
            actionsDiv.appendChild(expandButton);
            actionsDiv.appendChild(editButton);
            actionsDiv.appendChild(deleteButton);
            summaryDiv.appendChild(nomeSpan);
            summaryDiv.appendChild(actionsDiv);
            itemDiv.appendChild(summaryDiv);

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('colaborador-details', 'card-body', 'hidden');
            const nomeColab = colabData.colabNome || 'N/A';
            const cargoColab = colabData.colabCargo || 'N/A';
            const formacaoColab = colabData.colabFormacao || 'N/A';
            const linkedinHref = formatLink(colabData.colabLinkedin); 
            const linkedinLinkHTML = linkedinHref ? `<a href="${linkedinHref}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary btn-sm mr-2"><i class="fab fa-linkedin"></i> LinkedIn</a>` : '';
            const emailColab = colabData.colabEmail || '';
            const emailLinkHTML = emailColab ? `<a href="mailto:${emailColab}" class="btn btn-outline-secondary btn-sm"><i class="fas fa-envelope"></i> Email</a>` : '';
            const refImgColab = colabData.colabImagem || 'N/A'; 
            const imgSrc = itemDiv.dataset.imagemReal; 
            const descColab = colabData.colabDescricao ? colabData.colabDescricao.replace(/\n/g, '<br>') : 'N/A';

            detailsDiv.innerHTML = `
                <div class="row">
                    <div class="col-md-3 text-center text-md-left mb-3 mb-md-0">
                        <img src="${imgSrc}" alt="${nomeColab}" class="colaborador-imagem-display img-fluid rounded-circle">
                    </div>
                    <div class="col-md-9">
                        <h5 class="font-weight-bold text-primary">${nomeColab}</h5>
                        <p class="text-muted mb-1">${cargoColab}</p>
                        <p class="text-muted mb-2">${formacaoColab}</p>
                        <div class="social-links">
                            ${linkedinLinkHTML}
                            ${emailLinkHTML}
                        </div>
                    </div>
                </div>
                <hr>
                <p class="small text-muted">Referência de Imagem Fornecida: ${refImgColab}</p>
                <h6 class="mt-3">Sobre:</h6>
                <p>${descColab}</p>
            `;
            itemDiv.appendChild(detailsDiv);
            return itemDiv;
        }

        const colaboradoresIniciais = [
            { id: 'colab_inicial_1', colabNome: "Guilherme da Silva Fernandes", colabCargo: "Desenvolvedor Front-end Sênior", colabFormacao: "Bacharel em Ciência da Computação", colabLinkedin: "linkedin.com/in/guilhermefernandes", colabEmail: "guilherme.fernandes@email.com", colabImagem: "guilherme_perfil.jpg", imagemRealEspecifica: 'img/guilherme.jpeg', colabDescricao: "Apaixonado por interfaces de usuário intuitivas e performance web." },
            { id: 'colab_inicial_2', colabNome: "Matheus de Araújo Guedes", colabCargo: "Engenheiro de Software Backend", colabFormacao: "Mestre em Engenharia de Software", colabLinkedin: "linkedin.com/in/matheusguedes", colabEmail: "matheus.guedes@email.com", colabImagem: "matheus_avatar.png", imagemRealEspecifica: 'img/matheus.jpg', colabDescricao: "Especialista em desenvolvimento de APIs RESTful e microserviços." },
            { id: 'colab_inicial_3', colabNome: "Pedro de Araújo Guedes", colabCargo: "UX/UI Designer Pleno", colabFormacao: "Design Gráfico", colabLinkedin: "linkedin.com/in/pedroguedes", colabEmail: "pedro.guedes@email.com", colabImagem: "pedro_designer_foto", imagemRealEspecifica: 'img/pedro.jpg', colabDescricao: "Focado em criar experiências de usuário significativas e visualmente atraentes." }
        ];

        function carregarColaboradoresIniciais() {
            if (listaColaboradoresContainer) {
                colaboradoresIniciais.forEach(colabData => {
                    const colaboradorElement = createCollaboratorElement(colabData);
                    listaColaboradoresContainer.appendChild(colaboradorElement);
                });
            }
        }
        
        updateColabPlaceholderVisibility();
        carregarColaboradoresIniciais();
        updateColabPlaceholderVisibility();


        if (btnNovoColaborador) {
            btnNovoColaborador.addEventListener('click', function() {
                resetColabFormToDefault();
                formNovoColaborador.classList.remove('hidden');
                formNovoColaborador.querySelector('#colabNome').focus();
            });
        }
        if (btnCancelarColaborador) {
            btnCancelarColaborador.addEventListener('click', function() {
                resetColabFormToDefault();
            });
        }
        if (formNovoColaborador) {
            formNovoColaborador.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(formNovoColaborador);
                let dadosColaborador = {};
                formData.forEach((value, key) => { dadosColaborador[key] = value; });

                if (!dadosColaborador.colabNome || dadosColaborador.colabNome.trim() === "") {
                    alert('O nome do colaborador não pode estar vazio.');
                    formNovoColaborador.querySelector('#colabNome').focus();
                    return;
                }
                if (!dadosColaborador.colabCargo || dadosColaborador.colabCargo.trim() === "") {
                    alert('O cargo do colaborador não pode estar vazio.');
                    formNovoColaborador.querySelector('#colabCargo').focus();
                    return;
                }

                if (currentEditingColaboradorId) {
                    const itemToUpdate = listaColaboradoresContainer.querySelector(`.colaborador-item[data-id="${currentEditingColaboradorId}"]`);
                    if (itemToUpdate) {
                        itemToUpdate.dataset.nome = dadosColaborador.colabNome;
                        itemToUpdate.dataset.cargo = dadosColaborador.colabCargo;
                        itemToUpdate.dataset.formacao = dadosColaborador.colabFormacao;
                        itemToUpdate.dataset.linkedin = dadosColaborador.colabLinkedin;
                        itemToUpdate.dataset.email = dadosColaborador.colabEmail;
                        itemToUpdate.dataset.imagemSolicitada = dadosColaborador.colabImagem;
                        itemToUpdate.dataset.descricao = dadosColaborador.colabDescricao;
                        
                        itemToUpdate.querySelector('.colaborador-nome-display').textContent = dadosColaborador.colabNome;
                        
                        const newColabDataFromDataset = { ...itemToUpdate.dataset }; 
                        newColabDataFromDataset.colabNome = itemToUpdate.dataset.nome; 
                        
                        const newDetailsContent = createCollaboratorElement(newColabDataFromDataset).querySelector('.colaborador-details').innerHTML;
                        const detailsDivTarget = itemToUpdate.querySelector('.colaborador-details');
                        if(detailsDivTarget) detailsDivTarget.innerHTML = newDetailsContent;

                        alert('Colaborador "' + dadosColaborador.colabNome + '" atualizado!');
                    }
                } else {
                    dadosColaborador.id = Date.now().toString();
                    const novoColaboradorElement = createCollaboratorElement(dadosColaborador);
                    listaColaboradoresContainer.appendChild(novoColaboradorElement);
                    alert('Colaborador "' + dadosColaborador.colabNome + '" salvo e adicionado à lista!');
                }
                resetColabFormToDefault();
                updateColabPlaceholderVisibility();
            });
        }
        if (listaColaboradoresContainer) {
            listaColaboradoresContainer.addEventListener('click', function(event) {
                const targetButton = event.target.closest('button');
                if (!targetButton) return;
                const colaboradorItem = targetButton.closest('.colaborador-item');
                if (!colaboradorItem) return;

                if (targetButton.classList.contains('btn-excluir-colab')) {
                    if (confirm('Tem certeza que deseja excluir este colaborador: ' + colaboradorItem.dataset.nome + '?')) {
                        if(currentEditingColaboradorId === colaboradorItem.dataset.id) resetColabFormToDefault();
                        colaboradorItem.remove();
                        updateColabPlaceholderVisibility();
                        alert('Colaborador excluído.');
                    }
                } else if (targetButton.classList.contains('btn-editar-colab')) {
                    formNovoColaborador.querySelector('#colabNome').value = colaboradorItem.dataset.nome;
                    formNovoColaborador.querySelector('#colabCargo').value = colaboradorItem.dataset.cargo;
                    formNovoColaborador.querySelector('#colabFormacao').value = colaboradorItem.dataset.formacao;
                    formNovoColaborador.querySelector('#colabLinkedin').value = colaboradorItem.dataset.linkedin;
                    formNovoColaborador.querySelector('#colabEmail').value = colaboradorItem.dataset.email;
                    formNovoColaborador.querySelector('#colabImagem').value = colaboradorItem.dataset.imagemSolicitada;
                    formNovoColaborador.querySelector('#colabDescricao').value = colaboradorItem.dataset.descricao;
                    
                    currentEditingColaboradorId = colaboradorItem.dataset.id;
                    formColabTitle.textContent = 'Editar Colaborador';
                    formColabSubmitButton.textContent = 'Atualizar Colaborador';
                    formColabSubmitButton.classList.remove('btn-primary');
                    formColabSubmitButton.classList.add('btn-warning');
                    formNovoColaborador.classList.remove('hidden');
                    formNovoColaborador.querySelector('#colabNome').focus();
                    formNovoColaborador.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else if (targetButton.classList.contains('btn-expandir-colab')) {
                    const detailsDiv = colaboradorItem.querySelector('.colaborador-details');
                    if (detailsDiv) {
                        const isHidden = detailsDiv.classList.toggle('hidden');
                        targetButton.innerHTML = isHidden ? '<i class="fas fa-chevron-down"></i> Expandir' : '<i class="fas fa-chevron-up"></i> Ocultar';
                        colaboradorItem.classList.toggle('details-visible'); 
                    }
                }
            });
        }
    }); 
})();