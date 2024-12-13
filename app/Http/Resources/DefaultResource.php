<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DefaultResource extends JsonResource
{

	private $status = [
		'code' => 0,
		'message' => ''
	];

	public function toArray($request)
	{

		return [
			'status' => $this->status,
			'payload' => parent::toArray($request)
		];
	}

	public function withStatus(int $httpStatus)
	{

		$this->status = [
			'code' => $httpStatus,
			'message' => config('app.http_codes')[$httpStatus]
		];

		return $this;
	}

	public function withMessage(string $message)
	{

		if (!empty($message)) {
			$this->status['message'] = $message;
		}

		return $this;
	}
}
