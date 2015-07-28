$(function () {

	var dotnet_repo_class = 'repo-container element ArcGIS Runtime SDK .NET C# XAML DotNet';
	var ios_repo_class = 'repo-container element ArcGIS Runtime iOS Mobile Objective-C';
	var android_repo_class = 'repo-container element ArcGIS Runtime Android Mobile Java';
	var js_repo_class = 'repo-container element ArcGIS Web Mapping JavaScript';
	var python_repo_class = 'repo-container element ArcGIS GIS Python';
	var swift_repo_class = 'repo-container element ArcGIS Runtime iOS Mobile Swift';

	var dotnet_header_class = 'repo-header DotNet';
	var ios_header_class = 'repo-header Objective-C';
	var android_header_class = 'repo-header Java';
	var js_header_class = 'repo-header JavaScript';
	var python_header_class = 'repo-header Python';
	var swift_header_class = 'repo-header Swift';

	var dotnet_h3_class = 'repo-language DotNet';
	var ios_h3_class = 'repo-language Objective-C';
	var android_h3_class = 'repo-language Java';
	var js_h3_class = 'repo-language JavaScript';
	var python_h3_class = 'repo-language Python';
	var swift_h3_class = 'repo-language Swift';

	var language;

	var container_div = $('<div/>').addClass('container smaller');
	var content_div = $('<div/>').attr("id", 'content');

	var data_filter = [];

	var urlParams;
	function get_url_vars() {
	  var vars = new Object, params;
	  var temp_params = window.location.search.substring(1).split('&');
	  for(var i = 0; i <temp_params.length; i++) {
	    params = temp_params[i].split('=');
	    vars[params[0]] = params[1];
	  }
		console.log(vars);
	  return vars;
	}
	urlParams = get_url_vars();
	console.log(urlParams["esrij"]);

	// リポジトリの取得
    $.get('https://api.github.com/users/EsriJapan/repos').then(function (repos) {
    	console.log(repos);

    	// ループ（リポジトリ配列）
        for (var i = 0; i < repos.length; i++) {
        	// リポジトリ名⇒フィルタリング用のクラスを作成⇒配列
        	var repo_name = repos[i].name;
        	var name_split = repo_name.split("-")

        	// esrijapan.github.io は非表示
        	if(repo_name !== "esrijapan.github.io") {

	        	for (var j = 0; j < name_split.length; j++) {
	        		// 同名のタグ候補がある場合（あるいはesrijapan.github.io）は無視
	        		var sametag = false;
	        		for(var k = 0;  k < data_filter.length; k++) {
	        			if(data_filter[k] === name_split[j]) {
	        				sametag = true;
	        			}
	        		}
	        		// 同名のタグ候補が無い場合
	        		if(sametag === false) {
	        			// フィルタリング用クラス配列にプッシュ
	        			data_filter.push(name_split[j]);
	        		}
	        	}

	        	// リポジトリの言語
	        	if(repos[i].language == 'C#' || repos[i].language == 'Objective-C' || repos[i].language == 'Java' || repos[i].language == 'JavaScript' || repos[i].language == 'HTML' || repos[i].language == 'Python' || repos[i].language == 'Swift') {
	        		console.log(repos[i]);
	        		var repo_class;
		        	var header_class;
		        	var h3_class;
		        	// フィルタリング用の追加クラスを作成
		        	var add_class = repos[i].name.replace(/-/g, " ");
		        	// リポジトリの言語で分岐
		        	switch (repos[i].language){
					  case 'C#':
					    repo_class = dotnet_repo_class;
					    header_class = dotnet_header_class;
					    h3_class = dotnet_h3_class;
					    language = '.NET';
					    break;
					  case 'Objective-C':
					    repo_class = ios_repo_class;
					    header_class = ios_header_class;
					    h3_class = ios_h3_class;
					    language = 'Objective-C';
					    break;
					  case 'Java':
					    repo_class = android_repo_class;
					    header_class = android_header_class;
					    h3_class = android_h3_class;
					    language = 'Java';
					    break;
					  case 'JavaScript':
					    repo_class = js_repo_class;
					    header_class = js_header_class;
					    h3_class = js_h3_class;
					    language = 'JavaScript';
					    break;
					  case 'HTML':
					    repo_class = js_repo_class;
					    header_class = js_header_class;
					    h3_class = js_h3_class;
					    language = 'JavaScript';
					    break;
					  case 'Python':
					    repo_class = python_repo_class;
					    header_class = python_header_class;
					    h3_class = python_h3_class;
					    language = 'Python';
					    break;
					  case 'Swift':
					    repo_class = swift_repo_class;
					    header_class = swift_header_class;
					    h3_class = swift_h3_class;
					    language = 'Swift';
					    break;
					}
					// フィルタリング用のクラスを追加
					repo_class = repo_class + " " + add_class;

			        // タグの生成
			        var repo_container_div = $('<div/>').addClass(repo_class);
			        var repo_div = $('<div/>').addClass('repo');
			        var repo_header_div = $('<div/>').addClass(header_class);
			        var repo_title_h2 = $('<h2/>').addClass('repo-title');
			        var repo_link_a = $('<a/>').attr("href", repos[i].html_url).text(repos[i].name);
			        var repo_language_h3 = $('<h3/>').addClass(h3_class).text(language);
			        var repo_description = $('<p/>').addClass('repo-description').text(repos[i].description);

							if(urlParams["esrij"] === "yes") {
								// スターとFork数
								var repo_fork = $('<span/>').addClass('icon-fork').text(" " + repos[i].forks_count + " ");
								var repo_star = $('<span/>').addClass('icon-star').text(" " + repos[i].stargazers_count + " ");
								var repo_stats = $('<p/>').addClass('stats');
								repo_stats.append(repo_fork);
								repo_stats.append(repo_star);
							}

				        repo_title_h2.append(repo_link_a);
				        repo_header_div.append(repo_title_h2);
				        repo_header_div.append(repo_language_h3);
				        repo_div.append(repo_header_div);
				        repo_div.append(repo_description);

							if(urlParams["esrij"] === "yes") {
				        // スターとFork数
				        repo_div.append(repo_stats);
							}

							repo_container_div.append(repo_div);

				        content_div.append(repo_container_div);
				        //console.log($('div#content.isotope'));

	        	}

	        }
        };

        // タグの登録（リポジトリ カード）
        container_div.append(content_div);
        $('div#page').append(container_div);

        // フィルタリング用クラス配列からタグの生成（データフィルタリング）
        console.log(data_filter);
    	for (var ii = 0; ii < data_filter.length; ii++) {
    		var df_option = $('<option/>').attr("data-filter", data_filter[ii]).text(data_filter[ii]);
    		console.log($('optgroup[label=タグ]'));
    		$('optgroup[label=タグ]').append(df_option);
    	}

        // github.js
        $(".chzn-select").chosen();var e=$("#content");e.isotope({itemSelector:".element",layoutMode:"masonry"}),$(".repo-language").click(function(){var e=this.innerHTML.replace(/ /g,"");return $("select").val(e).trigger("liszt:updated").change(),window.location.hash=e,!1}),$("select").change(function(){var t=[],n=[];t=$("select option:selected"),t.each(function(){$(this).data("filter");n.push("."+$(this).data("filter"))});var i=n.join("");return e.isotope({filter:i}),window.location.hash=n.join(",").replace(/\./g,""),!1}),$(window).smartresize(function(){e.isotope("reLayout")}),$(document).ready(function(){var e=window.location.hash;null!==e&&""!=e&&($("select").val(e.replace(/#/,"").split(",")),$("select").trigger("liszt:updated").change())}),$(document).ready(function(){function e(e){window.clearInterval(n),e&&(n=setInterval(t,o))}function t(){$("select").val(c[a]),$("select").trigger("liszt:updated").change(),a<c.length-1?a++:a=0}var n,i=!1,o=3e3,a=0,c=["JavaScript","ActionScript","Objective-C","Java","Python","DotNet","iOS","C-Sharp","Android","QuickStart","Local-Government","Bootstrap","Mapping","GeoJSON","Mobile","Code-Challenge","Utility","Storytelling","Geocoding","ArcGIS","Hadoop","Web","Social","Analysis","Offline","Runtime","Dashboard","Public",""];$("#home-banner").dblclick(function(){i=!i,e(i)}),$(document).keydown(function(t){38===t.which&&t.shiftKey&&i?o>1e3&&(o-=1e3):40===t.which&&t.shiftKey&&i&&5e3>o&&(o+=1e3),i&&e(i)})})

    });

});
