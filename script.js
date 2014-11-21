$(function(){
    var snippets = [];

    //Links to topics
    snippets["rules"] = "http://fs-uk.com/forum/index.php?topic=120776.0";
    snippets["wrules"] = "http://fs-uk.com/forum/index.php?topic=98798.0";
    snippets["fmod"] = "http://fs-uk.com/forum/index.php?topic=165712.0";
    snippets["fmap"] = "http://fs-uk.com/forum/index.php?topic=166163.0";
    snippets["fmod13"] = "http://fs-uk.com/forum/index.php?topic=124265.0";
    snippets["fmap13"] = "http://fs-uk.com/forum/index.php?topic=126665.0";

    //BBCode shortcuts
    snippets["img"] = "[img]linkToImage[/img]";
    snippets["url"] = "[url=link]displayedText[/url]";
    snippets["code"] = "[code[i][/i]][[i][/i]/code]";
    snippets["b"] = "[b]someText[/b]";
    snippets["i"] = "[i]someText[/i]";
    snippets["u"] = "[u]someText[/u]";

    //Other stuff
    snippets["one"] = "Please do not make one word posts as it's against the forum rules. We like to see more thoughts in your posts.";
    snippets["caps"] = "Please do not post all in caps as it's considered shouting and not appreciated.";
    snippets["req"] = "Please do not make mod requests as it's against the forum rules.";
    snippets["wip"] = "Please do ask for release date or updates in WIP topics, as it's against the WIP rules.";

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

                //Replace everything
                if(snippets[lastWord] != undefined)
                {
                    var newContent = beforeReplace + snippets[lastWord] + afterReplace;
                    $(this).val(newContent);
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
});