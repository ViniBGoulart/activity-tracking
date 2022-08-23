<?php

namespace App\Transformers\Timer;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class TimerTodayResourceCollection extends ResourceCollection
{
    /**
     * Create a new resource instance.
     *
     * @param  mixed  $resource
     * @return array
     */
    public function toArray($request)
    {
        return ['data' => $this->collection];
    }

    /**
     * Get additional data that should be returned with the resource array.
     *
     * @param \Illuminate\Http\Request  $request
     * @return array
     */
    public function with($request)
    {
        return [
            'status' => true,
            'msg'    => 'Listing Data',
            'url'    => $request->getRequestUri()
        ];
    }

    /**
     * Customize the outgoing response for the resource.
     *
     * @param  \Illuminate\Http\Request
     * @param  \Illuminate\Http\Response
     * @return void
     */
    public function withResponse($request, $response)
    {
        $response->setStatusCode(200);
    }
}
