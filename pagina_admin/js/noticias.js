(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const secaoNoticias = document.getElementById('secaoNoticias');
        if (!secaoNoticias) return;

        const btnNovaNoticia = document.getElementById('btnNovaNoticia');
        const formNovaNoticia = document.getElementById('formNovaNoticia');
        
        if (!btnNovaNoticia || !formNovaNoticia) {
            console.error('Módulo Notícias: Botão de nova notícia ou formulário não encontrado.');
            return;
        }

        const formNoticiaTitle = formNovaNoticia.querySelector('h3');
        const formNoticiaSubmitButton = formNovaNoticia.querySelector('button[type="submit"]');
        const btnCancelarNoticia = document.getElementById('btnCancelarNoticia');
        const listaNoticiasContainer = document.getElementById('listaNoticiasItens');
        const placeholderMsgNoticia = document.getElementById('noticiasPlaceholderMsg');
        const selectProjetoVinculado = document.getElementById('noticiaProjetoVinculado');

        let currentEditingNoticiaId = null;
        const originalFormTitle = formNoticiaTitle.textContent;
        const originalSubmitButtonText = formNoticiaSubmitButton.textContent;
        const imagemFallbackNoticia = 'img/robotics_class.jpg'; 

        function updateNoticiasPlaceholderVisibility() {
            if (listaNoticiasContainer && placeholderMsgNoticia) {
                placeholderMsgNoticia.style.display = listaNoticiasContainer.children.length === 0 ? 'block' : 'none';
            }
        }

        function resetNoticiaFormToDefault() {
            formNovaNoticia.reset();
            formNovaNoticia.classList.add('hidden');
            currentEditingNoticiaId = null;
            formNoticiaTitle.textContent = originalFormTitle;
            formNoticiaSubmitButton.textContent = originalSubmitButtonText;
            formNoticiaSubmitButton.classList.remove('btn-warning');
            formNoticiaSubmitButton.classList.add('btn-primary');
            selectProjetoVinculado.value = ''; 
        }

        function getProjetosDisponiveis() {
            const projetoItems = document.querySelectorAll('#listaProjetosItens .projeto-item');
            return Array.from(projetoItems).map(item => ({
                id: item.dataset.id,
                titulo: item.dataset.titulo 
            }));
        }
        
        function getProjetoTituloById(id) {
            if (!id) return 'Nenhum projeto vinculado';
            const projetoItem = document.querySelector(`#listaProjetosItens .projeto-item[data-id="${id}"]`);
            if (projetoItem && projetoItem.dataset.titulo) {
                return projetoItem.dataset.titulo;
            }
            const projetosConhecidos = {
                'proj_inicial_1': "AgroConecta: Monitoramento Inteligente",
                'proj_inicial_2': "Diagnóstico Assistido por IA",
                'proj_inicial_3': "ImmersiEdu: Plataforma VR"
            };
            return projetosConhecidos[id] || 'Projeto desconhecido';
        }

        function popularProjetosDropdown(selectedProjectId = '') {
            selectProjetoVinculado.innerHTML = '<option value="">Selecione um projeto</option>';
            const projetos = getProjetosDisponiveis();
            if (projetos.length === 0) {
                const option = document.createElement('option');
                option.value = "";
                option.textContent = "Nenhum projeto cadastrado";
                option.disabled = true;
                selectProjetoVinculado.appendChild(option);
            } else {
                projetos.forEach(projeto => {
                    const option = document.createElement('option');
                    option.value = projeto.id;
                    option.textContent = projeto.titulo || `Projeto ID: ${projeto.id}`; 
                    if (projeto.id === selectedProjectId) {
                        option.selected = true;
                    }
                    selectProjetoVinculado.appendChild(option);
                });
            }
        }

        function createNoticiaElement(noticiaData) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('noticia-item', 'card', 'mb-3');
            itemDiv.dataset.id = noticiaData.id || Date.now().toString();
            itemDiv.dataset.nome = noticiaData.noticiaNome || '';
            itemDiv.dataset.data = noticiaData.noticiaData || '';
            itemDiv.dataset.descricao = noticiaData.noticiaDescricao || '';
            itemDiv.dataset.projetoVinculadoId = noticiaData.noticiaProjetoVinculado || '';
            itemDiv.dataset.imagemRef = noticiaData.noticiaImagemRef || ''; 
            itemDiv.dataset.imagemPath = noticiaData.imagemPath || ''; 
            itemDiv.dataset.legendaImagem = noticiaData.noticiaLegendaImagem || '';

            const summaryDiv = document.createElement('div');
            summaryDiv.classList.add('noticia-summary', 'card-header', 'bg-light', 'd-flex', 'justify-content-between', 'align-items-center');
            
            const nomeSpan = document.createElement('span');
            nomeSpan.classList.add('noticia-nome-display', 'h6', 'mb-0');
            nomeSpan.textContent = noticiaData.noticiaNome;

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('noticia-item-actions');

            const expandButton = document.createElement('button');
            expandButton.type = 'button';
            expandButton.classList.add('btn', 'btn-sm', 'btn-outline-secondary', 'btn-expandir-noticia');
            expandButton.innerHTML = '<i class="fas fa-chevron-down"></i> Detalhes';

            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.classList.add('btn', 'btn-sm', 'btn-outline-warning', 'btn-editar-noticia');
            editButton.innerHTML = '<i class="fas fa-edit"></i> Editar';

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'btn-excluir-noticia');
            deleteButton.innerHTML = '<i class="fas fa-trash"></i> Excluir';
            
            actionsDiv.appendChild(expandButton);
            actionsDiv.appendChild(editButton);
            actionsDiv.appendChild(deleteButton);
            summaryDiv.appendChild(nomeSpan);
            summaryDiv.appendChild(actionsDiv);
            itemDiv.appendChild(summaryDiv);

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('noticia-details', 'card-body', 'hidden');
            
            const nomeNoticia = noticiaData.noticiaNome || 'N/A';
            let dataNoticiaFormatada = 'N/A';
            if (noticiaData.noticiaData) {
                const parts = noticiaData.noticiaData.split('-'); 
                if (parts.length === 3) {
                    dataNoticiaFormatada = `${parts[2]}/${parts[1]}/${parts[0]}`;
                } else {
                     dataNoticiaFormatada = noticiaData.noticiaData; 
                }
            }
            
            const descNoticia = noticiaData.noticiaDescricao ? noticiaData.noticiaDescricao.replace(/\n/g, '<br>') : 'N/A';
            const projetoVinculadoNome = getProjetoTituloById(noticiaData.noticiaProjetoVinculado);
            
            let imagemParaExibir = null;
            if (noticiaData.imagemPath) { 
                imagemParaExibir = noticiaData.imagemPath;
            } else if (noticiaData.noticiaImagemRef && noticiaData.noticiaImagemRef.trim() !== "") { 
                imagemParaExibir = imagemFallbackNoticia; 
            }

            const legendaImg = noticiaData.noticiaLegendaImagem || (imagemParaExibir ? 'Imagem da notícia' : '');

            let imagemHtml = '';
            let detalhesColClass = 'col-md-12'; 

            if (imagemParaExibir) {
                imagemHtml = `
                    <div class="col-md-4 text-center">
                        <img src="${imagemParaExibir}" alt="${legendaImg}" class="img-fluid rounded mb-2" style="max-height: 200px; object-fit: cover;">
                        ${noticiaData.noticiaLegendaImagem ? `<p class="text-muted small">${noticiaData.noticiaLegendaImagem}</p>` : ''}
                    </div>
                `;
                detalhesColClass = 'col-md-8'; 
            }

            detailsDiv.innerHTML = `
                <div class="row">
                    ${imagemHtml}
                    <div class="${detalhesColClass}">
                        <h5 class="font-weight-bold text-primary">${nomeNoticia}</h5>
                        <p class="text-muted mb-1"><small><strong>Data:</strong> ${dataNoticiaFormatada}</small></p>
                        <p class="text-muted mb-2"><small><strong>Projeto Vinculado:</strong> ${projetoVinculadoNome}</small></p>
                        ${ (noticiaData.noticiaImagemRef && noticiaData.noticiaImagemRef.trim() !== "") ? `<p class="text-muted mb-1"><small><strong>Referência de Imagem (digitada):</strong> ${noticiaData.noticiaImagemRef}</small></p>` : ''}
                    </div>
                </div>
                <hr>
                <h6>Descrição:</h6>
                <div style="white-space: pre-wrap; word-wrap: break-word;">${descNoticia}</div>
            `;
            itemDiv.appendChild(detailsDiv);
            return itemDiv;
        }
        
        const noticiasIniciais = [
            { 
                id: 'noticia_pre_1', 
                noticiaNome: "Avanços no Projeto AgroConecta", 
                noticiaData: "2025-03-10", 
                noticiaDescricao: "O projeto AgroConecta: Monitoramento Inteligente para Pequenos Produtores tem mostrado resultados promissores em sua fase piloto. Sensores IoT estão coletando dados cruciais para otimizar o uso de recursos hídricos.\nMais informações serão divulgadas em breve.", 
                noticiaProjetoVinculado: "proj_inicial_1", 
                noticiaImagemRef: "predio_imd.jpeg", 
                imagemPath: 'img/predio_imd.jpeg',    
                noticiaLegendaImagem: "Prédio do IMD, hub de inovação do projeto."
            },
            { 
                id: 'noticia_pre_2', 
                noticiaNome: "IA no Diagnóstico por Imagem: Primeiros Testes", 
                noticiaData: "2025-04-05", 
                noticiaDescricao: "A equipe do projeto Diagnóstico Assistido por IA: Detecção Precoce de Anomalias em Exames de Imagem iniciou os primeiros testes com o modelo de machine learning.\nOs resultados são animadores para a detecção precoce de certas condições.", 
                noticiaProjetoVinculado: "proj_inicial_2", 
                noticiaImagemRef: "robotics_class.jpg",
                imagemPath: 'img/robotics_class.jpg',
                noticiaLegendaImagem: "Equipe analisando resultados de IA em imagens médicas."
            },
            { 
                id: 'noticia_pre_3', 
                noticiaNome: "ImmersiEdu Lança Módulo de Laboratório Virtual", 
                noticiaData: "2025-04-20", 
                noticiaDescricao: "A plataforma ImmersiEdu: Plataforma de Aprendizagem Imersiva com Realidade Virtual acaba de lançar seu primeiro módulo de laboratório de química virtual.\nEstudantes agora podem realizar experimentos de forma segura e interativa.", 
                noticiaProjetoVinculado: "proj_inicial_3", 
                noticiaImagemRef: "robotics_class_2.jpg",
                imagemPath: 'img/robotics_class_2.jpg',
                noticiaLegendaImagem: "Interface do novo laboratório virtual da ImmersiEdu."
            }
        ];

        function carregarNoticiasIniciais() {
            if (listaNoticiasContainer) {
                noticiasIniciais.forEach(noticiaData => {
                    const noticiaElement = createNoticiaElement(noticiaData);
                    listaNoticiasContainer.appendChild(noticiaElement);
                });
            }
        }

        updateNoticiasPlaceholderVisibility();
        popularProjetosDropdown(); 
        carregarNoticiasIniciais();
        updateNoticiasPlaceholderVisibility();

        btnNovaNoticia.addEventListener('click', function() {
            resetNoticiaFormToDefault();
            popularProjetosDropdown(); 
            formNovaNoticia.classList.remove('hidden');
            formNovaNoticia.querySelector('#noticiaNome').focus();
        });

        btnCancelarNoticia.addEventListener('click', function() {
            resetNoticiaFormToDefault();
        });

        formNovaNoticia.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(formNovaNoticia);
            let dadosNoticia = {
                imagemPath: '' 
            };
            formData.forEach((value, key) => { dadosNoticia[key] = value; });

            if (!dadosNoticia.noticiaNome || dadosNoticia.noticiaNome.trim() === "") {
                alert('O nome da notícia não pode estar vazio.');
                formNovaNoticia.querySelector('#noticiaNome').focus();
                return;
            }
            if (!dadosNoticia.noticiaData) {
                alert('A data da notícia é obrigatória.');
                formNovaNoticia.querySelector('#noticiaData').focus();
                return;
            }
            if (!dadosNoticia.noticiaDescricao || dadosNoticia.noticiaDescricao.trim() === "") {
                alert('A descrição da notícia não pode estar vazia.');
                formNovaNoticia.querySelector('#noticiaDescricao').focus();
                return;
            }
            if (!dadosNoticia.noticiaProjetoVinculado) { 
                alert('O projeto vinculado é obrigatório.');
                formNovaNoticia.querySelector('#noticiaProjetoVinculado').focus();
                return;
            }

            const imagemRefPreenchida = dadosNoticia.noticiaImagemRef && dadosNoticia.noticiaImagemRef.trim() !== "";
            const legendaImagemVazia = !dadosNoticia.noticiaLegendaImagem || dadosNoticia.noticiaLegendaImagem.trim() === "";

            if (imagemRefPreenchida && legendaImagemVazia) {
                alert('A legenda da imagem é obrigatória quando uma referência de imagem é fornecida.');
                formNovaNoticia.querySelector('#noticiaLegendaImagem').focus();
                return;
            }

            if (currentEditingNoticiaId) {
                const itemToUpdate = listaNoticiasContainer.querySelector(`.noticia-item[data-id="${currentEditingNoticiaId}"]`);
                if (itemToUpdate) {
                    dadosNoticia.imagemPath = itemToUpdate.dataset.imagemPath || ''; 

                    itemToUpdate.dataset.nome = dadosNoticia.noticiaNome;
                    itemToUpdate.dataset.data = dadosNoticia.noticiaData;
                    itemToUpdate.dataset.descricao = dadosNoticia.noticiaDescricao;
                    itemToUpdate.dataset.projetoVinculadoId = dadosNoticia.noticiaProjetoVinculado;
                    itemToUpdate.dataset.imagemRef = dadosNoticia.noticiaImagemRef;
                    itemToUpdate.dataset.legendaImagem = dadosNoticia.noticiaLegendaImagem;
                    
                    itemToUpdate.querySelector('.noticia-nome-display').textContent = dadosNoticia.noticiaNome;
                    
                    const newNoticiaDataFromDataset = {
                        id: currentEditingNoticiaId,
                        noticiaNome: itemToUpdate.dataset.nome,
                        noticiaData: itemToUpdate.dataset.data,
                        noticiaDescricao: itemToUpdate.dataset.descricao,
                        noticiaProjetoVinculado: itemToUpdate.dataset.projetoVinculadoId,
                        noticiaImagemRef: itemToUpdate.dataset.imagemRef,
                        imagemPath: itemToUpdate.dataset.imagemPath, 
                        noticiaLegendaImagem: itemToUpdate.dataset.legendaImagem
                    };
                    
                    const newDetailsContent = createNoticiaElement(newNoticiaDataFromDataset).querySelector('.noticia-details').innerHTML;
                    const detailsDivTarget = itemToUpdate.querySelector('.noticia-details');
                    if(detailsDivTarget) detailsDivTarget.innerHTML = newDetailsContent;

                    alert('Notícia "' + dadosNoticia.noticiaNome + '" atualizada!');
                }
            } else {
                dadosNoticia.id = `noticia_${Date.now()}`;
                const novaNoticiaElement = createNoticiaElement(dadosNoticia);
                listaNoticiasContainer.appendChild(novaNoticiaElement);
                alert('Notícia "' + dadosNoticia.noticiaNome + '" salva!');
            }
            resetNoticiaFormToDefault();
            updateNoticiasPlaceholderVisibility();
        });

        listaNoticiasContainer.addEventListener('click', function(event) {
            const targetButton = event.target.closest('button');
            if (!targetButton) return;

            const noticiaItem = targetButton.closest('.noticia-item');
            if (!noticiaItem) return;

            const noticiaId = noticiaItem.dataset.id;

            if (targetButton.classList.contains('btn-excluir-noticia')) {
                if (confirm('Tem certeza que deseja excluir esta notícia: ' + noticiaItem.dataset.nome + '?')) {
                    if (currentEditingNoticiaId === noticiaId) {
                        resetNoticiaFormToDefault();
                    }
                    noticiaItem.remove();
                    updateNoticiasPlaceholderVisibility();
                    alert('Notícia excluída.');
                }
            } else if (targetButton.classList.contains('btn-editar-noticia')) {
                formNovaNoticia.querySelector('#noticiaNome').value = noticiaItem.dataset.nome;
                formNovaNoticia.querySelector('#noticiaData').value = noticiaItem.dataset.data;
                formNovaNoticia.querySelector('#noticiaDescricao').value = noticiaItem.dataset.descricao;
                formNovaNoticia.querySelector('#noticiaImagemRef').value = noticiaItem.dataset.imagemRef;
                formNovaNoticia.querySelector('#noticiaLegendaImagem').value = noticiaItem.dataset.legendaImagem;
                
                popularProjetosDropdown(noticiaItem.dataset.projetoVinculadoId);
                
                currentEditingNoticiaId = noticiaId;
                formNoticiaTitle.textContent = 'Editar Notícia';
                formNoticiaSubmitButton.textContent = 'Atualizar Notícia';
                formNoticiaSubmitButton.classList.remove('btn-primary');
                formNoticiaSubmitButton.classList.add('btn-warning');
                
                formNovaNoticia.classList.remove('hidden');
                formNovaNoticia.querySelector('#noticiaNome').focus();
                formNovaNoticia.scrollIntoView({ behavior: 'smooth', block: 'center' });

            } else if (targetButton.classList.contains('btn-expandir-noticia')) {
                const detailsDiv = noticiaItem.querySelector('.noticia-details');
                if (detailsDiv) {
                    const isHidden = detailsDiv.classList.toggle('hidden');
                    targetButton.innerHTML = isHidden ? '<i class="fas fa-chevron-down"></i> Detalhes' : '<i class="fas fa-chevron-up"></i> Ocultar';
                }
            }
        });
    });
})();