/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('jquery/dist/jquery.min.js');
require('./bootstrap');
require('./utilities/helpers');
/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// resources/assets/js/app.js

import $ from 'jquery';
window.$ = window.jQuery = $;
import 'jquery-ui/ui/widgets/sortable.js';
import 'jquery-ui/ui/widgets/datepicker.js';
import 'jquery-datetimepicker/build/jquery.datetimepicker.full.min.js';
import 'jquery.maskedinput/src/jquery.maskedinput.js';
import AuthService from './services/AuthService';
import UserService from './services/UserService';

String.prototype.addSlashes = function () {
	//no need to do (str+'') anymore because 'this' can only be a string
	return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

$(document).ready(function () {
	const currentUser = UserService.getUser();
	if (currentUser) {
		$('#navbarDropdown').text(currentUser.name);
	}


	$('#logout').on('click', function () {
		AuthService.logout();
	});
});