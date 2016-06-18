$(function(){
    var snippets = [];

    chrome.storage.local.get('snippets', function (result) {      
        if(typeof result.snippets === 'undefined'){
            return;
        }

        snippets = result.snippets;     
    });  

    $('textarea').on('keydown', function(event){
        if(event.keyCode == 9)
        {
            event.preventDefault();

            var caret = $(this).prop('selectionStart');
            var content = $(this).val();
           
            if(content.charAt(caret - 1) != " ")
            { 
                //Get the last word the user typed before the caret
                before =  content.substr(0, caret);
                var lastWord = before.split(/\s+/).pop();                         

                //Split the entire content in three sections
                var beforeReplace = content.substr(0, caret - lastWord.length);
                var afterReplace = content.substr(caret, content.length);            

                var snippet = null;

                for(var i = 0; i < snippets.length; i++){
                    if(snippets[i].trigger == lastWord){
                        snippet = snippets[i];
                    }
                }

                if(snippet != undefined && typeof snippet !== 'udnefined'){                    

                    var newContent = beforeReplace + snippet.code + afterReplace;
                    var placeCursorAt = 0;

                    if(newContent.indexOf('%') !== -1){
                        placeCursorAt = newContent.indexOf('%');
                        newContent = newContent.replace('%', '');
                    }                

                    $(this).val(newContent);     
                    
                    if(placeCursorAt > 0){
                        $(this).selectRange(placeCursorAt);   
                    }            
                }
            }           
        }
    });

    //FS-UK testing report visual helper    
    var select = $('.reportList select');   

    select.on('change', function(){
        switch($(this).val())
        {
            //Many problems
            case "0":
                $(this).css('color', 'red');
                break;
            //No problems
            case "1":
                $(this).css('color', 'green');
                break;
            //Some problems
            case "3":
                $(this).css('color', 'orange');
                break;
            default:
                $(this).css('color', '#000');
        }   
    });

    $.fn.selectRange = function(start, end) {
    if(end === undefined) {
        end = start;
    }
    return this.each(function() {
        if('selectionStart' in this) {
            this.selectionStart = start;
            this.selectionEnd = end;
        } else if(this.setSelectionRange) {
            this.setSelectionRange(start, end);
        } else if(this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};
});