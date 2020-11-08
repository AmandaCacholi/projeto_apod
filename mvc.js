    class ApodModel{

        constructor() {
            
            this._date = data.value;
            this._image = "";
            this._title = "";
            this._explanation = "";
        }

        buscaApod(){

            let request = new XMLHttpRequest();
            
            request.addEventListener( "load", () => {
                if ( request.status == 200 ) {
                    let dados = this._processaResponse( request.responseText );
                    this._atualiza( dados );
                }
            })

            request.open( "GET", "https://api.nasa.gov/planetary/apod?api_key=ZAgNEgxHykYvpbCizcHZXAQSK1IHY55x0LInle0d&date=" + this._date, false );
            request.send();
        }

        _processaResponse( responseString ){

            let response = JSON.parse( responseString );
            return response;
        }

        _atualiza( dados ){

            this._date = dados.date;
            this._image = dados.url;
            this._title = dados.title;
            this._explanation = dados.explanation;
        }

        getDate(){
            return this._date
        }
        getImage(){
            return this._image;
        }
        getTitle(){
            return this._title;
        }
        getExplanation(){
            return this._explanation;
        }
    }

    class ApodView{
        constructor() {}

        render( modelo ){

            let dataJs = document.querySelector(".data-js");
            let tituloJs = document.querySelector(".titulo-js");
            let explanationJs = document.querySelector(".explanation-js");

            dataJs.innerHTML = modelo.getDate();
            imgjs.innerHTML = `<img src=${ modelo.getImage() }>`;
            tituloJs.innerHTML = modelo.getTitle();
            explanationJs.innerHTML = modelo.getExplanation();
            
            // Colocamos foto e nome
            //informacoes.innerHTML = `
                //<p>${modelo.getDate()}<p>
                //<img src=${ modelo.getImage() }>
                //<p><strong> ${modelo.getTitle()} <br>
                //Image Credit & Copyright: ${modelo.getCopyright()}</strong></p>
                //<p>${modelo.getExplanation()}</p>
            //`
        }
    }

    class ApodController{
        constructor() {}

        adicionaApod(){
            let addApod = new ApodModel();
            addApod.buscaApod();

            let view = new ApodView();
            view.render( addApod );

            let removeBotao = busca.remove();
            let removeForm = data.remove();

        }
    }
    
    let controller = new ApodController();
    
    document.getElementById( "busca" ).addEventListener( "click", controller.adicionaApod );
    