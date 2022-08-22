<?php

namespace App\Http\Controllers;

use App\Http\Request\Project\StoreProject;
use App\Models\Project;
use App\Services\ResponseService;
use App\Transformers\Project\ProjectResource;
use App\Transformers\Project\ProjectResourceCollection;

class ProjectController extends Controller
{
    private $project;

    public function __construct(Project $project)
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
        $this->project = $project;
    }

    public function index()
    {
        return new ProjectResourceCollection($this->project->index());
    }

    public function store(StoreProject $request)
    {
        try {
            $data = $this->project->store($request->all());
        } catch (\Throwable|\Exception $e) {
            return ResponseService::exception($e);
        }

        return new ProjectResource($data, ['type' => 'store', 'route' => 'project.store']);
    }

    public function destroy(int $id)
    {
        try {
            $data = $this->project->destroyProject($id);
        } catch (\Throwable|\Exception $e) {
            return ResponseService::exception($e);
        }

        return new ProjectResource($data, ['type' => 'destroy', 'route' => 'project.destroy']);
    }
}
