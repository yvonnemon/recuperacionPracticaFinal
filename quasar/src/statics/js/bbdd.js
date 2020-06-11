export { preload,setup,classifyVideo,gotResult,estaRepetido,getItems,loadDatabase,insert};

export function preload() {
    console.log(window.location.href);

    video = createCapture(VIDEO, {
        video: {
            width: 280,
            height: 280,
            aspectRatio: 1
        }
    });
    classifier = ml5.imageClassifier('DoodleNet', video);
}

export function setup() {
    label = createDiv('Label: ...');
    confidence = createDiv('Confidence: ...');

    classifyVideo();
}

export function classifyVideo() {
    classifier.classify(gotResult);
}

export async function gotResult(error, results) {

    if (error) {
        console.error(error);
    }
    // The results are in an array ordered by confidence.

    let fiabilidad = nf(results[0].confidence, 0, 2);

    if (fiabilidad > 0.5) {
        nombre = results[0].label;

        const repetido = await estaRepetido(nombre);

        if (!repetido) {
            console.log("inserto");
            let app_id = "3cd7f551";
            let app_key = "b7505d564aa4b8aee146898fc94e1deb";

            let peticion = await fetch("https://api.edamam.com/api/food-database/parser?ingr=" + nombre +
                "&app_id=" + app_id + "&app_key=" + app_key, {
                    method: "GET"
                });
            let peticionJson = await peticion.json();
            let parseado = peticionJson.parsed;

            if (parseado.length < 1) {
                console.log("no es comida o no existe");
                calorias = 0;
            } else {
                let nutrientes = parseado[0].food.nutrients;
                calorias = nutrientes.ENERC_KCAL;

            }

            let tx = db.transaction(["comidas"], "readwrite");
            let store = tx.objectStore("comidas");

            store.put({
                name: nombre,
                kcal: 8
            });
            tx.oncomplete = function () {
                console.log("insertado");
                caloriasConsumidas = caloriasConsumidas + calorias;
                document.querySelector("#totalkcal").innerHTML = caloriasConsumidas;

            }
        }

    }
    label.html('Label: ' + results[0].label);
    confidence.html('Confidence: ' + nf(results[0].confidence, 0, 2)); // Round the confidence to 0.01
    // Call classifyVideo again
    classifyVideo();
}

export async function estaRepetido(nombre) {
    let repetido = false;

    const result = getItems().then(function (results) {
        results.forEach(c => {
            if (nombre == c.name) {
                repetido = true;
            }
        });
        return repetido;
    });

    return result;
}

export function getItems() {
    return new Promise(function (resolve, reject) {
        let tx = db.transaction(["comidas"], "readonly");
        let request = tx.objectStore('comidas').getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export function loadDatabase() {
    document.querySelector("#dbComidas").innerHTML = "";
    let comidas;
    getItems()
        .then(function (result) {
            return result
        })
        .then(function (result) {
            console.log(result)
            comidas = result;
            for (let i = 0; i < comidas.length; i++) {
                if(comidas[i].kcal > 0){
                    document.querySelector("#dbComidas").innerHTML += 
                    '<input class="dbfood" type="checkbox" id="'+comidas[i].name+'" name="'+comidas[i].name+'" value="'+
                    comidas[i].kcal+'"><label>'+comidas[i].name+'</label><br>';
                } else {
                   console.log("no es comida");
                   
                }
                
            }
        })
}
export async function insert(e) {
    
    e.preventDefault();
    const repetido = await estaRepetido(document.querySelector("#comida").value);
    if (!repetido) {
        console.log("adddddddd");

        let tx = db.transaction(["comidas"], "readwrite");
        let store = tx.objectStore("comidas");

        store.put({
            name: document.querySelector("#comida").value,
            kcal: document.querySelector("#calorias").value
        });

    } else {
        document.querySelector("#existe").innerHTML = "ya hay un alimento con ese nombre";
    }
}