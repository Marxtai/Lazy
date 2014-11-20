$(function(){

			var insertSnippets = [];

			insertSnippets["rules"] = "http://fs-uk.com/forum/index.php?topic=120776.0";
			insertSnippets["url"] = "[url=XXX]displayedText[/url]";
			insertSnippets["img"] = "[img]linkToImage[/img]";
			insertSnippets["code"] = "[code[i][/i]][[i][/i]/code]";

			$('#post').on('keydown', function(e){
				if(e.keyCode == 9)
				{
					e.preventDefault();

					//We get the last word of the content
					var lastWord = $(this).val().split(" ").pop();
					lastWord = lastWord.split("\n").pop();				
					
					//We check to see if it's in the array
					if(insertSnippets[lastWord] != undefined)
					{
						var content = $(this).val();
						content = content.replace(jQuery.trim(lastWord), insertSnippets[lastWord]);
						$(this).val(content);
					}
				}
			});

			//FS-UK Test Report visual helper

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
