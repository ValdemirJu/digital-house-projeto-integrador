let type = '';
let brand = '';
let model = '';
let year = '';

let marca = document.getElementById('marca');
let modelo = document.getElementById('modelo');
let ano = document.getElementById('ano');
let combustivel = document.getElementById('combustivel');
let valor = document.getElementById('valor');

const typeSelector = document.getElementById('type');
const brandSelector = document.getElementById('brand');
const modelSelector = document.getElementById('model');
const yearSelector = document.getElementById('year');


typeSelector.addEventListener('change', Event => {
	brandSelector.innerHTML = '<option value="*">Selecionar</option>';
	modelSelector.innerHTML = '<option value="*">Selecionar</option>';
	yearSelector.innerHTML = '<option value="*">Selecionar</option>';
	changeType();
});

brandSelector.addEventListener('change', Event => {
	modelSelector.innerHTML = '<option value="*">Selecionar</option>';
	yearSelector.innerHTML = '<option value="*">Selecionar</option>';
	changeBrand();
});

modelSelector.addEventListener('change', Event => {
	yearSelector.innerHTML = '<option value="*">Selecionar</option>';
	changeModel();
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
	updateYear(model)
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