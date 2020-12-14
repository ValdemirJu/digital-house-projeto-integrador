const apiKey = "AIzaSyAS9jUgMZt6tH5tou2dqmPG55ZmCL7zlaQ";
const searchEngineId = "e4d45dc475a45a226";
let type = '';
let brand = '';
let brandText = '';
let model = '';
let modelText = '';
let year = '';
let yearText = '';
let result = '';


let marca = document.getElementById('marca');
let modelo = document.getElementById('modelo');
let ano = document.getElementById('ano');
let combustivel = document.getElementById('combustivel');

let valor = document.getElementById('value-result');
let btnConsultar = document.getElementById('button-consultar');
let divResult = document.getElementById('div-result');
let btnNovaConsulta = document.getElementById('btn-nova-consulta');
let gif = document.getElementById('gif');

//Elementos para os seletores irem aparecendo aos poucos:
let divBrand = document.getElementById("div-brand");
let divModel = document.getElementById("div-model");
let divYear = document.getElementById("div-year");

const typeSelector = document.getElementById('type');
const brandSelector = document.getElementById('brand');
const modelSelector = document.getElementById('model');
const yearSelector = document.getElementById('year');

function elementVisibility(element, param){
	if(param){
		element.style.visibility = "visible";
	}else{
		element.style.visibility = "hidden";
	}
}

function resetInfos() {

	marca.innerHTML = '<b>Marca: </b>';
	modelo.innerHTML = '<b>Modelo: </b>';
	ano.innerHTML = '<b>Ano: </b>';
	combustivel.innerHTML = '<b>Combustível: </b>';
	valor.innerHTML = '<b>Valor: </b>';
}

typeSelector.addEventListener('change', Event => {
	brandSelector.innerHTML = '<option value="*">Selecionar</option>';
	modelSelector.innerHTML = '<option value="*">Selecionar</option>';
	yearSelector.innerHTML = '<option value="*">Selecionar</option>';
	changeValue(true);
	updateImage(true);
	changeType();
	resetInfos();
	elementVisibility(gif, true);
});

brandSelector.addEventListener('change', Event => {
	modelSelector.innerHTML = '<option value="*">Selecionar</option>';
	yearSelector.innerHTML = '<option value="*">Selecionar</option>';
	changeValue(true);
	updateImage(true);	
	changeBrand();
	resetInfos();
	elementVisibility(gif, true);
});

modelSelector.addEventListener('change', Event => {
	yearSelector.innerHTML = '<option value="*">Selecionar</option>';
	changeValue(true);
	updateImage(true);	
	changeModel();

	resetInfos();
	elementVisibility(gif, true);
});

yearSelector.addEventListener('change', Event => {
	changeYear();
	elementVisibility(btnConsultar, true);

});

btnConsultar.addEventListener('click', Event => {
	updateImage();
	changeValue();

	divResult.style.visibility = 'visible';
});

btnNovaConsulta.addEventListener('click', Event => {
	location.reload();
});

function changeType() {
	let option = typeSelector.options[typeSelector.selectedIndex];
	type = option.value;
	updateBrands(type)
}

function updateBrands(type) {
	if (type !== '*') {
		fetch(`https://parallelum.com.br/fipe/api/v1/${type}/marcas`)
			.then(response => response.json())
			.then(response => {
				for (brand of response) {
					brandSelector.innerHTML += `<option value="${brand.codigo}">${brand.nome}</option>`;
				}
				elementVisibility(gif, false);
				elementVisibility(divBrand, true);
			})
	}
}

function changeBrand() {
	let option = brandSelector.options[brandSelector.selectedIndex];
	brand = option.value;
	brandText = option.text;
	updateModels(brand)
}

function updateModels(brand) {
	if (brand !== '*') {
		fetch(`https://parallelum.com.br/fipe/api/v1/${type}/marcas/${brand}/modelos`)
			.then(response => response.json())
			.then(({ modelos }) => {
				for (model of modelos) {
					modelSelector.innerHTML += `<option value="${model.codigo}">${model.nome}</option>`;
				}
				elementVisibility(gif, false);
				elementVisibility(divModel, true);
			})
	}
}

function changeModel() {
	let option = modelSelector.options[modelSelector.selectedIndex];
	model = option.value;
	modelText = option.text;
	updateYear(model)
}

function changeYear() {
	let option = yearSelector.options[yearSelector.selectedIndex];
	year = option.value;
	yearText = option.text;
}

function changeValue(setDefault = false) {

	if (setDefault) {

		marca.innerHTML = '';
		modelo.innerHTML = '';
		ano.innerHTML = '';
		combustivel.innerHTML = '';
		valor.innerText = '';
		return
	}

	if (year != '*') {
		console.log(year.codigo);

		console.log('URL Value:', `https://parallelum.com.br/fipe/api/v1/${type}/marcas/${brand}/modelos/${model}/anos/${year.codigo}`);

		fetch(`https://parallelum.com.br/fipe/api/v1/${type}/marcas/${brand}/modelos/${model}/anos/${year}`)
		.then(function (response) {
			return response.json();
		}).then(function (obj) {
			if (obj.Valor != '' || obj.Valor != null) {
				marca.innerHTML = `<b>Marca: <b><span>${obj.Marca}</span>`;
				modelo.innerHTML = `<b>Modelo: <b><span>${obj.Modelo}</span>`;
				ano.innerHTML = `<b>Ano: <b><span>${obj.AnoModelo}</span>`;
				combustivel.innerHTML = `<b>Combustível: <b><span>${obj.Combustivel}</span>`;
				valor.innerHTML = `<b>Valor: <b><span>${obj.Valor}</span>`;
			}
		})	
	}
}
 
function updateYear(model) {
	if (model !== '*') {
		fetch(`https://parallelum.com.br/fipe/api/v1/${type}/marcas/${brand}/modelos/${model}/anos`)
			.then(response => response.json())
			.then(response => {
				for (year of response) {
					yearSelector.innerHTML += `<option value="${year.codigo}">${year.nome}</option>`;
				}
				elementVisibility(gif, false);
				elementVisibility(divYear, true);
			})
	}
}

function updateImage(setDefault = false) {
	let urlImage = ''
	let url = `https://customsearch.googleapis.com/customsearch/v1?cx=${searchEngineId}&num=1&q=${type}%20${brandText}%20${modelText}%20${yearText}&searchType=image&key=${apiKey}`
	let urlLogo = `https://customsearch.googleapis.com/customsearch/v1?cx=${searchEngineId}&num=1&q=${type}%20logomarca%20${brandText}&searchType=image&key=${apiKey}`

	
	if (type !== '*' && marca !== '*') {

		if (model == '' || model == null || model == '*') {
			url = urlLogo // Irá buscar apenas a logo da marca
		}

		console.log('URL:', url);

		fetch(url).then(function (response) {
			return response.json();
		}).then(function (obj) {

				divResult.style.backgroundImage = "url('" + obj.items[0].link + "')";
				divResult.style.backgroundRepeat = "no-repeat";
				divResult.style.backgroundPosition = "center";	
			
		
		})
	}

}