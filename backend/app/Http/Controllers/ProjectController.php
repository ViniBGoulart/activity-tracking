<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function index()
    {
        return Project::mine()->with('timers')->get()->toArray();
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => 'required|between:2,50', 'description' => 'between:2,500']);

        $data = array_merge($data, ['user_id' => auth()->user()->id]);

        $project = Project::create($data);

        return $project ? array_merge($project->toArray(), ['timers' => []]) : false;
    }

    public function destroy(int $id)
    {
        $project = Project::find($id);

        return $project ? $project->delete() : false;
    }
}
