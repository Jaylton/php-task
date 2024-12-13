<?php

namespace App\Helpers;

class Text {

	/**
	 * Generates a unique token
	 *
	 * @param int  $length
	 * @param bool $upper
	 *
	 * @return string
	 */
	public static function getToken(int $length = 22, bool $upper = false)
	: string {

		$token = "";
		// removing 0, O, L , l and 1 as per einar`s  request
		$codeAlphabet = "abcdefghjkmnpqrstuvwxyz";
		$codeAlphabet.= "23456789";
		for($i=0;$i<$length;$i++){
			$token .= $codeAlphabet[self::crypto_rand_secure(0, strlen($codeAlphabet))];
		}
		if ($upper === true) $token = strtoupper($token);
		return $token;
	}

	/**
	 * Generates strong random id
	 *
	 * @param int $min
	 * @param int $max
	 *
	 * @return int
	 */
	private static function crypto_rand_secure(int $min, int $max)
	:int {

		$range = $max - $min;
		if ($range < 0) return $min; // not so random...
		$log = log($range, 2);
		$bytes = (int) ($log / 8) + 1; // length in bytes
		$bits = (int) $log + 1; // length in bits
		$filter = (1 << $bits) - 1; // set all lower bits to 1
		do {
			$rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
			$rnd = $rnd & $filter; // discard irrelevant bits
		} while ($rnd >= $range);
		return $min + $rnd;
	}

	private static function encrypt_decrypt($action, $string)
	:string {

		$output = '';

		$secret_key = config('app.encryption.secret_key');
		$secret_iv = config('app.encryption.secret_iv');
		$cipher_method = config('app.encryption.cipher_method');

		// hash key
		$key = hash('sha256', $secret_key);

		// hash iv with 16 bytes for AES-256-CBC
		$iv = substr(hash('sha256', $secret_iv), 0, 16);

		if ($action == 'encrypt') {
			$output = openssl_encrypt($string, $cipher_method, $key, 0, $iv);
			$output = base64_encode($output);
		}
		else if ($action == 'decrypt') {
			$output = openssl_decrypt(base64_decode($string), $cipher_method, $key, 0, $iv);
		}

		return $output;
	}

	public static function encrypt($string)
	:string {
		return self::encrypt_decrypt('encrypt', $string);
	}

	public static function decrypt($string)
	:string {
		return self::encrypt_decrypt('decrypt', $string);
	}

	public static function getDayByNumber($index)
	:string {
		if($index == 6){
			return 'sunday';
		} else if($index == 0){
			return 'monday';
		} else if($index == 1){
			return 'tuesday';
		} else if($index == 2){
			return 'wednesday';
		} else if($index == 3){
			return 'thursday';
		} else if($index == 4){
			return 'friday';
		} else if($index == 5){
			return 'saturday';
		} 
		return '';
	}

}