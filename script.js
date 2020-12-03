let apiType = '';
let apiBrand = '';
let apiModel = '';
let apiYear = '';

let infoBrand = document.getElementById('infoBrand');
let infoModel = document.getElementById('infoModel');
let infoYear = document.getElementById('infoYear');
let infoFuel = document.getElementById('infoFuel');
let infoValue = document.getElementById('infoValue');

let typeSelector = document.getElementById('apiType');
let brandSelector = document.getElementById('apiBrand');
let modelSelector = document.getElementById('apiModel');
let yearSelector = document.getElementById('apiYear');

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
	changeType();
	resetInfos();
});

brandSelector.addEventListener('change', Event => {
	modelSelector.innerHTML = '<option value="*">Selecionar</option>';
	yearSelector.innerHTML = '<option value="*">Selecionar</option>';
	changeBrand();
	resetInfos();
});

modelSelector.addEventListener('change', Event => {
	yearSelector.innerHTML = '<option value="*">Selecionar</option>';
	changeModel();
	resetInfos();
});

yearSelector.addEventListener('change', Event => {
	changeYear();
	resetInfos();
});

function changeType() {
	let option = typeSelector.options[typeSelector.selectedIndex];

	apiType = option.value;
	updateBrands(apiType)
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

	apiBrand = option.value;
	updateModels(apiBrand)
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

	apiModel = option.value;
	updateYear(apiModel)
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

function changeYear() {
	let option = yearSelector.options[yearSelector.selectedIndex];

	apiYear = option.value;
	updateInfos(apiYear)
}

function updateInfos(year) {
	if (year !== '*') {
		fetch(`https://parallelum.com.br/fipe/api/v1/${apiType}/marcas/${apiBrand}/modelos/${apiModel}/anos/${apiYear}`)
			.then(response => response.json())
			.then(response => {
				console.log(response);
				infoBrand.innerHTML = `<strong>Marca: </strong>${response.Marca}`;
				infoModel.innerHTML = `<strong>Modelo: </strong>${response.Modelo}`;
				infoYear.innerHTML = `<strong>Ano: </strong>${response.AnoModelo}`;
				infoFuel.innerHTML = `<strong>Combustível: </strong>${response.Combustivel}`;
				infoValue.innerHTML = `<strong>Valor: </strong>${response.Valor}`;
			})
	}
}