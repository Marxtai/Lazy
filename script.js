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
    snippets["one"] = "Please do not make one word posts as it's against the forum rules. We like to see more thoughts in your posts.\n\nRefer to the forum rules and guidelines : http://fs-uk.com/forum/index.php?topic=120776.0";

    $('textarea').on('keydown', function(event){
        if(event.keyCode == 9)
        {
            event.preventDefault();

            var content = $(this).val();
            var lastWord = content.split(/\s+/).pop();                  

            //Is it a snippet?
            if(snippets[lastWord] != undefined)
            {
                newString = content.substring(0, content.lastIndexOf(lastWord)) + snippets[lastWord];
                $(this).val(newString);
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