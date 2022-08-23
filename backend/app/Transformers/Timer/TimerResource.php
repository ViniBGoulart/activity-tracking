<?php

namespace App\Transformers\Timer;

use App\Services\ResponseService;
use Illuminate\Http\Resources\Json\JsonResource;

class TimerResource extends JsonResource
{
    private $config;

    public function __construct($resource, $config = array())
    {
        parent::__construct($resource);
        $this->config = $config;
    }

    public function toArray($request)
    {
        return [
            'id' => $this->resource['id'],
            'project_id' => $this->resource['project_id'],
            'user_id' => $this->resource['user_id'],
            'name' => $this->resource['name'],
            'description' => $this->resource['description'],
            'started_at' => $this->resource['started_at'],
            'stopped_at' => $this->resource['stopped_at']
        ];
    }

    public function with($request)
    {
        return ResponseService::default($this->config, $this->resource['project_id']);
    }

    public function withResponse($request, $response)
    {
        $response->setStatusCode(200);
    }
}
