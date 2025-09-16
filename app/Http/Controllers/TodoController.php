<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoResource;
use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): ResourceCollection
    {
        $todos = Todo::orderBy('order', 'asc')->paginate(config('app.variables.pagination_limit'));

        return TodoResource::collection($todos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): TodoResource
    {
        $maxOrder = Todo::max('order') ?? 0;
        return Todo::create([
            'name' => $request->name,
            'description' => $request->description,
            'order' => $maxOrder++,
        ])->toResource();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo): TodoResource
    {
        $todo->update($request->all());

        return $todo->toResource();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo): JsonResponse
    {
        $todo->delete();

        return response()->json([
            'success' => 'Task deleted.',
        ]);
    }
}
