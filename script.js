$(function(){
	var modifier = "<"; //Modifier key used to mark the word as a keyword
	var user = "yourUsername"; //Username used to sign your PMs
	var textarea = $('textarea'); 

	var replaceSnippets = [];
	var insertSnippets = [];

	var forumRules = "http://fs-uk.com/forum/index.php?topic=120776.0";

	replaceSnippets["one"] = "Please do not make one word posts, we like to see more thoughts in your posts.\n\nRefer to the forum rules and guidelines : " + forumRules;
	replaceSnippets["one_p"] = "Hi,\n\nPlease do not make one word posts as it's against the forum rules.\n\nThank you for your comprehension.\n\nRegards,\n" + user;
	replaceSnippets["one_n"] = "FR given not to make one word posts.";

	replaceSnippets["req"] = "Please do not make mod requests as it's against the forum rules. " + forumRules;
	replaceSnippets["req_p"] = "Hi,\n\nPlease do not make mod requests as it's against the forum rules and not appreciated.\n\nThank you for your comprehension.\n\nRegards,\n" + user;
	replaceSnippets["req_n"] = "FR given not to make mod requests.";

	replaceSnippets["caps"] = "Please do not post all in caps as it's considered shouting and not appreciated.";
	replaceSnippets["caps_p"] = "Hi,\n\nPlease do not post all in caps as it's classed as shouting and is not appreciated.\n\nThank you for your comprehension.\n\nRegars,\n" + user;
	replaceSnippets["caps_n"] = "FR given not to post all in caps.";

	replaceSnippets["rel"]= "Please do not ask for release dates in WIP topics, the mod will be released when it's finished.\n\nRefer to the WIP rules and guidelines : http://fs-uk.com/forum/index.php?topic=98798.0";
	replaceSnippets["rel_p"] = "Hi,\n\nPlease do not ask for release dates in WIP topics. The modder will release the mod when it's finished.\n\nThank you for your comprehension.\n\nRegards,\n" + user;
	replaceSnippets["rel_n"] = "FR given not to ask for updates/release date in WIP topic.";

	insertSnippets["rules"] = forumRules;
	insertSnippets["wrules"]= "http://fs-uk.com/forum/index.php?topic=98798.0";
	insertSnippets["url"] = "[url=XXX]displayedText[/url]";
	insertSnippets["img"] = "[img]linkToImage[/img]";
	insertSnippets["code"] = "[code[i][/i]][[i][/i]/code]";

	insertSnippets["fmod13"] = "http://fs-uk.com/forum/index.php?topic=124265.0";
	insertSnippets["fmap13"] = "http://fs-uk.com/forum/index.php?topic=126665.0";
	insertSnippets["fmod"] = "http://fs-uk.com/forum/index.php?topic=165712.0";
	insertSnippets["fmap"] = "http://fs-uk.com/forum/index.php?topic=166163.0";


	//Event for keypress on the input zone
	textarea.on('keydown', function(){
		var content = $(this).val();

		//Is the last char the modifier?
		if(modifier == content.substr(content.length - 1, content.length))
		{
			//We get the complete last word
			var lastWord = content.split(" ").pop();
			lastWord = lastWord.split("\n").pop();

			//We remove the modifier, to check in the arrays (one instead of one<)
			var lastWordCleaned = lastWord.substr(0, lastWord.length - 1);			

			//We remove the white spaces and newlines
			var lastWordTrimmed = jQuery.trim(lastWordCleaned);

			console.log("lastWord (brut) :" + lastWord);
			console.log("lastWordCleaned : " + lastWordCleaned);
			console.log("lastWordTrimmed : " + lastWordTrimmed);

			//Is it in the replace array?
			if(replaceSnippets[lastWordTrimmed] != undefined)
			{
				//We replace the content of the entire textarea by the value of the snippet
				$(this).val(replaceSnippets[lastWordTrimmed]);
			}

			//... or maybe it's in the insert array?
			if(insertSnippets[lastWordTrimmed] != undefined)
			{	
				content = content.replace(jQuery.trim(lastWord), insertSnippets[lastWordTrimmed]);
				$(this).val(content);
			}
		}
	});	
});