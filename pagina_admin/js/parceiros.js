(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const secaoParceiros = document.getElementById('secaoParceiros');
        if (!secaoParceiros) return; 

        const btnNovoParceiro = document.getElementById('btnNovoParceiro');
        const formNovoParceiro = document.getElementById('formNovoParceiro');
        const formParceiroTitle = formNovoParceiro.querySelector('h3');
        const formParceiroSubmitButton = formNovoParceiro.querySelector('button[type="submit"]');
        const btnCancelarParceiro = document.getElementById('btnCancelarParceiro');
        const listaParceirosContainer = document.getElementById('listaParceirosItens');
        const placeholderParceirosMsg = document.getElementById('parceirosPlaceholderMsg');

        let currentEditingParceiroId = null;
        const originalFormParceiroTitle = formParceiroTitle.textContent;
        const originalSubmitParceiroButtonText = formParceiroSubmitButton.textContent;

        function updateParceirosPlaceholderVisibility() {
            if (listaParceirosContainer && placeholderParceirosMsg) {
                placeholderParceirosMsg.style.display = listaParceirosContainer.children.length === 0 ? 'block' : 'none';
            }
        }

        function resetParceiroFormToDefault() {
            formNovoParceiro.reset();
            formNovoParceiro.classList.add('hidden');
            currentEditingParceiroId = null;
            formParceiroTitle.textContent = originalFormParceiroTitle;
            formParceiroSubmitButton.textContent = originalSubmitParceiroButtonText;
            formParceiroSubmitButton.classList.remove('btn-warning');
            formParceiroSubmitButton.classList.add('btn-primary');
        }

        function createParceiroElement(parceiroData) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('parceiro-item', 'card', 'mb-3');
            itemDiv.dataset.id = parceiroData.id || Date.now().toString();
            itemDiv.dataset.nome = parceiroData.parceiroNome || '';
            itemDiv.dataset.site = parceiroData.parceiroSite || '';

            const summaryDiv = document.createElement('div');
            summaryDiv.classList.add('parceiro-summary', 'card-header', 'bg-light');
            
            const nomeSpan = document.createElement('span');
            nomeSpan.classList.add('parceiro-nome-display', 'h6', 'd-block', 'mb-2');
            nomeSpan.textContent = parceiroData.parceiroNome;

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('parceiro-item-actions', 'text-right', 'mt-1');

            const expandButton = document.createElement('button');
            expandButton.type = 'button';
            expandButton.classList.add('btn', 'btn-sm', 'btn-outline-secondary', 'btn-expandir-parceiro');
            expandButton.innerHTML = '<i class="fas fa-info-circle"></i> Detalhes';

            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.classList.add('btn', 'btn-sm', 'btn-outline-warning', 'btn-editar-parceiro', 'ml-1');
            editButton.innerHTML = '<i class="fas fa-edit"></i> Editar';

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'btn-excluir-parceiro', 'ml-1');
            deleteButton.innerHTML = '<i class="fas fa-trash"></i> Excluir';
            
            actionsDiv.appendChild(expandButton);
            actionsDiv.appendChild(editButton);
            actionsDiv.appendChild(deleteButton);
            
            summaryDiv.appendChild(nomeSpan);
            summaryDiv.appendChild(actionsDiv);
            itemDiv.appendChild(summaryDiv);

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('parceiro-details', 'card-body', 'hidden');
            
            const nomeParc = parceiroData.parceiroNome || 'N/A';
            const siteParc = parceiroData.parceiroSite || '';
            const siteLinkHTML = siteParc ? `<a href="${formatLink(siteParc)}" target="_blank" rel="noopener noreferrer">${siteParc}</a>` : 'N/A'; 

            detailsDiv.innerHTML = `
                <h6 class="font-weight-bold text-primary">${nomeParc}</h6>
                <p class="mb-0"><strong>Site:</strong> ${siteLinkHTML}</p>
            `;
            itemDiv.appendChild(detailsDiv);
            return itemDiv;
        }
        
        const parceirosIniciais = [
            { id: 'parc_inicial_1', parceiroNome: "Dell Technologies", parceiroSite: "https://www.dell.com" },
            { id: 'parc_inicial_2', parceiroNome: "Samsung", parceiroSite: "https://www.samsung.com" },
            { id: 'parc_inicial_3', parceiroNome: "Microsoft", parceiroSite: "https://www.microsoft.com" }
        ];

        function carregarParceirosIniciais() {
            if (listaParceirosContainer) {
                parceirosIniciais.forEach(parceiroData => {
                    const parceiroElement = createParceiroElement(parceiroData);
                    listaParceirosContainer.appendChild(parceiroElement);
                });
            }
        }

        updateParceirosPlaceholderVisibility();
        carregarParceirosIniciais();
        updateParceirosPlaceholderVisibility();


        if (btnNovoParceiro) {
            btnNovoParceiro.addEventListener('click', function() {
                resetParceiroFormToDefault();
                formNovoParceiro.classList.remove('hidden');
                formNovoParceiro.querySelector('#parceiroNome').focus();
            });
        }

        if (btnCancelarParceiro) {
            btnCancelarParceiro.addEventListener('click', function() {
                resetParceiroFormToDefault();
            });
        }

        if (formNovoParceiro) {
            formNovoParceiro.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(formNovoParceiro);
                let dadosParceiro = {
                    parceiroNome: formData.get('parceiroNome'),
                    parceiroSite: formData.get('parceiroSite')
                };

                if (!dadosParceiro.parceiroNome || dadosParceiro.parceiroNome.trim() === "") {
                    alert('O nome do parceiro não pode estar vazio.');
                    formNovoParceiro.querySelector('#parceiroNome').focus();
                    return;
                }
                if (!dadosParceiro.parceiroSite || dadosParceiro.parceiroSite.trim() === "") {
                    alert('O link do site do parceiro não pode estar vazio.');
                    formNovoParceiro.querySelector('#parceiroSite').focus();
                    return;
                }

                if (currentEditingParceiroId) {
                    const itemToUpdate = listaParceirosContainer.querySelector(`.parceiro-item[data-id="${currentEditingParceiroId}"]`);
                    if (itemToUpdate) {
                        itemToUpdate.dataset.nome = dadosParceiro.parceiroNome;
                        itemToUpdate.dataset.site = dadosParceiro.parceiroSite;
                        
                        itemToUpdate.querySelector('.parceiro-nome-display').textContent = dadosParceiro.parceiroNome;
                        const detailsDiv = itemToUpdate.querySelector('.parceiro-details');
                        if (detailsDiv) {
                            const siteLinkHTML = dadosParceiro.parceiroSite ? `<a href="${formatLink(dadosParceiro.parceiroSite)}" target="_blank" rel="noopener noreferrer">${dadosParceiro.parceiroSite}</a>` : 'N/A';
                            detailsDiv.innerHTML = `
                                <h6 class="font-weight-bold text-primary">${dadosParceiro.parceiroNome}</h6>
                                <p class="mb-0"><strong>Site:</strong> ${siteLinkHTML}</p>
                            `;
                        }
                        alert('Parceiro "' + dadosParceiro.parceiroNome + '" atualizado!');
                    }
                } else {
                    dadosParceiro.id = Date.now().toString();
                    const novoParceiroElement = createParceiroElement(dadosParceiro);
                    listaParceirosContainer.appendChild(novoParceiroElement);
                    alert('Parceiro "' + dadosParceiro.parceiroNome + '" salvo e adicionado à lista!');
                }
                resetParceiroFormToDefault();
                updateParceirosPlaceholderVisibility();
            });
        }

        if (listaParceirosContainer) {
            listaParceirosContainer.addEventListener('click', function(event) {
                const targetButton = event.target.closest('button');
                if (!targetButton) return;

                const parceiroItem = targetButton.closest('.parceiro-item');
                if (!parceiroItem) return;

                if (targetButton.classList.contains('btn-excluir-parceiro')) {
                    if (confirm('Tem certeza que deseja excluir este parceiro: ' + parceiroItem.dataset.nome + '?')) {
                        if(currentEditingParceiroId === parceiroItem.dataset.id) {
                            resetParceiroFormToDefault();
                        }
                        parceiroItem.remove();
                        updateParceirosPlaceholderVisibility();
                        alert('Parceiro excluído.');
                    }
                } else if (targetButton.classList.contains('btn-editar-parceiro')) {
                    formNovoParceiro.querySelector('#parceiroNome').value = parceiroItem.dataset.nome;
                    formNovoParceiro.querySelector('#parceiroSite').value = parceiroItem.dataset.site;
                    
                    currentEditingParceiroId = parceiroItem.dataset.id;
                    formParceiroTitle.textContent = 'Editar Parceiro';
                    formParceiroSubmitButton.textContent = 'Atualizar Parceiro';
                    formParceiroSubmitButton.classList.remove('btn-primary');
                    formParceiroSubmitButton.classList.add('btn-warning');
                    
                    formNovoParceiro.classList.remove('hidden');
                    formNovoParceiro.querySelector('#parceiroNome').focus();
                    formNovoParceiro.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else if (targetButton.classList.contains('btn-expandir-parceiro')) {
                    const detailsDiv = parceiroItem.querySelector('.parceiro-details');
                    if (detailsDiv) {
                        const isHidden = detailsDiv.classList.toggle('hidden');
                        targetButton.innerHTML = isHidden ? '<i class="fas fa-info-circle"></i> Detalhes' : '<i class="fas fa-chevron-up"></i> Ocultar';
                    }
                }
            });
        }
    }); 
})();