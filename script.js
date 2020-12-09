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

const typeSelector = document.getElementById('type');
const brandSelector = document.getElementById('brand');
const modelSelector = document.getElementById('model');
const yearSelector = document.getElementById('year');
const divImageSelector = document.getElementById('image-result')

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
	resetInfos
});

yearSelector.addEventListener('change', Event => {
	btnConsultar.style.visibility = 'visible';
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
		marca.innerHTML = '';
		modelo.innerHTML = '';
		ano.innerHTML = '';
		combustivel.innerHTML = '';
		valor.innerText = '';
		return
	}

	if (year != '*') {

		console.log('URL Value:', `https://parallelum.com.br/fipe/api/v1/${type}/marcas/${brand}/modelos/${model}/anos/${year.codigo}`);

		fetch(`https://parallelum.com.br/fipe/api/v1/${type}/marcas/${brand}/modelos/${model}/anos/${year.codigo}`)
		.then(function (response) {
			return response.json();
		}).then(function (obj) {
			if (obj.Valor != '' || obj.Valor != null) {
				marca.innerHTML = `<b>Marca: <b>${obj.Marca}`;
				modelo.innerHTML = `<b>Modelo: <b>${obj.Modelo}`;
				ano.innerHTML = `<b>Ano: <b>${obj.AnoModelo}`;
				combustivel.innerHTML = `<b>Combustível: <b>${obj.Combustivel}`;
				valor.innerHTML = `<b>Valor: <b>${obj.Valor}`;
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
			divResult.style.backgroundImage = "url('" + obj.items[0].link + "')";
			divResult.style.backgroundRepeat = "no-repeat";
			divResult.style.backgroundSize = "100%";
			divResult.style.backgroundPosition = "center";
		})
	}

}