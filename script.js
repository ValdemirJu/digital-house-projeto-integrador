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


let infoBrand = document.getElementById('infoBrand');
let infoModel = document.getElementById('infoModel');
let infoYear = document.getElementById('infoYear');
let infoFuel = document.getElementById('infoFuel');
let infoValue = document.getElementById('infoValue');

const typeSelector = document.getElementById('type');
const brandSelector = document.getElementById('brand');
const modelSelector = document.getElementById('model');
const yearSelector = document.getElementById('year');
const divImageSelector = document.getElementById('image-result')
const pValue = document.getElementById('value-result')

function resetInfos() {
	infoBrand.innerHTML = '<strong>Marca:</strong>';
	infoModel.innerHTML = '<strong>Modelo:</strong>';
	infoYear.innerHTML = '<strong>Ano:</strong>';
	infoFuel.innerHTML = '<strong>Combustível:</strong>';
	infoValue.innerHTML = '<strong>Valor:</strong>';
}

typeSelector.addEventListener('change', Event => {
	brandSelector.innerHTML = '<option value="*">Selecionar</option>';
	modelSelector.innerHTML = '<option value="*">Selecionar</option>';
	yearSelector.innerHTML = '<option value="*">Selecionar</option>';
	changeValue(true);
	updateImage(true);
	changeType();
	resetInfos();
});

brandSelector.addEventListener('change', Event => {
	modelSelector.innerHTML = '<option value="*">Selecionar</option>';
	yearSelector.innerHTML = '<option value="*">Selecionar</option>';
	changeValue(true);
	updateImage(true);	
	changeBrand();
	resetInfos();
});

modelSelector.addEventListener('change', Event => {
	yearSelector.innerHTML = '<option value="*">Selecionar</option>';
	changeValue(true);
	updateImage(true);	
	changeModel();
	resetInfos();
});

yearSelector.addEventListener('change', Event => {
	changeYear();
	resetInfos();
});

yearSelector.addEventListener('change', Event => {
	updateImage();
	changeValue();
})

function changeType() {
	let option = typeSelector.options[typeSelector.selectedIndex];
  
	type = option.value;
	updateBrands(type)
}

function updateBrands(type) {
	if (type !== '*') {
		fetch(`https://parallelum.com.br/fipe/api/v1/${apiType}/marcas`)
			.then(response => response.json())
			.then(response => {
				for (let brand of response) {
					brandSelector.innerHTML += `<option value="${brand.codigo}">${brand.nome}</option>`;
				}
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
		fetch(`https://parallelum.com.br/fipe/api/v1/${apiType}/marcas/${apiBrand}/modelos`)
			.then(response => response.json())
			.then(({ modelos }) => {
				for (let model of modelos) {
					modelSelector.innerHTML += `<option value="${model.codigo}">${model.nome}</option>`;
				}
			})
	}
}

function changeModel() {
	let option = modelSelector.options[modelSelector.selectedIndex];
  
	model = option.value;
	modelText = option.text;
	updateYear(model)
}

function changeValue(setDefault = false) {

	if (setDefault) {
		pValue.innerText = '';
	}

	if (year != '*') {

		console.log('URL Value:', `https://parallelum.com.br/fipe/api/v1/${type}/marcas/${brand}/modelos/${model}/anos/${year.codigo}`);

		fetch(`https://parallelum.com.br/fipe/api/v1/${type}/marcas/${brand}/modelos/${model}/anos/${year.codigo}`)
		.then(function (response) {
			return response.json();
		}).then(function (obj) {
			if (obj.Valor != '' || obj.Valor != null) {
				pValue.innerHTML = `<strong>${obj.Valor}</strong>`;
			}
		})	
	}
}
 
function updateYear(model) {
	if (model !== '*') {
		fetch(`https://parallelum.com.br/fipe/api/v1/${apiType}/marcas/${apiBrand}/modelos/${apiModel}/anos`)
			.then(response => response.json())
			.then(response => {
				for (let year of response) {
					yearSelector.innerHTML += `<option value="${year.codigo}">${year.nome}</option>`;
				}
			})
	}
}

function updateImage(setDefault = false) {
	let urlImage = ''
	let url = `https://customsearch.googleapis.com/customsearch/v1?cx=${searchEngineId}&num=1&q=${type}%20${brandText}%20${modelText}%20${yearText}&searchType=image&key=${apiKey}`
	let urlLogo = `https://customsearch.googleapis.com/customsearch/v1?cx=${searchEngineId}&num=1&q=${type}%20logomarca%20${brandText}&searchType=image&key=${apiKey}`

	if (setDefault) {
		divImageSelector.innerHTML = '<img src="https://www.quoteinspector.com/media/car-insurance/car-wallet-md.jpg" alt="Carro">'
		return
	}
	
	if (type !== '*' && marca !== '*') {

		if (model == '' || model == null || model == '*') {
			url = urlLogo // Irá buscar apenas a logo da marca
		}

		console.log('URL:', url);

		fetch(url).then(function (response) {
			return response.json();
		}).then(function (obj) {
			divImageSelector.innerHTML = '<img src="' + obj.items[0].link + '" alt="' + obj.items[0].title + '">'
		})
	}
}