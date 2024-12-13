<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DataTableResource extends JsonResource
{

	private $draw = 1;
	private $recordsTotal = 0;
	private $recordsFiltered = 0;

	public function toArray($request): array
	{

		return [
			'draw' => $this->draw,
			'recordsTotal' => $this->recordsTotal,
			'recordsFiltered' => $this->recordsFiltered,
			'data' => parent::toArray($request)
		];
	}

	public function set($key, $value): DataTableResource
	{

		$this->$key = $value;
		return $this;
	}
}