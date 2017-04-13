var dataUrl = "data/menu.json",
    itensHtml = "item-snippet.html",
	menusDrop = "menu-snippet.html";
    
// função facilitadora para inserir HTML em um elemento
function insereHtml(seletor, html) {
  var elemento = document.querySelector(seletor);
  console.log(html);
  elemento.innerHTML = html;
}

// substitui propriedade {{propName}} dentro de um 
// 'template', e substitui por seu propValue
function inserePropriedade(template, propName, propValue) {
  // criar {{propName}}
  // trocar (replace), dentro de template, {{propName}} por propValue
  // retornar o template alterado
  var propriedade = "{{" + propName + "}}";
  // substitui todas as ocorrências de propriedade por propValue
  // em template
  template = template.replace(new RegExp(propriedade, "g"),
              propValue);
  return template;
}

// constroi a pagina, com os dados recebidos por parametro
function constroiPagina(dados) {
	var menuDrop = '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">';
	var htmlFinal = '<div class="container-fluid"> <div class="row">';
  // construimos os itens agora
  $ajaxUtils.sendGetRequest(itensHtml, function(itensHtml) {
    for (var i = 0, max = dados.length; i < max; i++) {
	  var menu = menusDrop,
		  tituloMenu = dados[i].titulo;
      var html = itensHtml,
          titulo = dados[i].titulo,
		  texto = dados[i].Conteudo;
          
	  menu = inserePropriedade(menu, "titulo", tituloMenu);
      html = inserePropriedade(html, "titulo", titulo);
      html = inserePropriedade(html, "texto", texto);
      
      htmlFinal += html;
    }
    htmlFinal += '</section>';
    insereHtml("#content", htmlFinal);
  }, false); // não é um JSON
}
// vamos construir o sendGetRequest:
// definir a URL (dataUrl)
// e o metodo constroiPagina
$ajaxUtils.sendGetRequest(dataUrl, constroiPagina);