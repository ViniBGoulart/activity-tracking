<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * {@inheritDoc}
     */
    protected $fillable = ['name', 'user_id', 'description'];

    /**
     * {@inheritDoc}
     */
    protected $with = ['user'];

    public function index()
    {
        return Project::mine()->with('timers')->get()->toArray();
    }

    public function store($fields)
    {
        $project = Project::create( array_merge($fields, ['user_id' => auth()->user()->id]));

        return $project ? array_merge($project->toArray(), ['timers' => [], 'status' => 1]) : false;
    }

    public function destroyProject($id)
    {
        if(Project::find($id)) {
            $project = Project::find($id);
            Project::find($id)->delete();

            return $project;
        } else {
            return false;
        }
    }

    /**
     * Get associated user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get associated timers.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function timers()
    {
        return $this->hasMany(Timer::class);
    }

    /**
     * Get my projects
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeMine($query)
    {
        return $query->whereUserId(auth()->user()->id);
    }
}
