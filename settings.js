var snippets = [];

$(function(){
	getSnippetsFromStorage();

	$('form').on('submit', addSnippet);	
	$(document).on('click', 'td button', removeSnippet);
});

function removeSnippet(e){
	e.preventDefault();

	var row = $(this).parents('tr');
	var trigger = row.find('td:first-child').text();

	for(var i = 0; i < snippets.length; i++){	
		var snippet = snippets[i];

		if(snippet.trigger == trigger){
			snippets.splice(i, 1);
		}		
	}

	saveSnippets();
	row.remove();
	showSnippets();
}

function addSnippet(e){
	e.preventDefault();

	var trigger = $(this).find('#trigger').val();
	var code = $(this).find('#code').val();

	if(!trigger.length || !code.length){
		return;
	}

	var snippet = {
		trigger: trigger,
		code: code
	}

	$('#trigger').val('');
	$('#code').val('');

	snippets.push(snippet);
	showSnippets();
	saveSnippets();
}

function saveSnippets()
{
	chrome.storage.local.set({
		snippets: snippets
	});
}

function showSnippets()
{
	var rows = [];

	if(!snippets.length){
		$('table tbody').empty().append('<tr><td colspan="3">There are no snippets.</td></tr>')
		return;
	}

	for(var i = 0; i < snippets.length; i++){
		var snippet = snippets[i];
		var row = '<tr><td>' + snippet.trigger + '</td><td>' + snippet.code + '</td><td><button class="btn btn-sm btn-danger">Remove</button></td></tr>';
		rows.push(row);
	}

	$('table tbody').empty().append(rows);
}

function getSnippetsFromStorage(){
	chrome.storage.local.get('snippets', function (result) {      
      	if(typeof result.snippets === 'undefined'){
      		return;
      	}

      	snippets = result.snippets;
      	showSnippets();
    });
}