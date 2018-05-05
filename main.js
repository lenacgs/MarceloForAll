"use strict";
(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
	game.start();	
}

var game = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        showPage("menu");
    }
}

function showPage(pageName) {

	var frm = document.getElementByTagName("iframe")[0];
	frm.src = pageName + ".html";

	if(pageNum == totPages) //se última, esconder botão de navegação
	{
		var btn = document.getElementsByTagName("button")[0];
		btn.style.visibility = "hidden";
		btn.removeEventListener("click", btnNextPageHandler);  //remover clicks no botão de navegação
	}

	if(pageNum==1){
		window.addEventListener("message", messageHandler);

		setTimeout(sendMessage,1000,frm);
	}

}