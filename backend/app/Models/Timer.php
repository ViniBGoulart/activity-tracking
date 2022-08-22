<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timer extends Model
{
    use HasFactory;

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'name', 'description', 'user_id', 'project_id', 'stopped_at', 'started_at'
    ];

    /**
     * {@inheritDoc}
     */
    protected $with = ['user'];

    public function store($request, int $id)
    {
        $timer = Project::mine()->findOrFail($id)
            ->timers()
            ->save(new Timer([
                'name' => $request['name'],
                'description' => $request['description'],
                'user_id' => auth()->user()->id,
                'started_at' => Carbon::now()->toDateTimeString(),
            ]));

        return $timer->with('project')->find($timer->id);
    }

    public function running(int $id)
    {
        return Timer::with('project')->where('project_id', $id)->get() ?? [];
    }

    public function stopRunning(int $id, int $timerId)
    {
        if ($timer = Timer::mine()->running()->where([
            ['project_id', '=', $id],
            ['id', '=', $timerId]
        ])->first()) {
            $timer->update(['stopped_at' => Carbon::now()->toDateTimeString()]);
        }

        return $timer;
    }

    /**
     * Get the related user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the related project
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get timer for current user.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeMine($query)
    {
        return $query->whereUserId(auth()->user()->id);
    }

    /**
     * Get the running timers
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeRunning($query)
    {
        return $query->whereNull('stopped_at');
    }
}
