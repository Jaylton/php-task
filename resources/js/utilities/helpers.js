import $ from "jquery";

class Helpers {

	constructor() {
	}
	sortByKey(array, key) {
		return array.sort(function (a, b) {
			var x = a[key];
			var y = b[key];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}

	dynamicSortMultiple() {
		function dynamicSort(property) {
			var sortOrder = 1;
			if(property[0] === "-") {
				sortOrder = -1;
				property = property.substr(1);
			}
			return function (a,b) {
				/* next line works with strings and numbers,
				* and you may want to customize it to your needs
				*/
				var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
				return result * sortOrder;
			}
		}
		/*
		* save the arguments object as it will be overwritten
		* note that arguments object is an array-like object
		* consisting of the names of the properties to sort by
		*/
		var props = arguments;
		return function (obj1, obj2) {
			var i = 0, result = 0, numberOfProperties = props.length;
			/* try getting a different result from 0 (equal)
			* as long as we have extra properties to compare
			*/
			while(result === 0 && i < numberOfProperties) {
				result = dynamicSort(props[i])(obj1, obj2);
				i++;
			}
			return result;
		}
	}

	arraySerialize(arr) {
		let o = {};
		let a = arr;
		$.each(a, function () {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	}

    getTimezoneOffset(timezone) {
        const date = new Date();

        const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));

        const targetTimezone = timezone ? timezone.trim() : 'UTC';

        const targetDate = new Date(utcDate.toLocaleString('en-US', { timeZone: targetTimezone }));

        const timezoneDifference = targetDate.getHours() - utcDate.getHours();

        return timezoneDifference;
    }

	findDuplicateChar(str) {
		let result = "";
		for (let i = 0; i < str.length; i++) {
		  let char = str.charAt(i);
		  if (str.indexOf(char) !== i && result.indexOf(char) === -1) {
			result += char;
		  }
		}
		return result;
	}

	/**
	 * Normalize serialized form arrays
	 *
	 * @param formData Serialized array
	 * @returns object
	 */
	normalizeFormData(formData) {

		let formObject = {};
		for (let i in formData) {

			const itemName = formData[i]['name'];
			const itemValue = formData[i]['value'];

			// arrays
			if (itemName.indexOf('[]') > -1) {

				const itemNameTemp = itemName.replace('[]', '');

				if (!(itemNameTemp in formObject)) {
					formObject[itemNameTemp] = [];
				}
				formObject[itemNameTemp].push(itemValue);
			}
			else {
				formObject[itemName] = itemValue;
			}
		}

		return formObject;
	}
	/**
	 *  Download CSV file
	 *
	 * @param data string
	 */
	downloadCSV(data) {
		const blob = new Blob([data], { type: 'text/csv' });

		const url = window.URL.createObjectURL(blob)

		const a = document.createElement('a')
		a.setAttribute('href', url)
		a.setAttribute('download', 'download.csv');
		a.click()
	}

	/**
	 *  Convert array of objects to CSV data
	 *
	 * @param data [object]
	 * @return string
	 */
	CSVMaker(data) {

		let csvRows = [];

		const headers = Object.keys(data[0]);
		csvRows.push(headers.join(','));

		data.forEach(element => {
			const values = Object.values(element).join(',');
			csvRows.push(values)
		});

		// Returning the array joining with new line
		return csvRows.join('\n')
	}



}

export default new Helpers();
