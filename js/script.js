
		var cerveja = [{"nome":"Heineken", 
			    "descricao":"A Heineken é uma das mais famosas cervejas vendidas no mundo. Aqui no Brasil, a Heineken é produzida e distribuida pela Cervejaria Heineken, exceto o keg e a lata, que são importados da Holanda",
			    "teor":"5%",
				"preco":"R$1,99"
				}, 
			    {"nome":"Guinness", 
			    "descricao":"A Guinness Draught é uma Cerveja de alta fermentação, feita com malte torrado, que lhe confere sua cor marcante e escura e um paladar tostado.",
			    "teor":"4,1",
				"preco":"R$1,99"
				},
			    {"nome":"Stella Artois", 
			    "descricao":"Com um aroma típico do lúpulos selecionados e uma nota frutada, Stella Artois tem amargor acentuado, porém macio. Seu sabor marcante e sofisticado é muito bem balanceado.",
			    "teor":"5%",
				"preco":"R$1,99"
				},
				{"nome":"Baden Baden",
				"descricao":"É mais encorpada e alcoólica. Baden Baden Bitter 1999 possui cor avermelhada, aroma intenso e genuíno de lúpulos florais e condimentados, com um elegante e elevado amargor.",
				"teor":"5,2%",
				"preco":"R$1,99"
				},
				{"nome":"Bear Beer", 
			    "descricao":"Em geral, as cervejas Premium contêm maior teor de malte de cevada, isto é, usam menos adjuntos. Seu aroma revela a maior presença do malte, o que a torna mais dourada e levemente doce. Para contrabalançar, é utilizado mais lúpulo, o que aumenta o seu amargor.",
			    "teor":"5%",
				"preco":"R$1,99"
				}, 
			    {"nome":"Murphy", 
			    "descricao":"Como uma legítima cerveja irlandesa, a Murphy’s Irish Stout tem sabor marcante e apresenta o tradicional istema Draughtflow, que cria uma espuma incrivelmente cremosa que é marca registrada deste tipo de bebida.",
			    "teor":"4%",
				"preco":"R$1,99"
				},
			    {"nome":"Corona", 
			    "descricao":"A Cerveza Corona é refrescante, transparente, com espuma clara, mas pouco persistente e aroma discreto.",
			    "teor":"4,6%",
				"preco":"R$1,99"
				},
				{"nome":"8.6",
				"descricao":"Caracterizada por uma excepcional longa fermentação, que permite o completo desenvolvimento de seu sabor.",
				"teor":"7,9%",
				"preco":"R$1,99"
				},
				{"nome":"Paulaner", 
			    "descricao":"Esta Cerveja é um deleite para todos os sentidos: com seu refinado aroma lúpulo e seu sabor natural e equilibrado, ocupa um dos primeiros lugares na escala de popularidade.",
			    "teor":"4,9%",
				"preco":"R$1,99"
				}]

		for(var i = 0; i < cerveja.length; i++){
			var divs = document.createElement("div")

			var p1 = document.createElement("h3")
			var p2 = document.createElement("p")
			var p3 = document.createElement("h5")
			var p4 = document.createElement("h5")

			p1.appendChild(document.createTextNode("Marca:"+cerveja[i].nome));
			p2.appendChild(document.createTextNode("Descrição:"+cerveja[i].descricao));
			p3.appendChild(document.createTextNode("Teor:"+cerveja[i].teor));
			p4.appendChild(document.createTextNode("Preço:"+cerveja[i].preco));

			divs.appendChild(p1);
			divs.appendChild(p2);
			divs.appendChild(p3);
			divs.appendChild(p4);
								
			divs.className = "col3";

			var element = document.getElementById("div1");

			element.appendChild(divs);
		}