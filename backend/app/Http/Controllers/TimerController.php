<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Timer;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TimerController extends Controller
{
    public function store(Request $request, int $id)
    {
        $data = $request->validate(['name' => 'required|between:3,100', 'description' => 'between:2,200']);

        $timer = Project::mine()->findOrFail($id)
            ->timers()
            ->save(new Timer([
                'name' => $data['name'],
                'user_id' => auth()->user()->id,
                'started_at' => new Carbon,
            ]));

        return $timer->with('project')->find($timer->id);
    }

    public function running()
    {
        return Timer::with('project')->mine()->running()->first() ?? [];
    }

    public function stopRunning()
    {
        if ($timer = Timer::mine()->running()->first()) {
            $timer->update(['stopped_at' => new Carbon]);
        }

        return $timer;
    }
}
