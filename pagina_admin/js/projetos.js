(function() { 
    document.addEventListener('DOMContentLoaded', function() { 
        const secaoProjetos = document.getElementById('secaoProjetos');
        if (!secaoProjetos) {
            return; 
        }

        const btnNovoProjeto = document.getElementById('btnNovoProjeto');
        const formNovoProjeto = document.getElementById('formNovoProjeto');
        
        if (!formNovoProjeto) {
            console.error('Módulo Projetos: Formulário #formNovoProjeto não encontrado.');
            return; 
        }

        const formProjetoTitleEl = formNovoProjeto.querySelector('h3');
        const formProjetoSubmitButton = formNovoProjeto.querySelector('button[type="submit"]');
        const btnCancelarProjeto = document.getElementById('btnCancelarProjeto');
        const listaProjetosContainer = document.getElementById('listaProjetosItens');
        const placeholderProjetosMsg = document.getElementById('projetosPlaceholderMsg');
        const projetoColaboradoresSelecaoDiv = document.getElementById('projetoColaboradoresSelecao');
        const projetoParceirosSelecaoDiv = document.getElementById('projetoParceirosSelecao'); 

        if (!btnNovoProjeto || !formProjetoTitleEl || !formProjetoSubmitButton || !btnCancelarProjeto || 
            !listaProjetosContainer || !placeholderProjetosMsg || !projetoColaboradoresSelecaoDiv || !projetoParceirosSelecaoDiv) {
            console.error("Módulo Projetos: Um ou mais elementos essenciais não foram encontrados.");
            return; 
        }

        let currentEditingProjetoId = null;
        const originalFormProjetoTitle = formProjetoTitleEl.textContent;
        const originalSubmitProjetoButtonText = formProjetoSubmitButton.textContent;

        function getColaboradoresDisponiveis() {
            const colaboradorItems = document.querySelectorAll('#listaColaboradoresItens .colaborador-item');
            return Array.from(colaboradorItems).map(item => ({
                id: item.dataset.id,
                nome: item.dataset.nome 
            }));
        }

        function getCollaboratorNameById(id) {
            const colaboradorItem = document.querySelector(`#listaColaboradoresItens .colaborador-item[data-id="${id}"]`);
            return colaboradorItem ? colaboradorItem.dataset.nome : 'Colaborador desconhecido';
        }

        function popularSelecaoDeColaboradores(selectedColabIds = []) {
            projetoColaboradoresSelecaoDiv.innerHTML = ''; 
            const colaboradores = getColaboradoresDisponiveis();

            if (colaboradores.length === 0) {
                projetoColaboradoresSelecaoDiv.innerHTML = '<small class="text-muted">Nenhum colaborador cadastrado.</small>';
                return;
            }

            colaboradores.forEach(colab => {
                const divCheck = document.createElement('div');
                divCheck.classList.add('form-check');
                const checkbox = document.createElement('input');
                checkbox.classList.add('form-check-input');
                checkbox.type = 'checkbox';
                checkbox.value = colab.id;
                checkbox.id = `proj_colab_sel_${colab.id}_${Date.now()}`;
                if (selectedColabIds.includes(colab.id)) checkbox.checked = true;
                const label = document.createElement('label');
                label.classList.add('form-check-label');
                label.htmlFor = checkbox.id;
                label.textContent = colab.nome;
                divCheck.appendChild(checkbox);
                divCheck.appendChild(label);
                projetoColaboradoresSelecaoDiv.appendChild(divCheck);
            });
        }
        
        function getParceirosDisponiveis() {
            const parceiroItems = document.querySelectorAll('#listaParceirosItens .parceiro-item');
            return Array.from(parceiroItems).map(item => ({
                id: item.dataset.id,
                nome: item.dataset.nome 
            }));
        }

        function getParceiroNameById(id) {
            const parceiroItem = document.querySelector(`#listaParceirosItens .parceiro-item[data-id="${id}"]`);
            return parceiroItem ? parceiroItem.dataset.nome : 'Parceiro desconhecido';
        }

        function popularSelecaoDeParceiros(selectedParceiroIds = []) {
            projetoParceirosSelecaoDiv.innerHTML = '';
            const parceiros = getParceirosDisponiveis();

            if (parceiros.length === 0) {
                projetoParceirosSelecaoDiv.innerHTML = '<small class="text-muted">Nenhum parceiro cadastrado.</small>';
                return;
            }

            parceiros.forEach(parc => {
                const divCheck = document.createElement('div');
                divCheck.classList.add('form-check');
                const checkbox = document.createElement('input');
                checkbox.classList.add('form-check-input');
                checkbox.type = 'checkbox';
                checkbox.value = parc.id;
                checkbox.id = `proj_parc_sel_${parc.id}_${Date.now()}`;
                if (selectedParceiroIds.includes(parc.id)) checkbox.checked = true;
                const label = document.createElement('label');
                label.classList.add('form-check-label');
                label.htmlFor = checkbox.id;
                label.textContent = parc.nome;
                divCheck.appendChild(checkbox);
                divCheck.appendChild(label);
                projetoParceirosSelecaoDiv.appendChild(divCheck);
            });
        }

        function updateProjetosPlaceholderVisibility() {
            if (listaProjetosContainer && placeholderProjetosMsg) {
                placeholderProjetosMsg.style.display = listaProjetosContainer.children.length === 0 ? 'block' : 'none';
            }
        }

        function resetProjetoFormToDefault() {
            if (formNovoProjeto) {
                formNovoProjeto.reset();
                formNovoProjeto.classList.add('hidden');
            }
            currentEditingProjetoId = null;
            if (formProjetoTitleEl) formProjetoTitleEl.textContent = originalFormProjetoTitle;
            if (formProjetoSubmitButton) {
                formProjetoSubmitButton.textContent = originalSubmitProjetoButtonText;
                formProjetoSubmitButton.classList.remove('btn-warning');
                formProjetoSubmitButton.classList.add('btn-primary');
            }
            projetoColaboradoresSelecaoDiv.innerHTML = '<small class="text-muted">Nenhum colaborador disponível ou carregando...</small>';
            projetoParceirosSelecaoDiv.innerHTML = '<small class="text-muted">Nenhum parceiro disponível ou carregando...</small>';
        }

        function createProjetoElement(projetoData) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('projeto-item', 'card', 'mb-3');
            itemDiv.dataset.id = projetoData.id || Date.now().toString();
            itemDiv.dataset.titulo = projetoData.projetoTitulo || '';
            itemDiv.dataset.descricao = projetoData.projetoDescricao || '';
            itemDiv.dataset.colaboradoresAtribuidos = JSON.stringify(projetoData.colaboradoresAtribuidos || []);
            itemDiv.dataset.parceirosAtribuidos = JSON.stringify(projetoData.parceirosAtribuidos || []);

            const summaryDiv = document.createElement('div');
            summaryDiv.classList.add('projeto-summary', 'card-header', 'bg-light', 'd-flex', 'justify-content-between', 'align-items-center');
            
            const tituloSpan = document.createElement('span');
            tituloSpan.classList.add('projeto-titulo-display', 'h6', 'mb-0');
            tituloSpan.textContent = projetoData.projetoTitulo;

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('projeto-item-actions');

            const expandButton = document.createElement('button');
            expandButton.type = 'button';
            expandButton.classList.add('btn', 'btn-sm', 'btn-outline-secondary', 'btn-expandir-projeto');
            expandButton.innerHTML = '<i class="fas fa-chevron-down"></i> Detalhes';

            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.classList.add('btn', 'btn-sm', 'btn-outline-warning', 'btn-editar-projeto');
            editButton.innerHTML = '<i class="fas fa-edit"></i> Editar';

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'btn-excluir-projeto');
            deleteButton.innerHTML = '<i class="fas fa-trash"></i> Excluir';
            
            actionsDiv.appendChild(expandButton);
            actionsDiv.appendChild(editButton);
            actionsDiv.appendChild(deleteButton);
            summaryDiv.appendChild(tituloSpan);
            summaryDiv.appendChild(actionsDiv);
            itemDiv.appendChild(summaryDiv);

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('projeto-details', 'card-body', 'hidden');
            
            const tituloProj = projetoData.projetoTitulo || 'N/A';
            const descProj = projetoData.projetoDescricao ? projetoData.projetoDescricao.replace(/\n/g, '<br>') : 'N/A'; 
            
            let colaboradoresHtml = '<p class="text-muted small mb-1">Nenhum colaborador atribuído.</p>';
            const assignedColabIds = projetoData.colaboradoresAtribuidos || [];
            if (assignedColabIds.length > 0) {
                colaboradoresHtml = '<ul class="list-unstyled mb-1">';
                assignedColabIds.forEach(id => {
                    colaboradoresHtml += `<li><small>${getCollaboratorNameById(id)}</small></li>`; 
                });
                colaboradoresHtml += '</ul>';
            }

            let parceirosHtml = '<p class="text-muted small mb-0">Nenhum parceiro atribuído.</p>';
            const assignedParceiroIds = projetoData.parceirosAtribuidos || [];
            if (assignedParceiroIds.length > 0) {
                parceirosHtml = '<ul class="list-unstyled mb-0">';
                assignedParceiroIds.forEach(id => {
                    parceirosHtml += `<li><small>${getParceiroNameById(id)}</small></li>`;
                });
                parceirosHtml += '</ul>';
            }

            detailsDiv.innerHTML = `
                <h6 class="font-weight-bold text-primary">${tituloProj}</h6>
                <div style="white-space: pre-wrap; word-wrap: break-word;">${descProj}</div>
                <hr class="my-2">
                <h6 class="mt-2 mb-1"><small class="text-muted">Colaboradores Atribuídos:</small></h6>
                ${colaboradoresHtml}
                <hr class="my-2">
                <h6 class="mt-2 mb-1"><small class="text-muted">Parceiros Atribuídos:</small></h6>
                ${parceirosHtml}
            `;
            itemDiv.appendChild(detailsDiv);
            return itemDiv;
        }
        
        const projetosIniciais = [
            {
                id: 'proj_inicial_1',
                projetoTitulo: "AgroConecta: Monitoramento Inteligente",
                projetoDescricao: "Desenvolvimento de um sistema de baixo custo baseado em IoT (Internet das Coisas) com sensores de umidade do solo, temperatura e luminosidade para otimizar o uso de recursos hídricos e insumos na agricultura familiar.\nO projeto visa aumentar a produtividade e sustentabilidade de pequenas propriedades rurais através de dados em tempo real e alertas inteligentes.",
                colaboradoresAtribuidos: ['colab_inicial_1', 'colab_inicial_2'], 
                parceirosAtribuidos: ['parc_inicial_1'] 
            },
            {
                id: 'proj_inicial_2',
                projetoTitulo: "Diagnóstico Assistido por IA",
                projetoDescricao: "Criação de um modelo de inteligência artificial capaz de auxiliar profissionais da saúde na detecção precoce de anomalias em exames de imagem médica (ex: radiografias, tomografias).\nO foco é em desenvolver algoritmos de aprendizado de máquina que identifiquem padrões sutis, agilizando o processo de triagem e melhorando a acurácia diagnóstica.",
                colaboradoresAtribuidos: ['colab_inicial_2', 'colab_inicial_3'],
                parceirosAtribuidos: ['parc_inicial_2'] 
            },
            {
                id: 'proj_inicial_3',
                projetoTitulo: "ImmersiEdu: Plataforma VR",
                projetoDescricao: "Construção de uma plataforma educacional utilizando Realidade Virtual (VR) para simular ambientes e experimentos complexos, como laboratórios de química, explorações históricas ou procedimentos técnicos.\nO objetivo é oferecer uma experiência de aprendizado mais engajadora, prática e acessível para estudantes de diferentes níveis.",
                colaboradoresAtribuidos: ['colab_inicial_1', 'colab_inicial_3'], 
                parceirosAtribuidos: ['parc_inicial_2', 'parc_inicial_3']
            }
        ];

        function carregarProjetosIniciais() {
            if (listaProjetosContainer) {
                projetosIniciais.forEach(projetoData => {
                    const projetoElement = createProjetoElement(projetoData);
                    listaProjetosContainer.appendChild(projetoElement);
                });
            }
        }

        updateProjetosPlaceholderVisibility(); 
        carregarProjetosIniciais();
        updateProjetosPlaceholderVisibility(); 

        if (btnNovoProjeto) {
            btnNovoProjeto.addEventListener('click', function() {
                resetProjetoFormToDefault();
                popularSelecaoDeColaboradores(); 
                popularSelecaoDeParceiros();
                if (formNovoProjeto) { 
                    formNovoProjeto.classList.remove('hidden');
                    const firstInput = formNovoProjeto.querySelector('#projetoTitulo');
                    if (firstInput) firstInput.focus();
                }
            });
        }

        if (btnCancelarProjeto) {
            btnCancelarProjeto.addEventListener('click', function() {
                resetProjetoFormToDefault();
            });
        }

        if (formNovoProjeto) {
            formNovoProjeto.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(formNovoProjeto);
                
                const projetoTitulo = formData.get('projetoTitulo');
                const projetoDescricao = formData.get('projetoDescricao');

                if (!projetoTitulo || projetoTitulo.trim() === "") {
                    alert('O título do projeto não pode estar vazio.');
                    formNovoProjeto.querySelector('#projetoTitulo')?.focus();
                    return;
                }
                if (!projetoDescricao || projetoDescricao.trim() === "") {
                   alert('A descrição do projeto não pode estar vazia.');
                   formNovoProjeto.querySelector('#projetoDescricao')?.focus();
                   return;
                }

                const checkboxesColab = projetoColaboradoresSelecaoDiv.querySelectorAll('.form-check-input:checked');
                const selectedColabIds = Array.from(checkboxesColab).map(cb => cb.value);
                
                const checkboxesParc = projetoParceirosSelecaoDiv.querySelectorAll('.form-check-input:checked');
                const selectedParceiroIds = Array.from(checkboxesParc).map(cb => cb.value);

                if (selectedColabIds.length === 0) {
                    alert('É obrigatório atribuir pelo menos um colaborador ao projeto.');
                    projetoColaboradoresSelecaoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return;
                }

                if (selectedParceiroIds.length === 0) {
                    alert('É obrigatório atribuir pelo menos um parceiro ao projeto.');
                    projetoParceirosSelecaoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return;
                }

                let dadosProjeto = {
                    projetoTitulo: projetoTitulo,
                    projetoDescricao: projetoDescricao,
                    colaboradoresAtribuidos: selectedColabIds,
                    parceirosAtribuidos: selectedParceiroIds
                };

                if (currentEditingProjetoId) { 
                    const itemToUpdate = listaProjetosContainer.querySelector(`.projeto-item[data-id="${currentEditingProjetoId}"]`);
                    if (itemToUpdate) {
                        itemToUpdate.dataset.titulo = dadosProjeto.projetoTitulo;
                        itemToUpdate.dataset.descricao = dadosProjeto.projetoDescricao;
                        itemToUpdate.dataset.colaboradoresAtribuidos = JSON.stringify(dadosProjeto.colaboradoresAtribuidos);
                        itemToUpdate.dataset.parceirosAtribuidos = JSON.stringify(dadosProjeto.parceirosAtribuidos);
                        
                        itemToUpdate.querySelector('.projeto-titulo-display').textContent = dadosProjeto.projetoTitulo;
                        
                        const newDetailsContent = createProjetoElement({...dadosProjeto, id: currentEditingProjetoId}).querySelector('.projeto-details').innerHTML;
                        const detailsDivTarget = itemToUpdate.querySelector('.projeto-details');
                        if(detailsDivTarget) detailsDivTarget.innerHTML = newDetailsContent;

                        alert('Projeto "' + dadosProjeto.projetoTitulo + '" atualizado!');
                    }
                } else { 
                    dadosProjeto.id = Date.now().toString();
                    const novoProjetoElement = createProjetoElement(dadosProjeto);
                    if (listaProjetosContainer) listaProjetosContainer.appendChild(novoProjetoElement);
                    alert('Projeto "' + dadosProjeto.projetoTitulo + '" salvo e adicionado à lista!');
                }
                resetProjetoFormToDefault();
                updateProjetosPlaceholderVisibility();
            });
        }

        if (listaProjetosContainer) {
            listaProjetosContainer.addEventListener('click', function(event) {
                const targetButton = event.target.closest('button');
                if (!targetButton) return;

                const projetoItem = targetButton.closest('.projeto-item');
                if (!projetoItem) return;

                if (targetButton.classList.contains('btn-excluir-projeto')) {
                    if (confirm('Tem certeza que deseja excluir este projeto: ' + projetoItem.dataset.titulo + '?')) {
                        if(currentEditingProjetoId === projetoItem.dataset.id) {
                            resetProjetoFormToDefault();
                        }
                        projetoItem.remove();
                        updateProjetosPlaceholderVisibility();
                        alert('Projeto excluído.');
                    }
                } else if (targetButton.classList.contains('btn-editar-projeto')) {
                    if (formNovoProjeto) { 
                        formNovoProjeto.querySelector('#projetoTitulo').value = projetoItem.dataset.titulo;
                        formNovoProjeto.querySelector('#projetoDescricao').value = projetoItem.dataset.descricao;
                        
                        const colabAtribuidos = JSON.parse(projetoItem.dataset.colaboradoresAtribuidos || '[]');
                        popularSelecaoDeColaboradores(colabAtribuidos); 
                        
                        const parcAtribuidos = JSON.parse(projetoItem.dataset.parceirosAtribuidos || '[]');
                        popularSelecaoDeParceiros(parcAtribuidos);
                    
                        currentEditingProjetoId = projetoItem.dataset.id;
                        if (formProjetoTitleEl) formProjetoTitleEl.textContent = 'Editar Projeto';
                        if (formProjetoSubmitButton) {
                            formProjetoSubmitButton.textContent = 'Atualizar Projeto';
                            formProjetoSubmitButton.classList.remove('btn-primary');
                            formProjetoSubmitButton.classList.add('btn-warning');
                        }
                        
                        formNovoProjeto.classList.remove('hidden');
                        formNovoProjeto.querySelector('#projetoTitulo')?.focus();
                        formNovoProjeto.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else if (targetButton.classList.contains('btn-expandir-projeto')) {
                    const detailsDiv = projetoItem.querySelector('.projeto-details');
                    if (detailsDiv) {
                        const isHidden = detailsDiv.classList.toggle('hidden');
                        targetButton.innerHTML = isHidden ? '<i class="fas fa-chevron-down"></i> Detalhes' : '<i class="fas fa-chevron-up"></i> Ocultar';
                    }
                }
            });
        }
    }); 
})();