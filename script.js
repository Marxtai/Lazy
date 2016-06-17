$(function(){
    var snippets = [];  

    //Links to topics
    snippets["rules"] = "http://fs-uk.com/forum/index.php?topic=120776.0";
    snippets["wrules"] = "http://fs-uk.com/forum/index.php?topic=98798.0";
    snippets["fmod"] = "http://fs-uk.com/forum/index.php?topic=165712.0";
    snippets["fmap"] = "http://fs-uk.com/forum/index.php?topic=166163.0";
    snippets["fmod13"] = "http://fs-uk.com/forum/index.php?topic=124265.0";
    snippets["fmap13"] = "http://fs-uk.com/forum/index.php?topic=126665.0";
    snippets["fmod15"] = "http://fs-uk.com/forum/index.php?topic=165712.0";
    snippets["fmap15"] = "http://fs-uk.com/forum/index.php?topic=166163.0";

    //BBCode shortcuts
    snippets["img"] = "[img]%[/img]";
    snippets["url"] = "[url=link]%[/url]";
    snippets["code"] = "[code[i][/i]][[i][/i]/code]";
    snippets["b"] = "[b]%[/b]";
    snippets["i"] = "[i]%[/i]";
    snippets["u"] = "[u]%[/u]";
    snippets["f"] = "[font=Courier New]%[/font]";

    $('textarea').on('keydown', function(event){
        if(event.keyCode == 9)
        {
            event.preventDefault();

            var caret = $(this).prop('selectionStart');
            var content = $(this).val();

            //Make sure that the last char before the charet is NOT a whitespace
            if(content.charAt(caret - 1) != " ")
            { 
                //Get the last word the user typed before the caret
                before =  content.substr(0, caret);
                var lastWord = before.split(/\s+/).pop();

                //Get the length of that lastword for later substr
                var length = lastWord.length;             

                //Split the entire content in three sections
                var beforeReplace = content.substr(0, caret - length);
                var afterReplace = content.substr(caret, content.length);

                var snippet = snippets[lastWord];

                if(snippet != undefined && typeof snippet !== 'udnefined'){                    

                    var newContent = beforeReplace + snippet + afterReplace;
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