$(function(){$(".chzn-select").chosen();var e=$("#content");console.log("e: ", e);e.isotope({itemSelector:".element",layoutMode:"masonry"}),$(".repo-language").click(function(){var e=this.innerHTML.replace(/ /g,"");return $("select").val(e).trigger("liszt:updated").change(),window.location.hash=e,!1}),$("select").change(function(){var t=[],n=[];t=$("select option:selected"),t.each(function(){$(this).data("filter");n.push("."+$(this).data("filter"))});var i=n.join("");return e.isotope({filter:i}),window.location.hash=n.join(",").replace(/\./g,""),!1}),$(window).smartresize(function(){e.isotope("reLayout")}),$(document).ready(function(){var e=window.location.hash;null!==e&&""!=e&&($("select").val(e.replace(/#/,"").split(",")),$("select").trigger("liszt:updated").change())}),$(document).ready(function(){function e(e){window.clearInterval(n),e&&(n=setInterval(t,o))}function t(){$("select").val(c[a]),$("select").trigger("liszt:updated").change(),a<c.length-1?a++:a=0}var n,i=!1,o=3e3,a=0,c=["JavaScript","ActionScript","Objective-C","Java","Python","DotNet","iOS","C-Sharp","Android","QuickStart","Local-Government","Bootstrap","Mapping","GeoJSON","Mobile","Code-Challenge","Utility","Storytelling","Geocoding","ArcGIS","Hadoop","Web","Social","Analysis","Offline","Runtime","Dashboard","Public",""];$("#home-banner").dblclick(function(){i=!i,e(i)}),$(document).keydown(function(t){38===t.which&&t.shiftKey&&i?o>1e3&&(o-=1e3):40===t.which&&t.shiftKey&&i&&5e3>o&&(o+=1e3),i&&e(i)})})});