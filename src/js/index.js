document.addEventListener("DOMContentLoaded", function () {
    // Selecione o botão de pesquisa pelo ID
    var searchButton = document.getElementById("searchButton");

    // Adicione um ouvinte de evento ao botão
    searchButton.addEventListener("click", realizarPesquisa);

    // Selecione o campo de pesquisa pelo ID
    var searchInput = document.getElementById("searchInput");

    // Adicione um ouvinte de evento para a tecla "Enter" no campo de pesquisa
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            realizarPesquisa();
        }
    });
});


// Aguarde o DOM ser totalmente carregado
document.addEventListener("DOMContentLoaded", function () {
    // Selecione o botão de pesquisa pelo ID
    var searchButton = document.getElementById("searchButton");

    // Adicione um ouvinte de evento ao botão
    searchButton.addEventListener("click", realizarPesquisa);
});

function realizarPesquisa() {
    // Obter o valor da barra de pesquisa
    var searchTerm = document.getElementById("searchInput").value;

    // Verificar se o termo de pesquisa foi fornecido
    if (searchTerm.trim() === "") {
        alert("Por favor, insira um termo de pesquisa válido.");
        return;
    }

    // Limpar os resultados anteriores
    document.getElementById("searchResults").innerHTML = "";

    // Construir a URL da API do PubMed
    var apiUrl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=10&term=" + encodeURIComponent(searchTerm);

    // Fazer a chamada AJAX para a API do PubMed
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => exibirResultados(data))
        .catch(error => console.error("Erro ao realizar pesquisa:", error));
}



function exibirResultados(data) {
    // Exibir os resultados na página
    var resultsContainer = document.getElementById("searchResults");

    // Verificar se há resultados
    if (data.esearchresult && data.esearchresult.idlist && data.esearchresult.idlist.length > 0) {
        resultsContainer.innerHTML = "<h2>Resultados da Pesquisa:</h2>";

        // Iterar sobre os IDs dos artigos encontrados
        data.esearchresult.idlist.forEach(articleId => {
            // Construir a URL do artigo
            var articleDetailsUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${articleId}&retmode=json`;

            // Fazer chamada AJAX para obter detalhes do artigo
            fetch(articleDetailsUrl)
                .then(response => response.json())
                .then(articleData => {
                    console.log("Detalhes do Artigo:", articleData);

                    // Verificar se há detalhes do artigo
                    if (articleData.result && articleData.result[articleId]) {
                        var article = articleData.result[articleId];
                        var abstract = article.abstract || "N/A";
                        var pmid = article.pmid || "N/A";

                        // Adicionar detalhes do artigo ao contêiner de resultados
                        var resultDiv = document.createElement("div");
                        resultDiv.innerHTML = `
                                <h3>${article.title}</h3>
                                <p><strong>Autores:</strong> ${article.authors.map(author => author.name).join(", ")}</p>
                                <p><strong>Resumo:</strong> ${abstract}</p>
                                <p><strong>PMID:</strong> ${pmid}</p>
                                <p><a href="https://pubmed.ncbi.nlm.nih.gov/${articleId}" target="_blank">Link para o artigo</a></p>
                        `;
                        resultsContainer.appendChild(resultDiv);
                    } else {
                        // Se não houver detalhes do artigo, exibir uma mensagem
                        resultsContainer.innerHTML += `
                            <div>
                                <h3>Detalhes do Artigo Indisponíveis</h3>
                            </div>
                        `;
                    }
                })
                .catch(error => console.error("Erro ao obter detalhes do artigo:", error));
        });
    } else {
        resultsContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    }
}



