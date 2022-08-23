<?php

namespace App\Http\Controllers;

use App\Models\Timer;
use App\Transformers\Timer\TimerResource;
use App\Http\Request\Timer\StoreTimer;
use App\Services\ResponseService;
use App\Transformers\Timer\TimerRunningResourceCollection;

class TimerController extends Controller
{
    private $timer;

    public function __construct(Timer $timer)
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
        $this->timer = $timer;
    }

    public function store(StoreTimer $request, int $id)
    {
        if ($this->timer::mine()->running()->where([
            ['project_id', '=', $id],
        ])->first()) {
            //TODO: Timer must not be created if exists other running
        }

        try {
            $data = $this->timer->store($request, $id);
        } catch (\Throwable|\Exception $e) {
            return ResponseService::exception($e);
        }

        return new TimerResource($data, ['type' => 'store', 'route' => 'timer.store']);
    }

    public function running(int $id)
    {
        return new TimerRunningResourceCollection($this->timer->running($id), $id);
    }

    public function stopRunning(int $id, int $timerId)
    {
        try {
            $data = $this->timer->stopRunning($id, $timerId);
        } catch (\Throwable|\Exception $e) {
            return ResponseService::exception($e);
        }

        return new TimerResource($data, ['type' => 'stop', 'route' => 'timer.stop']);
    }
}
