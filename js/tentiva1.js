var data =$.ajax({
                beforeSend: function(xhrObj){
                        xhrObj.setRequestHeader("X-Parse-Application-Id","L7F9ql3DctcnCtoDwah0GGG8GFw8vuWJ6OWFJgNp");
                        xhrObj.setRequestHeader("X-Parse-REST-API-Key","TLtoYkorgdYipUyLayJnWEjZUuiuhWhTimVzJLg5");                
                },
                type:"GET",
                url:'https://api.parse.com/1/classes/Cervejas/?where={"teor":{"$gte":5,"$lte":7}}',
                processData:false,
                dataType:"json",
        })


$(document).ready(function() {
    var data = 0
    data.then(function(data) {
               for(var i = 0; i < data.results.length; i++){
                    var divs = document.createElement("div")

                    var p1 = document.createElement("h3")
                    var p2 = document.createElement("p")
                    var p3 = document.createElement("h5")
                    var p4 = document.createElement("h5")

                    p1.appendChild(document.createTextNode("Marca:"+data.results[i].nome));
                    p2.appendChild(document.createTextNode("Descrição:"+data.results[i].descr));
                    p3.appendChild(document.createTextNode("Teor:"+data.results[i].teor));
                    p4.appendChild(document.createTextNode("Preço:"+data.results[i].preco));

                    divs.appendChild(p1);
                    divs.appendChild(p2);
                    divs.appendChild(p3);
                    divs.appendChild(p4);
                                        
                    divs.className = "col3";

                    var element = document.getElementById("div1");

                    element.appendChild(divs);
                }    
        });

        });


